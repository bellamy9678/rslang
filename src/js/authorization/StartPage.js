import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	TEXT
} from '../shared/Text';

export default function showStartPage() {
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();

	const title = newElem.create({
		elem: TAGS.H1,
		classes: 'start-page__title',
		child: TEXT.startPage.title,
	});

	const text = newElem.create({
		elem: TAGS.P,
		classes: 'start-page__text',
		child: TEXT.startPage.text,
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
