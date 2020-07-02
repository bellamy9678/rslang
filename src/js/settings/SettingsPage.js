import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import {
	TEXT
} from '../shared/Text';
import Settings from './Settings';

function createSettingsPage() {
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
			value: 3,
			min: 0,
			type: 'number',
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
			name: 'maxNewCards',
			value: 3,
			min: 0,
			type: 'number',
		}, ],
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

	const meaningTranslateCheckbox = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__checkbox',
		id: 'word-meaning-translate',
		attr: [{
			name: 'meaningTranslate',
			type: 'checkbox',
			disabled: 'disabled',
		}, ],
	});

	meaningCheckbox.addEventListener('change', () => {
		if (meaningCheckbox.checked === true) {
			meaningTranslateCheckbox.removeAttribute('disabled');
		} else {
			meaningTranslateCheckbox.setAttribute('disabled', 'disabled');
			meaningTranslateCheckbox.checked = false;
		}
	});

	const meaningTranslateLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		child: [meaningTranslateCheckbox, TEXT.settingsPage.meaningTranslateLabel],
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
		if (sentenceExampleCheckbox.checked === true) {
			sentenceExampleTranslateCheckbox.removeAttribute('disabled');
		} else {
			sentenceExampleTranslateCheckbox.setAttribute('disabled', 'disabled');
			sentenceExampleTranslateCheckbox.checked = false;
		}
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
			meaningTranslateLabel,
			sentenceExampleLabel,
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
		Settings.checkUserSettings();
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

export default function showSettingsPage() {
	const app = document.querySelector('.app');
	const settingsPage = createSettingsPage();
	app.firstChild.remove();
	app.append(settingsPage);
}
