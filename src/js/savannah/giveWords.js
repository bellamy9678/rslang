import { ASSETS_STORAGE } from '../shared/Constants';
import Service from '../words_service/Service'

export default async function giveWords (level, round) {
	const words = await Service.getGameSpecificWords(level, round);
	function Word(word) {
		return {
			word: word.word,
			translate: word.translate,
			transcription: word.transcription,
			audio: `${ASSETS_STORAGE}${word.audio}`
		}
	}
	return words.map(word => new Word(word));
}
