// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-WM1fnT568bWQ7gKchosin0QrA0tAYVc",
  authDomain: "awee-3247c.firebaseapp.com",
  databaseURL: "https://awee-3247c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "awee-3247c",
  storageBucket: "awee-3247c.appspot.com",
  messagingSenderId: "782965670661",
  appId: "1:782965670661:web:e53a1ea9cef0cedaf3ed6c",
  measurementId: "G-XX1J5B71P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


document.getElementById('submit').addEventListener('click', function(e){
  let database = getDatabase(app);
  let newRef = push(ref(database, 'users/'));
  set(newRef, {
    deskripsi : document.getElementById('deskripsi').value,
    jumlah : document.getElementById('jumlah').value,
    tanggal : document.getElementById('date').value
  });
  let keys = localStorage.getItem('generatedKeys');
  if (keys) {
    keys = JSON.parse(keys);
    keys.push(newRef.key);
  } else {
    keys = [newRef.key];
  }
  localStorage.setItem('generatedKeys', JSON.stringify(keys));
  alert('Saved');
})