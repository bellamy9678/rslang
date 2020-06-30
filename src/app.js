import './sass/style.scss';
// import './js/authorization/CreateUser';
// import './js/authorization/StartPage';
import giveWords from './js/audio-challenge/giveWords';
import randomizeWords from './js/audio-challenge/randomizeWords';
import goToTheNextWord from './js/audio-challenge/goToTheNextWord';

async function a() {
	const allWords = await giveWords();
	const arrayForRandom = allWords.concat([]);
	randomizeWords(allWords, arrayForRandom);
}
a().then(() => {
	goToTheNextWord();
});
