import randomizeWords from './randomizeWords';
import getWords from './getWords';
import Word from './Word';
import {
	arrayForUniqness,
	arrayForRandom
} from './consts';

export default function audioChallenge() {
	new Promise(resolve => {
		const words = getWords();
		resolve(words);
	})
		.then((words) => {
			const allWords = words.map(word => new Word(word));
			allWords.forEach(item => {
				arrayForUniqness.push(item);
			});
			allWords.forEach(item => {
				arrayForRandom.push(item);
			});
		})
		.then(() => randomizeWords(arrayForUniqness, arrayForRandom));
}
