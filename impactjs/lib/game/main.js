ig.module(
	'game.main'
).requires(
	'impact.game',
	'configs.configs',

	'plugins.handlers.handler',
	'impact.layer-entities',
	'plugins.lightning',
	'entities.button',
	'entities.pointer',
	'plugins.anchor-position',

	'game.layers.home',
	'game.layers.settings'
).defines(function () {
	MyGame = ig.Game.extend({
		init: function () {
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

	ig.initHandlers();

	var gameResolution = ig.settings.get("GAME_RESOLUTION");
	ig.main('#canvas', MyGame, ig.settings.get("GAME_FPS"), gameResolution.WIDTH, gameResolution.HEIGHT, ig.settings.get("GAME_SCALE_FACTOR"));
});
