import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

import { nameGame, promoFirst, promoSecond, buttonText } from './speakconst';


export default function initStartPage() {
	const newElem = new DOMElementCreator();

	const levelLabel = newElem.create({
		elem: TAGS.LABEL,
		attr: {
			for: 'level',
		},
		child: 'Choose level',
	});

	const roundLabel = newElem.create({
		elem: TAGS.LABEL,
		attr: {
			for: 'round',
		},
		child: 'Choose round',
	});

	const inputLevel = newElem.create({
		elem: TAGS.INPUT,
		attr: {
			type: 'number',
		},
		id: 'level',
	});

	const inputRound = newElem.create({
		elem: TAGS.INPUT,
		attr: {
			type: 'number',
		},
		id: 'round',
	});

	const levelContainer = newElem.create({
		elem: TAGS.DIV,
		classes: 'level-container',
		child: [levelLabel, inputLevel, roundLabel, inputRound],
	});

	const gameName = newElem.create({
		elem: TAGS.H1,
		classes: 'game-name',
		child: nameGame,
	});

	const startP1 = newElem.create({
		elem: TAGS.P,
		classes: 'description_p',
		child: promoFirst,
	});

	const startP2 = newElem.create({
		elem: TAGS.P,
		classes: 'description_p',
		child: promoSecond,
	});

	const gameDescription = newElem.create({
		elem: TAGS.DIV,
		classes: 'description',  
		child: [startP1, startP2],
	});

	const gameButton = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['start-btn', 'button', 'button_colored'],  
		child: buttonText,
	});

	const startPage = newElem.create({
		elem: TAGS.DIV,
		classes: 'start-page',  
		child: [gameName, gameDescription, levelContainer, gameButton],
	});

	return startPage;
}