/**
 * jiangyukun on 2015/12/28.
 */
define("instrumentPanelView", ["require"], function (require) {
    var Index2Sector = require('Index2Sector');
    var PI = Math.PI, PI2 = PI * 2;

    return function (context) {
        var zr = context.zr;
        var width = context.width;
        var centerX = context.centerX;
        var centerY = context.centerY;
        var shapeContainer = context.shapeContainer;

        var sectors = [], sectorCount = 8, padding = 0.02;
        var angle = PI2 / 8;
        var startAngleList = [angle, angle * 2, angle * 3, angle * 4, angle * 5, angle * 6, angle * 7, 0];
        var textList = ['油耗', '', '里程', '', '', '', '费用', ''];
        var transparencyList = [0.38, 0.34, 0.3, 0.26, 0.22, 0.18, 0.14, 0.1];
        var timeList = [150, 300, 450, 650, 850, 1100, 1350, 1650];
        for (var i = 0; i < sectorCount; i++) {
            renderSector(i, sectorCount);
        }

        shapeContainer.instrumentPanel = sectors;

        function renderSector(i, total) {
            setTimeout(function () {
                var startAngle = startAngleList[i];
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
                zr.addShape(sector);
                if (i == total - 1) {
                    sectorLoaded(total);
                }
            }, timeList[i]);
        }

        // 指标动画
        function sectorLoaded(total) {
            nextSectorAnimation(0, total);
        }

        // 下一个指标动画
        function nextSectorAnimation(i, total) {
            if (i == total) {
                return;
            }
            var sector = sectors[i];
            sector.startAnimation = true;
            var sectorIndexAnimationId = setInterval(function () {
                if (sector.animation1 || sector.animation2) {
                    sector.modSelf();
                    zr.refresh();
                } else {
                    clearInterval(sectorIndexAnimationId);
                    if (i < total) {
                        nextSectorAnimation(i + 1, total);
                    }
                }
            }, 20);
        }
    }
});
