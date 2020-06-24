import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	createUserNavigation,
	createUserButtons
} from './UserHeader';

export default function showWelcomePage(username) {
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();

	const settingsIcon = newElem.create({
		elem: TAGS.SPAN,
		classes: ['icon', 'icon_settings'],
	});

	const settingsLinkText = newElem.create({
		elem: TAGS.SPAN,
		classes: 'link-button__text',
		child: ['Go to settings'],
	});

	const settingsLink = newElem.create({
		elem: TAGS.A,
		classes: 'link-button',
		attr: [{
			href: '#',
		}, ],
		child: [settingsIcon, settingsLinkText],
	});

	const title = newElem.create({
		elem: TAGS.h1,
		classes: 'welcome__title',
		child: [`Hello, ${username}! Let's start?`],
	});

	const buttons = newElem.create({
		elem: TAGS.DIV,
		classes: 'welcome__buttons',
		child: [settingsLink],
	});

	const content = newElem.create({
		elem: TAGS.DIV,
		classes: 'welcome__content',
		child: [title, buttons],
	});

	const image = newElem.create({
		elem: TAGS.IMG,
		classes: 'welcome__image',
		attr: [{
			src: './assets/images/welcome.svg',
		},
		{
			alt: 'Settings',
		},
		],
	});

	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['wrapper', 'welcome__wrapper'],
		child: [content, image],
	});

	const page = newElem.create({
		elem: TAGS.DIV,
		classes: 'welcome',
		child: [wrapper],
	});

	app.firstChild.remove();
	app.append(page);
	createUserNavigation();
	createUserButtons(username);
}
