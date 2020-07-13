import CookieMonster from '../utils/CookieMonster';
import {
	USER
} from '../utils/CookieConstants';
import showMainPage from '../mainPage/MainPage';
import Header from './Header';
import StartPage from './StartPage';

window.addEventListener('load', () => {
	try {
		const cookie = new CookieMonster();
		const userName = cookie.getCookie(USER.NAME);
		if (!userName) {
			throw new Error('Cookie not found');
		}
		showMainPage(userName);
	} catch (error) {
		StartPage.showStartPage();
	} finally {
		Header.create();
	}
});
