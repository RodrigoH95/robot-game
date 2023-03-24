class GUI {
  constructor() {
    this.vidas = document.getElementById("vidas");
    this.puntaje = document.getElementById("puntaje");
  }

  mostrarVidas(vidas) {
    this.vidas.innerText = vidas;
  }

  mostrarPuntaje(puntaje) {
    this.puntaje.innerText = puntaje;
  }

  update(vidas, puntaje) {
    this.mostrarVidas(vidas);
    this.mostrarPuntaje(puntaje);
  }
}