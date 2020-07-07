import './sass/style.scss';

import './js/authorization/NewUser';
import './js/authorization/StartPage';
import './js/authorization/WindowOnload';
import Settings from './js/settings/Settings';
import training from './js/cards/Training';

async function initial() {
	const settings = await new Settings();
	await training();
	console.log(settings);
	return settings;
}

initial();
