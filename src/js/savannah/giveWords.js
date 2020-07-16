import Service from '../words_service/Service';

export default async function giveWords() {
	const {
		repeatWords,
		level,
		round
	} = JSON.parse(localStorage.getItem('gameData'));
	let words;
	if (repeatWords === true) {
		words = await Service.getGameWords();
		console.log(words);
	} else {
		words = await Service.getGameSpecificWords(level, round);
		return words;
	}

	function Word(word) {
		return {
			word: word.word,
			translate: word.translate,
			audio: word.audio,
			id: word.id
		};
	}

	return words.map(word => new Word(word));
}
