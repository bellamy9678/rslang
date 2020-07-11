import CookieMonster from '../utils/CookieMonster';
import {
	USER
} from '../utils/CookieConstants';
import showMainPage from '../mainPage/MainPage';
import Header from './Header';
// import StartPage from './StartPage';
import Game from '../english_puzzle/Game';

const enPuzzle = new Game();


window.addEventListener('load', () => {
	try {
		const cookie = new CookieMonster();
		const userName = cookie.getCookie(USER.NAME);
		if (!userName) {
			throw new Error('Cookie not found');
		}
		showMainPage(userName);
	} catch (error) {
		enPuzzle.init();
		enPuzzle.start();
		// StartPage.showStartPage();
	} finally {
		Header.create();
	}
});
