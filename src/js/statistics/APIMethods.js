import { API, URL_NEXT, URL_USER, URL_STATISTICS } from '../shared/Constants';
import CookieMonster from '../utils/CookieMonster';
import { USER } from '../utils/CookieConstants';
import { INITIAL_STATISTICS } from './constants';

const APIMethods = {};

function getUserId() {
	const biscuit = new CookieMonster();
	return biscuit.getCookie(USER.ID);
}

function getUserToken() {
	const biscuit = new CookieMonster();
	return biscuit.getCookie(USER.TOKEN);
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

function convertStatisticsFromAPI(response) {
	const stat = response.optional;
	const keys = Object.keys(stat);
	keys.forEach((elem) => {
		stat[elem] = JSON.parse(stat[elem]);
	});
	return stat;
}

APIMethods.sendRequestPut = async function sendRequestPut(statistics) {
	const url = `${API}${URL_USER}${URL_NEXT}${getUserId()}${URL_NEXT}${URL_STATISTICS}`;
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
};

APIMethods.sendRequestGet = async function sendRequestGet() {
	const url = `${API}${URL_USER}${URL_NEXT}${getUserId()}${URL_NEXT}${URL_STATISTICS}`;
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
};

APIMethods.sendRequestInit = async function sendRequestInit() {
	const url = `${API}${URL_USER}${URL_NEXT}${getUserId()}${URL_NEXT}${URL_STATISTICS}`;
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

export default APIMethods;
