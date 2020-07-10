import { API, URL_NEXT, URL_USER, URL_STATISTICS } from '../shared/Constants';
import CookieMonster from '../utils/CookieMonster';
import { USER } from '../utils/CookieConstants';
import Settings from '../settings/Settings';
import { INITIAL_STATISTICS, TOTAL_WORDS_PERCENT } from './constants';
import StatisticsPage from './StatisticsPage';
import addChart from './Chart';

function getUserId() {
	const biscuit = new CookieMonster();
	return biscuit.getCookie(USER.ID);
}

function getUserToken() {
	const biscuit = new CookieMonster();
	return biscuit.getCookie(USER.TOKEN);
}

function convertStatisticsFromAPI(response) {
	const stat = response.optional;
	const keys = Object.keys(stat);
	keys.forEach((elem) => {
		stat[elem] = JSON.parse(stat[elem]);
	});
	return stat;
}

function convertStatisticsToAPI(statistics) {
	let stat = JSON.stringify(statistics);
	stat = JSON.parse(stat);
	const objToSave = {
		optional: {},
	};
	const keys = Object.keys(stat);
	keys.forEach((elem) => {
		stat[elem] = JSON.stringify(stat[elem]);
	});
	objToSave.optional = stat;
	return JSON.stringify(objToSave);
}

async function sendRequestPut(statistics) {
	const userId = getUserId();
	const url = `${API}${URL_USER}${URL_NEXT}${userId}${URL_NEXT}${URL_STATISTICS}`;
	let answer;
	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${getUserToken()}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: convertStatisticsToAPI(statistics),
		});
		answer = await response.json();
	} catch (error) {
		console.log(error);
	}
	return answer;
}

async function sendRequestGet() {
	const userId = getUserId();
	const url = `${API}${URL_USER}${URL_NEXT}${userId}${URL_NEXT}${URL_STATISTICS}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${getUserToken()}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	const answer = await response.json();
	const returned = convertStatisticsFromAPI(answer);
	return returned;
}

const Statistics = {};

Statistics.putGamesResult = async function putGamesResult(gameObj) {
	const stat = await sendRequestGet();
	const position = stat.games.findIndex((game) => {
		return game.name === gameObj.name;
	});
	const statObj = {
		date: new Date(),
		result: gameObj.result,
	};
	stat.games[position].data.push(statObj);
	await sendRequestPut(stat);
};

Statistics.putWordsProgress = async function putWordsProgress() {
	const stat = await sendRequestGet();
	const settings = await Settings.getInstance();
	const amount = settings.newWordsShowed;
	const label = stat.statistics.labels[stat.statistics.labels.length - 1] + amount;
	const progress = Math.round(label) / TOTAL_WORDS_PERCENT;
	stat.statistics.dates.push(new Date());
	stat.statistics.labels.push(label);
	stat.statistics.data.push(progress);
	await sendRequestPut(stat);
};

Statistics.init = async function init() {
	const userId = getUserId();
	const url = `${API}${URL_USER}${URL_NEXT}${userId}${URL_NEXT}${URL_STATISTICS}`;
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${getUserToken()}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: convertStatisticsToAPI(INITIAL_STATISTICS),
	});
	const answer = await response.json();
	return answer;
};

Statistics.getData = async function getData() {
	const answer = await sendRequestGet();
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
