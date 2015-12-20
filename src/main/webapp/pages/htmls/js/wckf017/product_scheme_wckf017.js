/**
 * jiangyukun on 2015/12/18.
 */

+function () {
    webScroll.init({control: false});

    var $page1Whereby1 = $('.page1-whereby-1');
    var $page1Whereby2 = $('.page1-whereby-2');
    var $page1Whereby3 = $('.page1-whereby-3');
    var $page1ListenToYou1 = $('.page1-listen-to-you-1');
    var $page1ListenToYou2 = $('.page1-listen-to-you-2');

    var animationCss = {
        animation: ':fadeIn .5s'
    };
    var showCss = {
        opacity: '1'
    };

    var start = 0, delta = 500;

    animation($page1Whereby1, start, start + delta);
    start += delta;
    animation($page1Whereby2, start, start + delta);
    start += delta;
    animation($page1Whereby3, start, start + delta);
    start += delta;
    animation($page1ListenToYou2, start, start + delta);
    start += delta;
    animation($page1ListenToYou1, start, start + delta);

    function animation($ele, start, end) {
        setTimeout(function () {
            $ele.css(animationCss);
        }, start);
        setTimeout(function () {
            $ele.css(showCss);
        }, end);
    }

}();
