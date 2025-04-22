function saveComment(name, message) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.push({ name, message, time: new Date().toLocaleString() });
  localStorage.setItem("comments", JSON.stringify(comments));
  renderComments();
}

function renderComments() {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const list = document.getElementById("comment-list");
  list.innerHTML = "";
  comments.reverse().forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${c.name}</strong> @ ${c.time}<br>${c.message}`;
    list.appendChild(li);
  });
}

document.getElementById("comment-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("username").value.trim();
  const msg = document.getElementById("comment").value.trim();
  if (name && msg) {
    saveComment(name, msg);
    e.target.reset();
  }
});

renderComments();
