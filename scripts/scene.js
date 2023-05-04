// Clase encargada de generar objetos en la escena del juego
class Scene {
  constructor(canvas, groundHeight) {
    this.canvas = canvas;
    this.groundHeight = groundHeight;
    this.bg = null;
    this.fg = null;
    this.entities = {
      player: null,
      npc: [],
      enemies: [],
      projectiles: []
    }
    this.gameSpeed = 0;
  }

  init(speed) {
    this.gameSpeed = speed;
    // Obtencion de capas de fondo y frente ordenadas
    const bgLayers = window.loader.getResourceList("bg").map(layer => layer.id).sort((a, b) => a.split("_").pop() - b.split("_").pop());
    const fgLayers = window.loader.getResourceList("fg").map(layer => layer.id).sort((a, b) => a.split("_").pop() - b.split("_").pop());

    this.bg = this.createParallax(bgLayers, this.gameSpeed * 0.8);
    this.fg = this.createParallax(fgLayers, this.gameSpeed * 2);
    this.createPlayer();
  }

  createParallax(layers, speed) {
    const parallax = new Background(this.canvas.height, speed);
    parallax.init(layers);
    return parallax;
  }

  createPlayer() {
    const player = new Player({x: 150, y: this.canvas.height - this.groundHeight, width: 64, height: 64, img: window.loader.getResource("player_sprite"), speed: this.gameSpeed + 3});
    this.entities.player = player;
    player.init();
    player.toggleControls();
  }

  getPlayerScore() {
    return this.entities.player.getScore();
  }

  getPlayerLives() {
    return this.entities.player.getLives();
  }

  createNpc(type) {
    let img = null;
    let speed = this.gameSpeed;
    if(type === "NPC"){
      const npcs = window.loader.getResourceList("npc");
      const npcNumber = Math.ceil(Math.random() * npcs.length) ;
      img = window.loader.getResource(`npc_sprite_${npcNumber}`);
      speed++;
    } else {
      img =  window.loader.getResource(`enemy_sprite_1`);
    }
    const obj = { x: this.canvas.width + Math.floor(Math.random() * this.canvas.width / 4), y: this.canvas.height - this.groundHeight, width: 64, height: 64, img, speed }
    type === "NPC" ? this.entities.npc.push(new NPC(obj)) : this.entities.enemies.push(new Enemy(obj));
  }

  getBackground() {
    return this.bg;
  }

  getForeground() {
    return this.fg;
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
        if(enemy.bullets == 0 || !enemy.isAlive || enemy.pos.x < this.entities.player.pos.x) return clearInterval(interval);
        const bullet = enemy.shoot();
        // Comprobar si el jugador está del lado derecho del proyectil
        // if(bullet.pos.x < this.entities.player.pos.x) {
        //   bullet.speed *= -1;
        //   bullet.pos.x += this.entities.player.width / 2; // para que el enemigo dispare desde el lado derecho
        // }
        this.entities.projectiles.push(bullet);
      }, 1000)
    }
  }

  calculateSpawn(distance, wantedLevel) {
    if(distance % 30 == 0) {
      Math.random() < 1 / (1 + wantedLevel / 80) ? this.createNpc("NPC") : this.createNpc("Enemy");
    }
  }

  checkCollissions() {
    Collisions.checkAllCollisions(this.canvas, this.entities.player, this.entities.npc, this.entities.enemies, this.entities.projectiles);
  }

  update() {
    this.bg.update();
    this.fg.update();
    this.entities.player.update();
    this.entities.npc.forEach(npc => npc.update());
    this.entities.enemies.forEach(enemy => {
      enemy.update();
      this.calculateProjectiles(enemy);
    });
    this.entities.projectiles.forEach(p => p.update());
  }
}