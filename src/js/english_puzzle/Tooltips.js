import DOMElementCreator from '../utils/DOMElementCreator';

const factory = new DOMElementCreator();

export default class Tooltips {
	init() {
		this.tooltipsContainer = document.querySelector('.tooltips');
		const playAudioBtn = factory.create({
			elem: 'button',
			classes: ['tooltips__play', 'btn-icon'],
			attr: { 'disabled': true },
		});

		playAudioBtn.style.backgroundImage = 'url(../../assets/images/english_puzzle/audio.png)';

		this.tooltipsContainer.append(
			playAudioBtn,
			factory.create({
				elem: 'div',
				classes: 'tooltips__translate',
			})
		);
	}
}
