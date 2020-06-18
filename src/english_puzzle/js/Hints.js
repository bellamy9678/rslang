import { elementCreator } from './components';

export default class Hints {
  init() {
    this.hintsArr = ['auto-listening', 'translation', 'listening', 'background'];
    this.hints = elementCreator('div', 'controls__hints');
    this.hintControls = this.hintsArr.map(hint => elementCreator('button', `controls__${hint}`, hint));
    this.hints.append(...this.hintControls);
    this.controlsContainer = document.querySelector('.controls');
    this.controlsContainer.append(this.hints);
  }
}