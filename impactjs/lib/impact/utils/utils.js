ig.module(
    'impact.utils.utils'
).requires(
    'impact.utils.check',
    'impact.utils.log',
    'impact.utils.canvas-draw'
).defines(function () {
    ig.utils = {
        callFunction: function (functionName, object, skipThrow) {
            if (typeof (object[functionName]) === "function") {
                object[functionName]();
            } else {
                if (skipThrow) return;
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

