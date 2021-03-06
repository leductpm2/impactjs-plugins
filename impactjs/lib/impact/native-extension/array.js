ig.module(
	'impact.native-extension.array'
).defines(function () {
	"use strict";
	Object.defineProperty(Array.prototype, 'erase', {
		value: function (item) {
			for (var i = this.length; i--;) {
				if (this[i] === item) {
					this.splice(i, 1);
				}
			}
			return this;
		}
	});

	Object.defineProperty(Array.prototype, 'random', {
		value: function (item) {
			return this[Math.floor(Math.random() * this.length)];
		}
	});
});
