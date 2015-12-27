/**
 * jiangyukun on 15/12/27.
 */
define("Index2Sector", ["require", 'IndexSector', 'zrender/tool/util'], function (require) {
    var IndexSector = require('IndexSector');
    var util = require('zrender/tool/util');

    var PI = Math.PI;
    var cos = Math.cos, sin = Math.sin, asin = Math.asin;

    var Index2Sector = function (options) {
        this.currentIndex2Angle = 0;
        this.animation2 = true;
        IndexSector.call(this, options);
    };
    Index2Sector.prototype = {
        type: 'index_sector',
        buildPath: function (ctx, style) {
            IndexSector.prototype.buildPath.call(this, ctx, style);

            var i;
            var startAngle = 2 * PI - style.startAngle;
            var endAngle = 2 * PI - style.endAngle;
            var middleAngle = (startAngle + endAngle) / 2;
            var centerPosition = this.getCenterPosition(style, middleAngle);
            var x = centerPosition.x;
            var y = centerPosition.y;
            var deltaAngle = startAngle - endAngle;
            var borderWidth = style.borderWidth;
            var index1Color = style.index2Color;
            var radius = style.radius + borderWidth + 15;

            var maxAngle = deltaAngle / 6;
            var anglePer = maxAngle / 20;

            for (i = 0; i < 4; i += 0.2) {
                ctx.beginPath();
                ctx.arc(x, y, radius + i, startAngle, startAngle - this.currentIndex2Angle, true);
                ctx.strokeStyle = index1Color;
                ctx.stroke();
            }
            if (!this.animation) {
                if (this.currentIndex2Angle < maxAngle) {
                    this.currentIndex2Angle += anglePer;
                } else {
                    this.animation2 = false;
                }
            }
        }
    };
    util.inherits(Index2Sector, IndexSector);
    return Index2Sector;
});
