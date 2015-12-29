/**
 * jiangyukun on 2015/12/26.
 */
define('carBabyView', ['require', 'beginAnimationView', 'instrumentPanelView', 'topTipView', 'bottomInfoView'], function (require) {
    var beginAnimationView = require('beginAnimationView');
    var instrumentPanelView = require('instrumentPanelView');
    var topTipView = require('topTipView');
    var bottomInfoView = require('bottomInfoView');
    return function (context) {
        var zr = context.zr;

        beginAnimationView(context, function () {
            instrumentPanelView(context, panelChange);
            topTipView(context);
        });

        function panelChange(type, panel) {
            var tipText = panel.style.sectorText + '详情';
            var averageCostText = panel.style.index1Text;
            var myCostText = panel.style.index2Text;
            if (type == 'close') {
                bottomInfoView.remove(context);
            } else if (type == 'opened') {
                bottomInfoView.show(context, tipText, averageCostText, myCostText);
            }
        }

        zr.render();
    };
});
