
import {
	DEFAULT_SETTINGS,
	WORDS_MINIMUM_AMOUNT,
	PART_OF_NEW_WORDS_IN_TOTAL,
} from './constants';
import getNewWordsArray from '../cards/GetWordsFromAPI';

const settings = DEFAULT_SETTINGS; // new SINGLETON_SETTINGS();

const Service = {};

// 	getDifficultWordsDictionary() - получить из словаря сложные слова и возвращаем количество слов === settings.maxCards - settings.cardsShowed
// 	getRepeatedWordsDictionary() - получить из словаря слова для повторения и возвращаем количество слов === settings.maxCards - settings.cardsShowed
// 	SortByDate(wordsObjectsArray) - если у словаря этого нет и прилетит список всех слов каждой категории (сложные, для повтора и т.д.)

Service.getGameWords = async function getGameWords() {
	if (settings.useLearnedWords) {
		const listLearnedWords = await []; // взять слова со школы, которые выученные
		if (listLearnedWords.length > WORDS_MINIMUM_AMOUNT) {
			return listLearnedWords;
		}
	}
	const listOfNewWords = await Service.getNewWords();
	return listOfNewWords;
};

Service.getGameSpecificWords = async function getGameSpecificWords(
	level,
	round
) {
	const words = await getNewWordsArray(level, round);
	return words;
};

Service.getNewWords = async function getNewWords() {
	const total = settings.newWordsToShowAmount();
	const userWords = await []; // получить слова юзера которые в хидден
	if (userWords.length >= total) {
		userWords.length = total;
		return userWords;
	}

	const words = await getNewWordsArray(settings.group, settings.page);
	settings.incProgress();
	settings.saveParameters();
	// сохранить все новые слова в словаре
	return words;
};

Service.getRandomWords = async function getRandomWords() {
	const total = settings.cardsToShowAmount();
	if (total === 0) return [];

	// получить слова юзера которые в хидден
	const newWords = await Service.getNewWords();
	const repeatedWords = await Service.getRepeatedWords();

	const amountRepeatedWords = Math.round(total * PART_OF_NEW_WORDS_IN_TOTAL);
	const amountNewWords = total - amountRepeatedWords;

	const output = [];
	for (let i = 0; i < amountRepeatedWords; i += 1) {
		output.push(repeatedWords[i]);
	}
	for (let i = 0; i < amountNewWords; i += 1) {
		output.push(newWords[i]);
	}

	return output.getShuffledArray();
};

Service.getRepeatedWords = async function getRepeatedWords() {
	const userWords = await []; // получить слова из апи Repeated
	const total =
		settings.cardsToShowAmount() >= userWords.length
			? userWords.length
			: settings.cardsToShowAmount();
	const repeatedWords = [];
	userWords.sortByShowTime();
	for (let i = 0; i < total; i += 1) {
		repeatedWords.push(userWords[i]);
	}
	return repeatedWords;
};

Service.getDifficultWords = async function getDifficultWords() {
	const userWords = await []; // получить слова из апи Difficult
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
