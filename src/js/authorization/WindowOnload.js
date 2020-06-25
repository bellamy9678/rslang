import {
	checkUserToken
} from './Cookie';
import showStartPage from './StartPage';
import showWelcomePage from './WelcomePage';
import {
	createUnauthorisedUserLinks,
	createUnauthorisedUserButtons
} from './Header';

window.addEventListener('load', () => {
	const userName = checkUserToken();
	if (userName) {
		showWelcomePage(userName);
	} else {
		createUnauthorisedUserButtons();
		showStartPage();
	}
	createUnauthorisedUserLinks();
});
