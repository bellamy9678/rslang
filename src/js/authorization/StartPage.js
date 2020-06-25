import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';

export default function showWelcomePage() {
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();

	const title = newElem.create({
		elem: TAGS.H1,
		classes: 'start-page__title',
		child: ['Upgrate your english with us!'],
	});

	const text = newElem.create({
		elem: TAGS.P,
		classes: 'start-page__text',
		child: ['Dolore ea elit do Lorem aliquip. Do sint laboris Lorem quis incididunt non velit. Aute adipisicing quis et elit.'],
	});

	const content = newElem.create({
		elem: TAGS.DIV,
		classes: 'start-page__content',
		child: [title, text],
	});

	const image = newElem.create({
		elem: TAGS.IMG,
		classes: 'start-page__image',
		attr: [{
			src: './assets/images/growth.svg'
		}, {
			alt: 'Settings'
		}],
	});

	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['wrapper', 'start-page__wrapper'],
		child: [content, image],
	});

	const page = newElem.create({
		elem: TAGS.DIV,
		classes: 'welcome',
		child: [wrapper],
	});

	if (app.firstChild) {
		app.firstChild.remove();
	}
	app.append(page);
}
