import "phaser";

export class GameScene extends Phaser.Scene {

  delta: number;
  lastStarTime: number;
  starsCaught: number;
  starsFallen: number;
  sand: Phaser.Physics.Arcade.StaticGroup;
  info: Phaser.GameObjects.Text;
  player: any;
  cursors;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(params): void {
    this.delta = 1250;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload(): void {
    this.load.image('sky', './assets/sky.png');
    this.load.image('sand', './assets/sand.jpg');
    this.load.image("star", "./assets/star.png");
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
  }

  create(): void {
    this.add.image(400, 300, 'sky');
    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20
    });

    Phaser.Actions.PlaceOnLine(this.sand.getChildren(), new Phaser.Geom.Line(20, 580, 820, 580));

    this.sand.refresh();

    this.info = this.add.text(10, 10, '', {font: '24px Arial Bold', fill: '#fbf970'});

    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(320);
    this.physics.add.collider(this.player, this.sand);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4}],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    });
  }

  update(time): void {
    const diff: number = time - this.lastStarTime;
    if (diff > this.delta) {
      this.lastStarTime = time;
      if (this.delta > 750) {
        this.delta -= 20;
      }
      this.emitStar();
      this.info.text = this.starsCaught + " caught - " + this.starsFallen + " fallen (max 3)";
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-450);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(450);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-200);
    }
  }

  private onStarCatch(star: Phaser.Physics.Arcade.Image): () => void {
    return () => {
      star.disableBody(true, true);
      this.starsCaught += 1;
      star.destroy();
    }
  }

  private onFall(star: Phaser.Physics.Arcade.Image): () => void {
    return () => {
      this.starsFallen += 1;
      star.destroy();
      if (this.starsFallen > 2) {
        this.scene.start("ScoreScene", {starsCaught: this.starsCaught});
      }
    }
  }

  private emitStar(): void {
    let star: Phaser.Physics.Arcade.Image;
    const x = Phaser.Math.Between(25, 775);
    const y = 26;
    star = this.physics.add.image(x, y, "star");

    star.setDisplaySize(24, 22);
    star.setVelocity(0, 160);
    star.setInteractive();

    this.physics.add.collider(star, this.sand, this.onFall(star), null, this);
    this.physics.add.collider(star, this.player, this.onStarCatch(star), null, this);
    this.physics.add.overlap(star, this.player, this.onStarCatch(star), null, this);
  }
}
