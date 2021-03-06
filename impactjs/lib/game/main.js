ig.module(
	'game.main'
).requires(
	'impact.game',
	'game.settings',
	'impact.utils.font',
	'plugins.lightning',
	'entities.pointer',
	'entities.extend.button'
).defines(function () {
	MyGame = ig.Game.extend({
		// Load a font
		font: new ig.Font('media/fonts/04b03.font.png'),
		init: function () {
			// Initialize your game here; bind keys etc.
			this.spawnEntity(ExtendButton, 0, 0);
			this.spawnEntity(EntityPointer, 0, 0);
			this.lightning = new Lightning();
		},

		update: function () {
			// Update all entities and backgroundMaps
			this.parent();

			// Add your own, additional update code here
		},

		draw: function () {
			// Draw all entities and backgroundMaps
			this.parent();


			// Add your own drawing code here
			var x = ig.system.width / 2,
				y = ig.system.height / 2;

			this.font.draw('It Works!', x, y, ig.Font.ALIGN.CENTER);

			this.lightning.Cast(ig.system.context, new VectorLightning(0, 0, ig.system.width * 0.25, ig.system.height * 0.5), new VectorLightning(0, 0, ig.system.width * 0.75, ig.system.height * 0.5))

		}
	});

	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	var gameResolution = ig.settings.get("GAME_RESOLUTION");
	ig.main('#canvas', MyGame, ig.settings.get("GAME_FPS"), gameResolution.WIDTH, gameResolution.HEIGHT, ig.settings.get("GAME_SCALE_FACTOR"));
});
