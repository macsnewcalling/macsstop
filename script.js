function sendMessage() {
  const msg = prompt("Enter message for technician:");
  if (msg) {
    firebase.database().ref("messages").push({
      from: "customer",
      message: msg,
      time: new Date().toLocaleString()
    });
    addLog("Message sent: " + msg);
  }
}

function logout() {
  window.location.href = "index.html";
}

function addLog(msg) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleTimeString()} - ${msg}`;
  document.getElementById("logList").appendChild(li);
}
