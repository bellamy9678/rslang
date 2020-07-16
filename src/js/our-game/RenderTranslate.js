import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';


export default function renderTranslate(item) {
	const newElem = new DOMElementCreator();
	const word = newElem.create({
		elem: TAGS.DIV,
		classes: 'word-translation-ourgame',
		attr: [{
			'data-word': `${item.word}`
		},
		],
		child: `${item.translate}`,
	}); 

	return word;
}