import DOMElementCreator from '../utils/DOMElementCreator';
import * as TAGS from '../shared/Tags.json';
import * as CONST from './constants';

const factory = new DOMElementCreator();

export default class GameField {
	static generateField() {

		const score = factory.create({
			elem: TAGS.DIV,
			classes: 'score',
			id: 'score',
			child: '0'
		});

		const dots = [];
		for (let i = 0; i < 3; i += 1) {
			const dot = factory.create({
				elem: TAGS.SPAN,
				classes: 'sublevel__dot',
			});
			dots.push(dot);
		}

		const sublevelDots = factory.create({
			elem: TAGS.DIV,
			classes: 'sublevel__dots',
			child: dots
		});

		const pointsForAnswer = factory.create({
			elem: TAGS.DIV,
			classes: ['sublevel__points-for-word'],
			id: 'points_for_word'
		});

		const sublevel = factory.create({
			elem: TAGS.DIV,
			classes: ['main__sublevel', 'sublevel'],
			id: 'sublevel',
			child: [sublevelDots, pointsForAnswer]
		});
		const translation = factory.create({
			elem: TAGS.DIV,
			classes: 'main__translation',
			id: 'translation'
		});

		const levels = ['one', 'two', 'three'];
		const levelsElements = [];

		for (let i = 0; i < levels.length; i += 1) {
			const levelEl = factory.create({
				elem: TAGS.DIV,
				classes: [`main__level_${levels[i]}`, 'level_star', 'none']
			});
			levelsElements.push(levelEl);
		}

		const level = factory.create({
			elem: TAGS.DIV,
			classes: 'main__level',
			child: levelsElements
		});
		const word = factory.create({
			elem: TAGS.DIV,
			classes: 'main__word',
			id: 'word'
		});
		const wrongIndicator = factory.create({
			elem: TAGS.IMG,
			attr: { src: './assets/images/sprint/wrong.png' },
			id: 'wrong',
			classes: ['indicator', 'indicator__wright']
		});
		const rightIndicator = factory.create({
			elem: TAGS.IMG,
			attr: { src: './assets/images/sprint/correct.png' },
			id: 'correct',
			classes: ['indicator', 'rindicator__right']
		});

		const wrongRightAnswer = factory.create({
			elem: TAGS.DIV,
			classes: 'main__wrong-right-answer',
			child: [wrongIndicator, rightIndicator]
		});

		const buttonWrong = factory.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'button--wrong'],
			child: CONST.BTN_TEXT_WRONG,
			id: 'wrongBtn'
		});
		const buttonCorrext = factory.create({
			elem: TAGS.BUTTON,
			classes: ['button', 'button--correct'],
			child: CONST.BTN_TEXT_CORRECT,
			id: 'correctBtn'
		});
		const keyboardKeyLeft = factory.create({
			elem: TAGS.DIV,
			classes: 'keyboard__key_left'
		});
		const keyboardKeyRight = factory.create({
			elem: TAGS.DIV,
			classes: 'keyboard__key_right'
		});
		const keyboardBtnsContainer = factory.create({
			elem: TAGS.DIV,
			classes: 'main__keyboard_btns_container',
			child: [keyboardKeyLeft, keyboardKeyRight]
		});
		const buttons = factory.create({
			elem: TAGS.DIV,
			classes: 'main__buttons',
			child: [buttonWrong, buttonCorrext, keyboardBtnsContainer]
		});
		const playAudioBtn = factory.create({
			elem: TAGS.BUTTON,
			classes: 'main__play_audio_btn',
			id: 'audio'
		});
		const time = factory.create({
			elem: TAGS.P,
			id: 'time',
		});
		const timer = factory.create({
			elem: TAGS.DIV,
			classes: 'timer-group',
			id: 'timer',
			child: time
		});

		const main = factory.create({
			elem: TAGS.DIV,
			classes: 'main',
			id: 'main_container',
			child: [sublevel, level, word, translation, wrongRightAnswer, buttons, playAudioBtn, timer]
		});

		const appWrapper = factory.create({
			elem: TAGS.DIV,
			classes: 'wrapper',
			child: [score, main]
		});

		CONST.APP_CONTAINER.append(appWrapper);
	}

}

