import './sass/style.scss';
// import './js/authorization/CreateUser';
// import './js/authorization/StartPage';
import giveWords from './js/audio-challenge/giveWords';
import randomizeWords from './js/audio-challenge/randomizeWords';
import {arrayForUniqness, arrayForRandom} from './js/audio-challenge/consts';

async function a() {
	const allWords = await giveWords();
	allWords.forEach(item => {
		arrayForUniqness.push(item);
	});
	allWords.forEach(item => {
		arrayForRandom.push(item);
	});
	randomizeWords(arrayForUniqness, arrayForRandom);
}

a();
