import fetchWords from './fetchWords';
import { API, ASSETS_STORAGE } from '../shared/Constants';

export default async function giveWords () {
	function Word(word) {
		return {
			word: word.word,
			translate: word.wordTranslate,
			transcription: word.transcription,
			audio: `${ASSETS_STORAGE}${word.audio}`
		}
	}
	const url = `${API}words?page=1`;
	const data = await fetchWords(url);
	return data.map(word => new Word(word));
}
