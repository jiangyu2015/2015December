/**
 * jiangyukun on 2015/12/26.
 */
+function () {
    var zrenderPath = '../../car/js/canvas/zrender';
    var Cellular = '../../car/js/canvas/custom/Cellular';
    var carBabyView = '../../car/js/carbaby/carBabyView';
    require.config({
        paths: {
            'zrender': zrenderPath,
            'zrender/shape/Util': zrenderPath,
            'zrender/shape/Base': zrenderPath,
            'zrender/shape/Circle': zrenderPath,
            'zrender/shape/Text': zrenderPath,
            'zrender/shape/Line': zrenderPath,
            'zrender/shape/Image': zrenderPath,
            'zrender/shape/BezierCurve': zrenderPath,

            'zrender/shape/Cellular': zrenderPath,
            'carBabyView': carBabyView
        }
    });

    require([
        'zrender',
        'zrender/shape/Line',
        'zrender/shape/Circle',
        'zrender/shape/Text',
        'zrender/shape/Image',
        'zrender/shape/BezierCurve',
        'zrender/shape/Cellular',
        'carBabyView'
    ], function (zrender) {
        var LineShape = require('zrender/shape/Line');
        var CircleShape = require('zrender/shape/Circle');

        var CellularShape = require('zrender/shape/Cellular');
        var carBabyView = require('carBabyView');


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
                CellularShape: CellularShape
            },
            width: width,
            height: height,
            centerX: centerX,
            centerY: centerY
        });
    });
}();