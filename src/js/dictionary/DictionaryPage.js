import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	CATEGORY_NAMES,
} from '../shared/Text';
import showWordsCategory from './CategoryView';
import {
	CATEGORIES,
} from '../shared/Constants';

function createDictionaryPage() {
	const newElem = new DOMElementCreator();

	const activeCategoryButton = newElem.create({
		elem: TAGS.BUTTON,
		id: 'active-words',
		classes: ['category__active'],
		child: [CATEGORY_NAMES.ACTIVE],
	});

	activeCategoryButton.addEventListener('click', () => {
		showWordsCategory(CATEGORIES.ACTIVE);
	});

	const difficultCategoryButton = newElem.create({
		elem: TAGS.BUTTON,
		id: 'difficult-words',
		classes: ['category__difficult'],
		child: [CATEGORY_NAMES.DIFFICULT],
	});

	difficultCategoryButton.addEventListener('click', () => {
		showWordsCategory(CATEGORIES.DIFFICULT);
	});

	const removedCategoryButton = newElem.create({
		elem: TAGS.BUTTON,
		id: 'removed-words',
		classes: ['category__difficult'],
		child: [CATEGORY_NAMES.REMOVED],
	});

	removedCategoryButton.addEventListener('click', () => {
		showWordsCategory(CATEGORIES.REMOVED);
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
