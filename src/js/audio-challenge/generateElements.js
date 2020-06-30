import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {idkText} from './consts';

export default function generateElements(mainWord, answers) {
	const domCreator = new DOMElementCreator();
	const app = document.querySelector('.app');
	const soundIcon = domCreator.create({
		elem: TAGS.IMG,
		classes: 'sound-icon',
		attr: [{
			src: './assets/images/volume-up.svg'
		}, {
			alt: 'Image'
		}],
	});
	const sound = domCreator.create({
		elem: TAGS.AUDIO,
		attr: [{
			src: `${mainWord.audio}`
		}],
		classes: 'audio'
	});
	const soundIconWrapper = domCreator.create({
		elem: TAGS.DIV,
		classes: 'sound-wrapper',
		child: [soundIcon, sound]
	});
	const rightAnswerImage = domCreator.create({
		elem: TAGS.IMG,
		classes: 'right-answer-wrapper__image',
		attr: [{
			src: `${mainWord.image}`
		}, {
			alt: 'Image'
		}],
	});
	const mainWordTranslation = mainWord.word;
	const wordContainer= domCreator.create({
		elem: TAGS.P,
		classes: 'right-answer-wrapper__word-container__word',
		child: `${mainWordTranslation}`
	});
	const soundIcon2 = domCreator.create({
		elem: TAGS.IMG,
		classes: 'right-answer-wrapper__word-container__icon',
		attr: [{
			src: './assets/images/volume-up.svg'
		}, {
			alt: 'Image'
		}],
	});
	const translationContainer= domCreator.create({
		elem: TAGS.DIV,
		classes: 'right-answer-wrapper__word-container',
		child: [soundIcon2, wordContainer]
	});
	const rightAnswerWrapper= domCreator.create({
		elem: TAGS.DIV,
		classes: 'right-answer-wrapper',
		child: [rightAnswerImage, translationContainer]
	});
	const answerContainer = domCreator.create({
		elem: TAGS.DIV,
		classes: 'answers-wrapper',
		child: []
	});
	answers.forEach(item => {
		const answer = domCreator.create({
			elem: TAGS.P,
			classes: 'answers-wrapper__answer',
			child: `${item.wordTranslate}`
		});
		answerContainer.append(answer);
	});
	const idkButton = domCreator.create({
		elem: TAGS.DIV,
		classes: 'skip-button',
		child: `${idkText}`
	});
	const wrapper = domCreator.create({
		elem: TAGS.DIV,
		classes: 'main-wrapper',
		child: [soundIconWrapper, rightAnswerWrapper, answerContainer, idkButton]
	});
	app.append(wrapper);
	console.log(mainWord);
	// sound.play();
}
