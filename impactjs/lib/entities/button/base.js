ig.module(
    'entities.button.base'
).requires(
    'impact.entity'
).defines(function () {
    EntityButtonBase = ig.Entity.extend({
        type: ig.Entity.TYPE.BUTTON,
        size: { x: 64, y: 64 },
        buttonEnable: true,
        buttonVisible: true,
        firstClickedFlag: false,

        onPointerOver: null,
        onPointerLeave: null,
        pointerFirstClick: null,
        pointerClicking: null,
        pointerRelease: null,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        pointerOver: function () {
            if (this.pointerOverFlag) return;
            this.pointerOverFlag = true;

            ig.utils.callFunction("onPointerOver", this, true);
        },
        pointerLeave: function () {
            if (!this.pointerOverFlag) return;
            this.pointerOverFlag = false;

            ig.utils.callFunction("onPointerLeave", this, true);

            // If pointer leaver before release
            if (this.firstClickedFlag) {
                this.firstClickedFlag = false;
            }
        },
        pointerFirstClick: function () {
            if (this.firstClickedFlag) return;
            if (!this.canFunction()) return;

            this.firstClickedFlag = true;

            ig.utils.callFunction("onPointerFirstClick", this, true);
        },
        pointerClicking: function () {
            if (!this.firstClickedFlag) return;

            ig.utils.callFunction("onPointerClicking", this, true);
        },
        pointerRelease: function () {
            if (!this.firstClickedFlag) return;
            this.firstClickedFlag = false;
            ig.utils.callFunction("onPointerRelease", this, true);
        },
        canFunction: function () {
            return this.buttonEnable;
        },
        setEnable: function (enable) {
            if (this.buttonEnableOverrideByVisibleFlag) {
                this.buttonEnableOverrideByVisible = enable;
            } else {
                this.buttonEnable = enable;
            }
        },
        setVisible: function (visible) {
            // if not visible then disable the button.
            // when visible set the button enable to previous state
            if (visible) {
                if (this.buttonEnableOverrideByVisibleFlag) {
                    this.buttonEnableOverrideByVisible = true;
                }
                this.buttonEnableOverrideByVisibleFlag = false;

                this.buttonVisible = true;
            } else {
                this.buttonEnableOverrideByVisible = this.buttonEnable;
                this.buttonEnableOverrideByVisibleFlag = true;

                this.buttonVisible = false;
                this.buttonEnable = false
            }
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