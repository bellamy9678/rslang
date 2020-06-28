import { appContainer, rounds, levels } from './constants';
import paintings from './paintingsData';
import DOMElementCreator from '../utils/DOMElementCreator';
import Result from './Result';

const result = new Result();

const factory = new DOMElementCreator();

export default class Game {
	constructor() {
		this.sentenceArr = [];
		this.sentenceTranslate = '';
		this.sentenceAudioLink = '';
		this.autoListeningBtnState = false;
		this.showTranslationBtnState = false;
		this.showListenBtnState = false;
		this.showBgImageBtnState = false;
		this.currentLine = 0;
		this.currentRound = 0;
		this.currentLevel = 0;
		this.sentencesJSON = {};
		this.eventListenersAddedState = false;
		this.numberOfPuzzles = 0;
		this.activePuzzleContainers = [];
		this.cypher = [];
		this.wrongAnswersResult = [];
		this.rightAnswersResult = [];
		this.currentLineSentenceObj = {};
		this.resultForCurrentLineState = false;
	}

	addEventListenersToControls() {
		this.eventListenersAddedState = true;
		this.autoListeningBtn = document.querySelector('.controls__auto-listening');
		this.showTranslationBtn = document.querySelector('.controls__translation');
		this.showListenBtn = document.querySelector('.controls__listening');
		this.showBgImageBtn = document.querySelector('.controls__background');
		this.playAudioBtn = document.querySelector('.tooltips__play');
		this.translationContainer = document.querySelector('.tooltips__translate');
		this.iDontKnowBtn = document.querySelector('.controls__btn-i-dont-know');
		this.checkBtn = document.querySelector('.controls__btn-check');
		this.continueBtn = document.querySelector('.controls__btn-continue');
		this.resulsBtn = document.querySelector('.controls__btn-results');
		this.levelSeletBtn = document.querySelector('.controls__dropdown-level');
		this.roundSelectBtn = document.querySelector('.controls__dropdown-round');

		this.autoListeningBtn.addEventListener('click', () => { this.autoListeningBtnHandler(); });
		this.showTranslationBtn.addEventListener('click', () => { this.showTranslationBtnHandler(); });
		this.showListenBtn.addEventListener('click', () => { this.showListeningBtnHandler(); });
		this.playAudioBtn.addEventListener('click', () => { this.playAudio(this.sentenceAudioLink); });
		this.checkBtn.addEventListener('click', () => { this.checkBtnHandler(); });
		this.iDontKnowBtn.addEventListener('click', () => { this.iDontKnowBtnHandler(); });
		this.continueBtn.addEventListener('click', () => { this.continueBtnHandler(); });
		this.resulsBtn.addEventListener('click', () => { this.resultsBtnHandler(); });
		this.levelSeletBtn.addEventListener('change', (event) => { this.levelSelectBtnHandler(+event.target.value - 1); });
		this.roundSelectBtn.addEventListener('change', (event) => { this.roundSelectBtnHandler(+event.target.value - 1); });
		this.showBgImageBtn.addEventListener('click', () => { this.showHideBackground(); });
	}


	levelSelectBtnHandler(level) {
		this.loadCustomLevelAndRound(level, this.currentRound);
	}

	roundSelectBtnHandler(round) {
		this.loadCustomLevelAndRound(this.currentLevel, round);
	}

	continueBtnHandler() {
		this.currentLine += 1;
		this.currentActiveLine = document.querySelector('.board__line--active');
		this.currentActiveLine.classList.remove('board__line--active');
		this.currentActiveElements = document.querySelectorAll('.game__jigsaw--active');
		this.currentActiveElements.forEach(element => {
			element.removeAttribute('draggable');
			element.classList.remove('game__jigsaw--active');
		});
		this.puzzleContainer = document.querySelectorAll('.puzzle-container--active');
		this.puzzleContainer.forEach(element => element.classList.remove('puzzle-container--active'));
		this.iDontKnowBtn.classList.remove('hide');
		this.continueBtn.classList.add('hide');
		if (this.currentRound < rounds) {
			this.addLine();
			this.currentLineSentenceObj = this.sentencesJSON[this.currentLine];
			this.sentenceTranslate = this.sentencesJSON[this.currentLine].textExampleTranslate;
			this.sentenceAudioLink = this.sentencesJSON[this.currentLine].audioExample;
			this.getSentences(this.sentencesJSON, this.currentLine);
		} else {
			this.clearField();
			this.addLine();
			this.currentLine = 0;
			this.currentRound += 1;
			this.roundSelectBtn.selectedIndex = this.currentRound;
			this.cypher = [];
			this.wrongAnswersResult = [];
			this.rightAnswersResult = [];
			this.resulsBtn.classList.add('hide');
			this.getData();
		}
	}

