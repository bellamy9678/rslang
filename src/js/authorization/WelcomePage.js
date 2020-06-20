import DOMElementCreator from '../utils/DOMElementCreator';

export default function showWelcomePage(username) {
    const app = document.querySelector('.app');
    const newElem = new DOMElementCreator();

    const settingsIcon = newElem.create({
        elem: 'span',
        classes: ['icon', 'icon_settings'],
    });

    const settingsLinkText = newElem.create({
        elem: 'span',
        classes: 'link-button__text',
        child: ['Go to settings'],
    });

    const settingsLink = newElem.create({
        elem: 'a',
        classes: 'link-button',
        attr: [{
            href: '#'
        }],
        child: [settingsIcon, settingsLinkText],
    });

    const title = newElem.create({
        elem: 'h1',
        classes: 'welcome__title',
        child: [`Hello, ${username}! Let's start?`],
    });

    const buttons = newElem.create({
        elem: 'div',
        classes: 'welcome__buttons',
        child: [settingsLink],
    });

    const content = newElem.create({
        elem: 'div',
        classes: 'welcome__content',
        child: [title, buttons],
    });

    const image = newElem.create({
        elem: 'img',
        classes: 'welcome__image',
        attr: [{
            src: './assets/images/welcome.svg'
        }, {
            alt: 'Settings'
        }],
    });

    const wrapper = newElem.create({
        elem: 'div',
        classes: ['wrapper', 'welcome__wrapper'],
        child: [content, image],
    });

    const page = newElem.create({
        elem: 'div',
        classes: 'welcome',
        child: [wrapper],
    });
	app.firstChild.remove();
    app.append(page);
}