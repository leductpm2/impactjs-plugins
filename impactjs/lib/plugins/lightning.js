ig.module(
    'plugins.lightning'
).requires(
).defines(function () {
    VectorLightning = function (x, y, x1, y1) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
    };
    VectorLightning.prototype = {
        dX: function () { return this.x1 - this.x; },
        dY: function () { return this.y1 - this.y; },
        Normalized: function () {
            var l = this.Length();
            return new VectorLightning(this.x, this.y, this.x + (this.dX() / l), this.y + (this.dY() / l));
        },
        Length: function () {
            return Math.sqrt(Math.pow(this.dX(), 2) + Math.pow(this.dY(), 2));
        },
        Multiply: function (n) {
            return new VectorLightning(this.x, this.y, this.x + this.dX() * n, this.y + this.dY() * n);
        },
        Clone: function () {
            return new VectorLightning(this.x, this.y, this.x1, this.y1);
        }
    };

    Lightning = function (config) {
        config = {
            Threshold: 1,//0-1
            Segments: 50,//5-100

            GlowColor: "yellow",
            GlowWidth: 10,  //0-200
            GlowBlur: 40,  //0-400,
            GlowAlpha: 30,  //0-50,

            Color: "white",
            Width: 2,//0-5
            Blur: 30, // 0-30
            BlurColor: "black",
            Alpha: 1 // 0-1
        };
        this.config = config;
    };
    Lightning.prototype = {
        Cast: function (context, from, to) {
            context.save();

            if (!from || !to) { return; }
            //Main VectorLightning
            var v = new VectorLightning(from.x1, from.y1, to.x1, to.y1);
            //skip cas if not close enough

            if (this.config.Threshold && v.Length() > context.canvas.width * this.config.Threshold) {
                return;
            }

            var vLen = v.Length();
            var refv = from;
            var lR = (vLen / context.canvas.width)
            //count of segemnets
            var segments = Math.floor(this.config.Segments * lR);
            //lenth of each
            var l = vLen / segments;


            for (var i = 1; i <= segments; i++) {

                //position in the main VectorLightning
                var dv = v.Multiply((1 / segments) * i);

                //add position noise
                if (i != segments) {
                    dv.y1 += l * 0.5 * Math.random() * this.RandomSide();
                    dv.x1 += l * 0.5 * Math.random() * this.RandomSide();
                }

                //new VectorLightning for segment
                var r = new VectorLightning(refv.x1, refv.y1, dv.x1, dv.y1);

                //background blur
                this.Line(context, r, {
                    Color: this.config.GlowColor,
                    With: this.config.GlowWidth * lR,
                    Blur: this.config.GlowBlur * lR,
                    BlurColor: this.config.GlowColor,
                    Alpha: this.Random(this.config.GlowAlpha, this.config.GlowAlpha * 2) / 100

                });

                //main line
                this.Line(context, r, {
                    Color: this.config.Color,
                    With: this.config.Width,
                    Blur: this.config.Blur,
                    BlurColor: this.config.BlurColor,
                    Alpha: this.config.Alpha
                });
                refv = r;
            }

            this.Circle(context, to, lR);
            this.Circle(context, from, lR);
            context.restore();

        },
        Circle: function (context, p, lR) {
            context.beginPath();
            context.arc(p.x1, p.y1, 5, 0, 2 * Math.PI, false);
            // context.arc(p.x1 + Math.random() * 10 * lR * this.RandomSide(), p.y1 + Math.random() * 10 * lR * this.RandomSide(), 5, 0, 2 * Math.PI, false);
            context.fillStyle = 'white';
            context.shadowBlur = 100;
            context.shadowColor = "#2319FF";
            context.fill();
        },
        Line: function (context, v, c) {
            context.beginPath();
            context.strokeStyle = c.Color;
            context.lineWidth = c.With;
            context.moveTo(v.x, v.y);
            context.lineTo(v.x1, v.y1);
            context.globalAlpha = c.Alpha;
            context.shadowBlur = c.Blur;
            context.shadowColor = c.BlurColor;
            context.stroke();
        },
        Random: function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        RandomSide: function () {
            return Math.random() < 0.5 ? -1 : 1;
        },

    }
});
