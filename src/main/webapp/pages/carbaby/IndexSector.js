/**
 * jiangyukun on 15/12/27.
 */
define("IndexSector", ["require", 'Sector', 'zrender/tool/util'], function (require) {
    var Sector = require('Sector');
    var util = require('zrender/tool/util');

    var PI = Math.PI;
    var cos = Math.cos, sin = Math.sin, asin = Math.asin;

    var IndexSector = function (options) {
        this.brushTypeOnly = 'stroke';
        this.currentIndexAngle = 0;
        this.animation = true;
        Sector.call(this, options);
    };
    IndexSector.prototype = {
        type: 'index_sector',
        buildPath: function (ctx, style) {
            Sector.prototype.buildPath.call(this, ctx, style);

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

            var maxAngle = deltaAngle / 3;
            var anglePer = maxAngle / 20;

            for (i = 0; i < 4; i += 0.2) {
                ctx.beginPath();
                ctx.arc(x, y, radius + i, startAngle, startAngle - this.currentIndexAngle, true);
                ctx.strokeStyle = index1Color;
                ctx.stroke();
            }
            if (this.currentIndexAngle < maxAngle) {
                this.currentIndexAngle += anglePer;
            } else {
                this.animation = false;
            }
        }
    };
    util.inherits(IndexSector, Sector);
    return IndexSector;
});
