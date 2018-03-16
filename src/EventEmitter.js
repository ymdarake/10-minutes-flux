export default class Eventemitter {
	constructor() {
		this._handlers = {};
	}
	on(type, handler) {
		if (typeof this._handlers[type] === 'undefined') {
			this._handlers[type] = [];
		}
		this._handlers[type].push(handler);
	}
	emit(type, data) {
		const handlers = this._handlers[type] || [];
		const self = this;
		handlers.forEach(handler => {
			handler.call(self, data)
		});
	}
}
