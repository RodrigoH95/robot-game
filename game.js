class Game {
  constructor({speed, groundHeight}) {
    this.canvas = null;
    this.ctx = null;

    this.isPaused = false;
    this.groundHeight = groundHeight;
    this.gameSpeed = speed;
    this.gui = null;
    this.loader = null;
    this.bg = null;
    this.layers = [1, 2, 3, 4, 5]; // Nombre de cada capa
    this.player = null;
    this.npc = [];
    this.enemies = [];
    this.projectiles = [];

    this.lives = 3;
    this.wantedLevel = 1;

    this.distance = 0;
  }

  init(width, height) {
    this.canvas = document.getElementById("myCanvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.bg = new Background(this.canvas, this.gameSpeed);
    this.loadImages();
    this.gui = new GUI();
    this.player = new Player({x: 150, y: this.canvas.height - this.groundHeight, width: 64, height: 64, img: this.loader.getResource("player_sprite")});
    console.log(this.player.img);
    this.player.speed.x = 6;
    this.player.toggleControls();
    // Pause
    window.addEventListener("keydown", key => {
      if (key.code === "KeyP") this.togglePause();
    })
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
    Collisions.checkAllCollisions(this.canvas, this.player, this.npc, this.enemies, this.projectiles);
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
    this.npc.forEach(npc => npc.draw(this.ctx));
    this.enemies.forEach(enemy => enemy.draw(this.ctx));
    this.player.draw(this.ctx);
    this.projectiles.forEach(p => p.draw(this.ctx));
  }

  update() {
    if(this.lives == 0) {
      this.gameOver();
    }
    // DEBUG
    // console.log("Npcs:", this.npc.length, "enemies:", this.enemies.length, "projectiles", this.projectiles.length);
    this.gui.addPuntaje(1);
    this.bg.update();
    this.player.update();
    this.npc.forEach(npc => npc.update());
    this.enemies.forEach(enemy => {
      enemy.update();
      this.calculateProjectiles(enemy);
    });
    this.projectiles.forEach(p => p.update());
    this.checkCollissions();
    this.distance++;
    this.calculateSpawn();
  }

  calculateProjectiles(enemy) {
    if(enemy.canShoot && enemy.pos.x - this.player.pos.x <= 950) {
      enemy.canShoot = false;
      const interval = setInterval(() => {
        if(enemy.bullets == 0 || !enemy.isAlive) return clearInterval(interval);
        const bullet = enemy.shoot();
        // Comprobar si el jugador está del lado derecho del proyectil
        if(bullet.pos.x < this.player.pos.x) {
          bullet.speed *= -1;
          bullet.pos.x += this.player.width / 2; // para que el enemigo dispare desde el lado derecho
        }
        this.projectiles.push(bullet);
        enemy.bullets--;
      }, 800)
    }
  }
  
  gameOver() {
    this.togglePause();
    alert("Perdiste");
    window.location.reload();
  }

  calculateSpawn() {
    if(Math.floor(Math.random() * 2) && this.distance % 100 == 0) {
      const prob = 1 / (1 + this.wantedLevel / 20); // Probabilidad de spawn basado en la cantidad de npc eliminados
      const obj = { x: this.canvas.width + Math.floor(Math.random() * this.canvas.width / 4), y: this.canvas.height - this.groundHeight, width: 30, height: 50 }
      Math.random() < prob ? this.npc.push(new NPC(obj)) : this.enemies.push(new Enemy(obj));
    }
  }
}