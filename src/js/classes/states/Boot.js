export default class Boot extends Phaser.State {
  preload() {
    this.load.image(`preloader`, `assets/img/preloader.gif`);
  }
  create() {
    this.state.start(`Preload`);
  }
}