	loadNextRound() {
		if (this.currentRound + 2 < rounds) {
			console.log(this.currentRound, rounds);

		} else {
			this.loadNextLevel();
		}
	}

	loadNextLevel() {
		if (this.currentLevel + 2 < levels) {
			console.log(this.currentLevel, levels);

		} else {
			console.log('finish');

		}
	}

	resultsBtnHandler() {
		const resultContinueBtn = factory.create({
			elem: 'button',
			classes: ['result__button', 'result__continue-btn'],
			child: 'Continue'
		});

		resultContinueBtn.addEventListener('click', () => {
			result.closeResultWindow();
			this.loadCustomLevelAndRound(this.currentLevel, this.currentRound + 1);
		});

		result.showResult({
			rightAnswersSentences: this.rightAnswersResult,
			wrongAnswersSentences: this.wrongAnswersResult,
			buttons: [resultContinueBtn]
		});
	}

	loadCustomLevelAndRound(level, round) {
		this.cypher = [];
		this.wrongAnswersResult = [];
		this.rightAnswersResult = [];
		this.currentLevel = level;
		this.currentRound = round;
		this.clearField();
		this.clearPuzzlesContainer();
		this.addLine();
		this.currentLine = 0;
		this.iDontKnowBtn.classList.remove('hide');
		this.checkBtn.classList.add('hide');
		this.continueBtn.classList.add('hide');
		this.resulsBtn.classList.add('hide');
		this.getData(level, round);
		this.roundSelectBtn.selectedIndex = this.currentRound;


	}

	clearPuzzlesContainer() {
		this.puzzlesBottomContainer = document.querySelector('.game__puzzles');
		while (this.puzzlesBottomContainer.firstChild) {
			this.puzzlesBottomContainer.removeChild(this.puzzlesBottomContainer.firstChild);
		}
	}

	clearField() {
		this.board = document.querySelector('.board');
		while (this.board.firstChild) {
			this.board.removeChild(this.board.firstChild);
		}
	}

	iDontKnowBtnHandler() {
		if (this.resultForCurrentLineState === false) {
			this.wrongAnswersResult.push(this.currentLineSentenceObj);
			this.resultForCurrentLineState = true;
		}
		this.activePuzzles = document.querySelectorAll('.game__jigsaw--active');
		const puzzleNodes = [];
		this.activePuzzles.forEach(puzzle => {
			puzzleNodes.push(puzzle);
			puzzle.remove();
		});
		this.iDontKnowBtn.classList.add('hide');
		this.continueBtn.classList.remove('hide');
		this.appendPuzzlesToFieldLine(this.sortPuzzles(puzzleNodes));
		if (this.currentLine === rounds - 1) {
			this.resulsBtn.classList.remove('hide');
		}
	}

	sortPuzzles(puzzles) {
		const sorted = [];
		puzzles.forEach(puzzle => {
			sorted[this.cypher[this.currentLine][0].indexOf(+puzzle.dataset.positionCrypted)] = puzzle;
		});
		return sorted;
	}

	checkBtnHandler() {
		this.currentLineElements = [...this.boardLine.children].map(i => i.children[0]);
		this.currentLineWords = [];
		for (let i = 0; i < this.sentenceArr.length; i += 1) {
			this.currentLineWords.push(this.boardLine.children[i].children[0].dataset.word);
		}
		this.checkedArr = this.compareTwoSameLengthArraysAndReturnArrayOfBoolean(this.currentLineWords, this.sentenceArr);
		this.showWrongAndRightAnswers(this.currentLineElements, this.checkedArr);
	}

	appendPuzzlesToFieldLine(sortedPuzzles) {
		this.activeFieldLineContainers = document.querySelector('.board__line--active').children;
		for (let i = 0; i < sortedPuzzles.length; i += 1) {
			this.activeFieldLineContainers[i].append(sortedPuzzles[i]);
		}
	}

