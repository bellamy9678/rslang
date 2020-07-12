import {
	DEFAULT_GROUP,
	DEFAULT_PAGE,
	INTERVAL_PARAMS,
	EMPTY_ARRAY_LENGTH,
	ARRAY_LENGTH_CORRECTION,
} from './constants';
import Settings from '../settings/Settings';
import APIMethods from './APIMethods';
import { CATEGORIES } from '../shared/Constants';

let settings;
async function initial() {
	settings = await Settings.getInstance();
}
initial();

const Service = {};

function getShuffledArray(array) {
	const output = array;
	for (
		let i = array.length - ARRAY_LENGTH_CORRECTION;
		i > EMPTY_ARRAY_LENGTH;
		i -= 1
	) {
		const randomIndex = Math.floor(
			Math.random() * (i + ARRAY_LENGTH_CORRECTION)
		);
		[output[i], output[randomIndex]] = [array[randomIndex], array[i]];
	}
	return output;
}

function sortByShowTime(array) {
	const sorted = array.sort((word) => {
		return new Date(word.optional.nextShowDate) <= new Date();
	});
	return sorted;
}

Service.getGameWords = async function getGameWords() {
	if (settings.useLearnedWords) {
		const listLearnedWords = await APIMethods.getUserWordsByCategory(
			CATEGORIES.ACTIVE
		);
		const listDifficultWords = await APIMethods.getUserWordsByCategory(
			CATEGORIES.DIFFICULT
		);
		const filteredLearnedWords = listLearnedWords.filter((word) => {
			return word.optional.progress === INTERVAL_PARAMS.MAX_PROGRESS_LEVEL;
		});
		const filteredDifficultWords = listDifficultWords.filter((word) => {
			return word.optional.progress === INTERVAL_PARAMS.MAX_PROGRESS_LEVEL;
		});
		const filtered = filteredLearnedWords.concat(filteredDifficultWords);
		return getShuffledArray(filtered);
	}
	const listOfNewWords = await Service.getGameSpecificWords(
		DEFAULT_GROUP,
		DEFAULT_PAGE
	);
	return listOfNewWords;
};

Service.getGameSpecificWords = async function getGameSpecificWords(
	level,
	round
) {
	const words = await APIMethods.getNewWordsArray(level, round);
	return getShuffledArray(words);
};

Service.getNewWords = async function getNewWords() {
	const words = await APIMethods.getNewWordsArray(
		settings.progress.group,
		settings.progress.page
	);
	settings.incProgress();
	settings.saveParameters();
	APIMethods.saveWordsArray(words);
	return getShuffledArray(words);
};

Service.getRandomWords = async function getRandomWords() {
	const totalCards = settings.cardsToShowAmount();
	if (totalCards === EMPTY_ARRAY_LENGTH) return [];

	let hiddenWords = await APIMethods.getUserWordsByCategory(CATEGORIES.NEW);

	if (hiddenWords.length < totalCards) {
		const newWords = await Service.getNewWords();
		hiddenWords = hiddenWords.concat(newWords);
	}
	const repeatedWords = await Service.getRepeatedWords();

	const amountRepeatedWords = repeatedWords.length;
	const amountNewWords = settings.newWordsToShowAmount();

	const output = hiddenWords
		.slice(null, amountNewWords)
		.concat(repeatedWords.slice(null, amountRepeatedWords));

	if (output.length > totalCards) {
		output.length = totalCards;
	}
	return getShuffledArray(output);
};

Service.getRepeatedWords = async function getRepeatedWords() {
	const userWords = await APIMethods.getUserWordsByCategory(CATEGORIES.ACTIVE);
	const totalCards =
		settings.cardsToShowAmount() >= userWords.length
			? userWords.length
			: settings.cardsToShowAmount();
	if (userWords.length > EMPTY_ARRAY_LENGTH) {
		const repeatedWords = sortByShowTime(userWords);
		return repeatedWords.slice(null, totalCards);
	}
	return [];
};

Service.getDifficultWords = async function getDifficultWords() {
	const userWords = await APIMethods.getUserWordsByCategory(
		CATEGORIES.DIFFICULT
	);

	const totalCards =
		settings.cardsToShowAmount() >= userWords.length
			? userWords.length
			: settings.cardsToShowAmount();
	if (userWords.length > EMPTY_ARRAY_LENGTH) {
		const repeatedWords = sortByShowTime(userWords);
		return repeatedWords.slice(null, totalCards);
	}
	return [];
};

export default Service;
