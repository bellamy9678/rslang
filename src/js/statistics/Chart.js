import Chart from 'chart.js';
import {MOCA, CHART_COLOR} from './constants';

const speedData = {
	labels: MOCA.statistics.labels,
	datasets: [
		{
			data: MOCA.statistics.data,
			backgroundColor: CHART_COLOR,
		},
	],
};

const chartOptions = {
	legend: {
		display: false,
	},
	scales: {
		xAxes: [
			{
				ticks: {
					min: 0,
					max: 3600,
				},
			},
		],
		yAxes: [
			{
				ticks: {
					min: 0,
					max: 100,
					callback: (value) => `${value}%`,
				},
			},
		],
	},
	tooltips: {
		intersect: false,
		callbacks: {
			label: (tooltipItem, data) => {
				const wordsLearned = (tooltipItem.index === 1) ? data.labels[tooltipItem.index] - data.labels[tooltipItem.index - 1] : data.labels[tooltipItem.index];
				return [
					`on ${MOCA.statistics.dates[tooltipItem.index].toDateString()}`,
					`${wordsLearned} words learned`,
				];
			},
		},
		bodyFontSize: 16,
	},
};

export default function addChart() {
	window.addEventListener('load', function chart() {
		const ctx = document.getElementById('chart').getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'line',
			data: speedData,
			options: chartOptions,
		});
		window.removeEventListener('load', chart);
		return myChart;
	});
}