	playAudio(audioLink) {
		this.audio = new Audio(`https://raw.githubusercontent.com/garza0/rslang-data/master/${audioLink}`);
		this.audio.play();
	}

	showListeningBtnHandler() {
		this.showListenBtnState = !this.showListenBtnState;
		if (this.showListenBtnState) {
			this.playAudioBtn.removeAttribute('disabled');
		} else {
			this.playAudioBtn.setAttribute('disabled', true);
		}
	}

	showTranslationBtnHandler() {
		this.showTranslationBtnState = !this.showTranslationBtnState;
		if (this.showTranslationBtnState) {
			this.translationContainer.innerText = this.sentenceTranslate;
		} else {
			this.translationContainer.innerText = '';
		}
	}

	autoListeningBtnHandler() {
		this.autoListeningBtnState = !this.autoListeningBtnState;
	}

	getData(level = this.currentLevel, round = this.currentRound) {

		const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${level}&page=${round}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
		fetch(url)
			.then(response => {
				return response.json();
			}).then(myJson => {
				this.handleJson(myJson);
			});
	}

	handleJson(myJson) {
		console.log(myJson, this.currentLevel, this.currentRound);
		this.sentencesJSON = myJson;
		this.sentenceTranslate = myJson[0].textExampleTranslate;
		this.sentenceAudioLink = myJson[0].audioExample;
		this.getSentences(myJson, this.currentLine);
	}

	getSentences(arr, line) {
		const sentencesArr = [];
		arr.forEach(word => sentencesArr.push(word.textExample.replace(/<[^>]*>/g, '')));
		this.generatePuzzle(sentencesArr[line]);
	}

	addLine() {
		this.board = document.querySelector('.board');
		this.boardLine = factory.create({
			elem: 'div',
			classes: ['board__line', 'board__line--active'],
			attr: { 'data-line': this.currentLine }
		});
		this.resultForCurrentLineState = false;
		this.board.append(this.boardLine);
	}

	generatePuzzle(sentence) {
		const wordsArray = sentence.split(' ');
		this.sentenceArr = wordsArray;
		this.numberOfPuzzles = wordsArray.length;
		const puzzles = this.populatePuzzle(wordsArray);
		const shuffledPuzzleArr = this.shuffleArray(puzzles);
		this.appendPuzzlesToContainer(shuffledPuzzleArr);
	}

	shuffleArray(arr) {
		let counter = arr.length;
		this.arr = [...arr];
		while (counter > 0) {
			this.index = Math.floor(Math.random() * counter);
			counter -= 1;
			this.temp = this.arr[counter];
			this.arr[counter] = this.arr[this.index];
			this.arr[this.index] = this.temp;
		}

		return this.arr;
	}

	populatePuzzle(sentenceArr) {
		const cypher = this.encryptPuzzlePlace(sentenceArr.length);
		this.puzzles = sentenceArr.map((word, index) => {

			this.newElement = factory.create({
				elem: 'div',
				classes: ['game__jigsaw', 'game__jigsaw--active'],
				attr: [{ 'data-word': word }, { 'data-position-crypted': cypher[0][index] }, { 'data-line': this.currentLine }, { 'draggable': true }],
				child: word
			});
			if (this.showBgImageBtnState) {
				this.addBackgroundToPuzzles(this.newElement);
			}

			return this.newElement;
		});
		return this.puzzles;
	}

	encryptPuzzlePlace(length) {
		const cryptArray = [];
		const arr = [];
		for (let i = 0; i < length; i += 1) {
			arr.push(i);
		}
		cryptArray.push(this.shuffleArray(arr));
		this.cypher.push(cryptArray);

		return cryptArray;

	}

	appendPuzzlesToContainer(puzzles) {
		const puzzlesContainer = document.querySelector('.game__puzzles');
		const gridTemplate = new Array(puzzles.length).fill('auto');
		puzzlesContainer.style.gridTemplateColumns = gridTemplate.join(' ');
		puzzlesContainer.append(...puzzles);
		this.currentLineSentenceObj = this.sentencesJSON[this.currentLine];
		this.setGridTemplateForPuzzlesContainer();

		this.addPuzzleContainersToLine(puzzles.length);
		this.dragAndDrop();
		if (this.currentLine === 0 && this.eventListenersAddedState === false) {
			this.addEventListenersToControls();
		}
		if (this.autoListeningBtnState) {
			this.playAudio(this.sentenceAudioLink);
		}
		this.calculateBackgroundPosition(puzzles);
	}

