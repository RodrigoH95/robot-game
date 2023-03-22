const resources = [
  {
    id: "player_sprite", src: "./img/player_sprite.png"
  },
]

const game = new Game({speed: 5, groundHeight: 155});

game.loader = Loader;
game.loader.setGame(game);
game.loader.loadResources(resources);
