export default class Leaderboard extends Phaser.State {
  init(){
    this.table = document.querySelector(`.score-table`);
    this.table.classList.remove(`hidden`);
    this.form = document.querySelector(`.score-form`);
    this.form.classList.add(`hidden`);
  }
  create() {
    this.background = this.add.sprite(0, 0, `background`);
    this.ground = this.add.tileSprite(0, 400, 335, 112, `ground`);
    this.ground.autoScroll(- 200, 0);

    this.titleGroup = this.add.group();

    this.title = this.add.bitmapText(0, 0, `flappyfont`, `Leaderboard`, 32);
    this.titleGroup.add(this.title);

    this.titleGroup.x = 40;
    this.titleGroup.y = 100;

    this.instructionsButton = this.add.button(this.game.width / 2, 400, `startButton`, this.menuClick, this);
    this.instructionsButton.anchor.setTo(0.5, 0.5);
    this.instructionsButton.scale.setTo(-1, 1);
  }
  menuClick(){
    this.state.start(`Menu`);
  }
}
