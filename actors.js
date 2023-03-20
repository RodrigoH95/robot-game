class Actor {
  constructor({x, y, width, height}) {
    this.width = width;
    this.height = height;
    this.groundHeight = y;
    this.pos = { x, y };
    this.speed = {
      x: 5,
      y: 0
    }
    // this.img = img;
  }
}

class Player extends Actor {
  constructor({x, y, width, height}) {
    super({x, y, width, height});
    this.controls = new Controls();
    this.isJumping = false;
    this.isHitting = false;
  }

  toggleControls() {
    this.controls.enabled = !this.controls.enabled;
    this.controls.enabled ? this.controls.start() : this.controls.stop();
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    // Reemplazar por img
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    this.checkControls();
    this.pos.y += this.speed.y;
    if (this.pos.y < this.groundHeight) {
      this.speed.y += 0.6;
    }
    if (this.pos.y >= this.groundHeight) {
      this.speed.y = 0;
      this.pos.y = this.groundHeight;
      this.isJumping = false;
    }
  }

  jump() {
    this.isJumping = true;
    this.speed.y = -10;
  }

  checkControls() {
    if(this.controls.keys.right) this.pos.x += this.speed.x;
    if(this.controls.keys.left) this.pos.x -= this.speed.x;
    if(this.controls.keys.up) {
      if(!this.isJumping) this.jump();
    }
    if(this.controls.keys.space && !this.isHitting) {
      this.isHitting = true;
      setTimeout(() => this.isHitting = false, 100);
    }
  }
}

class NPC extends Actor {
  constructor({x, y, width, height}) {
    super({x, y, width, height});
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    this.pos.x -= this.speed.x;
    this.pos.y -= this.speed.y;
  }
}

class Bullet {
  constructor ({x, y, speed}) {
    this.pos = { x, y};
    this.speed = speed;
    // width y height necesarios para check de colisiones
    this.width = 15;
    this.height = 8;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    this.pos.x -= this.speed;
  }
}

class Enemy extends Actor {
  constructor({x, y, width, height}) {
    super({x, y, width, height});
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  shoot() {
    return new Bullet({x: this.pos.x, y: this.pos.y + this.height / 4, speed: this.speed.x * 2});
  }

  update() {
    this.pos.x -= this.speed.x;
    this.pos.y -= this.speed.y;
  }
}