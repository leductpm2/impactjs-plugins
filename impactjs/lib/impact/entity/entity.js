ig.module(
	'impact.entity.entity'
).defines(function () {
	"use strict";

	ig.Entity = ig.Class.extend({
		id: 0,
		settings: {},
		zIndex: 0,

		size: { x: 16, y: 16 },
		pos: { x: 0, y: 0 },
		lastPos: { x: 0, y: 0 },

		type: 0, //ig.Entity.TYPE.NONE,
		checkAgainst: 0, //ig.Entity.TYPE.NONE,

		_killed: false,

		init: function (x, y, settings) {
			this.id = ++ig.Entity._lastId;
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
			this.zIndex = proto.zIndex;
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
		},
		kill: function () {
			ig.game.removeEntity(this);
		},
		touches: function (other) {
			return !(
				this.pos.x >= other.pos.x + other.size.x ||
				this.pos.x + this.size.x <= other.pos.x ||
				this.pos.y >= other.pos.y + other.size.y ||
				this.pos.y + this.size.y <= other.pos.y
			);
		},
		check: function (other) { },
		erase: function () { }
	});

	// Last used entity id; incremented with each spawned entity
	ig.Entity._lastId = 0;
	// Entity Types - used for checks
	ig.Entity.TYPE = {
		NONE: 0,
		BUTTON: 1,
		B: 2,
		BOTH: 3
	};
	ig.Entity.checkPair = function (a, b) {
		// Do these entities want checks?
		if (a.checkAgainst & b.type) {
			a.check(b);
		}
		if (b.checkAgainst & a.type) {
			b.check(a);
		}
	};
});