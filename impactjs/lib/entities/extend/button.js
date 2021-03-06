ig.module(
    'entities.extend.button'
).requires(
    'entities.button'
).defines(function () {
    ExtendButton = EntityButton.extend({
        type: ig.Entity.TYPE.BUTTON,
        size: { x: 64, y: 64 },
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        onPointerOver: function () {
            logger("Button", "onPointerOver")();
        },
        onPointerLeave: function () {
            logger("Button", "onPointerLeave")();
        },
        onPointerFirstClick: function () {
            logger("Button", "onPointerFirstClick")();
        },
        onPointerClicking: function () {
            logger("Button", "onPointerClicking")();
        },
        onPointerRelease: function () {
            logger("Button", "onPointerRelease")();
        },
    });
});