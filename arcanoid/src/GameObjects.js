export class GameObjects {
  constructor(scene) {
    this.scene = scene;
    this.platform = null;
    this.ball = null;
    this.scaleFullX = this.scene.scaleFullX;
    this.scaleFullY = this.scene.scaleFullY;
  }

  createPlatform() {
    let leftPaddingPlatform = this.scene.sys.game.config.width / 2;
    this.platform = this.scene.physics.add.sprite(
      leftPaddingPlatform,
      700 * this.scaleFullY,
      "platform"
    );
    this.platform.setCollideWorldBounds(true);
    this.platform.setDisplaySize(200 * this.scaleFullX, 40 * this.scaleFullY);
    this.platform.setImmovable(true);
  }

  createBall() {
    let leftPaddingPlatform = this.scene.sys.game.config.width / 2;
    this.ball = this.scene.physics.add.sprite(
      leftPaddingPlatform,
      655 * this.scene.scaleFullY,
      "ball"
    );
    this.ball.setCollideWorldBounds(true);
    this.ball.setDisplaySize(
      40 * this.scene.scaleFullX,
      40 * this.scene.scaleFullX
    );
    this.ball.body.setSize(
      40 * this.scene.scaleFullX,
      40 * this.scene.scaleFullX
    );
    this.ball.setBounce(1);
  }
  movePlatform = () => {
    const mouseX = this.scene.input.activePointer.x;
    this.scene.gameObjects.platform.x = mouseX;

    const halfPlatformWidth = 100 * this.scaleFullX;
    if (this.scene.gameObjects.platform.x - halfPlatformWidth < 0) {
      this.scene.gameObjects.platform.x = halfPlatformWidth;
    } else if (
      this.scene.gameObjects.platform.x + halfPlatformWidth >
      this.scene.sys.game.config.width
    ) {
      this.scene.gameObjects.platform.x =
        this.scene.sys.game.config.width - halfPlatformWidth;
    }
  };

  create() {
    this.createPlatform();
    this.createBall();
  }
}
