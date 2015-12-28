/**
 * jiangyukun on 2015/12/26.
 */
$(function () {
    var zrenderPath = 'lib/zrender';
    var carBabyView = 'carBabyView';
    var sectorBaseDir = 'sector/';
    var BaseSector = sectorBaseDir + 'BaseSector';
    var Index1Sector = sectorBaseDir + 'Index1Sector';
    var Index2Sector = sectorBaseDir + 'Index2Sector';
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

            'carBabyView': carBabyView,
            'BaseSector': BaseSector,
            'Index1Sector': Index1Sector,
            'Index2Sector': Index2Sector
        }
    });

    require([
        'zrender',
        'zrender/shape/Line',
        'zrender/shape/Circle',
        'zrender/shape/Text',
        'zrender/shape/Image',
        'zrender/shape/BezierCurve',
        'BaseSector',
        'Index1Sector',
        'Index2Sector',
        'carBabyView'
    ], function (zrender) {
        var LineShape = require('zrender/shape/Line');
        var CircleShape = require('zrender/shape/Circle');

        var carBabyView = require('carBabyView');
        var BaseSector = require('BaseSector');
        var Index1Sector = require('Index1Sector');
        var Index2Sector = require('Index2Sector');

        var zr = zrender.init(document.getElementById('carInfoCanvas'));
        var width = Math.ceil(zr.getWidth());
        var height = Math.ceil(zr.getHeight());

        var centerX = width / 2;
        var centerY = height / 2;

        carBabyView({
            zr: zr,
            shape: {
                LineShape: LineShape,
                CircleShape: CircleShape,
                BaseSector: BaseSector,
                Index1Sector: Index1Sector,
                Index2Sector: Index2Sector
            },
            width: width,
            height: height,
            centerX: centerX,
            centerY: centerY
        });
    });
});