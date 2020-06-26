const STORAGE = {
	setSession : function setSession(name) {
		sessionStorage.setItem('user' , name);
	},

	deleteSession: function deleteSession() {
		sessionStorage.removeItem('user');
	},

	setLocal : function setLocal(name) {
		localStorage.setItem(name, '01.01.2000');
	},

	deleteLocal : function deleteLocal(name) {
		localStorage.removeItem(name);
	},

	current : function current() {
		return sessionStorage.getItem('user');
	},
};

export default STORAGE;
