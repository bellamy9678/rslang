import DOMElementCreator from '../utils/DOMElementCreator';

const factory = new DOMElementCreator();

export default class Tooltips {
	init() {
		this.tooltipsContainer = document.querySelector('.tooltips');
		this.tooltipsContainer.append(
			factory.create({
				elem : 'button',
				classes : 'tooltips__play',
				attr : {'disabled' : true},
				child : 'Play_Icon'
			}),
			factory.create({
				elem : 'div',
				classes : 'tooltips__translate',
			})
		);
	}
}
