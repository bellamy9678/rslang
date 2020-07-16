import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import {
	TEXT
} from '../shared/Text';

const fab = new DOMElementCreator();

export default class Promo {
	makeContainer() {
		const wrapper = fab.create({
			elem: TAGS.DIV,
			classes: ['wrapper'],
		});
		this.container = wrapper;
	}

	static getOptions() {
		const arrOptions = TEXT.promo.description__options.map((youCanText) => {
			const text = fab.create({
				elem: TAGS.P,
				child: youCanText,
			});
			return text;
		});
		return arrOptions;
	}

	static getOptionsImages() {
		const arrOptions = TEXT.promo.description__img.map((youCanImg) => {
			const img = fab.create({
				elem: TAGS.IMG,
				classes: youCanImg,
				attr: [{
					src: `./assets/images/promo/${youCanImg}.svg`,
				},
				{
					alt: youCanImg,
				},
				],
			});
			return img;
		});
		return arrOptions;
	}

	createHeader() {
		const header = fab.create({
			elem: TAGS.H1,
			classes: 'promo__text',
			child: TEXT.promo.header,
		});

		const img = fab.create({
			elem: TAGS.IMG,
			classes: 'promo__img',
			attr: [{
				src: './assets/images/promo/blogging.svg',
			},
			{
				alt: 'blogging',
			},
			],
		});

		const section = fab.create({
			elem: TAGS.SECTION,
			classes: 'promo__header',
			child: [header, img],
		});

		this.container.append(section);
	}

	createDescription() {
		const header = fab.create({
			elem: TAGS.H2,
			classes: 'description__header',
			child: TEXT.promo.description__header,
		});

		const optionsText = Promo.getOptions();
		const optionsImg = Promo.getOptionsImages();

		const elements = [];
		optionsText.forEach((text, index) => {
			elements.push(text);
			elements.push(optionsImg[index]);
		});

		const section = fab.create({
			elem: TAGS.SECTION,
			classes: 'promo__description',
			child: [header, ...elements],
		});

		this.container.append(section);
	}

	createVideo() {
		const header = fab.create({
			elem: TAGS.H2,
			classes: 'video__header',
			child: TEXT.promo.video.header,
		});

		const frame = fab.create({
			elem: TAGS.IFRAME,
			classes: 'video__frame',
			attr: [{
				src: `${TEXT.promo.video.youtube}${TEXT.promo.video.hash}`,
			},
			{
				allow: TEXT.promo.video.allow,
			},
			{
				frameborder: 0,
			},
			{
				allowfullscreen: true,
			},
			],
		});

		const section = fab.create({
			elem: TAGS.SECTION,
			classes: 'video',
			child: [header, frame],
		});

		this.container.append(section);
	}

	createGitHubLink() {
		const linkDescription = fab.create({
			elem: TAGS.SPAN,
			classes: ['promo__link-description'],
			child: TEXT.promo.github.descriotin,
		});

		const link = fab.create({
			elem: TAGS.A,
			classes: ['promo__link'],
			attr: [{
				href: TEXT.promo.github.link,
			}],
			child: TEXT.promo.github.link,
		});

		const linkContainer = fab.create({
			elem: TAGS.DIV,
			classes: ['promo__link-container'],
			child: [linkDescription, link],
		});

		this.container.append(linkContainer);
	}

	static getRules() {
		const rules = TEXT.promo.interval.rules.map((rule) => {
			const ruleElem = fab.create({
				elem: TAGS.P,
				child: rule,
			});
			return ruleElem;
		});
		return rules;
	}

	createRules() {
		const header = fab.create({
			elem: TAGS.H2,
			classes: 'interval-rules__header',
			child: TEXT.promo.interval.header,
		});

		const rules = Promo.getRules();

		const section = fab.create({
			elem: TAGS.SECTION,
			classes: 'interval-rules',
			child: [header, ...rules],
		});

		this.container.append(section);
	}

	draw() {
		this.makeContainer();
		this.createHeader();
		this.createDescription();
		this.createVideo();
		this.createGitHubLink();
		this.createRules();
		return this.container;
	}
}
