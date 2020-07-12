import generateElements from './generateElements';
import createMainPage from './createMainPage';

export default function savannah() {
	window.addEventListener('load', () => {
		createMainPage();
    
		const volumeContainer = document.querySelector('.volume-settings');
		const volumeOn = document.querySelector('.volume-up-icon');
		const volumeOff = document.querySelector('.volume-mute-icon');

		generateElements();

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
