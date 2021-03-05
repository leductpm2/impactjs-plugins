ig.module(
    'impact.utils.canvas-draw'
).requires(
    'impact.system'
).defines(function () {
    ig.canvasDraw = {
        resetData: function (data) {
            this.ctx = ig.system.context;
            this.systemScale = ig.system.scale;

            this.alpha = 1;
            this.fillStyle = "#000000";
            this.strokeStyle = "#000000";
            this.stroke = true;
            this.fill = true;
            this.roundRadius = { tl: 0, tr: 0, br: 0, bl: 0 };

            this.fontSize = 12;
            this.fontStyle = "Arial";
            this.fontWeight = 'normal'; //[normal, bold, italic]
            this.textAlign = "center"; //"center|end|left|right|start";
            this.textBaseline = "middle"; //"alphabetic|top|hanging|middle|ideographic|bottom";
            this.maxWidth = undefined;

            this.angle = 0;
            this.radius = 10;

            //image
            this.imageScale = { x: 1, y: 1 };
            this.drawOffset = { x: 0, y: 0 };

            //shadow
            this.shadowColor = "rgba(0,0,0,0.75)";
            this.shadowOffsetX = 0;
            this.shadowOffsetY = 0;
        },
        handleData: function (data) {
            this.resetData();
            for (var propertyName in data) {
                var propertyData = data[propertyName];
                switch (propertyName) {
                    case "ctx": { this.ctx = propertyData; } break;
                    case "systemScale": { this.systemScale = propertyData; } break;
                    case "alpha": { this.alpha = propertyData; } break;
                    case "fillStyle": { this.fillStyle = propertyData; } break;
                    case "strokeStyle": { this.strokeStyle = propertyData; } break;
                    case "stroke": { this.stroke = propertyData; } break;
                    case "fill": { this.fill = propertyData; } break;
                    case "roundRadius": {
                        this.roundRadius = {
                            tl: propertyData,
                            tr: propertyData,
                            br: propertyData,
                            bl: propertyData
                        };
                    } break;

                    case "fontWeight": { this.fontWeight = propertyData; } break;
                    case "fontSize": { this.fontSize = propertyData; } break;
                    case "fontStyle": { this.fontStyle = propertyData; } break;
                    case "textAlign": { this.textAlign = propertyData; } break;
                    case "textBaseline": { this.textBaseline = propertyData; } break;
                    case "maxWidth": { this.maxWidth = propertyData; } break;
                    case "angle": { this.angle = propertyData; } break;
                    case "radius": { this.radius = propertyData; } break;

                    case "shadowColor": { this.shadowColor = propertyData; } break;
                    case "shadowOffsetX": { this.shadowOffsetX = propertyData; } break;
                    case "shadowOffsetY": { this.shadowOffsetY = propertyData; } break;
                }
            }
        },
        circle: function (x, y, radius, data) {
            this.handleData(data);
            var ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
            ctx.restore();
        },

        eclipse: function (x, y, width, height, data) {
            this.handleData(data);
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.beginPath();
            ctx.ellipse(x, y, width, height, this.angle, 0, 2 * Math.PI);
            ctx.closePath();
            if (this.fill) {
                ctx.fill();
            }
            if (this.stroke) {
                ctx.stroke();
            }
            ctx.restore();
        },

        roundRect: function (x, y, width, height, data) {
            this.handleData(data);
            var ctx = this.ctx;
            ctx.save();

            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.beginPath();
            ctx.moveTo(x + this.roundRadius.tl, y);
            ctx.lineTo(x + width - this.roundRadius.tr, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + this.roundRadius.tr);
            ctx.lineTo(x + width, y + height - this.roundRadius.br);
            ctx.quadraticCurveTo(x + width, y + height, x + width - this.roundRadius.br, y + height);
            ctx.lineTo(x + this.roundRadius.bl, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - this.roundRadius.bl);
            ctx.lineTo(x, y + this.roundRadius.tl);
            ctx.quadraticCurveTo(x, y, x + this.roundRadius.tl, y);
            ctx.closePath();
            if (this.stroke) {
                ctx.stroke();
            }
            if (this.fill) {
                this.shadow(ctx);
                ctx.fill();
            }

            ctx.restore();
        },

        text: function (text, x, y, data) {
            this.handleData(data);
            var ctx = this.ctx;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = this.textBaseline;
            ctx.font = this.fontWeight + " " + this.fontSize + "px" + " " + this.fontStyle;
            ctx.fillStyle = this.fillStyle;
            ctx.fillText(text, x, y, this.maxWidth);
            ctx.textAlign = "left";
            var metrics = ctx.measureText(text);
            ctx.restore();
            return metrics.width;
        },

        textMultiLine: function (text, x, y, data) {
            this.handleData(data);
            var ctx = this.ctx;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = this.textBaseline;
            ctx.font = this.fontWeight + " " + this.fontSize + "px" + " " + this.fontStyle;
            ctx.fillStyle = this.fillStyle;

            var textLines = text.split("<br>");
            var lineHeight = this.fontSize;
            for (var i = 0; i < textLines.length; i++) {
                line = textLines[i];
                ctx.fillText(line, x, y + i * lineHeight, this.maxWidth);
            }
            ctx.restore();
        },
        shadow: function (ctx) {
            ctx.shadowColor = this.shadowColor;
            ctx.shadowOffsetX = this.shadowOffsetX;
            ctx.shadowOffsetY = this.shadowOffsetY;
        },
        image: function (image, x, y, data) {
            this.handleData(data);
            var ctx = this.ctx;
            ctx.save();

            var width = image.width;
            var height = image.height;
            var originX = x + (image.width / 2);
            var originY = x + (image.height / 2);

            ctx.translate(originX * this.systemScale, originY * this.systemScale);
            ctx.scale(this.imageScale.x, this.imageScale.y);
            ctx.translate(-originX * this.systemScale, -originY * this.systemScale);
            ctx.drawImage(
                image.data,
                0, 0,
                width, height,
                x + this.drawOffset.x, y + this.drawOffset.y,
                width, height
            );

            ctx.restore();
        }
    };
});


