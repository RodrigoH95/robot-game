// Recursos que se cargan antes de iniciar el juego
// Para agregar un recurso
// Colocar imagen en carpeta "img" con nombre apropiado
// Agregar a la lista con el formato {id: "<tipo>_<nombre>_<numero>", src: "./img/<nombre_de_img>.png"}
// NOTA: Tanto en bg como fg (background y foreground), el numero final representa el orden en el que se dibuja la capa en el juego

const resources = [
  { id: "player_sprite", src: "./img/player_sprite.png" },
  { id: "npc_sprite_1", src: "./img/npc_sprite1.png" },
  { id: "npc_sprite_2", src: "./img/npc_sprite2.png" },
  { id: "npc_sprite_3", src: "./img/npc_sprite3.png" },
  { id: "npc_sprite_4", src: "./img/npc_sprite4.png" },
  { id: "enemy_sprite_1", src: "./img/enemy_sprite.png" },
  { id: "fg_vacio_0", src: "./img/vacio.png" },
  { id: "bg_cielo_0", src: "./img/cielo.png" },
  { id: "bg_paisaje1_1", src: "./img/paisaje_1.png" },
  { id: "bg_paisaje2_2", src: "./img/paisaje_2.png" },
  { id: "bg_ciudad_3", src: "./img/ciudad.png" },
  { id: "bg_suelo_4", src: "./img/suelo.png" },
]

const game = new Game({speed: 8, groundHeight: 100, width: 768, height: 432});
window.loader = Loader;
loader.setGame(game);
loader.loadResources(resources); // Carga recursos e inicia juego al terminar