class Layer {
  constructor(img, speed) {
    this.img = img;
    this.speed = speed;
    this.x = 0;
    this.width = this.img.width;
  }

  speed() {
    return this.speed;
  }
}

class Background {
  constructor(screenHeight, gameSpeed) {
    this.screenHeight = screenHeight;
    this.gameSpeed = gameSpeed;
    this.layers = [];
    this.x = 0;
  }

  setSpeed(speed) {
    this.gameSpeed = speed;
  }

  init(layers) {
    for (const layerName of layers) {
      const speed = (layers.indexOf(layerName) + 1) / layers.length;
      const img = window.loader.getResource(String(layerName));
      const layer = new Layer(img, speed);
      this.layers.push(layer);
    }
  }

  draw(ctx) {
    for (const layer of this.layers) {
      ctx.drawImage(layer.img, layer.x, 0, layer.width, this.screenHeight);
      ctx.drawImage(layer.img, layer.x + layer.width, 0, layer.width, this.screenHeight);
    }
  }

  update() {
    for (const layer of this.layers) {
      layer.x -= this.gameSpeed * layer.speed;
      if (layer.x <= -layer.width) layer.x = 0};
    }
  }
