import APIMethods from '../words_service/APIMethods';
import randomizeWords from './randomizeWords';
import {arrayForUniqness, arrayForRandom} from './consts';

export default function audioChallenge() {
	async function defineArrays() {
		const {level, round} = JSON.parse(localStorage.getItem('gameData'));
		const allWords = await APIMethods.getNewWordsArray(level, round);
		allWords.forEach(item => {
			arrayForUniqness.push(item);
		});
		allWords.forEach(item => {
			arrayForRandom.push(item);
		});
		randomizeWords(arrayForUniqness, arrayForRandom);
	}

	defineArrays();
}
