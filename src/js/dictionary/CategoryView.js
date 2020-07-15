import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import APIMethods from '../words_service/APIMethods';
import {
	CATEGORIES,
} from '../shared/Constants';
import {
	DICTIONARY_BUTTONS,
	TEXT,
} from '../shared/Text';
import Settings from '../settings/Settings';
import WORDS_EVENTS from '../observer/WordsEvents';
import eventObserver from '../observer/Observer';
import createCustomEvent from '../events/CustomEventCreator';
import {
	PROGRESS,
} from '../words_service/constants';

const dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	weekday: 'long',
	timezone: 'UTC',
	hour: 'numeric',
	minute: 'numeric',
};

function setDateComponents(date) {
	const myDate = new Date(date);
	return myDate.toLocaleString('en-US', dateOptions);
}

function createProgressView(realProgress) {
	const userProgress = [];
	const newElem = new DOMElementCreator();
	for (let i = 0; i < realProgress; i += 1) {
		const progressIcon = newElem.create({
			elem: TAGS.IMG,
			classes: ['icon', 'icon_progress'],
			attr: [{
				src: './assets/images/dictionary/star.svg',
				alt: 'Progress',
			}, ],
		});
		userProgress.push(progressIcon);
	}
	if (userProgress.length < PROGRESS.MAX) {
		for (let i = userProgress.length; i < PROGRESS.MAX; i += 1) {
			const progressIcon = newElem.create({
				elem: TAGS.IMG,
				classes: ['icon', 'icon_progress'],
				attr: [{
					src: './assets/images/dictionary/star-empty.svg',
					alt: 'Progress',
				}, ],
			});
			userProgress.push(progressIcon);
		}
	}
	return userProgress;
}

function createDictionaryWords(words) {
	const newElem = new DOMElementCreator();
	const categoryWords = words.map(wordData => {
		const word = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__word'],
			child: [wordData.word],
		});

		const audio = newElem.create({
			elem: TAGS.AUDIO,
			classes: ['word__audio'],
			attr: [{
				src: wordData.audio,
				'data-settings': 'playWord',
				controls: 'controls',
			}, ],
		});

		const transcription = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__transcription'],
			attr: [{
				'data-settings': 'transcription',
			}, ],
			child: [wordData.transcription],
		});

		const translate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__trarnslate'],
			attr: [{
				'data-settings': 'translate',
			}, ],
			child: [wordData.translate],
		});

		const image = newElem.create({
			elem: TAGS.IMG,
			classes: ['word__image'],
			attr: [{
				src: wordData.image,
				alt: wordData.word,
				'data-settings': 'picture',
			}, ],
		});

		const meaning = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__meaning'],
			attr: [{
				'data-settings': 'meaning',
			}, ],
			child: [wordData.textMeaning.replace(/<[^>]*>/g, '')],
		});

		const meaningAudio = newElem.create({
			elem: TAGS.AUDIO,
			classes: ['word__meaning-audio'],
			attr: [{
				src: wordData.meaningAudio,
				controls: 'controls',
				'data-settings': 'playMeaning',
			}],
		});

		const meaningTranslate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__meaning-translate'],
			attr: [{
				'data-settings': 'meaningTranslate',
			}, ],
			child: [wordData.textMeaningTranslate],
		});

		const example = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__example'],
			attr: [{
				'data-settings': 'example',
			}, ],
			child: [wordData.example.replace(/<[^>]*>/g, '')],
		});

		const exampleAudio = newElem.create({
			elem: TAGS.AUDIO,
			classes: ['word__example-audio'],
			attr: [{
				src: wordData.exampleAudio,
				controls: 'controls',
				'data-settings': 'playExample',
			}],
		});

		const exampleTranslate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__example-translate'],
			attr: [{
				'data-settings': 'exampleTranslate',
			}, ],
			child: [wordData.exampleTranslate],
		});

		const progress = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__progress'],
			child: createProgressView(+wordData.optional.progress),
		});

		const showedCount = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__showed-count'],
			child: [`${TEXT.dictionary.wordShowNumber.left} ${wordData.optional.showedCount} ${TEXT.dictionary.wordShowNumber.right}`],
		});

		const showedDate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__showed-date'],
			child: [TEXT.dictionary.showDate, setDateComponents(wordData.optional.showedDate)],
		});

		const nextShowDate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__showed-date'],
			child: [TEXT.dictionary.nextShowDate, setDateComponents(wordData.optional.nextShowDate)],
		});

		const optionalData = newElem.create({
			elem: TAGS.DIV,
			classes: ['word__optional'],
			child: [progress, showedCount, showedDate, nextShowDate],
		});

		const container = newElem.create({
			elem: TAGS.DIV,
			classes: ['category__word'],
			child: [word,
				audio,
				transcription,
				translate,
				image,
				meaning,
				meaningAudio,
				meaningTranslate,
				example,
				exampleAudio,
				exampleTranslate,
				optionalData
			],
		});
		return container;
	});

	const arr = [].slice.call(categoryWords);
	const category = newElem.create({
		elem: TAGS.DIV,
		classes: ['category__container'],
		child: arr,
	});
	return category;
}

async function updateWordViewWithUserSettings() {
	let settings = new Settings();
	settings = await Settings.getInstance();

	const wordsData = document.querySelectorAll('[data-settings]');
	wordsData.forEach(prop => {
		const attr = prop.getAttribute('data-settings');
		if (settings[attr] === false) {
			prop.classList.add('none');
		}
	});
}

function addRecoverButtonsToWords(categoryName, objWord) {
	const newElem = new DOMElementCreator();
	if (categoryName === CATEGORIES.REMOVED || categoryName === CATEGORIES.DIFFICULT) {
		document.querySelectorAll('.category__word').forEach((word, i) => {
			const recoverRemovedWordButton = newElem.create({
				elem: TAGS.BUTTON,
				id: 'recover-removed-word',
				classes: ['button', 'button_colored', 'word__recover'],
				child: DICTIONARY_BUTTONS.RECOVER,
			});

			const recoverWordEvent = createCustomEvent(WORDS_EVENTS.RECOVER_WORD, objWord[i]);

			recoverRemovedWordButton.addEventListener('click', () => {
				recoverRemovedWordButton.dispatchEvent(recoverWordEvent);
				eventObserver.call(recoverWordEvent);
				word.remove();
			});
			word.append(recoverRemovedWordButton);
		});
	}
}

function createMessage() {
	const newElem = new DOMElementCreator();
	const text = newElem.create({
		elem: TAGS.P,
		classes: ['category__message-text'],
		child: TEXT.dictionary.message,
	});

	const emptyCategoryImage = newElem.create({
		elem: TAGS.IMG,
		classes: ['category__empty-img'],
		attr: [{
			src: './assets/images/dictionary/space-discovery.svg',
			alt: 'Space discovery',
		}, ],
	});

	const message = newElem.create({
		elem: TAGS.DIV,
		classes: ['category__message'],
		child: [text, emptyCategoryImage],
	});
	return message;
}

export default function showWordsCategory(categoryName) {
	new Promise(resolve => {
		const words = APIMethods.getUserWordsByCategory(categoryName);
		resolve(words);
	})
		.then(words => {
			const category = createDictionaryWords(words);
			const categoryContainer = document.querySelector('.dictionary__category');
			if (categoryContainer.firstChild) {
				categoryContainer.firstChild.remove();
			}
			if (words.length === 0) {
				const message = createMessage();
				categoryContainer.append(message);
			} else {
				categoryContainer.append(category);
				addRecoverButtonsToWords(categoryName, words);
				updateWordViewWithUserSettings();
			}
		});
}
