ig.module(
    'impact.entity.extends.button.scale'
).requires(
    'impact.entity.extends.button.base'
).defines(function () {
    EntityButtonBase.inject({
        buttonScale: { x: 1, y: 1 },
        buttonScaleState: {
            over: { x: 0.95, y: 0.95 },
            click: { x: 0.9, y: 0.9 },
        },
        getButtonScale: function () {
            var buttonScale = { x: 1, y: 1 };
            if (!this.canFunction()) return;
            if (this.pointerOverFlag) {
                buttonScale = this.buttonScaleState.over;
            }
            if (this.firstClickedFlag) {
                buttonScale = this.buttonScaleState.click;
            }
            return buttonScale;
        },
        draw: function () {
            this.buttonScale = this.getButtonScale();
            var context = ig.system.context;
            context.save();
            ig.canvasDraw.scale(context,
                this.buttonScale.x, this.buttonScale.y,
                this.pos.x, this.pos.y,
                this.size.x, this.size.y);
            this.parent();
            context.restore();
        }
    });
});