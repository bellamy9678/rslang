/* eslint-disable camelcase */
const BTN_TEXT_WRONG = 'Неверно';
const BTN_TEXT_CORRECT = 'Верно';
const CONTINUE_BTN_TEXT = 'Новая игра';
const EXIT_BTN_TEXT = 'На главную';
const POINTS_FOR_ANSWER_TEXT = 'очков за слово';
const APP_CONTAINER = document.querySelector('.app');
const MAIN_SHADOW_WRONG = 'inset 0 0 2px 2px red';
const MAIN_SHADOW_RIGHT = 'inset 0 0 2px 2px green';
const MAIN_SHADOW_DEFAUlT = '0 3px 6px 0 rgba(0,0,0,.08), 0 0.5px 1.5px 0 rgba(0,0,0,.12)';
const CHANCE = 0.5;
const CORRECT_AUDIO = new Audio('https://raw.githubusercontent.com/garza0/rslang-data/master/correct.mp3');
const WRONG_AUDIO = new Audio('https://raw.githubusercontent.com/garza0/rslang-data/master/wrong.mp3');
const LEVEL_YELLOW = '#FFD967';
const LEVEL_BRONSE = 'rgba(181, 80, 173, 0.85)';
const LEVEL_RED = 'rgba(206, 0, 0, 0.56)';
const SHADOW_TIMER = 'inset 0 0 0px 0px green';

export {
	BTN_TEXT_CORRECT,
	BTN_TEXT_WRONG,
	POINTS_FOR_ANSWER_TEXT,
	APP_CONTAINER,
	CHANCE, MAIN_SHADOW_DEFAUlT,
	MAIN_SHADOW_RIGHT,
	MAIN_SHADOW_WRONG,
	CORRECT_AUDIO,
	WRONG_AUDIO,
	LEVEL_YELLOW,
	LEVEL_BRONSE,
	LEVEL_RED,
	SHADOW_TIMER,
	CONTINUE_BTN_TEXT,
	EXIT_BTN_TEXT
};

