import Word from '../cards/Word';
import url from './url';

const APIMethods = {};
// const biscuit = new CookieMonster();

const userToken =	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmYxYzgzNjM1YWVjMDAxNzY0ZGYzNSIsImlhdCI6MTU5Mzg3MTM1MCwiZXhwIjoxNTkzODg1NzUwfQ.j9Xf1RqyE21DFUFSqueAzoHVv_fIfnnGjyBmzJMd3oE'; // мока, убрать потом
// token actual

function getUserToken() {
	const token = userToken; // biscuit.getCookie(USER_COOKIE_NAME.TOKEN);
	return token;
}

async function makeRequestForNewWords(APIUrl) {
	let data = [];
	try {
		const response = await fetch(APIUrl);
		data = await response.json();
	} catch (error) {
		console.log(error);
	}
	return data;
}

APIMethods.getNewWordsArray = async function getNewWordsArray(group, page) {
	const APIUrl = url.groupPage(group, page);
	const data = await makeRequestForNewWords(APIUrl);
	const words =  data.map((word) => {
		const wordObj = new Word(word);
		wordObj.getMediaUrls(word);
		wordObj.addNewWordsParams();
		return wordObj;
	});
	APIMethods.saveWords(words); // await
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
	const words =  data.map((word) => {
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

APIMethods.getAggregatedWord = async function getAggregatedWord(category) {
	const APIUrl = url.aggregated(category);
	let data = [];

	try {
		const response = fetch(APIUrl, {
			method: 'POST',
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
};

export default APIMethods;
