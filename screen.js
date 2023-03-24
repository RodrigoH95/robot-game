class Screen {
  constructor(width, height) {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.graphics = new Graphics(this.ctx);
  }

  getCanvas() {
    return this.canvas;
  }

  width() {
    return this.canvas.width;
  }

  height() {
    return this.canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(...entities) {
    this.graphics.draw(...entities);
  }
}