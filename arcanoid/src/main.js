import { Boot } from "./scenes/Boot";
import { Level1 } from "./scenes/Level1";
import { Level2 } from "./scenes/Level2";
import { Level3 } from "./scenes/Level3";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Victory } from "./scenes/Victory";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",

  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, GameOver, Level1, Victory, Level2, Level3],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

export default new Phaser.Game(config);
