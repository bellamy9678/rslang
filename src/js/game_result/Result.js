import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import * as CONST from './constants';

const factory = new DOMElementCreator();

export default class Result {
	constructor() {
		this.rightAnswers = [];
		this.wrongAnswers = [];
		this.points = 0;
		this.buttons = [];
		this.sentenceResult = false;
	}

	showResult(settingsObj) {
		this.rightAnswers = settingsObj.rightAnswers || settingsObj.rightAnswersSentences;
		this.wrongAnswers = settingsObj.wrongAnswers || settingsObj.wrongAnswersSentences;
		this.buttons = settingsObj.buttons;

		if (settingsObj.rightAnswersSentences || settingsObj.wrongAnswersSentences) {
			this.sentenceResult = true;
		}

		const appContainer = document.querySelector('.app');
		const APP_CONTAINER = appContainer.querySelector('.wrapper');
		APP_CONTAINER.append(this.generateResultWindow(settingsObj));
	}

	generateResultWindow(settingsObj) {
		this.resultWindow = factory.create({
			elem: TAGS.DIV,
			classes: 'result__modal-window',
			child: [
				this.generateResultHeader(settingsObj),
				this.generateResultContent(),
				this.generateResultFooter(),
				...this.generateAudio()
			]
		});

		this.resultWithBackground = factory.create({
			elem: TAGS.DIV,
			classes: 'result__background',
			child: this.resultWindow
		});


		return this.resultWithBackground;
	}

	generateResultScore(points) {
		this.scoreContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'result__score',
			child: `${points} ${CONST.POINTS_TEXT}`
		});
		return this.scoreContainer;
	}

	generateResultHeader(settingsObj) {
		this.resultHeader = factory.create({
			elem: TAGS.DIV,
			classes: 'result__modal-header',
			child: CONST.HEADER_TEXT
		});

		if (settingsObj.points) {
			this.resultHeader.append(this.generateResultScore(settingsObj.points));
		}
		return this.resultHeader;
	}

	generateResultContent() {
		this.iDontKnowLabel = factory.create({
			elem: TAGS.SPAN,
			classes: ['result__header-list-label', 'result__header-list-label--wrong'],
			child: this.wrongAnswers.length || CONST.ZERO
		});

		this.iDontKnowHeader = factory.create({
			elem: TAGS.DIV,
			classes: 'result__list-header-name',
			child: [CONST.WRONG_LIST_NAME, this.iDontKnowLabel]
		});

		this.iDontKnowList = this.wrongAnswers.map(obj => {
			this.playAudioBtn = factory.create({
				elem: TAGS.BUTTON,
				classes: 'result__play-audio-btn',
				attr: { 'data-word': obj.word }
			});

			this.addEventListenerForPlayBtn(this.playAudioBtn);

			this.wrongSentence = factory.create({
				elem: TAGS.SPAN,
				classes: 'result__sentence',
				child: this.sentenceResult ?
					obj.example.replace(CONST.REGEXP_HTML_TAGS, CONST.EMPTY_STRING) :
					`${obj.word} - ${obj.translate}`
			});

			this.iDontKnowRow = factory.create({
				elem: TAGS.LI,
				classes: 'result__answers-list-row',
				child: [this.playAudioBtn, this.wrongSentence]
			});

			return this.iDontKnowRow;
		});

		this.iDontKnowListContainer = factory.create({
			elem: TAGS.UL,
			classes: 'result__answers-container',
			child: this.iDontKnowList
		});

		this.iKnowLabel = factory.create({
			elem: TAGS.SPAN,
			classes: ['result__header-list-label', 'result__header-list-label--right'],
			child: this.rightAnswers.length || '0'
		});

		this.iKnowHeader = factory.create({
			elem: TAGS.DIV,
			classes: 'result__list-header-name',
			child: [CONST.RIGHT_LIST_NAME, this.iKnowLabel]
		});

		this.iKnowList = this.rightAnswers.map(obj => {
			this.playAudioBtn = factory.create({
				elem: TAGS.BUTTON,
				classes: 'result__play-audio-btn',
				attr: { 'data-word': obj.word }
			});

			this.addEventListenerForPlayBtn(this.playAudioBtn);

			this.rightSentence = factory.create({
				elem: TAGS.SPAN,
				classes: 'result__sentence',
				child: this.sentenceResult ?
					obj.example.replace(CONST.REGEXP_HTML_TAGS, CONST.EMPTY_STRING) :
					`${obj.word} - ${obj.translate}`
			});

			this.iKnowRow = factory.create({
				elem: TAGS.LI,
				classes: 'result__answers-list-row',
				child: [this.playAudioBtn, this.rightSentence]
			});

			return this.iKnowRow;
		});

		this.iKnowListContainer = factory.create({
			elem: TAGS.UL,
			classes: 'result__answers-container',
			child: this.iKnowList
		});

		this.resultContent = factory.create({
			elem: TAGS.DIV,
			classes: 'result__results-list',
			child: [this.iDontKnowHeader, this.iDontKnowListContainer, this.iKnowHeader, this.iKnowListContainer]
		});

		return this.resultContent;
	}

	generateAudio() {
		const answers = [...this.wrongAnswers, ...this.rightAnswers];
		this.answersAudio = answers.map(obj => {
			const audioEl = factory.create({
				elem: TAGS.AUDIO,
				classes: 'result__audio-sentences',
				attr: [{ 'data-word': obj.word }, {
					'src': `${this.sentenceResult ? obj.exampleAudio : obj.audio}`
				}]
			});
			return audioEl;
		});
		return this.answersAudio;
	}

	generateResultFooter() {
		this.resultFooter = factory.create({
			elem: TAGS.DIV,
			classes: 'result__modal-footer',
			child: this.buttons
		});
		return this.resultFooter;
	}

	closeResultWindow() {
		const audioBtns = this.resultWindow.querySelectorAll('.result__play-audio-btn');
		audioBtns.forEach(btn => btn.removeEventListener('click', this.audioHandler));
		this.resultWithBackground.remove();
	}

	audioHandler(event) {
		const audio = this.resultWindow.querySelector(`audio[data-word=${event.target.dataset.word}]`);
		audio.play();
	}

	addEventListenerForPlayBtn(button) {
		this.audioHandler = this.audioHandler.bind(this);
		button.addEventListener('click', this.audioHandler);
	}
}
