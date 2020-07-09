export default class CookieMonster {
	constructor() {
		this.getCookie = function getCookie(name) {
			if (!name) return undefined;
			const matches = document.cookie.match(
				new RegExp(
					`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
				)
			);
			return matches ? decodeURIComponent(matches[1]) : undefined;
		};

		this.setCookie = function setCookie(name, value, optionsIn = {}) {
			const options = {
				path: '/',
				...optionsIn,
			};

			if (options.expires instanceof Date) {
				options.expires = options.expires.toUTCString();
			}

			let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
				value
			)}`;

			const keys = Object.keys(options);

			keys.forEach((optionKey) => {
				updatedCookie += `; ${optionKey}`;
				const optionValue = options[optionKey];
				if (optionValue !== true) {
					updatedCookie += `=${optionValue}`;
				}
			});

			document.cookie = updatedCookie;
		};

		this.deleteCookie = function deleteCookie(...names) {
			[...names].forEach(name => {
				this.setCookie(name, '', {
					'max-age': -1,
				});
			});
		};
	}
}
