/*jQuery.sas = {
 appid : '${sas.appid}',
 sasWebWebSite:'${sas.website}',
 sasWxsWebSite:'${sas.wxssite}',
 sasTicWebSite:'${sas.ticsite}',
 sasRbsWebSite:'${sas.rbssite}',
 sasTrcWebSite:'${sas.trcsite}',
 sasStaWebSite:'${sas.stasite}',
 sasCmsWebSite:'${sas.cmssite}',
 broker:'${sas.broker}',
 isDebug:false
 };*/

//开发

$.sas = {
    appid: "wx26498b8be3141e48",
    sasWebWebSite: "http://10.137.1.121/ttsales-web",
    sasTicWebSite: "http://10.137.1.121/ttsales-tic",
    sasRbsWebSite: "http://10.137.1.121/ttsales-rbs",
    sasWxsWebSite: "http://10.137.1.121/ttsales-wxs",
    sasTrcWebSite: "http://10.137.1.121/v.js",
    sasStaticSite: "http://10.137.1.121/ttsales-web",
    broker: 'ratan',
    isDebug: false
};
/*
 */
//正式
//jQuery.sas = {
//	appid : "wx835d2880072515a0",
//	sasWebWebSite:"http://uu.ttsales.cn/ttsales-web",
//	sasTicWebSite:"http://uu.ttsales.cn/ttsales-tic",
//	sasRbsWebSite:"http://uu.ttsales.cn/ttsales-rbs",
//	sasWxsWebSite:"http://uu.ttsales.cn/ttsales-wxs",
//	sasTrcWebSite:"http://rt.ttsales.cn/v.js",
//  sasStaticSite:"http://static.ttsales.cn/ttsales-web",
//	broker:'weicheqy',
//	isDebug:false
//};

$.sas.common = {
    getAppid: function () {
        return $.sas.appid;
    },
    getRootPath: function () {
        return this.getSasWebWebSite();
    },
    getSasWebWebSite: function () {
        return $.sas.sasWebWebSite;
    },
    getSasTraWebSite: function () {
        return $.sas.sasTraWebSite;
    },
    getSasRbsWebSite: function () {
        return $.sas.sasRbsWebSite;
    },
    getSasCmsWebSite: function () {
        return '/ttsales-cms';
    },
    getBootStrapTableLanguage: function () {
        var obj = {
            "infoEmpty": "",
            "zeroRecords": "暂无数据！",
            "processing": "正在加载中......",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "emptyTable": "暂无数据！",
            "info": "当前 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "infoFiltered": "数据表中共为 _MAX_ 条记录",
            "search": "查询条件:",
            "paginate": {
                "first": "首页",
                "previous": "上一页",
                "next": "下一页",
                "last": "末页"
            }
        };
        return obj;
    },
    toPage: function (targetPage, options) {
        var t = $(targetPage);
        if (t) {
            if (!options) {
                options = {};
            }
            options.toPage = t;
            $(".pt-page-current").sasPage("toPage", options);
            return t;
        }
        //TODO

    }
};

$.sas.util = {
    showMsg: function (msg, container) {
        if (!jQuery.gritter) {
            return;
        }
        if ($('.my-sticky-class').length > 0) {
            return;
        }

        if (container == null || container == "") {
            container = "body";
        }
        if (!$.gritter.options) {
            $.gritter.options = {
                container: container
            };
        }
        $.gritter.add({
            title: '提示',
            text: msg,
            sticky: false,
            time: 2000,
            position: 'top-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
            class_name: 'my-sticky-class'
        });
    },
    getRequest: function () {
        var url = location.search; // 获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var index = strs[i].indexOf("=");
                theRequest[strs[i].substring(0, index)] = unescape(strs[i].substring(index + 1, strs[i].length));
            }
        }
        return theRequest;
    },
    getUrl: function () {
        var url = window.location.href;
        var index = url.indexOf("?");
        if (index != -1) {
            url = url.substr(0, index);
        }
        return url;
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    },
    getParamByRequest: function (request, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = request.match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    },
    uuid: function (len, radix) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data. At i==19 set the high bits of clock sequence
            // as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('').replace(/-/g, '');
    },
    isNull: function (obj) {
        if (obj == null || obj == "" || obj == "undefined" || obj == "null") {
            return true;
        }
        return false;
    },
    formatDate: function (date, format) {
        var paddNum = function (num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        };
        var getWeekDay = function (d) {
            if (d == 1) {
                return "星期一";
            } else if (d == 2) {
                return "星期二";
            } else if (d == 3) {
                return "星期三";
            } else if (d == 4) {
                return "星期四";
            } else if (d == 5) {
                return "星期五";
            } else if (d == 6) {
                return "星期六";
            } else if (d == 0) {
                return "星期日";
            }
        };
        // 指定格式字符
        var cfg = {
            yyyy: date.getFullYear(), // 年 : 4位
            yy: date.getFullYear().toString().substring(2),// 年 : 2位
            M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
            MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
            d: date.getDate(), // 日 : 如果1位的时候不补0
            dd: paddNum(date.getDate()),// 日 , 如果1位的时候补0
            h: date.getHours(), // 时
            hh: paddNum(date.getHours()), // 时,如果1位的时候补0
            m: date.getMinutes(), // 分
            mm: paddNum(date.getMinutes()), // 分,如果1位的时候补0
            s: date.getSeconds(), // 秒
            ss: paddNum(date.getSeconds()), // 秒 ,如果1位的时候补0
            w: getWeekDay(date.getDay())
            // 周几
        };
        format || (format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function (m) {
            return cfg[m];
        });
    },
    setCookie: function (name, data, expires) {
        $.cookie(name, data, {
            expires: expires,
            path: '/'
        });
    },
    getCookie: function (name) {
        return $.cookie(name);
    }
};

