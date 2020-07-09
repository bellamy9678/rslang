import WORDS_EVENTS from '../observer/WordsEvents';
import IntervalRepetition from '../words_service/IntervalRepetition';
import {
	CATEGORIES,
} from '../shared/Constants';
import Observer from '../observer/Observer';

async function changeWordParams(event) {
	const wordData = new IntervalRepetition(event.detail);
	switch (event.type) {
	case WORDS_EVENTS.PUSHED_AGAIN:
	case WORDS_EVENTS.PUSHED_EASY:
	case WORDS_EVENTS.PUSHED_GOOD:
	case WORDS_EVENTS.PUSHED_HARD:
		await wordData.setDateParams(event);
		await wordData.countBestResult();
		await wordData.increaseProgress();
		// update settings
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
		// update settings
		break;
	case WORDS_EVENTS.CORRECT_ANSWER:
		await wordData.setDateParams(event);
		await wordData.increaseProgress();
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
		break;
	default:
		throw new Error('Event with this name is not found');
	}
}

export default function subscribeToEvents() {
	const observer = new Observer();
	const eventsList = [
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

	eventsList.forEach(event => {
		observer.subscribe(event, () => {
			new Promise(resolve => {
				resolve(event);
			})
				.then(() => changeWordParams(event));
		});
	});
}