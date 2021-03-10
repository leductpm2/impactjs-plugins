ig.module( 
    'configs.game-settings'
).defines(function () {
    ig.gameSettings = {
        UI_SPACING: 15,
        BLACK_OVERLAY: "rgba(0,0,0,0.5)",
        WHITE_OVERLAY: "rgba(255,255,255,0.5)",
        TEXT_TITLE_COLOR: "rgba(255,255,255,1)",
        
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