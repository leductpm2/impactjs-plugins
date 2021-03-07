ig.module(
    'entities.button.draw'
).requires(
    'entities.button.base'
).defines(function () {
    EntityButtonBase.inject({
        buttonText: "Button",
        buttonTextColor: "grey",
        buttonBackgroundColor: "white",
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
            this.parent();

            ig.canvasDraw.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, {
                roundRadius: Math.min(this.size.x, this.size.y) * 0.1,
                fillStyle: this.buttonBackgroundColor,
            });
            ig.canvasDraw.text(this.buttonText, this.pos.x + this.size.x * 0.5, this.pos.y + this.size.y * 0.5, {
                fillStyle: this.buttonTextColor,
                maxWidth: this.size.x * 0.95
            });
        }
    });
});