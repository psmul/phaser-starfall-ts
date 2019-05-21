import "phaser";

export class WelcomeScene extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "WelcomeScene"
    });
  }


  preload(): void {
    // this.load.image('sky', 'assets/sky.png');
  }

  create(): void {
    // this.add.image(400, 300, 'sky');
    const titleText: string = "Starfall";
    this.title = this.add.text(210, 200, titleText, {font: '128px Arial Bold', fill: '#fbf970'});
    const hintText: string = "Click to start";
    this.hint = this.add.text(335, 350, hintText, {font: '24px Arial Bold', fill: '#fbf970'});
    this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start("GameScene");
    }, this);
  }
};
