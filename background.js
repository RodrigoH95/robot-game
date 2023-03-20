class Layer {
  constructor(imgName, speed) {
    this.img = this.newImage(imgName);
    this.speed = speed;
    this.x = 0;
  }

  newImage(name) {
    const layer = new Image();
    layer.src = `./img/${name}.png`; 
    return layer;
  }

  speed() {
    return this.speed;
  }
}

class Background {
  constructor(canvas, gameSpeed) {
    this.canvas = canvas;
    this.gameSpeed = gameSpeed;
    this.layers = [];
    this.x = 0;
    this.layerWidth = 1920;
  }

  addLayer(layer) {
    this.layers.push(layer);
  }

  draw(ctx) {
    for(const layer of this.layers) {
      ctx.drawImage(layer.img, layer.x, 0, this.layerWidth, this.canvas.height);
      ctx.drawImage(layer.img, layer.x + this.layerWidth, 0, this.layerWidth, this.canvas.height);
    }
  }

  update() {
    for(const layer of this.layers) {
      layer.x -= this.gameSpeed * layer.speed;
      if (layer.x == -1920) layer.x = 0;
    }
  }
}

