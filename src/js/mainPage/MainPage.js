import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import createWelcomePage from './WelcomePage';
import createGamesPage from './GamesPage';
import {
	initEnglishPuzzle,
	startPuzzleGame
} from '../english_puzzle/main';

function startMiniGame(container) {
	const games = document.querySelectorAll('.game');
	games.forEach(game => {
		game.addEventListener('click', event => {
			container.firstChild.remove();
			switch (event.currentTarget.id) {
			case 'savannah':
				break;
			case 'english-puzzle':
				initEnglishPuzzle();
				startPuzzleGame();
				break;
			case 'speak-it':
				break;
			case 'audio-challenge':
				break;
			case 'sprint':
				break;
			case 'own-game':
				break;
			default:
				throw new Error('Error');
			}
		});
	});
}

export default function showMainPage(userName) {
	const welcomeWrapper = createWelcomePage(userName);
	const gameWrapper = createGamesPage();
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();
	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['wrapper'],
		child: [welcomeWrapper, gameWrapper],
	});

	if (app.firstChild) {
		app.firstChild.remove();
	}
	app.append(wrapper);
	startMiniGame(app);
}
