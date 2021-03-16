ig.module(
	'game.game-control'
).requires(
	'impact.game.layers-control',
	'game.layers.home',
	'game.layers.settings',

).defines(function () {
	MyGame = ig.GameLayerControl.extend({
		init: function () {
			log("Gae init")
			this.spawnPointer();
			this.layerHome = this.spawnLayer(LayerHome, 0, 0, {
				layerIndex: 1,
				layerName: "home",
				anchorType: "middle",
				selfAnchorType: "middle",
				size: { x: ig.system.width, y: ig.system.height }
			});
			this.layerSettings = this.spawnLayer(LayerSettings, 0, 0, {
				layerIndex: 2,
				layerName: "settings",
				anchorType: "middle",
				selfAnchorType: "middle",
				size: { x: ig.system.height * 0.5, y: ig.system.height * 0.75 }
			});

			this.layerSettings.layerHide();
		},
		update: function () {
			// Update all layers
			this.parent();
		},
		draw: function () {
			// Draw all layers
			this.parent();
		}
	});
});
