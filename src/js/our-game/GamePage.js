import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

export default function initMain() {
	const newElem = new DOMElementCreator();	
	
	const engWordsContainer = newElem.create({
		elem: TAGS.DIV,
		classes: ['english-container'],
	});
	
	const translationContainer = newElem.create({
		elem: TAGS.DIV,
		classes: ['translation-container'],
	});
	
	const gameContainer = newElem.create({
		elem: TAGS.DIV,
		classes: ['game-container', 'none'],
		child: [engWordsContainer, translationContainer],
	});

	return gameContainer;

}