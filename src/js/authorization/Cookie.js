
// export checkUserCookie(name) {
// }

export function setUserCookie(name, value) {
	document.cookie = `${name}=${value}`;
}

export function deleteUserCookie(name) {
	document.cookie = `${name}=; expires=-1`;
}
