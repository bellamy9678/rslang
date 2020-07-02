import './sass/style.scss';
// import './js/authorization/CreateUser';
// import './js/authorization/StartPage';
import giveWords from './js/audio-challenge/giveWords';
import randomizeWords from './js/audio-challenge/randomizeWords';
import goToTheNextWord from './js/audio-challenge/goToTheNextWord';
import checkAnswer from './js/audio-challenge/checkAnswer';

async function a() {
	const allWords = await giveWords();
	const arrayForRandom = allWords.concat([]);
	randomizeWords(allWords, arrayForRandom);
}

a().then(() => {
	goToTheNextWord();
	const answerContainers = document.querySelectorAll('.answers-wrapper__answer');
	answerContainers.forEach(container => {
		container.addEventListener('click', checkAnswer);
	});
});
