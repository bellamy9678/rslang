import LevelSelect from './LevelSelect';
import Hints from './Hints';
import Tooltips from './Tooltips';
import GameField from './GameField';
import Game from './Game';

const levelSelect = new LevelSelect();
const hints = new Hints();
const tooltips = new Tooltips();
const gameField = new GameField();
const game = new Game();



export function initEnglishPuzzle() {
  game.init();
  levelSelect.init();
  hints.init();
  tooltips.init();
  gameField.init();
}

export function startPuzzleGame() {
  game.start();
}




