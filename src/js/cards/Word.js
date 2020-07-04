import { ASSETS_STORAGE, CATEGORIES } from '../shared/Constants';

const NEW_WORD_PARAMETERS = {
	progress : 0,
	bestResult : 0,
	showedCount : 0,
	showedDate : 0,
	learnDate : new Date(),
	offset : 0,
	category : CATEGORIES.NEW
};

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

	addNewWordsParams() {
		this.progress = NEW_WORD_PARAMETERS.progress;
		this.bestResult = NEW_WORD_PARAMETERS.bestResult;
		this.showedCount = NEW_WORD_PARAMETERS.showedCount;
		this.showedDate = NEW_WORD_PARAMETERS.showedDate;
		this.learnDate = NEW_WORD_PARAMETERS.learnDate;
		this.offset = NEW_WORD_PARAMETERS.offset;
		this.category = NEW_WORD_PARAMETERS.category;
	}
}
