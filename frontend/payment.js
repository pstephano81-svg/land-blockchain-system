const landId = localStorage.getItem("landId");
const sellerId = localStorage.getItem("sellerId");
const buyerId = localStorage.getItem("userId");

async function makePayment() {

  const formData = new FormData();

  formData.append("landId", landId);
  formData.append("sellerId", sellerId);
  formData.append("buyerId", buyerId);

  formData.append("method", document.getElementById("method").value);
  formData.append("amount", document.getElementById("amount").value);

  formData.append("screenshot", document.getElementById("screenshot").files[0]);

  await fetch("http://localhost:5000/api/payments", {
    method: "POST",
    body: formData
  });

  alert("Payment submitted, waiting for seller confirmation");
}
