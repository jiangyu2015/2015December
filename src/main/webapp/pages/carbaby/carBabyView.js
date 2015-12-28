/**
 * jiangyukun on 2015/12/26.
 */
define('carBabyView', ['require', 'instrumentPanelView', 'topTipView'], function (require) {
    var instrumentPanelView = require('instrumentPanelView');
    var topTipView = require('topTipView');
    return function (context) {
        var zr = context.zr;

        instrumentPanelView(context);
        topTipView(context);

        zr.render();
    };
});
