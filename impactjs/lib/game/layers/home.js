ig.module(
    'game.layers.home'
).requires(
    'impact.game.layer.layer-entities'
).defines(function () {
    LayerHome = ig.LayerEntities.extend({
        init: function (x, y, settings) {
            this.parent(x, y, settings);

            this.buttonPlay = this.spawnEntity(EntityButton, 0, 0, {             
                anchorOnObject: this,
                anchorType: "middle",
                selfAnchorType: "middle",
                buttonText: ig.gameTexts.get("PLAY"),
                onPointerRelease: this.onButtonPlayRelease.bind(this)
            });
            this.buttonSettings = this.spawnEntity(EntityButton, 0, 0, {             
                anchorOnObject: this.buttonPlay,
                anchorOffset: { x: 0, y: ig.gameSettings.get("UI_SPACING") },
                anchorType: "bottom",
                selfAnchorType: "top",
                buttonText: ig.gameTexts.get("SETTINGS"),
                onPointerRelease: this.onButtonSettingsRelease.bind(this)
            });
            this.lightning = new Lightning();
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            // Draw all entities and backgroundMaps           
            ig.canvasDraw.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, {
                fillStyle: ig.gameSettings.get("WHITE_OVERLAY")
            });
            this.parent();
            this.lightning.Cast(ig.system.context, new VectorLightning(0, 0, ig.system.width * 0.25, ig.system.height * 0.5), new VectorLightning(0, 0, ig.system.width * 0.75, ig.system.height * 0.5))

        },
        onButtonPlayRelease: function () {
            this.layerHide();
        },
        onButtonSettingsRelease: function () {
            if (ig.check.defined(ig.game.layerSettings)) ig.game.layerSettings.layerShow();
        }
    });
});
