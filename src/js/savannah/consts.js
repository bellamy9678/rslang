const arrayWithWords = [];
const arrForUniqness = [];
const arrForRandFunc = [];
const arrayWithWrongAnswers = [];
const arrayWithRightAnswers = [];
const START_INDEX = 0;
const FINAL_INDEX = 3;
const REQUIRED_MARGIN = 497;
const NUMBER_OF_WORDS = 4;
const POSITION_OF_NUMBER = 5;
const WORD_BEGGINING = 0;
const WORD_ENDING = 5;
const VALUE_OF_KEYS = 4;
const fetchInfo = {
  round: 0,
  level: 0
};
const ERROR_SOUND_SRC = `https://raw.githubusercontent.com/garza0/rslang-data/master/wrong.mp3`;
const CORRECT_SOUND_SRC = `https://raw.githubusercontent.com/garza0/rslang-data/master/correct.mp3`;
const DELAY_BEFORE_GAME = 4000;
const NEW_OPACITY = '0';
const NEW_FONTSIZE = '6rem';
const NEW_WIDTH = '1px';
const WHITE_COLOR = 'white';

function stopMoving(timer) {
  clearInterval(timer);
}



export {WHITE_COLOR, NEW_OPACITY, NEW_WIDTH, NEW_FONTSIZE, DELAY_BEFORE_GAME, stopMoving, ERROR_SOUND_SRC, CORRECT_SOUND_SRC, fetchInfo, VALUE_OF_KEYS, WORD_ENDING, POSITION_OF_NUMBER, WORD_BEGGINING, NUMBER_OF_WORDS,arrayWithWrongAnswers, arrayWithRightAnswers, arrayWithWords, arrForUniqness, arrForRandFunc, START_INDEX, FINAL_INDEX, REQUIRED_MARGIN};
