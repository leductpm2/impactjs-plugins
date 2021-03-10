ig.module(
	'impact.layer'
).defines(function () {
	"use strict";

	ig.Layer = ig.Class.extend({
		id: 0,
		settings: {},
		layerIndex: -1,
		size: { x: 128, y: 128 },

		pos: { x: 0, y: 0 },
		lastPos: { x: 0, y: 0 },
		layerVisible: true,
		_killed: false,
		_layerUpdateFlag: true,
		_layerDrawFlag: true,
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
			if (!this.layerVisible) return false;
			this.lastPos.x = this.pos.x;
			this.lastPos.y = this.pos.y;
			return true;
		},
		draw: function () {
			if (!this.layerVisible) return false;
			return true;
		},
		kill: function () {
			ig.game.removeLayer(this);
		},
		ready: function () { },
		erase: function () { },
		layerShow: function () {
			this._layerUpdateFlag = true;
			this._layerDrawFlag = true;
		},
		layerHide: function () {
			this._layerUpdateFlag = false;
			this._layerDrawFlag = false;
		},
		// Pointer check
		_pointerCheckFlag: true,
		setPointerCheckFlag: function (enable) {
			this._pointerCheckFlag = enable;
		}
	});

	// Last used Layer id; incremented with each spawned Layer
	ig.Layer._lastId = 0;
});