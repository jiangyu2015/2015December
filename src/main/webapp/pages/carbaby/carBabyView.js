/**
 * jiangyukun on 2015/12/26.
 */
define("carBabyView", ["require", 'instrumentPanelView'], function (require) {
    var instrumentPanelView = require('instrumentPanelView');
    return function (context) {
        var zr = context.zr;
        var CircleShape = context.shape.CircleShape;

        var PI = Math.PI, PI2 = PI * 2;
        var centerX = context.centerX;
        var centerY = context.centerY;
        var width = context.width;
        var height = context.height;
        var radius = 100;

        instrumentPanelView(context);
        /*var circle = shapeContainer.circle = new CircleShape({
         zlevel: 0,
         style: {
         x: centerX,
         y: centerY,
         r: radius,
         brushType: 'both',
         strokeColor: 'rgba(106, 205, 240, 1)',
         lineWidth: 30
         },
         hoverable: true,
         clickable: true,
         onclick: function () {
         console.log(1);
         }
         });
         zr.addShape(circle);*/

        zr.render();

        $('#testBtn').click(function () {
            //sectors[0].open();
        });
        $('#testBtnClose').click(function () {
            //sectors[0].close();
        });
    };
});
