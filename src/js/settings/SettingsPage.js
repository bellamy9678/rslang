import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import {
	TEXT
} from '../shared/Text';
import SettingsView from './SettingsView';
import Settings from './Settings';

function controlDisabledAttribute(conrolElem, slaveElem) {
	if (conrolElem.checked === true) {
		slaveElem.removeAttribute('disabled');
	} else {
		slaveElem.setAttribute('disabled', 'disabled');
		// eslint-disable-next-line no-param-reassign
		slaveElem.checked = false;
		// slaveElem.removeAttribute('checked');
	}
}

function setCheckboxValues(obj) {
	const checkboxes = document.querySelectorAll('.settings__checkbox');
	const meaningCheckbox = document.getElementById('word_meaning');
	const meaningAudioCheckbox = document.getElementById('word_meaning-audio');
	const meaningTranslateCheckbox = document.getElementById('word_meaning-translate');
	const exampleCheckbox = document.getElementById('word_sentence-example');
	const exampleAudioCheckbox = document.getElementById('word_sentence-example-audio');
	const exampleTranslateCheckbox = document.getElementById('word_sentence-example-translate');
	checkboxes.forEach(checkbox => {
		if (obj[checkbox.getAttribute('name')]) {
			checkbox.setAttribute('checked', 'checked');
		}
		if (checkbox.getAttribute('disabled') && obj[checkbox.getAttribute('name')] || obj[checkbox.getAttribute('name')]) {
			checkbox.removeAttribute('disabled');
		}
	});
	controlDisabledAttribute(meaningCheckbox, meaningAudioCheckbox);
	controlDisabledAttribute(meaningCheckbox, meaningTranslateCheckbox);
	controlDisabledAttribute(exampleCheckbox, exampleAudioCheckbox);
	controlDisabledAttribute(exampleCheckbox, exampleTranslateCheckbox);
}

