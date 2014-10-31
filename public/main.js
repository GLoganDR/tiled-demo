var game = new Phaser.Game(300, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

var map, background, plants, ground, scenery, cursors, money;
function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Desert', 'desert');

  background = map.createLayer('Background');
  background.resizeWorld();
  scenery = map.createLayer('Scenery');
  plants = map.createLayer('Plants');
  ground = map.createLayer('Ground');

  map.setCollision(26, true, 'Ground');

  money = game.add.group();
  money.enableBody = true;
  money.physicsBodyType = Phaser.Physics.ARCADE;
  map.createFromObjects('Money', 49, 'coin', 0, true, false, money);
  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  player = game.add.sprite(32, 200, 'dude');

  game.camera.follow(player);

  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  game.physics.arcade.enable(player);
  cursors = game.input.keyboard.createCursorKeys();
}

function update(){
  game.physics.arcade.collide(player, ground);
    if(cursors.left.isDown){
      player.body.velocity.x = -150;
      player.animations.play('left');
    }
    else if(cursors.right.isDown){
      player.body.velocity.x = 150;
      player.animations.play('right');
    }else{
      player.body.velocity.x = 0;
      player.animations.stop();
      player.frame = 4;
    }

    if(cursors.up.isDown){
      player.body.velocity.y = -150;
      player.animations.stop();
      player.frame = 4;
    }else if(cursors.down.isDown){
      player.body.velocity.y = 150;
      player.animations.stop();
      player.frame = 4;
    }

}
