import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.logo = this.add.image(0, 0, "game_over");
    this.logo.setOrigin(0, 0);

    const scaleX = this.sys.game.config.width / this.logo.width;
    const scaleY = this.sys.game.config.height / this.logo.height;
    const scale = Math.max(scaleX, scaleY);
    this.logo.setScale(scale);

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
