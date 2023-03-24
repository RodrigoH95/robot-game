class Actor {
  constructor({x, y, width, height, img}) {
    console.log("Imagen recibida", img);
    this.width = width;
    this.height = height;
    this.groundHeight = y;
    this.pos = { x, y };
    this.isAlive = true;
    this.speed = {
      x: 5,
      y: 0
    }
    this.img = img;
  }
}

class Player extends Actor {
  constructor({x, y, width, height, img}) {
    super({x, y, width, height, img});
    this.speed.x += 2;
    this.lives = 3;
    this.score = 0;
    this.wantedLevel = 1;
    this.controls = new Controls();
    this.isJumping = false;
    this.isHitting = false;
    this.frame = 0;
  }

  toggleControls() {
    this.controls.enabled = !this.controls.enabled;
    this.controls.enabled ? this.controls.start() : this.controls.stop();
  }

  draw(ctx) {
    ctx.fillStyle = "orange";
    // Reemplazar por img
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.drawImage(this.img, (Math.floor(this.frame / 6)) % 6 * 64, 0, this.width, this.height, this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    this.frame ++;
    this.checkControls();
    this.pos.y += this.speed.y;
    if (this.pos.y < this.groundHeight) {
      this.speed.y += 0.8;
    }
    if (this.pos.y >= this.groundHeight) {
      this.speed.y = 0;
      this.pos.y = this.groundHeight;
      this.isJumping = false;
    }
  }

  jump() {
    this.isJumping = true;
    this.speed.y = -12;
  }

  addScore(score) {
    this.score += score;
  }

  getScore() {
    return this.score;
  }

  getLives() {
    return this.lives;
  }

  increaseWantedLevel() {
    this.wantedLevel++;
  }

  getWantedLevel() {
    return this.wantedLevel;
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
  constructor({x, y, width, height, img}) {
    super({x, y, width, height, img});
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
  constructor({x, y, width, height, img}) {
    super({x, y, width, height, img});
    this.canShoot = true;
    this.bullets = 3;
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  // Genera un proyectil en la posicion actual del enemigo
  shoot() {
    return new Bullet({x: this.pos.x, y: this.pos.y + this.height / 4, speed: this.speed.x * 3});
  }

  update() {
    this.pos.x -= this.speed.x;
    this.pos.y -= this.speed.y;
  }
}