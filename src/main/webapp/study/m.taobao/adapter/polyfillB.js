!function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i)return i(g, !0);
                if (f)return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j
            }
            var k = c[g] = {exports: {}};
            b[g][0].call(k.exports, function (a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }

    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)e(d[g]);
    return e
}({
    1: [function (a, b) {
        function c() {
        }

        var d = b.exports = {};
        d.nextTick = function () {
            var a = "undefined" != typeof window && window.setImmediate, b = "undefined" != typeof window && window.postMessage && window.addEventListener;
            if (a)return function (a) {
                return window.setImmediate(a)
            };
            if (b) {
                var c = [];
                return window.addEventListener("message", function (a) {
                    var b = a.source;
                    if ((b === window || null === b) && "process-tick" === a.data && (a.stopPropagation(), c.length > 0)) {
                        var d = c.shift();
                        d()
                    }
                }, !0), function (a) {
                    c.push(a), window.postMessage("process-tick", "*")
                }
            }
            return function (a) {
                setTimeout(a, 0)
            }
        }(), d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.on = c, d.addListener = c, d.once = c, d.off = c, d.removeListener = c, d.removeAllListeners = c, d.emit = c, d.binding = function () {
            throw new Error("process.binding is not supported")
        }, d.cwd = function () {
            return "/"
        }, d.chdir = function () {
            throw new Error("process.chdir is not supported")
        }
    }, {}], 2: [function (a, b) {
        "use strict";
        function c(a) {
            function b(a) {
                return null === i ? void k.push(a) : void f(function () {
                    var b = i ? a.onFulfilled : a.onRejected;
                    if (null === b)return void(i ? a.resolve : a.reject)(j);
                    var c;
                    try {
                        c = b(j)
                    } catch (d) {
                        return void a.reject(d)
                    }
                    a.resolve(c)
                })
            }

            function c(a) {
                try {
                    if (a === l)throw new TypeError("A promise cannot be resolved with itself.");
                    if (a && ("object" == typeof a || "function" == typeof a)) {
                        var b = a.then;
                        if ("function" == typeof b)return void e(b.bind(a), c, g)
                    }
                    i = !0, j = a, h()
                } catch (d) {
                    g(d)
                }
            }

            function g(a) {
                i = !1, j = a, h()
            }

            function h() {
                for (var a = 0, c = k.length; c > a; a++)b(k[a]);
                k = null
            }

            if ("object" != typeof this)throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof a)throw new TypeError("not a function");
            var i = null, j = null, k = [], l = this;
            this.then = function (a, c) {
                return new l.constructor(function (e, f) {
                    b(new d(a, c, e, f))
                })
            }, e(a, c, g)
        }

        function d(a, b, c, d) {
            this.onFulfilled = "function" == typeof a ? a : null, this.onRejected = "function" == typeof b ? b : null, this.resolve = c, this.reject = d
        }

        function e(a, b, c) {
            var d = !1;
            try {
                a(function (a) {
                    d || (d = !0, b(a))
                }, function (a) {
                    d || (d = !0, c(a))
                })
            } catch (e) {
                if (d)return;
                d = !0, c(e)
            }
        }

        var f = a("asap");
        b.exports = c
    }, {asap: 4}], 3: [function (a, b) {
        "use strict";
        function c(a) {
            this.then = function (b) {
                return "function" != typeof b ? this : new d(function (c, d) {
                    e(function () {
                        try {
                            c(b(a))
                        } catch (e) {
                            d(e)
                        }
                    })
                })
            }
        }

        var d = a("./core.js"), e = a("asap");
        b.exports = d, c.prototype = d.prototype;
        var f = new c(!0), g = new c(!1), h = new c(null), i = new c(void 0), j = new c(0), k = new c("");
        d.resolve = function (a) {
            if (a instanceof d)return a;
            if (null === a)return h;
            if (void 0 === a)return i;
            if (a === !0)return f;
            if (a === !1)return g;
            if (0 === a)return j;
            if ("" === a)return k;
            if ("object" == typeof a || "function" == typeof a)try {
                var b = a.then;
                if ("function" == typeof b)return new d(b.bind(a))
            } catch (e) {
                return new d(function (a, b) {
                    b(e)
                })
            }
            return new c(a)
        }, d.all = function (a) {
            var b = Array.prototype.slice.call(a);
            return new d(function (a, c) {
                function d(f, g) {
                    try {
                        if (g && ("object" == typeof g || "function" == typeof g)) {
                            var h = g.then;
                            if ("function" == typeof h)return void h.call(g, function (a) {
                                d(f, a)
                            }, c)
                        }
                        b[f] = g, 0 === --e && a(b)
                    } catch (i) {
                        c(i)
                    }
                }

                if (0 === b.length)return a([]);
                for (var e = b.length, f = 0; f < b.length; f++)d(f, b[f])
            })
        }, d.reject = function (a) {
            return new d(function (b, c) {
                c(a)
            })
        }, d.race = function (a) {
            return new d(function (b, c) {
                a.forEach(function (a) {
                    d.resolve(a).then(b, c)
                })
            })
        }, d.prototype["catch"] = function (a) {
            return this.then(null, a)
        }
    }, {"./core.js": 2, asap: 4}], 4: [function (a, b) {
        (function (a) {
            function c() {
                for (; e.next;) {
                    e = e.next;
                    var a = e.task;
                    e.task = void 0;
                    var b = e.domain;
                    b && (e.domain = void 0, b.enter());
                    try {
                        a()
                    } catch (d) {
                        if (i)throw b && b.exit(), setTimeout(c, 0), b && b.enter(), d;
                        setTimeout(function () {
                            throw d
                        }, 0)
                    }
                    b && b.exit()
                }
                g = !1
            }

            function d(b) {
                f = f.next = {task: b, domain: i && a.domain, next: null}, g || (g = !0, h())
            }

            var e = {task: void 0, next: null}, f = e, g = !1, h = void 0, i = !1;
            if ("undefined" != typeof a && a.nextTick)i = !0, h = function () {
                a.nextTick(c)
            }; else if ("function" == typeof setImmediate)h = "undefined" != typeof window ? setImmediate.bind(window, c) : function () {
                setImmediate(c)
            }; else if ("undefined" != typeof MessageChannel) {
                var j = new MessageChannel;
                j.port1.onmessage = c, h = function () {
                    j.port2.postMessage(0)
                }
            } else h = function () {
                setTimeout(c, 0)
            };
            b.exports = d
        }).call(this, a("_process"))
    }, {_process: 1}], 5: [function () {
        "function" != typeof Promise.prototype.done && (Promise.prototype.done = function () {
            var a = arguments.length ? this.then.apply(this, arguments) : this;
            a.then(null, function (a) {
                setTimeout(function () {
                    throw a
                }, 0)
            })
        })
    }, {}], 6: [function (a) {
        a("asap");
        "undefined" == typeof Promise && (Promise = a("./lib/core.js"), a("./lib/es6-extensions.js")), a("./polyfill-done.js")
    }, {"./lib/core.js": 2, "./lib/es6-extensions.js": 3, "./polyfill-done.js": 5, asap: 4}]
}, {}, [6]);