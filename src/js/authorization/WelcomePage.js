import DOMElementCreator from "../utils/DOMElementCreator";
import Tags from '../shared/Tags.json';

export default function showWelcomePage(username) {
	const app = document.querySelector(".app");
	const newElem = new DOMElementCreator();

	const settingsIcon = newElem.create({
		elem: Tags.span,
		classes: ["icon", "icon_settings"],
	});

	const settingsLinkText = newElem.create({
		elem: Tags.span,
		classes: "link-button__text",
		child: ["Go to settings"],
	});

	const settingsLink = newElem.create({
		elem: Tags.a,
		classes: "link-button",
		attr: [
			{
				href: "#",
			},
		],
		child: [settingsIcon, settingsLinkText],
	});

	const title = newElem.create({
		elem: Tags.h1,
		classes: "welcome__title",
		child: [`Hello, ${username}! Let's start?`],
	});

	const buttons = newElem.create({
		elem: Tags.div,
		classes: "welcome__buttons",
		child: [settingsLink],
	});

	const content = newElem.create({
		elem: Tags.div,
		classes: "welcome__content",
		child: [title, buttons],
	});

	const image = newElem.create({
		elem: Tags.img,
		classes: "welcome__image",
		attr: [
			{
				src: "./assets/images/welcome.svg",
			},
			{
				alt: "Settings",
			},
		],
	});

	const wrapper = newElem.create({
		elem: Tags.div,
		classes: ["wrapper", "welcome__wrapper"],
		child: [content, image],
	});

	const page = newElem.create({
		elem: Tags.div,
		classes: "welcome",
		child: [wrapper],
	});

	app.innerHTML = "";
	app.append(page);
}
