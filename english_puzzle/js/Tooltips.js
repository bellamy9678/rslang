export default class Tooltips {
  init() {
    this.tooltipsContainer = document.querySelector('.tooltips');
    this.tooltipsContainer.innerHTML = `<button class="tooltips__play">Play_Icon</button>
    <div class="tooltips__translate"></div>`;
  }
}