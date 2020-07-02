import Cookie from './Cookie';
import WelcomePage from './WelcomePage';
import Header from './Header';
import StartPage from './StartPage';

window.addEventListener('load', () => {
	try {
		const cookieArr = document.cookie.split(';');
		const cookie = new Cookie(cookieArr);
		const userName = cookie.checkUserToken();
		if (userName) {
			WelcomePage.showWelcomePage(userName);
		} else {
			StartPage.showStartPage();
		}
	} catch (error) {
		console.error('Cookie not found');
		StartPage.showStartPage();
	} finally {
		Header.create();
	}
});
