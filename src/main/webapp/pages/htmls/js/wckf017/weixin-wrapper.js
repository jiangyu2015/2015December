/**
 * Created by jiangyukun on 2015/1/14.
 */

if (!window.$) throw new Error('need jQuery or Zepto');
if (!window.wx) throw new Error('need wx');

+function (window, $, wx) {
    var broker = $.sas.broker;
    var b = $.sas.util.getUrlParam('broker');
    if (b != null && b != '') {
        broker = b;
    }
//    var constants = {
//        authentication: $.sas.sasWxsWebSite+'/'+broker+'/jsapi-sign/sign'
//    };
    var constants = {
        authentication: $.sas.sasWebWebSite + '/weixin/jsSDK/getSign.do'
    };
    var isDebug = false;
    var weixin = {}, init = false;
    var userAgent = navigator.userAgent.toLowerCase();
    var x = userAgent.match(/micromessenger\/(\d+\.\d+\.\d+)/) || userAgent.match(/micromessenger\/(\d+\.\d+)/);
    var v = x ? x[1] : "", lessThan6_0_2 = "6.0.2" > v;

    var jsBridgeReady, ready;

    var debugState = function () {
        var href = window.location.href;
        return isDebug || href.indexOf('debug=true') != -1;
    };

    if (userAgent.indexOf('micromessenger') == -1) {
        if (!debugState()) {
            $(function () {
                /*var body = document.getElementsByTagName('body')[0];
                 var children = body.childNodes, i;
                 for (i = 0 ; i < children.length; i++) {
                 children[i].remove();
                 }
                 document.write("请用微信浏览器打开本页面，谢谢！");*/
                try {
                    if (PySchemeLink.getGlobal().isWeixinUrl) {
                        location.replace($.sas.sasCmsWebSite + '/pages/noweixin.html');
                    }
                } catch (e) {
                    location.replace($.sas.sasCmsWebSite + '/pages/noweixin.html');
                }
            });
        }
    }

    weixin.jsBridgeReady = jsBridgeReady = function (callback) {
        if (!window.WeixinJSBridge) {
            setTimeout(function () {
                jsBridgeReady.call(this, callback);
            }, 20);
        } else {
            callback.apply(this, arguments);
        }
    };

    weixin.config = function (configInfo) {
        if (!init) {
            init = true;
            if (lessThan6_0_2) {
                weixin.ready = function (callback) {
                    jsBridgeReady(callback);
                }
            } else {
                if (!wx) {
                    throw new Error('wx don\'t exist');
                }
                weixin.ready = wx.ready;
                $.ajax({
                    type: 'POST',
                    url: constants.authentication,
                    data: {
                        url: configInfo.url || location.href,
                        broker: broker
                    },
                    dataType: 'json',
                    success: function (data) {
                        configInfo.appId = configInfo.appId || data.appId;
                        configInfo.timestamp = configInfo.timestamp || data.timestamp;
                        configInfo.nonceStr = configInfo.nonceStr || data.nonceStr;
                        configInfo.signature = configInfo.signature || data.signature;
                        wx.config(configInfo);
                    }
                });
            }
        }
    };

    //分享到朋友圈
    weixin.onShareTimeline = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            opt = {
                appid: options.appid,
                img_width: options.imgWidth,
                img_height: options.imgHeight,
                img_url: options.imgUrl,
                link: options.link,
                desc: options.desc,
                title: options.title
            };
            dispatchResult = {
                trigger: options.trigger || $.noop,
                success: options.success || $.noop,
                cancel: options.cancel || $.noop,
                fail: options.fail || $.noop
            };
            window.WeixinJSBridge.on('menu:share:timeline', function () {
                if (options.is_share) {
                    window.WeixinJSBridge.invoke('shareTimeline', opt, function (result) {
                        if (result.err_msg == "share_timeline:ok" || result.err_msg == "share_timeline:confirm") {
                            dispatchResult.success.apply(this, arguments);
                        } else if (result.err_msg === 'share_timeline:cancel') {
                            dispatchResult.cancel.apply(this, arguments);
                        } else if (result.err_msg === 'share_timeline:fail') {
                            dispatchResult.fail.apply(this, arguments);
                        }
                    });
                } else {
                    alert("不能分享到朋友圈!");
                    return;
                }

            });
        } else {
            wx.onMenuShareTimeline(options);
            if (!options.is_share) {
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:timeline'
                    ]
                })
            }
        }

    };
    //发送给朋友
    weixin.onShareAppMessage = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            opt = {
                appid: options.appid,
                img_width: options.imgWidth,
                img_height: options.imgHeight,
                img_url: options.imgUrl,
                link: options.link,
                desc: options.desc,
                title: options.title
            };
            dispatchResult = {
                trigger: options.trigger || $.noop,
                success: options.success || $.noop,
                cancel: options.cancel || $.noop,
                fail: options.fail || $.noop
            };
            window.WeixinJSBridge.on('menu:share:appmessage', function () {
                if (options.is_share) {
                    window.WeixinJSBridge.invoke('sendAppMessage', opt, function (result) {
                        // 返回res.err_msg,取值
                        // send_app_msg:cancel 用户取消
                        // send_app_msg:fail　发送失败
                        // send_app_msg:ok 发送成功 android
                        // send_app_msg:confirm 发送成功  ios
                        if (result.err_msg == "send_app_msg:ok" || result.err_msg == "send_app_msg:confirm") {
                            dispatchResult.success.apply(this, arguments);
                        } else if (result.err_msg === 'send_app_msg:cancel') {
                            dispatchResult.cancel.apply(this, arguments);
                        } else if (result.err_msg === 'send_app_msg:fail') {
                            dispatchResult.fail.apply(this, arguments);
                        }
                    });
                } else {
                    alert("不能发送给朋友!");
                    return;
                }
            });
        } else {
            wx.onMenuShareAppMessage(options);
            if (!options.is_share) {
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:appMessage'
                    ]
                })
            }
        }
    };
    //分享到微博
    weixin.onShareWeibo = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            //暂不开方
            if (options.is_share) {
                alert("禁止分享微博!");
            }
            return;
        } else {
            wx.onMenuShareWeibo(options);
            if (!options.is_share) {
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:weiboApp',
                    ]
                })
            }
        }
    };
    weixin.hideOptionMenu = function () {
        if (lessThan6_0_2) {
            jsBridgeReady(function () {
                window.WeixinJSBridge.call('hideOptionMenu');
            });
        } else {
            wx.hideOptionMenu();
        }
    };

    weixin.showOptionMenu = function () {
        if (lessThan6_0_2) {
            jsBridgeReady(function () {
                window.WeixinJSBridge.call('showOptionMenu');
            });
        } else {
            wx.showOptionMenu();
        }
    };

    weixin.closeWindow = function () {
        if (lessThan6_0_2) {
            jsBridgeReady(function () {
                window.WeixinJSBridge.call('closeWindow');
            });
        } else {
            wx.closeWindow();
        }
    };
    weixin.getNetworkType = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            opt = {};
            dispatchResult = {
                trigger: options.trigger || $.noop,
                success: options.success || $.noop,
                cancel: options.cancel || $.noop,
                fail: options.fail || $.noop
            };
            jsBridgeReady(function () {
                window.WeixinJSBridge.invoke('getNetworkType', opt, function (result) {
                    if (result.err_msg === 'network_type:fail') {
                        dispatchResult.fail.apply(this, arguments);
                    } else {
                        dispatchResult.success.apply(this, arguments);
                    }
                });
            });
        } else {
            wx.getNetworkType(options);
        }
    };
    window.weixin = weixin;
}(window, $, window.wx);