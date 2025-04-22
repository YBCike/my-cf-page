function updateTime() {
  const timeSpan = document.getElementById("current-time");
  const now = new Date();
  timeSpan.textContent = now.toLocaleString();
}

setInterval(updateTime, 1000);
updateTime();

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
