import giveWords from './giveWords';
import randomizeWords from './randomizeWords';
import {arrayForUniqness, arrayForRandom} from './consts';

export default function audioChallenge() {
	async function defineArrays() {
		const allWords = await giveWords();
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
