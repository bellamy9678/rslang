import DOMElementCreator from '../utils/DOMElementCreator';
import TAGS from '../shared/Tags.json';
import { TEXT_STATISTICS, ARRAY_LENGTH_INDEX_CORRECTION, CHART_SETTINGS } from './constants';

const factory = new DOMElementCreator();

export default class StatisticsPage {
	constructor(gameObjectStatistics) {
		this.gameData = gameObjectStatistics;
	}

	static getTableHeader() {
		const elemNumber = factory.create({
			elem: TAGS.TD,
			child: TEXT_STATISTICS.NUMBER,
		});
		const elemDate = factory.create({
			elem: TAGS.TD,
			child: TEXT_STATISTICS.DATE,
		});
		const elemResult = factory.create({
			elem: TAGS.TD,
			child: TEXT_STATISTICS.RESULT,
		});
		const headerRow = factory.create({
			elem: TAGS.TR,
			classes: ['statistics-game__table_head'],
			child: [elemNumber, elemDate, elemResult],
		});
		return headerRow;
	}

	static getTableRow(gameData, index) {
		const elemNumber = factory.create({
			elem: TAGS.TD,
			child: index + ARRAY_LENGTH_INDEX_CORRECTION,
		});
		const date = new Date(gameData.date);
		const elemDate = factory.create({
			elem: TAGS.TD,
			child: date.toDateString(),
		});

		const elemResult = factory.create({
			elem: TAGS.TD,
			child: gameData.result,
		});

		const headerRow = factory.create({
			elem: TAGS.TR,
			classes: ['statistics-game__table_row'],
			child: [elemNumber, elemDate, elemResult],
		});
		return headerRow;
	}

	getStatisticsPage() {
		const chart = factory.create({
			elem: TAGS.CANVAS,
			classes: ['statistics-scale__chart'],
			id: 'chart',
			attr: [{
				width: CHART_SETTINGS.WIDTH
			}, {
				height: CHART_SETTINGS.HEIGHT
			}],
		});

		const sectionChart = factory.create({
			elem: TAGS.SECTION,
			classes: ['statistics-scale'],
			child: chart,
		});

		// tables
		const games = this.gameData.games.map((game) => {
			const name = factory.create({
				elem: TAGS.H2,
				classes: ['statistics-game__name'],
				child: game.name,
			});
			const tableHeader = StatisticsPage.getTableHeader();

			const tableData = game.data.map((params, index) => {
				const row = StatisticsPage.getTableRow(params, index);
				return row;
			});

			const table = factory.create({
				elem: TAGS.TABLE,
				classes: ['statistics-game__table'],
				child: [tableHeader, ...tableData],
			});

			const gameContainer = factory.create({
				elem: TAGS.DIV,
				classes: ['statistics-game'],
				child: [name, table],
			});
			return gameContainer;
		});

		const sectionGames = factory.create({
			elem: TAGS.SECTION,
			classes: ['statistics-games'],
			child: games,
		});

		const wrapper = factory.create({
			elem: TAGS.DIV,
			classes: ['wrapper'],
			child: [sectionChart, sectionGames],
		});

		return wrapper;
	}
}
