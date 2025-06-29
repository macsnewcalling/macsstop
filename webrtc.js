let localStream;
let peerConnection;

const servers = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const role = window.location.href.includes("technician") ? "technician" : "customer";
const callRef = firebase.database().ref("calls/mainCall");

async function initCall(isCaller) {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  peerConnection = new RTCPeerConnection(servers);

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.ontrack = event => {
    const remoteAudio = document.getElementById("remoteAudio");
    if (remoteAudio) {
      remoteAudio.srcObject = event.streams[0];
    }
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      callRef.child(role + "Candidates").push(JSON.stringify(event.candidate));
    }
  };

  if (isCaller) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    await callRef.set({
      caller: role,
      offer: JSON.stringify(offer)
    });
  }

  callRef.on("value", async snapshot => {
    const data = snapshot.val();
    if (!data) return;

    if (data.offer && role === "customer" && !peerConnection.currentRemoteDescription) {
      document.getElementById("popup").style.display = "block";
    }

    if (data.answer && role === "technician" && !peerConnection.currentRemoteDescription) {
      const answer = JSON.parse(data.answer);
      await peerConnection.setRemoteDescription(answer);
    }
  });

  callRef.child(role === "technician" ? "customerCandidates" : "technicianCandidates")
    .on("child_added", async snapshot => {
      const candidate = new RTCIceCandidate(JSON.parse(snapshot.val()));
      await peerConnection.addIceCandidate(candidate);
    });
}

// 📞 Start Call
function startCall() {
  initCall(true);
}

// ✅ Accept Call
async function acceptCall() {
  document.getElementById("popup").style.display = "none";

  if (!peerConnection) await initCall(false);

  callRef.once("value").then(async snapshot => {
    const data = snapshot.val();
    if (data && data.offer) {
      const offer = JSON.parse(data.offer);
      await peerConnection.setRemoteDescription(offer);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      await callRef.child("answer").set(JSON.stringify(answer));
    }
  });
}

// ❌ Decline Call
function declineCall() {
  document.getElementById("popup").style.display = "none";
  callRef.remove();
}

// 🔴 End Call
function endCall() {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  firebase.database().ref("calls/mainCall").remove();
}
