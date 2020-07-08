import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {idkText, LEFT_MARGIN_OF_NEW_QUESTION} from './consts';
import checkAnswer from './checkAnswer';

export default async function generateElements(mainWordObj, answers) {
	const mainWrapper = document.querySelector('.main-wrapper');
	if (mainWrapper) {
		mainWrapper.remove();
	}
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
			src: `${mainWordObj.audio}`,
			autoplay: 'autoplay'
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
			src: `${mainWordObj.image}`
		}, {
			alt: 'Image'
		}],
	});
	const mainWord = mainWordObj.word;
	const wordContainer= domCreator.create({
		elem: TAGS.P,
		classes: 'right-answer-wrapper__word-container__word',
		child: `${mainWord}`,
		attr: [{
			'data-translate': `${mainWordObj.translate}`
		}, {
			'data-image': `${mainWordObj.image}`
		}, {
			'data-audio': `${mainWordObj.audio}`
		}]
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
		classes: 'answers-wrapper'
	});
	const arrWithTranslations = [];
	answers.forEach(item => {
		const answer = domCreator.create({
			elem: TAGS.P,
			classes: 'answers-wrapper__answer',
			child: `${item.translate}`
		});
		arrWithTranslations.push(item.translate);
		answerContainer.append(answer);
	});
	const idkButton = domCreator.create({
		elem: TAGS.DIV,
		classes: 'skip-button',
		child: `${idkText}`
	});
	const wrapperContent = domCreator.create({
		elem: TAGS.DIV,
		classes: 'main-wrapper__content',
		child: [soundIconWrapper, rightAnswerWrapper, answerContainer, idkButton]
	});
	const wrapper = domCreator.create({
		elem: TAGS.DIV,
		classes: 'main-wrapper',
		child: [wrapperContent]
	});
	app.append(wrapper);
	soundIcon2.addEventListener('click', () => {
		sound.play();
	});
	const mainWordTranslationIndex = arrWithTranslations.indexOf(`${mainWordObj.translate}`);
	const rightAnswer = document.querySelector(`.answers-wrapper__answer:nth-child(${mainWordTranslationIndex+1})`);
	rightAnswer.classList.add('right-answer');
	const delayBeforeAppearance = 10;
	setTimeout(() => {
		wrapperContent.style.left = LEFT_MARGIN_OF_NEW_QUESTION;
	}, delayBeforeAppearance);
	const answerContainers = document.querySelectorAll('.answers-wrapper__answer');
	answerContainers.forEach(container => {
		container.addEventListener('click', checkAnswer);
	});
}
