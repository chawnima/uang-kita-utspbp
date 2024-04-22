// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-WM1fnT568bWQ7gKchosin0QrA0tAYVc",
  authDomain: "awee-3247c.firebaseapp.com",
  databaseURL:
    "https://awee-3247c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "awee-3247c",
  storageBucket: "awee-3247c.appspot.com",
  messagingSenderId: "782965670661",
  appId: "1:782965670661:web:e53a1ea9cef0cedaf3ed6c",
  measurementId: "G-XX1J5B71P6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
let username = localStorage.getItem("username");
document.getElementById("username").value = localStorage.getItem("username");

document.getElementById("login").addEventListener("click", function () {
  username = document.getElementById("username").value;
  localStorage.setItem("username", document.getElementById("username").value);
  alert("Logged in");
});

document.getElementById("submit").addEventListener("click", function () {
  console.log(username);
  const radioc = document.querySelector(
    `input[name="flexRadioDefault"]:checked`
  );
  console.log(radioc);
  let database = getDatabase(app);
  let newRef = ref(
    database,
    `${username}utang/${document.getElementById("urut").value || 1}`
  );
  if (radioc.id === "flexRadioDefault2") {
    set(newRef, {
      deskripsi: document.getElementById("deskripsi").value,
      jumlah: document.getElementById("jumlah").value,
      tanggal: document.getElementById("date").value,
      tipe: radioc.id,
      tipe2: "tambah",
    });
  } else {
    set(newRef, {
      deskripsi: document.getElementById("deskripsi").value,
      jumlah: document.getElementById("jumlah").value,
      tanggal: document.getElementById("date").value,
      tipe: radioc.id,
      tipe2: "kurang",
    });
  }
  alert("Tersimpan");
});

document.getElementById("submit2").addEventListener("click", function () {
  console.log(username);
  let newRef = ref(
    database,
    `${username}tagihan/${document.getElementById("urut2").value || 1}`
  );
  set(newRef, {
    deskripsi: document.getElementById("deskripsi2").value,
    jumlah: document.getElementById("jumlah2").value,
    tanggal: document.getElementById("date2").value,
  });
  alert("Tersimpan");
});

function refresh() {
  let username = localStorage.getItem("username");
  if (typeof username === "string" && username.length > 0) {
    document.getElementById("historyItems").innerHTML = "";
    let getdata = ref(database, `${username}utang`);
    get(getdata).then((snapshot) => {
      if (snapshot.exists()) {
        let jumlahtotal = 0;
        let kurangtotal = 0;
        snapshot.forEach(function (childSnapshot) {
          let extractData = [];
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let no = childKey;
          console.log("Child key:", childKey);
          Object.keys(childData).forEach(function (key) {
            extractData[key] = childData[key];
            console.log(extractData);
          });
          if (extractData.jumlah) {
            jumlahtotal += parseInt(extractData.jumlah);
          }

          htmlinj(extractData, no);
        });
        console.log(`${jumlahtotal} , ${kurangtotal}`);
        localStorage.setItem("jumlahTotalUtang", jumlahtotal);
        localStorage.setItem("kurangTotalUtang", kurangtotal);
      }
    });
  }
}

function hapus(nom) {
  let delRef = ref(database, `${username}utang/${nom}`);
  update(delRef, {
    status: "lunas",
  });
  refresh();
}

