var ftqc001 = (function () {
    var $reload;
    var params = {
        headImg: '',
        isHasInfo: null
    };// 留资对象

    function init() {
        // loading
        $reload = $("#reload");
        // homePage
        $homePage = $(".homePage");
        initDate();

        hideLoading();
        var page1 = $("#page1");
        page1.hide();
        var page4 = $("#page4"), speakBox = $("#speakBox");
        page4.show();
        speakBox.show();
        page4[0].addEventListener("webkitAnimationEnd", function () {
            initPage4();
        });
    }

    function initDate() {
        $.ajax({
            async: false,
            type: 'POST',
            url: 'ftqc001/initUserInfo.do',
            data: {},
            success: function (data) {
                params.headImg = data.headImg;
                params.isHasInfo = data.isHasInfo;
                var $img = $("#page4 .dialogue .dialogue_move .animateImg .headIcon img");
                $img.each(function () {
                    $(this).attr("src", params.headImg);
                });// 头像改1
            },
            dataType: 'json'
        });
    }

    // loading
    function showLoading() {
        $reload.show();
        var a = setTimeout(function () {
            hideLoading();
            // ftqc001.showHome();
            var page1 = $("#page1");
            page1.hide();
            var page4 = $("#page4"), speakBox = $("#speakBox");
            page4.show();
            speakBox.show();
            page4[0].addEventListener("webkitAnimationEnd", function () {
                initPage4();
            });
        }, 2000);
    }

    function hideLoading() {
        $reload.hide();
    }

    // page4
    function initPage4() {
        // 音频 消息 对话框 // add 消息声音
        var myAudio = document.getElementById("audio");
        myAudio.loop = false;

        var page4 = $("#page4"), speakBox = $("#speakBox");
        var $animateImg = page4.find(".dialogue_animate .animateImg"), $myDialog = $("#speakBox .myDialog");
        var i = 1, len = $animateImg.length;
        var aaa = setTimeout(showImg, 500);

        // commom functions
        function showText(option, index) {// 显示选项文本
            var $showText = $questionGroup.find(".question" + option
                + " .showText");
            $showText.show();
            $showText.find("img").each(function (i) {
                if (i == index) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }

        // ---------------
        // add 消息声音
        function playSound(obj) {
            if (!obj.is(".user")) {
                myAudio.play();
            }
        }

        function playSoundM() {
            myAudio.play();
        }

        // ---------------

        // dialogue_animate
        function showImg() {
            if (i < len) {
                // ---------------
                // add 消息声音
                playSound($($animateImg[i]));
                // ---------------
                $($animateImg[i]).fadeIn(800, function () {
                    i++;
                    if (i == 4) {
                        var a = setTimeout(function () {
                            moreScroll(i);
                        }, 1300);
                        return;
                    }
                    var a = setTimeout(showImg, 1300);
                });
            }
        }

        // 超出后 图片显示方式
        var scrollTop;
        var data_move1 = [136, 258, 213, 252, 201, 226];
        var data_i = 0;

        function moreScroll(index) {
            var a;
            if (index < len) {
                $dialogueScroll.show();
                // ---------------
                // add 消息声音
                playSound($($animateImg[index]));
                // ---------------
                $($animateImg[index]).fadeIn(400);

                scrollTop -= data_move1[data_i];
                var top = scrollTop || -data_move1[data_i];
                scrollTop = top;
                data_i++;
                $dialogueMove.animate({
                    "top": top + "px"
                }, 500, function () {
                    if (data_i == 2) {
                        a = setTimeout(function () {
                            clearTimeout(a);
                            moreScroll(++index);
                        }, 3000);
                        return;
                    }
                    a = setTimeout(function () {
                        moreScroll(++index);
                    }, 1500);
                });
            } else {
                clearTimeout(a);
                initQuestion(scrollTop);
            }
        }

        var $submitBtn = $myDialog.find(".submit");
        $submitBtn.click(function () {
            $myDialog.hide();
            a = setTimeout(function () {
                initQuestion(scrollTop);
            }, 1000);
        });

        // init scroll question
        function initQuestion(param) {
            $dialogueScroll.show();
            var top = param - 258;
            // ---------------
            // add 消息声音
            playSoundM();
            // ---------------
            $dialogueMove.animate({
                "top": top + "px"
            }, 600, function () {
                var a = setTimeout(function () {
                    questionAnswer(top);
                }, 1500);
            });
        }

        var $dialogueMove = page4.find(".dialogue_move"),
            $dialogueScroll = page4.find(".dialogue_scroll"),
            $questionGroup = $("#questionGroup");
        var moveL = 422, moveHeight = 122, boxHeight = 118.5, saveTop;

        function questionAnswer(param) {
            $questionGroup.find(".animation").show();
            $sendBtn.hide();
            $questionGroup.show();
            $questionGroup.find(".question1").show();
            $dialogueScroll.show();
            saveTop += param;
            var top = saveTop - moveL || param - moveL;
            saveTop = top;
            $dialogueMove.animate({
                "top": top + "px"
            }, 500);
        }

        // click img
        var $imgBtn = $questionGroup.find(".question1 .animation .item img"),
            $sendBtn = $questionGroup.find(".question1 .sendBtn"),
            isNeed = false, index;
        // img and send
        $imgBtn.click(function () {
            index = $(this).parent(".item").index();
            showText(1, index);
            if (index == 0) {
                isNeed = true;
            } else {
                isNeed = false;
            }
            $(this).parents(".animation").hide();
            $sendBtn.show();
        });
        $sendBtn.click(function () {
            // 隐藏
            $questionGroup.hide();
            $questionGroup.find(".question1").hide();

            var top = saveTop + moveL;
            $dialogueMove.css("top", top + "px");
            saveTop = top;
            if (!isNeed) {
                $dialogueScroll.find(".que1_02").show();
            } else {
                $dialogueScroll.find(".que1_01").show();
            }
            var data = [142, 142, 114, 243];//偏移量240+3
            var a = setTimeout(function () {
                top1Scroll(data, top, null, 1);
            }, 500);
        });

        // 回答间隔
        var playCount = 1;

        function top1Scroll(param, topVal, number, btn) {
            var topArray = param;
            var len = topArray.length, i = 0;
            xunHuan();
            function xunHuan() {
                if (i < len) {
                    // ---------------
                    // add 消息声音
                    playCount++;
                    if (playCount != 4 && playCount != 6 && playCount != 17 && playCount != 19 && playCount != 28) {
                        playSoundM();
                    }
                    // ---------------
                    var top = topVal - topArray[i];
                    topVal = top;
                    saveTop = top;
                    $dialogueMove.animate({
                        "top": top + "px"
                    }, 450, function () {
                        i++;
                        if (btn && i >= len) {
                            var a = setTimeout(xunHuan, 1000);//hongBao
                            return;
                        }
                        if (btn == 1 && (i == 1 || i == 2)) {
                            var a = setTimeout(xunHuan, 1000);//question1
                            return;
                        }
                        if (btn == 2 && (i == 1 || i == 2)) {
                            var a = setTimeout(xunHuan, 1000);//question2
                            return;
                        }
                        if (btn == 3 && (i == 1 || i == 2)) {
                            var a = setTimeout(xunHuan, 1000);//question3
                            return;
                        }
                        if (number == 2 && i == 5) {
                            var a = setTimeout(xunHuan, 3000);
                            return;
                        }
                        if (number == 3 && i == 7) {
                            var a = setTimeout(xunHuan, 3000);
                            return;
                        }
                        var a = setTimeout(xunHuan, 1350);
                    });
                } else {
                    if (number == 1) {
                        var a = setTimeout(function () {
                            questionAnswer(top);
                        }, 1500);
                    } else if (number == 2) {
                        var a = setTimeout(questionAnswer2, 1500);
                    } else if (number == 3) {
                        var a = setTimeout(questionAnswer3, 1500);
                    }
                    if (btn) {
                        showBtn(btn);
                    }
                }
            }
        }

        // 显示红包Btn
        function showBtn(number) {
            // 用于显示哪个红包按钮
            var obj = speakBox.find(".btn01");
            obj.show();
            obj.click(function () {
                // 对应红包操作界面显示
                if (number == 1 || number == 2) {
                    showPacket01(number);
                } else if (number == 3) {
                    showPacket02();
                }
                // 隐藏按钮
                $(this).hide();
                $(this).unbind("click");
            });
        }

        // 红包一、二
        function showPacket01(number) {
            // 显示红包界面
            // 附加交互——包括再次调用top1Scroll(data, top, 2)方法
            var mask = $(".mask");
            mask.show();
            var quan = $("#quan");
            quan.show();
            var packet1 = $("#packet1");
            packet1.show();
            var openBtn = packet1.find(".openBtn .guide");
            openBtn.click(function () {
                var showClose = packet1.find(".closeBtn");
                showClose.show();
                $(this).unbind("click");
            });
            var closeBtn = packet1.find(".closeBtn .guide");
            closeBtn.click(function () {
                mask.hide();
                quan.hide();
                packet1.hide();
                $(this).parent(".closeBtn").hide();
                if (number == 1) {
                    var data = [80, 214, 186, 203, 339, 198, 220, 195, 224];
                    top1Scroll(data, saveTop, 2);
                } else if (number == 2) {
                    var data = [80, 201, 142, 198, 216, 205, 300, 212, 224];
                    top1Scroll(data, saveTop, 3);
                }
                $(this).unbind("click");
            });
        }

        // 紅包三
        function showPacket02() {
            var mask = $(".mask");
            mask.show();
            var quan = $("#quan");
            quan.show();
            var packet2 = $("#packet2");
            packet2.show();

            // 是否留资了
            if (params.isHasInfo) {
                HasNotInfo();
            } else {
                HasInfo();
            }

            // 需要留资
            function HasInfo() {
                var isLiu = packet2.find(".isLiu");
                var openBtn = packet2.find(".openBtn");
                openBtn.show();
                var dbBtn = openBtn.find(".guide");
                dbBtn.click(function () {
                    isLiu.show();
                    openBtn.hide();
                });

                $("#mobile").bind('input propertychange', function () {
                    var btn = isLiu.find("a");
                    mobile = $("#mobile").val();
                    if ($.sas.util.isNull(mobile)) {
                        if (!btn.is(".notDB")) {
                            btn.addClass('notDB');
                        }
                        return;
                    }
                    if (mobile.length != 11) {
                        if (!btn.is(".notDB")) {
                            btn.addClass('notDB');
                        }
                        return;
                    }
                    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(mobile))) {
                        if (!btn.is(".notDB")) {
                            btn.addClass('notDB');
                        }
                        return;
                    }
                    btn.removeClass('notDB');
                    btn.click(function () {
                        saveInfo();
                        isLiu.hide();
                        details();
                    });
                });
            }

            function saveInfo() {
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: 'ftqc001/saveUserInfo.do',
                    data: {
                        'popularizeId': schemeCommon.getGlobal().popularizeId,
                        'transmitId': schemeCommon.getGlobal().pTransmitId,
                        'schemeId': 'ftqc001',
                        'openId': $.sas.util.getCookie("openId"),
                        'mobile': $("#mobile").val().trim()
                    },
                    success: function (data) {

                    },
                    dataType: 'json'
                });
            }

            // 不用留资
            function HasNotInfo() {
                var isNotLiu = packet2.find(".isNotLiu");
                isNotLiu.show();
                var btn = isNotLiu.find(".guide");
                btn.click(function () {
                    isNotLiu.hide();
                    details();
                });
            }

            // 详情页
            function details() {
                var openPacket = packet2.find(".openPacket");
                openPacket.show();
                var imgBtn = openPacket.find("img");
                imgBtn.click(function () {
                    var index = $(this).index();
                    if (index == 0) {
                        // 分享
                        var share = $("#share");
                        share.show();
                        share.click(function () {
                            $(this).hide();
                            $(this).unbind("click");
                        });
                    } else if (index == 1) {
                        // 经销商
                        initPage5();
                        //page4.hide();
                        page4[0].style.visibility = "hidden";
                        //$questionGroup.hide();
                        $questionGroup[0].style.visibility = "hidden";
                        speakBox.hide();
                        openPacket.hide();
                        packet2.hide();
                        quan.hide();
                        mask.hide();

                        var page5 = $("#page5");
                        var $closeBtn = page5.find(".closeBtn");
                        $closeBtn.click(function () {
                            page5.hide();
                            //page4.show();
                            page4[0].style.visibility = "visible";
                            //$questionGroup.show();
                            $questionGroup[0].style.visibility = "visible";
                            speakBox.show();
                            openPacket.show();
                            packet2.show();
                            quan.show();
                            mask.show();
                        });
                    } else if (index == 2) {
                        // 跳链接
                        window.location.href = "http://m.creatby.com/manage/book/hfcly5/?disableHistoryStart=1&20151104011042735291482=http://qn.media.epub360.com/materials/audio/a2972ade66f64c4f82c0d3c07b2c8936.mp3&20151110011354477443861=http://qn.media.epub360.com/materials/audio/870b6fc68022550f44d707b3a43dcaf0.mp3&20151104010829283747618=http://qn.media.epub360.com/materials/audio/c69cf777bcfe9cd3a92f5edfc9b88254_ayTZY0N.mp3#page/page_13853534097181";
                    }
                });
            }
        }

        // questionAnswer2
        function questionAnswer2() {
            $questionGroup.find(".animation").show();
            $sendBtn2.hide();
            $questionGroup.show();
            $questionGroup.find(".question2").show();
            $dialogueScroll.show();
            var top = saveTop - moveL;
            saveTop = top;
            $dialogueMove.animate({
                "top": top + "px"
            }, 500);
        }

        // click img
        var $imgBtn2 = $questionGroup.find(".question2 .animation .item img"),
            $sendBtn2 = $questionGroup.find(".question2 .sendBtn"),
            isNeed_2 = false, index_2;
        // img and send
        $imgBtn2.click(function () {
            index_2 = $(this).parent(".item").index();
            showText(2, index_2);
            if (index_2 == 0) {
                isNeed_2 = true;
            } else {
                isNeed_2 = false;
            }
            $(this).parents(".animation").hide();
            $sendBtn2.show();
        });
        $sendBtn2.click(function () {
            // 隐藏
            $questionGroup.hide();
            $questionGroup.find(".question2").hide();

            var top = saveTop + moveL;
            $dialogueMove.css("top", top + "px");
            saveTop = top;
            if (!isNeed_2) {
                $dialogueScroll.find(".que2_01").show();
            } else {
                $dialogueScroll.find(".que2_02").show();
            }
            var data = [142, 142, 114, 243];//240+3
            var a = setTimeout(function () {
                top1Scroll(data, top, null, 2);
            }, 500);
        });

        // questionAnswer3
        function questionAnswer3() {
            $questionGroup.find(".animation").show();
            $sendBtn3.hide();
            $questionGroup.show();
            $questionGroup.find(".question3").show();
            $dialogueScroll.show();
            var top = saveTop - moveL;
            saveTop = top;
            $dialogueMove.animate({
                "top": top + "px"
            }, 500);
        }

        // click img
        var $imgBtn3 = $questionGroup.find(".question3 .animation .item .guide"),
            $sendBtn3 = $questionGroup.find(".question3 .sendBtn"),
            isNeed_3 = false, index_3;
        // img and send
        $imgBtn3.click(function () {
            var $showText = $questionGroup.find(".question3 .showText");
            $showText.show();
            $showText.find("img").show();
            $(this).parents(".animation").hide();
            $sendBtn3.show();
        });
        $sendBtn3.click(function () {
            // 隐藏
            $questionGroup.hide();
            $questionGroup.find(".question3").hide();

            var top = saveTop + moveL;
            $dialogueMove.css("top", top + "px");
            saveTop = top;
            var data = [114, 142, 142, 142, 142, 243];//240+3
            var a = setTimeout(function () {
                top1Scroll(data, top, null, 3);
            }, 500);
        });

    }

    // page5
    function initPage5() {
        var page5 = $("#page5");
        page5.show();
        var $phoneBtn = page5.find(".phoneBtn");
        $phoneBtn.click(function () {
            // 分享
            var share = $("#share");
            share.show();
            share.click(function () {
                $(this).hide();
                $(this).unbind("click");
            });
            return false;
        });
    }

    return {
        init: init,
        showLoading: showLoading,
        hideLoading: hideLoading
    };
})();