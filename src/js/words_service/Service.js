import {
	PART_OF_NEW_WORDS_IN_TOTAL,
	DEFAULT_GROUP,
	DEFAULT_PAGE,
	INTERVAL_PARAMS,
} from './constants';
import Settings from '../userSettings/Settings';
import APIMethods from './APIMethods';
import { CATEGORIES } from '../shared/Constants';

const settings = new Settings();
const api = new APIMethods();

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
		const listLearnedWords = await api.getUserWordsByCategory(
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
	const words = await api.getNewWordsArray(level, round);
	return getShuffledArray(words);
};

Service.getNewWords = async function getNewWords() {
	const total = settings.newWordsToShowAmount();
	const userWords = await api.getUserWordsByCategory(CATEGORIES.NEW);
	if (userWords.length >= total) {
		userWords.length = total;
		return userWords;
	}
	const words = await api.getNewWordsArray(settings.group, settings.page);
	settings.incProgress();
	settings.saveParameters();
	api.saveWordsArray(words);
	return getShuffledArray(words);
};

Service.getRandomWords = async function getRandomWords() {
	const total = settings.cardsToShowAmount();
	if (total === 0) return [];

	const hiddenWords = await api.getUserWordsByCategory(CATEGORIES.NEW);
	if (hiddenWords.length < total) {
		const newWords = await Service.getNewWords();
		hiddenWords.concat(newWords);
	}
	const repeatedWords = await Service.getRepeatedWords();
	const amountRepeatedWords = Math.round(total * PART_OF_NEW_WORDS_IN_TOTAL);
	const amountNewWords = total - amountRepeatedWords;

	const output = repeatedWords
		.slice(null, amountRepeatedWords)
		.concat(hiddenWords.slice(null, amountNewWords));
	return getShuffledArray(output);
};

Service.getRepeatedWords = async function getRepeatedWords() {
	const userWords = await api.getUserWordsByCategory(CATEGORIES.NEW);
	const total =
		settings.cardsToShowAmount() >= userWords.length
			? userWords.length
			: settings.cardsToShowAmount();
	const repeatedWords = sortByShowTime(userWords);
	return repeatedWords.slice(null, total);
};

Service.getDifficultWords = async function getDifficultWords() {
	const userWords = await api.getUserWordsByCategory(CATEGORIES.DIFFICULT);
	const total =
		settings.cardsToShowAmount() >= userWords.length
			? userWords.length
			: settings.cardsToShowAmount();
	const difficultWords = [];
	userWords.sortByShowTime();
	for (let i = 0; i < total; i += 1) {
		difficultWords.push(userWords[i]);
	}
	return difficultWords;
};

export default Service;
