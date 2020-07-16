import LevelSelect from './LevelSelect';
import Hints from './Hints';
import Tooltips from './Tooltips';
import GameField from './GameField';
import Game from './Game';

export default function initEnglishPuzzle() {
	const levelSelect = new LevelSelect();
	const hints = new Hints();
	const tooltips = new Tooltips();
	const gameField = new GameField();
	const game = new Game();
	game.init();
	levelSelect.init();
	hints.init();
	tooltips.init();
	gameField.init();
	game.start();
}
