import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import {
	TEXT,
	GAMES
} from '../shared/Text';

function addSimilarDOMElements([...objects]) {
	const newElem = new DOMElementCreator();
	[...objects].forEach(el => {
		const overlay = newElem.create({
			elem: TAGS.DIV,
			classes: ['game__overlay'],
		});
		el.append(overlay);
	});
}

export default function createGamesPage() {
	const newElem = new DOMElementCreator();

	const englishPuzzleName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAMES.englishPuzzle.name],
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
		child: [GAMES.speakIt.name],
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
		child: [GAMES.savannah.name],
	});

	const savannahGame = newElem.create({
		elem: TAGS.DIV,
		id: 'savannah',
		classes: ['game', 'game__savannah'],
		child: [savannahName],
	});

	const description = newElem.create({
		elem: TAGS.P,
		classes: ['game__description'],
		child: [TEXT.gamesPage.description],
	});

	const container1 = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__container'],
		child: [englishPuzzleGame, speakItGame, savannahGame, description],
	});

	const audioChallengeName = newElem.create({
		elem: TAGS.SPAN,
		classes: ['game__name'],
		child: [GAMES.audioChallenge.name],
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
		child: [GAMES.ownGame.name],
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
		child: [GAMES.sprint.name],
	});

	const sprintGame = newElem.create({
		elem: TAGS.DIV,
		id: 'sprint',
		classes: ['game', 'game__sprint'],
		child: [sprintName],
	});

	addSimilarDOMElements([englishPuzzleGame, speakItGame, savannahGame, audioChallengeGame, ownGame, sprintGame]);

	const titleText = newElem.create({
		elem: TAGS.H2,
		classes: ['game__title-text'],
		child: [TEXT.gamesPage.title],
	});

	const titleImage = newElem.create({
		elem: TAGS.IMG,
		attr: [{
			src: './assets/images/brain.png'
		}, {
			width: '100'
		}],
	});

	const title = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__title'],
		child: [titleImage, titleText],
	});

	const container2 = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__container'],
		child: [title, audioChallengeGame, sprintGame, ownGame],
	});

	const gameWrapper = newElem.create({
		elem: TAGS.DIV,
		classes: ['game__wrapper'],
		child: [container1, container2],
	});

	return gameWrapper;
}