	dragAndDrop() {
		this.puzzleItem = document.querySelectorAll('.game__jigsaw--active');
		this.activePuzzleContainers = document.querySelectorAll('.puzzle-container--active');
		this.puzzlesField = document.querySelector('.game__puzzles');
		let selectedItem;
		let selectedItemWidth;

		const dragStart = (event) => {
			selectedItem = event.target;
			selectedItemWidth = selectedItem.offsetWidth;


			if (event.target.closest('.puzzle-container--active')) {
				const container = event.target.closest('.puzzle-container--active');
				container.classList.remove('container--full');
			}

			setTimeout(() => {
				selectedItem.classList.add('hide');
			}, 0);
		};

		const dragEnd = (event) => {
			event.target.classList.remove('hide');
		};

		const dragOver = (event) => {
			event.preventDefault();
		};

		const dragEnter = (event) => {
			event.preventDefault();
			const targetParent = event.target.closest('.game__puzzles') || event.target.closest('.board__line--active');
			if (event.target.closest('.board__line--active')) {
				const position = event.target.dataset.containerPosition;
				this.changeGridTemplateForOneColumn(targetParent, position, selectedItemWidth);
				console.log(targetParent, position, selectedItemWidth);
			}

			if (event.target.classList.contains('puzzle-container--active') || event.target.classList.contains('game__puzzles')) {
				event.target.classList.add('hovered');
			}
		};

		const dragLeave = (event) => {

			event.target.classList.remove('hovered');
		};

		const dragDrop = (event) => {
			if (event.target.classList.contains('puzzle-container--active') || event.target.classList.contains('game__puzzles')) {
				event.target.append(selectedItem);
				event.target.classList.remove('hovered');
				if (event.target.classList.contains('puzzle-container--active')) {
					event.target.classList.add('container--full');
					this.checkIfLineIsFull();
				}
			}
		};

		this.activePuzzleContainers.forEach(cell => {
			cell.addEventListener('dragover', dragOver);
			cell.addEventListener('dragenter', dragEnter);
			cell.addEventListener('dragleave', dragLeave);
			cell.addEventListener('drop', dragDrop);
		});

		this.puzzlesField.addEventListener('dragover', dragOver);
		this.puzzlesField.addEventListener('dragenter', dragEnter);
		this.puzzlesField.addEventListener('dragleave', dragLeave);
		this.puzzlesField.addEventListener('drop', dragDrop);


		this.puzzleItem.forEach(item => item.addEventListener('dragstart', dragStart));
		this.puzzleItem.forEach(item => item.addEventListener('dragend', dragEnd));
	}

	checkIfLineIsFull() {
		this.numberOfFullContainers = 0;
		this.activePuzzleContainers.forEach(container => {
			if (container.classList.contains('container--full')) {
				this.numberOfFullContainers += 1;
			}
		});
		if (this.numberOfFullContainers === this.numberOfPuzzles) {
			this.lineIsFullHandler();
		}

	}

	lineIsFullHandler() {
		this.checkBtn.classList.remove('hide');
	}

	addPuzzleContainersToLine(numberOfPuzzles) {
		this.gridTemplate = new Array(numberOfPuzzles).fill('auto');
		this.arrOfPuzzleContainer = [];
		for (let i = 0; i < numberOfPuzzles; i += 1) {
			this.arrOfPuzzleContainer.push(
				factory.create({
					elem: 'div',
					classes: ['puzzle-container', 'puzzle-container--active'],
					attr: { 'data-container-position': i }
				})
			);
		}
		this.boardLine.style.gridTemplateColumns = this.gridTemplate.join(' ');
		this.boardLine.append(...this.arrOfPuzzleContainer);
	}

	showWrongAndRightAnswers(currentLineElements, arrOfBoolean) {
		this.rightAnswers = 0;
		for (let i = 0; i < currentLineElements.length; i += 1) {
			currentLineElements[i].classList.remove('game__jigsaw--correct', 'game__jigsaw--wrong');
			if (arrOfBoolean[i]) {
				this.rightAnswers += 1;
				currentLineElements[i].classList.add('game__jigsaw--correct');
			} else {
				currentLineElements[i].classList.add('game__jigsaw--wrong');
			}
		}
		if (this.rightAnswers === currentLineElements.length) {
			this.allIsRightHandler();
		} else {
			this.notAllIsRigthHandler();
		}
	}

