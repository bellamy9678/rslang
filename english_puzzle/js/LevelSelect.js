export default class LevelSelect {
  init(levels = 6, rounds = 10) {
    this.levelAndPageSelectContainer = document.createElement('div');
    this.levelAndPageSelectContainer.classList.add('controls__level-and-page');
    this.levelSelect = `<label for="level">Level</label>
    <select class="controls__dropdown-level">${this.generateOptions(levels)}</select>`
    this.roundSelect = `<label for="round">Round</label>
    <select class="controls__dropdown-round">${this.generateOptions(rounds)}</select>`
    this.levelAndPageSelectContainer.innerHTML = this.levelSelect + this.roundSelect;
    this.controlsContainer = document.querySelector('.controls');
    this.controlsContainer.append(this.levelAndPageSelectContainer);
  }

  generateOptions(quantity) {
    this.options = [];
    for (let i = 1; i <= quantity; i += 1) {
      this.option = `<option value="${i}">${i}</option>`;
      this.options.push(this.option);
    }
    return this.options.join('\n');
  }
}