import Word from './Word';
import url from './url';
import CookieMonster from '../utils/CookieMonster';
import {
	USER,
} from '../utils/CookieConstants';
import {
	URL_WORD_CATEGORY,
} from '../shared/Constants';
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
	const words = data.map((word) => {
		const wordObj = new Word(word);
		wordObj.getMediaUrls(word);
		wordObj.addNewWordsParams();
		return wordObj;
	});
	// APIMethods.saveWords(words); // await
	console.log(words);
	return words;
};

async function makeRequestForAllUserWords(APIUrl) {
	let data = [];
	try {
		const response = await fetch(APIUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${getUserToken()}`,
				Accept: 'application/json',
			},
		});
		data = await response.json();
	} catch (error) {
		console.log(error);
	}
	return data;
}

APIMethods.getAllUserWordsArray = async function getAllUserWordsArray() {
	const APIUrl = url.allWords();
	const data = await makeRequestForAllUserWords(APIUrl);
	const words = data.map((word) => {
		// переобразовать в нормальный объект
		return word;
	});
	return words;
};

APIMethods.saveWord = async function saveWord(word) {
	const APIUrl = url.oneWord(word.id);
	try {
		fetch(APIUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${getUserToken()}`,
				Accept: 'application/json',
			},
			body: JSON.stringify(word)
		});
	} catch (error) {
		console.log(error);
	}
};

APIMethods.getUserWordsByCategory = async function (category) {
	const filter = {};
	filter[`${URL_WORD_CATEGORY}`] = category;
	const APIUrl = url.aggregated(JSON.stringify(filter));
	let data;
	try {
		const rawResponse = await fetch(APIUrl, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${getUserToken()}`,
				'Accept': 'application/json',
			}
		});
		data = await rawResponse.json();
		console.log('data', data);
	} catch (error) {
		console.error(error.message);
	}
	return data;
}

APIMethods.updateUserWord = async function (wordObj, addParams) {
	const cookie = new CookieMonster();
	const userToken = cookie.getCookie(USER.TOKEN);
	const wordData = new IntervalRepetition(wordObj);
	try {
		const APIUrl = url.oneWord(wordData.wordId);
		const rawResponse = await fetch(APIUrl, {
			method: 'PUT',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${userToken}`,
				'Accept': 'application/json',
			},
			body: JSON.stringify(addParams),
		});
		const data = await rawResponse.json();
		console.log('IntervalRepetition -> updateUserWord -> data', data);
	} catch (error) {
		console.error(error.message);
	}
}

// APIMethods.getAggregatedWord = async function getAggregatedWord(category) {
// 	const APIUrl = url.aggregated(category);
// 	let data = []; // ???
// 	try {
// 		const response = fetch(APIUrl, {
// 			method: 'POST',
// 			headers: {
// 				Authorization: `Bearer ${getUserToken()}`,
// 				Accept: 'application/json',
// 			},
// 		});
// 		data = await response.json();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	return data;
// };

export default APIMethods;
