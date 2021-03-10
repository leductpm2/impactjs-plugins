ig.module(
    'configs.game-texts'
).defines(function () {
    ig.gameTexts = {
        PLAY: "PLAY",
        SETTINGS: "SETTINGS",
        HOME: "HOME",
        SETTINGS: "SETTINGS",        
        /**
         * 
         * @returns Config
         */
        // get: function () {
        //     var currentObject = this;
        //     var settingString = "";
        //     for (var i = 0; i < arguments.length; i++) {
        //         var arg = arguments[i];
        //         currentObject = currentObject[arg];
        //         settingString += "." + arg;
        //         if (typeof currentObject === "undefined") {
        //             throw ("Can't get config: " + settingString);
        //         }
        //     }
        //     return currentObject;
        // },
    };
});