//  USERS 
function loadUsers() {
  const users = [
    { id: 1, name: "John", role: "user" },
    { id: 2, name: "Mary", role: "officer" }
  ];

  document.getElementById("users").innerHTML =
    users.map(u => `<p>${u.id} - ${u.name} (${u.role})</p>`).join("");
}

//LANDS 
function loadLands() {
  const lands = [
    { id: 101, owner: "John", location: "Dar es Salaam" },
    { id: 102, owner: "Mary", location: "Arusha" }
  ];

  document.getElementById("lands").innerHTML =
    lands.map(l => `<p>${l.id} - ${l.owner} - ${l.location}</p>`).join("");
}

// VERIFICATION
function loadPending() {
  const pending = [
    { id: 201, owner: "Ali", status: "pending" },
    { id: 202, owner: "Asha", status: "pending" }
  ];

  document.getElementById("pending").innerHTML =
    pending.map(p => `<p>${p.id} - ${p.owner} (${p.status})</p>`).join("");
}

// TRANSFERS 
function loadTransfers() {
  const transfers = [
    { id: 301, from: "John", to: "Mary", status: "in progress" }
  ];

  document.getElementById("transfers").innerHTML =
    transfers.map(t =>
      `<p>${t.id} - ${t.from} ➜ ${t.to} (${t.status})</p>`
    ).join("");
}

//  TRANSFER REQUESTS 
function loadTransferRequests() {
  const requests = [
    { id: 401, land: "L-100", requester: "Ali" }
  ];

  document.getElementById("transferRequests").innerHTML =
    requests.map(r =>
      `<p>${r.id} - Land: ${r.land} | User: ${r.requester}
        <button onclick="approveTransfer(${r.id})">Approve</button>
        <button onclick="rejectTransfer(${r.id})">Reject</button>
      </p>`
    ).join("");
}

function approveTransfer(id) {
  alert("Transfer approved: " + id);
}

function rejectTransfer(id) {
  alert("Transfer rejected: " + id);
}

//  UPLOAD TITLE DEEDS 
function loadUploadRequests() {
  const uploads = [
    { id: 501, land: "L-200", status: "waiting upload" }
  ];

  document.getElementById("uploads").innerHTML =
    uploads.map(u =>
      `<p>${u.id} - Land: ${u.land}
        <button onclick="uploadDeed(${u.id})">Upload</button>
      </p>`
    ).join("");
}

function uploadDeed(id) {
  alert("Uploading title deed for request: " + id);
}

//  LOST TITLE REPORTS 
function loadLostReports() {
  const reports = [
    { id: 601, user: "Asha", land: "L-300", status: "pending review" }
  ];

  document.getElementById("lost").innerHTML =
    reports.map(l =>
      `<p>${l.id} - ${l.user} lost title for ${l.land}
        <button onclick="resolveLost(${l.id})">Resolve</button>
      </p>`
    ).join("");
}

function resolveLost(id) {
  alert("Lost title resolved: " + id);
}
function generateTitleDeed() {
  fetch("/api/titledeed/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      landId: "L-100",
      owner: "John",
      location: "Dar es Salaam"
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("qrResult").innerHTML =
      `<img src="${data.qrImage}" />`;
  });
}
