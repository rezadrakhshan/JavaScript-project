const hour = document.getElementById("hour");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

function getTime() {
  const time = new Date();
  hour.innerHTML = time.getHours();
  min.innerHTML = time.getMinutes();
  sec.innerHTML = time.getSeconds();
}

document.addEventListener("DOMContentLoaded", () => {
  getTime();
  setInterval(getTime, 1000);
});
