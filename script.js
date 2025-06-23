function login(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'kamalthakur' && password === 'vinayraj') {
    window.location.href = 'technician-dashboard.html';
  } else {
    alert('Wrong username or password!');
  }
}

function logout() {
  window.location.href = 'index.html';
}
