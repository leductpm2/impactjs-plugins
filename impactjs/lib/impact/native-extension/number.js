ig.module(
	'impact.native-extension.number'
).defines(function () {
	"use strict";

	Number.prototype.map = function (istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
	};

	Number.prototype.limit = function (min, max) {
		return Math.min(max, Math.max(min, this));
	};

	Number.prototype.round = function (precision) {
		precision = Math.pow(10, precision || 0);
		return Math.round(this * precision) / precision;
	};

	Number.prototype.floor = function () {
		return Math.floor(this);
	};

	Number.prototype.ceil = function () {
		return Math.ceil(this);
	};

	Number.prototype.toInt = function () {
		return (this | 0);
	};

	Number.prototype.toRad = function () {
		return (this / 180) * Math.PI;
	};

	Number.prototype.toDeg = function () {
		return (this * 180) / Math.PI;
	};
});
