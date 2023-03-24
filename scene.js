// Clase encargada de generar objetos en la escena del juego
class Scene {
  constructor(canvas, groundHeight) {
    this.canvas = canvas;
    this.groundHeight = groundHeight;
    this.bg = null;
    this.entities = {
      player: null,
      npc: [],
      enemies: [],
      projectiles: []
    }
    this.layers = [1, 2, 3, 4, 5]; // Nombre de cada capa del fondo
  }

  startBackground(speed) {
    const bg = new Background(this.canvas.height, speed);
    bg.init(this.layers);
    this.bg = bg;
  }

  createPlayer() {
    const player = new Player({x: 150, y: this.canvas.height - this.groundHeight, width: 64, height: 64, img: window.loader.getResource("player_sprite")});
    this.entities.player = player;
    player.toggleControls();
  }

  getPlayerScore() {
    return this.entities.player.getScore();
  }

  getPlayerLives() {
    return this.entities.player.getLives();
  }

  createNpc(type) {
    const obj = { x: this.canvas.width + Math.floor(Math.random() * this.canvas.width / 4), y: this.canvas.height - this.groundHeight, width: 64, height: 64 }
    type === "NPC" ? this.entities.npc.push(new NPC(obj)) : this.entities.enemies.push(new Enemy(obj));
  }

  getBackground() {
    return this.bg;
  }

  getEntities() {
    return this.entities;
  }

  getPlayer() {
    return this.entities.player;
  }

  getEnemies() {
    return this.entities.enemies;
  }

  getNpc() {
    return this.entities.npc;
  }

  calculateProjectiles(enemy) {
    if(enemy.canShoot && enemy.pos.x - this.entities.player.pos.x <= 950) {
      enemy.canShoot = false;
      const interval = setInterval(() => {
        if(enemy.bullets == 0 || !enemy.isAlive) return clearInterval(interval);
        const bullet = enemy.shoot();
        // Comprobar si el jugador está del lado derecho del proyectil
        if(bullet.pos.x < this.entities.player.pos.x) {
          bullet.speed *= -1;
          bullet.pos.x += this.entities.player.width / 2; // para que el enemigo dispare desde el lado derecho
        }
        this.entities.projectiles.push(bullet);
        enemy.bullets--;
      }, 800)
    }
  }

  calculateSpawn(distance, wantedLevel) {
    if(Math.floor(Math.random() * 2) && distance % 100 == 0) {
      Math.random() < 1 / (1 + wantedLevel / 20) ? this.createNpc("NPC") : this.createNpc("Enemy");
    }
  }

  checkCollissions() {
    Collisions.checkAllCollisions(this.canvas, this.entities.player, this.entities.npc, this.entities.enemies, this.entities.projectiles);
  }

  update() {
    this.bg.update();
    this.entities.player.update();
    this.entities.npc.forEach(npc => npc.update());
    this.entities.enemies.forEach(enemy => {
      enemy.update();
      this.calculateProjectiles(enemy);
    });
    this.entities.projectiles.forEach(p => p.update());
  }
}