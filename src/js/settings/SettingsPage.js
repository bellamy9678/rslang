import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import {
	TEXT
} from '../shared/Text';

function showSettingsPage() {
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();

	const title = newElem.create({
		elem: TAGS.H2,
		classes: 'settings__title',
		child: TEXT.settingsPage.title,
	});

	const br = newElem.create({
		elem: TAGS.BR,
	});
	console.log('showSettingsPage -> br', br);

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
		classes: ['settings__words-number', 'settings__input_text'],
		id: 'words-number',
		attr: [{
			type: 'text',
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
		classes: ['settings__cards-number', 'settings__input_text'],
		id: 'cards-number',
		attr: [{
			type: 'text',
		}, ],
	});

	const button = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['button', 'button_colored-add'],
		child: TEXT.settingsPage.saveSettingsButton,
	});

	const leftColumn = newElem.create({
		elem: TAGS.DIV,
		classes: 'column',
		child: [wordsNumberLabel,
			wordsNumberInput,
			cardsNumberLabel,
			cardsNumberInput,
			button,
		]
	});

	const cardsInformation = newElem.create({
		elem: TAGS.P,
		classes: 'settings__cards-information',
		child: TEXT.settingsPage.cardsInformationText,
	});

	const wordTranslationInput = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__word-translation',
		id: 'word-translation',
		attr: [{
			type: 'checkbox',
		}, ],
	});

	const wordTranslationLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		attr: [{
			for: 'word-translation',
		}, ],
		child: TEXT.settingsPage.wordTranslationLabel,
	});

	const wordMeaningInput = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__word-meaning',
		id: 'word-meaning',
		attr: [{
			type: 'checkbox',
		}, ],
	});

	const wordMeaningLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		attr: [{
			for: 'word-meaning',
		}, ],
		child: TEXT.settingsPage.wordMeaningLabel,
	});

	const wordSentenceExampleInput = newElem.create({
		elem: TAGS.INPUT,
		classes: 'settings__word-sentence-example',
		id: 'word-sentence-example',
		attr: [{
			type: 'checkbox',
		}, ],
	});

	const wordSentenceExampleLabel = newElem.create({
		elem: TAGS.LABEL,
		classes: 'settings__label',
		attr: [{
			for: 'word-sentence-example',
		}, ],
		child: TEXT.settingsPage.sentenceExemple,
	});

	const rightColumn = newElem.create({
		elem: TAGS.DIV,
		classes: 'column',
		child: [cardsInformation,
			wordTranslationInput,
			wordTranslationLabel,
			br,
			wordMeaningInput,
			wordMeaningLabel,
			br,
			wordSentenceExampleInput,
			wordSentenceExampleLabel,
			br,
		]
	});

	const form = newElem.create({
		elem: TAGS.FORM,
		classes: 'settings__form',
		child: [
			leftColumn,
			rightColumn,
		],
	});

	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['wrapper', 'settings__wrapper', 'settings__background'],
		child: [title, form]
	});

	// app.firstChild.remove();
	app.append(wrapper);
}

showSettingsPage();
