const userId = localStorage.getItem("userId");

// CREATE POST
async function createPost() {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("caption", document.getElementById("caption").value);
  formData.append("media", document.getElementById("media").files[0]);
  formData.append("landId", document.getElementById("landSelect").value);

  await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    body: formData
  });

  loadPosts();
}

// LOAD POSTS
async function loadPosts() {
  const res = await fetch("http://localhost:5000/api/posts");
  const data = await res.json();

  let html = "";

  data.forEach(p => {
    html += `
      <div>
        <p>${p.caption}</p>

        ${
          p.type === "video"
          ? `<video src="http://localhost:5000/uploads/${p.media}" controls width="250"></video>`
          : `<img src="http://localhost:5000/uploads/${p.media}" width="250">`
        }

        <button onclick="deletePost('${p._id}')">Delete</button>

        <input placeholder="comment..." id="c-${p._id}">
        <button onclick="comment('${p._id}')">Send</button>

        <div>
          ${p.comments.map(c => `<p>${c.text}</p>`).join("")}
        </div>
      </div>
      <hr>
    `;
  });

  document.getElementById("posts").innerHTML = html;
}

async function deletePost(id) {
  await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: "DELETE"
  });

  loadPosts();
}

async function comment(id) {
  const text = document.getElementById(`c-${id}`).value;

  await fetch(`http://localhost:5000/api/posts/comment/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      text
    })
  });

  loadPosts();
}
// LOAD USER LANDS
async function loadMyLands() {
  const userId = localStorage.getItem("userId");

  const res = await fetch(`http://localhost:5000/api/lands/user/${userId}`);
  const data = await res.json();

  let options = "";

  data.forEach(l => {
    options += `<option value="${l._id}">${l.location}</option>`;
  });

  document.getElementById("landSelect").innerHTML = options;
}

loadPosts();
data.forEach(p => {
  html += `
    <div>
      <p>${p.caption}</p>

      ${
        p.type === "video"
        ? `<video src="http://localhost:5000/uploads/${p.media}" controls width="250"></video>`
        : `<img src="http://localhost:5000/uploads/${p.media}" width="250">`
      }

      <p>Location: ${p.landId?.location || "N/A"}</p>
      <p>Price: ${p.landId?.price || "N/A"}</p>

      ${
        p.landId
        ? `<button onclick="buyLand('${p.landId._id}', '${p.landId.owner}')">Buy Now</button>`
        : ""
      }

      <hr>


</div>
  `;
  