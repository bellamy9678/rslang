import { wrapper } from './constants';
import { elementCreator } from './components';

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
    this.levelSeletBtn = document.querySelector('.controls__dropdown-level');
    this.roundSelectBtn = document.querySelector('.controls__dropdown-round');

    this.autoListeningBtn.addEventListener('click', () => { this.autoListeningBtnHandler() });
    this.showTranslationBtn.addEventListener('click', () => { this.showTranslationBtnHandler() });
    this.showListenBtn.addEventListener('click', () => { this.showListeningBtnHandler() });
    this.playAudioBtn.addEventListener('click', () => { this.playAudioBtnHandler(this.sentenceAudioLink) })
    this.checkBtn.addEventListener('click', () => { this.checkBtnHandler() })
    this.iDontKnowBtn.addEventListener('click', () => { this.iDontKnowBtnHandler() })
    this.continueBtn.addEventListener('click', () => { this.continueBtnHandler() })
    this.levelSeletBtn.addEventListener('change', (event) => { this.levelSeletBtnHandler(+event.target.value) });
    this.roundSelectBtn.addEventListener('change', (event) => { this.roundSeletBtnHandler(+event.target.value) });

  }


  levelSeletBtnHandler(level) {
    this.loadCustomLevelAndRound(level, this.currentRound)
  }

  roundSeletBtnHandler(round) {
    this.loadCustomLevelAndRound(this.currentLevel, round)
  }

  continueBtnHandler() {
    this.currentLine += 1;
    this.currentActiveLine = document.querySelector('.board__line--active');
    this.currentActiveLine.classList.remove('board__line--active');
    this.currentActiveElements = document.querySelectorAll('.game__jigsaw--active');
    this.currentActiveElements.forEach(element => element.classList.remove('game__jigsaw--active'));
    if (this.currentLine < 10) {
      this.addLine();
      this.getSentences(this.sentencesJSON, this.currentLine);
      this.sentenceTranslate = this.sentencesJSON[this.currentLine].textExampleTranslate;
      this.sentenceAudioLink = this.sentencesJSON[this.currentLine].audioExample;
    } else {
      this.clearField();
      this.addLine();
      this.currentLine = 0;
      this.currentRound += 1;
      this.getData();
    }
  }

  loadCustomLevelAndRound(level, round) {
    this.currentLevel = level;
    this.currentRound = round;
    this.clearField();
    this.clearPuzzlesContainer();
    this.addLine();
    this.currentLine = 0;
    this.getData(level, round);
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
    this.activePuzzles = document.querySelectorAll('.game__jigsaw--active');
    this.activePuzzles.forEach(puzzle => puzzle.remove());
    this.appendPuzzlesToFieldLine(this.sentenceArr)
  }

  checkBtnHandler() {
    this.currentLineElements = [...this.boardLine.children].map(i => i.children[0]);
    this.currentLineWords = [];
    for (let i = 0; i < this.sentenceArr.length; i += 1) {
      this.currentLineWords.push(this.boardLine.children[i].children[0].dataset.word)
    }
    this.checkedArr = this.compareTwoSameLengthArraysAndReturnArrayOfBoolean(this.currentLineWords, this.sentenceArr);
    this.showWrongAndRightAnswers(this.currentLineElements, this.checkedArr);
  }

  appendPuzzlesToFieldLine(puzzles) {
    this.activeFieldLineContainers = document.querySelector('.board__line--active').children;
    for (let i = 0; i < puzzles.length; i += 1) {
      this.puzzles = [...this.populatePuzzle(puzzles)];
      this.activeFieldLineContainers[i].append(this.puzzles[i]);
    }
  }

  playAudioBtnHandler(audioLink) {
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
    console.log(this.sentenceArr, this.sentenceTranslate, this.sentenceAudioLink);

  }

  getData(level = this.currentLevel, round = this.currentRound) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${level}&page=${round}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`
    fetch(url)
      .then(response => {
        return response.json();
      }).then(myJson => {
        console.log(myJson);

        this.handleJson(myJson);
      })
  }

  handleJson(myJson) {
    console.log(myJson);
    this.sentencesJSON = myJson;
    this.getSentences(myJson, this.currentLine);
    this.sentenceTranslate = myJson[0].textExampleTranslate;
    this.sentenceAudioLink = myJson[0].audioExample;
  }

  getSentences(arr, line) {
    const sentencesArr = [];
    console.log(arr, line);

    arr.forEach(word => sentencesArr.push(word.textExample.replace(/<[^>]*>/g, '')));
    this.generatePuzzle(sentencesArr[line]);
  }

  addLine() {
    this.board = document.querySelector('.board');
    this.boardLine = elementCreator('div', ['board__line', 'board__line--active']);
    this.board.append(this.boardLine);
  }

  generatePuzzle(sentence) {
    const wordsArray = sentence.split(' ');
    this.sentenceArr = wordsArray;

    const shuffledArr = this.shuffleArray(wordsArray);
    this.appendPuzzlesToContainer(shuffledArr);
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
    this.puzzles = sentenceArr.map(word => {
      this.newElement = elementCreator('div', ['game__jigsaw', 'game__jigsaw--active'], word, '', 'data-word', word);
      this.newElement.setAttribute('draggable', true);
      return this.newElement;
    });
    return this.puzzles;
  }

  appendPuzzlesToContainer(puzzles) {
    const puzzlesContainer = document.querySelector('.game__puzzles');
    puzzlesContainer.append(...this.populatePuzzle(puzzles));
    this.addPuzzleContainersToLine(puzzles.length);
    this.dragAndDrop();
    if (this.currentLine === 0 && this.eventListenersAddedState === false) {
      this.addEventListenersToControls();
    }
  }

  dragAndDrop() {

    this.puzzleItem = document.querySelectorAll('.game__jigsaw');
    this.puzzleContainer = document.querySelectorAll('.puzzle-container');
    this.puzzlesField = document.querySelector('.game__puzzles');
    let selectedItem;

    function dragStart() {
      selectedItem = this;

      setTimeout(() => {
        this.classList.add('hide');
      }, 0);
    };

    function dragEnd() {
      this.classList.remove('hide');
    };

    function dragOver(event) {
      event.preventDefault();
    };

    function dragEnter(event) {
      event.preventDefault();
      this.classList.add('hovered');
    };

    function dragLeave() {
      this.classList.remove('hovered');
    };

    function dragDrop() {

      if (true) {
        this.append(selectedItem);
        this.classList.remove('hovered');
      }
    };

    this.puzzleContainer.forEach(cell => {
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', dragDrop);
    });

    this.puzzlesField.addEventListener('dragover', dragOver);
    this.puzzlesField.addEventListener('dragenter', dragEnter);
    this.puzzlesField.addEventListener('dragleave', dragLeave);
    this.puzzlesField.addEventListener('drop', dragDrop);


    this.puzzleItem.forEach(item => item.addEventListener('dragstart', dragStart))
    this.puzzleItem.forEach(item => item.addEventListener('dragend', dragEnd))
  }

  addPuzzleContainersToLine(numberOfPuzzles) {
    this.arrOfPuzzleContainer = [];
    for (let i = 0; i < numberOfPuzzles; i += 1) {
      this.arrOfPuzzleContainer.push(elementCreator('div', ['puzzle-container', 'puzzle-container--active']));
    }

    this.boardLine.append(...this.arrOfPuzzleContainer);
  }

  showWrongAndRightAnswers(currentLineElements, arrOfBoolean) {
    for (let i = 0; i < currentLineElements.length; i += 1) {
      if (arrOfBoolean[i]) {
        currentLineElements[i].classList.add('game__jigsaw--correct')
      } else {
        currentLineElements[i].classList.add('game__jigsaw--wrong')
      }
    }
    this.nothing = false;
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
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container');

    this.controlsContainer = document.createElement('div');
    this.controlsContainer.classList.add('controls');
    this.tooltips = document.createElement('div');
    this.tooltips.classList.add('tooltips');
    this.gameBoard = document.createElement('div');
    this.gameBoard.classList.add('game__main');

    this.gameContainer.append(this.controlsContainer, this.tooltips, this.gameBoard);
    wrapper.append(this.gameContainer);
  }

  start() {
    this.getData();
    this.addLine();

  }
}

