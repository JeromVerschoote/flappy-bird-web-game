export default class Menu extends Phaser.State {
  init(){
    this.table = document.querySelector(`.score-table`);
    this.table.classList.add(`hidden`);
    this.form = document.querySelector(`.score-form`);
    this.form.classList.add(`hidden`);
  }
  create() {
    this.background = this.add.sprite(0, 0, `background`);
    this.ground = this.add.tileSprite(0, 400, 335, 112, `ground`);
    this.ground.autoScroll(- 200, 0);

    this.titleGroup = this.add.group();

    this.title = this.add.sprite(0, 0, `title`);
    this.titleGroup.add(this.title);

    this.bird = this.add.sprite(200, 5, `bird`);
    this.titleGroup.add(this.bird);

    this.bird.animations.add(`flap`);
    this.bird.animations.play(`flap`, 12, true);

    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    this.add.tween(this.titleGroup).to({y: 115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.instructionsButton = this.add.button(this.game.width / 2, 300, `startButton`, this.instructionsClick, this);
    this.instructionsButton.anchor.setTo(0.5, 0.5);

    this.leaderboardButton = this.add.button(this.game.width / 2, 380, `leaderboardButton`, this.leaderboardClick, this);
    this.leaderboardButton.anchor.setTo(0.5, 0.5);
  }
  instructionsClick(){
    this.state.start(`Instructions`);
  }
  leaderboardClick(){
    this.state.start(`Leaderboard`);
  }
}
