class Game {
  constructor({speed, groundHeight}) {
    this.canvas = null;
    this.ctx = null;
    this.isPaused = false;
    this.groundHeight = groundHeight;
    this.gameSpeed = speed;

    this.bg = null;
    this.layers = ["sky", "clouds", "mountains", "trees", "ground"]; // Nombre de cada capa
    this.player = null;
    this.npc = [];
    this.enemies = [];
    this.projectiles = [];

    this.lives = 3;
    this.wantedLevel = 1;

    this.distance = 0;
  }

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.canvas.height = 600;
    this.canvas.width = 800;
    this.ctx = this.canvas.getContext("2d");
    this.bg = new Background(this.canvas, this.gameSpeed);
    this.loadImages();
    this.player = new Player({x: 150, y: this.canvas.height - this.groundHeight, width: 30, height: 50});
    this.player.speed.x = 6;
    this.player.toggleControls();
    this.startLoop();
  }

  startLoop() {
    this.animate();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.player.toggleControls();
    if(!this.isPaused) this.startLoop();
  }

  loadImages() {
    for(const layerName of this.layers) {
      const speed = (this.layers.indexOf(layerName) + 1) / this.layers.length;
      const layer = new Layer(layerName, speed);
      this.bg.addLayer(layer);
    }
  }

  checkCollissions() {
    // Personaje choca con laterales
    this.checkPlayerMapCollision();
    // Npc sale del mapa
    this.checkNPCMapCollision(this.npc);
    this.checkNPCMapCollision(this.enemies);
    this.checkNPCMapCollision(this.projectiles);
    this.checkPlayerNpcCollision(this.npc);
    this.checkPlayerNpcCollision(this.enemies);
    this.checkBulletCollision();

  }

  checkPlayerMapCollision() {
    if(this.player.pos.x <= 0) this.player.pos.x = 0;
    if(this.player.pos.x >= this.canvas.width - this.player.width) this.player.pos.x = this.canvas.width - this.player.width;
  }

  checkNPCMapCollision(npcArray) {
    const npc = npcArray[0];
    if(npc && (npc.pos.x < -npc.width || npc.pos.y + npc.height < 0 || npc.pos.x > this.canvas.width * 2)) {
      npcArray.shift();
    }
  }

  checkPlayerNpcCollision(npcArray) {
    for (const npc of npcArray) {
      if(!(npc.pos.x + npc.width < this.player.pos.x || npc.pos.x > this.player.pos.x + this.player.width || npc.pos.y + npc.height < this.player.pos.y || npc.pos.y > this.player.pos.y + this.player.height) && this.player.isHitting) {
        npc.speed = {
          x: -10,
          y: 20
        }
        this.wantedLevel++;
      }
    }
  }

  checkBulletCollision() {
    for (const bullet of this.projectiles) {
      if(!(bullet.pos.x + bullet.width < this.player.pos.x || bullet.pos.x > this.player.pos.x + this.player.width || bullet.pos.y + bullet.height < this.player.pos.y || bullet.pos.y > this.player.pos.y + this.player.height)) {
        this.lives--;
        console.log("Jugador pierde una vida. Restan:", this.lives);
        this.projectiles.splice(this.projectiles.indexOf(bullet), 1);
      }
    }
  }

  animate() {
    if (this.isPaused) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.bg.draw(this.ctx);
    this.player.draw(this.ctx);
    this.npc.forEach(npc => npc.draw(this.ctx));
    this.enemies.forEach(enemy => enemy.draw(this.ctx));
    this.projectiles.forEach(p => p.draw(this.ctx));
  }

  update() {
    if(this.lives == 0) {
      this.gameOver();
    }
    // DEBUG
    // console.log("Npcs:", this.npc.length, "enemies:", this.enemies.length, "projectiles", this.projectiles.length);

    this.bg.update();
    this.player.update();
    this.npc.forEach(npc => npc.update());
    this.enemies.forEach(enemy => {
      enemy.update();
      if(enemy.pos.x % 300 == 0) {
        this.projectiles.push(enemy.shoot());
      }
    });
    this.projectiles.forEach(p => p.update());
    this.checkCollissions();
    this.distance++;
    this.calculateSpawn();
  }

  gameOver() {
    this.togglePause();
    alert("Perdiste");
    window.location.reload();
  }

  calculateSpawn() {
    if(Math.floor(Math.random() * 2) && this.distance % 50 == 0) {
      const prob = 1 / (1 + this.wantedLevel / 20);
      if(Math.random() < prob) {
        this.npc.push(new NPC({x: this.canvas.width, y: this.canvas.height - this.groundHeight, width: 30, height: 50}))
      } else {
        this.enemies.push(new Enemy({x: this.canvas.width, y: this.canvas.height - this.groundHeight, width: 30, height: 50}))
      }
    }
  }
}