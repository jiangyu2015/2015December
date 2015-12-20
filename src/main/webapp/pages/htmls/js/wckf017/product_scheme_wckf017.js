/**
 * jiangyukun on 2015/12/18.
 */
+function () {
    var pages = webScroll.init({control: false});
    var start = 0, delta = 500;
    pages.on(function (pageIndex) {
        start = 0;
        if (pageIndex == 0) {
            page1Animation();
        } else if (pageIndex == 1) {
            page2Animation();
        }
    });

    var animationCss = {
        animation: ':fadeIn .5s'
    };
    var showCss = {
        opacity: '1'
    };

    function reset($elements) {
        $elements.css('opacity', 0);
    }

    function animation($ele, start, end) {
        setTimeout(function () {
            $ele.css(animationCss);
        }, start);
        setTimeout(function () {
            $ele.css(showCss);
        }, end);
    }

    //page1
    function page1Animation() {
        var $page1Whereby1 = $('.page1-whereby-1');
        var $page1Whereby2 = $('.page1-whereby-2');
        var $page1Whereby3 = $('.page1-whereby-3');
        var $page1ListenToYou1 = $('.page1-listen-to-you-1');
        var $page1ListenToYou2 = $('.page1-listen-to-you-2');

        reset($page1Whereby1.add($page1Whereby2).add($page1Whereby3).add($page1ListenToYou1).add($page1ListenToYou2));
        animation($page1Whereby1, start, start + delta);
        start += delta;
        animation($page1Whereby2, start, start + delta);
        start += delta;
        animation($page1Whereby3, start, start + delta);
        start += delta;
        animation($page1ListenToYou2, start, start + delta);
        start += delta;
        animation($page1ListenToYou1, start, start + delta);
    }

    // page2
    function page2Animation() {
        var $page2PeopleImg = $('.page2-people-img');
        var $page2Talk1Img = $('.page2-talk1-img');
        var $page2Talk2Img = $('.page2-talk2-img');
        reset($page2PeopleImg.add($page2Talk1Img).add($page2Talk2Img));
        animation($page2PeopleImg, start, start + delta);
        start += delta;
        animation($page2Talk1Img, start, start + delta);
        start += delta;
        animation($page2Talk2Img, start, start + delta);
    }

    page1Animation();
}();
