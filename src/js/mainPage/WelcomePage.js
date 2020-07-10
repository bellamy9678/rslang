import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	LINKS,
	TEXT
} from '../shared/Text';
import training from '../cards/Training';

export default function createWelcomePage(username) {
	const newElem = new DOMElementCreator();

	const settingsIcon = newElem.create({
		elem: TAGS.SPAN,
		classes: ['icon', 'icon_settings'],
	});

	const settingsLinkText = newElem.create({
		elem: TAGS.SPAN,
		classes: 'link-button__text',
		child: LINKS.goToSettings,
	});

	const settingsLink = newElem.create({
		elem: TAGS.A,
		classes: 'welcome__link-button',
		attr: [{
			href: '#',
		}, ],
		child: [settingsIcon, settingsLinkText],
	});

	const trainingModeButton = newElem.create({
		elem: TAGS.BUTTON,
		classes: ['button', 'button_colored-add'],
		id: 'button_training-mode',
		child: [TEXT.welcomePage.trainingModeButton],
	});

	trainingModeButton.addEventListener('click', async () => {
		await training();
	});

	const title = newElem.create({
		elem: TAGS.h1,
		classes: 'welcome__title',
		child: [TEXT.welcomePage.title.leftPath, username, TEXT.welcomePage.title.rightPath],
	});

	const buttons = newElem.create({
		elem: TAGS.DIV,
		classes: 'welcome__buttons',
		child: [settingsLink, trainingModeButton],
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

	const welcomeWrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['welcome__wrapper'],
		child: [content, image],
	});

	return welcomeWrapper;
}
