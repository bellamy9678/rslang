import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';

const mobileResolution = 768;
const animationDuration = 500;
const nav = document.querySelector('.header__navigation');
const hamburger = document.getElementById('hamburger');

function hideMobileNavigation() {
	hamburger.classList.remove('rotate-element');
	nav.classList.add('hide-mobile-menu');
	setTimeout(() => {
		nav.classList.remove('mobile-navigation');
		const overlay = document.querySelector('.overlay');
		overlay.remove();
		document.body.style.overflow = 'visible';
		nav.classList.remove('hide-mobile-menu');
	}, animationDuration);
}

function showMobileNavigation() {
	nav.classList.add('mobile-navigation');
	const newElem = new DOMElementCreator();
	const overlay = newElem.create({
		elem: TAGS.DIV,
		classes: ['overlay'],
	});
	overlay.addEventListener('click', () => {
		hideMobileNavigation();
	});
	document.body.append(overlay);
	document.body.style.overflow = 'hidden';
}

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('rotate-element');
	if (nav.classList.contains('mobile-navigation')) {
		hideMobileNavigation();
	} else {
		showMobileNavigation();
		document.querySelectorAll('.navigation__link').forEach(link => {
			link.addEventListener('click', hideMobileNavigation);
		});
	}
});

function setDTNavigation() {
	nav.classList.remove('mobile-navigation', 'hide-mobile-menu', 'none');
	const overlay = document.querySelector('.overlay');
	if (overlay) {
		overlay.remove();
		document.body.style.overflow = 'visible';
	}
	if (hamburger.classList.contains('rotate-element')) {
		hamburger.classList.remove('rotate-element');
	}
}

function setAdaptiveNavigation() {
	if (window.innerWidth > mobileResolution) {
		setDTNavigation();
	}
}

window.addEventListener('resize', setAdaptiveNavigation);

function removeActiveLink() {
	const links = document.querySelectorAll('.navigation__link');
	console.log(links);
	links.forEach(link => {
		if (link.classList.contains('navigation__link_active')) {
			link.classList.remove('navigation__link_active');
		}
	});
}

nav.addEventListener('click', event => {
	if (event.target.classList.contains('navigation__link')) {
		removeActiveLink();
		event.target.classList.add('navigation__link_active');
	}
});

export {
	setAdaptiveNavigation,
	removeActiveLink
};
