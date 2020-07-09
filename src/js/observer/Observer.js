export default class Observer {
	constructor() {
		this.events = {};
	}

	subscribe(event, callback) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(callback);
	}

	unsubscribe(event) {
		if (this.events[event]) {
			delete this.events[event];
		}
	}

	call(event, obj) {
		if (this.events[event]) {
			this.events[event].forEach((callback) => {
				callback(obj);
			});
		}
	}
}
