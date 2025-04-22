// 脚本文件：app.js
function updateTime() {
  const timeSpan = document.getElementById('current-time');
  const now = new Date();
  timeSpan.innerHTML = now.toLocaleTimeString();
}

// 每秒更新一次时间
setInterval(updateTime, 1000);
