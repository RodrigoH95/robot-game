const resources = [
  {
    id: "player_sprite", src: "./img/player_sprite.png"
  },
  { 
    id: "npc1_sprite", src: "./img/npc1_sprite.png"
  },
  { 
    id: "npc2_sprite", src: "./img/npc2_sprite.png"
  },
  { 
    id: "npc3_sprite", src: "./img/npc3_sprite.png"
  },
  { 
    id: "npc4_sprite", src: "./img/npc4_sprite.png"
  },
  { 
    id: "enemy_sprite", src: "./img/enemy_sprite.png"
  },
  { 
    id: "vacio", src: "./img/vacio.png"
  },
  { 
    id: "cielo", src: "./img/cielo.png"
  },
  { 
    id: "ciudad", src: "./img/ciudad.png"
  },
  { 
    id: "suelo", src: "./img/suelo.png"
  },
  { 
    id: "paisaje1", src: "./img/paisaje_1.png"
  },
  { 
    id: "paisaje2", src: "./img/paisaje_2.png"
  },
]

const game = new Game({speed: 5, groundHeight: 100, width: 768, height: 432});
window.loader = Loader;
loader.setGame(game);
loader.loadResources(resources); // Carga recursos e inicia juego al terminar
