import { Scene } from "phaser";
import { GameObjects } from "../GameObjects";
import { Colliders } from "../Colliders";

export class Level3 extends Scene {
  constructor() {
    super("Level3");
  }
  init() {
    this.lives = 3;
  }

  create() {
    const scaleFull = this.sys.game.config.scaleFactor;
    const scaleFullX = this.sys.game.config.scaleFactor2;
    const scaleFullY = this.sys.game.config.scaleFactor3;

    this.scaleFullX = scaleFullX;
    this.scaleFullY = scaleFullY;

    this.level1_m = this.sound.add("level1_m", {
      loop: true,
      volume: 0.2,
    });

    this.level1_m.play();

    // this.game.canvas.style.cursor = "none";
    let fon = this.add.image(0, 0, "fon3");
    fon.setOrigin(0, 0);
    const scaleX = this.sys.game.config.width / fon.width;
    const scaleY = this.sys.game.config.height / fon.height;
    const scale = Math.max(scaleX, scaleY);
    fon.setScale(scale);

    this.gameObjects = new GameObjects(this);
    this.gameObjects.create();

    this.bricks = this.physics.add.staticGroup();
    const colors = [0xff0000, 0xff7105, 0xffff00, 0x00ff00, 0x00c4fa, 0xeb02c4];
    let leftPaddingBricks =
      window.innerWidth / 2 - 116 * 4 * scaleFullX + 58 * scaleFullX;

    for (let row = 0; row < 6; row++) {
      var blocksInRow = 8;
      if (row % 2 != 0) {
        blocksInRow = 7;
      }
      var offsetX = 0;
      for (let col = 0; col < blocksInRow; col++) {
        if (row % 2 != 0) {
          offsetX = 56 * scaleFull;
        }
        const brick = this.bricks.create(
          leftPaddingBricks + offsetX + col * 116 * scaleFullX,
          (100 + row * 50) * scaleFull,
          "brick"
        );
        brick.setTint(colors[row % colors.length]);
        brick.setDisplaySize(116 * scaleFull, 50 * scaleFull);
        brick.setOrigin(0.5, 0.5);
        brick.setOffset(0, 0);
      }
    }

    this.livesText = this.add.text(10, 10, `Lives: ${this.lives}`, {
      fontSize: "30px",
      fill: "#fff",
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.platform_m = this.sound.add("platform_m");
    this.brick_m = this.sound.add("brick_m");
    this.colliders = new Colliders(
      this,
      this.gameObjects.ball,
      this.gameObjects.platform
    );

    this.colliders.addColliders(this.bricks);
    this.ballLaunched = false;
  }

  update() {
    if (!this.ballLaunched) {
      this.gameObjects.ball.x = this.gameObjects.platform.x;
    }
    this.gameObjects.movePlatform();

    if (
      this.gameObjects.ball.y >=
      this.sys.game.config.height - 20 * this.scaleFullY
    ) {
      this.lives--;
      this.loseLife(this.lives);
    }
    this.input.once("pointerdown", this.startBall, this);
  }
  loseLife(lives) {
    this.livesText.setText(`Lives: ${this.lives}`);
    if (lives > 0) {
      this.ballLaunched = false;
      this.gameObjects.ball.setVelocity(0, 0);
      this.gameObjects.ball.setPosition(
        this.gameObjects.platform.x,
        660 * this.scaleFullY
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
