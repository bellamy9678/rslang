import getNewWordsArray from './GetWord';
import Card from './Card';

export default async function getCards(group, page) {
	const wordsArray = await getNewWordsArray(group, page);
	const cardsArray = wordsArray.map((word) => {
		const cardUnit = new Card(word);
		const cardElem = cardUnit.create();
		return cardElem;
	});
	return cardsArray;
}

// async function add() {
// 	const arr = await getCards(1, 2);
// 	arr.forEach( card => document.body.append(card));
// }
// add();
