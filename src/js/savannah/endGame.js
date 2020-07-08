import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {ASSETS_STORAGE} from '../shared/Constants';
import Result from '../game_result/Result';

export default function endgame(arrayWithRightAnswers, arrayWithWrongAnswers) {
  // document.removeEventListener('keydown', defineButton);
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
  result.showResult({
    rightAnswers: arrayWithRightAnswers.map(item => new GetAnswers(item)),
    wrongAnswers: arrayWithWrongAnswers.map(item => new GetAnswers(item)),
    buttons: [resultReturnBtn, resultNewGameBtn]
  });
}
