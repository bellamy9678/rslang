import { ASSETS_STORAGE } from "../shared/constants";

export default class Word {
	constructor(word) {
		this.id = word.id;
		this.word = word.word;
		this.translate = word.wordTranslate;
		this.transcription = word.transcription;
		this.example = word.textExample;
		this.exampleTranslate = word.textExampleTranslate;
		this.textMeaning = word.textMeaning;
		this.textMeaningTranslate = word.textMeaningTranslate; 
	}

	getMediaUrls(word) {
		this.image = `${ASSETS_STORAGE}${word.image}`;
		this.audio = `${ASSETS_STORAGE}${word.audio}`;
		this.meaningAudio = `${ASSETS_STORAGE}${word.audioMeaning}`;
		this.exampleAudio = `${ASSETS_STORAGE}${word.audioExample}`;
	}
}
