/**
 * jiangyukun on 2015/12/26.
 */
$(function () {
    var zrenderPath = 'lib/zrender-original';
    var carBabyView = 'carBabyView';
    var beginAnimationView = 'beginAnimationView';
    var topTipView = 'topTipView';
    var instrumentPanelView = 'instrumentPanelView';

    var sectorBaseDir = 'sector/';
    var BaseSector = sectorBaseDir + 'BaseSector';
    var Index1Sector = sectorBaseDir + 'Index1Sector';
    var Index2Sector = sectorBaseDir + 'Index2Sector';
    var utils = 'utils';
    require.config({
        paths: {
            'zrender': zrenderPath,
            'zrender/tool/util': zrenderPath,
            'zrender/shape/Base': zrenderPath,
            'zrender/shape/Circle': zrenderPath,
            'zrender/shape/Text': zrenderPath,
            'zrender/shape/Line': zrenderPath,
            'zrender/shape/Image': zrenderPath,
            'zrender/shape/BezierCurve': zrenderPath,
            'zrender/Group': zrenderPath,

            'beginAnimationView': beginAnimationView,
            'topTipView': topTipView,
            'instrumentPanelView': instrumentPanelView,
            'carBabyView': carBabyView,
            'BaseSector': BaseSector,
            'Index1Sector': Index1Sector,
            'Index2Sector': Index2Sector,
            'utils': utils
        }
    });

    require(['zrender', 'carBabyView'], function (zrender, carBabyView) {
        var zr = zrender.init(document.getElementById('carInfoCanvas'));
        var width = Math.ceil(zr.getWidth());
        var height = Math.ceil(zr.getHeight());

        var centerX = width / 2;
        var centerY = height / 2;
        carBabyView({
            zr: zr,
            width: width,
            height: height,
            centerX: centerX,
            centerY: centerY,
            shapeContainer: {},
            color: {
                baseColor1: 'rgba(0, 190, 113, 1)',
                baseColor2: 'rgba(236, 105, 65, 1)'
            }
        });
    });
});