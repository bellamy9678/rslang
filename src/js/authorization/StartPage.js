import DOMElementCreator from '../utils/DOMElementCreator';

(function showWelcomePage() {
	const app = document.querySelector('.app');
	const newElem = new DOMElementCreator();

	const title = newElem.create({
		elem: 'h1',
		classes: 'start-page__title',
		child: [`Upgrate your english with us!`],
	});

	const text = newElem.create({
		elem: 'p',
		classes: 'start-page__text',
		child: [`Dolore ea elit do Lorem aliquip. Do sint laboris Lorem quis incididunt non velit. Aute adipisicing quis et elit.`],
	});

	const content = newElem.create({
		elem: 'div',
		classes: 'start-page__content',
		child: [title, text],
	});

	const image = newElem.create({
		elem: 'img',
		classes: 'start-page__image',
		attr: [{
			src: './assets/images/growth.svg'
		}, {
			alt: 'Settings'
		}],
	});

	const wrapper = newElem.create({
		elem: 'div',
		classes: ['wrapper', 'start-page__wrapper'],
		child: [content, image],
	});

	const page = newElem.create({
		elem: 'div',
		classes: 'welcome',
		child: [wrapper],
	});

	app.innerHTML = '';
	app.append(page);
})();
