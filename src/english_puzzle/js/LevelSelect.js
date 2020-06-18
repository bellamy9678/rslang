import { elementCreator } from './components';

export default class LevelSelect {
  init(levels = 6, rounds = 10) {
    this.levelAndPageSelectContainer = document.createElement('div');
    this.levelAndPageSelectContainer.classList.add('controls__level-and-page');

    this.levelSelectLabel = elementCreator('label', '', 'Level', '', 'for', 'level');
    this.levelSelectDropdown = elementCreator('select', 'controls__dropdown-level');
    this.levelSelectDropdown.append(...this.generateOptions(levels));

    this.roundSelectLabel = elementCreator('label', '', 'Round', '', 'for', 'round');
    this.roundSelectDropdown = elementCreator('select', 'controls__dropdown-round');
    this.roundSelectDropdown.append(...this.generateOptions(rounds));

    this.levelAndPageSelectContainer.append(this.levelSelectLabel, this.levelSelectDropdown, this.roundSelectLabel, this.roundSelectDropdown);

    this.controlsContainer = document.querySelector('.controls');
    this.controlsContainer.append(this.levelAndPageSelectContainer);
  }

  generateOptions(quantity) {
    this.options = [];
    for (let i = 1; i <= quantity; i += 1) {
      this.options.push(elementCreator('option', '', i, '', 'value', i));
    }
    return this.options;
  }
}