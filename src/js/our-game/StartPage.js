import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';

import { nameGame, promoFirst, promoSecond, buttonText } from './OurGameConsts';


export default function initStartPage() {
	const newElem = new DOMElementCreator();

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
		child: [gameName, gameDescription, gameButton],
	});

	return startPage;
}