// Recursos que se cargan antes de iniciar el juego
// Para agregar un recurso
// Colocar imagen en carpeta "img" con nombre apropiado
// Agregar a la lista con el formato {id: "<tipo>_<nombre>_<numero>", src: "./img/<nombre_de_img>.png"}
// NOTA: Tanto en bg como fg (background y foreground), el numero final representa el orden en el que se dibuja la capa en el juego

const resources = [
  { id: "player_sprite", src: "./img/personajes/jugador/player_sprite.png" },
  { id: "npc_sprite_1", src: "./img/personajes/npcs/npc_sprite1.png" },
  { id: "npc_sprite_2", src: "./img/personajes/npcs/npc_sprite2.png" },
  { id: "npc_sprite_3", src: "./img/personajes/npcs/npc_sprite3.png" },
  { id: "npc_sprite_4", src: "./img/personajes/npcs/npc_sprite4.png" },
  { id: "enemy_sprite_1", src: "./img/personajes/enemigos/enemy_sprite.png" },
  { id: "bala", src: "./img/personajes/enemigos/bala_sprite.png" },
  { id: "fg_transito_0", src: "./img/paisajes/foreground/autos.png" },
  { id: "fg_arboles_1", src: "./img/paisajes/foreground/arboles.png" },
  { id: "bg_0", src: "./img/paisajes/background/cielo.png" },
  { id: "bg_1", src: "./img/paisajes/background/paisaje_1.png" },
  { id: "bg_2", src: "./img/paisajes/background/paisaje_2.png" },
  { id: "bg_3", src: "./img/paisajes/background/ciudad.png" },
  { id: "bg_4", src: "./img/paisajes/background/suelo.png" },
]


window.addEventListener("load", () => {
  window.scrollTo(0, 1);
});

const game = new Game({speed: 8, groundHeight: 100, width: 768, height: 432});
window.loader = Loader;
loader.setGame(game);
loader.loadResources(resources); // Carga recursos e inicia juego al terminar