import { API, ASSETS_STORAGE, URL_PARAMS_WORDS, URL_PARAMS_PAGE } from './constants';
import getNewWordsFromApi from './getNewWordsFromApi';

class Word {
	constructor(word) {
		this.id = word.id;
		this.word = word.word;
		this.translate = word.wordTranslate;
		this.transcription = word.transcription;
		this.audio = `${ASSETS_STORAGE}${word.audio}`;
		this.image = `${ASSETS_STORAGE}${word.image}`;
		this.example = word.textExample;
		this.exampleTranslate = word.textExampleTranslate;
		this.meaningAudio = `${ASSETS_STORAGE}${word.audioMeaning}`;
		this.textMeaning = word.textMeaning;
		this.textMeaningTranslate = word.textMeaningTranslate; 
		this.exampleAudio = `${ASSETS_STORAGE}${word.audioExample}`;
	}
}

export default async function getNewWordsArray(group, page) {
	const url = `${API}${URL_PARAMS_WORDS}${group}${URL_PARAMS_PAGE}${page}`;
	const data = await getNewWordsFromApi(url);
	return data.map(word => new Word(word));
}
