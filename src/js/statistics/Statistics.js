import Settings from '../settings/Settings';
import { DEFAULT_SETTINGS } from '../settings/Constants';
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
	const now = new Date();
	const lastDate = settings.lastUpdateDate;
	const lastUpdate = new Date(+lastDate);
	lastUpdate.setHours(+lastUpdate.getHours() + DEFAULT_SETTINGS.NEW_DAY_HOURS);
	const amount = +settings.newWordsShowed;

	if (now > lastUpdate) {
		now.setHours(
			DEFAULT_SETTINGS.HOURS,
			DEFAULT_SETTINGS.MINUTES,
			DEFAULT_SETTINGS.SECONDS,
			DEFAULT_SETTINGS.MILLISECONDS
		);

		stat.statistics.datesArr.push(`${now}`);
		const label =
			+stat.statistics.labelsArr[stat.statistics.labelsArr.length - 1] + amount;
		const progress = Math.round(label) / TOTAL_WORDS_PERCENT;
		stat.statistics.labelsArr.push(+label);
		stat.statistics.dataArr.push(+progress);
	} else {
		stat.statistics.datesArr.pop();
		stat.statistics.dataArr.pop();
		const label =
			+stat.statistics.labelsArr[stat.statistics.labelsArr.length - 1] + amount;
		const progress = Math.round(label) / TOTAL_WORDS_PERCENT;
		stat.statistics.labelsArr.push(+label);
		stat.statistics.dataArr.push(+progress);
	}

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
	doc.firstChild.remove();
	const stat = await Statistics.getData();
	const statPage = new StatisticsPage(stat);
	const statPageElem = statPage.getStatisticsPage();
	doc.append(statPageElem);
	addChart(statPage.gameData);
	return statPage;
};

export default Statistics;
