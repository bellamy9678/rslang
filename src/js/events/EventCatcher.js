import WORDS_EVENTS from '../observer/WordsEvents';
import IntervalRepetition from '../words_service/IntervalRepetition';
import {
	CATEGORIES,
} from '../shared/Constants';
import eventObserver from '../observer/Observer';
import showWordsCategory from '../dictionary/CategoryView';
import Settings from '../settings/Settings';

async function changeWordParams(event) {
	const wordData = new IntervalRepetition(event.detail);
	const settings = await Settings.getInstance();

	switch (event.type) {
	case WORDS_EVENTS.PUSHED_AGAIN:
	case WORDS_EVENTS.PUSHED_EASY:
	case WORDS_EVENTS.PUSHED_GOOD:
	case WORDS_EVENTS.PUSHED_HARD:
		if (wordData.optional.category === CATEGORIES.NEW) {
			await wordData.changeWordCategory(CATEGORIES.ACTIVE);
			await settings.incNewWordsShowed();
		}
		await settings.incCardsShowed();
		await wordData.setDateParams(event);
		await wordData.countBestResult();
		await wordData.increaseProgress();
		break;
	case WORDS_EVENTS.PUSHED_REMOVE_FROM_DICTIONARY:
		await wordData.changeWordCategory(CATEGORIES.REMOVED);
		break;
	case WORDS_EVENTS.PUSHED_ADD_TO_DIFFICULT:
		await wordData.changeWordCategory(CATEGORIES.DIFFICULT);
		break;
	case WORDS_EVENTS.PUSHED_SHOW_ANSWER_BUTTON:
		await wordData.setDateParams(event);
		await wordData.resetBestResult();
		await wordData.decreaseProgress();
		if (wordData.optional.category === CATEGORIES.NEW) {
			await wordData.changeWordCategory(CATEGORIES.ACTIVE);
			await settings.incNewWordsShowed();
		}
		await settings.incCardsShowed();
		break;
	case WORDS_EVENTS.CORRECT_ANSWER:
		if (wordData.optional.category === CATEGORIES.NEW) {
			await wordData.changeWordCategory(CATEGORIES.ACTIVE);
			settings.incNewWordsShowed();
		}
		await wordData.setDateParams(event);
		await wordData.countBestResult();
		await wordData.increaseProgress();
		await settings.incCardsShowed();
		break;
	case WORDS_EVENTS.INCORRECT_ANSWER:
		await wordData.setDateParams(event);
		await wordData.resetBestResult();
		await wordData.decreaseProgress();
		break;
	case WORDS_EVENTS.TRAINING_GAME_OVER:
	case WORDS_EVENTS.PUSHED_CONTINUE:
		break;
	case WORDS_EVENTS.RECOVER_WORD:
		await wordData.changeWordCategory(CATEGORIES.ACTIVE);
		showWordsCategory(wordData.optional.category);
		break;
	default:
		throw new Error('Event with this name is not found');
	}
	await wordData.countShowNumber();
}

export default function subscribeToEvents() {
	const eventList = [
		WORDS_EVENTS.PUSHED_AGAIN,
		WORDS_EVENTS.PUSHED_EASY,
		WORDS_EVENTS.PUSHED_GOOD,
		WORDS_EVENTS.PUSHED_HARD,
		WORDS_EVENTS.PUSHED_REMOVE_FROM_DICTIONARY,
		WORDS_EVENTS.PUSHED_ADD_TO_DIFFICULT,
		WORDS_EVENTS.PUSHED_SHOW_ANSWER_BUTTON,
		WORDS_EVENTS.CORRECT_ANSWER,
		WORDS_EVENTS.INCORRECT_ANSWER,
		WORDS_EVENTS.TRAINING_GAME_OVER,
		WORDS_EVENTS.PUSHED_CONTINUE,
		WORDS_EVENTS.RECOVER_WORD,
	];

	eventList.forEach(eventName => {
		eventObserver.subscribe(eventName, (event) => {
			new Promise(resolve => {
				resolve(eventName);
			})
				.then(() => changeWordParams(event));
		});
	});
}
