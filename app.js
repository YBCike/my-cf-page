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

// 渲染天气数据
function fetchWeatherData() {
  fetch('weather.json')  // 假设 weather.json 文件和网页在同一个目录
    .then(response => response.json())
    .then(data => {
      const weatherSection = document.getElementById('weather-info');
      weatherSection.innerHTML = `
        <p>城市：${data.city}</p>
        <p>温度：${data.temperature}°C</p>
        <p>天气：${data.weather}</p>
        <p>湿度：${data.humidity}%</p>
        <p>风速：${data.wind} m/s</p>
      `;
    })
    .catch(error => {
      const weatherSection = document.getElementById('weather-info');
      weatherSection.innerHTML = `<p>无法加载天气数据。请稍后再试。</p>`;
    });
}

fetchWeatherData();
