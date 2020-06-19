export default async function getNewWordsFromApi(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}
