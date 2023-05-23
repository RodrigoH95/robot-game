const startButton = document.getElementById("btn-start");

startButton.addEventListener("click", e => {
  window.location.href = "./game.html";
});

window.addEventListener("load", () => {
  window.scrollTo(0, 1);
});