ig.module(
    'game.settings'
).defines(function () {
    ig.settings = {
        GAME_RESOLUTION: {
            WIDTH: 960,
            HEIGHT: 720
        },
        GAME_FPS: 60,
        GAME_SCALE_FACTOR: 1,

        /**
         * 
         * @returns Config
         */
        get: function () {
            var currentObject = this;
            var settingString = "";
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                currentObject = currentObject[arg];
                settingString += "." + arg;
                if (typeof currentObject === "undefined") {
                    throw ("Can't get config: " + settingString);
                }
            }
            return currentObject;
        },
    };
});