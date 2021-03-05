ig.module(
    'impact.impact-config'
).defines(function () {
    ig.config = {        
        clearColor: '#000000',

        /**
         * 
         * @returns Config
         */
        get:function () {
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