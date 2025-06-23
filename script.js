// Logout function
function logout() {
  alert("Logging out...");
  window.location.href = 'index.html';
}

// Start Call Function
function startCall() {
  const time = new Date().toLocaleTimeString();
  const entry = `📞 Call started at ${time}`;
  addLog(entry);
}

// Send Message Function
function sendMessage() {
  const time = new Date().toLocaleTimeString();
  const entry = `💬 Message sent at ${time}`;
  addLog(entry);
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
