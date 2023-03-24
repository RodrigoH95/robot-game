const resources = [
  {
    id: "player_sprite", src: "./img/player_sprite.png"
  },
  { 
    id: "1", src: "./img/1.png"
  },
  { 
    id: "2", src: "./img/2.png"
  },
  { 
    id: "3", src: "./img/3.png"
  },
  { 
    id: "4", src: "./img/4.png"
  },
  { 
    id: "5", src: "./img/5.png"
  },
]

const game = new Game({speed: 5, groundHeight: 155});
window.loader = Loader;
loader.setGame(game);
loader.loadResources(resources); // Carga recursos e inicia juego al terminar
