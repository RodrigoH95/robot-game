class Loader {
    static resourcesToLoad = null;
    static resources = [];
    static game = null;

  static setGame(game) {
    this.game = game;
  }

  static loadResources(resourceArr) {
    this.resourcesToLoad = resourceArr.length;
    for (const resource of resourceArr) {
      this.loadAsset(resource);
    }
  }

  static loadAsset(resource) {
    const id = resource.id;
    const img = new Image();
    img.onload = this.resourcesToLoad--;
    img.src = resource.src;
    this.resources.push({id, img});
    this.checkGameStart();
  }

  static getResource(id) {
    const resource = this.resources.find(asset => asset.id === id);
    return resource.img;
  }

  static checkGameStart() {
    if (!this.resourcesToLoad) {
      this.game.init(800, 600);
    }
  }
}