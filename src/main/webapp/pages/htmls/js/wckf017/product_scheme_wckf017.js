/**
 * jiangyukun on 2015/12/18.
 */
+function () {
    var pages = webScroll.init({control: false});
    var start = 0, delta = 500;
    pages.on(function (pageIndex) {
        start = 0;
        switch (pageIndex) {
            case 0:
                page1Animation();
                break;
            case 1:
                page2Animation();
                break;
            case 2:
                page3Animation();
                break;
            case 3:
                page4Animation();
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            default:
                break;
        }
    });

    var animationCss = {
        animation: 'fadeIn .5s'
    };
    var swingCss = {
        animation: 'swing .5s'
    };
    var swingInfiniteCss = {
        animation: 'swing 1s infinite'
    };
    var bounceCss = {
        animation: 'bounce .5s'
    };
    var bounceInfiniteCss = {
        animation: 'bounce 1s infinite'
    };
    var showCss = {
        opacity: '1'
    };

    function animate($ele, css, time) {
        if (time) {
            setTimeout(function () {
                $ele.css(css);
            }, time);
            return;
        }
        $ele.css(css);
    }

    function swing($ele, infinite, time) {
        animate($ele, infinite ? swingInfiniteCss : swingCss, time);
    }

    function bounce($ele, infinite, time) {
        animate($ele, infinite ? bounceInfiniteCss : bounceCss, time);
    }

    function reset($elements) {
        $elements.css('opacity', 0);
    }

    function animation($ele, start, end, callback, infinate) {
        setTimeout(function () {
            $ele.css(animationCss);
        }, start);
        setTimeout(function () {
            $ele.css(showCss);
            if (callback) {
                callback($ele, infinate);
            }
        }, end);
    }

    //page1
    function page1Animation() {
        var $page1TitleImg = $('.page1-title-img');
        var $page1JinZhengEnImg = $('.page1-jin-zheng-en-img');
        var $page1Whereby1 = $('.page1-whereby-1');
        var $page1Whereby2 = $('.page1-whereby-2');
        var $page1Whereby3 = $('.page1-whereby-3');
        var $page1ListenToYou1 = $('.page1-listen-to-you-1');
        var $page1ListenToYou2 = $('.page1-listen-to-you-2');
        reset($page1Whereby1.add($page1Whereby2).add($page1Whereby3).add($page1ListenToYou1).add($page1ListenToYou2));

        swing($page1TitleImg, start);
        start += delta;
        swing($page1JinZhengEnImg, start);
        start += delta;
        animation($page1Whereby1, start, start + delta, swing);
        start += delta;
        animation($page1Whereby2, start, start + delta, swing);
        start += delta;
        animation($page1Whereby3, start, start + delta, swing);
        start += delta;
        animation($page1ListenToYou2, start, start + delta, swing);
        start += delta;
        animation($page1ListenToYou1, start, start + delta, swing);
    }

    // page2
    function page2Animation() {
        var $page2PeopleImg = $('.page2-people-img');
        var $page2Talk1Img = $('.page2-talk1-img');
        var $page2Talk2Img = $('.page2-talk2-img');
        reset($page2PeopleImg.add($page2Talk1Img).add($page2Talk2Img));
        animation($page2PeopleImg, start, start + delta, swing);
        start += delta;
        animation($page2Talk1Img, start, start + delta, swing);
        start += delta;
        animation($page2Talk2Img, start, start + delta, swing);
    }

    function page3Animation() {
        var $page3PeopleImg = $('.page3-people-img');
        var $page3Talk1Img = $('.page3-talk1-img');
        var $page3Talk2Img = $('.page3-talk2-img');
        var $page3LineImg = $('.page3-line-img');
        var $page3Red1Img = $('.page3-red1-img');
        var $page3Red2Img = $('.page3-red2-img');
        var $page3Red3Img = $('.page3-red3-img');

        reset($page3LineImg.add($page3Talk1Img).add($page3Talk2Img).add($page3Red1Img).add($page3Red2Img).add($page3Red3Img));
        swing($page3PeopleImg, start);
        start += delta;
        animation($page3Talk1Img, start, start + delta, swing);
        start += delta;
        animation($page3Talk2Img, start, start + delta, swing);
        start += delta;
        animation($page3Red1Img, start, start + delta, swing);
        start += delta;
        animation($page3Red3Img, start, start + delta, swing);
        start += delta;
        animation($page3Red2Img, start, start + delta, swing);
        start += delta;
        animation($page3LineImg, start, start + delta, swing, true);
    }

    function page4Animation() {
        var $page4CloudImg = $('.page4-cloud-img');
        var $page4ButtonImg = $('.page4-button-img');
        var $page4TalkImg = $('.page4-talk-img');
        var $page4Title1Img = $('.page4-title1-img');
        var $page4Title2Img = $('.page4-title2-img');
        reset($page4TalkImg.add($page4CloudImg).add($page4ButtonImg).add($page4Title1Img).add($page4Title2Img));
        animation($page4Title2Img, start, start + delta, swing);
        start += delta;
        animation($page4Title1Img, start + delta, start + delta * 2);
        start += delta;
        animation($page4TalkImg, start, start + delta, swing);
        start += delta;
        animation($page4CloudImg, start, start + delta, swing);
        start += delta;
        animation($page4ButtonImg, start, start + delta, swing);
    }

    function page5Animation() {
        var $page5TalkImg = $('.page5-talk-img');
        var $page5Red1Img = $('.page5-red1-img');
        var $page5RedLineImg = $('.page5-red-line-img');
        var $page5Red2Img = $('.page5-red2-img');
        var $page5Red3Img = $('.page5-red3-img');
        var $page5Red4Img = $('.page5-red4-img');
        var $page5PeopleImg = $('.page5-people-img');
        var $page5PeopleSweatImg = $('.page5-people-sweat-img');
        var $page5PeopleTalkImg = $('.page5-people-talk-img');
        var $page5TalkLineImg = $('.page5-talk-line-img');
        reset($page5TalkImg.add($page5Red1Img).add($page5RedLineImg).add($page5Red2Img).add($page5Red3Img));
        reset($page5Red4Img.add($page5PeopleImg).add($page5PeopleSweatImg).add($page5PeopleTalkImg).add($page5TalkLineImg));
        animation($page5PeopleImg, start, start + delta, swing);
        start += delta;
        animation($page5TalkLineImg, start, start + delta, swing);
        start += delta;
        animation($page5TalkImg, start, start + delta, swing);
        start += delta;
        animation($page5PeopleSweatImg, start, start + delta, bounce, true);
        start += delta;
        animation($page5RedLineImg, start, start + delta, swing);
        start += delta;
        animation($page5Red1Img, start, start + delta, swing);
        start += delta;
        animation($page5Red2Img, start, start + delta, swing);
        start += delta;
        animation($page5Red3Img, start, start + delta, swing);
        start += delta;
        animation($page5Red4Img, start, start + delta, swing);
        start += delta;
        animation($page5PeopleTalkImg, start, start + delta, swing);
    }

    page5Animation();
}();


// (var \$\w*)-(\w*)-(\w*)
// $1$2$3