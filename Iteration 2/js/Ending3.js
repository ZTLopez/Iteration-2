class Ending3 extends StoryScene {
    constructor() {
        super("Ending3");
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
                add.text(startBTN.x, startBTN.y, 'Play Again?', {
                    fontFamily: 'Press Start 2P',
                    fontSize: 500,
                    color: '#000000',
                    align: 'centre'
                })
                    .setScale(5)
                    .setOrigin(0.5);

                //title
                add.text(title.x, title.y, 'The End', {
                    fontFamily: 'Press Start 2P',
                    fontSize: 750,
                    color: '#7f0000',
                    align: 'centre'
                })
                    .setScale(5)
                    .setOrigin(0.5);

                //text box
                add.text(box.x, box.y, ["You have not learnt your lesson.",
                    "You keep harming the innocent for no reason.",
                    "You will become cruel and harm others.",
                    "You will never learn."], {

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