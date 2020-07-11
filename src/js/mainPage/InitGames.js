import {
	GAMES
} from '../shared/Text';

import StartScreen from '../start_screen/StartScreen';
import {
	initEnglishPuzzle,
	startPuzzleGame
} from '../english_puzzle/main';
// import startSpekItGame from '../speakit/speakit';
import SprintGame from '../sprint/Game';
import audioChallenge from '../audio-challenge/audio-challenge';

function addStartScreenToMiniGame(name, descr, startGamecallback) {
	const startScreen = new StartScreen();
	startScreen.showStartScreen({
		name,
		descr,
		callback() {
			startGamecallback();
		},
	});
}

export default function startMiniGame() {
	const app = document.querySelector('.app');
	const games = document.querySelectorAll('.game');
	let name;
	let descr;
	let callback;
	games.forEach(game => {
		game.addEventListener('click', event => {
			switch (event.currentTarget.id) {
			case 'savannah':
				break;
			case 'english-puzzle':
				name = GAMES.englishPuzzle.name;
				descr = GAMES.englishPuzzle.description;
				callback = () => {
					initEnglishPuzzle();
					startPuzzleGame();
				};
				break;
			case 'speak-it':
				// name = GAMES.speakIt.name;
				// descr = GAMES.speakIt.description;
				// callback = () => {
				// 	startSpekItGame();
				// };
				break;
			case 'audio-challenge':
				name = GAMES.audioChallenge.name;
				descr = GAMES.audioChallenge.description;
				callback = () => {
					audioChallenge();
				};
				break;
			case 'sprint':
				name = GAMES.sprint.name;
				descr = GAMES.sprint.description;
				callback = () => {
					new SprintGame().start();
				};
				break;
			case 'own-game':
				break;
			default:
				throw new Error('Error');
			}
			app.firstChild.remove();
			addStartScreenToMiniGame(name, descr, callback);
		});
	});
}
