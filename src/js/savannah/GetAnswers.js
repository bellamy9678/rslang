import {ASSETS_STORAGE} from '../shared/Constants';

export default function GetAnswers(item) {
	this.word = item.textContent;
	this.wordTranslate = item.dataset.translate;
	this.transcription = item.dataset;
	this.audio = item.dataset.audio.replace(ASSETS_STORAGE, '');;
}
