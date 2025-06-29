// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyASyKfl3cPY4Mays3uFTdsrANlvC4IQtfU",
  authDomain: "callkarenge.firebaseapp.com",
  databaseURL: "https://callkarenge-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "callkarenge",
  storageBucket: "callkarenge.appspot.com",
  messagingSenderId: "335167118690",
  appId: "1:335167118690:web:e1c034c2832577383c203b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export for other scripts
export { database };
