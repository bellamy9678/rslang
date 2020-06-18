export default class Hints {
  init() {
    this.hintsArr = ['auto-listening', 'translation', 'listening', 'background'];
    this.hints = document.createElement('div');
    this.hints.classList.add('controls__hints');
    this.hintControls = this.hintsArr.map(hint => `<button class="controls__${hint}">${hint}</button>`).join('\n');
    this.hints.innerHTML = this.hintControls;
    this.controlsContainer = document.querySelector('.controls');
    this.controlsContainer.append(this.hints);
  }
}