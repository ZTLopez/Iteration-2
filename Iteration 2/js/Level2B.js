class Level2B extends BaseScene {
    constructor() {
        super("Level2B");
        this.tileDataKey = 'Level2B';
        this.tileDataSource = 'assets/maps/level2B.json';
        this.greedMax = 48;
        this.sanityMax = 18;
        this.shader = "Greyscale";
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.pipeTick = 0.0;

        this.pipeline = this.game.renderer.addPipeline(this.shader, new Greyscale(this.game));
        this.pipeline.setFloat2('uResolution', game.config.width, game.config.height);
        //this.pipeline.setFloat2('radius', 0.3);

        this.input.on("pointerdown", function () {
            //this.filter.setPipeline(this.shader);
            this.cameras.main.setRenderToTexture(this.shader);
        }, this)


    }

    update(time, delta) {
        super.update(time, delta);

        this.pipeline.setFloat1('uTime', this.pipeTick); //A tickrate that increases by 0.01 per frame. Could also use update's own time parameter.
        this.pipeTick += 0.01

       /* These two come into use for Spotlight
          this.pipeline.setFloat1('tx', this.player.x/this.game.config.width); //Find the player's normalised x position.
          this.pipeline.setFloat1('ty', 1-(this.player.y/this.game.config.height)); //Find the player's normalised y position.*/
    }
}
