ig.module(
	'impact.entity.entity-pool'
).defines(function () {
	"use strict";

	ig.EntityPool = {
		pools: {},
		mixin: {
			staticInstantiate: function (x, y, settings) {
				return ig.EntityPool.getFromPool(this.classId, x, y, settings);
			},
			erase: function () {
				ig.EntityPool.putInPool(this);
			}
		},
		enableFor: function (Class) {
			Class.inject(this.mixin);
		},
		getFromPool: function (classId, x, y, settings) {
			var pool = this.pools[classId];
			if (!pool || !pool.length) { return null; }

			var instance = pool.pop();
			instance.reset(x, y, settings);
			return instance;
		},
		putInPool: function (instance) {
			if (!this.pools[instance.classId]) {
				this.pools[instance.classId] = [instance];
			}
			else {
				this.pools[instance.classId].push(instance);
			}
		},
		drainPool: function (classId) {
			delete this.pools[classId];
		},
		drainAllPools: function () {
			this.pools = {};
		}
	};
});
