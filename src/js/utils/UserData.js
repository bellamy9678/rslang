function User(cookie) {
	this.id = cookie.find(item => item.indexOf('userID') !== -1).replace('userID=', '');
	this.token = cookie.find(item => item.indexOf('userToken') !== -1).replace('userToken=', '');
}

export default function getUserData() {
	const cookie = document.cookie.split(';');
	return new User(cookie);
}
