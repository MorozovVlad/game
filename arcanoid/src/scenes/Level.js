import { Scene } from "phaser";
import { GameObjects } from "../GameObjects";
import { Colliders } from "../Colliders";

export class Level extends Scene {
  constructor(key) {
    super(key);
    this.lives = 3;
    this.ballLaunched = false;
  }

  init() {
    this.lives = 3;
  }

  create() {
    this.livesText = this.add.text(10, 10, `Lives: ${this.lives}`, {
      fontSize: "20px",
      fill: "#fff",
    });
    this.setupSounds();
    this.setupGameObjects();
    this.setupInput();
  }

  setupSounds() {
    this.level1_m = this.sound.add("level1_m", {
      loop: true,
      volume: 0.2,
    });
    this.level1_m.play();

    this.platform_m = this.sound.add("platform_m");
    this.brick_m = this.sound.add("brick_m");
  }

  setupGameObjects() {
    this.gameObjects = new GameObjects(this);
    this.gameObjects.create();
  }

  setupInput() {
    this.input.once("pointerdown", this.startBall.bind(this));
  }

  loseLife(lives) {
    this.livesText.setText(`Lives: ${this.lives}`);
    if (lives > 0) {
      this.ballLaunched = false;
      this.gameObjects.ball.setVelocity(0, 0);
      this.gameObjects.ball.setPosition(
        this.gameObjects.platform.x,
        640 * this.scaleFullY
      );
      this.sound.play("lose_live");
    } else {
      this.sound.play("game_over");
      this.level1_m.stop();
      this.scene.start("GameOver");
    }
  }

  startBall() {
    if (!this.ballLaunched) {
      this.gameObjects.ball.setVelocity(300, -300);
      this.ballLaunched = true;
    }
  }
}
