ig.module(
	'game.main'
).requires(
	'impact.game',
	'game.settings',
	'impact.utils.font'
).defines(function () {
	MyGame = ig.Game.extend({
		// Load a font
		font: new ig.Font('media/fonts/04b03.font.png'),
		init: function () {
			// Initialize your game here; bind keys etc.
			this.spawnEntity(ig.Entity, 0, 0);
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
		}
	});

	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	var gameResolution = ig.settings.get("GAME_RESOLUTION");
	ig.main('#canvas', MyGame, ig.settings.get("GAME_FPS"), gameResolution.WIDTH, gameResolution.HEIGHT, ig.settings.get("GAME_SCALE_FACTOR"));
});
