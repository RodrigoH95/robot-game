class Collisions {
  static checkAllCollisions(canvas, player, npcs, enemies, projectiles) {
    this.checkPlayerMapCollision(player, canvas);
    this.checkNPCMapCollision(canvas, npcs);
    this.checkNPCMapCollision(canvas, enemies);
    this.checkPlayerNpcCollision(player, npcs);
    this.checkPlayerNpcCollision(player, enemies);
    this.checkBulletCollision(player, projectiles);
    
  }

  static checkPlayerMapCollision(player, canvas) {
    if(player.pos.x <= 0) player.pos.x = 0;
    if(player.pos.x >= canvas.width - player.width) player.pos.x = canvas.width - player.width;
  }

  static checkNPCMapCollision(canvas, npcArray) {
    const npc = npcArray[0];
    if(npc && (npc.pos.x < -npc.width || npc.pos.y + npc.height < 0 || npc.pos.x > canvas.width * 2)) {
      npcArray.shift();
    }
  }

  static checkPlayerNpcCollision(player, npcArray) {
    for (const npc of npcArray) {
      if(!(npc.pos.x + npc.width < player.pos.x || npc.pos.x > player.pos.x + player.width || npc.pos.y + npc.height < player.pos.y || npc.pos.y > player.pos.y + player.height) && player.isHitting) {
        npc.speed = { x: -10, y: 20 };
        npc.isAlive = false;
        player.increaseWantedLevel();
        player.addScore(100);
      }
    }
  }

  static checkBulletCollision(player, projectiles) {
    for (let b = 0; b < projectiles.length; b++) {
      const bullet = projectiles[b];
      if(!(bullet.pos.x + bullet.width < player.pos.x || bullet.pos.x > player.pos.x + player.width || bullet.pos.y + bullet.height < player.pos.y || bullet.pos.y > player.pos.y + player.height)) {
        player.lives--;
        projectiles.splice(projectiles[b], 1);
        b--;
      }
    }
  }
}