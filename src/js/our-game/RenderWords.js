import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';


export default function renderWords(item) {
	const newElem = new DOMElementCreator();
	const word = newElem.create({
		elem: TAGS.DIV,
		classes: 'word',
		child: `${item.word}`,
	}); 

	return word;
}