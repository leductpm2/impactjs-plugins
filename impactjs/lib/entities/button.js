ig.module(
    'entities.button'
).requires(
    'entities.button.base',
    'entities.button.draw',
    'entities.button.scale'
).defines(function () {
    EntityButton = EntityButtonBase.extend({
        type: ig.Entity.TYPE.BUTTON,
        size: { x: 128, y: 64 },
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