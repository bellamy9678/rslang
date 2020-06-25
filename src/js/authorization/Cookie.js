import {
	USER_COOKIE_NAME,
	NOT_FOUND_VALUE
} from './Constants';

function User(cookie) {
	this.name = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.NAME}`) !== NOT_FOUND_VALUE).replace(`${USER_COOKIE_NAME.NAME}=`, '');
	// this.id = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.ID}`) !== NOT_FOUND_VALUE).replace(`${USER_COOKIE_NAME.ID}=`, '');
	this.token = cookie.find(item => item.indexOf(`${USER_COOKIE_NAME.TOKEN}`) !== NOT_FOUND_VALUE).replace(`${USER_COOKIE_NAME.TOKEN}=`, '');
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
