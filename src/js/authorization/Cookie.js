import {
	USER_COOKIE_NAME
} from './Constants';

function User(cookie) {
	this.name = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.NAME}`) !== -1).replace(`${USER_COOKIE_NAME.NAME}=`, '');
	// this.id = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.ID}`) !== -1).replace(`${USER_COOKIE_NAME.ID}=`, '');
	this.token = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.TOKEN}`) !== -1).replace(`${USER_COOKIE_NAME.TOKEN}=`, '');
}

export function checkUserToken() {
	const cookieArr = document.cookie.split(';');
	try {
		const userCookie = new User(cookieArr);
		if (userCookie.token !== ' ') return userCookie.name;
	} catch (error) {
		console.error('Cookie not found');
	}
	return false;
}

export function setUserCookie(name, value) {
	document.cookie = `${name}=${value}`;
}

export function deleteUserCookie(name) {
	document.cookie = `${name}=; expires=-1`;
}
