import randomizeWords from './randomizeWords';
import {
	arrayForUniqness,
	arrayForRandom
} from './consts';
import Service from '../words_service/Service';

async function getWords() {
	const {
		repeatWords,
		level,
		round
	} = JSON.parse(localStorage.getItem('gameData'));
	if (repeatWords === true) {
		const userWords = await Service.getRepeatedWords();
		return userWords;
	}
	const allWords = await Service.getGameSpecificWords(level, round);
	return allWords;
}

export default function audioChallenge() {
	new Promise(resolve => {
		const words = getWords();
		resolve(words);
	})
		.then((words) => {
			words.forEach(item => {
				arrayForUniqness.push(item);
			});
			words.forEach(item => {
				arrayForRandom.push(item);
			});
		})
		.then(() => randomizeWords(arrayForUniqness, arrayForRandom));
}
