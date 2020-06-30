import generateElements from './generateElements';

export default function randomizeWords(words, arrForRand) {
	const mainWord = words[0];
	const arrayWithAnswers = [];
	const numberOfWrongAnswers = 4;
	const arrayForRandom = arrForRand.slice();
	for (arrayWithAnswers.length; arrayWithAnswers.length < numberOfWrongAnswers;) {
		const randomIndex = Math.floor(Math.random() * arrayForRandom.length);
		if (arrayForRandom[randomIndex] !== mainWord) {
			arrayWithAnswers.push(arrayForRandom[randomIndex]);
		}
		arrayForRandom.splice(randomIndex, 1);
	}
	words.splice(0, 1);
	console.log(arrForRand);
	const indexForMainWord = Math.floor(Math.random() * arrayWithAnswers.length);
	arrayWithAnswers.splice(indexForMainWord, 0, mainWord);
	generateElements(mainWord, arrayWithAnswers);
}
