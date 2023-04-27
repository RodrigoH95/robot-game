class Controls {
  constructor() {
    this.keys = {
      up: false,
      right: false,
      down: false,
      left: false,
      space: false,
    };
    this.enabled = false;
    this.buttons = null;
  }

  start() {
    this.buttons = document.getElementById("botones");
    this.buttons.addEventListener("touchstart", this.handleButtonDown.bind(this));
    this.buttons.addEventListener("touchend", this.handleButtonUp.bind(this));

    console.log("Starting controls");
    addEventListener("keydown", this.handleKeyDown.bind(this));
    addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  stop() {
    removeEventListener("keydown", this.handleKeyDown.bind(this));
    removeEventListener("keyup", this.handleKeyUp.bind(this));
    this.buttons.removeEventListener("touchstart", this.handleButtonDown.bind(this));
    this.buttons.removeEventListener("touchend", this.handleButtonUp.bind(this));
    Object.keys(this.keys).forEach(key => this.keys[key] = false);
  }

  handleKeyDown(key) {
    if(!this.enabled) return;
    switch (key.code) {
      case "ArrowUp":
        this.keys.up = true;
        break;
      case "ArrowRight":
        this.keys.right = true;
        break;
      case "ArrowDown":
        this.keys.down = true;
        break;
      case "ArrowLeft":
        this.keys.left = true;
        break;
      case "Space":
        this.keys.space = true;
    }
  }

  handleKeyUp(key) {
    if(!this.enabled) return;
    switch (key.code) {
      case "ArrowUp":
        this.keys.up = false;
        break;
      case "ArrowRight":
        this.keys.right = false;
        break;
      case "ArrowDown":
        this.keys.down = false;
        break;
      case "ArrowLeft":
        this.keys.left = false;
        break;
      case "Space":
        this.keys.space = false;
    }
  }

  handleButtonDown(btn) {
    if(!btn.target.classList.contains("action")) return;
    switch (btn.target.id) {
      case "left":
        this.keys.left = true;
        break;
      case "right":
        this.keys.right = true;      
        break;
      case "jump":
        this.keys.up = true;
        break;
      case "attack":
        this.keys.space = true;
        break;
    }
  }

  handleButtonUp(btn) {
    if(!btn.target.classList.contains("action")) return;
    switch (btn.target.id) {
      case "left":
        this.keys.left = false;
        break;
      case "right":
        this.keys.right = false;      
        break;
      case "jump":
        this.keys.up = false;
        break;
      case "attack":
        this.keys.space = false;
        break;
    }
  }
}