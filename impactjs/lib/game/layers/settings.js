ig.module(
    'game.layers.settings'
).requires(
    'impact.game.layer.layer-entities'
).defines(function () {
    LayerSettings = ig.LayerEntities.extend({
        title: "",
        init: function (x, y, settings) {
            this.title = ig.gameTexts.get("SETTINGS");
            this.titleTextData = {
                fontSize: Math.round(this.size.x * 0.75 / ig.fonts.get("DEFAULT", "PIXEL_PER_FONT_SIZE", "x")),
                fillStyle: ig.gameSettings.get("TEXT_TITLE_COLOR"),
                textBaseline: "top"
            };

            this.parent(x, y, settings);

            this.buttonHome = this.spawnEntity(EntityButton, 0, 0, {
                anchorOnObject: this,
                anchorType: "bottom",
                selfAnchorType: "bottom",
                buttonText: ig.gameTexts.get("HOME"),
                anchorOffset: { x: 0, y: - ig.gameSettings.get("UI_SPACING") },
                onPointerRelease: function () {
                    this.layerHide();
                }.bind(this)
            });
            // this.buttonSettings = this.spawnEntity(EntityButton, 0, 0, {
            //     anchorOnObject: this.buttonPlay,
            //     anchorOffset: { x: 0, y: ig.gameSettings.get("UI_SPACING") },
            //     anchorType: "bottom",
            //     selfAnchorType: "top",
            //     buttonText: "SETTINGS"

            // });            
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            ig.system.clear(ig.gameSettings.get("BLACK_OVERLAY"));
            ig.canvasDraw.text(this.title, this.pos.x + this.size.x * 0.5, this.pos.y + ig.gameSettings.get("UI_SPACING"), this.titleTextData);
            ig.canvasDraw.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, {
                fillStyle: ig.gameSettings.get("WHITE_OVERLAY")
            });
            this.parent();
        },
        layerShow: function () {
            this.parent();
            ig.game.enablePointerCheckFlagForLayerUnder(this, false);
		},
		layerHide: function () {
            this.parent();
            ig.game.enablePointerCheckFlagForLayerUnder(this, true);
		},
    });
});
