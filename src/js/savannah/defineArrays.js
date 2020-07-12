import giveWords from './giveWords';
import generateWordContainers from './generateWordContainers';
import {arrForUniqness, arrForRandFunc} from './consts';

export default	async function defineArrays() {
	const allWords = await giveWords();
	allWords.forEach(item => {
		arrForUniqness.push(item);
	});
	allWords.forEach(item => {
		arrForRandFunc.push(item);
	});
	generateWordContainers(arrForUniqness, arrForRandFunc);
}
