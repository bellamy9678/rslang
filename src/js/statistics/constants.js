export const ARRAY_LENGTH_INDEX_CORRECTION = 1;

export const TEXT_STATISTICS = {
	DATE: 'date',
	NUMBER: '',
	RESULT: 'result',
};

export const MOCA = {
	statistics: {},
	games: [
		{
			name: 'english Puzzle1',
			data: [
				{ date: new Date(2), result: 1 },
				{ date: new Date(2), result: 11 },
				{ date: new Date(2), result: 111 },
				{ date: new Date(2), result: 1111 },
			],
		},
		{
			name: 'english Puzzle2',
			data: [
				{ date: new Date(3), result: 22 },
				{ date: new Date(5), result: 222 },
			],
		},
		{
			name: 'english Puzzle3',
			data: [
				{ date: new Date(4), result: 333 },
				{ date: new Date(4), result: 3333 },
				{ date: new Date(4), result: 33333 },
			],
		},
		{ name: 'english Puzzle4', data: [] },
		{
			name: 'english Puzzle5',
			data: [
				{ date: new Date(6), result: 55555 },
				{ date: new Date(6), result: 555 },
			],
		},
	],
};
