import fetchWords from './fetchWords';

export default async function giveWords () {
	const givenWords = await fetchWords().then((resolve) => {
		return resolve;
	});
	return givenWords;
}
