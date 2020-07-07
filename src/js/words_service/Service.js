import { DEFAULT_GROUP, DEFAULT_PAGE, INTERVAL_PARAMS } from './constants';
import Settings from '../settings/Settings';
import APIMethods from './APIMethods';
import { CATEGORIES } from '../shared/Constants';

let settings;

async function initial() {
	const settingsObj = await new Settings();
	settings = settingsObj;
}

initial();

const Service = {};

function getShuffledArray(array) {
	const output = array;
	for (let i = array.length - 1; i > 0; i -= 1) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[output[i], output[randomIndex]] = [array[randomIndex], array[i]];
	}
	return output;
}

function sortByShowTime(array) {
	const filtered = array.filter((word) => {
		return new Date(word.optional.learnDate) <= new Date();
	});
	return filtered;
}

Service.getGameWords = async function getGameWords() {
	if (settings.useLearnedWords) {
		const listLearnedWords = await APIMethods.getUserWordsByCategory(
			CATEGORIES.ACTIVE
		);
		const filtered = listLearnedWords.filter((word) => {
			return word.optional.progress === INTERVAL_PARAMS.MAX_PROGRESS_LEVEL;
		});
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
	const total = settings.cardsToShowAmount();
	if (total === 0) return [];

	let hiddenWords = await APIMethods.getUserWordsByCategory(CATEGORIES.NEW);
	if (hiddenWords.length < total) {
		const newWords = await Service.getNewWords();
		hiddenWords = hiddenWords.concat(newWords);
	}
	const repeatedWords = await Service.getRepeatedWords();

	const amountRepeatedWords = repeatedWords.length;
	const amountNewWords = settings.newWordsToShowAmount();

	const output = hiddenWords
		.slice(null, amountNewWords)
		.concat(repeatedWords.slice(null, amountRepeatedWords));

	if (output.length > total) {
		output.length = total;
	}
	return getShuffledArray(output);
};

Service.getRepeatedWords = async function getRepeatedWords() {
	const userWords = await APIMethods.getUserWordsByCategory(CATEGORIES.ACTIVE);
	const total =
		settings.cardsToShowAmount() >= userWords.length
			? userWords.length
			: settings.cardsToShowAmount();
	if (userWords.length > 0) {
		const repeatedWords = sortByShowTime(userWords);
		return repeatedWords.slice(null, total);
	}
	return [];
};

Service.getDifficultWords = async function getDifficultWords() {
	const userWords = await APIMethods.getUserWordsByCategory(
		CATEGORIES.DIFFICULT
	);
	const total =
		settings.cardsToShowAmount() >= userWords.length
			? userWords.length
			: settings.cardsToShowAmount();
	if (userWords.length > 0) {
		const repeatedWords = sortByShowTime(userWords);
		return repeatedWords.slice(null, total);
	}
	return [];
};

export default Service;
