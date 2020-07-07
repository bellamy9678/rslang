export const DEFAULT_SETTINGS = {
	GROUPS_START: 0,
	GROUPS_END: 5,
	PAGES_START: 0,
	PAGES_END: 29,

	MIN_PROGRESS: 0,

	VERY_OLD_DATE: '01.01.2000 00:04',
	FIELD_USERNAME: 'RSLangUser',

	NEW_DAY_HOURS: 24,
	HOURS: 4,
	MINUTES: 0,
	SECONDS: 0,
	MILLISECONDS: 0,
};

const progressObj = {};
progressObj.group = 0;
progressObj.page = 0;

export const WORD_OBJECT_DEFAULT = {
	lastUpdateDate: 0,

	maxNewWords: 5,
	maxCards: 10,
	cardsShowed: 0,
	newWordsShowed: 0,

	progress: progressObj,

	translate: true,
	meaning: true,
	meaningTranslate : true,
	example: true,
	exampleTranslate : true,
	transcription: true,
	picture: true,
	showAnswerButton : true,
	deleteButton: true,
	difficultButton: true,
	complexityButtons: true,
	playWord: true,
	playMeaning: true,
	playExample: true,
	useLearnedWords: true,
};
