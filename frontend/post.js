document.getElementById("landForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);
  formData.append("location", document.getElementById("location").value);
  formData.append("price", document.getElementById("price").value);

  formData.append("image", document.getElementById("image").files[0]);
  formData.append("video", document.getElementById("video").files[0]);

  await fetch("http://localhost:5000/api/lands", {
    method: "POST",
    body: formData
  });

  alert("Land posted");
});
