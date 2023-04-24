class Actor {
  constructor({x, y, width, height, img}) {
    this.width = width;
    this.height = height;
    this.groundHeight = y;
    this.pos = { x, y };
    this.isAlive = true;
    this.speed = {
      x: 10,
      y: 0
    }
    this.img = img;
    this.actions = [];
    this.actionFrames = {};
    this.currenAction;
    this.frame = 0;
    this.time = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.frame % this.actionFrames[this.currentAction] * 64, this.actions.indexOf(this.currentAction) * this.height, this.width, this.height, this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
      if(++this.time == 3)
      {
        this.frame++;
        this.time = 0;
      }
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
    this.time = 0;
  }

  init() {
    this.actions = ["run", "hit", "jump"];
    this.actionFrames = {
      "run": 6,
      "hit": 6,
      "jump": 1,
    }
    this.currentAction = "run";
  }

  toggleControls() {
    this.controls.enabled = !this.controls.enabled;
    this.controls.enabled ? this.controls.start() : this.controls.stop();
  }

  update() {
    super.update();
    this.checkControls();
    this.pos.y += this.speed.y;
    if (this.pos.y < this.groundHeight) {
      this.speed.y += 2;
    }
    if (this.pos.y >= this.groundHeight) {
      this.speed.y = 0;
      this.pos.y = this.groundHeight;
      if(this.isJumping) this.isJumping = false;
    }

    if(this.isHitting) {
      this.currentAction = "hit";
    } else if(this.isJumping) {
      this.currentAction = "jump";
    } else if (this.currenAction !== "run") {
      this.currentAction = "run";
    }
  }

  jump() {
    this.isJumping = true;
    this.speed.y = -15;
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
      this.frame = 0;
      setTimeout(() => {
        this.isHitting = false
      }, 300);
    }
  }
}

class NPC extends Actor {
  constructor({x, y, width, height, img}) {
    super({x, y, width, height, img});
    this.actions = ["idle", "die"];
    this.actionFrames = {
      "idle": 2,
      "die": 1,
    }
    this.currentAction = "idle";
  }

  update() {
    super.update();
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
    ctx.fillStyle = "yellow";
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
    this.actions = ["idle", "warning", "shoot", "die"];
    this.actionFrames = {
      "idle": 2,
      "warning": 3,
      "shoot": 2,
      "die": 1,
    }
    this.currentAction = "warning";
  }

  // Genera un proyectil en la posicion actual del enemigo
  shoot() {
    this.bullets--;
    this.currentAction = "shoot";
    setTimeout(() => {
      this.currentAction = "idle";
    }, 150);
    return new Bullet({x: this.pos.x, y: this.pos.y + this.height / 4, speed: this.speed.x * 3});
  }

  update() {
    super.update();
    this.pos.x -= this.speed.x;
    this.pos.y -= this.speed.y;
  }
}