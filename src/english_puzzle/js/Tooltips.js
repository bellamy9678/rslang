import { elementCreatorWithParentAndChildren } from './components';

export default class Tooltips {
  init() {
    this.tooltipsContainer = document.querySelector('.tooltips');
    elementCreatorWithParentAndChildren('button', 'tooltips__play', 'Play_Icon', this.tooltipsContainer, '');
    elementCreatorWithParentAndChildren('div', 'tooltips__translate', '', this.tooltipsContainer, '');
  }
}