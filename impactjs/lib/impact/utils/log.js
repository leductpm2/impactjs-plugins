ig.module(
    'impact.utils.log'
).defines(function () {
    window.log = window.console["log"].bind(window.console, "[Quick-Log]");
    VALID_LOGGER = [
        // "Button",
        "Spawn"
    ];
    LOGGER_STYLE = {        
        "Button": "background: #222; color: #bada55",
    }
    window.logger = function () {
        var header = arguments[0];

        if (VALID_LOGGER.includes(header)) {
            header = '%c' + header;
            var style = 'background: #222; color: #bada55';
            if (typeof LOGGER_STYLE[header] !== "undefined") {
                style = LOGGER_STYLE[header];
            }
            var mainArguments = Array.prototype.slice.call(arguments);
            mainArguments.shift();
            mainArguments.unshift(style);
            mainArguments.unshift(header);
            mainArguments.unshift(header);
            return console.log.bind.apply(console.log, mainArguments);
        }
        else return function () { };
    };
});
