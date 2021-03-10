ig.module(
	'impact.game'
).requires(
	'impact.impact',
	'impact.layer'
).defines(function () {
	"use strict";

	ig.Game = ig.Class.extend({
		layers: [],
		namedLayers: {},
		_deferredKill: [],
		staticInstantiate: function () {
			this.layers = [];
			this.namedLayers = {};
			this._deferredKill = [];
			ig.game = this;
			return null;
		},
		getLayerByName: function (layerName) {
			return this.namedLayers[layerName];
		},
		spawnLayer: function (type, x, y, settings) {
			var layerClass = typeof (type) === 'string'
				? ig.global[type]
				: type;

			if (!layerClass) {
				throw ("Can't spawn layer of type " + type);
			}
			var layer = new (layerClass)(x, y, settings || {});
			this.layers.push(layer);
			if (layer.layerName) {
				this.namedLayers[layer.layerName] = layer;
			}
			logger("Spawn", "spawnLayer: (" + layer.layerName + ")")();
			return layer;
		},
		removeLayer: function (layer) {
			// Remove this layer from the named layers
			if (layer.layerName) {
				delete this.namedLayers[layer.layerName];
			}
			//Remember all killed layers and remove them later.
			layer._killed = true;
			this._deferredKill.push(layer);
		},
		run: function () {
			this.update();
			this.draw();
		},
		update: function () {
			// update layers
			this.updateLayers();
			this.removeLayers();
			this.updatePointer();
		},
		/**
		 * Set enable value to pointerCheckFlag for layer under
		 * @param {*} topLayer 
		 * @param {*} enable 
		 */
		enablePointerCheckFlagForLayerUnder: function (topLayer, enable) {
			for (var i = 0; i < this.layers.length; i++) {
				var layer = this.layers[i];
				if (layer.id == topLayer.id) continue;
				if (layer.layerIndex < topLayer.layerIndex) {
					layer.setPointerCheckFlag(enable);
				}
			}
		},
		updateLayers: function () {
			for (var i = 0; i < this.layers.length; i++) {
				var layer = this.layers[i];
				if (layer._layerUpdateFlag) layer.update();
			}
		},
		removeLayers: function () {
			for (var i = 0; i < this._deferredKill.length; i++) {
				this._deferredKill[i].erase();
				this.layers.erase(this._deferredKill[i]);
			}
			this._deferredKill = [];
		},
		draw: function () {
			ig.system.clear(ig.settings.get("CLEAR_COLOR"));
			for (var i = 0; i < this.layers.length; i++) {
				var layer = this.layers[i];
				if (layer._layerDrawFlag) layer.draw();
			}
		},
		spawnPointer: function (settings) {
			this.pointer = new EntityPointer(-999, -999, settings);
		},
		updatePointer: function () {
			for (var i = 0; i < this.layers.length; i++) {
				var layer = this.layers[i];				
				if (!layer.entities) continue;
				if (!layer._layerUpdateFlag) continue;
				if (!layer._layerDrawFlag) continue;
				if (!layer._pointerCheckFlag) continue;
				for (var j = 0; j < layer.entities.length; j++) {
					var entity = layer.entities[j];
					if (!entity) continue;
					if (entity.touches(this.pointer)) this.pointer.check(entity);
				}
			}
			this.pointer.update();
		},
	});
});