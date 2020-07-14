import Chart from 'chart.js';
import { CHART_OPTIONS, ARRAY_LENGTH_INDEX_CORRECTION, FIRST_ELEMENT_INDEX } from './constants';

function getData(stat) {
	const wordsData = {
		labels: stat.statistics.labels,
		datasets: [
			{
				data: stat.statistics.data,
				backgroundColor: CHART_OPTIONS.COLOR,
			},
		],
	};
	return wordsData;
}

function getChartOptions(stat) {
	const chartOptions = {
		legend: {
			display: false,
		},
		scales: {
			xAxes: [
				{
					ticks: {
						min: CHART_OPTIONS.MIN_WORDS,
						max: CHART_OPTIONS.MAX_WORDS,
					},
				},
			],
			yAxes: [
				{
					ticks: {
						min: CHART_OPTIONS.MIN_Y,
						max: CHART_OPTIONS.MAX_Y,
						callback: (value) => `${value}%`,
					},
				},
			],
		},
		tooltips: {
			intersect: false,
			callbacks: {
				label: (tooltipItem, data) => {
					const wordsLearned =
						(tooltipItem.index !== FIRST_ELEMENT_INDEX) ? data.labels[tooltipItem.index] - data.labels[tooltipItem.index - ARRAY_LENGTH_INDEX_CORRECTION] : data.labels[tooltipItem.index];
					return [
						`on ${(new Date(stat.statistics.dates[tooltipItem.index])).toDateString()}`,
						`${wordsLearned} words learned`,
					];
				},
			},
			bodyFontSize: CHART_OPTIONS.FONT_SIZE,
		},
	};
	return chartOptions;
}

export default function addChart(statistics) {
	const ctx = document.getElementById('chart').getContext('2d');
	const myChart = new Chart(ctx, {
		type: 'line',
		data: getData(statistics),
		options: getChartOptions(statistics),
	});
	return myChart;
}
