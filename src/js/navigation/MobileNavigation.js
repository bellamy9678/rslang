const hamburger = document.getElementById('hamburger');

function createMobileNavigation() {
	const nav = document.querySelector('.header__navigation');
	const mobileNav = nav.cloneNode(true);
	mobileNav.classList.add('mobile-navigation');
	mobileNav.classList.remove('header__navigation');
	nav.classList.add('none');
	console.log(mobileNav);
	return mobileNav;
}

function setDTNavigation() {
	const DTNav = document.querySelector('.header__navigation.none');
	DTNav.classList.remove('none');
	hamburger.classList.add('none');
	if (document.querySelector('.mobile-navigation')) {
		const mobileNav = document.querySelector('.mobile-navigation');
		mobileNav.remove();
	}
}

function setMobileNavigation() {
	const mobileNav = createMobileNavigation();
	hamburger.classList.remove('none');
	hamburger.addEventListener('click', () => {
		if (mobileNav) {
			document.body.append(mobileNav);
		}
	});
}

export default function setAdaptiveNavigation() {
	if (window.innerWidth <= 768) {
		setMobileNavigation();
	} else {
		setDTNavigation();
	}
}

// window.addEventListener('load', setAdaptiveNavigation);

// window.addEventListener('resize', setAdaptiveNavigation);
