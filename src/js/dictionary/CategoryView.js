import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import APIMethods from '../words_service/APIMethods';

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
				src: wordData.audio
			}],
		});

		const transcription = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__transcription'],
			child: [wordData.transcription],
		});

		const translate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__trarnslate'],
			child: [wordData.translate],
		});

		const image = newElem.create({
			elem: TAGS.IMG,
			classes: ['word__image'],
			attr: [{
				src: wordData.image,
			}, {
				alt: wordData.word,
			}],
		});

		const meaning = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__meaning'],
			child: [wordData.textMeaning],
		});

		const meaningAudio = newElem.create({
			elem: TAGS.AUDIO,
			classes: ['word__meaning-audio'],
			attr: [{
				src: wordData.meaningAudio
			}],
		});

		const meaningTranslate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__meaning-translate'],
			child: [wordData.textMeaningTranslate],
		});

		const example = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__example'],
			child: [wordData.example],
		});

		const exampleAudio = newElem.create({
			elem: TAGS.AUDIO,
			classes: ['word__example-audio'],
			attr: [{
				src: wordData.exampleAudio
			}],
		});

		const exampleTranslate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__example-translate'],
			child: [wordData.example],
		});

		const progress = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__progress'],
			child: [wordData.optional.progress],
		});

		const showedCount = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__showed-count'],
			child: [wordData.optional.showedCount],
		});

		const showedDate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__showed-date'],
			child: [wordData.optional.showedDate],
		});

		const nextShowDate = newElem.create({
			elem: TAGS.SPAN,
			classes: ['word__showed-date'],
			child: [wordData.optional.nextShowDate],
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
			categoryContainer.append(category);
		});
}

