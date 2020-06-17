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
    this.boardNumbers.innerHTML = this.generateNumbers();

    this.board = document.createElement('div');
    this.board.classList.add('board');



    this.gameBoardContainer.append(this.boardNumbers, this.board)

    this.gameControlsContainer.innerHTML = `<button class="controls__button">I don't know</button>`;

    this.gameContainer.append(
      this.gameBoardContainer,
      this.gamePuzzlesContainer,
      this.gameControlsContainer
    )
  }

  generateNumbers() {
    this.numbers = [];
    for (let i = 1; i <= 10; i += 1) {
      this.number = `<div class="number">${i}</div>`;
      this.numbers.push(this.number);
    }
    return this.numbers.join('\n');
  }
}