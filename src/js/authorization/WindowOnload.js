import {
	checkUserToken
} from './Cookie';
import showStartPage from './StartPage';
import showWelcomePage from './WelcomePage';

window.onload = () => {
	const userName = checkUserToken();
	if (userName) {
		showWelcomePage(userName);
	} else {
		showStartPage();
	}
};
