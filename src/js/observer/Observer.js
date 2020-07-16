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
		if (this.events[event.type]) {
			delete this.events[event.type];
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
