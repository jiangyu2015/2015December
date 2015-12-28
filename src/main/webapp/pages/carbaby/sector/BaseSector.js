/**
 * jiangyukun on 15/12/27.
 */

define("BaseSector", ["require", 'zrender/tool/util'], function (require) {
    var Base = require('zrender/shape/Base');
    var util = require('zrender/tool/util');

    var PI = Math.PI;
    var cos = Math.cos, sin = Math.sin, asin = Math.asin;
    var BaseSector = function (options) {
        this.brushTypeOnly = 'stroke';
        this.startAnimation = false;
        this.currentMoveLength = 0;
        this.maxMoveLength = 25;
        Base.call(this, options);
    };
    BaseSector.prototype = {
        type: 'base_sector',
        buildPath: function (ctx, style) {
            var i, j;
            var startAngle = 2 * PI - style.startAngle;
            var endAngle = 2 * PI - style.endAngle;
            var middleAngle = (startAngle + endAngle) / 2;
            var centerPosition = this.getCenterPosition(style, middleAngle);
            var x = centerPosition.x;
            var y = centerPosition.y;
            var text = style.sectorText;
            var borderWidth = style.borderWidth;
            var colorStyle = style.colorStyle;
            if (this.startAnimation && style.sectorText) {
                // rgba(57, 79, 141, 0.22)
                for (i = colorStyle.length - 1; i > 0; i--) {
                    if (colorStyle[i] == ',') {
                        colorStyle = colorStyle.substring(0, i) + ', 1)';
                        break;
                    }
                }
            }
            var radius = style.radius;

            for (j = 0; j < borderWidth; j += 0.2) {
                ctx.beginPath();
                ctx.arc(x, y, radius + j, startAngle, endAngle, true);
                ctx.strokeStyle = colorStyle;
                ctx.stroke();
            }

            // 文字
            if (!text || text.length == 0) {
                return;
            }
            ctx.font = borderWidth / 2 + "px Verdana";
            var textCenterAngle = (startAngle + endAngle) / 2;

            var textWidth = ctx.measureText(text).width;
            var textStartAngle = textCenterAngle - asin((textWidth / 2) / radius);
            //console.log('startAngle ' + startAngle + ' endAngle ' + endAngle);
            for (i = 0; i < text.length; i++) {
                ctx.save();
                var currentTextAngle = textStartAngle;
                var txt_i = text[i];
                var txt_i_width = ctx.measureText(txt_i).width;

                currentTextAngle += asin((txt_i_width / 2) / radius);
                var targetX = x + cos(currentTextAngle) * (radius + borderWidth / 4);
                var targetY = y + sin(currentTextAngle) * (radius + borderWidth / 4);
                ctx.translate(targetX, targetY);
                ctx.rotate(PI / 2 + currentTextAngle);
                ctx.fillStyle = "#fff";
                ctx.fillText(txt_i, -txt_i_width / 2, -borderWidth / 8);
                textStartAngle += asin(txt_i_width / radius);
                ctx.restore();
            }
        },
        getRect: function (style) {
            if (style.__rect) {
                return style.__rect;
            }
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        },
        open: function () {
            var self = this;
            var id = setInterval(function () {
                if (self.currentMoveLength < self.maxMoveLength) {
                    self.currentMoveLength += 1;
                    self.__dirty = true;
                } else {
                    clearInterval(id);
                }
            }, 0);
        },
        close: function () {
            var self = this;
            var id = setInterval(function () {
                if (self.currentMoveLength > 0) {
                    self.currentMoveLength--;
                    self.__dirty = true;
                } else {
                    clearInterval(id);
                }
            }, 0);
        },
        getCenterPosition: function (style, angle) {
            return {
                x: style.x + this.currentMoveLength * cos(angle),
                y: style.y + this.currentMoveLength * sin(angle)
            };
        }
    };
    util.inherits(BaseSector, Base);
    return BaseSector;
});
