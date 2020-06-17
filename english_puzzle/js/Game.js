import { wrapper } from './constants';

export default class Game {
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

  populatePuzzle(sentenceArr) {
    this.puzzles = sentenceArr.map((word) => `<div draggable="true" class="game__jigsaw"> ${word} </div>`).join('\n');
    return this.puzzles;
  }

  generatePuzzle(sentence) {
    const puzzlesContainer = document.querySelector('.game__puzzles');
    const wordsArray = sentence.split(' ');
    puzzlesContainer.innerHTML = this.populatePuzzle(wordsArray);
    this.addPuzzleContainersToLine(wordsArray.length);
    this.dragAndDrop();

  }

  getSentences(arr) {
    const sentencesArr = [];
    arr.forEach(word => sentencesArr.push(word.textExample.replace(/<[^>]*>/g, '')))
    this.generatePuzzle(sentencesArr[0]);
  }

  getData() {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=1&page=0&wordsPerExampleSentenceLTE=10&wordsPerPage=10`
    fetch(url)
      .then(response => {
        return response.json();
      }).then(myJson => {
        this.getSentences(myJson);
      })
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

    const dragStart = function () {
      selectedItem = this;
      setTimeout(() => {
        this.classList.add('hide');
      }, 0);
    };

    const dragEnd = function () {
      this.classList.remove('hide');
    };

    const dragOver = function (event) {
      event.preventDefault();
    };

    const dragEnter = function (event) {
      event.preventDefault();
      this.classList.add('hovered');
    };

    const dragLeave = function () {
      this.classList.remove('hovered');
    };

    const dragDrop = function () {
      this.append(selectedItem);
      this.classList.remove('hovered');
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


}

