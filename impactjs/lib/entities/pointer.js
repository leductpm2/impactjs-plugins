ig.module(
    'entities.pointer'
).requires(
    'impact.entity',
    'impact.utils.input'
).defines(function () {
    EntityPointer = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.BUTTON,
        size: { x: 1, y: 1 },

        bindings: {
            click: [ig.KEY.MOUSE1]
        },

        isFirstPressed: false,
        isPressed: false,
        isReleased: false,

        objectArray: [],
        objectArrayLastFrame: [],
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            ig.input.initMouse();
            for (var key in this.bindings) {
                this[key] = key;
                for (var i = 0; i < this.bindings[key].length; i++) {
                    ig.input.bind(this.bindings[key][i], key);
                }
            }
        },

        update: function () {
            this.parent();
            this.updatePosition();
            this.handlePointerEventLastFrame();
            this.handlePointerEvent();
            // Only check for the click once per frame, instead of
            // for each entity it touches in the 'check' function
            this.isFirstPressed = ig.input.pressed('click');
            this.isReleased = ig.input.released('click');
            this.isPressed = ig.input.state('click');
        },
        updatePosition: function () {
            this.pos.x = ig.input.mouse.x;
            this.pos.y = ig.input.mouse.y;
        },        
        check: function (other) {
            // push all entity the over to handle later
            this.objectArray.push(other);
        },
        handlePointerEventLastFrame: function () {
            for (var i = 0; i < this.objectArrayLastFrame.length; i++) {
                var object = this.objectArrayLastFrame[i];
                if (!this.objectArray.includes(object)) {
                    ig.utils.callFunction("pointerLeave", object, true);
                }
            }
            // Clear after handled
            this.objectArrayLastFrame = [];
        },
        handlePointerEvent: function () {
            //iterate from hightest entity to lowest           
            for (var i = this.objectArray.length - 1; i >= 0; i--) {
                var object = this.objectArray[i];
                ig.utils.callFunction("pointerOver", object, true);
                this.clickObject(object);
                this.objectArrayLastFrame.push(object);
            }
            // Clear after handled
            this.objectArray = [];
        },
        clickObject: function (object) {
            // if first pressed
            if (this.isFirstPressed) {
                if (typeof (object.pointerFirstClick) == 'function') {
                    object.pointerFirstClick();
                }
            }
            // if pressed
            if (this.isPressed && !this.isReleased) {
                if (typeof (object.pointerClicking) == 'function') {
                    object.pointerClicking();
                }
            }
            // if released
            if (this.isReleased) {
                if (typeof (object.pointerRelease) == 'function') {
                    object.pointerRelease();
                }
            }
        },
    });
});