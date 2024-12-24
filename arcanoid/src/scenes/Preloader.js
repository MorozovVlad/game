import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.add.rectangle(centerX, centerY, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(centerX - 230, centerY, 4, 28, 0xffffff);
    this.load.on("progress", (progress) => {
      bar.width = 4 + 460 * progress;
    });
    this.load.on("complete", () => {
      const text = this.add
        .text(centerX, centerY + 40, "Click to start!", {
          fontSize: "32px",
          fill: "#ffffff",
        })
        .setOrigin(0.5);
    });
  }

  preload() {
    this.load.setPath("assets");
    this.load.image("ball", "ball.png");
    this.load.image("platform", "platform.png");
    this.load.image("brick", "brick.png");
    this.load.image("fon", "fon.jpg");
    this.load.image("fon2", "fon2.jpg");
    this.load.image("fon3", "fon3.jpg");
    this.load.image("menu", "menu.jpg");
    this.load.image("completed", "completed.jpg");
    this.load.image("game_over", "game_over.jpg");
    this.load.audio("platform_m", "platform.mp3");
    this.load.audio("brick_m", "brick.mp3");
    this.load.audio("level1_m", "level1.ogg");
    this.load.audio("clickSound", "click.mp3");
    this.load.audio("clickSound2", "click2.mp3");
    this.load.audio("game_over", "game_over.mp3");
    this.load.audio("lose_live", "lose_live.mp3");
    this.load.audio("menu_m", "menu.mp3");
    this.load.audio("victory_m", "victory.mp3");
  }

  create() {
    const scaleXX = this.sys.game.config.width / 1536;
    const scaleYY = this.sys.game.config.height / 748;
    const scaleFull = Math.min(scaleXX, scaleYY);

    this.sys.game.config.scaleFactor3 = scaleYY;
    this.sys.game.config.scaleFactor2 = scaleXX;
    this.sys.game.config.scaleFactor = scaleFull;
    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
