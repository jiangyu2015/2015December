var webScroll = function () {
    var options = {
        control: true//页面是否循环轮播
    };

    var listeners = [];

    function init(op) {
        if (op) {
            if (op.control != null) {
                options.control = op.control;
            }
        }
        var $element = $("body");
        var touchEvents = {
                touchstart: "touchstart",
                touchmove: "touchmove",
                touchend: "touchend"
            },
            startX, startY, x, y;
        $element.bind(touchEvents.touchstart, function (event) {
            var touch = event.originalEvent.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        });
        $element.bind(touchEvents.touchmove, function (event) {
            event.preventDefault();
            var touch = event.originalEvent.touches[0];
            x = touch.pageX - startX;
            y = touch.pageY - startY;
        });
        $element.bind(touchEvents.touchend, function (event) {
            var currentPage;
            if (Math.abs(x) < Math.abs(y)) {
                if (y < 0) {
                    currentPage = showA();
                } else {
                    currentPage = showB();
                }
                if (currentPage != -1) {
                    for (var i = 0; i < listeners.length; i++) {
                        var listener = listeners[i];
                        listener(currentPage);
                    }

                }
                x = 0;
                y = 0;
            }
        });
        return {
            on: function (callback) {
                listeners.push(callback);
            }
        }
    }

    function showA() {
        var $pages = $(".page");
        var len = $pages.length;
        var $pageOut = $(".page.in");
        var index = $pages.index($pageOut);
        if (index + 1 < len) {
            index = index + 1;
        } else {
            index = 0;
        }
        var pageIn = $pages[index];
        Mobilebone.transition(pageIn, $pageOut[0], false, {
            history: false
        });
        return index;
    }

    function showB() {
        var $pages = $(".page");
        var len = $pages.length;
        var $pageOut = $(".page.in");
        var index = $pages.index($pageOut);
        if (index - 1 >= 0) {
            index = index - 1;
        } else {
            if (!options.control) return -1;
            index = len - 1;
        }
        var pageIn = $pages[index];
        Mobilebone.transition(pageIn, $pageOut[0], true, {
            history: false
        });
        return index;
    }

    function pre() {
        showB();
    }

    function next() {
        showA();
    }

    function hide(name) {
        name = name || "";
        var $element = $("#" + name);
        $element.removeClass("page");
        $element.hide();
    }

    function show(name) {
        name = name || "";
        var $element = $("#" + name);
        $element.addClass("page");
    }

    return {
        init: init,
        hide: hide,
        show: show,
        pre: pre,
        next: next
    };
}();