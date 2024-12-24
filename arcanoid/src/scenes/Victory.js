import { Scene } from "phaser";

export class Victory extends Scene {
  constructor() {
    super("Victory");
  }

  create() {
    this.logo = this.add.image(0, 0, "completed");
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
