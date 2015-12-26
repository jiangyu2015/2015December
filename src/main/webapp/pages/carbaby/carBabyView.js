/**
 * jiangyukun on 2015/12/26.
 */
define("carBabyView", ["require"], function () {
    return function (context) {
        var zr = context.zr;
        var CircleShape = context.shape.CircleShape;
        var CellularShape = context.shape.CellularShape;

        var PI = Math.PI, PI2 = PI * 2;
        var centerX = context.centerX;
        var centerY = context.centerY;
        var radius = 50;
        var padding = 0.02;

        var shapeContainer = {};

        var sectors = [];
        var startAngle = 0;
        var angle = PI2 / 8;
        var textList = ['', '油耗', '', '里程', '', '', '', '费用'];
        for (var i = 0; i < 8; i++) {
            var transparency = 1 - i * 0.1;
            var endAngle = startAngle + angle - padding;
            var sector = sectors[i] = new CellularShape({
                zlevel: 0,
                style: {
                    x: centerX,
                    y: centerY,
                    startAngle: startAngle + padding,
                    endAngle: endAngle,
                    colorStyle: 'rgba(58, 79, 142, ' + transparency + ')',
                    borderWidth: 50,
                    radius: 100,
                    text: textList[i]
                },
                hoverable: false
            });
            startAngle += angle;
            zr.addShape(sector);
        }

        shapeContainer.sectors = sectors;

    };
});