function createSettingsPage(obj) {
	const newElem = new DOMElementCreator();
	const title = newElem.create({
		elem: TAGS.H2,
		classes: 'settings__title',
		child: TEXT.settingsPage.title,
	});

	const wordsNumberLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		attr: [{
			for: 'words-number',
		}, ],
		child: TEXT.settingsPage.wordsNumberLabel,
	});

	const wordsNumberInput = newElem.create({
		elem: TAGS.INPUT,
		classes: ['settings__words-number', 'settings__input'],
		id: 'words-number',
		attr: [{
			name: 'maxNewWords',
			value: obj.maxNewWords,
			min: 0,
			type: 'number',
			oninput: 'validity.valid||(value="")',
		}, ],
	});

	const cardsNumberLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		attr: [{
			for: 'cards-number',
		}, ],
		child: TEXT.settingsPage.cardsNumberLabel,
	});

	const cardsNumberInput = newElem.create({
		elem: TAGS.INPUT,
		classes: ['settings__cards-number', 'settings__input'],
		id: 'cards-number',
		attr: [{
			name: 'maxCards',
			value: obj.maxCards,
			min: 0,
			max: 100,
			type: 'number',
			oninput: 'validity.valid||(value="")',
		}, ],
	});

	cardsNumberInput.addEventListener('change', () => {
		const wordsNumber = document.getElementById('words-number');
		const cardsNumber = document.getElementById('cards-number');
		if (cardsNumber.valueAsNumber < wordsNumber.valueAsNumber) {
			wordsNumber.value = cardsNumber.value;
		}
	});

	wordsNumberInput.addEventListener('focus', () => {
		const cardsNumber = document.getElementById('cards-number');
		wordsNumberInput.setAttribute('max', cardsNumber.value);
	});

	const inputsWrapper = newElem.create({
		elem: TAGS.DIV,
		classes: 'settings__inputs-wrapper',
		child: [wordsNumberLabel,
			wordsNumberInput,
			cardsNumberLabel,
			cardsNumberInput,
		]
	});

	const cardsInformation = newElem.create({
		elem: TAGS.P,
		classes: 'settings__cards-information',
		child: TEXT.settingsPage.cardsInformationText,
	});

	const transcriptionCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_transcription',
		attr: [{
			name: 'transcription',
			type: 'checkbox',
		}, ],
	});

	const transcriptionLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [transcriptionCheckbox, TEXT.settingsPage.transcriptionLabel],
	});

	const translationCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word-translation',
		attr: [{
			name: 'translate',
			type: 'checkbox',
		}, ],
	});

	const translationLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [translationCheckbox, TEXT.settingsPage.translationLabel],
	});

	const meaningCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_meaning',
		attr: [{
			name: 'meaning',
			type: 'checkbox',
		}, ],
	});

	const meaningLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [meaningCheckbox, TEXT.settingsPage.meaningLabel],
	});

	const meaningAudioCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_meaning-audio',
		attr: [{
			name: 'playMeaning',
			type: 'checkbox',
			disabled: 'disabled',
		}, ],
	});

	const meaningAudioLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [meaningAudioCheckbox, TEXT.settingsPage.meaningAudioLabel],
	});

	const meaningTranslateCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_meaning-translate',
		attr: [{
			name: 'meaningTranslate',
			type: 'checkbox',
			disabled: 'disabled',
		}, ],
	});

	const meaningTranslateLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [meaningTranslateCheckbox, TEXT.settingsPage.meaningTranslateLabel],
	});

	meaningCheckbox.addEventListener('change', () => {
		controlDisabledAttribute(meaningCheckbox, meaningTranslateCheckbox);
		controlDisabledAttribute(meaningCheckbox, meaningAudioCheckbox);
	});

	const sentenceExampleCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_sentence-example',
		attr: [{
			name: 'example',
			type: 'checkbox',
		}, ],
	});

	const sentenceExampleLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [sentenceExampleCheckbox, TEXT.settingsPage.sentenceExempleLabel],
	});

	const sentenceExampleAudioCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_sentence-example-audio',
		attr: [{
			name: 'playExample',
			type: 'checkbox',
			disabled: 'disabled',
		}, ],
	});

	const sentenceExampleAudioLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [sentenceExampleAudioCheckbox, TEXT.settingsPage.sentenceExampleAudioLabel],
	});

	const sentenceExampleTranslateCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_sentence-example-translate',
		attr: [{
			name: 'exampleTranslate',
			type: 'checkbox',
			disabled: 'disabled',
		}, ],
	});

	const sentenceExampleTranslateLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [sentenceExampleTranslateCheckbox, TEXT.settingsPage.sentenceExempleTranslateLabel],
	});

	sentenceExampleCheckbox.addEventListener('change', () => {
		controlDisabledAttribute(sentenceExampleCheckbox, sentenceExampleTranslateCheckbox);
		controlDisabledAttribute(sentenceExampleCheckbox, sentenceExampleAudioCheckbox);
	});

	const pictureCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_picture',
		attr: [{
			name: 'picture',
			type: 'checkbox',
		}, ],
	});

	const pictureLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [pictureCheckbox, TEXT.settingsPage.pictureLabel],
	});

	const deleteButtonCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_delete-button',
		attr: [{
			name: 'deleteButton',
			type: 'checkbox',
		}, ],
	});

	const deleteButtonLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [deleteButtonCheckbox, TEXT.settingsPage.deleteButtonLabel],
	});

	const difficultButtonCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_difficult-button',
		attr: [{
			name: 'difficultButton',
			type: 'checkbox',
		}, ],
	});

	const difficultButtonLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [difficultButtonCheckbox, TEXT.settingsPage.difficultButtonLabel],
	});

	const complexityButtonsCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_complexity-buttons',
		attr: [{
			name: 'complexityButtons',
			type: 'checkbox',
		}, ],
	});

	const complexityButtonsLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [complexityButtonsCheckbox, TEXT.settingsPage.complexityButtonsLabel],
	});

	const showAnswerButtonCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word_answer-button',
		attr: [{
			name: 'showAnswerButton',
			type: 'checkbox',
		}, ],
	});

	const showAnswerButtonLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [showAnswerButtonCheckbox, TEXT.settingsPage.showAnswerButtonLabel],
	});

	const useLearnedWordsCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'use-learned-words',
		attr: [{
			name: 'useLearnedWords',
			type: 'checkbox',
		}, ],
	});

	const useLearnedWordsLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [useLearnedWordsCheckbox, TEXT.settingsPage.useLearnedWordsLabel],
	});

	const checkboxWrapper = newElem.create({
		elem: TAGS.DIV,
		classes: 'settings__checkbox-wrapper',
		child: [cardsInformation,
			transcriptionLabel,
			translationLabel,
			meaningLabel,
			meaningAudioLabel,
			meaningTranslateLabel,
			sentenceExampleLabel,
			sentenceExampleAudioLabel,
			sentenceExampleTranslateLabel,
			pictureLabel,
			deleteButtonLabel,
			difficultButtonLabel,
			complexityButtonsLabel,
			showAnswerButtonLabel,
			useLearnedWordsLabel,
		]
	});

	const container = newElem.create({
		elem: TAGS.DIV,
		classes: 'settings__container',
		child: [
			inputsWrapper,
			checkboxWrapper,
		],
	});

	const saveButton = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['button', 'button_colored-add', 'settings__button'],
		child: TEXT.settingsPage.saveSettingsButton,
	});

	saveButton.addEventListener('click', event => {
		event.preventDefault();
		SettingsView.checkUserSettings();
	});

	const form = newElem.create({
		elem: TAGS.FORM,
		attr: {
			name: 'settings'
		},
		classes: 'settings__form',
		child: [
			container,
		],
	});

	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['wrapper', 'settings__wrapper', 'settings__background'],
		child: [title, form, saveButton],
	});
	return wrapper;
}

export default async function showSettingsPage() {
	const app = document.querySelector('.app');
	const settingsObj = await Settings.getInstance();
	const lastUserSettings = new Promise(resolve => {
		const obj = settingsObj;
		resolve(obj);
	});
	lastUserSettings.then(obj => {
		const settingsPage = createSettingsPage(obj);
		app.firstChild.remove();
		app.append(settingsPage);
		setCheckboxValues(obj);
	});
}
