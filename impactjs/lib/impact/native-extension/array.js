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

	Function.prototype.bind = Function.prototype.bind || function (oThis) {
		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () { },
			fBound = function () {
				return fToBind.apply(
					(this instanceof fNOP && oThis ? this : oThis),
					aArgs.concat(Array.prototype.slice.call(arguments))
				);
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
});
