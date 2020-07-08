import Cookie from './Cookie';
import showMainPage from '../mainPage/MainPage';
import Header from './Header';
import StartPage from './StartPage';
import Game from '../sprint/Game';

const sprint = new Game();

// remove before commit

// import GameField from '../sprint/GameField';

window.addEventListener('load', () => {
	try {
		const cookieArr = document.cookie.split(';');
		const cookie = new Cookie(cookieArr);
		const userName = cookie.checkUserToken();
		if (userName) {
			showMainPage(userName);
		} else {
			StartPage.showStartPage();
		}
	} catch (error) {
		console.error('Cookie not found');
		// StartPage.showStartPage();
		sprint.init();
		sprint.start();
		// GameField.generateField();
	} finally {
		Header.create();
	}
});
