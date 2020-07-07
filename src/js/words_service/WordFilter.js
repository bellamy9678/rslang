import {
	ASSETS_STORAGE,
} from '../shared/Constants';

export default class WordFilter {
	constructor(word) {
		// eslint-disable-next-line no-underscore-dangle
		this.id = word._id;
		this.group = word.group;
		this.page = word.page;
		this.word = word.word;
		this.textMeaning = word.textMeaning;
		this.example = word.textExample;
		this.transcription = word.transcription;
		this.exampleTranslate = word.textExampleTranslate;
		this.textMeaningTranslate = word.textMeaningTranslate;
		this.translate = word.wordTranslate;
		this.wordsPerExampleSentence = word.wordsPerExampleSentence;

		this.optional = {
			progress : word.userWord.progress,
			bestResult : word.userWord.bestResult,
			showedCount : word.userWord.showedCount,
			showedDate : word.userWord.showedDate,
			learnDate : word.userWord.learnDate,
			offset : word.userWord.offset,
			category : word.userWord.category,
		};
	}

	getMediaUrls(word) {
		this.image = `${ASSETS_STORAGE}${word.image}`;
		this.audio = `${ASSETS_STORAGE}${word.audio}`;
		this.meaningAudio = `${ASSETS_STORAGE}${word.audioMeaning}`;
		this.exampleAudio = `${ASSETS_STORAGE}${word.audioExample}`;
	}
}
