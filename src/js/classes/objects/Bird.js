import BulletGroup from '../objects/BulletGroup.js';

export default class Bird extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, `bird`, frame);

    this.anchor.setTo(.5);
    this.animations.add(`flap`);
    this.animations.play(`flap`, 12, true);

    this.game.physics.arcade.enableBody(this);

    this.flapSound = this.game.add.audio(`flap`);

    this.bullets = game.add.group();
  }
  update() {
    if (this.angle < 90) {
      this.angle += 2.5;
    }
  }
  flap() {
    this.flapSound.play();
    this.body.velocity.y = - 400;
    this.game.add.tween(this).to({angle: - 40}, 100).start();
  }
  shoot() {
    this.generateBullets();
  }
  generateBullets(){
    let bulletGroup = this.bullets.getFirstExists(false);
    if (!bulletGroup) {
      bulletGroup = new BulletGroup(this.game, this.bullets);
    }
    bulletGroup.reset(this.body.x + 20, this.body.y);
  }

  /*moveLeft() {
    this.body.velocity.x = - 400;
  }
  moveRight(){
    this.body.velocity.x = + 400;
  }
  moveUp() {
    this.body.velocity.y = - 400;
  }
  moveDown() {
    this.body.velocity.y = + 400;
  }*/
}
