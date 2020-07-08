import {
	ASSETS_STORAGE,
	CATEGORIES
} from '../shared/Constants';

const NEW_WORD_PARAMETERS = {
	progress: 0,
	bestResult: 0,
	showedCount: 0,
	showedDate: 0,
	nextShowDate: new Date(),
	offset: 0,
	category: CATEGORIES.NEW
};

export default class Word {
	constructor(word) {
		// eslint-disable-next-line no-underscore-dangle
		this.id = word.id || word._id;
		this.word = word.word;
		this.translate = word.wordTranslate;
		this.transcription = word.transcription;
		this.example = word.textExample;
		this.exampleTranslate = word.textExampleTranslate;
		this.textMeaning = word.textMeaning;
		this.textMeaningTranslate = word.textMeaningTranslate;
		this.page = word.page;
		this.group = word.group;
		this.wordsPerExampleSentence = word.wordsPerExampleSentence;

		this.optional = {
			progress : word.userWord.optional.progress,
			bestResult : word.userWord.optional.bestResult,
			showedCount : word.userWord.optional.showedCount,
			showedDate : word.userWord.optional.showedDate,
			nextShowDate : word.userWord.optional.nextShowDate,
			offset : word.userWord.optional.offset,
			category : word.userWord.optional.category,
		};
	}

	getMediaUrls(word) {
		this.image = `${ASSETS_STORAGE}${word.image}`;
		this.audio = `${ASSETS_STORAGE}${word.audio}`;
		this.meaningAudio = `${ASSETS_STORAGE}${word.audioMeaning}`;
		this.exampleAudio = `${ASSETS_STORAGE}${word.audioExample}`;
	}

	addNewWordsParams() {
		this.optional = {
			progress: NEW_WORD_PARAMETERS.progress,
			bestResult: NEW_WORD_PARAMETERS.bestResult,
			showedCount: NEW_WORD_PARAMETERS.showedCount,
			showedDate: NEW_WORD_PARAMETERS.showedDate,
			nextShowDate: NEW_WORD_PARAMETERS.nextShowDate,
			offset: NEW_WORD_PARAMETERS.offset,
			category: NEW_WORD_PARAMETERS.category,
		};
	}
}
