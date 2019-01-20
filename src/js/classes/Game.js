import Boot from './states/Boot';
import Preload from './states/Preload';
import Instructions from './states/Instructions';
import Leaderboard from './states/Leaderboard';
import Menu from './states/Menu';
import Play from './states/Play';

export default class Game extends Phaser.Game {
  constructor() {
    super(288, 505, Phaser.AUTO);
    this.state.add(`Boot`, Boot);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Leaderboard`, Leaderboard);
    this.state.add(`Instructions`, Instructions);
    this.state.add(`Play`, Play);
    this.state.start(`Boot`);
  }
}
