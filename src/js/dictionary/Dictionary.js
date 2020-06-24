import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
// import addWordToDictionary from '../utils/DictionaryWords';
import getCards from '../cards/GetCards';

// (function showDictionary() {
// 	const app = document.querySelector('.app');
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

// 	const page = newElem.create({
// 		elem: TAGS.DIV,
// 		classes: 'dictionary',
// 		child: [wrapper],
// 	});

// 	if (app.firstChild) {
// 		app.firstChild.remove();
// 	}
// 	app.append(page);
// })();

async function showCards() {
	const app = document.querySelector('.app');
	const cards = await getCards(0, 0);
	console.log("cards", cards);
	const newElem = new DOMElementCreator();
	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: 'wrapper',
	});
	app.firstChild.remove();
	cards.forEach(card => {
		wrapper.append(card);
	});
	app.append(wrapper);
}

showCards();
