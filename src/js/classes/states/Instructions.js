export default class Menu extends Phaser.State {
  create() {
    this.background = this.add.sprite(0, 0, `background`);
    this.ground = this.add.tileSprite(0, 400, 335, 112, `ground`);
    this.ground.autoScroll(- 200, 0);

    this.titleGroup = this.add.group();

    this.instructions = this.add.sprite(0, 0, `instructions`);
    this.titleGroup.add(this.instructions);

    this.bird = this.add.sprite(40, 0, `bird`);
    this.titleGroup.add(this.bird);

    this.bird.animations.add(`flap`);
    this.bird.animations.play(`flap`, 12, true);

    this.titleGroup.x = 60;
    this.titleGroup.y = this.game.height / 2;

    this.add.tween(this.titleGroup).to({y: this.game.height / 2 - 15}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.input.onDown.add(this.startClick, this);
  }
  startClick() {
    this.state.start(`Play`);
  }
}
