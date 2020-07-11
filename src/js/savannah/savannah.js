import generateElements from './generateElements';
import createMainPage from './createMainPage';

export default function savannah() {
	createMainPage();
	const startingButton = document.querySelector('.starting-button');
	// const infoContainer = document.querySelector('.info');
	// const main = document.querySelector('.info-wrapper');
	// const hint = document.querySelector('.hint');
	const volumeContainer = document.querySelector('.volume-settings');
	const volumeOn = document.querySelector('.volume-up-icon');
	const volumeOff = document.querySelector('.volume-mute-icon');

	startingButton.addEventListener('click', generateElements);

	volumeContainer.addEventListener('click', () => {
		if (volumeOn.style.display === 'none') {
			volumeContainer.classList.remove('silence-mode');
			volumeOn.style.display = 'block';
			volumeOff.style.display = 'none';
		} else {
			volumeContainer.classList.add('silence-mode');
			volumeOn.style.display = 'none';
			volumeOff.style.display = 'block';
		}
	});
}
