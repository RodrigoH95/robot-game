class Game {
  constructor({speed, groundHeight}) {
    this.screen = null;
    this.scene = null;
    this.isPaused = false;
    this.groundHeight = groundHeight;
    this.gameSpeed = speed;
    this.gui = null;
    this.distance = 0;
  }

  init(width, height) {
    this.screen = new Screen(width, height);
    this.scene = new Scene(this.screen.getCanvas(), this.groundHeight);
    this.scene.startBackground(this.gameSpeed);
    this.gui = new GUI();
    this.scene.createPlayer();
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
    const entities = this.scene.getEntities();
    Collisions.checkAllCollisions(this.screen.getCanvas(), entities.player, entities.npc, entities.enemies, entities.projectiles);
  }

  animate() {
    if (this.isPaused) return;
    this.update();
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.screen.clear();
    const bg = this.scene.getBackground();
    const e = this.scene.getEntities();
    this.screen.draw(bg, e.player, e.npc, e.enemies, e.projectiles);
  }

  update() {
    if(this.scene.getPlayerLives() == 0) {
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
    alert("Perdiste");
    window.location.reload();
  }
}