const words = [
	{
		word: 'Cat',
		wordTranslate: 'Кот',
		audio: '../assets/sounds/cat.mp3',
		image: ''
	},
	{
		word: 'Dog',
		wordTranslate: 'Собака',
		audio: '../assets/sounds/dog.mp3',
		image: ''
	},
	{
		word: 'Pig',
		wordTranslate: 'Свинья',
		audio: '../assets/sounds/pig.mp3',
		image: ''
	},
	{
		word: 'Mop',
		wordTranslate: 'Швабра',
		audio: '../assets/sounds/mop.mp3',
		image: ''
	},
	{
		word: 'Window',
		wordTranslate: 'Окно',
		audio: '../assets/sounds/window.mp3',
		image: ''
	},
	{
		word: 'Brother',
		wordTranslate: 'Брат',
		audio: '../assets/sounds/brother.mp3',
		image: ''
	},
	{
		word: 'Spoon',
		wordTranslate: 'Ложка',
		audio: '../assets/sounds/spoon.mp3',
		image: ''
	},
	{
		word: 'Khife',
		wordTranslate: 'Нож',
		audio: '../assets/sounds/knife.mp3',
		image: ''
	}
];
const idkText = 'НЕ ЗНАЮ';
const skipText = '\u2192';
const arrayForUniqness = [];
const arrayForRandom = [];
const arrayWithWrongAnswers = [];
const arrayWithRightAnswers = [];
const wordNumber = 10;
const POSITION_OF_NUMBER = 5;
const WORD_BEGGINING = 0;
const WORD_ENDING = 5;
const VALUE_OF_KEYS = 5;
const NUMBER_OF_WRONG_ANSWERS = 4;
const LEFT_MARGIN_OF_ANSWERED_QUESTION = '-2000px';
const LEFT_MARGIN_OF_NEW_QUESTION = '0px';

export {LEFT_MARGIN_OF_ANSWERED_QUESTION, LEFT_MARGIN_OF_NEW_QUESTION, POSITION_OF_NUMBER, WORD_BEGGINING, WORD_ENDING, VALUE_OF_KEYS, NUMBER_OF_WRONG_ANSWERS, words, idkText, skipText, arrayForUniqness, arrayForRandom, arrayWithWrongAnswers, arrayWithRightAnswers, wordNumber};
