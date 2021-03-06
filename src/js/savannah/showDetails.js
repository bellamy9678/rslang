import {arrayWithWords, arrForUniqness, NUMBER_OF_WORDS} from './consts';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';

export default function arrayRandElement(fullArray) {
	const main = document.querySelector('.info-wrapper');
	const creator = new DOMElementCreator();
	const mainWord = arrForUniqness[0];
	let numberOfAnswers = NUMBER_OF_WORDS-1;
	const mainWordContainer = creator.create({
		elem: TAGS.P,
		classes: 'main-word',
		child: [`${mainWord.word}`],
		attr: [{
			'data-translate': `${mainWord.translate}`
		}, {
			'data-word': `${mainWord.word}`
		}, {
			'data-audio': `${mainWord.audio}`
		}, {
			'data-id': `${mainWord.id}`
		}]
	});
	const forTest = fullArray.slice();
	fullArray.splice(fullArray.indexOf(mainWord), 1);
	if (fullArray.length < NUMBER_OF_WORDS-1) {
		numberOfAnswers = fullArray.length ;
	}
	for (let i = 0; i < numberOfAnswers; i += 1) {
		const randomIndex = Math.floor(Math.random() * fullArray.length);
		arrayWithWords.push(fullArray[randomIndex]);
		fullArray.splice(randomIndex, 1);
	}
	const indexForMainWord = Math.floor(Math.random() * arrayWithWords.length);
	arrayWithWords.splice(indexForMainWord, 0, mainWord);
	fullArray.splice(0, fullArray.length);
	forTest.forEach(item => {
		fullArray.push(item);
	});
	mainWordContainer.style.visibility = 'hidden';
	main.prepend(mainWordContainer);
	setTimeout(() => {
		mainWordContainer.style.visibility = 'visible';
	}, 100);
	arrForUniqness.shift();
}
