class Controls {
  constructor() {
    this.keys = {
      up: false,
      right: false,
      down: false,
      left: false,
    };
    this.enabled = false;
  }

  start() {
    console.log("Starting controls");
    addEventListener("keydown", this.handleKeyDown.bind(this));
    addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  stop() {
    removeEventListener("keydown", this.handleKeyDown.bind(this));
    removeEventListener("keyup", this.handleKeyUp.bind(this));
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
}