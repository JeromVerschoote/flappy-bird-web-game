export default class Preload extends Phaser.State {
  preload() {
    this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, `preloader`);
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.image(`background`, `assets/img/background.png`);
    this.load.image(`ground`, `assets/img/ground.png`);
    this.load.image(`title`, `assets/img/title.png`);
    this.load.image(`startButton`, `assets/img/start-button.png`);
    this.load.image(`leaderboardButton`, `assets/img/leaderboard-button.png`);
    this.load.image(`instructions`, `assets/img/instructions.png`);

    this.load.spritesheet(`bird`, `assets/img/bird.png`, 34, 24, 3);
    this.load.image(`bullet`, `assets/img/bullet.png`);

    this.load.spritesheet(`pipe`, `assets/img/pipes.png`, 54, 320, 2);

    this.load.bitmapFont(`flappyfont`, `assets/fonts/flappyfont/flappyfont.png`, `assets/fonts/flappyfont/flappyfont.fnt`);

    this.load.audio(`score`, `assets/audio/score.wav`);
    this.load.audio(`flap`, `assets/audio/flap.wav`);
    this.load.audio(`pipeHit`, `assets/audio/pipe-hit.wav`);
    this.load.audio(`groundHit`, `assets/audio/ground-hit.wav`);

    this.load.image(`scoreboard`, `assets/img/scoreboard.png`);
    this.load.image(`gameover`, `assets/img/gameover.png`);
    this.load.spritesheet(`medals`, `assets/img/medals.png`, 44, 46, 2);
    this.load.image(`particle`, `assets/img/particle.png`);
  }
  create() {
    this.state.start(`Menu`);
  }
}
