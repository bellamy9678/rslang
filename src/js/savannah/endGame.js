import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {ASSETS_STORAGE} from '../shared/Constants';
import Result from '../game_result/Result';
import stopMoving from './consts';
import { GAMES_NAMES, RESULT_MULTIPLIER } from '../statistics/constants';
import Statistics from '../statistics/Statistics';

export default function endgame(arrayWithRightAnswers, arrayWithWrongAnswers) {
	document.removeEventListener('keydown', stopMoving);
	function GetAnswers(item) {
		this.word = item.textContent;
		this.wordTranslate = item.dataset.translate;
		this.transcription = item.dataset;
		this.audio = item.dataset.audio.replace(ASSETS_STORAGE, '');;
	}
	const creator = new DOMElementCreator();
	const resultReturnBtn = creator.create({
		elem: TAGS.BUTTON,
		classes: ['result__button', 'result__continue-btn'],
		child: 'returnBtnText',
	});
	const resultNewGameBtn = creator.create({
		elem: TAGS.BUTTON,
		classes: ['result__button', 'result__continue-btn'],
		child: 'newGameText',
	});
	const result = new Result();

	const resultPoints = {
		name: GAMES_NAMES.PUZZLE,
		result:
		arrayWithRightAnswers.map(item => new GetAnswers(item)).length * RESULT_MULTIPLIER.CORRECT +
		arrayWithWrongAnswers.map(item => new GetAnswers(item)).length * RESULT_MULTIPLIER.INCORRECT,
	};
	Statistics.putGamesResult(resultPoints);

	result.showResult({
		rightAnswers: arrayWithRightAnswers.map(item => new GetAnswers(item)),
		wrongAnswers: arrayWithWrongAnswers.map(item => new GetAnswers(item)),
		buttons: [resultReturnBtn, resultNewGameBtn]
	});
}
