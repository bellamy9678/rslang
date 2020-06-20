import { elementCreatorWithParentAndChildren } from './components';

export default class GameField {
  init() {
    this.gameContainer = document.querySelector('.game__main');
    this.gameBoardContainer = document.createElement('div');
    this.gameBoardContainer.classList.add('game__board');
    this.gamePuzzlesContainer = document.createElement('div');
    this.gamePuzzlesContainer.classList.add('game__puzzles');
    this.gameControlsContainer = document.createElement('div');
    this.gameControlsContainer.classList.add('game__controls');
    this.boardNumbers = document.createElement('div');
    this.boardNumbers.classList.add('board__column-numbers');
    this.generateNumbers(this.boardNumbers);


    this.board = document.createElement('div');
    this.board.classList.add('board');



    this.gameBoardContainer.append(this.boardNumbers, this.board)

    elementCreatorWithParentAndChildren('button', 'controls__btn-i-dont-know', 'I don\'t know', this.gameControlsContainer, '');
    elementCreatorWithParentAndChildren('button', 'controls__btn-check', 'Check', this.gameControlsContainer, '');
    elementCreatorWithParentAndChildren('button', 'controls__btn-continue', 'Continue', this.gameControlsContainer, '');
    this.gameContainer.append(
      this.gameBoardContainer,
      this.gamePuzzlesContainer,
      this.gameControlsContainer
    )
  }

  generateNumbers(parent) {
    for (let i = 1; i <= 10; i += 1) {
      elementCreatorWithParentAndChildren('div', 'number', i, parent, '');
    }
    this.nothing = false;
  }
}