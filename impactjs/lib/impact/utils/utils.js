ig.module(
    'impact.utils.utils'
).requires(
    'impact.utils.check',
    'impact.utils.log',
    'impact.utils.canvas-draw'
).defines(function () {
    ig.utils = {
        callFunction: function (functionName, object) {
            if (typeof (object[functionName]) === "function") {
                object[functionName]();
            } else {
                throw functionName + " is not a function";
            }
        },
        checkObject: function (newValue, defaultValue) {
            if (typeof newValue === "undefined") {
                return defaultValue;
            } else {
                return newValue;
            }
        },
    };
});