function htmlinj(extractData, nom) {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-anakan");

  const img = document.createElement("img");
  img.src = `/img/money-${
    extractData.tipe === "flexRadioDefault2" ? "recive" : "send"
  }-svgrepo-com.svg`;
  img.classList.add("imgduit");
  historyItem.appendChild(img);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("infokan-kapan");

  const amount = document.createElement("div");
  amount.classList.add(
    `duit${extractData.tipe === "flexRadioDefault2" ? "ijo" : "merah"}`
  );
  amount.textContent = `Rp. ${extractData.jumlah || 0}`;
  infoContainer.appendChild(amount);

  const description = document.createElement("div");
  description.classList.add("buat-apah");
  description.textContent = extractData.deskripsi || "Tidak ada deskripsi";
  infoContainer.appendChild(description);

  const date = document.createElement("div");
  date.classList.add("kapan");
  date.textContent = extractData.tanggal || "Tidak ada tanggal";
  infoContainer.appendChild(date);

  const jenis = document.createElement("div");
  jenis.classList.add("jenis");
  jenis.textContent =
    extractData.tipe === "flexRadioDefault2" ? "Hutang orang" : "Hutang saya";
  infoContainer.appendChild(jenis);

  const no = document.createElement("div");
  no.classList.add("no");
  no.textContent = `No : ${nom}` || "Tidak ada nomor";
  infoContainer.appendChild(no);

  if (extractData.status) {
    const no = document.createElement("div");
    no.classList.add("stat");
    no.textContent = "Lunas";
    infoContainer.appendChild(no);
  } else {
    const button = document.createElement("div");
    button.classList.add("btn", "btn-success");
    button.textContent = `Lunas`;
    button.onclick = function () {
      hapus(nom);
    };
    infoContainer.appendChild(button);
  }

  historyItem.appendChild(infoContainer);
  document.getElementById("historyItems").appendChild(historyItem);
}

function refresh2() {
  let username = localStorage.getItem("username");
  if (typeof username === "string" && username.length > 0) {
    document.getElementById("historyItemsT").innerHTML = "";
    let getdata = ref(database, `${username}tagihan`);
    get(getdata).then((snapshot) => {
      if (snapshot.exists()) {
        let jumlahtotal = 0;
        let kurangtotal = 0;
        snapshot.forEach(function (childSnapshot) {
          let extractData = [];
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let no = childKey;
          console.log("Child key:", childKey);
          Object.keys(childData).forEach(function (key) {
            extractData[key] = childData[key];
            console.log(extractData);
          });
          if (extractData.jumlah) {
            jumlahtotal += parseInt(extractData.jumlah);
            console.log(`ril = ${extractData.jumlah}`);
          } else if (extractData.jumlah2) {
            kurangtotal += parseInt(extractData.jumlah2);
          }
          htmlinj2(extractData, no);
        });
        console.log(jumlahtotal);
        localStorage.setItem("kurangTotalTagihan", jumlahtotal);
      }
    });
  }
}

function hapus2(nom) {
  let delRef = ref(database, `${username}tagihan/${nom}`);
  update(delRef, {
    status: "lunas",
  });
  refresh2();
}

function htmlinj2(extractData, nom) {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-anakan");

  const img = document.createElement("img");
  img.src = `/img/money-send-svgrepo-com.svg`;
  img.classList.add("imgduit");
  historyItem.appendChild(img);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("infokan-kapan");

  const amount = document.createElement("div");
  amount.classList.add(
    `duitmerah`
  );
  amount.textContent = `Rp. ${extractData.jumlah || 0}`;
  infoContainer.appendChild(amount);

  const description = document.createElement("div");
  description.classList.add("buat-apah");
  description.textContent = extractData.deskripsi || "Tidak ada deskripsi";
  infoContainer.appendChild(description);

  const date = document.createElement("div");
  date.classList.add("kapan");
  date.textContent = extractData.tanggal || "Tidak ada tanggal";
  infoContainer.appendChild(date);

  const no = document.createElement("div");
  no.classList.add("no");
  no.textContent = `No : ${nom}` || "Tidak ada nomor";
  infoContainer.appendChild(no);

  if (extractData.status) {
    const no = document.createElement("div");
    no.classList.add("stat");
    no.textContent = "Lunas";
    infoContainer.appendChild(no);
  } else {
    const button = document.createElement("div");
    button.classList.add("btn", "btn-success");
    button.textContent = `Lunas`;
    button.onclick = function () {
      hapus2(nom);
    };
    infoContainer.appendChild(button);
  }

  historyItem.appendChild(infoContainer);
  document.getElementById("historyItemsT").appendChild(historyItem);
}
refresh();
refresh2();
document.getElementById("refresh").addEventListener("click", refresh);
document.getElementById("refresh2").addEventListener("click", refresh2);
