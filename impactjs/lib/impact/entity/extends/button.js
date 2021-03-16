ig.module(
    'impact.entity.extends.button'
).requires(
    'impact.entity.extends.button.base',
    'impact.entity.extends.button.draw',
    'impact.entity.extends.button.scale'
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