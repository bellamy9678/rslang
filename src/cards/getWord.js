import {
	API,
	URL_PARAMS_WORDS,
	URL_PARAMS_GROUP,
	URL_ET,
	URL_PARAMS_PAGE,
} from "../shared/constants";
import Word from "./Word";
import getNewWordsFromApi from "./getNewWordsFromApi";

function getUrlFromGroupAndPage(group, page) {
	return `${API}${URL_PARAMS_WORDS}${URL_PARAMS_GROUP}${group}${URL_ET}${URL_PARAMS_PAGE}${page}`;
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
