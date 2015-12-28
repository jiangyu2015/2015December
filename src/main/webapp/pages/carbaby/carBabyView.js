/**
 * jiangyukun on 2015/12/26.
 */
define("carBabyView", ["require"], function () {
    return function (context) {
        var zr = context.zr;
        var CircleShape = context.shape.CircleShape;
        var Sector = context.shape.Sector;
        var Index1Sector = context.shape.Index1Sector;
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


        var sectors = [], sectorCount = 8;
        var startAngle = 0;
        var angle = PI2 / 8;
        var textList = ['', '油耗', '', '里程', '', '', '', '费用'];
        var transparencyList = [0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15];
        var timeList = [150, 300, 450, 650, 850, 1100, 1350, 1650];
        for (var i = 0; i < sectorCount; i++) {
            renderSector(i, sectorCount);
        }

        function renderSector(i, total) {
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
                        colorStyle: 'rgba(57, 79, 141, ' + transparencyList[i] + ')',
                        index1Color: 'rgba(0, 190, 113, 1)',
                        index2Color: 'rgba(236, 105, 65, 1)',
                        borderWidth: width / 8,
                        radius: width / 5,
                        sectorText: textList[i]
                    },
                    hoverable: true,
                    clickable: true,
                    onclick: function () {
                        console.log(1);
                    }
                });
                startAngle += angle;
                zr.addShape(sector);
                if (i == total - 1) {
                    sectorLoaded();
                }
            }, timeList[i]);
        }

        // 指标动画
        function sectorLoaded() {
            var i;
            for (i = 0; i < sectors.length; i++) {
                sectors[i].startAnimation = true;
            }
            setInterval(function () {
                for (i = 0; i < sectors.length; i++) {
                    var sector = sectors[i];
                    if (sector.animation || sector.animation2) {
                        sector.modSelf();
                    } else {
                        nextSectorAnimation();
                    }
                }
                zr.refresh();
            }, 20);
        }

        // 下一个指标动画
        function nextSectorAnimation() {

        }

        shapeContainer.sectors = sectors;
        zr.render();

        $('#testBtn').click(function () {
            sectors[0].open();
        });
        $('#testBtnClose').click(function () {
            sectors[0].close();
        });
    };
});
