ig.module(
	'game.main'
).requires(
	'impact.game.layers-control',
	'impact.entity.extends.pointer',
	'impact.entity.extends.button',
	'configs.configs',

	'plugins.handlers.handler',
	'plugins.lightning',
	
	'plugins.anchor-position',



	'game.game-control' // require game control for MyGame
).defines(function () {
	ig.initHandlers();

	var gameResolution = ig.settings.get("GAME_RESOLUTION");
	ig.main('#canvas', MyGame, ig.settings.get("GAME_FPS"), gameResolution.WIDTH, gameResolution.HEIGHT, ig.settings.get("GAME_SCALE_FACTOR"));
});
