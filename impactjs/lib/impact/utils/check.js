ig.module(
    'impact.utils.check'
).defines(function () {
    ig.check = {
        /**
         * Check object is function or not
         * @param {*} obj 
         */
        function: function (obj, call) {
            return typeof (obj) === "function";
        },
        defined: function (obj) {
            return typeof (obj) != "undefined";
        },
        /**
         * Check object is array or not
         * @param {*} obj 
         */
        array: function (obj) {
            return Array.isArray(obj);;
        },
        /**
         * Check number is odd or even
         * @param {*} number
         */
        isOdd: function (number) {
            return number % 2;
            // return (number & 1);
        },
        isInArray: function (arr) {
            //https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
            if (arr.filter(function (e) { return e.Name === 'Magenic'; }).length > 0) {
                /* vendors contains the element we're looking for */
            }
        },
    };
});

