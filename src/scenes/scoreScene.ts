import "phaser";

export class ScoreScene extends Phaser.Scene {
  score: number;
  result: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "ScoreScene"
    });
  }

  init(params: any): void {
    this.score = params.starsCaught;
  }

  preload(): void {
    this.load.image('sky', './assets/sky.png');
  }

  create(): void {
    this.add.image(400, 300, 'sky');
    var resultText: string = 'Your score is ' + this.score + '!';
    this.result = this.add.text(200, 250, resultText,
      {font: '48px Arial Bold', fill: '#fbf970'});
    var hintText: string = "Click to restart";
    this.hint = this.add.text(300, 350, hintText,
      {font: '24px Arial Bold', fill: '#fbf970'});
    this.input.on('pointerdown', function () {
      this.scene.start("WelcomeScene");
    }, this);
  }
};
