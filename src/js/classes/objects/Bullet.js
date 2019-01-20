export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, `bullet`, frame);

    this.anchor.setTo(.5);

    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = true;
  }
}
