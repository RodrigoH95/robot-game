class Game {
  constructor({speed, groundHeight, width, height}) {
    this.screen = new Screen(width, height);
    this.scene = null;
    this.isPaused = false;
    this.groundHeight = groundHeight;
    this.gameSpeed = speed;
    this.gui = null;
    this.distance = 0;
    this.fps = 60;
    this.lastFrameDt = 0;
  }

  init() {
    this.scene = new Scene(this.screen.getCanvas(), this.groundHeight);
    this.scene.init(this.gameSpeed);
    this.gui = new GUI();
    // Pause
    window.addEventListener("keydown", key => {
      if (key.code === "KeyP") this.togglePause();
    });
    this.startLoop();
  }

  startLoop() {
    console.log("Inicia juego");
    this.animate();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.scene.getPlayer().toggleControls();
    if(!this.isPaused) this.startLoop();
  }

  checkCollissions() {
    const { player, npc, enemies, projectiles } = this.scene.getEntities();
    Collisions.checkAllCollisions(this.screen.getCanvas(), player, npc, enemies, projectiles);
  }

  animate(time) {
    let now = time;
    let dif = now - this.lastFrameDt;
    if (dif > 1000 / this.fps) {
      this.lastFrameDt = now;
      if (this.isPaused) return;
      this.update();
      this.draw();
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.screen.clear();
    const bg = this.scene.getBackground();
    const fg = this.scene.getForeground();
    const { player, npc, enemies, projectiles } = this.scene.getEntities();
    this.screen.draw(bg, player, npc, enemies, projectiles, fg); // Colocados en el orden que se debe dibujar
  }

  update() {
    if(this.scene.getPlayerLives() < 1) {
      this.gameOver();
    }
    this.scene.update();
    this.scene.checkCollissions();
    this.distance++;
    this.scene.getPlayer().addScore(1);
    this.gui.update(this.scene.getPlayerLives(), this.scene.getPlayerScore());
    this.scene.calculateSpawn(this.distance, this.scene.getPlayer().getWantedLevel());
  }
  
  gameOver() {
    this.togglePause();
    // Mostrar modal en vez de redirigir ?
    window.location.href = "./end.html";
  }
}