import {
	API,
	URL_PARAM_WORDS,
	URL_PARAM_GROUP,
	URL_ET,
	URL_PARAM_PAGE,
} from '../shared/Constants';
import Word from './Word';

function getUrlFromGroupAndPage(group, page) {
	return `${API}${URL_PARAM_WORDS}?${URL_PARAM_GROUP}${group}${URL_ET}${URL_PARAM_PAGE}${page}`;
}

async function getNewWordsFromApi(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export default async function getNewWordsArray(group, page) {
	const url = getUrlFromGroupAndPage(group, page);
	const data = await getNewWordsFromApi(url);
	return data.map((word) => {
		const wordObj = new Word(word);
		wordObj.getMediaUrls(word);
		return wordObj;
	});
}
