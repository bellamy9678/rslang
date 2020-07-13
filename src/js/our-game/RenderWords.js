import DOMElementCreator from '../utils/DOMElementCreator';

import TAGS from '../shared/Tags.json';


export default function renderWords(item, index) {
	const newElem = new DOMElementCreator();
	const word = newElem.create({
		elem: TAGS.DIV,
		classes: 'word-our-game',
		attr: [{
			'data-translation': `${item.translate}`
		},
		{'data-transciption': `${item.transcription}`
		},
		{'data-sound': `${item.audio}`
		},
		{'data-index': index},
		],
		child: `${item.word}`,
	}); 

	return word;
}