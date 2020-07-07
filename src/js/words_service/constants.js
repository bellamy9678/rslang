export const WORDS_MINIMUM_AMOUNT = 10;
export const PART_OF_NEW_WORDS_IN_TOTAL = 0.5;
export const DEFAULT_GROUP = 0;
export const DEFAULT_PAGE = 0;

export const INTERVAL_PARAMS = {
	MAX_PROGRESS_LEVEL: 4,
	MIN_PROGRESS_LEVEL: 0,
};

export const DEFAULT_SETTINGS = {
	progress: {
		group: 0,
		page: 0,
	},

	useLearnedWords: true,

	incProgress: function incProgress() {
		this.progress.page += 1;
		console.log("don't call me to many times");
	},

	saveParameters: function saveParameters() {
		console.log('saveParameters()');
	},
};

export const PROGRESS = {
	MAX: 4,
	MIN: 0,
};

export const OFFSET_DATE_COEFFICIENT = {
	AGAIN: 0,
	EASY: 1.3,
	GOOD: 1,
	HARD: 0.8,
}
