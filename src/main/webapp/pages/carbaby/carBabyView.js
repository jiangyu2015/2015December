/**
 * jiangyukun on 2015/12/26.
 */
define("carBabyView", ["require"], function () {
    return function (context) {
        var zr = context.zr;
        var CircleShape = context.shape.CircleShape;
        var Sector = context.shape.Sector;
        var IndexSector = context.shape.IndexSector;
        var Index2Sector = context.shape.Index2Sector;

        var PI = Math.PI, PI2 = PI * 2;
        var centerX = context.centerX;
        var centerY = context.centerY;
        var width = context.width;
        var height = context.height;
        var radius = 100;
        var padding = 0.02;

        var shapeContainer = {};

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


        var sectors = [];
        var startAngle = 0;
        var angle = PI2 / 8;
        var textList = ['', '油耗', '', '里程', '', '', '', '费用'];
        for (var i = 0; i < 8; i++) {
            renderSector(i);
        }

        function renderSector(i) {
            setTimeout(function () {
                var transparency = 1 - i * 0.12;
                var endAngle = startAngle + angle - padding;
                var sector = sectors[i] = new Index2Sector({
                    zlevel: 0,
                    style: {
                        x: centerX,
                        y: centerY,
                        startAngle: startAngle + padding,
                        endAngle: endAngle,
                        colorStyle: 'rgba(58, 79, 142, ' + transparency + ')',
                        index1Color: 'rgba(0, 255, 0, 1)',
                        index2Color: 'rgba(255, 0, 0, 1)',
                        borderWidth: width / 8,
                        radius: width / 5,
                        text: textList[i]
                    },
                    hoverable: true,
                    clickable: true,
                    onclick: function () {
                        console.log(1);
                    }
                });
                startAngle += angle;
                zr.addShape(sector);
            }, i * 500);
        }

        shapeContainer.sectors = sectors;
        zr.render();
        //console.log(zr);
        setInterval(function () {
            for (var i = 0; i < sectors.length; i++) {
                var sector = sectors[i];
                if (sector.animation || sector.animation2) {
                    sector.__dirty = true;
                }
            }
            zr.refresh();
        }, 20);
        $('#testBtn').click(function () {
            sectors[0].open();
        });
        $('#testBtnClose').click(function () {
            sectors[0].close();
        });
    };
});
