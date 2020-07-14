import Service from '../words_service/Service';

export default async function getWords() {
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
