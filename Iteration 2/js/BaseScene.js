class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.scene = this;
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
        this.healthText;
        this.sanitytext;
        this.greedText;
        this.greed = 0;
        this.sanity = 0;
        this.greedMax;
        this.sanityMax;
        this.enemies = [];


    }


    init(data) {
        if (this.id != "Level1") {
            this.greed = data.greed;
            this.sanity = data.sanity;
        }
    }

    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
        this.load.image("tilesheet", "assets/maps/tileset.png");
        this.load.image("assets","assets/maps/assets.png");
        this.load.image("sky", "assets/maps/Sky.png");
        this.load.spritesheet("squirrel", "assets/sprites/squirrels.png", { frameWidth: 64, frameHeight: 64 });
        //this.load.spritesheet("bat", "assets/sprites/bat.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("portal", "assets/maps/portal.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("coin", "assets/sprites/coin.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("player", "assets/sprites/BoBunny.png", { frameWidth: 48, frameHeight: 64 });

    }

    create() {

        const map = this.make.tilemap({ key: this.tileDataKey });
        const tileset = map.addTilesetImage("tilesheet");
        const sky = map.addTilesetImage("sky");
        this.backgroundimg = map.createStaticLayer("backgroundimg", [sky], 0, 0);
        this.background = map.createStaticLayer("background", [tileset], 0, 0);
        this.ground = map.createStaticLayer("collision", [tileset], 0, 0);
        this.ground.setCollisionByProperty({ collides: true });

               
        map.findObject("object", this.SpawnPlayer, this);
        map.findObject("object", this.Spawn, this);

        //this.physics.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player.sprite, this.ground);
        this.physics.add.collider(this.portal.sprite, this.ground);


        //text showing the health remaining on the player
        this.healthText = this.add.text(100, 200, "Health: " + this.player.health, { fontFamily: 'Arial', fontSize: 50, fill: "#000000" });
        this.healthText.depth = 10;
        this.healthText.setScrollFactor(0);

        //text showing how many enemies the player has killed
        this.sanityText = this.add.text(100, 300, "Kills: " + this.sanity, { fontFamily: 'Arial', fontSize: 50, fill: "#000000" });
        this.sanityText.depth = 10;
        this.sanityText.setScrollFactor(0);

        //text showing how many coins collected
        this.greedText = this.add.text(100, 250, "Coins: " + this.greed, { fontFamily: 'Arial', fontSize: 50, fill: "#000000" });
        this.greedText.depth = 10;
        this.greedText.setScrollFactor(0);



        this.graphics = this.add.graphics({ fillStyle: { color: 0x0000aa } });


        this.cameras.main.setZoom(1);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5).set;


        this.physics.add.overlap(this.player.sprite, this.portal.sprite, this.handleCollision , null , this);

        console.log(this.scene.greed)
        console.log(this.scene.sanity)
    }

    SpawnPlayer(object) {
        if (object.type === "Spawn") {
            if (object.name === "playerSpawn") {
                this.player = new Player(object.x, object.y, this);
            }
        }
    }

    Spawn(object) {
        this.coin = []
        if (object.type === "Spawn") {
            if (object.name === "coin") {
                this.coin.push(new Coin(object.x, object.y, this));

            }
            if (object.name === "LevelEnd") {
                this.portal = new Portal(object.x, object.y, this);

            }
        }
        if (object.type === "Enemy") {
            if (object.name === "Squirrel") {
                var squirrel = new Enemy(object.x, object.y, this);
                this.enemies.push(squirrel);
                squirrel.create();
            }

        }
    }

    handleCollision(object1, object2) {

        console.log(this.id);
        if ((this.greed < this.greedMax/2 && this.sanity < this.sanityMax/2) && (this.id === "Level1")) {
            //pure level 2
            this.scene.start("Level2A", { greed: this.greed , sanity: this.sanity });
        }
        else if ((this.greed >= this.greedMax/2 && this.sanity < this.sanityMax/2) && (this.id === "Level1")) {
          //greed level 2
            this.scene.start("Level2B", { greed: this.greed , sanity: this.sanity });
        }
        else if ((this.greed < this.greedMax/2 && this.sanity >= this.sanityMax/2) && (this.id === "Level1")) {
          //insanity level 2
            this.scene.start("Level2C", { greed: this.greed , sanity: this.sanity });
        }
        else if (( this.greed >= this.greedMax/2 && this.sanity >=  this.sanityMax/2) && (this.id === "Level1")) {
          //evil level 2
            this.scene.start("Level2D", { greed: this.greed , sanity: this.sanity});
        }
        else if ((this.greed < this.greedMax/2) && (this.id === "Level2A" || this.id === "Level2B" || this.id === "Level2C" || this.id === "Level2D")) {
            //pure level 3
            this.scene.start("Level3A", { greed: this.greed , sanity: this.sanity });
        }
        else if ((this.greed > this.greedMax / 2) && (this.id === "Level2A" || this.id === "Level2B" || this.id === "Level2C" || this.id === "Level2D")) {
            //greed level 3
            this.scene.start("Level3B", { greed: this.greed , sanity: this.sanity });
        }
    }





    resetTouching() {
        this.player.isTouching = false;
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.player.CheckDeath();
        if (this.player.dead == true) {
            this.scene.start("GameOver")
        }
        if (this.enemies) {
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].update(time,delta);
            }
        }
        this.updateGraphics();
    }
    updateGraphics(){
      this.rect1 = new Phaser.Geom.Rectangle(
        this.cameras.main.width/2,
        this.cameras.main.height*0.87,
        this.cameras.main.width/2,
        this.cameras.main.height*0.2
      );

      this.rect2 = new Phaser.Geom.Rectangle(
        0,
        this.cameras.main.height*0.87,
        this.cameras.main.width/2,
        this.cameras.main.height*0.2
      );

      this.rect3 = new Phaser.Geom.Rectangle(
        0,
        this.cameras.main.height*0.76,
        this.cameras.main.width,
        this.cameras.main.height*0.11
        );
                
      this.graphics.clear();
      this.graphics.fillGradientStyle(0xffffff,0xffffff,0.5,0.5,0.5);
      this.graphics.fillRectShape(this.rect1).setScrollFactor(0);
      this.graphics.fillGradientStyle(0x000000,0x000000,0xffffff,0xffffff,0.5)
      this.graphics.fillRectShape(this.rect2).setScrollFactor(0);
      this.graphics.fillGradientStyle(0xb7b7b7,0xb7b7b7,0x666666,0x666666,0.5)
      this.graphics.fillRectShape(this.rect3).setScrollFactor(0);
    }


}
