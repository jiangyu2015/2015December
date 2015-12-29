/**
 * jiangyukun on 2015/12/29.
 */
define("beginAnimationView", ['require', 'zrender/shape/Image', 'zrender/shape/Circle', 'zrender/Group', 'utils'], function (require) {
    var ImageShape = require('zrender/shape/Image');
    var CircleShape = require('zrender/shape/Circle');
    var Group = require('zrender/Group');
    var utils = require('utils');

    var PI = Math.PI, PI2 = PI * 2;
    return function (context, callback) {
        var zr = context.zr;
        var width = context.width;
        var centerX = context.centerX;
        var centerY = context.centerX;
        var shapeContainer = context.shapeContainer;

        // 车
        var carWidth = 34, carHeight = 14;
        var car = utils.getImageShape(ImageShape, CircleShape, centerX, centerY, carWidth, carHeight, 'images/car-black.png');
        zr.addElement(car);

        zr.animate(car).when(500, {
            scale: [2, 2, centerX, centerY]
        }).done(function () {
            showRadar();
        }).start();

        // 雷达
        function showRadar() {
            var radarRadius = width / 5;
            var radarTen = utils.getImageShape(ImageShape, CircleShape, 0, 0, radarRadius, 'images/radar-ten.png');
            var radar = utils.getImageShape(ImageShape, CircleShape, 0, 0, radarRadius, 'images/radar.png');

            var radarGroup = new Group({
                position: [centerX, centerY]
            });
            radarGroup.addChild(radarTen);
            radarGroup.addChild(radar);
            zr.addElement(radarGroup);

            zr.animate(radarGroup).when(500, {
                rotation: [PI, 0, 0]
            }).done(function () {
                zr.animate(radarGroup).when(500, {
                    rotation: [PI2, 0, 0]
                }).start();
                showRadarDots();
            }).start();

        }

        function showRadarDots() {
            var dotRadius = 7;
            var dot1PositionX = centerX - 35;
            var dot1PositionY = centerY - 40;

            var radarDot1 = utils.getImageShape(ImageShape, CircleShape, dot1PositionX, dot1PositionY, dotRadius, 'images/dot-1.png', 3);

            var dot2PositionX = centerX + 30;
            var dot2PositionY = centerY - 40;
            var radarDot2 = utils.getImageShape(ImageShape, CircleShape, dot2PositionX, dot2PositionY, dotRadius, 'images/dot-2.png', 3);

            var dot3PositionX = centerX + 30;
            var dot3PositionY = centerY - 15;
            var radarDot3 = utils.getImageShape(ImageShape, CircleShape, dot3PositionX, dot3PositionY, dotRadius, 'images/dot-3.png', 3);

            zr.addElement(radarDot1);
            setTimeout(function () {
                zr.addElement(radarDot2);
                setTimeout(function () {
                    zr.addElement(radarDot3);
                    setTimeout(function () {
                        callback();
                    }, 500);
                }, 200);
            }, 200);

        }

        // 雷达
    }
});
