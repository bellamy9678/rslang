import {
	API,
	URL_PARAM_WORDS,
	URL_PARAM_GROUP,
	URL_USER,
	URL_WORDS,
	URL_AGGREGATED,
	URL_NEXT,
	URL_ET,
	URL_PARAM_PAGE,
	URL_FILTER
} from '../shared/Constants';

const userID = '5eff1c83635aec001764df35'; // убрать потом

// const biscuit = new CookieMonster();

const url = {};

url.groupPage = function getUrlFromGroupAndPage(group, page) {
	return `${API}${URL_PARAM_WORDS}${URL_PARAM_GROUP}${group}${URL_ET}${URL_PARAM_PAGE}${page}`;
};

url.allWords = function getUrlForAllUserWords() {
	const userId = userID; // biscuit.getCookie(USER_COOKIE_NAME.NAME);
	return `${API}${URL_USER}${userId}${URL_WORDS}`;
};

url.oneWord = function getUrlForUserWord(wordId) {
	const userId = userID; // biscuit.getCookie(USER_COOKIE_NAME.NAME);
	return `${API}${URL_USER}${userId}${URL_WORDS}${URL_NEXT}${wordId}`;
};

url.aggregated = function getUrlForAggregatedWord(criteria) {
	const userId = userID; // biscuit.getCookie(USER_COOKIE_NAME.NAME);
	return `${API}${URL_USER}${userId}${URL_NEXT}${URL_AGGREGATED}${URL_FILTER}${criteria}`;
};

export default url;
