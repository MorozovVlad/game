import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    const scaleFullY = this.sys.game.config.scaleFactor3;
    this.menu_m = this.sound.add("menu_m", {
      loop: true,
      volume: 0.4,
    });

    this.menu_m.play();

    this.logo = this.add.image(0, 0, "menu");
    this.logo.setOrigin(0, 0);

    const scaleX = this.sys.game.config.width / this.logo.width;
    const scaleY = this.sys.game.config.height / this.logo.height;
    const scale = Math.max(scaleX, scaleY);
    this.logo.setScale(scale);

    const createInteractiveText = (x, y, text, scene, callback) => {
      const interactiveText = scene.add
        .text(x, y, text, {
          fontFamily: "Arial Black",
          fontSize: 38,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        })
        .setOrigin(0.5)
        .setInteractive();

      interactiveText.on("pointerover", () => {
        interactiveText.setStyle({ color: "#ff0000" });
        scene.sound.play("clickSound2");
        scene.input.setDefaultCursor("pointer");
      });

      interactiveText.on("pointerout", () => {
        interactiveText.setStyle({ color: "#ffffff" });
        scene.input.setDefaultCursor("default");
      });

      interactiveText.on("pointerdown", () => {
        scene.sound.play("clickSound");
        this.menu_m.stop();
        callback();
      });

      return interactiveText;
    };

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY + 150 * scaleFullY;
    const spacing = 80 * scaleFullY;

    createInteractiveText(centerX, centerY - spacing, "Level 1", this, () =>
      this.scene.start("Level1")
    );

    createInteractiveText(centerX, centerY, "Level 2", this, () =>
      this.scene.start("Level2")
    );

    createInteractiveText(centerX, centerY + spacing, "Level 3", this, () =>
      this.scene.start("Level3")
    );
  }
}
