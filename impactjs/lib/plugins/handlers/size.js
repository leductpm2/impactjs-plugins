ig.module(
    'plugins.handlers.size'
).defines(function () {
    ig.SizeHandler = ig.Class.extend({
        htmlTagToResize: [
            '#canvas'
        ],
        defaultSize: { x: 960, y: 720 },
        actualSize: { x: 960, y: 720 },
        domHandler: null,
        init: function (domHandler) {
            this.domHandler = domHandler;
            this.initEventListener();
            this.resize();
        },
        initEventListener: function () {
            window.addEventListener("orientationchange", this.orientationHandler.bind(this));
            window.addEventListener("resize", this.orientationHandler.bind(this));
        },
        orientationHandler: function () {
            this.resize();
            window.scrollTo(0, 1);
        },
        resize: function () {
            this.sizeCalcs();
            this.resizeHtmlTag();
        },
        sizeCalcs: function () {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };
            this.scaleRatioMultiplier = {
                x: this.windowSize.x / this.defaultSize.x,
                y: this.windowSize.y / this.defaultSize.y
            };
            var multiplier = Math.min(this.scaleRatioMultiplier.x, this.scaleRatioMultiplier.y);

            this.actualSize.x = this.defaultSize.x * multiplier;
            this.actualSize.y = this.defaultSize.y * multiplier;
        },
        resizeHtmlTag: function () {
            for (var index = 0; index < this.htmlTagToResize.length; index++) {
                var elem = this.domHandler.getElementById(this.htmlTagToResize[index]);
                var overWidth = Math.floor((this.windowSize.x - this.actualSize.x) * 0.5);
                var overHeight = Math.floor((this.windowSize.y - this.actualSize.y) * 0.5);
                if (overWidth < 0) overWidth = 0;
                if (overHeight < 0) overHeight = 0;
                this.domHandler.resizeOffset(elem, Math.floor(this.actualSize.x), Math.floor(this.actualSize.y), overWidth, overHeight);
            }
        },
    });
});
