ig.module(
    'plugins.anchor-position'
).requires(
    'impact.system',
    'impact.layer',
    'impact.entity'
).defines(function () {
    AnchorPosition = {
        // System anchor
        systemStartAt: { x: 0, y: 0 },
        toAnchorPosition: function (anchorOnObject, anchorType) {           
            var newPosition = {
                x: this.systemStartAt.x,
                y: this.systemStartAt.y
            };
            var x = this.systemStartAt.x;
            var y = this.systemStartAt.y;
            var width = ig.system.width;
            var height = ig.system.height;
            if (anchorOnObject) {
                if (typeof anchorOnObject.size !== "undefined") {
                    width = anchorOnObject.size.x;
                    height = anchorOnObject.size.y;
                }
                if (typeof anchorOnObject.pos !== "undefined") {
                    x = anchorOnObject.pos.x;
                    y = anchorOnObject.pos.y;
                }
            }

            switch (anchorType) {
                case "top-left": case "left-top": {
                    newPosition.x = x;
                    newPosition.y = y;
                } break;
                case "top-center": case "center-top": case "top": {
                    newPosition.x = x + width * 0.5;
                    newPosition.y = y;
                } break;
                case "top-right": case "right-top": {
                    newPosition.x = x + width;
                    newPosition.y = y;
                } break;
                case "left-middle": case "middle-left": case "left": {
                    newPosition.x = x;
                    newPosition.y = y + height * 0.5;
                } break;
                case "center-middle": case "middle-center": case "middle": case "center": {
                    newPosition.x = x + width * 0.5;
                    newPosition.y = y + height * 0.5;
                } break;
                case "right-middle": case "middle-right": case "right": {
                    newPosition.x = x + width;
                    newPosition.y = y + height * 0.5;
                } break;
                case "bottom-left": case "left-bottom": {
                    newPosition.x = x;
                    newPosition.y = y + height;
                } break;
                case "bottom-center": case "center-bottom": case "bottom": {
                    newPosition.x = x + width * 0.5;
                    newPosition.y = y + height * 0.5;
                } break;
                case "bottom-right": case "right-bottom": {
                    newPosition.x = x + width;
                    newPosition.y = y + height;
                } break;
                default: {
                } break;
            }
            return newPosition;
        },
        // Self anchor          
        toSelfAnchorPosition: function (x, y, selfAnchorType) {
            var newPosition = {
                x: x,
                y: y
            };
            var width = this.size.x;
            var height = this.size.y;
            switch (selfAnchorType) {
                case "top-left": case "left-top": {
                    newPosition.x = x;
                    newPosition.y = y;
                } break;
                case "top-center": case "center-top": case "top": {
                    newPosition.x = x - width * 0.5;
                    newPosition.y = y;
                } break;
                case "top-right": case "right-top": {
                    newPosition.x = x - width;
                    newPosition.y = y;
                } break;
                case "left-middle": case "middle-left": case "left": {
                    newPosition.x = x;
                    newPosition.y = y - height * 0.5;
                } break;
                case "center-middle": case "middle-center": case "middle": case "center": {
                    newPosition.x = x - width * 0.5;
                    newPosition.y = y - height * 0.5;
                } break;
                case "right-middle": case "middle-right": case "right": {
                    newPosition.x = x - width;
                    newPosition.y = y - height * 0.5;
                } break;
                case "bottom-left": case "left-bottom": {
                    newPosition.x = x;
                    newPosition.y = y - height;
                } break;
                case "bottom-center": case "center-bottom": case "bottom": {
                    newPosition.x = x - width * 0.5;
                    newPosition.y = y - height * 0.5;
                } break;
                case "bottom-right": case "right-bottom": {
                    newPosition.x = x - width;
                    newPosition.y = y - height;
                } break;
                default: {

                } break;
            }
            return newPosition;
        },
        anchorType: null,
        anchorOnObject: null,
        selfAnchorType: null,
        update: function () {
            this.pos = this.toAnchorPosition(this.anchorOnObject, this.anchorType);
            this.pos = this.toSelfAnchorPosition(this.pos.x, this.pos.y, this.selfAnchorType);
            this.parent();
        }
    };
    ig.Layer.inject(AnchorPosition);
    ig.Entity.inject(AnchorPosition);
});