export const ARRAY_LENGTH_INDEX_CORRECTION = 1;
export const FIRST_ELEMENT_INDEX = 0;
export const TOTAL_WORDS_PERCENT = 36; // = 3600 / 100

export const RESULT_MULTIPLIER = {
	CORRECT : 10,
	INCORRECT : 5,
};

export const CHART_OPTIONS = {
	COLOR : 'rgba(82, 34, 208, 0.3)',
	MIN_WORDS : 0,
	MAX_WORDS : 3600,
	MIN_Y : 0,
	MAX_Y : 100,
	FONT_SIZE : 16,
};

export const GAMES_NAMES = {
	PUZZLE: 'English Puzzle',
	SPEAK: 'Speak It',
	SAVANNAH: 'Savannah',
	AUDIO: 'Audio Challenge',
	SPRINT: 'Sprint',
	OUR: 'Super duper game',
};

export const TEXT_STATISTICS = {
	DATE: 'date',
	NUMBER: '',
	RESULT: 'result',
};

export const CHART_SETTINGS = {
	WIDTH: 500,
	HEIGHT: 400,
};

export const INITIAL_STATISTICS = {
	statistics: {
		datesArr: [`${new Date()}`],
		dataArr: ['0'],
		labelsArr: ['0'],
	},
	games: [
		{
			name: GAMES_NAMES.AUDIO,
			data: [],
		},
		{
			name: GAMES_NAMES.OUR,
			data: [],
		},
		{
			name: GAMES_NAMES.PUZZLE,
			data: [],
		},
		{
			name: GAMES_NAMES.SAVANNAH,
			data: [],
		},
		{
			name: GAMES_NAMES.SPEAK,
			data: [],
		},
		{
			name: GAMES_NAMES.SPRINT,
			data: [],
		},
	],
};
