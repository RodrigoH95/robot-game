class GUI {
  constructor() {
    this.vidas = document.getElementById("vidas");
    this.puntaje = document.getElementById("puntaje");
  }

  setVidas(vidas) {
    this.vidas.innerText = vidas;
  }

  addPuntaje(puntaje) {
    this.puntaje.innerText = Number(this.puntaje.innerText) + puntaje;
  }
}