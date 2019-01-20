export default class Ground extends Phaser.TileSprite {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, `ground`);
    this.autoScroll(- 200, 0);
    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = true;
  }
}
