import { wrapper } from './constants';

export default class Game {
  constructor() {
    this.sentenceArr = [];
    this.sentenceTranslate = '';
    this.sentenceAudioLink = '';
    this.autoListeningBtnState = false;
    this.showTranslationBtnState = false;
    this.showListenBtnState = false;
    this.showBgImageBtnState = false;
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

  addEventListenersToControls() {
    this.autoListeningBtn = document.querySelector('.controls__auto-listening');
    this.showTranslationBtn = document.querySelector('.controls__translation');
    this.showListenBtn = document.querySelector('.controls__listening');
    this.showBgImageBtn = document.querySelector('.controls__background');
    this.playAudioBtn = document.querySelector('.tooltips__play');
    this.translationContainer = document.querySelector('.tooltips__translate');
    this.iDontKnowBtn = document.querySelector('.controls__button');

    this.autoListeningBtn.addEventListener('click', () => { this.autoListeningBtnHandler() });
    this.showTranslationBtn.addEventListener('click', () => { this.showTranslationBtnHandler() });
    this.showListenBtn.addEventListener('click', () => { this.showListeningBtnHandler() });
    this.playAudioBtn.addEventListener('click', () => { this.playAudioBtnHandler() })
    this.iDontKnowBtn.addEventListener('click', () => { this.checkBtnHandler() })
  }

  playAudioBtnHandler() {
    new Audio(`https://raw.githubusercontent.com/garza0/rslang-data/master/${this.sentenceAudioLink}`).play();
    console.log(this);

  }

  showListeningBtnHandler() {
    this.showListenBtnState = !this.showListenBtnState;
    console.log(this.showListenBtnState);

    if (this.showListenBtnState) {
      this.playAudioBtn.removeAttribute('disabled');
    } else {
      this.playAudioBtn.setAttribute('disabled', true);
    }
  }

  showTranslationBtnHandler() {
    this.showTranslationBtnState = !this.showTranslationBtnState;
    if (this.showTranslationBtnState) {
      this.translationContainer.innerHTML = this.sentenceTranslate;
    } else {
      this.translationContainer.innerHTML = '';
    }
  }

  autoListeningBtnHandler() {
    this.autoListeningBtnState = !this.autoListeningBtnState;
    console.log(this.sentenceArr, this.sentenceTranslate, this.sentenceAudioLink);

  }

  populatePuzzle(sentenceArr) {
    this.puzzles = sentenceArr.map((word) => `<div draggable="true" class="game__jigsaw" data-word="${word}"> ${word} </div>`).join('\n');
    return this.puzzles;
  }

  generatePuzzle(sentence) {
    const puzzlesContainer = document.querySelector('.game__puzzles');
    const wordsArray = sentence.split(' ');
    this.sentenceArr = wordsArray;
    console.log(wordsArray);

    const shuffledArr = this.shuffleArray(wordsArray);
    puzzlesContainer.innerHTML = this.populatePuzzle(shuffledArr);
    this.addPuzzleContainersToLine(wordsArray.length);
    this.dragAndDrop();
    this.addEventListenersToControls();

  }

  getSentences(arr) {
    const sentencesArr = [];
    arr.forEach(word => sentencesArr.push(word.textExample.replace(/<[^>]*>/g, '')));
    this.generatePuzzle(sentencesArr[0]);
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

  // getSentencesTranslation(arr) {
  //   const sentencesTranslation = []
  // }

  getData() {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=1&page=0&wordsPerExampleSentenceLTE=10&wordsPerPage=10`
    fetch(url)
      .then(response => {
        return response.json();
      }).then(myJson => {
        this.handleJson(myJson);
      })
  }

  handleJson(myJson) {
    console.log(myJson);
    this.getSentences(myJson);
    this.sentenceTranslate = myJson[0].textExampleTranslate;
    this.sentenceAudioLink = myJson[0].audioExample;
  }

  addLine() {
    this.board = document.querySelector('.board');
    this.boardLine = document.createElement('div');
    this.boardLine.classList.add('board__line');
    this.board.append(this.boardLine);
  }

  addPuzzleContainersToLine(numberOfPuzzles) {
    this.puzzleContainersArr = new Array(numberOfPuzzles);
    this.puzzleContainersArr.fill(`<div class="puzzle-container"></div>`);
    this.boardLine.innerHTML = this.puzzleContainersArr.join('\n');
  }

  start() {
    this.getData();
    this.addLine();

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
  };

  checkBtnHandler() {
    this.currentLineElements = [...this.boardLine.children].map(i => i.children[0]);
    this.currentLineWords = [];
    for (let i = 0; i < this.sentenceArr.length; i += 1) {
      this.currentLineWords.push(this.boardLine.children[i].children[0].dataset.word)
    }
    console.log(this.currentLineWords, this.sentenceArr, this.currentLineElements);
    this.checkedArr = this.compareTwoSameLengthArraysAndReturnArrayOfBoolean(this.currentLineWords, this.sentenceArr);
    this.showWrongAndRightAnswers(this.currentLineElements, this.checkedArr);
  }

  showWrongAndRightAnswers(currentLineElements, arrOfBoolean) {
    for (let i = 0; i < currentLineElements.length; i += 1) {
      if (arrOfBoolean[i]) {
        console.log(currentLineElements[i]);

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


}

