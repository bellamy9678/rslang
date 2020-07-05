// import DOMElementCreator from '../utils/DOMElementCreator';
// import TAGS from '../shared/Tags.json';

// function createDictionaryPage() {
// 	const newElem = new DOMElementCreator();

// 	const word = newElem.create({
// 		elem: TAGS.SPAN,
// 		classes: ['dictionary__cell', 'dictionary__word'],
// 		child: ['word']
// 	});

// 	const transcription = newElem.create({
// 		elem: TAGS.SPAN,
// 		classes: ['dictionary__cell', 'dictionary__transcription'],
// 		child: ['transcription']
// 	});

// 	const translate = newElem.create({
// 		elem: TAGS.SPAN,
// 		classes: ['dictionary__cell', 'dictionary__translate'],
// 		child: ['translate']
// 	});

// 	const row = newElem.create({
// 		elem: TAGS.DIV,
// 		classes: ['dictionary__row'],
// 		child: [word, transcription, translate]
// 	});
//     console.log("showDictionary -> row", row)

// 	const studiedWords = newElem.create({
// 		elem: TAGS.DIV,
// 		classes: ['dictionary__studied'],
// 		// child: [row, row, row]
// 		child: addWordToDictionary()
// 	});

// 	const wrapper = newElem.create({
// 		elem: TAGS.DIV,
// 		classes: ['wrapper'],
// 		child: [studiedWords],
// 	});

// 	return wrapper;
// };

// function showDictionaryPage() {
// 	const app = document.querySelector('.app');
// 	const dictionaryPage = createDictionaryPage();
// 	if (app.firstChild) {
// 		app.firstChild.remove();
// 	}
// 	app.append(page);
// }
