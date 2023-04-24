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
    img.src = resource.src;
    this.resources.push({id, img});
    img.onload = function() {
      this.resourcesToLoad--;
      this.checkGameStart();
    }.bind(this);
  }

  static getResource(id) {
    const resource = this.resources.find(asset => asset.id === id);
    return resource.img;
  }

  static getResourceList(id) {
    const resources = this.resources.filter(asset => asset.id.includes(id));
    return resources;
  }
  
  static checkGameStart() {
    if (!this.resourcesToLoad) {
      this.game.init();
    }
  }
}