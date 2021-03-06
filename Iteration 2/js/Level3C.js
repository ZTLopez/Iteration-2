class Level3C extends BaseScene {
    constructor() {
        super("Level3C");
        this.tileDataKey = 'Level3C';
        this.tileDataSource = 'assets/maps/level3C.json';
        this.greedMax = 74;
        this.sanityMax = 26;
        this.levelCode = 3;
        this.shader = "DarkColour";
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.pipeTick = 0.0;

        this.pipeline = this.game.renderer.addPipeline(this.shader, new DarkColour(this.game));
        this.pipeline.setFloat2('uResolution', game.config.width, game.config.height);
        //this.pipeline.setFloat2('radius', 0.3);

        //this.input.on("pointerdown", function () {
        //this.filter.setPipeline(this.shader);
        this.cameras.main.setRenderToTexture(this.shader);
        //}, this)

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
