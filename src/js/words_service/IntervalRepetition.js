import {
	USER,
} from '../utils/CookieConstants';
import CookieMonster from '../utils/CookieMonster';
import url from './url';
import {
	PROGRESS
} from './constants';

export default class IntervalRepetition {
	constructor(wordObj) {
		this.wordId = wordObj.id;
		this.optional = wordObj.optional;
	}

	increaseProgress() {
		if (this.optional.progress < PROGRESS.MAX) {
			this.optional.progress += 1;
		}
		return this.optional;
	}

	decreaseProgress() {
		if (this.optional.progress > PROGRESS.MIN) {
			this.optional.progress -= 1;
		}
		return this.optional;
	}

	async updateUserWord(addParams) {
		const cookie = new CookieMonster();
		const userToken = cookie.getCookie(USER.TOKEN);
		try {
			const APIUrl = url.oneWord(this.wordId);
			const rawResponse = await fetch(APIUrl, {
				method: 'PUT',
				withCredentials: true,
				headers: {
					'Authorization': `Bearer ${userToken}`,
					'Accept': 'application/json',
				},
				body: JSON.stringify(addParams),
			});
			const data = await rawResponse.json();
			console.log('IntervalRepetition -> updateUserWord -> data', data);
		} catch (error) {
			console.error(error.message);
		}
	}
}
