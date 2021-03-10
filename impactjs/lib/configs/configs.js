ig.module(
    'configs.configs'
).requires(
    'configs.game-settings',
    'configs.game-texts',
    'configs.fonts'
).defines(function () {
    getProperty = function () {
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
    };
    ig.gameTexts.get = getProperty.bind(ig.gameTexts);
    ig.gameSettings.get = getProperty.bind(ig.gameSettings);
    ig.fonts.get = getProperty.bind(ig.fonts);
});