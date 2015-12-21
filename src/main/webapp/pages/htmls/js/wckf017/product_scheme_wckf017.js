/**
 * jiangyukun on 2015/12/18.
 */
+function () {
    'use strict';
    var pages = webScroll.init({control: false});
    var start = 0, delta = 500, delta2 = delta * 2;
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
                page5Animation();
                break;
            case 5:
                page6Animation();
                break;
            case 6:
                page7Animation();
                break;
            case 7:
                page8Animation();
                break;
            case 8:
                page9Animation();
                break;
            case 9:
                page10Animation();
                break;
            case 10:
                page11Animation();
                break;
            default:
                break;
        }
    });

    var animationCss = {
        common: {
            fast: '.5',
            medium: '1',
            slow: '1.5',
            animation: 'swing .5s'
        }
    };

    var showCss = {
        opacity: '1'
    };

    function animate($ele, cssOpt, time) {
        if (cssOpt.frequency == true) {
            cssOpt.frequency = 'medium';
        }
        var cssEffect = animationCss[cssOpt.name] || animationCss['common'];

        var second = cssEffect[cssOpt.frequency] || animationCss['common'].medium;
        var cssText = cssOpt.name + ' ' + second + 's';
        if (cssOpt.frequency) {
            cssText += ' infinite';
        }
        if (time) {
            setTimeout(function () {
                $ele.css({animation: cssText});
            }, time);
            return;
        }
        $ele.css({animation: cssText});
    }

    function swing($ele, time, frequency) {
        animate($ele, {frequency: frequency, name: 'swing'}, time);
    }

    function bounce($ele, time, frequency) {
        animate($ele, {frequency: frequency, name: 'bounce'}, time);
    }

    function fadeIn($ele, time, frequency) {
        animate($ele, {frequency: frequency, name: 'fadeIn'}, time);
    }

    // 拍打
    function beat($ele, time, frequency) {
        animate($ele, {frequency: frequency, name: 'zoomOut'}, time);
    }

    function reset($elements) {
        $elements.css('opacity', 0);
    }

    function animation($ele, start, end, callback, frequency) {
        setTimeout(function () {
            $ele.css(animationCss);
        }, start);
        setTimeout(function () {
            $ele.css(showCss);
            if (callback) {
                callback($ele, 0, frequency);
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
        animation($page1Whereby1, start, start + delta, beat);
        start += delta;
        animation($page1Whereby2, start, start + delta, beat);
        start += delta;
        animation($page1Whereby3, start, start + delta, beat);
        start += delta;
        animation($page1ListenToYou2, start, start + delta, beat);
        start += delta;
        animation($page1ListenToYou1, start, start + delta, beat);
    }

    // page2
    function page2Animation() {
        var $page2PeopleImg = $('.page2-people-img');
        var $page2Talk1Img = $('.page2-talk1-img');
        var $page2Talk2Img = $('.page2-talk2-img');
        reset($page2PeopleImg.add($page2Talk1Img).add($page2Talk2Img));
        animation($page2PeopleImg, start, start + delta, swing);
        start += delta2;
        animation($page2Talk1Img, start, start + delta, swing);
        start += delta2;
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
        start += delta2;
        animation($page3Talk1Img, start, start + delta, swing);
        start += delta2;
        animation($page3Talk2Img, start, start + delta, swing);
        start += delta;
        animation($page3LineImg, start, start + delta, fadeIn, 'fast');
        start += delta;
        animation($page3Red1Img, start, start + delta, swing);
        start += delta;
        animation($page3Red3Img, start, start + delta, swing);
        start += delta;
        animation($page3Red2Img, start, start + delta, swing);
    }

    function page4Animation() {
        var $page4CloudImg = $('.page4-cloud-img');
        var $page4ButtonImg = $('.page4-button-img');
        var $page4TalkImg = $('.page4-talk-img');
        var $page4Title1Img = $('.page4-title1-img');
        var $page4Title2Img = $('.page4-title2-img');
        reset($page4TalkImg.add($page4CloudImg).add($page4ButtonImg).add($page4Title1Img).add($page4Title2Img));
        animation($page4Title2Img, start, start + delta, swing);
        start += delta2;
        animation($page4Title1Img, start, start + delta, fadeIn, 'fast');
        start += delta2;
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
        animation($page5TalkLineImg, start, start + delta, fadeIn, true);
        start += delta;
        animation($page5TalkImg, start, start + delta, swing);
        start += delta;
        animation($page5PeopleSweatImg, start, start + delta, bounce, true);
        start += delta;
        animation($page5RedLineImg, start, start + delta, fadeIn, true);
        start += delta;
        animation($page5Red1Img, start, start + delta, swing);
        start += delta;
        animation($page5Red2Img, start, start + delta, swing);
        start += delta;
        animation($page5Red3Img, start, start + delta, swing);
        start += delta;
        animation($page5Red4Img, start, start + delta, swing);
        start += delta;
        animation($page5PeopleTalkImg, start, start + delta, swing, 'slow');
    }

    function page6Animation() {
        var $page6TalkImg = $('.page6-talk-img');
        var $page6TitleImg = $('.page6-title-img');
        var $page6Title2Img = $('.page6-title2-img');
        var $page6TitleLineImg = $('.page6-title-line-img');
        var $page6BtnImg = $('.page6-btn-img');

        reset($page6TalkImg.add($page6TitleImg).add($page6Title2Img).add($page6BtnImg).add($page6TitleLineImg));
        animation($page6TitleImg, start, start + delta, swing);
        start += delta2;
        animation($page6Title2Img, start, start + delta, fadeIn, true);
        start += delta2;
        animation($page6TitleLineImg, start, start + delta, fadeIn, 'fast');
        start += delta2;
        animation($page6TalkImg, start, start + delta, swing);
        start += delt2a;
        animation($page6BtnImg, start, start + delta, swing);
    }

    function page7Animation() {
        var $page7PeopleImg = $('.page7-people-img');
        var $page7Title1Img = $('.page7-title1-img');
        var $page7Title2Img = $('.page7-title2-img');
        var $page7Title3Img = $('.page7-title3-img');

        reset($page7PeopleImg.add($page7Title1Img).add($page7Title2Img).add($page7Title3Img));
        animation($page7PeopleImg, start, start + delta, swing);
        start += delta;
        animation($page7Title1Img, start, start + delta, swing);
        start += delta * 2;
        animation($page7Title2Img, start, start + delta, swing);
        start += delta * 2;
        animation($page7Title3Img, start, start + delta, swing);
    }

    function page8Animation() {
        var $page8PeopleLeftDownImg = $('.page8-people-left-down-img');
        var $page8PeopleRightUpImg = $('.page8-people-right-up-img');
        var $page8Talk1Img = $('.page8-talk1-img');
        var $page8Talk2Img = $('.page8-talk2-img');

        reset($page8PeopleLeftDownImg.add($page8PeopleRightUpImg).add($page8Talk1Img).add($page8Talk2Img));
        animation($page8PeopleRightUpImg, start, start + delta, swing);
        start += delta2;
        animation($page8Talk1Img, start, start + delta, swing);
        start += delta2;
        animation($page8PeopleLeftDownImg, start, start + delta, swing);
        start += delta2;
        animation($page8Talk2Img, start, start + delta, swing);
    }

    function page9Animation() {
        var $page9PeopleImg = $('.page9-people-img');
        var $page9TalkImg = $('.page9-talk-img');

        reset($page9PeopleImg.add($page9TalkImg));
        animation($page9PeopleImg, start, start + delta, swing);
        start += delta2;
        animation($page9TalkImg, start, start + delta, swing);
    }

    function page10Animation() {
        var $page10TalkImg = $('.page10-talk-img');
        var $page10TitleImg = $('.page10-title-img');
        var $page10Title2Img = $('.page10-title2-img');
        var $page10TitleLineImg = $('.page10-title-line-img');
        var $page10TtnImg = $('.page10-btn-img');

        reset($page10TalkImg.add($page10TitleImg).add($page10Title2Img).add($page10TitleLineImg).add($page10TtnImg));
        animation($page10TitleImg, start, start + delta, swing);
        start += delta2;
        animation($page10Title2Img, start, start + delta, fadeIn, 'medium');
        start += delta2;
        animation($page10TitleLineImg, start, start + delta, fadeIn, 'fast');
        animation($page10TalkImg, start, start + delta, swing);
        start += delta2;
        animation($page10TtnImg, start, start + delta, swing);
    }

    function page11Animation() {
        var $page11FirstLetterImg = $('.page11-first-letter-img');
        var $page11ShareMeetingImg = $('.page11-share-meeting-img');
        var $page11BtnImg = $('.page11-btn-img');
        var $page11BusinessCardRanking = $('.page11-business-card-ranking');

        reset($page11FirstLetterImg.add($page11ShareMeetingImg).add($page11BtnImg).add($page11BusinessCardRanking));
        animation($page11FirstLetterImg, start, start + delta, swing);
        start += delta2;
        animation($page11ShareMeetingImg, start, start + delta, swing);
        start += delta2;
        animation($page11BusinessCardRanking, start, start + delta, swing);
        start += delta2;
        animation($page11BtnImg, start, start + delta, swing);
    }

    page1Animation();
    //page11Animation();
}();


// (var \$\w*)-(\w*)-(\w*)
// $1$2$3
// var $ = $('.');