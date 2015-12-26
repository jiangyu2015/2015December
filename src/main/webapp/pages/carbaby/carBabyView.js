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
        var padding = 0.1;

        var shapeContainer = {};
        /*var circle = shapeContainer.circle = new CircleShape({
            zlevel: 0,
            style: {
                x: centerX,
                y: centerY,
                r: radius,
                brushType: 'stroke',
                strokeColor: 'rgba(106, 205, 240, 0.8)',
                lineWidth: 30
            },
            hoverable: false
        });*/

        var sectors = [];
        var startAngle = 0;
        var angle = PI2 / 8;
        for (var i = 0; i < 8; i++) {
            var sector = sectors[i] = new CellularShape({
                zlevel: 0,
                style: {
                    x: centerX,
                    y: centerY,
                    startAngle: startAngle + padding,
                    endAngle: startAngle + angle - padding,
                    colorStyle: 'rgba(106, 205, 240, 0.8)',
                    borderWidth: 30,
                    radius: 100
                },
                hoverable: false
            });
            startAngle += angle;
            zr.addShape(sector);
        }

        shapeContainer.sectors = sectors;

    };
});