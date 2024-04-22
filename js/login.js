let username = localStorage.getItem("username");
document.getElementById("username").value = localStorage.getItem("username");

document.getElementById("login").addEventListener("click", function () {
  username = document.getElementById("username").value;
  localStorage.setItem("username", document.getElementById("username").value);
  if (document.getElementById("username").value) {
    window.location.href = "../sub/p2-bill.html";
  } else {
    alert("Username tidak terisi");
  }
});
