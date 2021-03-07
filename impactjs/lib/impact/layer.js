ig.module(
	'impact.layer'
).defines(function () {
	"use strict";

	ig.Layer = ig.Class.extend({
		id: 0,
		settings: {},
		size: { x: 128, y: 128 },

		pos: { x: 0, y: 0 },
		lastPos: { x: 0, y: 0 },

		_killed: false,
		init: function (x, y, settings) {
			this.id = ++ig.Layer._lastId;
			this.initSettings(x, y, settings);
		},
		initSettings: function (x, y, settings) {
			this.pos.x = this.lastPos.x = x;
			this.pos.y = this.lastPos.y = y;
			ig.merge(this, settings);
		},
		reset: function (x, y, settings) {
			var proto = this.constructor.prototype;

			this.settings = proto.settings;
			this.size.x = proto.size.x;
			this.size.y = proto.size.y;

			this.pos.x = this.lastPos.x = proto.pos.x;
			this.pos.y = this.lastPos.y = proto.pos.y;

			this.type = proto.type;
			this.checkAgainst = proto.checkAgainst;
			this._killed = proto._killed;

			this.initSettings(x, y, settings);
		},
		update: function () {
			this.lastPos.x = this.pos.x;
			this.lastPos.y = this.pos.y;
		},
		draw: function () {
			ig.system.context.fillStyle = ig.utils.checkObject(this.layerBackgroundColor, "grey");
			ig.system.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		},
		kill: function () {
			ig.game.removeLayer(this);
		},
		ready: function () { },
		erase: function () { }
	});

	// Last used Layer id; incremented with each spawned Layer
	ig.Layer._lastId = 0;
});