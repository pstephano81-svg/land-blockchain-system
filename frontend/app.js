const express = require("express");
const app = express();
const QRCode = require("qrcode");

const API = "http://localhost:5000/api";
const lat = document.getElementById("lat").innerText;
const lng = document.getElementById("lng").innerText;



// REGISTER USER
async function register() {
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    role: document.getElementById("role").value,
    region: document.getElementById("region").value,
    district: document.getElementById("district").value,
    street: document.getElementById("street").value
  };

  const res = await fetch(API + "/users/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  });

  const data = await res.json();

  alert("Registered Successfully");

  // redirect based on role
  if(user.role === "owner") location.href = "dashboard-owner.html";
  if(user.role === "officer") location.href = "dashboard-officer.html";
  if(user.role === "buyer") location.href = "dashboard-buyer.html";
}
async function addLand() {
  const formData = new FormData();

  formData.append("ownerId", "123"); // test
  formData.append("region", document.getElementById("region").value);
  formData.append("district", document.getElementById("district").value);
  formData.append("street", document.getElementById("street").value);
  formData.append("latitude", document.getElementById("lat").value);
  formData.append("longitude", document.getElementById("lng").value);
  formData.append("plot number", document.getElementById("plot").value);
  formData.append("titleDeed", document.getElementById("titleDeed").files[0]);
  formData.append("landImage", document.getElementById("landImage").files[0]);
  formData.append("lat", lat);
  formData.append("lng", lng);
  formData.append("address", document.getElementById("address").value);
  formData.append("boundary", JSON.stringify(path));
  formData.append("area", document.getElementById("area").innerText);
 
await fetch(API + "/lands/add", {
    method: "POST",
    body: formData
  });

  alert("Land submitted for verification");
}
async function login() {
  const res = await fetch(API + "/users/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const user = await res.json();
  localStorage.setItem("token", user.token);

 if(user.role === "owner") location.href = "dashboard-owner.html";
  if(user.role === "officer") location.href = "dashboard-officer.html";
  if(user.role === "buyer") location.href = "dashboard-buyer.html";
}
async function requestTransfer(landId) {
  await fetch(API + "/transfer/request", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      landId,
      buyerId: "buyer123",
      ownerId: "owner123"
    })
  });

  alert("Request sent");
}
async function reportLost() {
  await fetch(API + "/lost/report", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      landId: "123",
      ownerId: "123",
      message: "I lost my title deed"
    })
  });

  alert("Reported");
}
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  date: { type: Date, default: Date.now }
});

const landSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  image: String,
  video: String,
  owner: String,
  status: { type: String, default: "available" },

  comments: [commentSchema]

}, { timestamps: true });


async function loadLands() {
  const res = await fetch("http://localhost:5000/api/lands");
  const data = await res.json();

  let html = "";

  data.forEach(land => {
    html += `
      <div style="border:1px solid #ccc; margin:10px; padding:10px;">
        <h3>${land.title}</h3>
        <p>${land.location}</p>
        <p>Price: ${land.price}</p>

        ${land.image ? `<img src="http://localhost:5000/uploads/${land.image}" width="200">` : ""}
        ${land.video ? `<video src="http://localhost:5000/uploads/${land.video}" width="200" controls></video>` : ""}

        <br><br>

        <button onclick="buyLand('${land._id}')">Buy</button>
        <button onclick="deleteLand('${land._id}')">Delete</button>

        <h4>Comments</h4>
        ${land.comments.map(c => `<p>${c.user}: ${c.text}</p>`).join("")}

        <input type="text" id="comment-${land._id}" placeholder="Comment">
        <button onclick="addComment('${land._id}')">Send</button>
      </div>
    `;
  });

  document.getElementById("lands").innerHTML = html;
}


async function addComment(id) {
  const text = document.getElementById(`comment-${id}`).value;

  await fetch(`http://localhost:5000/api/lands/comment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user: "buyer", text })
  });

  loadLands();
}


async function deleteLand(id) {
  await fetch(`http://localhost:5000/api/lands/${id}`, {
    method: "DELETE"
  });

  loadLands();
}


function buyLand(id) {
  alert("Proceed to payment for land ID: " + id);
  // hapa utaunganisha payment (Mpesa / Stripe)
}

loadLands();
function buyLand(id, sellerId) {
  localStorage.setItem("landId", id);
  localStorage.setItem("sellerId", sellerId);

  window.location.href = "payment.html";
}

app.use(express.json());

// QR GENERATE API
app.post("/api/titledeed/generate", async (req, res) => {
   // code niliyokupa ya QR generation
});

// QR VERIFY API
app.post("/api/titledeed/verify", async (req, res) => {
   // code ya verification
});

app.listen(3000);

