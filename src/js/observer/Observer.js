class Observer {
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

	call(event) {
		if (this.events[event.type]) {
			this.events[event.type].forEach((callback) => {
				callback(event);
			});
		}
	}
}

const eventObserver = new Observer();
export default eventObserver;
