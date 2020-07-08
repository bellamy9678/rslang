import Word from './Word';
import url from './url';
import CookieMonster from '../utils/CookieMonster';
import { USER } from '../utils/CookieConstants';
import { URL_WORD_CATEGORY } from '../shared/Constants';
import IntervalRepetition from './IntervalRepetition';

const APIMethods = {};

function getUserToken() {
	const biscuit = new CookieMonster();
	return biscuit.getCookie(USER.TOKEN);
}

async function makeRequestForNewWords(APIUrl) {
	let data = [];
	try {
		const response = await fetch(APIUrl);
		data = await response.json();
	} catch (error) {
		console.error(error.message);
	}
	return data;
}

APIMethods.getNewWordsArray = async function getNewWordsArray(group, page) {
	const APIUrl = url.groupPage(group, page);
	const data = await makeRequestForNewWords(APIUrl);

	console.log('word.userWord', data.userWord, typeof data);

	const words = data.map((word) => {
		const wordObj = new Word(word);
		wordObj.getMediaUrls(word);
		wordObj.addNewWordsParams();
		return wordObj;
	});
	return words;
};

APIMethods.saveWordsArray = async function saveWordsArray(words) {
	words.forEach((word) => {
		APIMethods.saveWord(word);
	});
};

APIMethods.saveWord = async function saveWord(word) {
	const wordToSave = {
		optional: word.optional,
	};
	const APIUrl = url.oneWord(word.id);
	await fetch(APIUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${getUserToken()}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(wordToSave),
	});
};

function convertIntoArray(filterResponse) {
	return filterResponse[0].paginatedResults;
}

APIMethods.getUserWordsByCategory = async function getUserWordsByCategory(
	category
) {
	const filter = {};
	filter[`${URL_WORD_CATEGORY}`] = category;
	const APIUrl = url.aggregated(JSON.stringify(filter));
	const data = [];
	try {
		const rawResponse = await fetch(APIUrl, {
			method: 'GET',
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${getUserToken()}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const res = await rawResponse.json();
		const answer = convertIntoArray(res);
		if (answer.length > 0) {
			const words = answer.map((word) => {
				const wordObj = new Word(word);
				wordObj.getMediaUrls(word);
				return wordObj;
			});
			return words;
		}
	} catch (error) {
		console.error(error.message);
	}
	return data;
};

APIMethods.updateUserWord = async function updateUserWord(wordObj, addParams) {
	const cookie = new CookieMonster();
	const userToken = cookie.getCookie(USER.TOKEN);
	const wordData = new IntervalRepetition(wordObj);
	try {
		const APIUrl = url.oneWord(wordData.wordId);
		const rawResponse = await fetch(APIUrl, {
			method: 'PUT',
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${userToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(addParams),
		});
		const data = await rawResponse.json();
		console.log('IntervalRepetition -> updateUserWord -> data', data);
	} catch (error) {
		console.error(error.message);
	}
};

export default APIMethods;
