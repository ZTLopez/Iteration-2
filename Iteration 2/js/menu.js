class Menu extends StoryScene{
  constructor(){
    super("Menu");
  }

    preload() {
        super.preload();
  }

    create() {
      //the passing of the variable objects assigned to args(arguments)
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
              //START BUTTON
              add.text(startBTN.x, startBTN.y, 'START', {
                  fontFamily: 'Press Start 2P',
                  fontSize: 500,
                  color: '#d9a066',
                  align: 'centre'
              })
                  .setScale(5)
                  .setOrigin(0.5);

              //TITLE
              add.text(title.x, title.y, 'Butterfly Effect', {
                  fontFamily: 'Press Start 2P',
                  fontSize: 750,
                  color: '#d9a066',
                  align: 'centre'
              })
                  .setScale(5)
                  .setOrigin(0.5);


              add.text(box.x, box.y, ["There are different routes depending how ",
                  "many kills you get and coins you collect.",
                  " Most of your actions lead to a bad ending, ",
                  "but how much do you care to try for a good one?"], {

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

  update(){
      super.update();
  }
}
