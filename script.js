function logout() {
  alert("Logging out...");
  window.location.href = 'index.html';
}

function startCall() {
  const time = new Date().toLocaleTimeString();
  const entry = `Call started at ${time}`;
  addLog(entry);
}

function sendMessage() {
  const time = new Date().toLocaleTimeString();
  const entry = `Message sent at ${time}`;
  addLog(entry);
}

function addLog(text) {
  const list = document.getElementById("logList");
  if (list) {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  }
}
