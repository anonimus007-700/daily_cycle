const params = new URLSearchParams(window.location.search);
const time = params.get("time");
document.body.innerText = "Time: " + time;

