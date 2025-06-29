let localConnection;
let remoteConnection;
let callInProgress = false;

function startCall() {
  firebase.database().ref("call").set({ status: "incoming" });
  addLog("Calling technician...");
}

function acceptCall() {
  document.getElementById("popup").style.display = "none";
  addLog("Call accepted.");
  callInProgress = true;
  // Simulate audio
  document.getElementById("remoteAudio").src = "https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg";
}

function declineCall() {
  document.getElementById("popup").style.display = "none";
  firebase.database().ref("call").set({ status: "declined" });
  addLog("Call declined.");
}

function endCall() {
  callInProgress = false;
  document.getElementById("remoteAudio").pause();
  document.getElementById("remoteAudio").src = "";
  firebase.database().ref("call").set({ status: "ended" });
  addLog("Call ended.");
}

firebase.database().ref("call").on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  if (data.status === "incoming" && !callInProgress) {
    document.getElementById("popup").style.display = "block";
    addLog("📞 Incoming call from technician");
  }

  if (data.status === "ended") {
    endCall();
  }
});
