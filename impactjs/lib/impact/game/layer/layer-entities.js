ig.module(
	'impact.game.layer.layer-entities'
).requires(
	'impact.game.layer.layer',
	'impact.entity.entity'
).defines(function () {
	"use strict";

	ig.LayerEntities = ig.Layer.extend({
		entities: [],
		namedEntities: {},

		_deferredKill: [],
		_doSortEntities: false,	
		staticInstantiate: function () {
			return null;
		},
		getEntityByName: function (name) {
			return this.namedEntities[name];
		},
		getEntitiesByType: function (type) {
			var entityClass = typeof (type) === 'string'
				? ig.global[type]
				: type;

			var a = [];
			for (var i = 0; i < this.entities.length; i++) {
				var ent = this.entities[i];
				if (ent instanceof entityClass && !ent._killed) {
					a.push(ent);
				}
			}
			return a;
		},
		spawnEntity: function (type, x, y, settings) {
			var entityClass = typeof (type) === 'string'
				? ig.global[type]
				: type;

			if (!entityClass) {
				throw ("Can't spawn entity of type " + type);
			}
			var ent = new (entityClass)(x, y, settings || {});
			ent.parentLayer = this;
			this.entities.push(ent);
			if (ent.name) {
				this.namedEntities[ent.name] = ent;
			}
			logger("Spawn", "Layer (" + this.layerName + ") spawnEntity: (" + ent.id + ")")();
			return ent;
		},
		removeEntity: function (ent) {
			// Remove this entity from the named entities
			if (ent.name) {
				delete this.namedEntities[ent.name];
			}
			// We can not remove the entity from the entities[] array in the midst
			// of an update cycle, so remember all killed entities and remove
			// them later.
			// Also make sure this entity doesn't updated or checked
			ent._killed = true;
			ent.type = ig.Entity.TYPE.NONE;
			ent.checkAgainst = ig.Entity.TYPE.NONE;
			this._deferredKill.push(ent);
		},
		update: function () {			
			this.parent();

			this.updateEntities();
			this.checkEntities();

			this.removeKilledEntities();
		},
		updateEntities: function () {
			// update entities
			for (var i = 0; i < this.entities.length; i++) {
				var ent = this.entities[i];
				if (!ent._killed) {
					ent.update();
				}
			}
		},
		checkEntities: function () {
			// Insert all entities into a spatial hash and check them against any
			// other entity that already resides in the same cell. Entities that are
			// bigger than a single cell, are inserted into each one they intersect
			// with.

			// A list of entities, which the current one was already checked with,
			// is maintained for each entity.
			this.cellSize = ig.settings.get("CELL_SIZE");
			var hash = {};
			for (var e = 0; e < this.entities.length; e++) {
				var entity = this.entities[e];
				// Skip entities that don't check, don't get checked and don't collide
				if (
					entity.type == ig.Entity.TYPE.NONE &&
					entity.checkAgainst == ig.Entity.TYPE.NONE
				) {
					continue;
				}

				var checked = {},
					xmin = Math.floor(entity.pos.x / this.cellSize),
					ymin = Math.floor(entity.pos.y / this.cellSize),
					xmax = Math.floor((entity.pos.x + entity.size.x) / this.cellSize) + 1,
					ymax = Math.floor((entity.pos.y + entity.size.y) / this.cellSize) + 1;

				for (var x = xmin; x < xmax; x++) {
					for (var y = ymin; y < ymax; y++) {
						// Current cell is empty - create it and insert!
						if (!hash[x]) {
							hash[x] = {};
							hash[x][y] = [entity];
						}
						else if (!hash[x][y]) {
							hash[x][y] = [entity];
						}
						// Check against each entity in this cell, then insert
						else {
							var cell = hash[x][y];
							for (var c = 0; c < cell.length; c++) {

								// Intersects and wasn't already checkd?
								if (entity.touches(cell[c]) && !checked[cell[c].id]) {
									checked[cell[c].id] = true;
									ig.Entity.checkPair(entity, cell[c]);
								}
							}
							cell.push(entity);
						}
					} // end for y size
				} // end for x size
			} // end for entities
		},
		draw: function () {			
			this.parent();
			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].draw();
			}
		},
		removeKilledEntities: function () {
			for (var i = 0; i < this._deferredKill.length; i++) {
				this._deferredKill[i].erase();
				this.entities.erase(this._deferredKill[i]);
			}
			this._deferredKill = [];
		},		
	});
});