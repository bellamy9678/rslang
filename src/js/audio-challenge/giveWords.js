import fetchWords from './fetchWords';
import { API, ASSETS_STORAGE } from '../shared/Constants';

export default async function giveWords () {
	function Word(word) {
		this.id = word.id;
		this.word = word.word;
		this.translate = word.wordTranslate;
		this.transcription = word.transcription;
		this.audio = `${ASSETS_STORAGE}${word.audio}`;
		this.image = `${ASSETS_STORAGE}${word.image}`;
		this.example = word.textExample;
		this.exampleTranslate = word.textExampleTranslate;
		this.exampleAudio = `${ASSETS_STORAGE}${word.audioExample}`;
	}
	const url = `${API}words?page=1`;
	const data = await fetchWords(url);
	return data.map(word => new Word(word));
}
