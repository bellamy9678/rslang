import Settings from '../settings/Settings';
import { TOTAL_WORDS_PERCENT } from './constants';
import StatisticsPage from './StatisticsPage';
import addChart from './Chart';
import APIMethods from './APIMethods';

const Statistics = {};

Statistics.putGamesResult = async function putGamesResult(gameObj) {
	const stat = await APIMethods.sendRequestGet();
	const position = stat.games.findIndex((game) => {
		return game.name === gameObj.name;
	});
	const statObj = {
		date: new Date(),
		result: gameObj.result,
	};
	stat.games[position].data.push(statObj);
	await APIMethods.sendRequestPut(stat);
};

Statistics.putWordsProgress = async function putWordsProgress() {
	const stat = await APIMethods.sendRequestGet();
	const settings = await Settings.getInstance();
	const amount = settings.newWordsShowed;
	const label = stat.statistics.labels[stat.statistics.labels.length - 1] + amount;
	const progress = Math.round(label) / TOTAL_WORDS_PERCENT;
	stat.statistics.dates.push(new Date());
	stat.statistics.labels.push(label);
	stat.statistics.data.push(progress);
	await APIMethods.sendRequestPut(stat);
};

Statistics.init = async function init() {
	const statistics = await APIMethods.sendRequestInit();
	return statistics;
};

Statistics.getData = async function getData() {
	const answer = await APIMethods.sendRequestGet();
	return answer;
};

Statistics.getStatisticsPage = async function getStatisticsPage() {
	const doc = document.querySelector('.app');
	const stat = await Statistics.getData();
	const statPage = new StatisticsPage(stat);
	const statPageElem = statPage.getStatisticsPage();
	doc.append(statPageElem);
	addChart(statPage.gameData);
	return statPage;
};

export default Statistics;
