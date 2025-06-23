// Logout function
function logout() {
  alert("Logging out...");
  window.location.href = 'index.html';
}

// Start Call Function (abhi placeholder)
function startCall() {
  const time = new Date().toLocaleTimeString();
  const role = getRole();
  const callRef = database.ref("calls").push();

  callRef.set({
    caller: role,
    status: "ringing",
    timestamp: time
  });

  addLog(`📞 Call initiated by ${role} at ${time}`);
}

// Send Message Function
function sendMessage() {
  const time = new Date().toLocaleTimeString();
  const message = prompt("Enter your message:");
  if (!message) return;

  const role = getRole();

  const newMsgRef = database.ref("messages").push();
  newMsgRef.set({
    sender: role,
    message: message,
    timestamp: time
  });

  addLog(`💬 ${role} sent: "${message}" at ${time}`);
}

// Append log to the log list
function addLog(text) {
  const list = document.getElementById("logList");
  if (list) {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  }
}

// Get role from current page
function getRole() {
  if (window.location.href.includes("technician")) {
    return "Technician";
  } else if (window.location.href.includes("customer")) {
    return "Customer";
  } else {
    return "Unknown";
  }
}

// Realtime listener for messages
window.addEventListener('load', () => {
  const logList = document.getElementById("logList");
  if (!logList) return;

  database.ref("messages").on("child_added", function(snapshot) {
    const data = snapshot.val();
    const msg = `💬 ${data.sender} → "${data.message}" (${data.timestamp})`;

    const li = document.createElement("li");
    li.textContent = msg;
    logList.appendChild(li);
  });

  // (Optional) Call notification popup
  database.ref("calls").on("child_added", function(snapshot) {
    const data = snapshot.val();
    const role = getRole();

    if (data.caller !== role) {
      const accept = confirm(`📞 Incoming call from ${data.caller} at ${data.timestamp}. Answer?`);
      if (accept) {
        addLog(`✅ ${role} answered call at ${new Date().toLocaleTimeString()}`);
        // In next phase: trigger WebRTC here
      } else {
        addLog(`❌ ${role} declined call`);
      }
    }
  });
});
