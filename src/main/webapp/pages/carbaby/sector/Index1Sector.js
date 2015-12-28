/**
 * jiangyukun on 15/12/27.
 */
define("Index1Sector", ["require", 'BaseSector', 'zrender/tool/util'], function (require) {
    var BaseSector = require('BaseSector');
    var util = require('zrender/tool/util');

    var PI = Math.PI;
    var cos = Math.cos, sin = Math.sin, asin = Math.asin;

    var IndexSector = function (options) {
        this.brushTypeOnly = 'stroke';
        this.currentIndexAngle = 0;
        this.animation1 = true;
        BaseSector.call(this, options);
    };
    IndexSector.prototype = {
        type: 'index_sector',
        buildPath: function (ctx, style) {
            BaseSector.prototype.buildPath.call(this, ctx, style);

            var i;
            var text = style.text;
            var startAngle = 2 * PI - style.startAngle;
            var endAngle = 2 * PI - style.endAngle;
            var middleAngle = (startAngle + endAngle) / 2;
            var centerPosition = this.getCenterPosition(style, middleAngle);
            var x = centerPosition.x;
            var y = centerPosition.y;
            var deltaAngle = startAngle - endAngle;
            var borderWidth = style.borderWidth;
            var index1Color = style.index1Color;
            var radius = style.radius + borderWidth + 5;

            // 开始动画
            if (this.startAnimation) {
                if (!style.sectorText) {
                    this.animation1 = false;
                    return;
                }
                var maxAngle = deltaAngle / 3;
                var anglePer = maxAngle / 10;

                for (i = 0; i < 4; i += 0.2) {
                    ctx.beginPath();
                    ctx.arc(x, y, radius + i, startAngle, startAngle - this.currentIndexAngle, true);
                    ctx.strokeStyle = index1Color;
                    ctx.stroke();
                }
                if (this.currentIndexAngle < maxAngle) {
                    this.currentIndexAngle += anglePer;
                } else {
                    this.animation1 = false;
                }
            }
            // 结束动画
        }
    };
    util.inherits(IndexSector, BaseSector);
    return IndexSector;
});
