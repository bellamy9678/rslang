import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	CATEGORY_NAMES,
} from '../shared/Text';
import showWordsCategory from './CategoryView';
import {
	CATEGORIES,
} from '../shared/Constants';

function setActiveButton(event) {
	const buttons = document.querySelectorAll('.category__button');
	buttons.forEach(button => {
		if (button.classList.contains('category__button_active')) {
			button.classList.remove('category__button_active');
		}
	});
	event.target.classList.add('category__button_active');
}

function createDictionaryPage() {
	const newElem = new DOMElementCreator();

	const activeCategoryButton = newElem.create({
		elem: TAGS.BUTTON,
		id: 'active-words',
		classes: ['button', 'category__button', 'category__button_active', 'category__active'],
		child: [CATEGORY_NAMES.ACTIVE],
	});

	activeCategoryButton.addEventListener('click', event => {
		showWordsCategory(CATEGORIES.ACTIVE);
		setActiveButton(event);
	});

	const difficultCategoryButton = newElem.create({
		elem: TAGS.BUTTON,
		id: 'difficult-words',
		classes: ['button', 'category__button', 'category__difficult'],
		child: [CATEGORY_NAMES.DIFFICULT],
	});

	difficultCategoryButton.addEventListener('click', event => {
		showWordsCategory(CATEGORIES.DIFFICULT);
		setActiveButton(event);
	});

	const removedCategoryButton = newElem.create({
		elem: TAGS.BUTTON,
		id: 'removed-words',
		classes: ['button', 'category__button', 'category__removed'],
		child: [CATEGORY_NAMES.REMOVED],
	});

	removedCategoryButton.addEventListener('click', event => {
		showWordsCategory(CATEGORIES.REMOVED);
		setActiveButton(event);
	});

	const dictionaryButtons = newElem.create({
		elem: TAGS.DIV,
		classes: ['dictionary__buttons'],
		child: [activeCategoryButton, difficultCategoryButton, removedCategoryButton],
	});

	const category = newElem.create({
		elem: TAGS.DIV,
		classes: ['dictionary__category'],
	});

	const wrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['wrapper'],
		child: [dictionaryButtons, category],
	});

	return wrapper;
}

export default function showDictionaryPage() {
	const app = document.querySelector('.app');
	const dictionaryPage = createDictionaryPage();
	if (app.firstChild) {
		app.firstChild.remove();
	}
	showWordsCategory(CATEGORIES.ACTIVE);
	app.append(dictionaryPage);
}
