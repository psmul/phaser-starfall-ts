import "phaser";
import {GameScene} from "./scenes/gameScene";
import {WelcomeScene} from "./scenes/welcomeScene";
import {ScoreScene} from "./scenes/scoreScene";

const config: GameConfig = {
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  scene: [WelcomeScene, GameScene, ScoreScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  backgroundColor: "#37b4d6"
};

export class StarfallGame extends Phaser.Game {
  constructor(config: GameConfig) {
    // @ts-ignore
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new StarfallGame(config);
});
