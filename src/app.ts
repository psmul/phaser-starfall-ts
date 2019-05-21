import "phaser";
import {GameScene} from "./gameScene";
import {WelcomeScene} from "./welcomeScene";
import {ScoreScene} from "./scoreScene";

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
  backgroundColor: "#18216D"
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
