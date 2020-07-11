import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

const finishText = 'Finish';

export default function createHeader() {
	const newElem = new DOMElementCreator();
	
	const score = newElem.create({
		elem: TAGS.DIV,
		classes: ['game-score', 'none'],
	});

	const finishBtn = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['finish-btn', 'button', 'button_colored'],  
		child: finishText,
	});

	const gameHeader = newElem.create({
		elem: TAGS.DIV,
		classes: ['game-control'],  
		child: [score, finishBtn],
	});

	return gameHeader;
}