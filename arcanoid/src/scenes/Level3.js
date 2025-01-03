import { Level } from "./Level";
import { Colliders } from "../Colliders";

export class Level3 extends Level {
  constructor() {
    super("Level3");
  }

  create() {
    const scaleFull = this.sys.game.config.scaleFactor;
    const scaleFullMax = this.sys.game.config.scaleFactor4;
    const scaleFullX = this.sys.game.config.scaleFactor2;
    const scaleFullY = this.sys.game.config.scaleFactor3;

    this.scaleFullMax = scaleFullMax;
    this.scaleFullX = scaleFullX;
    this.scaleFullY = scaleFullY;

    let fon = this.add.image(0, 0, "fon3");
    fon.setOrigin(0, 0);
    const scaleX = this.sys.game.config.width / fon.width;
    const scaleY = this.sys.game.config.height / fon.height;
    const scale = Math.max(scaleX, scaleY);
    fon.setScale(scale);
    super.create();

    this.bricks = this.physics.add.staticGroup();
    const colors = [0xff0000, 0xff7105, 0xffff00, 0x00ff00, 0x00c4fa, 0xeb02c4];
    let leftPaddingBricks =
      this.sys.game.config.width / 2 - 116 * 4 * scaleFullMax;

    for (let row = 0; row < 6; row++) {
      var blocksInRow = 8;
      if (row % 2 != 0) {
        blocksInRow = 7;
      }
      var offsetX = 58 * scaleFullMax;
      for (let col = 0; col < blocksInRow; col++) {
        if (row % 2 != 0) {
          offsetX = 116 * scaleFullMax;
        }
        const brick = this.bricks.create(
          leftPaddingBricks + offsetX + col * 116 * scaleFullMax,
          (100 + row * 50) * scaleFullMax,
          "brick"
        );
        brick.setTint(colors[row % colors.length]);
        brick.setDisplaySize(116 * scaleFullMax, 50 * scaleFullMax);
        brick.body.setSize(116 * scaleFullMax, 50 * scaleFullMax);
        brick.setOffset(0, 0);
        brick.setOrigin(0.5 / scaleFullX, 0.5 / scaleFullY);
      }
    }

    this.cursors = this.input.keyboard.createCursorKeys();
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

    if (this.gameObjects.ball.y > this.gameObjects.platform.y) {
      this.lives--;
      this.loseLife(this.lives);
    }
    this.input.once("pointerdown", this.startBall, this);
  }
}
