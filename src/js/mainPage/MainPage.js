import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import createWelcomePage from './WelcomePage';
import createGamesPage from './GamesPage';
import startMiniGame from './InitGames';

export default function showMainPage() {
	const welcomeWrapper = createWelcomePage();
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
	startMiniGame();
}
