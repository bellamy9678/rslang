import randomizeWords from './randomizeWords';
import {
	arrayForUniqness,
	arrayForRandom
} from './consts';
import Service from '../words_service/Service';

export default async function audioChallenge() {
	const {
		level,
		round
	} = JSON.parse(localStorage.getItem('gameData'));
	const allWords = await Service.getGameSpecificWords(level, round);
	allWords.forEach(item => {
		arrayForUniqness.push(item);
	});
	allWords.forEach(item => {
		arrayForRandom.push(item);
	});
	randomizeWords(arrayForUniqness, arrayForRandom);
}
