const endButton = document.getElementById("btn-end");
const restartButton = document.getElementById("btn-restart");

restartButton.addEventListener("click", e => {
  window.location.href = "./game.html";
});

window.addEventListener("load", () => {
  window.scrollTo(0, 1);
});