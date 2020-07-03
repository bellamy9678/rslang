import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	TEXT,
	GAME_NAMES
} from '../shared/Text';

function addSimilarDOMElements([...objects]) {
	const newElem = new DOMElementCreator();
	[...objects].forEach(el => {
		const corner1 = newElem.create({
			elem: TAGS.DIV,
			classes: ['game__corner-1'],
		});

		const corner2 = newElem.create({
			elem: TAGS.DIV,
			classes: ['game__corner-2'],
		});
		el.append(corner1, corner2);
	});
}

export default function createGamesPage() {
	const newElem = new DOMElementCreator();

	const englishPuzzleName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAME_NAMES.englishPuzzle],
	});

	const englishPuzzleGame = newElem.create({
		elem: TAGS.DIV,
		id: 'english-puzzle',
		classes: ['game', 'game__english-puzzle'],
		child: [englishPuzzleName],
	});

	const speakItName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAME_NAMES.speakIt],
	});

	const speakItGame = newElem.create({
		elem: TAGS.DIV,
		id: 'speak-it',
		classes: ['game', 'game__speak-it'],
		child: [speakItName],
	});

	const savannahName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAME_NAMES.savannah],
	});

	const savannahGame = newElem.create({
		elem: TAGS.DIV,
		id: 'savannah',
		classes: ['game', 'game__savannah'],
		child: [savannahName],
	});

	const container1 = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__container'],
		child: [englishPuzzleGame, speakItGame, savannahGame],
	});

	const title = newElem.create({
		elem: TAGS.H2,
		classes: ['game__title'],
		child: [TEXT.gamesPage.title],
	});

	const content = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__content'],
		child: [title],
	});

	const audioChallengeName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAME_NAMES.audioChallenge],
	});

	const audioChallengeGame = newElem.create({
		elem: TAGS.DIV,
		id: 'audio-challenge',
		classes: ['game', 'game__audio-challenge'],
		child: [audioChallengeName],
	});

	const ownGameName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAME_NAMES.ownGame],
	});

	const ownGame = newElem.create({
		elem: TAGS.DIV,
		id: 'own-game',
		classes: ['game', 'game__own-game'],
		child: [ownGameName],
	});

	const sprintName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAME_NAMES.sprint],
	});

	const sprintGame = newElem.create({
		elem: TAGS.DIV,
		id: 'sprint',
		classes: ['game', 'game__sprint'],
		child: [sprintName],
	});

	addSimilarDOMElements([englishPuzzleGame, speakItGame, savannahGame, audioChallengeGame, ownGame, sprintGame]);

	const container2 = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__container'],
		child: [content, audioChallengeGame, sprintGame, ownGame],
	});

	const gameWrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__wrapper'],
		child: [container1, container2],
	});

	return gameWrapper;
}
