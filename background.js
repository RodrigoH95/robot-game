class Layer {
  constructor(img, speed) {
    this.img = img;
    this.speed = speed;
    this.x = 0;
  }

  speed() {
    return this.speed;
  }
}

class Background {
  constructor(screenHeight, gameSpeed = 2) {
    this.screenHeight = screenHeight;
    this.gameSpeed = gameSpeed;
    this.layers = [];
    this.x = 0;
    this.layerWidth = null;
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
    this.layerWidth = this.layers[0].img.width; // Width de la primera capa
  }

  draw(ctx) {
    for (const layer of this.layers) {
      ctx.drawImage(layer.img, layer.x, 0, this.layerWidth, this.screenHeight);
      ctx.drawImage(layer.img, layer.x + this.layerWidth, 0, this.layerWidth, this.screenHeight);
    }
  }

  update() {
    for (const layer of this.layers) {
      layer.x -= this.gameSpeed * layer.speed;
      if (layer.x == -this.layerWidth) layer.x = 0;
    }
  }
}
