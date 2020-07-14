import showNewWord from './showNewWord';

export default function generateElements() {
	const stone = document.querySelector('.stone-icon');
	const healthPoints = document.querySelector('.health-point-scale');
	const volumeContainer = document.querySelector('.volume-settings');
	healthPoints.style.visibility = 'visible';
	volumeContainer.style.visibility = 'visible';
	stone.style.visibility = 'visible';
	showNewWord();
}
