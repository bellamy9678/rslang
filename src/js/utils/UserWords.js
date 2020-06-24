import getUserData from './UserData';
// import WORDS_EVENTS from '../observer/WordsEvents';
import {
	API,
	URL_PARAM_USER,
	URL_PARAM_WORDS
} from '../shared/Constants';

// function UserWord(category, progress) {
// 	this.category = category;
// 	this.progress = progress;
// }

// function defineWordParams(event) {
// 	let category;
// 	let progress;
// 	switch (event.type) {
// 		case WORDS_EVENTS.PUSHED_ADD_TO_DIFFICULT:
// 		case WORDS_EVENTS.PUSHED_SHOW_ANSWER_BUTTON:
// 			category = 'difficult';
// 			progress = 0;
// 			break;
// 		case WORDS_EVENTS.PUSHED_REMOVE_FROM_DICTIONARY:
// 			category = 'deleted';
// 			progress = 0;
// 			break;
// 		case WORDS_EVENTS.PUSHED_AGAIN:
// 		case WORDS_EVENTS.PUSHED_EASY:
// 		case WORDS_EVENTS.PUSHED_GOOD:
// 		case WORDS_EVENTS.PUSHED_HARD:
// 			category = 'studied';
// 			progress = 1;
// 			break;
// 		default:
// 			category = 'hidden';
// 			progress = 0;
// 	}
// 	return new UserWord(category, progress);
// }

// async function createUserWord(event) {
// 	const userData = getUserData();
// 	const wordId = event.detail.id;
// 	const word = {};
// 	word.optional = defineWordParams(event);
// 	const rawResponse = await fetch(`${API}${URL_PARAM_USER}/${userData.id}/${URL_PARAM_WORDS}/${wordId}`, {
// 		method: 'POST',
// 		withCredentials: true,
// 		headers: {
// 			'Authorization': `Bearer${userData.token}`,
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(word)
// 	});
// 	const content = await rawResponse.json();
// 	console.log(content);
// };

export default async function getUserWord(event) {
	const userData = getUserData();
	const wordId = event.detail.id;
	const rawResponse = await fetch(`${API}${URL_PARAM_USER}/${userData.id}/${URL_PARAM_WORDS}/${wordId}`, {
		method: 'GET',
		withCredentials: true,
		headers: {
			'Authorization': `Bearer${userData.token}`,
			'Accept': 'application/json',
		}
	});
	const content = await rawResponse.json();
	console.log(content);
};

// async function updateUserWord(event) {
// 	const userData = getUserData();
// 	const wordId = event.detail.id;
// 	const rawResponse = await fetch(`${API}${URL_PARAM_USER}/${userData.id}/${URL_PARAM_WORDS}/${wordId}`, {
// 		method: 'GET',
// 		withCredentials: true,
// 		headers: {
// 			'Authorization': `Bearer${userData.token}`,
// 			'Accept': 'application/json',
// 		}
// 	});
// 	const content = await rawResponse.json();
// 	console.log(content);
// };


// export default {
// 	createUserWord,
// 	getUserWord
// }

// export default function addWordToDictionary() {
// }
