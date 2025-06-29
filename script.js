function logout() {
  alert("Logging out...");
  window.location.href = 'index.html';
}

function sendMessage() {
  const time = new Date().toLocaleTimeString();
  const message = prompt("Enter your message:");
  if (!message) return;

  const role = window.location.href.includes("technician") ? "Technician" : "Customer";

  const newMsgRef = database.ref("messages").push();
  newMsgRef.set({
    sender: role,
    message: message,
    timestamp: time
  });

  addLog(`💬 ${role} sent: "${message}" at ${time}`);
}

function addLog(text) {
  const list = document.getElementById("logList");
  if (list) {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  }
}

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
});
