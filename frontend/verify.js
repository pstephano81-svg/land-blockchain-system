function verifyQR() {
  const qrData = document.getElementById("qrInput").value;

  fetch("/api/titledeed/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qrData })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerHTML =
      data.valid ? "✔ Valid Title Deed" : "❌ Invalid";
  });
}
