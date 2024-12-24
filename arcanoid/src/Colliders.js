export class Colliders {
  constructor(scene, ball, platform, lives) {
    this.scene = scene;
    this.ball = ball;
    this.platform = platform;
    this.lives = lives;
    this.scaleFullX = this.scene.scaleFullX;
    this.scaleFullY = this.scene.scaleFullY;
  }
  init() {
    this.platform_m = this.scene.sound.add("platform_m");
    this.brick_m = this.scene.sound.add("brick_m");
  }

  addColliders(bricks) {
    this.scene.physics.add.collider(
      this.ball,
      this.platform,
      this.hitPaddle,
      null,
      this.scene
    );

    this.scene.physics.add.collider(
      this.ball,
      bricks,
      this.hitBrick,
      null,
      this.scene
    );
  }

  hitPaddle(ball, paddle) {
    let diff = ball.x - paddle.x;
    ball.setVelocityX(20 * diff * this.scaleFullX);
    this.platform_m.play();
  }

  hitBrick(ball, brick) {
    brick.destroy();
    this.brick_m.play();
    if (this.bricks.countActive() === 0) {
      this.level1_m.stop();
      this.sound.play("victory_m");
      this.scene.start("Victory");
    }
  }
}