$.sas.weixin = {
    isDebug: $.sas.isDebug || $.sas.util.getUrlParam("debug"),
    toNoWeiXin: function () {
        window.location.replace($.sas.common.getRootPath() + "/pages/noweixin.html");
    },
    onWeixinPageReady: function (onPageReady) {
        var ua = navigator.userAgent.toLowerCase();

        if ($.sas.weixin.isDebug) {
            $(function () {//普通浏览器，开发使用
                onPageReady();
            })
            return;
        }

        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('hideOptionMenu');
                    WeixinJSBridge.call('hideToolbar');
                    onPageReady(WeixinJSBridge);
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('hideOptionMenu');
                    WeixinJSBridge.call('hideToolbar');
                    onPageReady(WeixinJSBridge);
                });
                document.attachEvent('onWeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('hideOptionMenu');
                    WeixinJSBridge.call('hideToolbar');
                    onPageReady(WeixinJSBridge);
                });
            }

            if (ua.match(/MicroMessenger/i) != "micromessenger") {
                setTimeout(function () {
                    if (typeof WeixinJSBridge === "undefined") {
                        $.sas.weixin.toNoWeiXin();
                    }
                }, 300);
            }
        } else {
            WeixinJSBridge.call('hideOptionMenu');
            WeixinJSBridge.call('hideToolbar');
            onPageReady(WeixinJSBridge);
        }
    },
    closeWindow: function (callback) {
        if ($.sas.weixin.isDebug) {
            window.close();
            return;
        }
        WeixinJSBridge.invoke('closeWindow', {}, function (res) {
            //res.err_msg	关闭成功返回“close_window:ok”，关闭失败返回“close_window:error”。
            callback(res);
        });
    },
    hideOptionMenu: function () {
        if ($.sas.weixin.isDebug) {
            return;
        }
        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('hideOptionMenu');
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('hideOptionMenu');
                });
                document.attachEvent('onWeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('hideOptionMenu');
                });
            }
        } else {
            WeixinJSBridge.call('hideOptionMenu');
        }
    },
    showOptionMenu: function () {
        if ($.sas.weixin.isDebug) {
            return;
        }
        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('showOptionMenu');
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('showOptionMenu');
                });
                document.attachEvent('onWeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('showOptionMenu');
                });
            }
        } else {
            WeixinJSBridge.call('showOptionMenu');
        }
    },
    shareFriend: function (callBack, isShareFriend) {
        if ($.sas.weixin.isDebug) {
            return;
        }
        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                        callBack(argv, isShareFriend);
                    });
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                        callBack(argv, isShareFriend);
                    });
                });
                document.attachEvent('onWeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                        callBack(argv, isShareFriend);
                    });
                });
            }
        } else {
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                callBack(argv, isShareFriend);
            });
        }
    },
    shareTimeline: function (callBack, isShareTimeline) {
        if ($.sas.weixin.isDebug) {
            return;
        }
        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:timeline', function (argv) {
                        callBack(argv, isShareTimeline);
                    });
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:timeline', function (argv) {
                        callBack(argv, isShareTimeline);
                    });
                });
                document.attachEvent('onWeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:timeline', function (argv) {
                        callBack(argv, isShareTimeline);
                    });
                });
            }
        } else {
            WeixinJSBridge.on('menu:share:timeline', function (argv) {
                callBack(argv, isShareTimeline);
            });
        }
    },
    shareWeibo: function (callBack, isShareWeibo) {
        if ($.sas.weixin.isDebug) {
            return;
        }
        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:weibo', function (argv) {
                        callBack(argv, isShareWeibo);
                    });
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:weibo', function (argv) {
                        callBack(argv, isShareWeibo);
                    });
                });
                document.attachEvent('onWeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:weibo', function (argv) {
                        callBack(argv, isShareWeibo);
                    });
                });
            }
        } else {
            WeixinJSBridge.on('menu:share:weibo', function (argv) {
                callBack(argv, isShareWeibo);
            });
        }
    },
    //TODO 过期方法
    onWeixinPageOnReady: function (onPageReady, shareFriend, shareTimeline, shareWeibo) {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) != "micromessenger") {
            window.onload = $.sas.isDebug || $.sas.util.getUrlParam("debug") ? onPageReady()
                : function () {
                document.write("请用微信浏览器打开本页面，谢谢！");
            };
            return;
        }
        //当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        if ((typeof WeixinJSBridge) == 'undefined') {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                onPageReady();
                // 发送给好友
                WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                    shareFriend();
                });
                // 分享到朋友圈
                WeixinJSBridge.on('menu:share:timeline', function (argv) {
                    shareTimeline();
                });
                // 分享到微博
                WeixinJSBridge.on('menu:share:weibo', function (argv) {
                    shareWeibo();
                });
            }, false);
        } else {
            onPageReady();
            // 显示菜单按钮
            WeixinJSBridge.call('showOptionMenu');
            // WeixinJSBridge.call('hideOptionMenu');
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                shareFriend();
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function (argv) {
                shareTimeline();
            });
            // 分享到微博
            /*
             WeixinJSBridge.on('menu:share:weibo', function(argv) {
             shareWeibo();
             });
             */
        }
    }
};

$.sas.parse = {
    parseOptions: function (target, opts) {
        var t = $(target);
        var options = {};

        var s = $.trim(t.attr('data-options'));
        if (s) {
            if (s.substring(0, 1) != '{') {
                s = '{' + s + '}';
            }
            options = (new Function('return ' + s))();
        }

        if (opts) {
            if (typeof options == 'string') {
                opts = eval(opts);
            }
            options = $.extend(options, eval(opts));
        }

        return options;
    }
};