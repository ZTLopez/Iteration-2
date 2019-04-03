class StoryScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.scene = this;
        this.id = id;
        this.startBTN = {};

    }

    preload() {
        this.load.image("box", "assets/sprites/StoryBox.png");
        this.load.image("button", "assets/sprites/button.png");
        this.load.image("title", "assets/sprites/title.png");
        this.load.image("screen", "assets/sprites/screen.png");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        var background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "screen", null).setScale(1);
        var startBTN = this.add.image(this.game.config.width / 2, 700, "button", null).setScale(2);

        startBTN.setInteractive();
        startBTN.once("pointerup", function () {
            this.scene.start("Level1");
        }, this);

        var title = this.add.image(this.game.config.width / 2, 300, "title", null).setScale(0.5);

        var box = this.add.image(this.game.config.width / 2, 1200, "box", null).setScale(1);

        //GOOGLE fontSize
        var add = this.add;

        //returns all the variables 
        return {background, startBTN, title, box, add, game}
    }

    update() {

    }
}