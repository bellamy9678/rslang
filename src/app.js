import './sass/style.scss';

// import './js/authorization/NewUser';
// import './js/authorization/StartPage';
// import './js/authorization/WindowOnload';
// import Settings from './js/settings/Settings';
// // import training from './js/cards/Training';
// import './js/dictionary/CategoryView';

// async function initial() {
// 	let settings = new Settings();
// 	await Settings.init();
// 	settings = await Settings.getInstance();
// 	// await training();
// 	return settings;
// }

// initial();


import StatisticsPage from './js/statistics/StatisticsPage';
import {MOCA} from './js/statistics/constants';

const doc = document.querySelector('.app');
const statPage = new StatisticsPage(MOCA);
const stat = statPage.getStatisticsPage();
doc.append(stat);
