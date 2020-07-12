import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

// import finishText from './OurGameConsts';

export default function initMain() {
	const newElem = new DOMElementCreator();
	
	const engWordsContainer = newElem.create({
		elem: TAGS.DIV,
		classes: 'english-container',
		id: 'eng-container', 
	});
	
	const translationContainer = newElem.create({
		elem: TAGS.DIV,
		classes: 'translation-container',
		id: 'transl-container',
	});
	
	const gameContainer = newElem.create({
		elem: TAGS.DIV,
		classes: ['game-container', 'none'],
		child: [engWordsContainer, translationContainer],
		id: 'game-cont',
	});

	return gameContainer;

}