	notAllIsRigthHandler() {
		if (this.resultForCurrentLineState === false) {
			this.wrongAnswersResult.push(this.currentLineSentenceObj);
			this.resultForCurrentLineState = true;
		}
	}

	allIsRightHandler() {
		if (this.resultForCurrentLineState === false) {
			this.rightAnswersResult.push(this.currentLineSentenceObj);
			this.resultForCurrentLineState = true;
		}
		if (this.currentLine < 10) {
			this.iDontKnowBtn.classList.add('hide');
			this.checkBtn.classList.add('hide');
			this.continueBtn.classList.remove('hide');
			if (this.currentLine === rounds - 1) {
				this.resulsBtn.classList.remove('hide');
			} else {
				console.log('round end');
			}
		}
	}

	compareTwoSameLengthArraysAndReturnArrayOfBoolean(arr1, arr2) {
		this.arrayOfBoolean = [];
		for (let i = 0; i < arr1.length; i += 1) {
			if (arr1[i] === arr2[i]) {
				this.arrayOfBoolean.push(true);
			} else {
				this.arrayOfBoolean.push(false);
			}
		}
		return this.arrayOfBoolean;
	}

	init() {
		this.controlsContainer = factory.create({
			elem: 'div',
			classes: 'controls'
		});
		this.tooltips = factory.create({
			elem: 'div',
			classes: 'tooltips'
		});
		this.gameBoard = factory.create({
			elem: 'div',
			classes: 'game__main'
		});

		this.gameContainer = factory.create({
			elem: 'div',
			classes: 'game-container',
			child: [this.controlsContainer, this.tooltips, this.gameBoard]
		});

		this.wrapper = factory.create({
			elem: 'div',
			classes: 'wrapper',
			child: this.gameContainer
		});

		appContainer.append(this.wrapper);
	}

	start() {
		this.getData();
		this.addLine();
	}


	addBackgroundToPuzzles(puzzle) {
		const thisPuzzle = puzzle;
		this.backgroundPicture = paintings[this.currentLevel][this.currentRound];
		thisPuzzle.style.backgroundImage = `url(https://raw.githubusercontent.com/Garza0/rslang_data_paintings/master/${this.backgroundPicture.cutSrc})`;

	}

	calculateBackgroundPosition(elements) {
		const sortedPuzzles = this.sortPuzzles(elements);
		const elementsLine = elements[0].dataset.line;
		const puzzleHeight = elements[0].offsetHeight;
		const bgWidth = this.board.offsetWidth;
		let previosPuzzlesWidth = 0;

		sortedPuzzles.forEach(element => {
			const puzzle = element;
			puzzle.style.backgroundPosition = `${-previosPuzzlesWidth}px ${-elementsLine * puzzleHeight}px`;
			puzzle.style.backgroundSize = `${bgWidth}px`;
			previosPuzzlesWidth += puzzle.offsetWidth;
		});
	}

	showHideBackground() {
		this.showBgImageBtnState = !this.showBgImageBtnState;
		const puzzles = document.querySelectorAll('.game__jigsaw');
		if (this.showBgImageBtnState) {
			puzzles.forEach(element => {
				this.addBackgroundToPuzzles(element);
			});
		} else {
			puzzles.forEach(element => element.style.removeProperty('background-image'));
		}
	}

	setGridTemplateForPuzzlesContainer() {
		this.puzzlesContainer = document.querySelector('.game__puzzles');
		const puzzlesInsideContainer = this.puzzlesContainer.querySelectorAll('div');
		const puzzlesWidthArr = [];
		puzzlesInsideContainer.forEach(puzzle => puzzlesWidthArr.push(puzzle.offsetWidth));
		const puzzlesContainerTemplate = puzzlesWidthArr.map(width => `${width}px`);
		this.puzzlesContainer.style.gridTemplateColumns = puzzlesContainerTemplate.join(' ');
	}

	changeGridTemplateForOneColumn(element, position, width) {
		console.log(element, +position, width);

		const elementGridTemplate = element.style.gridTemplateColumns.split(' ');
		elementGridTemplate[+position] = `${width}px`;
		const test = document.querySelector('.board__line--active');
		test.style.gridTemplateColumns = elementGridTemplate.join(' ');
		console.log(test, elementGridTemplate.join(' '));


		this.nothing = false;
	}

}
