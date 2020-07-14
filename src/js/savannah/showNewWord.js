import {gameState, arrayWithRightAnswers, arrayWithWrongAnswers, arrForUniqness, VALUE_OF_KEYS, WORD_ENDING, POSITION_OF_NUMBER, WORD_BEGGINING, arrForRandFunc, START_INDEX, FINAL_INDEX, REQUIRED_MARGIN} from './consts';
import defineArrays from './defineArrays';
import generateWordContainers from './generateWordContainers';
import {handleWrongAnswer, handleRightAnswer} from './handleAnswers';
import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import Result from '../game_result/Result';
import giveWords from './giveWords';

export default async function showNewWord() {
	let gameOver = false;
	const creator = new DOMElementCreator();
	const result = new Result();

	function callShowNewWord() {
		setTimeout(() => {
			showNewWord();
		}, 1000);
	}

	function endgame(rightAnswersArr, wrongAnswersArr) {
		async function newRound() {
			gameState.started = false;
			arrForUniqness.length = 0;
			arrForRandFunc.length = 0;
			document.querySelector('.result__button').removeEventListener('click', newRound);
			const healthPoints = document.querySelector('.health-point-scale');
			while (healthPoints.firstChild) {
				healthPoints.firstChild.remove();
			}
			result.closeResultWindow();
			for (let i = 0; i <= 4; i+=1) {
				const heartIcon = creator.create({
					elem: TAGS.IMG,
					classes: 'heart-icon',
					attr: [{
						src: './assets/images/heart.svg'
					}, {
						alt: ''
					}],
				});
				healthPoints.append(heartIcon);
			}
			const allWords = await giveWords();
			allWords.forEach(item => {
				arrForUniqness.push(item);
			});
			allWords.forEach(item => {
				arrForRandFunc.push(item);
			});
			showNewWord();
		}

		const resultReturnBtn = creator.create({
			elem: TAGS.BUTTON,
			classes: ['result__button', 'result__continue-btn'],
			child: 'Главное меню',
		});
		const resultNewGameBtn = creator.create({
			elem: TAGS.BUTTON,
			classes: ['result__button', 'result__continue-btn'],
			child: 'Играть снова',
		});
		resultNewGameBtn.addEventListener('click', newRound);
		result.showResult({
			rightAnswers: rightAnswersArr,
			wrongAnswers: wrongAnswersArr,
			buttons: [resultReturnBtn, resultNewGameBtn]
		});
	}

	const lifeIcon = document.querySelector('.health-point-scale IMG');
	const repeatWords = JSON.parse(localStorage.getItem('gameData'));
	if (arrForUniqness.length === 0 && lifeIcon) {
		if (repeatWords && gameState.started) {
			gameOver = true;
			endgame(arrayWithRightAnswers, arrayWithWrongAnswers);
		} else {
			gameState.started = true;
			await defineArrays();
		}
	} else if (arrForUniqness.length !== 0 && lifeIcon) {
		await generateWordContainers(arrForUniqness, arrForRandFunc);
	} else {
		gameOver = true;
		endgame(arrayWithRightAnswers, arrayWithWrongAnswers);
		arrayWithRightAnswers.length = 0;
		arrayWithWrongAnswers.length = 0;
	}

	const mainWordContainer = document.querySelector('.main-word');
	const allAnswers = document.querySelectorAll('.answers p');
	if (!gameOver) {
		const trackTheEnd = setInterval(() => {
			if (+(mainWordContainer.style.top.slice(START_INDEX, FINAL_INDEX)) >= REQUIRED_MARGIN) {
				handleWrongAnswer();
				callShowNewWord();
				clearInterval(trackTheEnd);
			}
		}, 50);
	}

	function checkAnswer(choosenAnswer) {
		if (choosenAnswer.textContent === mainWordContainer.dataset.translate) {
			choosenAnswer.classList.add('right-answer__active');
			handleRightAnswer();
			callShowNewWord();
		} else {
			choosenAnswer.classList.add('wrong-answer__active');
			handleWrongAnswer();
			callShowNewWord();
		}
	}

	function defineButton(event){
		document.removeEventListener('keydown', defineButton);
		const numberOfDigit = event.code.slice(POSITION_OF_NUMBER, event.code.length);
		if (event.code.slice(WORD_BEGGINING, WORD_ENDING) === 'Digit' && +numberOfDigit <= VALUE_OF_KEYS) {
			const choosenAnswer = document.querySelector(`.answer:nth-child(${numberOfDigit})`);
			checkAnswer(choosenAnswer);
		}
	}

	function addEventOnClick(event) {
		checkAnswer(event.target);
		allAnswers.forEach((item) => {
			item.removeEventListener('click', addEventOnClick);
		});
	}


	allAnswers.forEach((item) => {
		item.addEventListener('click', addEventOnClick);
	});

	document.removeEventListener('keydown', defineButton);
	document.addEventListener('keydown', defineButton);
}
