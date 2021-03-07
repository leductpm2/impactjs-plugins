ig.module(
	'game.main'
).requires(
	'impact.game',
	'plugins.handlers.handler',
	'impact.layer-entities',
	'plugins.lightning',
	'entities.button',
	'entities.pointer',
	'plugins.anchor-position'
).defines(function () {
	MyGame = ig.Game.extend({
		init: function () {
			// this.spawnEntity(EntityButton, 0, 0);
			// this.spawnEntity(EntityPointer, 0, 0);
			this.background = this.spawnLayer(ig.Layer, 0, 0, {
				layerName: "background",
				anchorType: "middle",
				selfAnchorType: "middle",
				size: { x: ig.system.width, y: ig.system.height }
			});
			this.ui = this.spawnLayer(ig.LayerEntities, 0, 0, {
				layerName: "ui",
				layerBackgroundColor: "rgba(255,255,255,0.5)",
				anchorType: "middle",
				selfAnchorType: "middle",
				size: { x: ig.system.width * 0.5, y: ig.system.height * 0.5 }
			});
			this.lightning = new Lightning();
			var button = this.ui.spawnEntity(EntityButton, 0, 0, {
				anchorOnObject: this.ui,
				anchorType: "middle",
				selfAnchorType: "middle"
			});			
			this.ui.spawnEntity(EntityPointer, 0, 0);
		},

		update: function () {
			// Update all entities and backgroundMaps
			this.parent();

			// Add your own, additional update code here
		},

		draw: function () {
			// Draw all entities and backgroundMaps
			this.parent();


			this.lightning.Cast(ig.system.context, new VectorLightning(0, 0, ig.system.width * 0.25, ig.system.height * 0.5), new VectorLightning(0, 0, ig.system.width * 0.75, ig.system.height * 0.5))

		}
	});

	ig.initHandlers();
	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	var gameResolution = ig.settings.get("GAME_RESOLUTION");
	ig.main('#canvas', MyGame, ig.settings.get("GAME_FPS"), gameResolution.WIDTH, gameResolution.HEIGHT, ig.settings.get("GAME_SCALE_FACTOR"));
});
