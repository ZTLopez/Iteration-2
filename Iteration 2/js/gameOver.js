class GameOver extends StoryScene {
    constructor() {
        super("GameOver");
    }

    preload() {
        super.preload();
    }

    create() {
        var args = super.create();
        var game = args.game;
        var add = args.add;
        var box = args.box;
        var startBTN = args.startBTN;
        var background = args.background;
        var title = args.title;

        WebFont.load({
            google: {
                families: ['Freckle Face', 'Press Start 2P']
            },
            active: function () {
                //start button
                add.text(startBTN.x, startBTN.y, 'Replay', {
                    fontFamily: 'Press Start 2P',
                    fontSize: 500,
                    color: '#000000',
                    align: 'centre'
                })
                    .setScale(5)
                    .setOrigin(0.5);

                //title
                add.text(title.x, title.y, 'Game Over', {
                    fontFamily: 'Press Start 2P',
                    fontSize: 750,
                    color: '#7f0000',
                    align: 'centre'
                })
                    .setScale(5)
                    .setOrigin(0.5);

                //text box
                add.text(box.x, box.y, "Up for another go? ", {

                        fontFamily: 'Press Start 2P',
                        fontSize: 750,
                        color: '#000000',
                        align: 'centre'
                    })
                    .setScale(2.5)
                    .setOrigin(0.5);



            }
        });
        

    }


    update() {
        super.update();
    }
}
