// Clase encargada de dibujar en la pantalla
class Graphics {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(...entities) {
    [...entities].forEach(e => Array.isArray(e) ? this.drawMultipleEntities(e) : e.draw(this.ctx));
  }

  drawMultipleEntities(entitiesArr) {
    entitiesArr.forEach(e => e.draw(this.ctx));
  }
}