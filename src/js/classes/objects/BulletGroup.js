import Bullet from './Bullet.js';

export default class BulletGroup extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);

    this.bullet = new Bullet(this.game, 0, 0, 0);
    this.add(this.bullet);

    this.setAll(`body.velocity.x`, + 200);
  }
  update() {
    if (!this.bullet.inWorld) {
      this.exists = false;
    }
  }
  reset(x, y) {
    this.bullet.reset(0, 0);
    this.x = x;
    this.y = y;
    this.setAll(`body.velocity.x`, + 400);
    this.exists = true;
  }
}
