var config = {
  type: Phaser.WEBGL,
  width: 900,
  height: 1600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 750
      }
    }
    },

  pixelArt: true,

    scene: [Menu, GameOver, Level1, Level2A, Level2B, Level2C, Level2D, Level3A, Level3B, Level3C, Level3D, Level4A, Level4B, Level4C, Level4D, Ending1, Ending2, Ending3, Ending4],

    callbacks: {
        postBoot: function () {
            resize();
        }
    }
};

var game = new Phaser.Game(config);
window.addEventListener("resize", resize, false);

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";

}
