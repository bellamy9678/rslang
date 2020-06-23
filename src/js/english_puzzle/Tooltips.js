import { elementCreator } from './components';

export default class Tooltips {
  init() {
    this.tooltipsContainer = document.querySelector('.tooltips');
    this.tooltipsContainer.append(
      elementCreator('button', 'tooltips__play', 'Play_Icon', '', 'disabled', true),
      elementCreator('div', 'tooltips__translate')
    )
  }
}