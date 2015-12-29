/**
 * jiangyukun on 2015/12/26.
 */
define('carBabyView', ['require', 'beginAnimationView', 'instrumentPanelView', 'topTipView'], function (require) {
    var beginAnimationView = require('beginAnimationView');
    var instrumentPanelView = require('instrumentPanelView');
    var topTipView = require('topTipView');
    return function (context) {
        var zr = context.zr;

        beginAnimationView(context, function () {
            instrumentPanelView(context);
            topTipView(context);
        });

        zr.render();
    };
});
