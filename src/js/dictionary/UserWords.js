// import {
// 	API,
// 	URL_PARAM_USER,
// 	URL_PARAM_AGGREGATED_WORDS
// } from '../shared/Constants';

// async function getUserWordsByCategory(category) {
// 	const filter = {
// 		category: category,
// 	};
// 	const rawResponse = await fetch(`${API}${URL_PARAM_USER}/${userData.id}/${URL_PARAM_AGGREGATED_WORDS}${JSON.stringify(filter)}`, {
// 		method: 'GET',
// 		withCredentials: true,
// 		headers: {
// 			'Authorization': `Bearer${userData.token}`,
// 			'Accept': 'application/json',
// 		}
// 	});
// 	const content = await rawResponse.json();
// 	console.log(content);
// }
