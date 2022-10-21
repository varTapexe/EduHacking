window.keyPressed = false;
var requirejs, require, define;
!function(g) {
    var r, o, p, m, f = {}, v = {}, w = {}, y = {}, s = Object.prototype.hasOwnProperty, i = [].slice, _ = /\.js$/;
    function b(e, t) {
        return s.call(e, t)
    }
    function a(e, t) {
        var s, i, n, r, o, a, l, c, d, h, u, g = t && t.split("/"), p = w.map, m = p && p["*"] || {};
        if (e) {
            for (o = (e = e.split("/")).length - 1,
                w.nodeIdCompat && _.test(e[o]) && (e[o] = e[o].replace(_, "")),
                "." === e[0].charAt(0) && g && (e = g.slice(0, g.length - 1).concat(e)),
                d = 0; d < e.length; d++)
                if ("." === (u = e[d]))
                    e.splice(d, 1),
                        d -= 1;
                else if (".." === u) {
                    if (0 === d || 1 === d && ".." === e[2] || ".." === e[d - 1])
                        continue;
                    0 < d && (e.splice(d - 1, 2),
                        d -= 2)
                }
            e = e.join("/")
        }
        if ((g || m) && p) {
            for (d = (s = e.split("/")).length; 0 < d; d -= 1) {
                if (i = s.slice(0, d).join("/"),
                    g)
                    for (h = g.length; 0 < h; h -= 1)
                        if ((n = p[g.slice(0, h).join("/")]) && (n = n[i])) {
                            r = n,
                                a = d;
                            break
                        }
                if (r)
                    break;
                !l && m && m[i] && (l = m[i],
                    c = d)
            }
            !r && l && (r = l,
                a = c),
                r && (s.splice(0, a, r),
                    e = s.join("/"))
        }
        return e
    }
    function k(t, s) {
        return function() {
            var e = i.call(arguments, 0);
            return "string" != typeof e[0] && 1 === e.length && e.push(null),
                o.apply(g, e.concat([t, s]))
        }
    }
    function S(t) {
        return function(e) {
            f[t] = e
        }
    }
    function T(e) {
        if (b(v, e)) {
            var t = v[e];
            delete v[e],
                y[e] = !0,
                r.apply(g, t)
        }
        if (!b(f, e) && !b(y, e))
            throw new Error("No " + e);
        return f[e]
    }
    function l(e) {
        var t, s = e ? e.indexOf("!") : -1;
        return -1 < s && (t = e.substring(0, s),
            e = e.substring(s + 1, e.length)),
            [t, e]
    }
    function L(e) {
        return e ? l(e) : []
    }
    p = function(e, t) {
        var s, i, n = l(e), r = n[0], o = t[1];
        return e = n[1],
            r && (s = T(r = a(r, o))),
            r ? e = s && s.normalize ? s.normalize(e, (i = o,
                function(e) {
                    return a(e, i)
                }
            )) : a(e, o) : (r = (n = l(e = a(e, o)))[0],
                e = n[1],
                r && (s = T(r))),
        {
            f: r ? r + "!" + e : e,
            n: e,
            pr: r,
            p: s
        }
    }
        ,
        m = {
            require: function(e) {
                return k(e)
            },
            exports: function(e) {
                var t = f[e];
                return void 0 !== t ? t : f[e] = {}
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: f[e],
                    config: (t = e,
                        function() {
                            return w && w.config && w.config[t] || {}
                        }
                    )
                };
                var t
            }
        },
        r = function(e, t, s, i) {
            var n, r, o, a, l, c, d, h = [], u = typeof s;
            if (c = L(i = i || e),
                "undefined" === u || "function" === u) {
                for (t = !t.length && s.length ? ["require", "exports", "module"] : t,
                    l = 0; l < t.length; l += 1)
                    if ("require" === (r = (a = p(t[l], c)).f))
                        h[l] = m.require(e);
                    else if ("exports" === r)
                        h[l] = m.exports(e),
                            d = !0;
                    else if ("module" === r)
                        n = h[l] = m.module(e);
                    else if (b(f, r) || b(v, r) || b(y, r))
                        h[l] = T(r);
                    else {
                        if (!a.p)
                            throw new Error(e + " missing " + r);
                        a.p.load(a.n, k(i, !0), S(r), {}),
                            h[l] = f[r]
                    }
                o = s ? s.apply(f[e], h) : void 0,
                    e && (n && n.exports !== g && n.exports !== f[e] ? f[e] = n.exports : o === g && d || (f[e] = o))
            } else
                e && (f[e] = s)
        }
        ,
        requirejs = require = o = function(e, t, s, i, n) {
            if ("string" == typeof e)
                return m[e] ? m[e](t) : T(p(e, L(t)).f);
            if (!e.splice) {
                if ((w = e).deps && o(w.deps, w.callback),
                    !t)
                    return;
                t.splice ? (e = t,
                    t = s,
                    s = null) : e = g
            }
            return t = t || function() { }
                ,
                "function" == typeof s && (s = i,
                    i = n),
                i ? r(g, e, t, s) : setTimeout(function() {
                    r(g, e, t, s)
                }, 4),
                o
        }
        ,
        o.config = function(e) {
            return o(e)
        }
        ,
        requirejs._defined = f,
        (define = function(e, t, s) {
            if ("string" != typeof e)
                throw new Error("See almond README: incorrect module build, no module name");
            t.splice || (s = t,
                t = []),
                b(f, e) || b(v, e) || (v[e] = [e, t, s])
        }
        ).amd = {
            jQuery: !0
        }
}(),
    define("../../../../node_modules/almond/almond", function() { }),
    define("shared/helpers", [], function() {
        "use strict";
        window.__url = function(e, t) {
            e = e || "";
            var s = "en"
                , i = location.pathname.split("/");
            2 === i[1].length && (s = i[1]);
            var n = e.split("/");
            return t ? e : "en" === s ? n.join("/") : 1 < (e = "/" + s + n.join("/")).length && "/" === e[e.length - 1] ? e.substr(0, e.length - 1) : e
        }
            ,
            location.safeReload = function() {
                location.hash ? location.reload(!1) : location.href = location.href.replace(/#$/, "")
            }
            ,
            window.accurateInterval = function(i, n) {
                this.baseline = void 0,
                    this.run = function() {
                        void 0 === this.baseline && (this.baseline = (new Date).getTime()),
                            n();
                        var e = (new Date).getTime();
                        this.baseline += i;
                        var t, s = i - (e - this.baseline);
                        s < 0 && (s = 0),
                            (t = this).timer = setTimeout(function() {
                                t.run(e)
                            }, s)
                    }
                    ,
                    this.stop = function() {
                        clearTimeout(this.timer)
                    }
            }
            ;
        var t, s;
        window.rot47 = function(e) {
            if ("production" !== FTWGLOBALS("env"))
                return e;
            if (!e)
                return e;
            new String;
            return function(e, t) {
                var s, i, n, r = new String, o = t.length;
                for (s = 0; s < e.length; s++)
                    n = e.charAt(s),
                        0 <= (i = t.indexOf(n)) && (n = t.charAt((i + o / 2) % o)),
                        r += n;
                return r
            }(e, "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~")
        }
            ,
            "local" == FTWGLOBALS("env") ? window.c = function(e) {
                console.log(e)
            }
                : window.c = function() { }
            ,
            $.Velocity.RegisterEffect("ftw.miniShake", {
                defaultDuration: 250,
                calls: [[{
                    translateX: -6
                }, .25], [{
                    translateX: 6
                }, .25], [{
                    translateX: -9
                }, .25], [{
                    translateX: 0
                }, .25]],
                reset: {
                    translateX: 0
                }
            }),
            $.Velocity.RegisterEffect("ftw.growUp", {
                defaultDuration: 200,
                calls: [[{
                    opacity: [1, 0],
                    scale: [1, 0],
                    transformOriginY: ["100%", "100%"]
                }, 1]]
            }),
            $.mapLanguageToLibrary = function(e, t) {
                var s = FTWGLOBALS("languageLibraryMap")[e];
                return s && s[t] ? s[t] : t
            }
            ,
            $.postJSON = function(e, t) {
                return $.ajax({
                    type: "POST",
                    url: e,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(t)
                })
            }
            ,
            $.loginRedirect = function(e) {
                var t = $.parseURL(location.href);
                t.pathname !== __url("/" + e + "/login") ? location.href = __url("/" + e + "/login#" + encodeURI("r:" + t.pathname + t.search + t.hash)) : location.reload()
            }
            ,
            $.playSound = function(e) {
                var t = e.play();
                t && t.catch && t.catch(function(e) { })
            }
            ,
            $.parseURL = function(e) {
                var t = document.createElement("a");
                return t.href = e,
                    t
            }
            ,
            $.fn.getFormValuePairs = function() {
                var t = {};
                return this.serializeArray().forEach(function(e) {
                    t[e.name] = e.value
                }),
                    t
            }
            ,
            $.fn.fastHide = function() {
                return this.each(function(e, t) {
                    t.style.display = "none"
                }),
                    this
            }
            ,
            $.fn.fastShow = function(s) {
                return this.each(function(e, t) {
                    t.style.display = s || "block"
                }),
                    this
            }
            ,
            Array.prototype.clone = function() {
                return this.slice(0)
            }
            ,
            String.prototype.ucFirst = function() {
                return this.substr(0, 1).toUpperCase() + this.substr(1)
            }
            ,
            String.prototype.ucWords = function() {
                return this.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function(e) {
                    return e.toUpperCase()
                })
            }
            ,
            String.prototype.slug = function() {
                return this.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
            }
            ,
            String.prototype.t = (s = FTWGLOBALS("language"),
                _.values(FTWGLOBALS("languages")).forEach(function(e) {
                    s === e.id && (t = new Polyglot({
                        locale: e.id,
                        phrases: FTWGLOBALS("phrases")
                    }))
                }),
                function(e) {
                    return void 0 === t ? function(e) {
                        return this
                    }
                        : t.t(this, e)
                }
            ),
            $.isEmail = function(e) {
                return e.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            }
            ,
            String.prototype.format || (String.prototype.format = function() {
                var s = arguments;
                return this.replace(/{(\d+)}/g, function(e, t) {
                    return void 0 !== s[t] ? s[t] : e
                })
            }
            ),
            $.validator.addMethod("username", function(e, t) {
                return !!$.isEmail(e) || e.toLowerCase().trim().match(/^[a-z0-9\-._]+$/i)
            }, "shared.validation.username".t()),
            $.validator.addMethod("min_date", function(e, t, s) {
                return !e || s <= e
            }),
            $.validator.addMethod("extension", function(e, t, s) {
                return s = "string" == typeof s ? s.replace(/,/g, "|") : "png|jpe?g|gif",
                    this.optional(t) || e.match(new RegExp("\\.(" + s + ")$", "i"))
            }, $.validator.format("Please enter a value with a valid extension.")),
            $.validator.addMethod("equalsValue", function(e, t, s) {
                return e.toLowerCase() == s.toLowerCase()
            }, "shared.validation.equalsValue".t()),
            $.validator.addMethod("noLeadingWildCard", function(e, t) {
                return this.optional(t) || !e.startsWith("*")
            }, "shared.validation.noLeadingWildCard".t()),
            $.validator.addMethod("isJSON", function(e, t) {
                try {
                    return JSON.parse(e),
                        !0
                } catch (e) {
                    return !1
                }
            }, "shared.validation.isJSON".t()),
            $.validator.addMethod("accountId", function(e, t) {
                return e.toLowerCase().trim().match(/^[a-z0-9]+$/i)
            }, "shared.validation.accountId".t()),
            $.validator.addMethod("lessThanField", function(e, t, s) {
                var i = parseInt(e);
                return !(t.form[s].value <= i)
            }, "shared.validation.lessThanField".t()),
            $.validator.addMethod("alphanum", function(e) {
                return !e || /^[a-zA-Z0-9]+$/.test(e)
            }, "shared.validation.alphanum".t()),
            $.validator.addMethod("filesize", function(e, t, s) {
                return !(t.files[0].size / 1e6 > s)
            }, "shared.validation.filesize".t()),
            $.validator.addMethod("typingSpaces", function(e) {
                return !e.match(/\n\n/)
            }, "shared.validation.typingSpaces".t()),
            $.validator.addMethod("emailExtended", function(e, t) {
                return !Mailcheck.run({
                    email: e
                }) || $(t).data("emailExtended") === e
            }, "shared.validation.emailExtended".t()),
            $.validator.addMethod("notMatchUsername", function(e) {
                return e !== this.findByName("username").val()
            }, "shared.validation.notMatchUsername".t()),
            $.validator.addMethod("ips", function(e) {
                return !e.trim() || !e.trim().split("\n").filter(function(e) {
                    return !e.trim().match(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/)
                }).length
            }, "shared.validation.ips".t()),
            Number.addCommas = function(e, t) {
                var s = (t = t || 0) ? "." + "0".repeat(t) : "";
                return numeral(e).format("0,0" + s)
            }
            ,
            Number.prototype.addCommas = function(e) {
                return Number.addCommas(this, e)
            }
            ,
            Number.prototype.countdownSeconds = function(e, t) {
                var s = Math.floor(this / 60 / 60)
                    , i = Math.floor((this - 60 * s * 60) / 60)
                    , n = this - 60 * s * 60 - 60 * i
                    , r = "";
                return r = String(i).pad(0 < s || e ? 2 : 1, "0", "STR_PAD_LEFT"),
                    t || (r = r + ":" + String(n).pad(2, "0", "STR_PAD_LEFT")),
                    (0 < s || e) && (r = s + ":" + r),
                    r
            }
            ,
            Number.prototype.englishSeconds = Number.prototype.writtenSeconds = function() {
                var e = Math.floor(this / 60 / 60)
                    , t = Math.floor((this - 60 * e * 60) / 60)
                    , s = this - 60 * e * 60 - 60 * t
                    , i = [];
                return 0 < e && i.push("shared.number_hours".t({
                    smart_count: e
                })),
                    (0 < e || 0 < t) && i.push("shared.number_minutes".t({
                        smart_count: t
                    })),
                    i.push("shared.number_seconds".t({
                        smart_count: s
                    })),
                    i.join(", ")
            }
            ,
            Number.prototype.formatSizeUnits = function() {
                return 1e9 <= this ? (this / 1e9).toFixed(2) + " GB" : 1e6 <= this ? (this / 1e6).toFixed(2) + " MB" : 1e3 <= this ? (this / 1e3).toFixed(0) + " KB" : 1 < this ? this + " bytes" : 1 == this ? this + " byte" : "0 byte"
            }
            ,
            String.prototype.escapeHTML = function() {
                return $("<div>" + this + "</div>").html()
            }
            ,
            String.prototype.rtrim = function() {
                return this.replace(/\s+$/, "")
            }
            ,
            String.prototype.stripHTML = function() {
                var e = document.createElement("DIV");
                return e.innerHTML = this,
                    e.textContent || e.innerText || ""
            }
            ,
            String.prototype.pad = function(e, t, s) {
                var i, n = this, r = "", o = function(e, t) {
                    for (var s = ""; s.length < t;)
                        s += e;
                    return s = s.substr(0, t)
                };
                return t = void 0 !== t ? t : " ",
                    "STR_PAD_LEFT" !== s && "STR_PAD_RIGHT" !== s && "STR_PAD_BOTH" !== s && (s = "STR_PAD_RIGHT"),
                    0 < (i = e - (n += "").length) && ("STR_PAD_LEFT" === s ? n = o(t, i) + n : "STR_PAD_RIGHT" === s ? n += o(t, i) : "STR_PAD_BOTH" === s && (n = (n = (r = o(t, Math.ceil(i / 2))) + n + r).substr(0, e))),
                    n
            }
            ,
            Number.prototype.ordinal = function() {
                var e = ["th", "st", "nd", "rd"]
                    , t = this % 100;
                return e[(t - 20) % 10] || e[t] || e[0]
            }
            ,
            Date.getUnixTime = function() {
                return Math.floor(Date.now() / 1e3)
            }
            ,
            Number.prototype.pluralize = function(e) {
                return (e = e || !1) ? 1 == this ? "" : "es" : 1 == this ? "" : "s"
            }
            ,
            String.prototype.possessive = function() {
                return console.warn("Using String.prototype.possessive"),
                    this.match(/s$/i) ? this + "'" : "S" === this[this.length - 1] ? this + "'S" : this + "'s"
            }
            ,
            Math.long2ip = function(e) {
                for (var t = e % 256, s = 1; s <= 3; s++)
                    t = (e = Math.floor(e / 256)) % 256 + "." + t;
                return t
            }
            ,
            $.getQueryParam = function(e) {
                e = e.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
                var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
                return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
            }
            ,
            $.isLowPerformanceBrowser = function() {
                return !!$.isIE11()
            }
            ,
            $.isIE11 = function() {
                return navigator.userAgent.match("rv:11")
            }
            ,
            $.isEdge = function() {
                return navigator.userAgent.match("Edge/")
            }
            ,
            $.isIOS = function() {
                return !!(/iPad|iPhone|iPod/.test(navigator.userAgent) || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints)
            }
            ,
            $.isWindows = function() {
                return navigator.userAgent.match("Windows")
            }
            ,
            $.isMac = function() {
                return navigator.userAgent.match("OS X") && !navigator.userAgent.match(/iPad|iPhone/)
            }
            ,
            $.showSoftwareKeyboard = function() {
                return $.isIOS()
            }
            ,
            $.supportsIsTrusted = function() {
                if (void 0 !== $.supportsIsTrusted.supports)
                    return $.supportsIsTrusted.supports;
                var e = document.createEvent("KeyboardEvent");
                return $.supportsIsTrusted.supports = void 0 !== e.isTrusted,
                    $.supportsIsTrusted.supports
            }
            ,
            $.wordAtPosition = function(e, t) {
                e = String(e),
                    t = Number(t) >>> 0;
                var s = e.slice(0, t + 1).search(/\S+$/)
                    , i = e.slice(t).search(/\s/);
                return i < 0 ? e.slice(s) : e.slice(s, i + t)
            }
            ,
            $.getPikadayLocalizations = function() {
                return {
                    previousMonth: "calendar.previous_month".t(),
                    nextMonth: "calendar.next_month".t(),
                    months: _.times(12, function(e) {
                        return moment().month(e).format("MMMM")
                    }),
                    weekdays: _.times(7, function(e) {
                        return moment().day(e).format("dddd")
                    }),
                    weekdaysShort: _.times(7, function(e) {
                        return moment().day(e).format("ddd")
                    })
                }
            }
            ,
            window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
                window.setTimeout(e, 1e3 / 60)
            }
            ,
            window.requestInterval = function(s, i) {
                if (!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame))
                    return window.setInterval(s, i);
                var n = (new Date).getTime()
                    , r = new Object;
                return r.value = requestAnimFrame(function e() {
                    var t = (new Date).getTime();
                    i <= t - n && (s.call(),
                        n = (new Date).getTime()),
                        r.value = requestAnimFrame(e)
                }),
                    r
            }
            ,
            window.clearRequestInterval = function(e) {
                window.cancelAnimationFrame ? window.cancelAnimationFrame(e.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(e.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(e.value) : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(e.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(e.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(e.value) : clearInterval(e)
            }
            ,
            window.requestTimeout = function(s, i) {
                if (!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame))
                    return window.setTimeout(s, i);
                var n = (new Date).getTime()
                    , r = new Object;
                return r.value = requestAnimFrame(function e() {
                    var t = (new Date).getTime();
                    i <= t - n ? s.call() : r.value = requestAnimFrame(e)
                }),
                    r
            }
            ,
            window.clearRequestTimeout = function(e) {
                window.cancelAnimationFrame ? window.cancelAnimationFrame(e.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(e.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(e.value) : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(e.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(e.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(e.value) : clearTimeout(e)
            }
    }),
    define("registry", ["require"], function(e) {
        "use strict";
        var s = [];
        return {
            get: function(e) {
                return s[e] || void 0
            },
            set: function(e, t) {
                s[e] = t
            }
        }
    }),
    define("templates", ["require"], function(e) {
        "use strict";
        return function(e, t) {
            return window.FTWTEMPLATES[e + "_" + t] ? window.FTWTEMPLATES[e + "_" + t] : (console.error("Unable to find template: " + e + "_" + t),
                function() {
                    return "Unable to find template: " + e + "_" + t
                }
            )
        }
    }),
    define("global/views/tooltip", ["require", "templates"], function(e) {
        "use strict";
        e("templates");
        return {
            cachedTooltips: {},
            init: function() {
                _.each(this.cachedTooltips, function(e) {
                    e.dispose()
                }),
                    this.cachedTooltips = {},
                    $("body").off("mouseover.tooltip", ".has-tooltip,[data-tooltip]").on("mouseover.tooltip", ".has-tooltip,[data-tooltip]", function(e) {
                        this.show(e.currentTarget)
                    }
                        .bind(this))
            },
            show: function(e, t) {
                t = t || {};
                var s, i = e.id, n = (t.text,
                    t.text);
                if ($(e).attr("data-placement") && (t.placement = $(e).attr("data-placement")),
                    i || (i = "id" + Math.random(),
                        e.id = i),
                    s = t.start ? '<div class="tooltip tooltip--start" role="tooltip"><div class="tooltip-arrow"></div><h3 class="tooltip-inner mbf"></h3></div>' : 0 < $(e).children(".tooltip-template").length ? $(e).children(".tooltip-template").html() : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                    !this.cachedTooltips[i]) {
                    n || (n = $(e).data("tooltip")),
                        n || (n = $(e).children(".tooltip-html").html());
                    var r = new window.Tooltip(e, {
                        container: ".wrapper",
                        html: !0,
                        offset: t.offset || "0, 15",
                        placement: t.placement ? t.placement : "top",
                        preventOverflow: {
                            enabled: !0
                        },
                        template: s,
                        title: n,
                        trigger: t.trigger ? t.trigger : "hover",
                        popperOptions: {
                            modifiers: {
                                preventOverflow: {
                                    boundariesElement: "viewport"
                                }
                            }
                        }
                    });
                    return t.force && r.show(),
                        this.cachedTooltips[i] = r
                }
            },
            hide: function(e) {
                e.hide()
            },
            hideAll: function() {
                _.each(this.cachedTooltips, function(e) {
                    e.hide()
                })
            }
        }
    }),
    define("global/models/skin", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "id",
            defaults: {
                name: "",
                file: "",
                ranks: []
            },
            getTotalRanks: function() {
                return this.get("ranks").length
            },
            getRank: function(t) {
                return t = Math.max(0, t),
                    _.find(this.get("ranks").clone().reverse(), function(e) {
                        return t >= e.experience
                    })
            },
            getNextRank: function(t) {
                t = Math.max(0, t);
                var e = this.get("ranks").clone().reverse()
                    , s = _.findIndex(e, function(e) {
                        return t >= e.experience
                    });
                return 0 === s ? null : e[s - 1]
            }
        })
    }),
    define("global/collections/skins", ["require", "global/models/skin"], function(e) {
        "use strict";
        var t = e("global/models/skin");
        return Backbone.Collection.extend({
            model: t,
            getTotalRanks: function() {
                return this.at(0).getTotalRanks() * this.filter(function(e) {
                    return !e.get("noAvatar")
                }).length
            }
        })
    }),
    define("global/views/level_up", ["require", "registry", "global/collections/skins"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("global/collections/skins");
        return Backbone.View.extend({
            templatePath: ["global", "level_up"],
            events: {
                "click .js-lvlUp-btn": "levelUp",
                "click .js-close": "hide"
            },
            timeout: 0,
            initialize: function() {
                this.user = t.get("student"),
                    this.userActivity = t.get("userActivity"),
                    this.skins = new s(FTWGLOBALS("skins")),
                    this.listenTo(this.user, "change:skin_id", this.setLevelListener),
                    this.setLevelListener(),
                    this.render()
            },
            serialize: function() {
                var e = this.skins.get(this.user.get("skin_id") || 1)
                    , t = this.userActivity.getOrAdd(0);
                return {
                    rank: e.getRank(t.get("typed") - t.get("errors")),
                    nextRank: e.getNextRank(t.get("typed") - t.get("errors"))
                }
            },
            render: function() {
                return Backbone.View.prototype.render.apply(this, arguments),
                    $("body").append(this.el),
                    this
            },
            setLevelListener: function() {
                this.skins.get(this.user.get("skin_id") || 1);
                var e = this.userActivity.getOrAdd(0);
                this.listenTo(e, "change:typed", this.handleUpdate)
            },
            handleUpdate: function(e) {
                var t = this.skins.get(this.user.get("skin_id") || 1)
                    , s = e.toJSON()
                    , i = e.previousAttributes()
                    , n = t.getRank(i.typed - i.errors)
                    , r = t.getRank(s.typed - s.errors);
                n.id !== r.id && setTimeout(this.show.bind(this), 100)
            },
            levelUp: function() {
                var e = this.$(".js-lvlUp-avatar")
                    , t = this.$(".js-lvlUp-bubble")
                    , s = this.$(".js-overlay")
                    , i = e.data("rank")
                    , n = this.$(".js-lvlUp-1")
                    , r = this.$(".js-lvlUp-2")
                    , o = String(i).pad(2, "0", "STR_PAD_LEFT")
                    , a = this.skins.get(this.user.get("skin_id") || 1)
                    , l = this.userActivity.getOrAdd(0).toJSON()
                    , c = a.getRank(l.typed - l.errors)
                    , d = String(c.id).pad(2, "0", "STR_PAD_LEFT");
                e.removeClass("is-ready rank--" + o).addClass("is-evolving"),
                    t.addClass("is-evolving"),
                    setTimeout(function() {
                        e.addClass("avatar--" + d),
                            s.addClass("lvlUp-bg--" + d),
                            n.velocity("fadeOut"),
                            r.velocity("fadeIn")
                    }
                        .bind(this), 1e3)
            },
            show: function() {
                t.set("preventKeyboardInput", !0),
                    this.$(".js-overlay").fastShow(),
                    this.$(".js-modal").addClass("is-open"),
                    setTimeout(function() {
                        this.$(".js-lvlUp-avatar").addClass("is-ready"),
                            this.$(".js-lvlUp-bubble").velocity("fadeIn")
                    }
                        .bind(this), 250),
                    setTimeout(function() {
                        $(document).on("keydown.level_up", function(e) {
                            13 !== e.which && 27 !== e.which || this.hide()
                        }
                            .bind(this))
                    }
                        .bind(this), 500)
            },
            hide: function() {
                t.set("preventKeyboardInput", !1),
                    $(document).off("keydown.level_up"),
                    this.$el.css({
                        position: "relative",
                        "z-index": "99"
                    }),
                    this.$el.fadeOut()
            }
        })
    }),
    define("global/views/layout_basic", ["require", "registry", "global/views/tooltip", "global/views/level_up"], function(e) {
        "use strict";
        var s = e("registry")
            , t = e("global/views/tooltip")
            , i = e("global/views/level_up");
        return Backbone.View.extend({
            templatePath: ["global", "layout_basic"],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments);
                var e = _.findWhere(FTWGLOBALS("products"), {
                    product_id: s.get("student").getSetting("product_id")
                });
                this.logoImage = e && e.logo_image ? FTWGLOBALS("resourceUrl") + "/products/" + encodeURIComponent(e.logo_image) : "/dist/student/images/logo-edutyping.svg";
                var t = s.get("student");
                _.findWhere(FTWGLOBALS("skins"), {
                    id: t.get("skin_id") || 1
                }).noAvatar || new i
            },
            render: function() {
                return Backbone.View.prototype.render.apply(this, arguments),
                    $("#js-page-loader").remove(),
                    t.init(),
                    $("html").attr("style", "--product-logo: url('" + this.logoImage + "')"),
                    this
            }
        })
    }),
    define("shared/scoring", ["require"], function(e) {
        "use strict";
        return {
            speed: function(...args) {
                var a = (function(e, t, s, i) {
                    "object" == typeof e && (t = e.seconds,
                        s = e.errors,
                        i = e.speedType,
                        e = e.typed),
                        s = s || 0;
                    var n, r, o = t / 60;
                    return "kph" === (i = i || "wpm") ? r = Math.floor(e / t * 3600) : (n = "cpm" === i ? e : e / 5,
                        r = Math.max(Math.floor(n / o), 0)),
                        r === 1 / 0 || isNaN(r) ? 0 : r
                }
                )(...args);
                return a;
            },
            accuracy: function(e, t) {
                var s;
                return "object" == typeof e && (t = e.errors,
                    e = e.typed),
                    e = e || 1,
                    s = 100 - Math.round(t / e * 100),
                    Math.round(isNaN(s) ? 0 : s)
            },
            stars: function(e, t, s) {
                return s = s || 95,
                    e < (t = t || 90) ? 1 : e < s ? 2 : 3
            },
            grade: function(e, t) {
                return t && t.a_grade ? e >= parseInt(t.a_grade) ? "A" : e >= parseInt(t.b_grade) ? "B" : e >= parseInt(t.c_grade) ? "C" : e >= parseInt(t.d_grade) ? "D" : "F" : ""
            },
            techLitGrade: function(e, t) {
                return t && t.a_grade_lit ? e >= parseInt(t.a_grade_lit) ? "A" : e >= parseInt(t.b_grade_lit) ? "B" : e >= parseInt(t.c_grade_lit) ? "C" : e >= parseInt(t.d_grade_lit) ? "D" : "F" : ""
            }
        }
    }),
    define("global/views/dashboard", ["require", "registry", "shared/scoring", "global/collections/skins"], function(e) {
        "use strict";
        var a = e("registry")
            , l = e("shared/scoring")
            , t = e("global/collections/skins");
        return Backbone.View.extend({
            templatePath: ["global", "dashboard"],
            dateChoices: [[1, "dashboard.last_24_hours".t()], [7, "dashboard.last_7_days".t()], [30, "dashboard.last_30_days".t()], [0, "dashboard.all_time".t()]],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.mini && (this.templatePath = ["global", "dashboard_mini"]),
                    this.user = a.get("student"),
                    this.userActivity = a.get("userActivity"),
                    this.skins = new t(FTWGLOBALS("skins")),
                    this.listenTo(this.user, "change:skin_id", function() {
                        this.render(),
                            setTimeout(function() {
                                $("linearGradient").hide().show(0)
                            }, 50)
                    }).bind(this)
            },
            serialize: function() {
                var t = parseInt(this.user.get("_dashboardDaysBack")) || 0
                    , e = this.userActivity.getCompiled(t)
                    , s = this.skins.get(this.user.get("skin_id") || 1)
                    , i = this.userActivity.getOrAdd(0).toJSON()
                    , n = s.getRank(i.typed - i.errors)
                    , r = s.getNextRank(i.typed - i.errors)
                    , o = r ? 100 - Math.floor((r.experience - (i.typed - i.errors)) / (r.experience - n.experience) * 100) : 100;
                return {
                    ads: this.ads,
                    dateChoices: this.dateChoices,
                    daysBackText: _.find(this.dateChoices, function(e) {
                        return e[0] === t
                    })[1],
                    loggedIn: a.get("loggedIn"),
                    user: this.user.toJSON(),
                    skin: s.toJSON(),
                    skins: this.skins.toJSON(),
                    scoreboard: a.get("student").hasOption("scoreboard"),
                    lockAccount: a.get("student").hasOption("lockaccount"),
                    changePassword: a.get("student").hasOption("changepassword"),
                    noGames: _.isArray(a.get("student").get("games")) && 0 === a.get("student").get("games").length,
                    speed: l.speed(e.typed, e.seconds, e.errors),
                    accuracy: l.accuracy(e.typed, e.errors),
                    time: e.seconds || 0,
                    totalRanks: s.getTotalRanks(),
                    rank: n,
                    nextRank: r,
                    rankProgress: o,
                    activity: i
                }
            }
        })
    }),
    define("global/views/nav", ["require", "registry"], function(e) {
        "use strict";
        var s = e("registry");
        return Backbone.View.extend({
            templatePath: ["global", "nav"],
            events: {
                "click .js-logout": "logOut"
            },
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.user = s.get("student")
            },
            serialize: function() {
                var e = _.findWhere(FTWGLOBALS("products"), {
                    product_id: this.user.getSetting("product_id")
                })
                    , t = e.logo_image ? FTWGLOBALS("resourceUrl") + "/products/" + encodeURIComponent(e.logo_image) : "/dist/student/images/logo-edutyping-dk.svg";
                return {
                    user: this.user.toJSON(),
                    noGames: _.isArray(s.get("student").get("games")) && 0 === s.get("student").get("games").length,
                    product_logo: t,
                    lockAccount: s.get("student").hasOption("lockaccount"),
                    changePassword: s.get("student").hasOption("changepassword")
                }
            },
            logOut: function() {
                return s.get("student").logOut(),
                    location.href = __url("/student/login"),
                    !1
            }
        })
    }),
    define("global/models/lesson", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "lesson_id",
            defaults: {
                name: "",
                unit_id: 0,
                seconds: 0,
                typed: 0,
                errors: 0,
                congrats: "",
                progress: 0,
                caps_warning: 1,
                max_progress: 0
            }
        })
    }),
    define("global/collections/lessons", ["require", "global/models/lesson", "registry", "shared/scoring"], function(e) {
        "use strict";
        var t = e("global/models/lesson")
            , n = e("registry")
            , i = e("shared/scoring");
        return Backbone.Collection.extend({
            model: t,
            comparator: "display_order",
            setup: function() {
                this.user = n.get("student"),
                    n.get("units").reset(FTWGLOBALS("units"));
                var t = n.get("units").pluck("unit_id")
                    , s = FTWGLOBALS("lessons").concat(n.get("customLessons").toJSON())
                    , i = this.user.getSetting("lessons") ? this.user.getSetting("lessons") : null;
                _.isArray(i) && 0 === (i = i.filter(function(e) {
                    return _.findWhere(s, {
                        lesson_id: e
                    })
                })).length && (i = null),
                    s = s.filter(function(e) {
                        return -1 != _.indexOf(t, e.unit_id)
                    }).filter(function(e) {
                        return "grouping" == e.type || !i && e.default_lesson || i && -1 != i.indexOf(e.lesson_id)
                    }),
                    s = _.flatten(_.values(_.groupBy(s, function(e) {
                        return e.unit_id
                    })).map(function(e) {
                        var t = "grouping" == e[e.length - 1].type;
                        return e.reverse().filter(function(e) {
                            return (!t || "grouping" != e.type) && (t = "grouping" == e.type,
                                !0)
                        })
                    })),
                    this.reset(s)
            },
            setProgress: function(e) {
                return this.setup(),
                    e.forEach(function(e) {
                        if (this.get(e.id)) {
                            var t = this.get(e.id)
                                , s = t.get("screens");
                            t.set({
                                progress: Math.min(s, e.get("progress")),
                                max_progress: Math.min(s, Math.max(e.get("progress"), e.get("max_progress"))),
                                speed: i.speed(e.get("typed"), e.get("seconds"), e.get("errors")),
                                accuracy: i.accuracy(e.get("typed"), e.get("errors")),
                                stars: e.get("stars"),
                                seconds: e.get("seconds"),
                                typed: e.get("typed"),
                                errors: e.get("errors"),
                                updated_at: e.get("updated_at"),
                                completed: e.get("completed"),
                                fastest: e.get("fastest")
                            })
                        }
                    }
                        .bind(this)),
                    this
            }
        })
    }),
    define("shared/notice", ["require", "templates"], function(e) {
        "use strict";
        e("templates");
        return Backbone.View.extend({
            events: {
                "click .js-close": "close",
                mouseover: "hover"
            },
            className: "notice notice--s",
            text: "no notice text set",
            initialize: function(e) {
                e.error ? this.$el.addClass("notice--error") : this.$el.addClass("notice--success"),
                    Backbone.View.prototype.initialize.apply(this, arguments)
            },
            close: function() {
                return clearTimeout(this.timeout),
                    this.$el.velocity("fadeOut", this.remove.bind(this)),
                    !1
            },
            show: function() {
                $("body").append(this.$el.html(this.text)),
                    this.timeout = setTimeout(this.close.bind(this), 5e3)
            },
            hover: function() { }
        })
    }),
    define("global/views/ad", ["require", "registry"], function(e) {
        "use strict";
        var n = e("registry")
            , r = Math.floor(20 * Math.random()) ? "floorAds" : "controlAds"
            , o = Backbone.View.extend({
                adTargeting: null,
                pageTargeting: null,
                render: function() {
                    if (!o.canShowAds())
                        return this;
                    this.pageTargeting = this.pageTargeting || {};
                    var e = n.get("student");
                    if (this.pageTargeting.logged_in = n.get("loggedIn") ? "yes" : "no",
                        n.get("loggedIn")) {
                        this.pageTargeting.in_class = e.get("in_class") ? "yes" : "no";
                        var t = "new"
                            , s = Math.floor((Math.floor(Date.now() / 1e3) - e.get("created_at")) / 60 / 60 / 24);
                        365 < s ? t = "over 365 days" : 100 < s ? t = "101-365 days" : 50 < s ? t = "51-100 days" : 10 < s ? t = "11-50 days" : 0 < s && (t = "1-10 days"),
                            this.pageTargeting.account_age = t
                    }
                    this.el.id = this.id,
                        this.$el.css({
                            width: this.size[0] + "px",
                            height: this.size[1] + "px"
                        });
                    var i = this;
                    return setTimeout(function() {
                        googletag.cmd.push(function() {
                            googletag.defineSlot(i.slot, i.size, i.id).addService(googletag.pubads());
                            window.AMAZON_ADS && googletag.pubads().disableInitialLoad(),
                                googletag.pubads().enableSingleRequest(),
                                googletag.enableServices()
                        }),
                            googletag.cmd.push(function() {
                                googletag.display(i.id)
                            })
                    }, 0),
                        this
                }
            }, {
                noAdPages: ["/student", "/student/password", "/student/login", "/student/signup", "/student/start", "/student/password", "/student/oauth"],
                controlAds: {},
                floorAds: {},
                adPage: "",
                initAds: function(e) {
                    if (!this.canShowAds())
                        return !1;
                    var t;
                    "lesson_intro" === (this.adPage = e) ? (t = [300, 600],
                        this.controlAds[t[0] + "x" + t[1]] = new o({
                            id: "div-gpt-ad-3916231013424-0",
                            size: t,
                            slot: "/35254017/TC_Lesson_Intro_300x600_Control"
                        }),
                        this.floorAds[t[0] + "x" + t[1]] = new o({
                            id: "div-gpt-ad-9228907761987-0",
                            size: t,
                            slot: "/35254017/TC_Lesson_Intro_300x600_Floor1"
                        }),
                        t = [160, 600],
                        this.controlAds[t[0] + "x" + t[1]] = new o({
                            id: "div-gpt-ad-8274143975562-0",
                            size: t,
                            slot: "/35254017/TC_Lesson_Intro_160x600_Control"
                        }),
                        this.floorAds[t[0] + "x" + t[1]] = new o({
                            id: "div-gpt-ad-1879452167871-0",
                            size: t,
                            slot: "/35254017/TC_Lesson_Intro_160x600_Floor1"
                        }),
                        t = [300, 250],
                        this.controlAds[t[0] + "x" + t[1]] = new o({
                            id: "div-gpt-ad-5530863543772-0",
                            size: t,
                            slot: "/35254017/TC_Lesson_Intro_2_300x250_Control"
                        }),
                        this.floorAds[t[0] + "x" + t[1]] = new o({
                            id: "div-gpt-ad-6157145785184-0",
                            size: t,
                            slot: "/35254017/TC_Lesson_Intro_2_300x250_Floor1"
                        })) : "game_play" === e ? (t = [970, 90],
                            this.controlAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-9261624027743-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_970x90_Control"
                            }),
                            this.floorAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-4744718206554-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_970x90_Floor1"
                            }),
                            t = [468, 60],
                            this.controlAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-3660375587325-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_2_468x60_Control"
                            }),
                            this.floorAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-5140197210763-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_2_468x60_Floor1"
                            }),
                            t = [320, 50],
                            this.controlAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-9129062889633-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_320x50_Control"
                            }),
                            this.floorAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-9856155217960-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_320x50_Floor1"
                            }),
                            t = [300, 600],
                            this.controlAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-7444224442192-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_300x600_Control"
                            }),
                            this.floorAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-7270269551348-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_300x600_Floor1"
                            }),
                            t = [300, 250],
                            this.controlAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-5154910701351-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_300x250_Control"
                            }),
                            this.floorAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-1581225836208-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_300x250_Floor1"
                            }),
                            t = [160, 600],
                            this.controlAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-6638532037321-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_2_160x600_Control"
                            }),
                            this.floorAds[t[0] + "x" + t[1]] = new o({
                                id: "div-gpt-ad-9233103277544-0",
                                size: t,
                                slot: "/35254017/TC_Game_Play_2_160x600_Floor1"
                            })) : "lesson_screen" === e ? (t = [970, 90],
                                this.controlAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-3054282196274-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_970x90_Control"
                                }),
                                this.floorAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-6292715905483-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_970x90_Floor1"
                                }),
                                t = [728, 90],
                                this.controlAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-9245001256859-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_728x90_Control"
                                }),
                                this.floorAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-9872704643189-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_728x90_Floor1"
                                }),
                                t = [468, 60],
                                this.controlAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-9160337077190-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_468x60_Control"
                                }),
                                this.floorAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-6007227681289-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_468x60_Floor1"
                                }),
                                t = [320, 50],
                                this.controlAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-5102930108543-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_320x50_Control"
                                }),
                                this.floorAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-8672204390722-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_320x50_Floor1"
                                }),
                                t = [300, 600],
                                this.controlAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-3931305775679-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_300x600_Control"
                                }),
                                this.floorAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-7047720019504-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_300x600_Floor1"
                                }),
                                t = [160, 600],
                                this.controlAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-7503911098377-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_2_160x600_Control"
                                }),
                                this.floorAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-7276788543986-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_2_160x600_Floor1"
                                }),
                                t = [300, 250],
                                this.controlAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-5451948300927-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_300x250_Control"
                                }),
                                this.floorAds[t[0] + "x" + t[1]] = new o({
                                    id: "div-gpt-ad-2480804532919-0",
                                    size: t,
                                    slot: "/35254017/TC_Lesson_Screen_300x250_Floor1"
                                })) : (t = [970, 90],
                                    this.controlAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-5168043871729-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_4_970x90_Control"
                                    }),
                                    this.floorAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-3907926832722-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_4_970x90_Floor1"
                                    }),
                                    t = [728, 90],
                                    this.controlAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-3095120872738-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_728x90_Control"
                                    }),
                                    this.floorAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-1502408530712-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_728x90_Floor1"
                                    }),
                                    t = [468, 60],
                                    this.controlAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-7097153922844-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_468x60_Control"
                                    }),
                                    this.floorAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-9670998057892-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_468x60_Floor1"
                                    }),
                                    t = [320, 50],
                                    this.controlAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-3068998803985-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_320x50_Control"
                                    }),
                                    this.floorAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-7791228662593-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_320x50_Floor1"
                                    }),
                                    t = [300, 600],
                                    this.controlAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-1971137319174-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_300x600_Control"
                                    }),
                                    this.floorAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-6548718471744-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_300x600_Floor1"
                                    }),
                                    t = [160, 600],
                                    this.controlAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-9775943648506-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_160x600_Control"
                                    }),
                                    this.floorAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-6467772497742-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_160x600_Floor1"
                                    }),
                                    t = [300, 250],
                                    this.controlAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-2883018025860-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_300x250_Control"
                                    }),
                                    this.floorAds[t[0] + "x" + t[1]] = new o({
                                        id: "div-gpt-ad-7958555434737-0",
                                        size: t,
                                        slot: "/35254017/TC_Dashboard_300x250_Floor1"
                                    }))
                },
                getAds: function(e) {
                    if (e = e || {},
                        !this.canShowAds())
                        return {};
                    var t = window.innerWidth
                        , s = (window.innerHeight,
                            this.adPage)
                        , i = "tc_other";
                    switch (s) {
                        case "dashboard":
                            i = "tc_lessons_list";
                            break;
                        case "games_list":
                            i = "tc_games_list";
                            break;
                        case "game_play":
                            i = "tc_game_play";
                            break;
                        case "lesson_intro":
                            i = "tc_lesson_intro";
                            break;
                        case "lesson_screen":
                            i = "tc_lesson_screen";
                            break;
                        case "tests_list":
                            i = "tc_tests_list"
                    }
                    if ("dashboard" === s)
                        return 1820 <= t ? {
                            skyscraper: this.getAd("300x600", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            squareBottomRight: this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        } : 1660 <= t ? {
                            skyscraper: this.getAd("160x600", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            squareBottomRight: this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        } : 1010 <= t ? {
                            skyscraper: this.getAd("160x600", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            square: this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        } : {
                            square: this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        };
                    if ("game_play" === s)
                        return 1820 <= t ? {
                            top: this.getAd("970x90", {
                                page: i
                            }, {
                                position: "atf"
                            }),
                            skyscraper: this.getAd("300x600", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            squareBottomRight: this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        } : 1660 <= t ? {
                            top: this.getAd("970x90", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            skyscraper: this.getAd("300x600", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            squareBottomRight: this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        } : 1200 <= t ? {
                            top: this.getAd("970x90", {
                                page: i
                            }, {
                                position: "atf"
                            }),
                            skyscraper: this.getAd("160x600", {
                                page: i
                            }, {
                                position: "left"
                            })
                        } : 1010 <= t ? {
                            top: this.getAd("970x90", {
                                page: i
                            }, {
                                position: "atf"
                            })
                        } : 800 <= t ? {
                            top: this.getAd("468x60", {
                                page: i
                            }, {
                                position: "atf"
                            })
                        } : {
                            top: this.getAd("320x50", {
                                page: i
                            }, {
                                position: "atf"
                            })
                        };
                    if ("lesson_intro" === s)
                        return 0 === e.totalScreens ? {} : 1820 <= t ? {
                            skyscraper: this.getAd("300x600", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            squareBottomRight: e.totalScreens <= 1 ? null : this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        } : 1680 <= t ? {
                            skyscraper: this.getAd("160x600", {
                                page: i
                            }, {
                                position: "left"
                            }),
                            squareBottomRight: e.totalScreens <= 1 ? null : this.getAd("300x250", {
                                page: i
                            }, {
                                position: "right"
                            })
                        } : 800 <= t ? {
                            skyscraper: this.getAd("160x600", {
                                page: i
                            }, {
                                position: "left"
                            })
                        } : {};
                    if ("lesson_screen" === s) {
                        if (0 === e.totalScreens)
                            return {};
                        if (1820 <= t)
                            return {
                                top: e.totalScreens <= 2 ? null : this.getAd("970x90", {
                                    page: i
                                }, {
                                    position: "atf"
                                }),
                                skyscraper: this.getAd("300x600", {
                                    page: i
                                }, {
                                    position: "left"
                                })
                            };
                        if (1680 <= t)
                            return {
                                top: e.totalScreens <= 2 ? null : this.getAd("970x90", {
                                    page: i
                                }, {
                                    position: "atf"
                                }),
                                skyscraper: this.getAd("160x600", {
                                    page: i
                                }, {
                                    position: "left"
                                })
                            };
                        if (1010 <= t)
                            return {
                                top: e.totalScreens <= 2 ? null : this.getAd("970x90", {
                                    page: i
                                }, {
                                    position: "atf"
                                }),
                                skyscraper: this.getAd("160x600", {
                                    page: i
                                }, {
                                    position: "left"
                                })
                            };
                        if (800 <= t)
                            return {
                                top: this.getAd("468x60", {
                                    page: i
                                }, {
                                    position: "atf"
                                })
                            };
                        if (508 <= t)
                            return {
                                top: this.getAd("320x50", {
                                    page: i
                                }, {
                                    position: "atf"
                                })
                            }
                    }
                    return 1820 <= t ? {
                        top: this.getAd("970x90", {
                            page: i
                        }, {
                            position: "atf"
                        }),
                        skyscraper: this.getAd("300x600", {
                            page: i
                        }, {
                            position: "left"
                        })
                    } : 1660 <= t ? {
                        top: this.getAd("970x90", {
                            page: i
                        }, {
                            position: "atf"
                        }),
                        skyscraper: this.getAd("160x600", {
                            page: i
                        }, {
                            position: "left"
                        })
                    } : 1010 <= t ? {
                        top: this.getAd("970x90", {
                            page: i
                        }, {
                            position: "atf"
                        }),
                        skyscraper: this.getAd("160x600", {
                            page: i
                        }, {
                            position: "left"
                        })
                    } : 800 <= t ? {
                        top: this.getAd("468x60", {
                            page: i
                        }, {
                            position: "atf"
                        })
                    } : {
                        top: this.getAd("320x50", {
                            page: i
                        }, {
                            position: "atf"
                        })
                    }
                },
                getAd: function(e, t, s) {
                    if (!this.canShowAds())
                        return !1;
                    if (this[r][e]) {
                        var i = this[r][e];
                        return i.pageTargeting = t,
                            i.adTargeting = s,
                            i
                    }
                    console.warn("Can not find ad type " + e + " for page " + this.adPage)
                },
                canShowAds: function() {
                    return "typing" === FTWGLOBALS("site") && "premium" !== localStorage.getItem("student_membership") && -1 === this.noAdPages.indexOf(location.pathname)
                },
                renderAmazonAds: function(e) {
                    if (window.AMAZON_ADS && "undefined" != typeof apstag) {
                        var s = [];
                        _.values(e).forEach(function(e) {
                            if (e) {
                                var t = [[e.size[0], e.size[1]]];
                                970 === e.size[0] && t.push([728, 90]),
                                    s.push({
                                        slotID: e.id,
                                        slotName: e.slot,
                                        sizes: t
                                    })
                            }
                        }),
                            0 < s.length && setTimeout(function() {
                                apstag.fetchBids(s, function(e) {
                                    googletag.cmd.push(function() {
                                        apstag.setDisplayBids(),
                                            googletag.pubads().refresh()
                                    })
                                })
                            }, 0)
                    }
                }
            });
        return o
    }),
    define("lesson/classes/dictation", ["require"], function(e) {
        "use strict";
        var s, i, n = 0, r = window.speechSynthesis || null, o = {
            "!": "exclamation mark",
            "@": "at sign",
            "#": "hash",
            $: "dollar sign",
            "%": "percent",
            "^": "carat",
            "&": "ampersand",
            "*": "asterisk",
            "(": "open parentheses",
            ")": "closed parentheses",
            "-": "minus sign",
            _: "underscore",
            "+": "plus sign",
            "=": "equals sign",
            "/": "slash",
            "{": "open curly brace",
            "}": "closed curly brace",
            "[": "open square bracket",
            "]": " closed square bracket",
            "|": "pipe symbol",
            "<": "less than sign",
            ">": "greater than sign",
            "?": "question mark",
            "\\": "back-slash",
            " ": "space",
            "\n": "space",
            "⏎": "enter",
            ":": "colon",
            ";": "semicolon",
            "'": "apostrophe",
            '"': "quotation mark",
            "~": "tilde",
            "`": "back-quote",
            ",": "comma",
            ".": "period"
        }, l = {
            g: "one key to the right",
            h: "one key to the left",
            t: "up and to the right one key",
            y: "up and to the left one key",
            b: "down and to the right one key",
            n: "down and to the left one key",
            5: "up two rows, and to the right one key",
            "%": "up two rows, and to the right one key",
            6: "up two rows, and to the left one key",
            "^": "up two rows, and to the left one key",
            "'": "one key to the right",
            '"': "one key to the right"
        }, t = function(e, t, s) {
            this.screen = e,
                this.keyboard = t,
                this.user = s,
                $(window).bind("beforeunload", function() {
                    this.stop()
                }
                    .bind(this))
        };
        return _.extend(t.prototype, {
            setProperties: function(e, t) {
                this.screen = e,
                    this.keyboard = t
            },
            canDictate: function(e) {
                return e && "function" == typeof SpeechSynthesisUtterance && r && "en" === FTWGLOBALS("language") && this.user.getSetting("dictation") && this.user.hasOption("allowdictation") && (!this.screen || "none" !== this.screen.get("dictation_type"))
            },
            trackCall: function(e, t) {
                s = e,
                    i = t
            },
            speakIntro: function(e) {
                if (this.trackCall(e, "speakIntro"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = e.title;
                    if (t.match(/:/)) {
                        var s = e.title.split(/:/);
                        s.shift(),
                            t = s.join("")
                    }
                    var i = "Welcome to " + t + "! ";
                    e.intro.trim() && (i += e.intro.trim().stripHTML()),
                        i += ". Press the enter key to continue.",
                        this.speak(i)
                }
            },
            speakQAIntro: function(e) {
                if (this.trackCall(e, "speakQAIntro"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = "Welcome to this digital literacy lesson. In this lesson you will learn about " + this.formatTitle(e.title) + ". After the lesson you will be asked a series of questions. Let's get started!";
                    e.intro.trim() && (t += e.intro.trim().stripHTML().replaceAll(/\s+/g, " ")),
                        t += " Press enter to begin the test.",
                        this.speak(t)
                }
            },
            speakVideoIntro: function(e) {
                if (this.trackCall(e, "speakVideoIntro"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = "Welcome to " + this.formatTitle(e.title) + '! This lesson has an intro video. To play, press the "p" key. To skip the video, press Enter';
                    this.speak(t)
                }
            },
            speakVideoIntroEnding: function(e) {
                if (this.trackCall(e, "speakVideoIntroEnding"),
                    this.canDictate(e)) {
                    this.stop();
                    this.speak("Press the enter key to continue.")
                }
            },
            speakScreen: function(e) {
                if (this.trackCall(e, "speakScreen"),
                    this.canDictate(e) && e.nextKey) {
                    this.stop();
                    var t = 0
                        , s = "";
                    e.begin ? this.screen.get("new_key") && "key_confirm" === e.mode ? s = "You found it!  Remember where that " + this.getKeyName(this.screen.get("new_key")) + " key is because we're going to practice it now!  Press Enter to begin." : this.screen.get("new_key") && !e.mode ? s = "It's time to learn the " + this.getKeyName(this.screen.get("new_key")) + " key. " + this.getFingerDetails(this.screen.get("new_key"), !1) + " to type the " + this.getKeyName(this.screen.get("new_key")) + " key." : ("type-a-balloon" !== this.screen.get("screen_type") && "baron-von-typesfast" !== this.screen.get("screen_type") || (s = "A Typing game is about to begin. Type the " + this.screen.get("dictation_type") + "s as they appear. "),
                        "letters" === this.screen.get("dictation_type") || 1 === this.getWordAt(this.screen.get("content"), 0).length ? this.isLetter(e.nextKey) ? s += "To begin, type the letter: " + this.getKeyName(e.nextKey) + "." : this.isNumber(e.nextKey) ? s += "To begin, type the number: " + e.nextKey + "." : s += "To begin, type the " + this.getKeyName(e.nextKey) + " key." : "words" === this.screen.get("dictation_type") && (s += "To begin, type the word " + this.formatWord(this.getWordAt(this.screen.get("content"), 0)) + ". " + this.getKeyName(e.nextKey) + ".")) : e.isError ? (s = "Oops, you typed " + this.getKeyName(e.letterTyped),
                            e.lastKeyError && (s += ", type the " + this.getKeyName(e.nextKey) + " key")) : "letters" === this.screen.get("dictation_type") || 1 === this.getWordAt(this.screen.get("content"), e.typed).length ? s = this.getKeyName(e.nextKey) + "." : "words" === this.screen.get("dictation_type") && (e.nextWord ? s = e.nextWord + "." : " " !== e.nextKey && " " === e.correctLetter ? s = this.formatWord(this.getWordAt(this.screen.get("content"), e.typed)) + '. "' + this.getKeyName(e.nextKey) + '"' : this.isSymbol(e.nextKey) ? s = this.getKeyName(e.nextKey) + "." : (s = this.getKeyName(e.nextKey) + ".",
                                t = 500)),
                        this.screen.get("new_key") && e.begin || (s += this.getFingerDetails(e.nextKey, !0) + " to type the " + this.getKeyName(e.nextKey) + " key."),
                        "local" === FTWGLOBALS("env") && console.log("Dictation contents: " + s),
                        clearTimeout(n),
                        n = setTimeout(function() {
                            this.speak(s)
                        }
                            .bind(this), t)
                }
            },
            speakScreenComplete: function(e) {
                if (this.trackCall(e, "speakScreenComplete"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = "Congratulations! You have completed this screen, and earned " + e.stars + " star" + e.stars.pluralize() + "!";
                    t += " You spent " + this.secondsToWords(e.seconds) + ", and your speed averaged " + e.speed + " words per minute with " + e.accuracy + "% accuracy.",
                        t += " Press the enter key to continue.",
                        this.speak(t)
                }
            },
            speakLessonComplete: function(e) {
                if (this.trackCall(e, "speakLessonComplete"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = "Congratulations, you have completed this entire lesson! You earned " + e.stars + " out of " + e.totalStars + " stars.";
                    t += " You spent " + this.secondsToWords(e.seconds) + ", and your speed averaged " + e.speed + " word" + e.speed.pluralize() + " per minute with " + e.accuracy + "% accuracy.",
                        this.speak(t)
                }
            },
            speakTestComplete: function(e) {
                if (this.trackCall(e, "speakTestComplete"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = "Congratulations, you have completed this typing test!";
                    t += " You spent " + this.secondsToWords(e.seconds) + ", and your speed averaged " + e.speed + " word" + e.speed.pluralize() + " per minute with " + e.accuracy + "% accuracy.",
                        this.speak(t)
                }
            },
            speakQALessonComplete: function(e) {
                if (this.trackCall(e, "speakQALessonComplete"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = 'Congratulations, you have completed the "' + e.lesson.name + '" quiz. You answered ' + e.numCorrectAnswers + " out of " + e.lesson.screens + " question" + e.lesson.screens.pluralize() + " correctly.";
                    this.speak(t)
                }
            },
            speakQAQuestion: function(e) {
                if (this.trackCall(e, "speakQAQuestion"),
                    this.canDictate(e)) {
                    this.stop();
                    var s = "";
                    e.question = e.question.replace("_", " ...blank... "),
                        s = 1 === e.questionIndex ? "This quiz contains " + e.questionCount + " questions. Answer questions by pressing the corresponding number key. Press zero to repeat the question... To begin, answer the following question: " + e.question + ". " : e.questionIndex === e.questionCount ? "Last question. " + e.question + ". Is it... " : "Question " + e.questionIndex + " of " + e.questionCount + ". " + e.question + ". Is it... ",
                        e.answers.forEach(function(e, t) {
                            s = s + (t + 1) + "... " + e + "... "
                        }),
                        s += ",,,, Press zero to repeat the question.",
                        this.speak(s)
                }
            },
            speakQAAnswer: function(e) {
                if (this.trackCall(e, "speakQAAnswer"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = e.text += ",,,, Press Enter to submit your answer.";
                    this.speak(t)
                }
            },
            speakFailed: function(e) {
                if (this.trackCall(e, "speakFailed"),
                    this.canDictate(e)) {
                    this.stop();
                    var t = "Oh no, you missed the benchmark!";
                    ("type-a-balloon" === this.screen.get("screen_type") || "baron-von-typesfast" === this.screen.get("screen_type")) && this.screen.get("typed") < this.screen.get("content").length ? t += " To complete this screen you must type all of the screen content in the game." : (t += " You've completed this screen with ",
                        this.screen.get("min_speed") > e.speed && (t += e.speed + " word" + parseInt(e.speed).pluralize() + " per minute "),
                        this.screen.get("min_speed") > e.speed && this.screen.get("min_acc") > e.accuracy && (t += " and "),
                        this.screen.get("min_acc") > e.accuracy && (t += e.accuracy + "% accuracy."),
                        t += ". ",
                        t += " To move on, you must complete the screen with a minimum of ",
                        this.screen.get("min_speed") > e.speed && (t += this.screen.get("min_speed") + " word" + parseInt(this.screen.get("min_speed")).pluralize() + " per minute "),
                        this.screen.get("min_speed") > e.speed && this.screen.get("min_acc") > e.accuracy && (t += " and "),
                        this.screen.get("min_acc") > e.accuracy && (t += this.screen.get("min_acc") + "% accuracy."),
                        t += ". "),
                        t += " Press the enter key to try again.",
                        this.speak(t)
                }
            },
            speak: function(e) {
                var t = new SpeechSynthesisUtterance;
                return this.dictationResume && (e = "Dictation is on... " + e,
                    this.dictationResume = !1),
                    t.text = e,
                    r.speak(t)
            },
            stop: function() {
                r && r.cancel()
            },
            resume: function() {
                s && i ? (this.dictationResume = !0,
                    this[i].call(this, s, i)) : this.speak("Dictation is on.")
            },
            turnOff: function() {
                if (r) {
                    r.cancel();
                    var e = new SpeechSynthesisUtterance;
                    e.text = "Dictation is off",
                        e.onend = function() {
                            r.cancel()
                        }
                        ,
                        r.speak(e)
                }
            },
            getFingerDetails: function(e, t) {
                if (!this.keyboard)
                    return "";
                var s, i = this.keyboard.getFingerFor(e), n = this.keyboard.getRowFor(e), r = this.keyboard.getKeyRequiresShift(e), o = i <= 5 ? "left" : "right", a = " ";
                switch (i) {
                    case 1:
                    case 10:
                        s = "pinkie";
                        break;
                    case 2:
                    case 9:
                        s = "ring finger";
                        break;
                    case 3:
                    case 8:
                        s = "middle finger";
                        break;
                    case 4:
                    case 7:
                        s = "index finger";
                        break;
                    default:
                        s = "thumb"
                }
                return r && (a += "left" === o ? "Hold the right shift, and " : "Hold the left shift, and "),
                    l[e] ? a += "move your " + o + " " + s + " " + l[e] : 0 === n ? a += "move your " + o + " " + s + " up two rows" : 1 === n ? a += "move your " + o + " " + s + " up" : 2 === n ? a += "use your " + o + " " + s : 3 === n ? a += "move your " + o + " " + s + " down" : 4 === n && (a += "use your " + o + " " + s),
                    t && (a = " ,,,, " + a),
                    a
            },
            getWordAt: function(e, t) {
                var s = e.slice(0, t + 1).search(/\S+$/)
                    , i = e.slice(t).search(/\s/);
                return i < 0 ? e.slice(s) : e.slice(s, i + t)
            },
            formatWord: function(e) {
                return Number(e) == e ? e : '"' + e + '"'
            },
            getKeyName: function(e) {
                var t = o[e];
                return t || (this.isNumber(e) ? e : e === e.toUpperCase() ? 'Upper case "' + e.toLowerCase() + '"' : $.isIOS() ? e.toUpperCase() + "," : "," + e.toUpperCase() + ",")
            },
            secondsToWords: function(e) {
                var t = "";
                if ((e = Math.floor(e)) <= 60)
                    t = e + " second" + e.pluralize();
                else {
                    var s = Math.floor(e / 60)
                        , i = e - 60 * s;
                    t = s + " minute" + s.pluralize() + " " + i + " second" + i.pluralize()
                }
                return t
            },
            formatTitle: function(e) {
                if (e && e.match(/:/)) {
                    var t = e.split(/:/);
                    t.shift(),
                        e = t.join("")
                }
                return e
            },
            isLetter: function(e) {
                return e.match(/[a-zA-Z]/)
            },
            isNumber: function(e) {
                return e == Number(e)
            },
            isSymbol: function(e) {
                return o[e]
            }
        }),
            t
    }),
    define("shared/form_model", ["require", "registry"], function(e) {
        "use strict";
        var s = e("registry");
        return Backbone.Model.extend({
            fileUpload: null,
            offlineSupport: !1,
            validationRules: {},
            validationMessages: {},
            sync: function() {
                if (this.offlineSupport && !s.get("loggedIn"))
                    return $.Deferred().resolve(this.toJSON());
                if (!this.fileUpload)
                    return Backbone.Model.prototype.sync.apply(this, arguments);
                var e, t = "post";
                return this.id ? (t = "patch",
                    e = this.urlRoot ? this.urlRoot + "/" + this.id : "function" == typeof this.url ? this.url() : this.url) : e = this.urlRoot ? this.urlRoot : "function" == typeof this.url ? this.url() : this.url,
                    $.ajax({
                        url: e,
                        method: "POST",
                        data: new FormData($(this.fileUpload)[0]),
                        dataType: "json",
                        processData: !1,
                        contentType: !1,
                        headers: {
                            "X-HTTP-METHOD-OVERRIDE": t
                        }
                    }).done(function(e) {
                        this.set(e)
                    }
                        .bind(this))
            }
        })
    }),
    define("global/models/language_form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            offlineSupport: !0,
            defaults: {},
            validationRules: {},
            validationMessages: {},
            url: "/apiv1/student/user/profile"
        })
    }),
    define("shared/modal", ["require", "templates", "registry"], function(e) {
        "use strict";
        var t = e("templates")
            , s = e("registry");
        return Backbone.View.extend({
            className: location.pathname.match(/^\/admin/) ? "modal" : "",
            modalTemplatePath: ["global", "modal"],
            formSelector: "form",
            titleText: "shared.no_title_text".t(),
            okText: "shared.ok_text".t(),
            cancelText: "shared.cancel_text".t(),
            closeButton: !0,
            type: "standard",
            useModalsForm: !1,
            initialize: function() {
                this.useModalsForm && (this.formSelector = "form"),
                    Backbone.View.prototype.initialize.apply(this, arguments),
                    this.modalBaseTemplate = t(this.modalTemplatePath[0], this.modalTemplatePath[1]);
                var e = this.events || {};
                _.extend(e, {
                    "click .cancel,.close,.js-close,.js-cancel": "cancel"
                }),
                    this.formSelector || _.extend(e, {
                        "click .js-submit,.submit": "submitCallback"
                    }),
                    this.delegateEvents(e),
                    this.$el.html(this.modalBaseTemplate({
                        useModalsForm: this.useModalsForm,
                        type: this.type,
                        titleText: this.titleText,
                        okText: this.okText,
                        cancelText: this.cancelText,
                        closeButton: this.closeButton
                    })),
                    _.extend(this, $.Deferred())
            },
            captureKeys: function(e) {
                return 27 === e.which ? (this.cancel(),
                    !1) : 13 === e.which && "TEXTAREA" !== e.target.tagName ? (this.$(".js-submit").click(),
                        !1) : void 0
            },
            open: function() {
                s.set("preventKeyboardInput", !0),
                    $(document).on("keydown.close-modal", this.captureKeys.bind(this));
                var e = this.data ? this.data.banner_announcement_id : null;
                return this.bootstrap || $("body").append(this.el).addClass(e ? "" : "is-modal"),
                    this.render(),
                    this.initializeValidation(),
                    this.bootstrap ? this.$el.modal({
                        backdrop: "static",
                        keyboard: !1
                    }) : this.$(".modal").addClass("is-open").find("input[type=text]:eq(0),input[type=email]:eq(0)").focus(),
                    this
            },
            close: function() {
                s.set("preventKeyboardInput", !1),
                    $(document).off("keydown.close-modal"),
                    this.bootstrap ? this.$el.modal("hide") : (this.$(".modal").removeClass("is-open"),
                        this.$(".modal-overlay").remove(),
                        $("body").removeClass("is-modal"),
                        setTimeout(function() {
                            this.remove()
                        }
                            .bind(this), 1e3),
                        setTimeout(function() {
                            this.destroyIDE()
                        }
                            .bind(this), 0))
            },
            cancel: function() {
                return this.validator && this.validator.submitting || (this.close(),
                    this.reject()),
                    !1
            },
            submitCallback: function(e) {
                return this.close(),
                    Backbone.View.prototype.submitCallback.apply(this, arguments),
                    this.resolve(e),
                    !1
            },
            serialize: function() {
                var e = this.model ? this.model.toJSON() : null;
                return e || (e = this.data || {}),
                {
                    data: e
                }
            },
            render: function() {
                var e = t(this.templatePath[0], this.templatePath[1]);
                return this.$(".js-content").html(e(this.serialize())),
                    setTimeout(function() {
                        this.setupIDE()
                    }
                        .bind(this), 0),
                    this
            }
        })
    }),
    define("global/views/language_modal", ["require", "registry", "global/models/language_form", "shared/modal"], function(e) {
        "use strict";
        var s = e("registry")
            , t = e("global/models/language_form");
        return e("shared/modal").extend({
            titleText: "account.language_settings_title".t(),
            templatePath: ["global", "language_modal"],
            type: "long",
            modelClass: t,
            formSelector: "form",
            events: {
                "change #form-ele-language": "changeLanguageInline"
            },
            serialize: function() {
                var e = s.get("products")
                    , t = s.get("languages");
                return {
                    languages: t.toJSON().map(function(e) {
                        return [e.id, e.name]
                    }),
                    keyboards: FTWGLOBALS("keyboards").map(function(e) {
                        return [e.keyboard_id, e.name]
                    }),
                    language: FTWGLOBALS("language"),
                    keyboard_id: this.user.getSetting("keyboard_id"),
                    product_id: this.user.getSetting("product_id"),
                    products: e.toJSON().map(function(e) {
                        return [e.product_id, t.get(e.language).get("name")]
                    })
                }
            },
            changeLanguageInline: function(e) {
                var t = $(e.currentTarget).val()
                    , s = this.$("label[for=form-ele-language]")
                    , i = this.$("label[for=form-ele-product_language]")
                    , n = this.$("label[for=form-ele-keyboard_id]");
                s.text(("language_modal." + t + "_site_language").t()),
                    i.text(("language_modal." + t + "_curriculum_language").t()),
                    n.text(("language_modal." + t + "_keyboard_layout").t())
            }
        })
    }),
    define("global/models/unit", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "unit_id",
            defaults: {
                name: "",
                subject: "",
                header: "",
                product_id: "",
                type: "",
                display_order: 0
            }
        })
    }),
    define("global/collections/units", ["require", "registry", "global/models/unit", "shared/scoring"], function(e) {
        "use strict";
        var f = e("registry")
            , t = e("global/models/unit")
            , v = e("shared/scoring");
        return Backbone.Collection.extend({
            model: t,
            comparator: "display_order",
            setProgress: function(e) {
                var p, m = e.toJSON();
                this.forEach(function(e) {
                    var t, s, i = 0, n = e.get("type"), r = "lesson" == n && f.get("student").hasOption("sequential"), o = null;
                    if ("problemkeys" != n && "instruction" != n && "test" != n && "custom_test" != n) {
                        var a = (p = _.where(m, {
                            unit_id: e.id,
                            type: "lesson"
                        })).reduce(function(e, t) {
                            return e + t.max_progress
                        }, 0);
                        if (0 < a) {
                            var l = _.indexOf(p, _.max(p, function(e) {
                                return e.max_progress >= e.screens ? e.updated_at : 0
                            }))
                                , c = _.max(p, function(e) {
                                    return e.max_progress >= e.screens ? 0 : e.updated_at
                                })
                                , d = p.filter(function(e) {
                                    return e.max_progress < e.screens
                                })
                                , h = _.max(p, function(e) {
                                    return e.updated_at
                                });
                            if (t = p.reduce(function(e, t) {
                                return e + t.seconds
                            }, 0),
                                s = p.reduce(function(e, t) {
                                    return e + t.typed
                                }, 0),
                                i = p.reduce(function(e, t) {
                                    return e + t.errors
                                }, 0),
                                c.max_progress >= c.screens && (c = null),
                                d.length) {
                                if (-1 == l)
                                    r ? o = _.where(p, {
                                        unit_id: e.id,
                                        type: "lesson"
                                    })[0] : (o = _.max(p, function(e) {
                                        return e.updated_at
                                    })).max_progress >= o.screens && (o = null);
                                else if (r)
                                    o = d[0];
                                else if (h.max_progress < h.screens)
                                    o = h;
                                else if (l == p.length - 1)
                                    o = null;
                                else {
                                    var u = p.slice(l).filter(function(e) {
                                        return e.max_progress < e.screens
                                    });
                                    o = u.length ? u[0] : null
                                }
                                if (!o)
                                    if (c)
                                        o = c;
                                    else {
                                        var g = p.filter(function(e) {
                                            return e.max_progress < e.screens
                                        });
                                        o = g.length ? g[0] : null
                                    }
                            }
                        } else
                            o = _.where(p, {
                                unit_id: e.id,
                                type: "lesson"
                            })[0];
                        e.set({
                            progress: a,
                            active_lesson: o ? o.lesson_id : null,
                            speed: v.speed(s, t, i),
                            accuracy: v.accuracy(s, i),
                            screens: p.reduce(function(e, t) {
                                return e + t.screens
                            }, 0)
                        })
                    }
                })
            }
        })
    }),
    define("global/views/layout", ["require", "global/views/layout_basic", "global/views/dashboard", "global/views/nav", "global/collections/lessons", "registry", "shared/scoring", "global/collections/skins", "global/views/tooltip", "shared/notice", "global/views/ad", "lesson/classes/dictation", "global/views/language_modal", "global/collections/units"], function(e) {
        "use strict";
        var t = e("global/views/layout_basic")
            , s = e("global/views/dashboard")
            , i = e("global/views/nav")
            , n = e("global/collections/lessons")
            , r = e("registry")
            , l = e("shared/scoring")
            , o = e("global/collections/skins")
            , c = e("global/views/tooltip")
            , a = e("shared/notice")
            , d = e("global/views/ad")
            , h = e("lesson/classes/dictation")
            , u = e("global/views/language_modal")
            , g = e("global/collections/units");
        return t.extend({
            templatePath: ["global", "layout"],
            events: {
                "click .js-logout": "logOut",
                "click .js-time": "changeTime",
                "click .js-skin": "changeSkin",
                "click .js-hide-announcement": "hideAnnouncement",
                "click .js-language": "showLanguageModal",
                "click .js-dictation": "toggleDictation"
            },
            initialize: function() {
                t.prototype.initialize.apply(this, arguments),
                    this.user = r.get("student"),
                    this.userLettersTyped = r.get("userLettersTyped"),
                    this.userActivity = r.get("userActivity"),
                    this.skins = new o(FTWGLOBALS("skins")),
                    this.lessons = new n(FTWGLOBALS("lessons")),
                    this.units = new g(FTWGLOBALS("units")),
                    this.ads = d.canShowAds(),
                    (location.pathname.match(/\/student\/upgrade/) || location.pathname.match(/\/student\/start/)) && (this.ads = 0),
                    this.views.nav = new i,
                    this.views.dashboard = new s({
                        ads: this.ads
                    }),
                    this.views.miniDashboard = new s({
                        mini: !0
                    }),
                    $(document).keydown(function(e) {
                        if ((e.metaKey || e.ctrlKey) && e.shiftKey && "d" === e.key)
                            return this.toggleDictation(),
                                e.preventDefault,
                                !1
                    }
                        .bind(this)),
                    this.addChild(".js-nav", this.views.nav),
                    this.addChild(".js-dashboard", this.views.dashboard),
                    this.addChild(".js-dashboard-mini", this.views.miniDashboard),
                    this.setupFixedNav(),
                    this.dropdown()
            },
            setupFixedNav: function() {
                var t, s;
                $(window).scroll(_.debounce(function(e) {
                    t || (t = this.$("#app")),
                        s || (s = this.$(".js-fixed-nav")),
                        window.scrollY >= t.offset().top ? (s.show(),
                            s.attr("aria-hidden", !1),
                            setTimeout(function() {
                                s.addClass("is-active")
                            }, 10)) : (s.removeClass("is-active"),
                                setTimeout(function() {
                                    s.hide(),
                                        s.attr("aria-hidden", !0)
                                }, 500))
                }, 100))
            },
            serialize: function() {
                var e = this.skins.get(this.user.get("skin_id") || 1)
                    , t = this.userActivity.getOrAdd(0).toJSON()
                    , s = e.getRank(t.typed - t.errors);
                _.findWhere(FTWGLOBALS("products"), {
                    product_id: this.user.getSetting("product_id")
                });
                return {
                    ads: this.ads,
                    dashboard: this.dashboard,
                    loggedIn: r.get("loggedIn"),
                    user: this.user.toJSON(),
                    skin: e.toJSON(),
                    skins: this.skins.toJSON(),
                    scoreboard: r.get("student").hasOption("scoreboard"),
                    lockAccount: r.get("student").hasOption("lockaccount"),
                    changePassword: r.get("student").hasOption("changepassword"),
                    noGames: _.isArray(r.get("student").get("games")) && 0 === r.get("student").get("games").length,
                    rank: s,
                    product_logo: this.logoImage,
                    hideAnnoucement: $.cookie("hideAnnoucement"),
                    osType: $.isMac() ? "mac" : "win",
                    language: r.get("languages").get(FTWGLOBALS("language")).toJSON()
                }
            },
            logOut: function() {
                return r.get("student").logOut(),
                    location.href = __url("/student/login"),
                    !1
            },
            changeTime: function(e) {
                var t = $(e.currentTarget)
                    , s = t.data("id")
                    , i = t.text();
                this.user.set({
                    _dashboardDaysBack: s
                });
                var n = this.userActivity.getCompiled(s)
                    , r = this.$(".js-speed");
                if (r.length) {
                    r.countdown(l.speed(n.typed, n.seconds, n.errors), null, 400).parent().velocity("fadeIn"),
                        this.$(".js-accuracy").countdown(0 < n.typed ? l.accuracy(n.typed, n.errors) : 0, null, 400).parent().velocity("fadeIn");
                    var o = this.$(".js-time-spent")
                        , a = o.data("data");
                    o.data("data", n.seconds),
                        o.countdown([n.seconds, a], {
                            formatter: function(e) {
                                return e.countdownSeconds(!0, !0)
                            }
                        }, 400, function() {
                            0 < n.seconds && n.seconds < 60 && o.text("dashboard.less_than_1_min".t())
                        }).parent().velocity("fadeIn")
                }
                return this.$(".js-time-button").html(i),
                    c.hideAll(),
                    !1
            },
            changeSkin: function(e) {
                var t = $(e.currentTarget).data("id")
                    , s = this.user.get("skin_id");
                return this.user.changeSkin(t),
                    this.$(".js-skin-flag").removeClass("flag--" + this.user.getSkinName(s)).addClass("flag--" + this.user.getSkinName(t)),
                    !1
            },
            hideAnnouncement: function() {
                return this.$(".js-announcement").remove(),
                    $.cookie("hideAnnoucement", 1, {
                        path: "/",
                        expires: 30
                    }),
                    !1
            },
            showLanguageModal: function() {
                var e = new u({
                    user: this.user
                });
                return e.open(),
                    e.done(function(e) {
                        e.keyboard_id = parseInt(e.keyboard_id),
                            this.user.setSettings(e);
                        var t = (location.pathname + location.hash).replace(new RegExp("^/" + FTWGLOBALS("language")), "");
                        location.href = "en" === e.language ? t : "/" + e.language + t
                    }
                        .bind(this)),
                    !1
            },
            dropdown: function() {
                $(".js-dropdown").keydown(function(e) {
                    13 !== e.which || $(e.target).hasClass("dropdown-item") && $(e.target).hasClass("popdown-item") || (e.preventDefault,
                        $(this).addClass("is-hover"),
                        $(".js-dropdown.is-hover .dropdown-item:first-of-type, .js-dropdown.is-hover .popdown-item:first-of-type").focus())
                }),
                    $(".js-dropdown").focus(function() {
                        $("body").click(function() {
                            $(".js-dropdown").removeClass("is-hover"),
                                $("body").unbind("click")
                        })
                    }),
                    $(".dropdown-item, .popdown-item").keydown(function(e) {
                        if (9 === e.which || 27 === e.which) {
                            var t = $(this).parent().parent()
                                , s = t.attr("id")
                                , i = $(this).children().hasClass("dropdown-link")
                                , n = i ? $(".js-dropdown#" + s + " .dropdown-link") : $(".js-dropdown#" + s + " .dropdown-item, .js-dropdown#" + s + " .popdown-item")
                                , r = i ? n.parent().index(this) : n.index(this);
                            27 === e.which && (t.removeClass("is-hover"),
                                setTimeout(function() {
                                    t.focus()
                                }, 10)),
                                e.shiftKey && 9 === e.which ? (e.preventDefault,
                                    0 === r ? setTimeout(function() {
                                        n.eq(n.length - 1).focus()
                                    }, 10) : setTimeout(function() {
                                        n.eq(r - 1).focus()
                                    }, 10)) : 9 === e.which && (e.preventDefault,
                                        r < n.length - 1 ? setTimeout(function() {
                                            n.eq(r + 1).focus()
                                        }, 10) : setTimeout(function() {
                                            n.eq(0).focus()
                                        }, 10))
                        }
                    })
            },
            toggleDictation: function() {
                this.user.setSettings({
                    dictation: !this.user.getSetting("dictation")
                }),
                    new a({
                        text: "global.dictation_confirmation".t({
                            dictationStatus: this.user.getSetting("dictation") ? "shared.switch_label_on".t() : "shared.switch_label_off".t()
                        })
                    }).show(this.button);
                var e = new h;
                this.user.getSetting("dictation") ? e.resume() : e.turnOff()
            }
        })
    }),
    define("global/models/lesson_screen", ["require", "registry"], function(e) {
        "use strict";
        var g = e("registry");
        return Backbone.Model.extend({
            idAttribute: "lesson_screen_id",
            defaults: {
                content: "",
                formatted_content: "",
                lastKey: "",
                line: 0,
                typed: 0,
                errors: 0,
                seconds: 0,
                two_stars: 90,
                three_stars: 95,
                lastKeyCode: 0,
                lastKeyError: !1
            },
            formatContent: function(e) {
                var t = this.get("content").rtrim()
                    , s = this.get("title")
                    , i = this.get("intro");
                i && (i = this.replaceCodingVariables(i, e));
                var n = new RegExp(String.fromCharCode(160), "g")
                    , r = t = t.replace(n, " ").replace(/\r/g, "").replace(/\s+\n/g, "\n").replace(/[’‘]/g, "'").replace(/[”“]/g, '"').replace(/ {3,6}/g, "\t").replace(/  /g, " ");
                if ("block" === this.get("screen_type") ? (t = t.replace(/\n|\r/g, ""),
                    "space" === this.get("new_key") && this.set("new_key", " ")) : this.set("new_key", ""),
                    "baron-von-typesfast" === this.get("screen_type")) {
                    var o = this.get("content").split("\n");
                    t = o[0].replace(/\s/g, "") + o[1]
                } else
                    t = this.periodSpacing(t, e.get("spaces"));
                "block" !== this.get("screen_type") && (t = (t = t.replace(/⏎\n/g, "⏎")).replace(/^ +/g, "").replace(/\n+ +/g, "\n")),
                    t.match(/⏎[^\n]/) || (t = t.replace(/⏎ +/g, "⏎")),
                    this.set({
                        title: s,
                        intro: i,
                        content: t,
                        formatted_content: r
                    })
            },
            getContentByLine: function() {
                return _.compact(this.get("formatted_content").split(/\n/)).map(function(e, t, s) {
                    return e = e.split(""),
                        t < s.length - 1 && ("block" === this.get("screen_type") || "⏎" !== e[e.length - 1]) && e.push("\n"),
                        e
                }
                    .bind(this))
            },
            getContentByWord: function() {
                var n = []
                    , r = []
                    , e = this.get("formatted_content")
                    , t = e.match(/⏎[^\n]/) ? /[ \n]/g : /[ \n⏎]/g
                    , o = e.match(t);
                return e.split(t).forEach(function(s, i) {
                    "" === s && " " === o[i] && (s = " "),
                        s.split("").forEach(function(e, t) {
                            r.push(e),
                                t === s.length - 1 && (o && o[i] && " " !== e && r.push(o[i]),
                                    n.push(r),
                                    r = [])
                        })
                }),
                    n
            },
            charAt: function(e) {
                return (this.get("content") || "")[e]
            },
            handleInput: function(e) {
                var t = this.get("typed")
                    , s = this.get("screen_type")
                    , i = this.get("errors")
                    , n = t
                    , r = e.key
                    , o = this.get("content")
                    , a = this.charAt(n)
                    , l = !1;
                if ("\n" == a && " " == r && (a = " "),
                    "⏎" == a && "\n" == r && (a = "\n"),
                    !(n >= this.get("content").length)) {
                    if ("BACKSPACE" == r) {
                        if ("falling" === s || "block" === s)
                            return;
                        if (g.get("student").hasOption("nobackspace"))
                            return;
                        0 < n && (n -= 1)
                    } else {
                        if (e.special)
                            return;
                        a == r ? n += 1 : a != r && (l = !0,
                            this.get("lastKeyError") || (n += "falling" === this.get("screen_type") || "block" === this.get("screen_type") ? 0 : 1,
                                i += 1))
                    }
                    var c = $.wordAtPosition(o, n)
                        , d = c.replace(/^[^a-zA-Z]|[^a-zA-Z]$/g, "")
                        , h = 1 < d.length && d.toUpperCase() === d && !d.match(/[^a-zA-Z]/)
                        , u = {
                            isError: l,
                            typed: n,
                            nextKey: this.charAt(n),
                            letterTyped: r,
                            lastKeyError: l,
                            errors: i,
                            correctLetter: a,
                            keyStamp: Date.now(),
                            currentWord: c,
                            isCapsLockWord: h
                        };
                    return this.set(u),
                        n >= o.length && this.trigger("complete"),
                        u
                }
            },
            handleGameInput: function(e, t) {
                var s = this.get("typed")
                    , i = (this.get("screen_type"),
                        this.get("errors"))
                    , n = s
                    , r = e.key
                    , o = !1
                    , a = t.onKeyPressed(e);
                if (a) {
                    a.success ? n += 1 : (o = !0,
                        this.get("lastKeyError") || (i += 1));
                    var l = {
                        isError: o,
                        typed: n,
                        nextKey: a.nextKey,
                        nextWord: a.nextWord,
                        letterTyped: r,
                        lastKeyError: o,
                        errors: i,
                        correctLetter: r,
                        keyStamp: Date.now()
                    };
                    return this.set(l),
                        l
                }
            },
            periodSpacing: function(e, t) {
                if ((t = t || 1) < 1 || 2 < t)
                    throw new Error("Only 1 or 2 spaces after a period");
                var s = 1 == t ? " " : "  ";
                return e.replace(/(\.|\?|!) +/g, "$1" + s).replace(/(mrs\.|mr\.|sr\.|st\.|ms\.|\s\w\.|inc\.|lt\.|jr\.|dr\.|\sgt\.|ft\.|st\.|ave\.|rd\.|in\.|hrs\.|e\.g\.|ot\.|lol\.|ed\.|fl\.|off\.|ord\.|rt\.|rds\.|asstd\.|ea\.|ltd\.|ins\.|reg\.|c\.o\.d\.) /gi, "$1 ")
            },
            quickComplete: function() {
                this.set({
                    typed: 1,
                    fastForward: 1
                }),
                    this.trigger("complete")
            },
            setPeriodSpacing: function(e) {
                this.set({
                    content: this.periodSpacing(this.get("content"), e),
                    period_spacing: e
                })
            },
            replaceCodingVariables: function(e, t) {
                t.toJSON();
                var s = _.findWhere(FTWGLOBALS("lessons"), {
                    lesson_id: this.get("lesson_id")
                })
                    , i = s ? s.unit_id : null
                    , n = i ? _.sortBy(_.where(FTWGLOBALS("lessons"), {
                        unit_id: i
                    }), "display_index") : null
                    , r = n ? _.indexOf(_.map(n, "lesson_id"), this.get("lesson_id")) : 0;
                return e.replace(/{{[a-zA-Z_]+}}/g, function(e) {
                    switch (e = e.replace(/[{}]/g, "")) {
                        case "lesson_number":
                            return r + 1
                    }
                    return e
                })
            }
        })
    }),
    define("global/collections/lesson_screens", ["require", "global/models/lesson_screen"], function(e) {
        "use strict";
        var t = e("global/models/lesson_screen");
        return Backbone.Collection.extend({
            model: t,
            comparator: "display_order"
        })
    }),
    define("lessons/views/panel", ["require", "templates", "registry", "shared/scoring", "global/views/tooltip", "global/collections/lesson_screens"], function(e) {
        "use strict";
        var r = e("templates")
            , t = e("registry")
            , o = e("shared/scoring")
            , a = e("global/views/tooltip")
            , l = e("global/collections/lesson_screens");
        return Backbone.View.extend({
            events: {
                "click .js-restart-lesson": "restartLesson",
                "click .js-screen": "goToScreen",
                "mouseover .js-screen": "showScreenTooltip",
                "mouseover .js-show-lesson-stars": "showLessonStarsTooltip",
                "mouseout .js-screen": "hideScreenTooltip"
            },
            templatePath: ["lessons", "panel"],
            activeTab: "",
            className: "dashboard-listInner",
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.userLessons = t.get("userLessons"),
                    this.userLessonScreens = t.get("userLessonScreens"),
                    this.lessonScreens = new l(FTWGLOBALS("all_screens")),
                    this.user = t.get("student"),
                    this.lessons = t.get("lessons"),
                    this.units = t.get("units")
            },
            serialize: function() {
                return {
                    scoring: o,
                    unit: this.units.get(this.activeTab).toJSON(),
                    lessons: _.where(this.lessons.toJSON(), {
                        unit_id: this.activeTab
                    }),
                    lessonScreens: this.lessonScreens,
                    userLessonScreens: this.userLessonScreens,
                    lockScreens: this.user.hasOption("lockscreens"),
                    lockCompleted: this.user.hasOption("locklessons"),
                    forceSequential: this.user.hasOption("sequential"),
                    allowQuizRetake: !0
                }
            },
            restartLesson: function(e) {
                var t = $(e.currentTarget)
                    , s = parseInt(t.data("id"), 10);
                return this.userLessons.get(s).set({
                    restart: !0,
                    _state: ""
                }),
                    !0
            },
            goToScreen: function(e) {
                var t = $(e.currentTarget)
                    , s = parseInt(t.data("id"))
                    , i = this.userLessonScreens.get(s);
                if (this.user.hasOption("lockscreens") || !i)
                    return !1;
                var n = this.userLessons.get(i.get("lesson_id"))
                    , r = this.lessons.get(i.get("lesson_id"))
                    , o = new l(_.where(FTWGLOBALS("all_screens"), {
                        lesson_id: i.get("lesson_id")
                    }))
                    , a = o.indexOf(o.get(s));
                return 0 < i.get("typed") && (n.set({
                    progress: a,
                    restart: !1,
                    _state: null
                }),
                    location.href = __url("/student/lesson/" + r.id + "/" + r.get("name").slug())),
                    !1
            },
            screenTooltipTmpl: null,
            screenTooltip: null,
            showScreenTooltip: function(e) {
                var t = parseInt($(e.currentTarget).data("id"))
                    , s = this.userLessonScreens.get(t)
                    , i = {
                        userScreen: !1
                    };
                if (s) {
                    var n = s.toJSON();
                    i = {
                        userScreen: !0,
                        scoringSpeed: o.speed(n.typed, n.seconds, n.errors),
                        scoringAccuracy: o.accuracy(n.typed, n.errors),
                        scoringSeconds: n.seconds ? n.seconds.countdownSeconds() : 0,
                        stars: n.stars
                    }
                }
                i.title = this.lessonScreens.get(t).get("title"),
                    this.screenTooltipTmpl || (this.screenTooltipTmpl = r("lessons", "screen_tooltip")),
                    this.screenTooltip = a.show(e.currentTarget, {
                        force: !0,
                        text: this.screenTooltipTmpl(i)
                    })
            },
            hideScreenTooltip: function() {
                a.hideAll()
            },
            lessonStarsTooltip: null,
            showLessonStarsTooltip: function(e) {
                var t = parseInt($(e.currentTarget).data("id"))
                    , s = this.userLessons.get(t)
                    , i = {
                        screens: this.lessons.get(t).get("screens"),
                        stars: 0
                    };
                s && (i.stars = s.get("stars")),
                    this.lessonStarsTooltip || (this.lessonStarsTooltip = r("lessons", "lesson_tooltip")),
                    a.show(e.currentTarget, {
                        force: !0,
                        text: this.lessonStarsTooltip(i)
                    })
            }
        })
    }),
    define("shared/alert", ["require", "templates", "shared/notice"], function(e) {
        "use strict";
        e("templates");
        var t = e("shared/notice");
        return Backbone.View.extend({
            events: {
                "click .js-ok": "clickOk",
                "click .js-close": "clickCancel"
            },
            templatePath: ["global", "alert"],
            title: "",
            text: "",
            ok: "shared.ok_text".t(),
            cancel: "",
            okCallback: null,
            closeButton: !0,
            type: "standard",
            header: !0,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.show()
            },
            serialize: function() {
                return {
                    closeButton: this.closeButton,
                    titleText: this.title,
                    bodyText: this.text,
                    okText: this.ok,
                    cancelText: this.cancel,
                    type: this.type,
                    header: this.header
                }
            },
            clickOk: function(e) {
                return !this.submitting && (this.okCallback ? (this.submitting = !0,
                    $(e.target).addClass("btn--loading"),
                    this.okCallback().done(function() {
                        return this.trigger("ok"),
                            this.close()
                    }
                        .bind(this)).fail(function(e) {
                            e.responseJSON && e.responseJSON.error ? new t({
                                error: !0,
                                text: e.responseJSON.error
                            }).show() : alert("There was an error: " + JSON.stringify(e))
                        }).always(function() {
                            $(e.target).removeClass("btn--loading"),
                                this.submitting = !1
                        }
                            .bind(this)),
                    !1) : (this.trigger("ok"),
                        this.close()))
            },
            clickCancel: function() {
                return !this.submitting && (this.trigger("cancel"),
                    this.close())
            },
            close: function() {
                return this.$(".modal").removeClass("is-open"),
                    this.$(".modal-overlay").remove(),
                    setTimeout(function() {
                        this.remove()
                    }
                        .bind(this), 1e3),
                    !1
            },
            show: function() {
                return $("body").append(this.el),
                    this.render(),
                    this.$(".modal").addClass("is-open").find("input[type=text]:eq(0),input[type=email]:eq(0)").focus(),
                    this
            }
        })
    }),
    define("shared/confirm", ["require", "shared/alert"], function(e) {
        "use strict";
        var t = e("shared/alert");
        return t.extend({
            initialize: function(e) {
                return (e = e || {}).cancel || (e.cancel = "shared.cancel_text".t()),
                    t.prototype.initialize.call(this, e)
            }
        })
    }),
    define("lessons/views/problem_keys", ["require", "registry", "shared/confirm"], function(e) {
        "use strict";
        var i = e("registry")
            , t = e("shared/confirm");
        return Backbone.View.extend({
            events: {
                "click .js-clear-all": "clearAll"
            },
            templatePath: ["lessons", "problem_keys"],
            className: "dashboard-listInner hide",
            serialize: function() {
                var e = i.get("userLettersTyped").topProblemKeys(10)
                    , t = e.reduce(function(e, t) {
                        return Math.min(e, t.percent)
                    }, 100)
                    , s = e.reduce(function(e, t) {
                        return Math.max(e, t.percent)
                    }, 0);
                return {
                    isZeroState: e.length < 3,
                    maxPercent: Math.floor(100 * s),
                    minPercent: Math.floor(100 * t),
                    keys: e
                }
            },
            toggleLetter: function(e) {
                $(e.currentTarget).toggleClass("is-selected");
                var t = this.$(".js-bar-btn")
                    , s = this.$(".js-bar-text-info")
                    , i = this.$(".js-bar-text-letters")
                    , n = this.getSelectedKeys();
                0 < n.length ? (t.removeClass("is-disabled"),
                    s.fastHide(),
                    i.html("Selected letters: " + n.join(", ")).fastShow()) : (t.addClass("is-disabled"),
                        s.fastShow(),
                        i.fastHide())
            },
            getSelectedKeys: function() {
                return $.makeArray(this.$(".js-bar.is-selected")).map(function(e) {
                    return $(e).data("id")
                })
            },
            generateLesson: function(e) {
                $(e.target).hasClass("is-disabled") || (location.href = __url("/student/lesson/problemkeys#" + this.getSelectedKeys().join("")))
            },
            clearAll: function() {
                return 0 === i.get("userLettersTyped").topProblemKeys(1).length || new t({
                    title: "lessons.clear_problem_keys_title".t(),
                    text: "lessons.clear_problem_keys_body".t()
                }).on("ok", function() {
                    i.get("userLettersTyped").clear(),
                        this.render()
                }
                    .bind(this)),
                    !1
            }
        })
    }),
    define("lessons/views/main", ["require", "templates", "registry", "global/views/ad", "lessons/views/panel", "lessons/views/problem_keys"], function(e) {
        "use strict";
        e("templates");
        var h = e("registry")
            , u = e("global/views/ad")
            , t = e("lessons/views/panel")
            , s = e("lessons/views/problem_keys");
        return Backbone.View.extend({
            events: {
                "click div.js-tab": "showUnit",
                "change select.js-tab": "showUnit",
                "click .js-start": "goToLesson",
                "keydown .js-tab": function(e) {
                    13 === e.which && this.$(document.activeElement).hasClass("js-tab") && this.showUnit(e)
                },
                "keydown .js-start": "escapePanel"
            },
            templatePath: ["lessons", "main"],
            activeTab: "",
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.views.panel = new t({
                        activeTab: this.activeTab
                    }),
                    this.addChild(".js-panel-item", this.views.panel, !0),
                    this.views.problemKeys = new s,
                    this.addChild(".js-panel-item", this.views.problemKeys, !0)
            },
            serialize: function() {
                var e = h.get("userLessons")
                    , t = h.get("student")
                    , s = h.get("lessons")
                    , i = h.get("units")
                    , n = i.toJSON().filter(function(e) {
                        return 0 !== s.where({
                            unit_id: e.unit_id
                        }).length
                    })
                    , r = _.sortBy(e.toJSON().filter(function(e) {
                        var t;
                        try {
                            t = i.get(s.get(e.lesson_id).get("unit_id")).get("type")
                        } catch (e) {
                            return
                        }
                        if ("lesson" === t || "custom" === t)
                            return s.get(e.lesson_id)
                    }), function(e) {
                        return -e.updated_at
                    })[0]
                    , o = r && s.get(r.lesson_id) ? s.get(r.lesson_id).get("unit_id") : n[0] ? n[0].unit_id : i.first().toJSON()
                    , a = location.hash.replace("#", "") || t.get("_currentUnit")
                    , l = h.get("userLettersTyped").topProblemKeys(3).map(function(e) {
                        return e.id.toUpperCase()
                    });
                a && i.get(parseInt(a)) && (o = parseInt(a));
                var c = t.getSetting("message")
                    , d = "";
                return !_.isEmpty(c) && moment(c.expiration).format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD") && (d = (c.text || c.message).stripHTML()),
                    this.activeTab = o,
                    this.views.panel.activeTab = this.activeTab,
                {
                    loggedIn: h.get("loggedIn"),
                    message: d,
                    ads: u.canShowAds(),
                    currentUnit: o,
                    units: n,
                    lessons: s.toJSON(),
                    user: t.toJSON(),
                    problemKeys: l,
                    scoreboard: h.get("student").hasOption("scoreboard")
                }
            },
            showUnit: function(e) {
                var t = $(e.currentTarget)
                    , s = t.is("select") ? t.val() : t.data("id")
                    , i = this.$("select.js-tab")
                    , n = this.$("div.js-tab[data-id=" + s + "]");
                if (t.hasClass("is-active"))
                    return !0;
                this.$(".path.is-active").removeClass("is-active"),
                    h.get("student").set({
                        _currentUnit: s
                    }),
                    this.activeTab = s,
                    n.addClass("is-active"),
                    n.blur(),
                    i.val(s),
                    "problem-keys" === this.activeTab ? (this.views.problemKeys.$el.removeClass("hide"),
                        this.views.panel.$el.addClass("hide")) : (this.views.problemKeys.$el.addClass("hide"),
                            this.views.panel.$el.removeClass("hide"),
                            this.views.panel.activeTab = parseInt(this.activeTab),
                            this.views.panel.render());
                var r = $(window).scrollTop()
                    , o = this.$(".dashboard").offset().top;
                20 < r - o && $("html").velocity("scroll", {
                    offset: o - 45
                }),
                    "keydown" === e.type && this.$("a.lesson-btn.js-start[tabindex=0]").eq(0).focus()
            },
            goToLesson: function(e) {
                var t = $(e.currentTarget).data("id")
                    , s = h.get("userLessons").get(t)
                    , i = h.get("lessons").get(t);
                return s && !s.get("_screenStats") && "adventure" !== i.get("content_type") && s.unset("_state"),
                    !0
            },
            escapePanel: function(e) {
                27 === e.which && this.$(".js-tab.is-active").focus()
            }
        })
    }),
    define("lessons/index", ["require", "registry", "global/views/layout", "lessons/views/main"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("global/views/layout")
            , i = e("lessons/views/main");
        return Backbone.View.extend({
            layout: s,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.userLessons = t.get("userLessons"),
                    this.userLessons.set(t.get("userTests").getCompiled(), {
                        remove: !1
                    }),
                    t.get("lessons").setProgress(this.userLessons),
                    t.get("units").setProgress(t.get("lessons")),
                    this.views.main = new i,
                    this.addChild(this.el, this.views.main, !0),
                    this.render(),
                    setTimeout(function() { }, 0)
            }
        })
    }),
    define("login/views/classic_modal", ["require", "shared/modal"], function(e) {
        "use strict";
        return e("shared/modal").extend({
            titleText: FTWGLOBALS("name") + " Message",
            templatePath: ["login", "classic_modal"],
            okText: "",
            cancelText: "",
            clickButton: function(e) {
                "software" == $(e.currentTarget).data("type") ? this.trigger("complete", "software") : this.trigger("complete", "hardware")
            }
        })
    }),
    define("login/models/forgot_password", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            url: "/apiv1/student/auth/password-reset",
            defaults: {
                email: ""
            },
            validationRules: {
                email: {
                    email: !0,
                    required: !0
                }
            }
        })
    }),
    define("login/views/forgot_password", ["require", "login/models/forgot_password", "shared/modal"], function(e) {
        "use strict";
        var t = e("login/models/forgot_password");
        return e("shared/modal").extend({
            titleText: "index.forgot_login_info_title".t(),
            okText: "index.forgot_password_modal.modal_ok_text".t(),
            templatePath: ["login", "forgot_password"],
            modelClass: t
        })
    }),
    define("shared/multiple_users_modal", ["require", "shared/modal"], function(e) {
        "use strict";
        var t = e("shared/modal");
        return t.extend({
            titleText: "shared.multiple_accounts_found".t(),
            alreadyAuthenticated: !1,
            successNotice: null,
            templatePath: ["global", "multiple_users_modal"],
            okText: "shared.log_in".t(),
            events: {
                "click .js-submit": "clickOk",
                "click .js-row": "clickRow"
            },
            accountId: 0,
            accountKey: "",
            initialize: function() {
                t.prototype.initialize.apply(this, arguments),
                    this.data = this.data.sort(function(e, t) {
                        return e.last_login > t.last_login ? -1 : 1
                    }),
                    this.accountId = this.data[0][this.accountKey]
            },
            serialize: function() {
                return {
                    accountKey: this.accountKey,
                    data: this.data,
                    alreadyAuthenticated: this.alreadyAuthenticated
                }
            },
            clickOk: function(e) {
                $(e.currentTarget).addClass("pending"),
                    this.resolve(this.accountId)
            },
            clickRow: function(e) {
                this.accountId = $(e.currentTarget).data("id"),
                    this.$(".js-row.is-selected").removeClass("is-selected"),
                    this.$(e.currentTarget).addClass("is-selected")
            }
        })
    }),
    define("global/views/section_modal", ["require", "shared/modal"], function(e) {
        "use strict";
        return e("shared/modal").extend({
            titleText: "Log Into Class",
            successNotice: null,
            templatePath: ["global", "section_modal"],
            events: {
                "click .js-submit": "clickOk"
            },
            serialize: function() {
                return {
                    sections: this.data
                }
            },
            clickOk: function(e) {
                $(e.currentTarget).addClass("pending"),
                    this.resolve(this.$("select[name=section_id]").val())
            }
        })
    }),
    define("login/models/account_id", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            url: "/apiv1/student/login-code",
            defaults: {
                code: null
            },
            validationRules: {
                code: {
                    required: !0,
                    accountId: !0,
                    minlength: 3,
                    maxlength: 30
                }
            },
            validationMessages: {}
        })
    }),
    define("login/views/field_account_id", ["require", "login/models/account_id"], function(e) {
        "use strict";
        var t = e("login/models/account_id");
        return Backbone.View.extend({
            templatePath: ["login", "field_account_id"],
            modelClass: t,
            formSelector: "form",
            className: "sessionForm-section",
            serialize: function() {
                return {
                    code: this.code
                }
            },
            value: function() {
                return this.$("input[name=code]").val()
            },
            submittingCallback: function(e) {
                this.trigger("submitting", e)
            },
            submitCallback: function(e) {
                this.trigger("done", e)
            },
            errorCallback: function(e) {
                this.trigger("error", e)
            }
        })
    }),
    define("login/models/username", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            url: "/apiv1/student/login-username",
            defaults: {
                district_id: null,
                username: null
            },
            validationRules: {
                username: {
                    required: !0
                }
            },
            validationMessages: {}
        })
    }),
    define("login/views/field_username", ["require", "login/models/username"], function(e) {
        "use strict";
        var t = e("login/models/username");
        return Backbone.View.extend({
            templatePath: ["login", "field_username"],
            modelClass: t,
            formSelector: "form",
            className: "sessionForm-section",
            serialize: function() {
                return {}
            },
            value: function() {
                return this.$("input[name=username]").val()
            },
            submittingCallback: function(e) {
                this.trigger("submitting", e)
            },
            submitCallback: function(e) {
                this.trigger("done", e)
            },
            errorCallback: function(e) {
                this.trigger("error", e)
            }
        })
    }),
    define("login/models/password", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            url: "/apiv1/student/auth/login",
            defaults: {
                code: null,
                username: null,
                password: null,
                screenWidth: screen.width
            },
            validationRules: {
                password: {
                    required: !0
                }
            },
            validationMessages: {}
        })
    }),
    define("login/views/field_password", ["require", "login/models/password"], function(e) {
        "use strict";
        var t = e("login/models/password");
        return Backbone.View.extend({
            templatePath: ["login", "field_password"],
            modelClass: t,
            formSelector: "form",
            className: "sessionForm-section",
            value: function() {
                return this.$("input[name=password]").val()
            },
            submittingCallback: function(e) {
                this.trigger("submitting", e)
            },
            submitCallback: function(e) {
                this.trigger("done", e)
            },
            errorCallback: function(e) {
                this.trigger("error", e)
            }
        })
    }),
    define("login/views/main", ["require", "login/views/classic_modal", "shared/alert", "shared/confirm", "login/views/forgot_password", "shared/notice", "shared/multiple_users_modal", "global/views/section_modal", "login/views/field_account_id", "login/views/field_username", "login/views/field_password"], function(e) {
        "use strict";
        var t = e("login/views/classic_modal")
            , s = e("shared/alert")
            , i = (e("shared/confirm"),
                e("login/views/forgot_password"))
            , n = e("shared/notice")
            , r = e("shared/multiple_users_modal")
            , o = e("global/views/section_modal")
            , a = e("login/views/field_account_id")
            , l = e("login/views/field_username")
            , c = e("login/views/field_password");
        return Backbone.View.extend({
            templatePath: ["login", "main"],
            events: {
                "click .js-clever-login": "cleverLogin",
                "click .js-google-login": "googleLogin",
                "click .js-classlink-login": "classlinkLogin",
                "click .js-forgot-password": "forgotPassword",
                "click .js-start-over": "startOver",
                "click .js-submit": "handleSubmitButton",
                "keydown input": "handleTab"
            },
            steps: "typing" === FTWGLOBALS("site") ? 2 : 3,
            step: "accountId",
            loginModel: null,
            stepViews: [],
            initialize: function() {
                if (Backbone.View.prototype.initialize.apply(this, arguments),
                    "edutyping" === FTWGLOBALS("site")) {
                    this.stepViews.push("accountId");
                    var e = $.cookie("liccode");
                    this.views.accountId = new a({
                        code: e
                    }),
                        this.listenTo(this.views.accountId, "submitting", this.handleSubmitting),
                        this.listenTo(this.views.accountId, "error", this.handleError),
                        this.listenTo(this.views.accountId, "done", this.handleAccountId),
                        this.addChild(".js-fields", this.views.accountId, !0)
                } else
                    this.step = "username";
                this.stepViews.push("username"),
                    this.views.username = new l,
                    this.usernameModel = this.views.username.model,
                    this.listenTo(this.views.username, "submitting", this.handleSubmitting),
                    this.listenTo(this.views.username, "error", this.handleError),
                    this.listenTo(this.views.username, "done", this.handleUsername),
                    this.addChild(".js-fields", this.views.username, !0),
                    this.stepViews.push("password"),
                    this.views.password = new c,
                    this.loginModel = this.views.password.model,
                    this.listenTo(this.views.password, "submitting", this.handleSubmitting),
                    this.listenTo(this.views.password, "error", this.handleError),
                    this.listenTo(this.views.password, "done", this.handlePassword),
                    this.addChild(".js-fields", this.views.password, !0)
            },
            toggleButton: function(e, t) {
                var s = this.$(".js-submit");
                e ? s.addClass("btn--loading") : s.removeClass("btn--loading"),
                    t && s.text(t)
            },
            switchForm: function(e) {
                var t = this.stepViews.indexOf(e)
                    , s = this.views[e];
                -1 !== t && s && s.value() && (this.$(".dotProgress").attr("data-active", this.stepViews.indexOf(e) + 1),
                    $.isIE11() || $.isEdge() ? this.$(".sessionForm-body").css({
                        marginLeft: "-" + 100 * this.stepViews.indexOf(e) + "%"
                    }) : this.$(".sessionForm-body").velocity("finish").velocity({
                        marginLeft: "-" + 100 * this.stepViews.indexOf(e) + "%"
                    }),
                    this.step = e,
                    s.$("input").focus())
            },
            handleSubmitButton: function() {
                return this.views[this.step].buttonClick(),
                    !1
            },
            handleTab: function(e) {
                if (9 === e.which)
                    return e.shiftKey ? history.back() : this.handleSubmitButton(),
                        !1
            },
            setAccountIDFromJoinCode: function() {
                this.$("input[name=code]").val(this.section.code),
                    $.cookie("liccode", this.section.code, {
                        path: "/"
                    })
            },
            startOver: function() {
                return "edutyping" !== FTWGLOBALS("site") || this.joinCode ? this.step = "username" : ($.cookie("liccode", "", {
                    path: "/"
                }),
                    this.step = "accountId"),
                    this.$(".js-username").hide(),
                    this.joinCode ? (this.$(".js-district").show(),
                        this.$(".js-start-over").hide()) : (this.$(".js-cap").removeClass("is-active"),
                            this.$(".js-district").hide(),
                            this.loginModel.clear(),
                            this.usernameModel.clear()),
                    this.switchForm(this.step),
                    this.$("input").val(""),
                    this.toggleButton(!1, "shared.next".t()),
                    !1
            },
            handleAccountId: function(e) {
                e.district_id !== this.loginModel.get("district_id") && (this.$(".js-district").show(),
                    this.$(".js-districtValue").text(e.name),
                    this.$(".js-cap").delay(250).addClass("is-active")),
                    this.usernameModel.set(e),
                    this.loginModel.set(e),
                    this.$(".dotProgress").attr("data-active", this.steps - 1),
                    $.isIE11() || $.isEdge() ? this.$(".sessionForm-body").css({
                        marginLeft: "-" + 100 * (this.steps - 2) + "%"
                    }) : this.$(".sessionForm-body").velocity("finish").velocity({
                        marginLeft: "-" + 100 * (this.steps - 2) + "%"
                    }),
                    this.$("input[name=username]").select(),
                    this.$("input[name=username]").focus(),
                    this.toggleButton(!1, "shared.next".t()),
                    this.step = "username"
            },
            handleUsername: function(e) {
                return this.$("input[name=password]").prop("disabled", !1),
                    "google" === e.login_type ? (this.googleLogin(e),
                        !1) : "clever" === e.login_type ? (this.cleverLogin(),
                            !1) : "classlink" === e.login_type ? (this.classlinkLogin(),
                                !1) : (this.$(".js-district").hide(),
                                    this.$(".js-start-over").show(),
                                    "edutyping" !== FTWGLOBALS("site") && this.$(".js-cap").addClass("is-active"),
                                    this.$(".js-username").show(),
                                    this.$(".js-usernameValue").text(e.username),
                                    this.loginModel.set(e),
                                    this.$(".dotProgress").attr("data-active", this.steps),
                                    $.isIE11() || $.isEdge() ? this.$(".sessionForm-body").css({
                                        marginLeft: "-" + 100 * (this.steps - 1) + "%"
                                    }) : this.$(".sessionForm-body").velocity("finish").velocity({
                                        marginLeft: "-" + 100 * (this.steps - 1) + "%"
                                    }),
                                    this.joinCode && this.$("input[name=join_code]").val(this.joinCode),
                                    this.$("input[name=password]").select(),
                                    this.toggleButton(!1),
                                    void (this.step = "password"))
            },
            handlePassword: function(e) {
                this.trigger("login", e)
            },
            handleSubmitting: function() {
                this.toggleButton(!0)
            },
            handleError: function(e) {
                this.$("input").velocity("ftw.miniShake"),
                    this.toggleButton(!1),
                    e.users ? this.showMultipleUsers(e.users) : e.sections ? this.showSections(e.sections) : e.expired_licenses ? new s({
                        title: "index.expired_licences_confirm.title".t(),
                        text: "index.expired_licences_confirm.text".t()
                    }) : e.no_licenses ? new s({
                        title: "index.no_licences_alert.title".t(),
                        text: "index.no_licences_alert.text".t()
                    }) : e.classic && (new t).open()
            },
            submitCallback: function(e) {
                this.trigger("login", e)
            },
            serialize: function() {
                return {
                    joinCode: this.joinCode,
                    section: this.section,
                    stepViews: this.stepViews,
                    steps: this.steps,
                    ads: !1
                }
            },
            showMultipleUsers: function(e) {
                var t = new r({
                    accountKey: "user_id",
                    data: e
                }).done(function(e) {
                    this.$("input[name=user_id]").val(e),
                        this.handleSubmitButton(),
                        t.close()
                }
                    .bind(this));
                t.open()
            },
            showSections: function(e) {
                var t = e.map(function(e) {
                    return [e.section_id, e.teacher_name + " - " + e.section_name]
                })
                    , s = new o({
                        data: t
                    }).done(function(e) {
                        this.$("input[name=section_id]").val(e),
                            this.handleSubmitButton(),
                            s.close()
                    }
                        .bind(this));
                s.open()
            },
            cleverLogin: function() {
                var e = _.random(1e4, 99999);
                return $.cookie("state", e, {
                    path: "/"
                }),
                    $.cookie("lang", FTWGLOBALS("language"), {
                        path: "/",
                        expires: 30
                    }),
                    location.href = "https://clever.com/oauth/authorize?client_id=" + FTWGLOBALS("cleverClientId") + "&redirect_uri=" + encodeURIComponent(FTWGLOBALS("cleverRedirectUri")) + "&response_type=code&state=" + e,
                    !1
            },
            classlinkLogin: function() {
                var e = _.random(1e4, 99999);
                return $.cookie("state", e, {
                    path: "/"
                }),
                    $.cookie("lang", FTWGLOBALS("language"), {
                        path: "/",
                        expires: 30
                    }),
                    location.href = "https://launchpad.classlink.com/oauth2/v2/auth?scope=profile&client_id=" + FTWGLOBALS("classlinkClientId") + "&redirect_uri=" + encodeURIComponent("https://" + location.hostname + FTWGLOBALS("classlinkRedirectUri")) + "&response_type=code&state=" + e,
                    !1
            },
            googleLogin: function(e) {
                if ("edutyping" === FTWGLOBALS("site")) {
                    var t = this.views.accountId.value();
                    if (!t)
                        return new s({
                            title: "shared.login.account_id_required".t(),
                            text: "shared.login.please_enter_account_id".t()
                        }),
                            !1;
                    $.cookie("liccode", t, {
                        path: "/"
                    })
                }
                return $.cookie("sso", "student", {
                    path: "/"
                }),
                    $.cookie("join_code", this.joinCode || "", {
                        path: "/"
                    }),
                    $.cookie("sso_id", e.user_id, {
                        path: "/"
                    }),
                    $.cookie("lang", FTWGLOBALS("language"), {
                        path: "/",
                        expires: 30
                    }),
                    location.href = FTWGLOBALS("googleSsoUri"),
                    !1
            },
            forgotPassword: function() {
                if ("edutyping" === FTWGLOBALS("site"))
                    new s({
                        title: "index.forgot_login_info_title".t(),
                        text: "index.edutyping_forgot_login_info_text".t()
                    });
                else {
                    var e = new i;
                    e.done(function(e) {
                        e && e.bounce ? new n({
                            error: !0,
                            text: "shared.password_reset_notice".t() + "<br /><br />" + "shared.password_reset_notice_email_problem".t({
                                error: e.bounce
                            })
                        }).show() : new n({
                            error: !1,
                            text: "shared.password_reset_notice".t()
                        }).show()
                    }
                        .bind(this)),
                        e.open()
                }
                return !1
            }
        })
    }),
    define("join/views/loading", ["require"], function(e) {
        "use strict";
        return Backbone.View.extend({
            templatePath: ["join", "loading"]
        })
    }),
    define("join/views/failed", ["require"], function(e) {
        "use strict";
        return Backbone.View.extend({
            templatePath: ["join", "failed"]
        })
    }),
    define("login/index", ["require", "registry", "login/views/main", "join/views/loading", "join/views/failed", "global/views/layout_basic"], function(e) {
        "use strict";
        var s = e("registry")
            , t = e("login/views/main")
            , i = e("join/views/loading")
            , n = e("join/views/failed")
            , r = e("global/views/layout_basic");
        return Backbone.View.extend({
            layout: r,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.views.main = new t,
                    this.listenTo(this.views.main, "login", this.login),
                    this.joinCode && (this.views.loading = new i,
                        this.views.failed = new n,
                        this.views.failed.$el.fastHide(),
                        this.views.main.$el.fastHide(),
                        $.post("/apiv1/student/auth/join-validate", {
                            join_code: this.joinCode
                        }).done(this.showForm.bind(this)).fail(this.showFailed.bind(this)),
                        this.addChild(this.el, this.views.loading, !0),
                        this.addChild(this.el, this.views.failed, !0)),
                    this.addChild(this.el, this.views.main, !0),
                    this.render(),
                    setTimeout(function() {
                        this.setFocus(!this.joinCode)
                    }
                        .bind(this), 10)
            },
            showForm: function(e) {
                e.language && "en" !== e.language && e.language !== FTWGLOBALS("language") ? location.href = "/" + e.language + location.pathname + location.hash : (this.views.main.section = e,
                    this.views.main.joinCode = this.joinCode,
                    this.views.loading.$el.fastHide(),
                    this.views.main.render().$el.fastShow(),
                    "edutyping" === FTWGLOBALS("site") && this.views.main.setAccountIDFromJoinCode(),
                    this.setFocus(!0))
            },
            showFailed: function() {
                this.views.loading.$el.fastHide(),
                    this.views.failed.$el.fastShow()
            },
            setFocus: function(e) {
                if ("typing" === FTWGLOBALS("site"))
                    this.$("input[name=username]").focus();
                else {
                    var t = this.$("input[name=code]").focus();
                    "" !== t.val() && e && t.submit()
                }
            },
            login: function(e) {
                if (s.get("student").loginWithData(e),
                    $.cookie("liccode", e.code, {
                        path: "/"
                    }),
                    "r:" === location.hash.substr(1, 2))
                    window.location.href = location.hash.substr(3);
                else {
                    var t = "/student/lessons";
                    e.language && e.language !== FTWGLOBALS("language") ? "en" === e.language ? location.href = t : location.href = "/" + e.language + t : location.href = __url(t)
                }
            }
        })
    }),
    define("password/models/form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            initialize: function() { },
            url: "/apiv1/student/auth/password-update",
            defaults: {
                hash: "",
                user_id: "",
                password: "",
                password2: ""
            },
            validationRules: {
                password: {
                    required: !0,
                    minlength: 4
                },
                password2: {
                    required: !0,
                    minlength: 4,
                    equalTo: "#password-form input[name=password]"
                }
            },
            validationMessages: {
                password: {
                    required: "shared.password.required_password".t()
                },
                password2: {
                    required: "shared.password.required_password2".t(),
                    equalTo: "shared.password.passwords_must_match".t()
                }
            },
            validateHash: function(e, t) {
                return this.set({
                    hash: e,
                    user_id: t
                }),
                    $.post("/apiv1/student/auth/password-validate", {
                        hash: e,
                        user_id: t
                    }).done(function(e) {
                        this.set(e)
                    }
                        .bind(this))
            }
        })
    }),
    define("password/views/main", ["require"], function(e) {
        "use strict";
        return Backbone.View.extend({
            formSelector: "form",
            templatePath: ["password", "main"],
            successNotice: "shared.password.success_notice".t(),
            submitCallback: function() {
                Backbone.View.prototype.submitCallback.apply(this, arguments),
                    setTimeout(function() {
                        location.href = __url("/student/login")
                    }, 3e3)
            }
        })
    }),
    define("password/views/failed", ["require"], function(e) {
        "use strict";
        return Backbone.View.extend({
            templatePath: ["password", "failed"]
        })
    }),
    define("password/index", ["require", "password/models/form", "password/views/main", "password/views/failed", "global/views/layout_basic"], function(e) {
        "use strict";
        var i = e("password/models/form")
            , n = e("password/views/main")
            , r = e("password/views/failed")
            , t = e("global/views/layout_basic");
        return Backbone.View.extend({
            layout: t,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.model = new i,
                    this.views.main = new n({
                        model: this.model
                    }),
                    this.views.failed = new r;
                var e = location.hash.replace("#", "").split("!")
                    , t = e[0]
                    , s = e[1];
                this.model.validateHash(t, s).done(function() {
                    this.addChild(this.el, this.views.main, !0),
                        this.render()
                }
                    .bind(this)).fail(function() {
                        this.addChild(this.el, this.views.failed, !0),
                            this.render()
                    }
                        .bind(this))
            }
        })
    }),
    define("skins/views/main", ["require", "registry", "global/collections/skins", "global/views/ad"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("global/collections/skins")
            , i = e("global/views/ad");
        return Backbone.View.extend({
            templatePath: ["skins", "main"],
            events: {
                "click .js-skin": "selectSkin",
                "keydown .js-skin": "handleEnter"
            },
            initialize: function() {
                if (Backbone.View.prototype.initialize.apply(this, arguments),
                    this.skins = new s(FTWGLOBALS("skins")),
                    this.user = t.get("student"),
                    this.userActivity = t.get("userActivity"),
                    i.canShowAds()) {
                    i.initAds("other");
                    var e = i.getAds();
                    _.each(e, function(e, t) {
                        e && this.addChild(".js-" + t + "-ad", e)
                    }
                        .bind(this))
                }
            },
            serialize: function() {
                var e = this.skins.get(this.user.get("skin_id") || 1)
                    , t = this.userActivity.getOrAdd(0).toJSON()
                    , s = e.getRank(t.typed - t.errors);
                return {
                    ads: i.canShowAds(),
                    rank: s,
                    skins: this.skins.toJSON(),
                    currentSkin: this.user.get("skin_id")
                }
            },
            selectSkin: function(e) {
                var t = $(e.currentTarget).data("skin_id");
                return this.user.changeSkin(t),
                    this.$(".js-skin").removeClass("is-active"),
                    this.$(e.currentTarget).addClass("is-active"),
                    !1
            },
            handleEnter: function(e) {
                13 == e.which && this.selectSkin(e)
            }
        })
    }),
    define("skins/index", ["require", "skins/views/main", "global/views/layout"], function(e) {
        "use strict";
        var t = e("skins/views/main")
            , s = e("global/views/layout");
        return Backbone.View.extend({
            layout: s,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.views.mainView = new t,
                    this.addChild(this.el, this.views.mainView, !0),
                    this.render()
            }
        })
    }),
    define("shared/analytics", ["require"], function(e) {
        "use strict";
        return {
            trackEvent: function(e, t, s, i) {
                "typing" !== FTWGLOBALS("site") && ga("send", "event", e, t, s, i)
            },
            trackPage: function(e) {
                ga("send", "pageview", e)
            },
            customDimension: function(e, t) {
                ga("set", "dimension" + e, t)
            },
            customMetric: function(e, t) {
                ga("set", "metric" + e, t)
            },
            setUserId: function(e) {
                ga("set", "userId", e)
            },
            trackSale: function(t, e) {
                ga("require", "ecommerce"),
                    ga("ecommerce:addTransaction", {
                        id: t.transaction_id,
                        affiliation: t.store,
                        revenue: t.total,
                        shipping: 0,
                        tax: 0
                    }),
                    e && e.forEach(function(e) {
                        ga("ecommerce:addItem", {
                            id: t.transaction_id,
                            name: e.product,
                            sku: e.sku,
                            category: e.category,
                            price: e.price,
                            quantity: e.quantity || 1
                        })
                    }),
                    ga("ecommerce:send")
            }
        }
    }),
    define("shared/radar_tracker", ["require"], function(e) {
        "use strict";
        return {
            track: function(e, t) {
                var s = {
                    t: e.get("teacher_id"),
                    u: e.id
                };
                location.pathname.match(/game\//) && (s.x = FTWGLOBALS("game").game_id),
                    t && (s.l = {
                        t: t.typed,
                        s: t.seconds,
                        e: t.errors,
                        p: t.progress
                    }),
                    $.get("/apiv1/student/radar/" + window.btoa(JSON.stringify(s)))
            }
        }
    }),
    define("lesson/views/screen_progress", ["require", "registry", "shared/scoring", "global/collections/lesson_screens"], function(e) {
        "use strict";
        e("registry"),
            e("shared/scoring"),
            e("global/collections/lesson_screens");
        return Backbone.View.extend({
            templatePath: ["lesson", "screen_progress"],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.lesson.get("time_limit") || this.unit && "test" === this.unit.get("type") ? this.listenTo(this.timer, "change:seconds", this.updateProgress) : this.listenTo(this.screen, "change:typed", this.updateProgress)
            },
            serialize: function() {
                return {
                    progressComplete: this.progressComplete
                }
            },
            fill: null,
            bar: null,
            lastProgress: 0,
            updateProgress: function(e, t) {
                if (t = Math.floor(t),
                    this.fill = this.fill ? this.fill : this.$(".js-fill"),
                    this.bar = this.bar ? this.bar : this.$(".js-bar"),
                    this.lastProgress !== (this.lastProgress = t)) {
                    var s = 0;
                    s = this.lesson.get("time_limit") || this.unit && "test" === this.unit.get("type") ? Math.floor(t) / this.lesson.get("time_limit") * 100 : t / e.get("content").length * 100,
                        this.fill.css({
                            width: Math.round(s) + "%"
                        }),
                        this.bar.css({
                            width: Math.round(1e6 / (100 * s)) + "%"
                        })
                }
            }
        })
    }),
    define("lesson/models/sound_form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            offlineSupport: !0,
            defaults: {},
            validationRules: {},
            validationMessages: {},
            url: "/apiv1/student/user/profile"
        })
    }),
    define("lesson/views/sound_modal", ["require", "shared/modal", "lesson/models/sound_form"], function(e) {
        "use strict";
        var t = e("shared/modal")
            , s = e("lesson/models/sound_form");
        return t.extend({
            titleText: "lesson.sound_settings".t(),
            templatePath: ["lesson", "sound_modal"],
            modelClass: s,
            events: {
                "click .js-submit": "clickOk"
            },
            serialize: function() {
                return {
                    screen: this.screen ? this.screen.toJSON() : {},
                    user: this.user.toJSON(),
                    allowsounds: this.user.hasOption("allowsounds"),
                    allowdictation: this.user.hasOption("allowdictation") && "en" === FTWGLOBALS("language")
                }
            },
            clickOk: function(e) {
                return this.close(),
                    this.resolve({
                        typing_sounds: !!this.$(".js-key-sounds").prop("checked"),
                        error_sounds: !!this.$(".js-error-sounds").prop("checked"),
                        dictation: !!this.$(".js-dictation").prop("checked")
                    }),
                    !1
            }
        })
    }),
    define("lesson/views/keyboard_modal", ["require", "registry", "shared/modal", "global/models/language_form"], function(e) {
        "use strict";
        e("registry");
        var t = e("shared/modal")
            , s = e("global/models/language_form");
        return t.extend({
            titleText: "lesson.keyboard_settings".t(),
            templatePath: ["lesson", "keyboard_modal"],
            modelClass: s,
            events: {
                "change input": "changeInput"
            },
            changeInput: function(e) {
                "show_keyboard" === $(e.target).attr("name") && (this.$("input[name=show_keyboard]").prop("checked") ? (this.$("input[name=show_hands]").prop("checked", !0).prop("disabled", !1),
                    this.$("input[name=animated_hands]").prop("checked", !0).prop("disabled", !1)) : (this.$("input[name=show_hands]").prop("checked", !1).prop("disabled", !0),
                        this.$("input[name=animated_hands]").prop("checked", !1).prop("disabled", !0))),
                    "show_hands" === $(e.target).attr("name") && (this.$("input[name=show_hands]").prop("checked") ? this.$("input[name=animated_hands]").prop("checked", !0).prop("disabled", !1) : this.$("input[name=animated_hands]").prop("checked", !1).prop("disabled", !0))
            },
            serialize: function() {
                return {
                    keyboards: FTWGLOBALS("keyboards"),
                    user: this.user.toJSON()
                }
            }
        })
    }),
    define("lesson/views/layout", ["require", "global/views/layout_basic", "lesson/views/screen_progress", "registry", "lesson/views/sound_modal", "global/views/ad", "lesson/views/keyboard_modal"], function(e) {
        "use strict";
        var t = e("global/views/layout_basic")
            , s = e("lesson/views/screen_progress")
            , i = e("registry")
            , n = e("lesson/views/sound_modal")
            , r = e("global/views/ad")
            , o = e("lesson/views/keyboard_modal");
        return t.extend({
            templatePath: ["lesson", "layout"],
            events: {
                "click .js-restart-screen": "restart",
                "click .js-pause,.js-resume": "pause",
                "click .js-keyboard-settings": "showKeyboardSettings",
                "click .js-sound-settings": "showSoundSettings",
                "blur .js-software-input": "blurSoftwareKeyboard"
            },
            initialize: function() {
                t.prototype.initialize.apply(this, arguments),
                    $.showSoftwareKeyboard() && this.setupSoftwareKeyboard(),
                    this.screenProgress = new s({
                        unit: this.unit,
                        timer: this.timer,
                        lesson: this.lesson,
                        screen: this.screen,
                        progressComplete: this.progressComplete
                    }),
                    this.addChild(".js-screen-progress", this.screenProgress)
            },
            render: function() {
                return t.prototype.render.apply(this, arguments),
                    this.test && this.listenTo(this.timer, "change:seconds", this.updateTimer),
                    this.toggleSoundIcon(),
                    this
            },
            serialize: function() {
                return {
                    loggedIn: i.get("loggedIn"),
                    ads: r.canShowAds(),
                    softwareKeyboard: $.showSoftwareKeyboard(),
                    lesson: this.lesson.toJSON(),
                    unit_id: this.lesson.get("unit_id"),
                    unit_name: this.problemkeys ? "Problem Keys" : this.unit ? this.unit.get("name") : "",
                    isTest: this.test,
                    isProblemKeys: this.problemkeys,
                    screen: this.screen ? this.screen.toJSON() : {},
                    allowsounds: this.user.hasOption("allowsounds"),
                    allowdictation: this.user.hasOption("allowdictation"),
                    showKeyboard: this.user.hasOption("showkeyboard"),
                    hidepause: this.user.hasOption("hidepause") || "qa" === this.lesson.get("content_type"),
                    showrestart: this.user.hasOption("showrestart") && "qa" !== this.lesson.get("content_type"),
                    user: this.user.toJSON(),
                    isCongrats: this.userLesson.get("progress") >= this.lesson.get("screens") && "intro" === this.userLesson.get("_state")
                }
            },
            timerEl: null,
            timerLast: 0,
            updateTimer: function(e, t) {
                t = Math.floor(t),
                    this.timerEl || (this.timerEl = this.$(".js-test-countdown")),
                    this.timerLast != (this.timerLast = t) && this.timerEl.html((this.lesson.get("time_limit") - t).countdownSeconds())
            },
            restart: function() {
                return this.trigger("restart"),
                    !1
            },
            pause: function() {
                return this.timer.isPaused() ? this.timer.unpause() && (this.$(".js-pause").fastShow(),
                    this.$(".js-resume").fastHide()) : this.timer.pause() && (this.$(".js-pause").fastHide(),
                        this.$(".js-resume").fastShow()),
                    !1
            },
            showKeyboardSettings: function() {
                var e = new o({
                    user: this.user
                });
                return e.open(),
                    e.done(function(e) {
                        this.user.setSettings(e)
                    }
                        .bind(this)),
                    !1
            },
            showSoundSettings: function() {
                var e = new n({
                    screen: this.screen,
                    user: this.user
                });
                return e.open(),
                    e.done(function(e) {
                        this.user.setSettings(e),
                            this.toggleSoundIcon()
                    }
                        .bind(this)),
                    !1
            },
            toggleSoundIcon: function() {
                var e = this.user.toJSON();
                e.settings.error_sounds || e.settings.typing_sounds || e.settings.dictation ? (this.$(".js-sounds-on").fastShow(),
                    this.$(".js-sounds-off").fastHide()) : (this.$(".js-sounds-on").fastHide(),
                        this.$(".js-sounds-off").fastShow())
            },
            softwareKeyboardFocused: !1,
            lastScrollTop: 0,
            setupSoftwareKeyboard: function(e) {
                $(window).scroll(function(e) {
                    e.target.activeElement.classList.contains("js-software-input") ? this.softwareKeyboardFocused || (this.softwareKeyboardFocused = !0,
                        $(window).scrollTop(this.lastScrollTop)) : this.lastScrollTop = window.scrollY
                }
                    .bind(this))
            },
            blurSoftwareKeyboard: function() {
                this.softwareKeyboardFocused = !1
            }
        })
    }),
    define("lesson/collections/problemkey_screens", ["require", "global/models/lesson_screen"], function(e) {
        "use strict";
        var t = e("global/models/lesson_screen");
        return Backbone.Collection.extend({
            constructor: function(e, t) {
                var s = t.letters.map(function(e) {
                    return e.toUpperCase()
                })
                    , i = _.shuffle(_.flatten(_.map(s, function(e) {
                        return t.words[e]
                    })));
                if (!t.letters.length || !t.words)
                    throw new Error("Unable to find problem words");
                return e[0].intro = e[0].intro.format(s.join(", ")),
                    e[0].title += s.join(", "),
                    e[0].content = i.slice(0, 200).join(" "),
                    Backbone.Collection.call(this, e, t)
            },
            model: t,
            comparator: "display_order"
        })
    }),
    define("global/views/svg", ["require"], function(e) {
        "use strict";
        var t = {}
            , s = function(e) {
                var t = e.documentElement.cloneNode(!0);
                this.preprocess && "function" == typeof this.preprocess && this.preprocess(t),
                    this.$el.html(t),
                    this.trigger("load", this.$("svg"))
            };
        return Backbone.View.extend({
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    t[this.path] ? t[this.path].done(s.bind(this)) : t[this.path] = $.get(this.path).done(s.bind(this))
            },
            render: function() {
                return this
            }
        })
    }),
    define("global/views/keyboard", ["require", "templates", "registry", "global/views/svg"], function(e) {
        "use strict";
        e("templates");
        var s = e("registry")
            , i = e("global/views/svg");
        return Backbone.View.extend({
            highlighted: [],
            lastFingers: ["right-resting-hand", "left-resting-hand"],
            fingerCache: {},
            keysCache: {},
            templatePath: ["global", "keyboard"],
            handsTemplatePath: ["global", "hands"],
            interactive: !0,
            structure: null,
            keyMetaData: {},
            initialize: function() {
                if (Backbone.View.prototype.initialize.apply(this, arguments),
                    this.user = s.get("student"),
                    this.showHands) {
                    var e = "hands keyboard-hands"
                        , t = "keypad" === this.model.get("type");
                    this.screenType = this.screen.get("screen_type"),
                        "falling" === this.screenType && (e += " is-falling"),
                        t && (e += " hands--numpad"),
                        this.views.hands = new i({
                            className: e,
                            path: "/dist/student/images/hands" + (t ? "/numpad" : "") + "/_" + _.findWhere(FTWGLOBALS("skins"), {
                                id: this.user.get("skin_id") || 1
                            }).hands + ".svg"
                        }),
                        this.views.hands.$el.fastHide(),
                        this.listenTo(this.views.hands, "load", this.cacheFingers),
                        this.listenTo(this.views.hands, "load", this.replayLastFinger),
                        this.addChild(".js-hands", this.views.hands, !1)
                }
                this.setupKeyStructures()
            },
            render: function() {
                return this.setupKeyStructures(),
                    Backbone.View.prototype.render.call(this),
                    this.screen && this.cacheKeys(),
                    this
            },
            toggleHands: function() {
                "block" === this.screenType || this.user.getSetting("show_hands") ? this.$(".js-hands").removeClass("hide") : this.$(".js-hands").addClass("hide")
            },
            serialize: function() {
                return {
                    type: "keypad" === this.model.get("type") ? "10key" : this.model.get("type"),
                    test: this.test,
                    noHands: this.noHands || !this.user.getSetting("show_hands"),
                    screenType: this.screenType,
                    interactive: this.interactive,
                    structure: this.structure,
                    showKeyboard: this.user.getSetting("show_keyboard"),
                    skinName: this.user.getSkinName()
                }
            },
            setupKeyStructures: function() {
                var i = this.model.get("type");
                this.structure = this.model.get("structure");
                var n = {};
                this.structure.forEach(function(e, s) {
                    e.forEach(function(e, t) {
                        "dvorak" === i ? (0 === s && "1" === e.main.key && (n[s] = Math.abs(2 - t)),
                            1 === s && "'" === e.main.key && (n[s] = Math.abs(1 - t)),
                            2 === s && "a" === e.main.key && (n[s] = Math.abs(1 - t)),
                            3 === s && ";" === e.main.key && (n[s] = Math.abs(1 - t))) : "colemak" === i ? (0 === s && "1" === e.main.key && (n[s] = Math.abs(1 - t)),
                                1 === s && "q" === e.main.key && (n[s] = Math.abs(1 - t)),
                                2 === s && "a" === e.main.key && (n[s] = Math.abs(1 - t)),
                                3 === s && "z" === e.main.key && (n[s] = Math.abs(1 - t))) : "keypad" === i ? (0 === s && "↹" === e.main.key && (n[s] = t - 6),
                                    1 === s && "7" === e.main.key && (n[s] = t - 6),
                                    2 === s && "4" === e.main.key && (n[s] = t - 6),
                                    3 === s && "1" === e.main.key && (n[s] = t - 6),
                                    4 === s && "0" === e.main.key && (n[s] = t - 6)) : (0 === s && "1" === e.main.key && (n[s] = Math.abs(2 - t)),
                                        1 === s && "e" === e.main.key && (n[s] = Math.abs(3 - t)),
                                        2 === s && "s" === e.main.key && (n[s] = Math.abs(2 - t)),
                                        3 === s && "x" === e.main.key && (n[s] = Math.abs(2 - t)))
                    })
                }),
                    this.structure.forEach(function(e, s) {
                        e.forEach(function(e, t) {
                            e.column = t - (n[s] ? n[s] : 0) + 1,
                                e.row = s,
                                e.finger = parseInt(e.finger),
                                e.main.code = parseInt(e.main.code),
                                (this.keyMetaData[e.main.code] = e).shifted && (e.shifted.code = parseInt(e.shifted.code),
                                    this.keyMetaData[e.shifted.code] = e)
                        }
                            .bind(this))
                    }
                        .bind(this))
            },
            translateKey: function(e) {
                return "\n" === (e = e || "") && (e = " "),
                    e
            },
            getKeyCode: function(e) {
                return "⏎" === e || "\n" === e ? 13 : e.toLowerCase().charCodeAt(0)
            },
            getKeyElement: function(e) {
                return this.keysCache[e] || (this.keysCache[e] = this.$(".key-" + this.getKeyCode(e))),
                    this.keysCache[e]
            },
            getFingerFor: function(e) {
                return this.keyMetaData[this.getKeyCode(e)] ? this.keyMetaData[this.getKeyCode(e)].finger : 0
            },
            getKeyboardColumnFor: function(e) {
                return this.keyMetaData[this.getKeyCode(e)] ? this.keyMetaData[this.getKeyCode(e)].column : 0
            },
            getRowFor: function(e) {
                return this.keyMetaData[this.getKeyCode(e)] ? this.keyMetaData[this.getKeyCode(e)].row : 0
            },
            getKeyRequiresShift: function(e) {
                var t = this.keyMetaData[this.getKeyCode(e)];
                return !!t && (e !== e.toLowerCase() || t.shifted && t.shifted.code === this.getKeyCode(e))
            },
            getFingerIds: function(e) {
                var t, s, i = this.getFingerFor(e), n = !this.screen.get("isCapsLockWord") && this.getKeyRequiresShift(e), r = this.getRowFor(e), o = this.getKeyboardColumnFor(e), a = o <= (0 === r ? 5 : 6) ? "left" : "right";
                if (i) {
                    var l = ""
                        , c = "";
                    return " " === e ? (l = "space",
                        c = "left-resting-hand") : "\n" === e ? (l = "right-home-row-7",
                            c = "left-resting-hand") : (this.user.getSetting("animated_hands") ? (t = this.fingerRowMap[r],
                                s = "right" === a ? o - 6 : 7 + -1 * o) : (t = "home",
                                    s = "right" === a ? Math.max(2, Math.min(5, o - 6)) : Math.max(2, Math.min(5, 7 + -1 * o))),
                                l = a + "-" + t + "-row-" + s,
                                c = n ? this.user.getSetting("animated_hands") ? "right" === a ? "left-bottom-row-7" : "right-bottom-row-6" : "right" === a ? "left-home-row-5" : "right-home-row-5" : ("right" === a ? "left" : "right") + "-resting-hand"),
                        [l, c]
                }
                return []
            },
            fingerRowMap: ["num", "top", "home", "bottom", "opt"],
            highlightKey: function(e) {
                if (e) {
                    e = this.translateKey(e);
                    this.getKeyCode(e);
                    var t, s = this.getKeyElement(e), i = this.screen.get("isCapsLockWord"), n = !i && this.getKeyRequiresShift(e), r = this.getFingerFor(e);
                    if (t = n ? r <= 5 ? this.rightCaps : this.leftCaps : this.capsLock,
                        this.highlighted.forEach(function(e) {
                            e[0].className = e[0].defaultClasses
                        }),
                        this.highlighted = [],
                        this.lastFingers.forEach(function(e) {
                            this.clearFingerEle(e)
                        }
                            .bind(this)),
                        this.lastFingers = [],
                        "" !== e && null !== e) {
                        var o = this.getFingerIds(e);
                        o.length || (o = ["right-resting-hand", "left-resting-hand"]),
                            this.highlightFingerEle(o[0]),
                            this.highlightFingerEle(o[1]),
                            this.lastFingers.push(o[0]),
                            this.lastFingers.push(o[1]),
                            (n || i) && t[0] && (this.highlighted.push(t),
                                t[0].className += t[0].defaultClasses + " is-active"),
                            s.length && (this.highlighted.push(s),
                                s[0].className = s[0].defaultClasses + " is-active")
                    }
                }
            },
            highlightErrorKey: function(e) {
                this.getKeyCode(e);
                var t = this.getKeyElement(e);
                t.addClass("is-wrong"),
                    setTimeout(function() {
                        t.removeClass("is-wrong")
                    }, 250)
            },
            cacheKeys: function() {
                var e = this.screen.get("content");
                "keypad" !== this.model.get("type") && (e += " \n"),
                    _.uniq(e.split("")).forEach(function(e) {
                        var t = this.$(".key-" + this.getKeyCode(e));
                        t.length ? (t[0].defaultClasses = t[0].className,
                            this.keysCache[e] = t) : console.error("Keyboard is missing key: ", e, " with keycode ", this.getKeyCode(e))
                    }
                        .bind(this)),
                    this.rightCaps = this.$(".key-16.right"),
                    this.rightCaps.length && (this.rightCaps[0].defaultClasses = this.rightCaps[0].className),
                    this.leftCaps = this.$(".key-16.left"),
                    this.leftCaps.length && (this.leftCaps[0].defaultClasses = this.leftCaps[0].className),
                    this.capsLock = this.$(".key-20"),
                    this.capsLock.length && (this.capsLock[0].defaultClasses = this.capsLock[0].className)
            },
            cacheFingers: function(e) {
                var t = this.screen.get("content") + " \n"
                    , s = _.uniq(t.split(""))
                    , i = e[0];
                this.hands = i;
                var n = function(e) {
                    this.fingerCache[e] || (this.fingerCache[e] = i.querySelector("#" + e))
                }
                    .bind(this);
                s.forEach(function(e) {
                    this.getFingerIds(e).forEach(n)
                }
                    .bind(this)),
                    n("right-resting-hand"),
                    n("left-resting-hand"),
                    _.forEach(i.querySelectorAll(".hand"), function(e) {
                        e.id && this.fingerCache[e.id]
                    }
                        .bind(this)),
                    this.views.hands.$el.fastShow()
            },
            replayLastFinger: function(e) {
                this.hands = e[0],
                    this.lastFingerIds.forEach(function(e) {
                        this[e.method](e.fingerId)
                    }
                        .bind(this)),
                    this.lastFingerIds = []
            },
            lastFingerIds: [],
            highlightFingerEle: function(e) {
                var t;
                if (this.lastFingerIds.push({
                    fingerId: e,
                    method: "highlightFingerEle"
                }),
                    this.fingerCache[e])
                    t = this.fingerCache[e];
                else if (this.hands)
                    return void console.error("Hands are missing fingerId ", e);
                t && t.setAttribute("class", t.className.baseVal + " is-active")
            },
            clearFingerEle: function(e) {
                var t;
                this.lastFingerIds.push({
                    fingerId: e,
                    method: "clearFingerEle"
                }),
                    this.fingerCache[e] ? t = this.fingerCache[e] : this.hands,
                    t && t.setAttribute("class", t.className.baseVal.replace("is-active", ""))
            }
        })
    }),
    define("lesson/views/intro", ["require", "templates", "registry", "global/views/ad", "global/views/keyboard", "lesson/classes/dictation"], function(e) {
        "use strict";
        e("templates"),
            e("registry");
        var t = e("global/views/ad")
            , s = (e("global/views/keyboard"),
                e("lesson/classes/dictation"));
        return Backbone.View.extend({
            events: {
                "click .js-continue-button": "continue",
                "click .js-arrow": "toggleCarousel"
            },
            templatePath: ["lesson"],
            initialize: function(e) {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.screen.get("intro").match("#!images") ? (this.templatePath.push("intro_image"),
                        this.images = this.screen.get("intro").replace("#!images\n", "").split("\n")) : this.screen.get("intro").match("#!videos") ? (this.screen.set({
                            hasVideo: !0
                        }),
                            this.templatePath.push("intro_video"),
                            this.videos = this.screen.get("intro").replace("#!videos\n", "").split("\n")) : this.screen.get("intro").match("#!code") ? (this.templatePath.push("intro_code"),
                                this.screen.set("intro", this.screen.get("intro").replace("#!code\n", ""))) : (this.templatePath.push("intro_text"),
                                    this.screen.set("intro", this.screen.get("intro").replace("#!text\n", "")))
            },
            serialize: function() {
                return {
                    ads: t.canShowAds(),
                    test: this.test,
                    userLesson: this.userLesson.toJSON(),
                    screen: this.screen.toJSON(),
                    images: this.images ? this.images : null,
                    videos: this.videos ? this.videos : null,
                    lesson: this.lesson.toJSON(),
                    skin: _.findWhere(FTWGLOBALS("skins"), {
                        id: this.user.get("skin_id") || 1
                    })
                }
            },
            render: function() {
                if (this.dictation = new s(this.screen, null, this.user),
                    this.screen.get("hasVideo") || this.dictation.speakIntro(this.screen.toJSON()),
                    this.progressView && this.addChild(".js-progress", this.progressView, !0),
                    Backbone.View.prototype.render.apply(this, arguments),
                    "adventure" === this.lesson.get("content_type") && this.animateAdventureOpen(),
                    this.listenTo(this.input, "keypress", this.handleKeypress),
                    this.images && (this.$(".js-carousel-frames").css({
                        width: 100 * this.images.length + "%",
                        transform: "translateX(0%)"
                    }),
                        this.images.length <= 0 && this.$(".js-arrow, .dotProgress").fastHide()),
                    this.videos && (this.$(".js-carousel-frames").css({
                        width: 100 * this.videos.length + "%",
                        transform: "translateX(0%)"
                    }),
                        this.$(".js-carousel-frames video").eq(0).css({
                            opacity: 1
                        }),
                        this.videos.length <= 0 && this.$(".js-arrow, .dotProgress").fastHide()),
                    this.screen.get("hasVideo")) {
                    var t = function() {
                        try {
                            var e = this.$("video");
                            e.length ? e[0].addEventListener("ended", this.videoEnded.bind(this)) : setTimeout(t, 1e3)
                        } catch (e) { }
                    }
                        .bind(this);
                    setTimeout(t, 1e3)
                }
                return this
            },
            animateAdventureOpen: function() {
                var e = this.$(".book.is-opening")
                    , t = this.$(".book-page--cover")
                    , s = this.$(".book-page--left");
                1024 <= $(window).width() && e.velocity({
                    translateY: ["0%", "100%"],
                    opacity: 1
                }, {
                    duration: 300,
                    easing: "easeInOutCubic",
                    complete: function() {
                        setTimeout(function() {
                            t.velocity({
                                rotateY: "90deg",
                                zIndex: 20
                            }, {
                                duration: 500,
                                easing: "linear",
                                complete: function() {
                                    t.css({
                                        zIndex: 20
                                    }).velocity({
                                        rotateY: "180deg"
                                    }, {
                                        duration: 500,
                                        easing: "linear"
                                    })
                                }
                            }),
                                s.velocity({
                                    rotateY: "90deg",
                                    zIndex: 20
                                }, {
                                    duration: 500,
                                    easing: "linear",
                                    complete: function() {
                                        s.css({
                                            zIndex: 21
                                        }).velocity({
                                            rotateY: "180deg"
                                        }, {
                                            duration: 500,
                                            easing: "linear"
                                        })
                                    }
                                })
                        }, 1e3)
                    }
                })
            },
            videoEnded: function() {
                this.$(".js-continue-button").removeClass("btn--b").addClass("btn--a").text("Continue"),
                    this.dictation && this.screen.get("hasVideo") && this.dictation.speakVideoIntro(this.screen.toJSON())
            },
            continue: function(e) {
                var t = parseInt(this.$(".js-carousel").attr("data-active")) || null
                    , s = this.images ? this.images.length : this.videos ? this.videos.length : 1;
                return 1 < s && t !== s ? this.toggleCarousel(e) : this.trigger("continue", "intro", this.$(".js-continue-button")),
                    !1
            },
            handleKeypress: function(e) {
                "\n" == e.key && this.continue()
            },
            hide: function() {
                this.stopListening(this.input),
                    this.$("svg").remove(),
                    this.$el.fastHide()
            },
            toggleCarousel: function(e) {
                var t = this.$(e.currentTarget).is(".carousel-arrow--next, .js-continue-button") ? 1 : -1
                    , s = this.images && 1 < this.images.length ? this.images : this.videos
                    , i = parseInt(this.$(".js-carousel").attr("data-active"))
                    , n = this.$(".js-carousel-frames");
                if (this.$(".js-arrow").fastShow("inline-flex"),
                    t < 0 && 1 < i || 0 < t && i < s.length) {
                    if (this.videos)
                        var r = document.querySelectorAll(".js-carousel-frames video")[i - 1];
                    if (i += t,
                        this.videos) {
                        var o = document.querySelectorAll(".js-carousel-frames video")[i - 1];
                        r.paused && r.ended || r.pause()
                    }
                    $.Velocity(n, {
                        translateX: -100 / s.length * (i - 1) + "%"
                    }, {
                        duration: 250,
                        complete: function() {
                            this.videos && (o.setAttribute("style", "position:relative;"),
                                setTimeout(function() {
                                    o.setAttribute("style", "position:absolute; opacity:1")
                                }, 1))
                        }
                            .bind(this)
                    }),
                        this.$(".js-carousel,.dotProgress").attr("data-active", i),
                        -1 === t && i <= 1 ? this.$(".js-arrow.carousel-arrow--prev").fastHide() : 1 === t && i === s.length && this.$(".js-arrow.carousel-arrow--next").fastHide()
                }
            }
        })
    }),
    define("lesson/views/congrats", ["require", "templates", "shared/scoring", "lesson/classes/dictation", "global/views/ad", "registry"], function(e) {
        "use strict";
        e("templates");
        var s = e("shared/scoring")
            , t = e("lesson/classes/dictation")
            , n = e("global/views/ad")
            , r = e("registry");
        return Backbone.View.extend({
            templatePath: ["lesson", "congrats"],
            initialize: function(e) {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.userLessons = r.get("userLessons"),
                    this.lessons = r.get("lessons"),
                    this.units = r.get("units"),
                    this.user = e.user,
                    this.screen = e.screen,
                    this.userLesson = e.userLesson,
                    this.userLessonScreens = e.userLessonScreens,
                    this.lesson = e.lesson,
                    this.progressView && this.addChild(".js-progress", this.progressView, !0)
            },
            serialize: function() {
                this.lessons.setProgress(this.userLessons),
                    this.units.setProgress(r.get("lessons"));
                var e = this.units.get(this.lesson.get("unit_id")).get("active_lesson")
                    , t = this.lessons.get(e)
                    , i = [];
                return this.userLessonScreens.forEach(function(e) {
                    for (var t = e.get("stars"), s = 0; s < t; s++)
                        i.push(1);
                    for (s = 0; s < 3 - t; s++)
                        i.push(0)
                }),
                {
                    ads: n.canShowAds(),
                    lesson: this.lesson.toJSON(),
                    unit: this.units.get(this.lesson.get("unit_id")).toJSON(),
                    starList: i,
                    stars: this.userLesson.get("stars"),
                    totalStars: 3 * this.lesson.get("screens"),
                    accuracy: s.accuracy(this.userLesson.get("typed"), this.userLesson.get("errors")),
                    speed: s.speed(this.userLesson.get("typed"), this.userLesson.get("seconds"), this.userLesson.get("errors")),
                    time: (Math.floor(this.userLesson.get("seconds")) || 0).countdownSeconds(),
                    seconds: Math.floor(this.userLesson.get("seconds")) || 0,
                    activeLesson: t ? t.toJSON() : null
                }
            },
            render: function() {
                Backbone.View.prototype.render.apply(this, arguments),
                    this.lesson.get("badge") && this.$(".js-badge-img").append(r.get("userBadges").getBadgeForId(this.lesson.id).el);
                r.get("student");
                var e = this.serialize();
                return new t(null, null, this.user).speakLessonComplete(e),
                    this
            }
        })
    }),
    define("lesson/views/demo_complete", ["require", "templates", "shared/scoring", "global/views/ad", "registry"], function(e) {
        "use strict";
        var t = e("templates")
            , s = (e("shared/scoring"),
                e("global/views/ad"))
            , i = e("registry");
        return Backbone.View.extend({
            initialize: function(e) {
                void 0 === this.template && (this.template = t("lesson", "demo_complete")),
                    this.lessons = i.get("lessons"),
                    this.units = i.get("units"),
                    this.lesson = e.lesson
            },
            serialize: function() {
                return {
                    ads: s.canShowAds(),
                    lesson: this.lesson.toJSON(),
                    unit: this.units.get(this.lesson.get("unit_id")).toJSON()
                }
            }
        })
    }),
    define("lesson/views/screen_complete", ["require", "templates", "registry", "lesson/classes/dictation", "shared/scoring", "global/views/ad", "global/collections/skins"], function(e) {
        "use strict";
        e("templates");
        var f = e("registry")
            , o = e("lesson/classes/dictation")
            , v = e("shared/scoring")
            , w = e("global/views/ad")
            , t = e("global/collections/skins");
        return Backbone.View.extend({
            saved: !1,
            templatePath: ["lesson", "screen_complete"],
            events: {
                "click .js-continue-button": "continue",
                "click .js-restart": "restart",
                "click .js-try-again": "saveTryAgain",
                "click .js-start-over": "startLessonOver"
            },
            congratsText: ["lesson.congrats_text.great".t(), "lesson.congrats_text.excellent".t(), "lesson.congrats_text.super".t(), "lesson.congrats_text.keep_it_up".t(), "lesson.congrats_text.doing_great".t(), "lesson.congrats_text.doing_awesome".t(), "lesson.congrats_text.awesome_job".t(), "lesson.congrats_text.awesome_typing".t(), "lesson.congrats_text.sweet".t()],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.user = f.get("student"),
                    this.userActivity = f.get("userActivity"),
                    this.skins = new t(FTWGLOBALS("skins")),
                    this.progressView && this.addChild(".js-progress", this.progressView, !0)
            },
            serialize: function() {
                var e = 0
                    , t = 0
                    , s = 0
                    , i = this.userLesson.toJSON()
                    , n = this.userLessonScreens.get(this.screen.id)
                    , r = this.skins.get(this.user.get("skin_id") || 1)
                    , o = this.userActivity.getOrAdd(0).toJSON()
                    , a = r.getRank(o.typed - o.errors)
                    , l = r.getNextRank(o.typed - o.errors)
                    , c = l ? 100 - Math.floor((l.experience - (o.typed - o.errors)) / (l.experience - a.experience) * 100) : 100;
                0 < i.typed && (e = v.accuracy(i.typed, i.errors),
                    t = v.speed(i.typed, i.seconds, i.errors),
                    s = Math.floor(i.seconds || 0).countdownSeconds());
                var d = v.accuracy(n.get("typed"), n.get("errors"))
                    , h = n.get("stars")
                    , u = v.speed(n.get("typed"), n.get("seconds"), n.get("errors"))
                    , g = n.get("lastTry")
                    , p = 0
                    , m = 0;
                return g && (delete g.lastTry,
                    p = v.speed(g.typed, g.seconds, g.geterrors),
                    m = v.accuracy(g.typed, g.errors)),
                {
                    renderInline: this.renderInline,
                    ads: w.canShowAds(),
                    congratsText: this.congratsText[Math.floor(Math.random() * this.congratsText.length)],
                    lesson: this.lesson.toJSON(),
                    screen: n.toJSON(),
                    paths: this.screen.get("paths"),
                    content: this.screen.get("content"),
                    title: this.screen.get("title"),
                    lastTry: g,
                    lastTrySpeed: p,
                    lastTryAccuracy: m,
                    stars: h,
                    accuracy: d,
                    speed: u,
                    two_stars: this.screen.get("two_stars"),
                    three_stars: this.screen.get("three_stars"),
                    problemKeys: _.pluck(this.lettersTyped.topProblemKeys(3), "id"),
                    time: this.screen.get("seconds"),
                    lessonAccuracy: e,
                    lessonSpeed: t,
                    lessonTime: s,
                    screenType: this.screenType,
                    problemKeysLesson: this.problemKeysLesson,
                    lockScreens: f.get("student").hasOption("lockscreens"),
                    saved: this.saved,
                    fasterThanLastTry: Math.floor(u) > Math.floor(p),
                    moreAccurateThanLastTry: Math.floor(d) > Math.floor(m),
                    skin: r.toJSON(),
                    skins: this.skins.toJSON(),
                    rank: a,
                    nextRank: l,
                    totalRanks: r.getTotalRanks(),
                    rankProgress: c,
                    activity: o
                }
            },
            render: function() {
                f.set("preventKeyboardInput", !1),
                    Backbone.View.prototype.render.apply(this, arguments),
                    this.listenTo(this.input, "keypress", this.handleKeyPress);
                var t = this.serialize()
                    , e = f.get("student");
                if ("test" !== this.screenType && e.hasOption("allowsounds") && (e.getSetting("error_sounds") || e.getSetting("typing_sounds"))) {
                    var s, i, n;
                    try {
                        s = new Audio("/dist/student/extras/sounds/star1.mp3"),
                            i = new Audio("/dist/student/extras/sounds/star2.mp3"),
                            n = new Audio("/dist/student/extras/sounds/star3.mp3")
                    } catch (e) { }
                    s && 0 < t.stars && ($(s).on("playing", function(e) {
                        i && 2 <= t.stars && window.requestTimeout(function() {
                            $(i).on("playing", function() {
                                n && 3 <= t.stars && window.requestTimeout(function() {
                                    $.playSound(n)
                                }, 500)
                            }),
                                $.playSound(i)
                        }, 500)
                    }),
                        $.playSound(s))
                }
                t.accuracy = v.accuracy(t.screen.typed, t.screen.errors),
                    t.speed = v.speed(t.screen.typed, t.screen.seconds, t.screen.errors),
                    t.seconds = GetSeconds(t.screen.typed);
                var r = new o(this.screen, null, this.user);
                return "test" === this.screenType ? r.speakTestComplete(t) : r.speakScreenComplete(t),
                    this
            },
            continue: function(e) {
                return this.saved && this.trigger("continue", "complete", this.$(".js-continue-button")),
                    !1
            },
            restart: function() {
                return this.saved && this.userLesson.inc({
                    progress: -1
                }),
                    this.trigger("continue", "complete_restart", this.$(".js-restart")),
                    !1
            },
            handleKeyPress: function(e) {
                "\n" == e.key && this.continue()
            },
            showSaved: function() {
                this.saved = !0,
                    this.userLesson.set({
                        saved: !0
                    }),
                    this.$(".js-saving-spinner").fastHide(),
                    this.$(".js-saving-failed").fastHide(),
                    this.$(".js-continue").fastShow()
            },
            showSaveError: function() {
                this.$(".js-saving-spinner").fastHide(),
                    this.$(".js-saving-failed").fastShow()
            },
            saveTryAgain: function() {
                return this.$(".js-saving-failed").fastHide(),
                    this.$(".js-saving-spinner").fastShow(),
                    this.trigger("try-again"),
                    !1
            },
            startLessonOver: function() {
                return this.userLesson.set({
                    progress: 0,
                    _state: null,
                    restart: !0
                }),
                    this.trigger("continue", "complete", this.$(".js-start-over")),
                    !1
            }
        })
    }),
    define("lesson/views/screen_complete_adventure", ["require", "templates", "shared/scoring", "lesson/views/screen_complete"], function(e) {
        "use strict";
        e("templates"),
            e("shared/scoring");
        var n = e("lesson/views/screen_complete");
        return n.extend({
            templatePath: ["lesson", "screen_complete_adventure"],
            continue: function(e) {
                var t = $(e.currentTarget).data("id")
                    , s = this.screens.get(t)
                    , i = this.screens.indexOf(s);
                return this.userLesson.set({
                    progress: i
                }),
                    this.saved = !0,
                    n.prototype.continue.apply(this, arguments)
            },
            handleKeyPress: function(e) {
                return 1 === this.screen.get("paths").length && "\n" == e.key && this.$(".js-continue-button").click(),
                    !1
            }
        })
    }),
    define("lesson/views/screen_failed", ["require", "templates", "shared/scoring", "global/views/ad", "registry", "lesson/classes/dictation"], function(e) {
        "use strict";
        e("templates");
        var n = e("shared/scoring")
            , r = e("global/views/ad")
            , t = e("registry")
            , s = e("lesson/classes/dictation");
        return Backbone.View.extend({
            saved: !1,
            events: {
                "click .js-continue-button": "restart"
            },
            templatePath: ["lesson", "screen_failed"],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.progressView && this.addChild(".js-progress", this.progressView, !0)
            },
            serialize: function() {
                var e = this.screen.toJSON()
                    , t = this.lesson.toJSON()
                    , s = n.speed(this.screen.get("typed"), this.screen.get("seconds"), this.screen.get("errors"))
                    , i = n.accuracy(this.screen.get("typed"), this.screen.get("errors"));
                return "type-a-balloon" !== this.screen.get("screen_type") && "baron-von-typesfast" !== this.screen.get("screen_type") || 0 !== this.screen.get("typed") || (i = 0),
                {
                    renderInline: this.renderInline,
                    ads: r.canShowAds(),
                    lesson: t,
                    screen: e,
                    accuracy: i,
                    speed: s,
                    finishedScreen: this.screen.get("typed") >= this.screen.get("content").length,
                    time: (e.seconds || 0).countdownSeconds(),
                    screenType: this.screenType,
                    isFasterThanMinSpeed: e.min_speed >= s,
                    isBetterThanMinAccuracy: e.min_acc >= i
                }
            },
            render: function() {
                t.set("preventKeyboardInput", !1),
                    Backbone.View.prototype.render.apply(this, arguments),
                    this.listenTo(this.input, "keypress", this.handleKeyPress);
                var e = this.serialize();
                return e.accuracy = n.accuracy(this.screen.get("typed"), this.screen.get("errors")),
                    e.speed = n.speed(this.screen.get("typed"), this.screen.get("seconds"), this.screen.get("errors")),
                    e.seconds = GetSeconds(this.screen.get("typed")),
                    new s(this.screen, null, this.user).speakFailed(e),
                    this
            },
            restart: function() {
                return this.trigger("continue", "failed", this.$(".js-continue-button")),
                    !1
            },
            handleKeyPress: function(e) {
                "\n" === e.key && this.restart()
            }
        })
    }),
    define("lesson/views/test_complete", ["require", "templates", "registry", "shared/scoring", "shared/alert", "global/views/ad", "lesson/views/screen_complete"], function(e) {
        "use strict";
        e("templates");
        var s = e("registry")
            , i = e("shared/scoring")
            , n = e("shared/alert")
            , r = e("global/views/ad");
        return e("lesson/views/screen_complete").extend({
            templatePath: ["lesson", "test_complete"],
            handleKeyPress: function(e) {
                return !1
            },
            serialize: function() {
                this.userLesson.toJSON();
                var e = this.problemKeysLesson ? this.screen : this.userTests.first()
                    , t = i.accuracy(e.get("typed"), e.get("errors"))
                    , s = i.speed(e.get("typed"), e.get("seconds"), e.get("errors"));
                return {
                    ads: r.canShowAds(),
                    lesson: this.lesson.toJSON(),
                    screen: e.toJSON(),
                    title: this.screen.get("title"),
                    accuracy: t,
                    speed: s,
                    time: this.screen.get("seconds"),
                    screenType: this.screenType,
                    problemKeysLesson: this.problemKeysLesson,
                    canPrintCert: this.user.hasOption("testcerts"),
                    skin: _.findWhere(FTWGLOBALS("skins"), {
                        id: this.user.get("skin_id") || 1
                    })
                }
            },
            continue: function() {
                var e = s.get("student");
                if (!e.get("first_name") || !e.get("last_name"))
                    return s.get("loggedIn") ? e.get("in_class") && e.hasOption("lockaccount") ? new n({
                        error: !1,
                        title: "lesson.unable_to_print".t(),
                        text: "lesson.contact_teacher_to_print".t()
                    }).show() : new n({
                        error: !1,
                        title: "lesson.unable_to_print".t(),
                        cancel: "shared.cancel_text".t(),
                        text: "lesson.enter_name_to_print".t(),
                        ok: "lesson.go_to_account_settings".t()
                    }).show().on("ok", function() {
                        location.href = __url("/student/account")
                    }) : new n({
                        error: !1,
                        text: "lesson.log_in_to_print".t()
                    }).show(),
                        !1;
                var t = this.userLesson.get("last_save_response").id;
                return window.open("/apiv1/student/tests/" + t + "/" + this.user.id + "/certificate"),
                    !1
            }
        })
    }),
    define("lesson/views/progress", ["require", "templates", "global/views/tooltip", "registry", "shared/scoring", "global/collections/lesson_screens"], function(e) {
        "use strict";
        var r = e("templates")
            , o = e("global/views/tooltip")
            , i = e("registry")
            , a = e("shared/scoring")
            , s = e("global/collections/lesson_screens");
        return Backbone.View.extend({
            events: {
                "click .chunk": "goToScreen",
                "mouseover .js-screen": "showTooltip"
            },
            templatePath: ["lesson", "progress"],
            serialize: function() {
                var e = new s(this.screens.toJSON());
                e.set(this.userLessonScreens.toJSON(), {
                    add: !1,
                    remove: !1
                });
                var t = this.userLessonScreens.toJSON().filter(function(e) {
                    return 0 < e.typed
                }).length;
                return {
                    screens: e.toJSON(),
                    lesson: this.lesson.toJSON(),
                    userLesson: this.userLesson.toJSON(),
                    progress: this.progress,
                    completedScreens: t,
                    scoring: a,
                    lockScreens: i.get("student").hasOption("lockscreens")
                }
            },
            goToScreen: function(e) {
                if (i.get("student").hasOption("lockscreens"))
                    return !1;
                var t = $(e.currentTarget).data("id")
                    , s = this.screens.indexOf(this.screens.get(t));
                return this.userLesson.set({
                    restart: !1,
                    _state: ""
                }),
                    s <= this.userLessonScreens.length && (this.userLesson.set({
                        progress: s
                    }),
                        location.safeReload()),
                    !1
            },
            screenTooltip: null,
            showTooltip: function(e) {
                var t = parseInt($(e.currentTarget).data("id"))
                    , s = this.userLessonScreens.get(t)
                    , i = {
                        userScreen: !1
                    };
                if (s) {
                    var n = s.toJSON();
                    i = {
                        userScreen: !0,
                        scoringSpeed: a.speed(n.typed, n.seconds, n.errors),
                        scoringAccuracy: a.accuracy(n.typed, n.errors),
                        scoringSeconds: n.seconds ? n.seconds.countdownSeconds() : 0,
                        stars: n.stars
                    }
                }
                i.title = this.screens.get(t).get("title"),
                    this.screenTooltip || (this.screenTooltip = r("lessons", "screen_tooltip")),
                    o.show(e.currentTarget, {
                        force: !0,
                        text: this.screenTooltip(i)
                    })
            }
        })
    }),
    define("lesson/views/caps_lock_warning", ["require", "templates", "global/views/ad"], function(e) {
        "use strict";
        e("templates");
        var t = e("global/views/ad");
        return Backbone.View.extend({
            templatePath: ["lesson", "caps_lock_warning"],
            events: {
                "click .js-close": "hide"
            },
            capsLockWarning: null,
            serialize: function() {
                return {
                    ads: t.canShowAds()
                }
            },
            isOpen: !1,
            toggle: function(e) {
                this.capsLockWarning || (this.capsLockWarning = this.$(".js-capslock-warning")),
                    this.screen.get("isCapsLockWord") && e ? this.isOpen && (this.capsLockWarning.removeClass("is-open"),
                        this.isOpen = !1) : e && !this.isOpen ? (this.capsLockWarning.addClass("is-open"),
                            this.isOpen = !0) : !e && this.isOpen && (this.capsLockWarning.removeClass("is-open"),
                                this.isOpen = !1)
            },
            hide: function() {
                return this.toggle(!1),
                    !1
            }
        })
    }),
    define("lesson/views/typing", ["require", "templates", "registry", "shared/scoring", "global/views/tooltip", "lesson/classes/dictation", "lesson/views/caps_lock_warning", "global/views/keyboard"], function(e) {
        "use strict";
        var n = e("templates")
            , l = e("registry")
            , s = (e("shared/scoring"),
                e("global/views/tooltip"))
            , r = e("lesson/classes/dictation")
            , o = e("lesson/views/caps_lock_warning")
            , a = e("global/views/keyboard");
        return Backbone.View.extend({
            templateName: null,
            lettersCache: null,
            activeLetter: null,
            lowPerformance: !1,
            hidden: !1,
            initialize: function(e) {
                if (Backbone.View.prototype.initialize.apply(this, arguments),
                    void 0 === this.template && (this.template = n("lesson", this.templateName)),
                    $.isLowPerformanceBrowser() && (this.lowPerformance = !0),
                    this.user.hasOption("allowsounds")) {
                    try {
                        new Audio("/dist/student/extras/sounds/star1.mp3"),
                            new Audio("/dist/student/extras/sounds/star2.mp3"),
                            new Audio("/dist/student/extras/sounds/star3.mp3")
                    } catch (e) { }
                    var t, s;
                    this.keySoundIndex = 0,
                        this.keySounds = [];
                    try {
                        for (s = 0; s < 4; s++)
                            (t = new Audio("/dist/student/extras/sounds/key.mp3")).volume = .5,
                                this.keySounds.push(t)
                    } catch (e) { }
                    this.errorSoundIndex = 0,
                        this.errorSounds = [];
                    try {
                        for (s = 0; s < 4; s++)
                            (t = new Audio("/dist/student/extras/sounds/error.mp3")).volume = .5,
                                this.errorSounds.push(t)
                    } catch (e) { }
                }
                var i = this.keyboard && this.user.hasOption("showkeyboard");
                this.capslockView = new o({
                    screen: this.screen,
                    keyboardVisible: i && this.user.getSetting("show_keyboard")
                }),
                    this.input.on("capslock", this.capslockView.toggle.bind(this.capslockView)),
                    i && (this.keyboardView = new a({
                        showHands: this.user.hasOption("showkeyboard"),
                        screen: this.screen,
                        model: e.keyboard
                    }),
                        this.listenTo(this.user, "settings_changed", function(e) {
                            (_.contains(e, "show_keyboard") || _.contains(e, "show_hands") || _.contains(e, "keyboard_id") || _.contains(e, "animated_hands")) && window.location.reload()
                        })),
                    this.dictation = new r(this.screen, this.keyboardView, this.user),
                    this.listenTo(this.user, "change:dictation", this.toggleDictation)
            },
            render: function() {
                return this.listenTo(this.input, "keypress", this.handleInput),
                    this.screen.on("change:typed", this.handleKeyTyped, this),
                    this.screen.on("change:errors", this.handleErrorTyped, this),
                    this.screen.on("change:keyStamp", this.handleKeyPressed, this),
                    this.screen.once("complete", this.handleComplete.bind(this)),
                    this.$(".structure-content").append(this.capslockView.render().el),
                    this.keyboardView && (this.$(".js-keyboard-holder").append(this.keyboardView.render().el),
                        this.keyboardView.highlightKey(this.screen.get("new_key") || this.screen.charAt(0))),
                    this.renderChildren(),
                    this.dictation.speakScreen({
                        begin: !0,
                        nextKey: this.screen.charAt(0)
                    }),
                    this
            },
            handleComplete: function() {
                this.dictation.stop(),
                    this.screen.off("complete", this.handleComplete.bind(this)),
                    this.timer.stop();
                var e = -1;
                20 < this.keyTimes.length && (e = Math.floor(this.std(this.keyTimes))),
                    this.screen.set({
                        seconds: this.timer.get("seconds"),
                        std: e
                    }),
                    this.trigger("complete")
            },
            startToolTip: null,
            startCursorAnimation: function(e) {
                var t = {
                    force: !0,
                    text: "lesson.start_typing_tooltip".t()
                };
                e && _.apply(t, e),
                    this.startCursorTimeout = setTimeout(function() {
                        var e = this.$(".letter.is-active");
                        e.length && (this.startToolTip = s.show(e[0], t))
                    }
                        .bind(this), 0 === this.userLesson.get("progress") ? 500 : 3e3)
            },
            stopCursorAnimation: function() {
                clearTimeout(this.startCursorTimeout),
                    this.startToolTip && this.startToolTip.hide()
            },
            keyTimes: [],
            lastKeyTime: 0,
            idleTimeout: null,
            handleInput: function(e) {
                if ("test" !== this.screenType && (clearTimeout(this.idleTimeout),
                    this.idleTimeout = setTimeout(this.autoPauseForIdle.bind(this), 1e4)),
                    this.pausedBecauseIdle && (this.pausedBecauseIdle = !1,
                        this.timer.isPaused() && this.timer.unpause()),
                    !this.timer.isPaused()) {
                    if (this.lastKeyTime) {
                        var t = Date.now();
                        this.keyTimes.push(Date.now() - this.lastKeyTime),
                            this.lastKeyTime = t
                    }
                    var s;
                    if (0 !== this.screen.get("typed") || e.special || (this.timer.start(),
                        this.lastKeyTime = Date.now(),
                        this.stopCursorAnimation(),
                        this.keyboardOverlay || (this.keyboardOverlay = this.$(".keyboard-overlay"),
                            this.keyboardOverlay.remove())),
                        "NEXT" === e.key)
                        this.timer.stop().set({
                            seconds: 10
                        }),
                            this.screen.quickComplete();
                    else
                        "type-a-balloon" === this.screen.get("screen_type") || "baron-von-typesfast" === this.screen.get("screen_type") ? (s = this.screen.handleGameInput(e, this.game)).nextKey || this.dictation.stop() : (s = this.screen.handleInput(e)) && !s.isError ? this.playSounds("key") : s && s.isError && this.playSounds("error"),
                            s && this.dictation.speakScreen(s)
                }
            },
            pausedBecauseIdle: !1,
            autoPauseForIdle: function() {
                this.timer.isPaused() || (this.timer.pause(),
                    this.pausedBecauseIdle = !0)
            },
            handleKeyTyped: function(e) {
                e.changed.lastKeyError ? this.lettersTyped.trackError(e.get("correctLetter")) : this.lettersTyped.trackCorrect(e.get("letterTyped")),
                    this.keyboardView && this.keyboardView.highlightKey(e.get("nextKey")),
                    this.setPosition(e.changed.typed, e.get("lastKeyError"))
            },
            playSounds: function(e) {
                try {
                    "error" === e && this.user.getSetting("error_sounds") && this.errorSounds && 0 < this.errorSounds.length && (this.errorSoundIndex++,
                        this.errorSoundIndex >= this.errorSounds.length && (this.errorSoundIndex = 0),
                        $.playSound(this.errorSounds[this.errorSoundIndex])),
                        "key" === e && this.user.getSetting("typing_sounds") && this.keySounds && 0 < this.keySounds.length && (this.keySoundIndex++,
                            this.keySoundIndex >= this.keySounds.length && (this.keySoundIndex = 0),
                            $.playSound(this.keySounds[this.keySoundIndex]))
                } catch (e) { }
            },
            toggleDictation: function(e) {
                this.user.getSetting("dictation") ? this.dictation.resume() : this.dictation.turnOff()
            },
            handleErrorTyped: function(e) {
                if (this.activeLetter) {
                    var t = e.get("letterCacheIndex")
                        , s = (this.$(this.activeLetter),
                            0 <= t - 1 ? this.lettersCache[t - 1] : null);
                    s && $(s).attr("data-wrong", e.get("letterTyped"))
                }
            },
            handleKeyPressed: function(e) {
                e.get("isError") && this.keyboardView && this.keyboardView.highlightErrorKey(e.get("letterTyped"))
            },
            cacheAnimations: function() {
                if (this.hidden)
                    return !1;
                var e = this.$(".js-screen-content .letter")
                    , t = this.$(".js-screen-content")
                    , s = this.typingContent.height()
                    , i = 0
                    , n = 0
                    , r = 0
                    , o = t.attr("class") || ""
                    , a = _.find(o.split(" "), function(e) {
                        return e.match(/screenBasic--\d/)
                    });
                this.topOffset = 0,
                    (this.lastOffset = 0) !== e.length && (this.rowHeight = this.$(".screenBasic-word:first").outerHeight(!0),
                        this.screen.set({
                            lines: Math.round(s / this.rowHeight)
                        }),
                        t.removeClass(a).addClass("screenBasic--" + this.screen.get("lines")),
                        e.each(function(e, t) {
                            t.defaultClasses = t.defaultClasses || t.className,
                                r = $(t).offset().top,
                                this.topOffset || (this.topOffset = r,
                                    this.lastOffset = r,
                                    i = r),
                                i !== r && n++,
                                i = r,
                                t.animationOffset = r,
                                t.animationLine = n
                        }
                            .bind(this)),
                        this.lettersCache = e,
                        0 < this.lettersCache.length && l.set("preventKeyboardInput", !1))
            },
            setPosition: function(e, t, s) {
                var i = 0 <= e - 1 ? this.lettersCache[e - 1] : null
                    , n = this.lettersCache[e] || null
                    , r = this.lettersCache.length > e + 1 ? this.lettersCache[e + 1] : null
                    , o = e - (this.screen.get("letterCacheIndex") || 0);
                n && (n.className = n.defaultClasses + " " + (s ? "is-wrong" : "is-active"),
                    this.activeLetter = n),
                    r && (r.className = r.defaultClasses),
                    i && 0 < e && -1 !== o && (i.className = t ? i.defaultClasses + " is-wrong" : i.defaultClasses + " is-right"),
                    this.screen.set({
                        letterCacheIndex: e
                    })
            },
            hide: function() {
                this.hidden = !0,
                    this.stopListening(this.input)
            },
            std: function(e) {
                e.sort(function(e, t) {
                    return e - t
                }),
                    e.pop(),
                    e.pop(),
                    e.pop(),
                    e.pop(),
                    e.shift(),
                    e.shift(),
                    e.shift(),
                    e.shift();
                var t = function(e) {
                    return e.reduce(function(e, t) {
                        return e + t
                    }, 0) / e.length
                }
                    , s = t(e)
                    , i = t(e.map(function(e) {
                        var t = e - s;
                        return t * t
                    }));
                return Math.sqrt(i)
            }
        })
    }),
    define("lesson/views/typing_standard", ["require", "templates", "registry", "global/views/ad", "lesson/views/typing"], function(e) {
        "use strict";
        e("templates");
        var t = e("registry")
            , s = e("global/views/ad")
            , i = e("lesson/views/typing");
        return i.extend({
            templateName: "typing_standard",
            minimumLines: 3,
            render: function() {
                return t.set("preventKeyboardInput", !0),
                    this.listenTo(this.screen, "change:letterCacheIndex", this.animate),
                    this.$el.append(this.template({
                        ads: s.canShowAds(),
                        minimumLines: this.minimumLines,
                        lesson: this.lesson.toJSON(),
                        screen: this.screen.toJSON(),
                        typingContent: this.screen.getContentByWord(),
                        user: this.user.toJSON(),
                        hasKeyboard: this.keyboardView && this.user.getSetting("show_keyboard")
                    })),
                    this.startCursorAnimation(),
                    i.prototype.render.apply(this, arguments),
                    this.typingContent = this.$(".screenBasic-lines"),
                    setTimeout(function() {
                        this.triggerCacheAnimations(),
                            this.setPosition(0)
                    }
                        .bind(this), 0),
                    setTimeout(this.triggerCacheAnimations.bind(this), 10),
                    setTimeout(this.triggerCacheAnimations.bind(this), 1e3),
                    $(window).resize(_.debounce(this.cacheAnimations.bind(this), 1e3, !1)),
                    this
            },
            triggerCacheAnimations: function() {
                this.typingContent = this.$(".screenBasic-lines"),
                    this.cacheAnimations()
            },
            topOffset: 0,
            lastOffset: 0,
            rowHeight: 0,
            lastAnimationLine: 0,
            animate: function(e, t) {
                var s = this.lettersCache[t + 1]
                    , i = this.lettersCache[t];
                if (s && i.animationOffset !== this.lastOffset) {
                    var n = i.animationOffset;
                    if (this.lastOffset = n,
                        this.screen.get("lines") - i.animationLine >= this.minimumLines && i.animationLine != this.lastAnimationLine) {
                        this.lastAnimationLine = i.animationLine;
                        var r = this.lowPerformance ? 100 : 250
                            , o = parseInt("-" + (n - this.topOffset));
                        this.typingContent.velocity("stop").velocity({
                            translateY: o + "px"
                        }, {
                            easing: "ease-in-out",
                            duration: r,
                            complete: function() {
                                setTimeout(function() {
                                    1 === i.animationLine && this.triggerCacheAnimations()
                                }
                                    .bind(this), 1e3)
                            }
                                .bind(this)
                        })
                    }
                }
            }
        })
    }),
    define("lesson/views/typing_coding", ["require", "templates", "registry", "lesson/views/typing_standard"], function(e) {
        "use strict";
        e("templates"),
            e("registry");
        var o = e("lesson/views/typing_standard");
        return o.extend({
            templateName: "typing_coding",
            animate: function(e, t) {
                this.typingContent = this.$(".screenCode-lines");
                var s = this.lettersCache[t + 1]
                    , i = this.lettersCache[t];
                if (s) {
                    if (i.animationOffset !== this.lastOffset) {
                        var n = i.animationOffset;
                        if (this.lastOffset = n,
                            i.animationLine >= this.minimumLines) {
                            var r = this.lowPerformance ? 100 : 250;
                            this.typingContent.velocity({
                                translateY: "-" + (n - 210) + "px"
                            }, {
                                easing: "ease-in-out",
                                duration: r
                            })
                        }
                    }
                    return o.prototype.animate.call(this)
                }
            }
        })
    }),
    define("lesson/views/typing_block", ["require", "registry", "global/views/ad", "lesson/views/typing"], function(e) {
        "use strict";
        var n = e("registry")
            , r = e("global/views/ad")
            , o = e("lesson/views/typing");
        return o.extend({
            templateName: "typing_block",
            mode: "key",
            animationRow: 0,
            initialize: function() {
                o.prototype.initialize.apply(this, arguments),
                    this.screen.get("new_key") || (this.mode = "lesson");
                var e = this.events || {};
                this.delegateEvents(_.extend(e, {
                    "click .js-continue-button": "showNextPart"
                }))
            },
            render: function() {
                this.listenTo(this.screen, "change:typed", this.animate);
                var e = n.get("student")
                    , t = this.screen.getContentByLine()
                    , s = this.dictation.getFingerDetails(this.screen.get("new_key"), !1);
                t = t.map(function(e) {
                    return e.join("")
                }).join("").match(/([^\n]+?){1,8}/g).map(function(e) {
                    return e.split("")
                });
                var i = 0;
                return this.contentMap = t.map(function(e) {
                    return i += e.length
                }),
                    this.$el.append(this.template({
                        skin: _.findWhere(FTWGLOBALS("skins"), {
                            id: this.user.get("skin_id") || 1
                        }),
                        ads: r.canShowAds(),
                        fingerDetails: s,
                        lesson: this.lesson.toJSON(),
                        screen: this.screen.toJSON(),
                        typingContent: t,
                        user: e.toJSON(),
                        mode: this.mode
                    })),
                    o.prototype.render.apply(this, arguments),
                    this.typingContent = this.$(".screenIntro-lines"),
                    "key" === this.mode && this.toggleAnimateCorrectKey(),
                    setTimeout(function() {
                        this.typingContent = this.$(".screenIntro-lines"),
                            this.cacheAnimations(),
                            "lesson" === this.mode && this.setLessonMode()
                    }
                        .bind(this), 0),
                    setTimeout(function() {
                        this.typingContent = this.$(".screenIntro-lines"),
                            this.cacheAnimations()
                    }
                        .bind(this), 10),
                    setTimeout(function() {
                        this.typingContent = this.$(".screenIntro-lines"),
                            this.cacheAnimations()
                    }
                        .bind(this), 1e3),
                    $(window).resize(_.debounce(this.cacheAnimations.bind(this), 1e3, !1)),
                    this
            },
            animate: function(e, t) {
                var s = this.contentMap.filter(function(e) {
                    return e <= t
                }).length;
                if (this.animationRow !== s) {
                    this.animationRow = s;
                    var i = this.lowPerformance ? 100 : 250
                        , n = this.$(".screenIntro-line").outerWidth(!0);
                    this.typingContent.velocity({
                        translateX: "-" + this.animationRow * n + "px"
                    }, {
                        duration: i,
                        easing: "ease-in-out"
                    })
                }
            },
            keyBlinkTimeout: 0,
            toggleAnimateCorrectKey: function() {
                if (this.keyBlinkTimeout)
                    clearInterval(this.keyBlinkTimeout),
                        this.keyBlinkTimeout = 0;
                else {
                    var e = this.$(".key.is-active");
                    this.keyBlinkTimeout = setInterval(function() {
                        e.toggleClass("is-active")
                    }
                        .bind(this), 500)
                }
            },
            handleInput: function(e) {
                if ("key" === this.mode) {
                    if (e.special)
                        return !1;
                    var t = this.$(".js-single-letter js-bubble")
                        , s = this.$(".js-single-letter .js-typing-content")
                        , i = this.$(".js-single-letter .js-intro-confirm")
                        , n = e.key.toLowerCase()
                        , r = "⏎" === this.screen.get("new_key") ? "\n" : this.screen.get("new_key");
                    n === r ? (t.velocity({
                        opacity: .5
                    }),
                        s.addClass("is-right").removeClass("is-wrong"),
                        i.velocity("slideDown"),
                        this.showNextPart()) : (this.dictation.speakScreen({
                            isError: !0,
                            nextKey: r,
                            letterTyped: n
                        }),
                            this.playSounds("error"),
                            s.addClass("is-wrong"),
                            this.keyboardView && this.keyboardView.highlightErrorKey(n))
                } else {
                    if ("key_confirm" !== this.mode)
                        return o.prototype.handleInput.apply(this, arguments);
                    "\n" === e.key && this.showNextPart()
                }
            },
            handleErrorTyped: function(e) {
                "lesson" === this.mode && (this.lettersTyped.trackError(e.get("correctLetter")),
                    this.setPosition(e.get("typed"), !1, !0)),
                    o.prototype.handleErrorTyped.call(this, e)
            },
            showNextPart: function() {
                var e = this.screen.getContentByLine()[0][0].toLowerCase();
                if ("key" === this.mode)
                    this.mode = "key_confirm",
                        this.toggleAnimateCorrectKey();
                else if ("key_confirm" === this.mode) {
                    this.mode = "lesson";
                    var t = this.$(".js-single-letter")
                        , s = this.$(".js-keyboard-holder")
                        , i = this.$(".js-screen-content")
                        , n = this.$(".js-keyboard-holder-next");
                    t.addClass("hide"),
                        i.removeClass("hide"),
                        n.replaceWith(s),
                        this.keyboardView && this.keyboardView.highlightKey(e),
                        setTimeout(function() {
                            this.setPosition(0),
                                this.startCursorAnimation()
                        }
                            .bind(this), 0)
                }
                return this.dictation.speakScreen({
                    begin: !0,
                    mode: this.mode,
                    nextKey: e
                }),
                    !1
            },
            setLessonMode: function() {
                var e = this.screen.getContentByLine()[0][0].toLowerCase()
                    , t = this.$(".js-single-letter")
                    , s = this.$(".js-keyboard-holder")
                    , i = this.$(".js-screen-content")
                    , n = this.$(".js-keyboard-holder-next");
                t.addClass("hide"),
                    i.removeClass("hide"),
                    n.replaceWith(s),
                    this.keyboardView && this.keyboardView.highlightKey(e),
                    window.setTimeout(function() {
                        this.setPosition(0),
                            this.startCursorAnimation()
                    }
                        .bind(this), 0)
            }
        })
    }),
    define("lesson/views/typing_falling", ["require", "templates", "registry", "global/views/ad", "lesson/views/typing"], function(e) {
        "use strict";
        var t = e("templates")
            , s = e("registry")
            , i = e("global/views/ad")
            , n = e("lesson/views/typing");
        return n.extend({
            templateName: "typing_falling",
            initialize: function(e) {
                return this.lettersTemplate = t("lesson", "typing_falling_letters"),
                    this.lessonLength = e.screen.get("content").length,
                    n.prototype.initialize.call(this, e)
            },
            render: function() {
                return s.set("preventKeyboardInput", !0),
                    this.$el.append(this.template({
                        ads: i.canShowAds(),
                        lesson: this.lesson.toJSON(),
                        screen: this.screen.toJSON(),
                        user: this.user.toJSON()
                    })),
                    n.prototype.render.call(this),
                    this.startCursorAnimation({
                        offset: "0, 25",
                        placement: "right",
                        start: !0
                    }),
                    setTimeout(this.renderLetters.bind(this), 0),
                    this
            },
            renderLetters: function() {
                var t, s = {}, i = this.keyboardView.$el;
                this.screen.get("content").split("").forEach(function(e) {
                    e = e.toLowerCase(),
                        t = e.charCodeAt(0),
                        "⏎" == e && (t = 13),
                        s[t] || (s[t] = i.find(".key-" + t).position().left)
                }
                    .bind(this)),
                    this.$(".js-falling-lines").html(this.lettersTemplate({
                        lettersPos: s,
                        typingContent: this.screen.get("content"),
                        viewportLeftOffset: 16
                    })),
                    this.lettersContent = this.$(".js-falling-lines"),
                    this.cacheAnimations(),
                    this.setPosition(0),
                    setTimeout(function() {
                        this.lettersContent = this.$(".js-falling-lines"),
                            this.cacheAnimations()
                    }
                        .bind(this), 10),
                    setTimeout(function() {
                        this.lettersContent = this.$(".js-falling-lines"),
                            this.cacheAnimations()
                    }
                        .bind(this), 1e3)
            },
            handleErrorTyped: function(e) {
                this.lettersTyped.trackError(e.get("correctLetter")),
                    this.setPosition(e.get("typed"), !0),
                    this.playSounds("error")
            },
            cacheAnimations: function() {
                var e = this.$(".screenFalling-lines .screenFalling-line");
                0 !== e.length && (e.each(function(e, t) {
                    t.defaultClasses = t.className
                }
                    .bind(this)),
                    this.lettersCache = e,
                    this.keysCache = this.$(".screenFalling-lines .letter"),
                    this.keysCache.each(function(e, t) {
                        t.defaultClasses = t.className
                    }
                        .bind(this)),
                    this.lettersCache.length && s.set("preventKeyboardInput", !1))
            },
            setPosition: function(e, t) {
                var s = this.lessonLength - e - 1
                    , i = this.lettersCache[s]
                    , n = this.keysCache[s]
                    , r = this.lettersCache[s + 1]
                    , o = this.keysCache[s + 1];
                if (t && i)
                    return i.className = i.defaultClasses + " is-wrong",
                        n.className = n.defaultClasses + " is-wrong",
                        void (this.lowPerformance || $.Velocity(n, "ftw.miniShake", {
                            duration: 300
                        }));
                i && (i.className = i.defaultClasses + " is-active",
                    n.className = n.defaultClasses + " is-active"),
                    r && (r.className = r.defaultClasses + " is-right",
                        o.className = o.defaultClasses + " is-right"),
                    0 < e && e + 3 < this.lessonLength && this.animate(e)
            },
            animate: function(e) {
                var t = this.lowPerformance ? 100 : 250;
                this.lettersContent.velocity("stop").velocity({
                    translateY: 65 * e
                }, {
                    duration: t,
                    easing: "ease-in-out"
                })
            }
        })
    }),
    define("lesson/views/typing_test", ["require", "templates", "registry", "lesson/views/typing_standard"], function(e) {
        "use strict";
        e("templates"),
            e("registry");
        var t = e("lesson/views/typing_standard");
        return t.extend({
            render: function() {
                return this.listenTo(this.timer, "change:seconds", this.updateTimer),
                    t.prototype.render.apply(this)
            },
            updateTimer: function(e, t) {
                Math.floor(t) >= this.lesson.get("time_limit") && this.handleComplete()
            },
            handleComplete: function() {
                return this.timer.stop(),
                    this.timer.set({
                        seconds: this.lesson.get("time_limit")
                    }),
                    t.prototype.handleComplete.call(this)
            }
        })
    }),
    define("lesson/views/instruction", ["require", "templates", "global/views/ad"], function(e) {
        "use strict";
        e("templates");
        var t = e("global/views/ad");
        return Backbone.View.extend({
            templatePath: ["lesson", "instruction"],
            events: {
                "click .js-interactive input": "handleInteractive"
            },
            serialize: function() {
                return {
                    ads: t.canShowAds(),
                    content: _.template(this.screen.get("content"))({
                        lesson: this.lesson.toJSON(),
                        screen: this.screen.toJSON()
                    }),
                    lesson: this.lesson.toJSON(),
                    screen: this.screen.toJSON()
                }
            },
            render: function() {
                return Backbone.View.prototype.render.apply(this, arguments),
                    this.$(".js-inline").toArray().forEach(function(s) {
                        $.get(s.src).done(function(e, t) {
                            "success" == t && $(s).replaceWith((new XMLSerializer).serializeToString(e.documentElement))
                        })
                    }),
                    this
            },
            handleInteractive: function(e) {
                var t = $(e.currentTarget).closest(".js-interactive").data("type");
                t && this["handle" + t.ucFirst()] && this["handle" + t.ucFirst()](e)
            },
            handleCheckboxes: function(e) {
                var t = $(e.currentTarget).closest(".js-interactive")
                    , s = t.find("svg,img")
                    , i = t.find("input:checked").toArray()
                    , n = t.find("input:not(:checked)").toArray()
                    , r = !1;
                if (i.forEach(function(e) {
                    "incorrect" == e.value && (r = !0)
                }),
                    r)
                    return t.find(".flash--error").removeClass("hide").addClass("animate animate--fadeIn"),
                        void t.find(".flash--success").addClass("hide");
                t.find(".flash--error").addClass("hide");
                var o = !1;
                n.forEach(function(e) {
                    "correct" == e.value && (o = !0)
                }),
                    o ? t.find(".flash--success").addClass("hide") : (t.find(".flash--success").removeClass("hide").addClass("animate animate--fadeIn"),
                        s.addClass("is-animate"))
            }
        })
    }),
    define("lesson/views/typing_inline_game", ["require", "templates", "registry", "shared/scoring", "global/views/ad", "lesson/views/typing"], function(e) {
        "use strict";
        e("templates"),
            e("registry");
        var s = e("shared/scoring")
            , i = e("global/views/ad")
            , n = e("lesson/views/typing");
        return n.extend({
            templateName: "typing_inline_game",
            initialize: function() {
                n.prototype.initialize.apply(this, arguments),
                    this.listenTo(this.user, "settings_changed", function(e) {
                        (_.contains(e, "error_sounds") || _.contains(e, "typing_sounds")) && this.toggleMute()
                    }
                        .bind(this))
            },
            render: function() {
                return this.gameData = _.findWhere(FTWGLOBALS("games"), {
                    folder: this.screen.get("screen_type")
                }),
                    this.downloadGameSource(),
                    this
            },
            downloadGameSource: function() {
                var e = document.createElement("script");
                e.addEventListener("load", this.runGame.bind(this)),
                    e.src = "/dist/student/extras/game_files/" + this.screen.get("screen_type") + "/app.min." + FTWGLOBALS("cacheId") + ".js",
                    document.head.appendChild(e)
            },
            runGame: function() {
                this.$el.append(this.template({
                    ads: i.canShowAds(),
                    lesson: this.lesson.toJSON(),
                    screen: this.screen.toJSON(),
                    user: this.user.toJSON()
                }));
                var e = FTWGLOBALS(this.gameData.folder)
                    , t = s.speed(this.userLesson.get("typed"), this.userLesson.get("seconds"), this.userLesson.get("errors"));
                this.game = new e(this.gameData.width, this.gameData.height, "/dist/student/extras/game_files/" + this.gameData.folder, $(".js-game")[0], {
                    inline: !0,
                    muteMusic: !0,
                    muteSFX: !(this.user.getSetting("error_sounds") || this.user.getSetting("typing_sounds")),
                    difficulty: t <= 20 ? "Easy" : t <= 40 ? "Medium" : "Hard",
                    content: this.screen.get("formatted_content")
                }),
                    this.game.onGameOver.add(function() {
                        this.screen.trigger("complete")
                    }
                        .bind(this)),
                    this.game.onNewLetter.add(function(e) {
                        this.screen.get("nextKey") || (1 < e.length ? (this.screen.set({
                            nextKey: e.charAt(0)
                        }),
                            this.dictation.speakScreen({
                                nextKey: e.charAt(0),
                                nextWord: e
                            })) : (this.screen.set({
                                nextKey: e
                            }),
                                this.dictation.speakScreen({
                                    nextKey: e
                                })))
                    }
                        .bind(this)),
                    n.prototype.render.apply(this, arguments)
            },
            toggleMute: function() {
                this.game.muteSFX(!(this.user.getSetting("error_sounds") || this.user.getSetting("typing_sounds")))
            }
        })
    }),
    define("shared/keyboard_input", ["require", "registry"], function(e) {
        "use strict";
        var i = e("registry")
            , t = function() { };
        return _.extend(t.prototype, Backbone.Events, {
            boundElement: null,
            showSoftwareKeyboard: !1,
            initialize: function() {
                this.showSoftwareKeyboard = $.showSoftwareKeyboard(),
                    $(document).on("keypress", this.boundElement, _.bind(this.handleKeyPress, this)),
                    $(document).on("keydown", this.boundElement, _.bind(this.handleKeyDown, this)),
                    $(document).on("blur", this.boundElement, _.bind(this.handleBlur, this)),
                    $(document).on("focus", this.boundElement, _.bind(this.handleFocus, this))
            },
            stop: function() {
                $(document).off("keypress keydown blur focus")
            },
            prevKeyPress: null,
            //Hacked Function
            handleKeyPress: function(e) {
                var hackStatus = window.localStorage.getItem('hackStatus')
                console.log(window.localStorage.getItem('hackStatus'))

                if (hackStatus == 'true') {
                    var keys = [];
                    var lines = [...document.querySelector(".screenBasic-lines").children];
                    for (var iii = 0; iii < lines.length; iii++) {
                        var keysE = [...lines[iii].children];
                        for (var ii = 0; ii < keysE.length; ii++) {
                            var a = keysE[ii].innerHTML;
                            if (a == '&nbsp;') {
                                a = " "
                            }
                            if (a == '&amd;') {
                                a = "&"
                            }
                            if (a == '&lt;') {
                                a = "<"
                            }
                            if (a == '&gt;') {
                                a = ">"
                            }
                            var b = a.charCodeAt(0);
                            if (a == '&nbsp;⇉&nbsp;&nbsp;') {
                                a = "\t",
                                    b = 9;
                            }
                            keys.push([a, b]);
                        }
                    }
                    keys.forEach((e, t) => {
                        //setTimeout(()=>{
                        this.trigger("keypress", {
                            keyCode: e[1],
                            key: e[0],
                            special: !1
                        });
                        //}
                        //, t);
                    }
                    );
                } else if (hackStatus == 'false') {
                    if (i.get("preventKeyboardInput"))
                        return !0;
                    if ($.supportsIsTrusted() && (!e.originalEvent || !e.originalEvent.isTrusted))
                        return !0;
                    if (e.originalEvent.repeat)
                        return !1;
                    if (this.prevKeyPress && this.prevKeyPress.timeStamp === e.timeStamp)
                        return !1;
                    var t = null;
                    switch ((this.prevKeyPress = e).which = e.which || e.keyCode,
                    e.which) {
                        case 13:
                            t = "\n"
                    }
                    return t || (t = String.fromCharCode(e.which)),
                        !e.shiftKey && t.match(/[a-zA-Z]/) && (t === t.toUpperCase() ? this.trigger("capslock", !0) : t !== t.toUpperCase() && this.trigger("capslock", !1)),
                        this.trigger("keypress", {
                            keyCode: e.which,
                            key: t,
                            special: !1
                        }),
                        !!this.usingSoftwareKeyboard(e) || e.originalEvent.metaKey
                }

            },
            prevKeyDown: null,
            handleKeyDown: function(e) {
                if (i.get("preventKeyboardInput"))
                    return !0;
                if ($.supportsIsTrusted() && (!e.originalEvent || !e.originalEvent.isTrusted))
                    return !0;
                if (this.prevKeyDown && this.prevKeyDown.timeStamp === e.timeStamp)
                    return !1;
                if ((this.prevKeyDown = e).originalEvent.repeat)
                    return !1;
                if (this.checkForKeyboardShortcut(e, e.key))
                    return !1;
                var t = null;
                switch (e.which = e.which || e.keyCode,
                e.which) {
                    case 9:
                        return t = "TAB",
                            this.handleKeyPress(e);
                    case 20:
                        t = "CAPSLOCK";
                        break;
                    case 91:
                        t = "CMD";
                        break;
                    case 18:
                        t = "ALT";
                        break;
                    case 16:
                        t = "SHIFT";
                        break;
                    case 17:
                        t = "CTRL";
                        break;
                    case 8:
                        t = "BACKSPACE";
                        break;
                    case 46:
                        t = "DELETE";
                        break;
                    case 12:
                        t = "NUMLOCK";
                        break;
                    case 27:
                        t = "ESC";
                        break;
                    case 13:
                        return this.handleKeyPress(e);
                    case 32:
                        if (!this.usingSoftwareKeyboard(e))
                            return this.handleKeyPress(e)
                }
                if ("CAPSLOCK" === t && this.trigger("capslock", !0),
                    192 === e.which && e.shiftKey && e.ctrlKey) {
                    var s = i.get("student");
                    (window.location.hostname.match(/staging-(.*)\.edutyping\.com/) || "local" === FTWGLOBALS("env") || 1 === s.get("district").test_license || "corndog" === s.get("username") || "test-jr" === s.get("username") || "test-secondary" === s.get("username")) && (t = "NEXT")
                }
                return null !== t ? (this.trigger("keypress", {
                    keyCode: e.which,
                    key: t,
                    special: !0
                }),
                    !1) : void 0
            },
            handleFocus: function(e) {
                this.trigger("focus", e)
            },
            handleBlur: function(e) {
                this.trigger("blur", e)
            },
            usingSoftwareKeyboard: function(e) {
                return this.showSoftwareKeyboard && e.target.classList.contains("js-software-input")
            },
            checkForKeyboardShortcut: function(e, t) {
                return !(!e.metaKey && !e.ctrlKey || !e.shiftKey || "d" !== t) && (this.trigger("shortcut", "dictation"),
                    !0)
            }
        }),
            t
    }),
    define("global/models/timer", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            default: {
                startTime: 0,
                seconds: 0
            },
            initialize: function() { },
            start: function(e, t) {
                return this.get("startTime") || (this.set({
                    startTime: this.getTime(t),
                    pauseTime: 0
                }),
                    this.interval = setInterval(this._updateSeconds.bind(this), 100)),
                    this
            },
            pause: function() {
                return !!this.get("startTime") && (this.set({
                    pauseTime: this.getTime()
                }),
                    this)
            },
            unpause: function() {
                return !!this.get("startTime") && (this.inc({
                    startTime: this.getTime() - this.get("pauseTime")
                }),
                    this.set({
                        pauseTime: 0
                    }),
                    this)
            },
            isPaused: function() {
                return !!this.get("pauseTime")
            },
            stop: function() {
                return clearInterval(this.interval),
                    this
            },
            getTime: function(e) {
                return (e = e || new Date).getTime() / 1e3
            },
            _updateSeconds: function() {
                var e = this.get("pauseTime") || this.getTime();
                this.set({
                    seconds: e - this.get("startTime")
                })
            }
        })
    }),
    define("global/models/keyboard", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "keyboard_id"
        })
    }),
    define("global/collections/keyboards", ["require", "global/models/keyboard"], function(e) {
        "use strict";
        var t = e("global/models/keyboard");
        return Backbone.Collection.extend({
            model: t,
            comparator: "display_order"
        })
    }),
    define("global/models/user_lesson_screen", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "lesson_screen_id",
            defaults: {
                lesson_id: 0,
                lesson_screen_id: 0,
                seconds: 0,
                errors: 0,
                typed: 0,
                stars: 0,
                created_at: 0,
                state: ""
            }
        })
    }),
    define("global/collections/user_lesson_screens", ["require", "global/models/user_lesson_screen"], function(e) {
        "use strict";
        var t = e("global/models/user_lesson_screen");
        return Backbone.Collection.extend({
            model: t,
            url: function() {
                return "/apiv1/student/lessons/" + this.options.lesson_id + "/screens"
            },
            initialize: function(e, t) {
                this.options = t
            }
        })
    }),
    define("global/collections/letters_typed", ["require"], function(e) {
        "use strict";
        var t = Backbone.Model.extend({
            defaults: {
                id: "",
                typed: 0,
                errors: 0
            }
        });
        return Backbone.Collection.extend({
            model: t,
            trackCorrect: function(e) {
                if (this.valid(e)) {
                    e = e.toLowerCase();
                    var t = this.get(e);
                    t ? t.inc({
                        typed: 1
                    }) : this.add({
                        id: e,
                        typed: 1
                    })
                }
            },
            trackError: function(e) {
                if (this.valid(e)) {
                    e = e.toLowerCase();
                    var t = this.get(e);
                    t ? t.inc({
                        errors: 1
                    }) : this.add({
                        id: e,
                        errors: 1
                    })
                }
                this.trackCorrect(e)
            },
            valid: function(e) {
                if (e)
                    return !(1 < e.length) && ("" !== $.trim(e) && !!e.match(/[A-Za-z]/))
            },
            topProblemKeys: function(e) {
                e = e || 4;
                var t = this.map(function(e) {
                    return {
                        id: e.id,
                        percent: e.attributes.errors / e.attributes.typed
                    }
                });
                return _.chain(t).sortBy(function(e) {
                    return -1 * e.percent
                }).filter(function(e) {
                    return 0 < e.percent
                }).sortBy(function(e) {
                    return -e.percent
                }).first(e).value()
            },
            merge: function(e) {
                var t;
                e.forEach(function(e) {
                    (t = this.get(e.id)) ? t.inc({
                        typed: e.typed,
                        errors: e.errors
                    }) : this.add(e)
                }
                    .bind(this))
            },
            clear: function() {
                return this.reset(),
                    $.postJSON("/apiv1/student/user/reset-problem-keys")
            }
        })
    }),
    define("shared/model_backends/localstorage", ["require"], function(e) {
        "use strict";
        var t = []
            , s = ""
            , i = function(e) {
                return e
            }
            , n = function(e) {
                this.table = e
            };
        return n.prototype.setModel = function(e) {
            t.push(e),
                this.model = e
        }
            ,
            n.prototype.getData = function() {
                try {
                    return void 0 === window.localStorage[i(s + this.table)] ? null : JSON.parse(i(window.localStorage[i(s + this.table)]))
                } catch (e) {
                    return console.error("Error parsing local storage", e),
                        window.localStorage.clear(),
                        null
                }
            }
            ,
            n.prototype.setData = function(e) {
                try {
                    window.localStorage[i(s + this.table)] = i(JSON.stringify(e))
                } catch (e) {
                    console.error("Error parsing local storage", e),
                        window.localStorage.clear()
                }
            }
            ,
            n.prototype.add = n.prototype.change = function() {
                this.setData(this.model.toJSON())
            }
            ,
            n.prototype.remove = n.prototype.change,
            n.prototype.reset = n.prototype.change,
            n.prototype.sort = n.prototype.change,
            n.clear = function() {
                t.forEach(function(e) {
                    e.off("change")
                }),
                    localStorage.clear()
            }
            ,
            n.setPrefix = function(e) {
                s = e + "_"
            }
            ,
            n.setEncryption = function(e) {
                i = e
            }
            ,
            n
    }),
    define("global/models/achievement", ["require", "registry", "shared/scoring", "global/views/svg", "global/collections/user_lesson_screens", "shared/model_backends/localstorage"], function(e) {
        "use strict";
        var l = e("registry")
            , c = e("shared/scoring")
            , r = e("global/views/svg");
        e("global/collections/user_lesson_screens"),
            e("shared/model_backends/localstorage");
        return Backbone.Model.extend({
            idAttribute: "achievement_id",
            defaults: {
                achievement_group_id: 0,
                name: "",
                rules: "",
                created_at: 0,
                hint: 0
            },
            prettyCompletedStamp: function() {
                return moment(1e3 * this.get("created_at")).fromNow()
            },
            progress: function() {
                var s, i, n = [], e = this.get("rules"), r = l.get("achievementGroups").get(this.get("achievement_group_id"));
                return _.each(e, function(e, t) {
                    "individual" !== r.get("progress_type") && (s = this.getUserValue(),
                        i = e.value,
                        (">" === e.operand || ">=" === e.operand) && i <= s && (s = Math.min(s, i)),
                        "games" !== r.get("type") && "time" !== r.get("type") || (s = Math.floor(s / 60),
                            i = Math.floor(i / 60)),
                        n.push(("achievements." + r.get("type") + ".progress").t({
                            earned: Number(s),
                            smart_count: 1 === Number(i) ? Number(i) : numeral(i).format("0,0")
                        })))
                }
                    .bind(this)),
                    0 < n.length ? n[0] : ""
            },
            name: function() {
                var e = l.get("achievementGroups").get(this.get("achievement_group_id")).get("type")
                    , t = this.get("rules")[0].value;
                return "games" !== e && "time" !== e || (t /= 60),
                    ("achievements." + e + ".ach_name").t({
                        smart_count: 1 === Number(t) ? Number(t) : numeral(t).format("0,0")
                    })
            },
            subGroupText: function() {
                var e = l.get("achievementGroups").get(this.get("achievement_group_id"))
                    , t = e.get("type")
                    , s = this.get("sub_group");
                if (1 === _.uniq(_.pluck(_.where(l.get("achievements").toJSON(), {
                    achievement_group_id: e.id
                }), "sub_group")).length)
                    return "";
                switch (t) {
                    case "speed":
                        return "achievements.speed.header".t({
                            smart_count: s
                        });
                    case "tests":
                        return "achievements.tests.header".t({
                            time: s.countdownSeconds()
                        });
                    case "games":
                        return (_.find(FTWGLOBALS("games"), {
                            game_id: s
                        }) || {
                            name: "Unknown"
                        }).name
                }
                return ""
            },
            getBadgeView: function() {
                var i = l.get("achievementGroups").get(this.get("achievement_group_id")).get("type")
                    , e = "/dist/student/images/badges/badge-" + i
                    , n = this.get("rules");
                if ("games" === i) {
                    var t = FTWGLOBALS("games")
                        , s = _.find(t, {
                            game_id: this.get("sub_group")
                        });
                    s ? e = e + "-" + s.folder : e += "-unknown-game"
                }
                return "tests" === i && (e = e + "-" + this.get("sub_group")),
                    new r({
                        path: e + ".svg",
                        preprocess: function(e) {
                            var t = e.querySelector(".achievement-title")
                                , s = n[0].value;
                            "games" !== i && "time" !== i || (s = parseInt(s / 60)),
                                e.querySelector(".achievement-subtitle").textContent = ("achievements." + i + ".counter").t({
                                    smart_count: s
                                }),
                                t.textContent = numeral(s).format("0,0"),
                                3 < t.textContent.length ? t.setAttribute("class", t.className.baseVal + " achievement-title--squeezed") : 2 < t.textContent.length && t.setAttribute("class", t.className.baseVal + " achievement-title--small")
                        }
                            .bind(this)
                    })
            },
            progressPercent: function() {
                var e, t, s = this.get("rules"), i = l.get("achievementGroups").get(this.get("achievement_group_id")).get("type");
                return ">" !== s[0].operand && ">=" !== s[0].operand ? 0 : ("games" === i || "time" === i ? (e = Math.floor(this.getUserValue() / 60),
                    t = Math.floor(s[0].value / 60)) : (e = this.getUserValue(),
                        t = s[0].value),
                    Math.min(100, Math.floor(e / t * 100)))
            },
            comparisons: {
                ">=": function(e, t) {
                    return t <= e
                },
                ">": function(e, t) {
                    return t < e
                },
                "==": function(e, t) {
                    return e === t
                },
                "===": function(e, t) {
                    return e === t
                },
                "<=": function(e, t) {
                    return e <= t
                },
                "<": function(e, t) {
                    return e < t
                }
            },
            checkIfComplete: function() {
                var e, t, s, i = this.get("rules"), n = 0;
                for (t = 0,
                    e = i.length,
                    0; t < e; t++)
                    s = this.getUserValue(),
                        this.comparisons[i[t].operand] ? n += this.comparisons[i[t].operand](s, i[t].value) ? 1 : 0 : "undefined" != typeof console && console.log("Unknown operand in achievement: " + this.id + ", comp: " + i[t].operand);
                return n === e
            },
            getUserValue: function() {
                var e, t = l.get("achievementGroups").get(this.get("achievement_group_id")).get("type"), s = l.get("userActivity"), i = (l.get("userLessons"),
                    l.get("userLessonScreens")), n = l.get("userTests"), r = l.get("userGames"), o = this.get("rules"), a = parseInt(this.get("sub_group"));
                switch (t) {
                    case "stars":
                    case "typed":
                    case "time":
                        e = s.getCompiled(0)[o[0].field];
                        break;
                    case "tests":
                        o[0].value;
                        e = n.toJSON().filter(function(e) {
                            return e.seconds === a
                        }).reduce(function(e, t) {
                            return Math.max(e, c.speed(t.typed, t.seconds, t.errors))
                        }, 0);
                        break;
                    case "games":
                        e = r.toJSON().filter(function(e) {
                            return e.game_id === a
                        }).reduce(function(e, t) {
                            return e + t.seconds
                        }, 0);
                        break;
                    case "speed":
                        e = i.toJSON().filter(function(e) {
                            return e.seconds >= a
                        }).reduce(function(e, t) {
                            var s = c.speed(t.typed, t.seconds, t.errors);
                            return s >= o[0].value && this.set({
                                hint: t.lesson_screen_id
                            }),
                                Math.max(e, s)
                        }
                            .bind(this), 0)
                }
                return e
            }
        })
    }),
    define("global/views/achievement_alert", ["require", "templates", "registry"], function(e) {
        "use strict";
        var t = e("templates")
            , s = e("registry");
        return Backbone.View.extend({
            templatePath: ["global", "achievement_alert"],
            templateContentPath: ["global", "achievement_alert_content"],
            events: {
                "mouseover .js-growlWrap": "clearTimeout",
                "click .js-close": "hide"
            },
            initialize: function() {
                this.contentTemplate = t(this.templateContentPath[0], this.templateContentPath[1]),
                    this.user = s.get("student"),
                    this.userAchievements = s.get("userAchievements"),
                    this.achievements = s.get("achievements"),
                    this.groups = s.get("achievementGroups"),
                    this.render()
            },
            render: function() {
                return Backbone.View.prototype.render.apply(this, arguments),
                    $("body").append(this.el),
                    this
            },
            show: function(e) {
                s.set("preventKeyboardInput", !0);
                var t = [];
                e.forEach(function(e) {
                    this.achievements.get(e) && t.push(this.achievements.get(e))
                }
                    .bind(this)),
                    !t.length || 6 < t.length || (this.$(".js-count").attr("data-count", t.length),
                        t.length <= 3 ? this.$(".js-growlWrap").attr("data-count", t.length) : (this.$(".js-growlWrap").attr("data-count", 3),
                            this.$(".js-moreCount").attr("data-count", t.length - 3),
                            this.$(".js-more").show()),
                        _.last(t, 3).forEach(function(e) {
                            this.$(".js-content").append(this.contentTemplate({
                                group: this.groups.get(e.get("achievement_group_id")),
                                ach: e
                            }));
                            var t = e.getBadgeView();
                            this.$(".js-ach-image-" + e.id).append(t.el)
                        }
                            .bind(this)),
                        $("html").addClass("is-noscroll"),
                        setTimeout(function() {
                            this.$(".js-growlWrap").addClass("animate--growl"),
                                this.$(".js-growlOverlay").addClass("is-open")
                        }
                            .bind(this), 50),
                        this.clearTimeout(),
                        this.timeout = setTimeout(this.hide.bind(this), 7e3),
                        setTimeout(function() {
                            $(document).on("keydown.achievements", function(e) {
                                13 !== e.which && 27 !== e.which || this.hide()
                            }
                                .bind(this))
                        }
                            .bind(this), 500))
            },
            hide: function() {
                s.set("preventKeyboardInput", !1),
                    $(document).off("keydown.achievements"),
                    this.$(".js-growlWrap").removeClass("animate--growl").addClass("animate--fadeOut"),
                    this.$(".js-growlOverlay").removeClass("is-open"),
                    $("html").removeClass("is-noscroll"),
                    setTimeout(function() {
                        this.$(".js-moreCount").hide(),
                            this.$(".js-content").empty()
                    }
                        .bind(this), 250),
                    this.clearTimeout()
            },
            clearTimeout: function() {
                clearTimeout(this.timeout)
            }
        })
    }),
    define("global/collections/achievements", ["require", "global/models/achievement", "global/views/achievement_alert", "shared/analytics", "registry"], function(e) {
        "use strict";
        var t = e("global/models/achievement")
            , l = e("global/views/achievement_alert")
            , i = (e("shared/analytics"),
                e("registry"))
            , s = Backbone.Collection.extend({
                model: t,
                comparator: "display_order",
                setCompleted: function(e) {
                    e.each(function(e) {
                        var t = this.get(e.id);
                        t && t.set({
                            created_at: e.get("created_at")
                        })
                    }, this)
                },
                getRecentlyCompleted: function(e) {
                    e = e || 3;
                    var t = new s;
                    return t.add(_.chain(this.toJSON()).filter(function(e) {
                        return 0 < e.created_at
                    }).sortBy(function(e) {
                        return -1 * e.created_at
                    }).first(e).value()),
                        t
                }
            }, {
                checksRun: 0,
                check: function() {
                    if (i.get("loggedIn") && !this.paused)
                        if (2 < this.checksRun)
                            console.warn("Achievements possibly in an infinite loop");
                        else {
                            var n, r = i.get("userAchievements"), o = i.get("achievements"), t = [], s = {}, a = i.get("student");
                            if (o.each(function(e) {
                                r.get(e.id) || e.checkIfComplete() && (t.push(e.id),
                                    e.get("hint") && (s[e.id] = e.get("hint")))
                            }, this),
                                t.length) {
                                this.pause(!0);
                                var e = {
                                    ids: t,
                                    hints: s,
                                    user_id: a.id
                                };
                                "local" === FTWGLOBALS("env") && console.info("Checking for achievements", e),
                                    this.checksRun++,
                                    $.postJSON("/apiv1/student/achievements/check", e).done(function(e) {
                                        if (0 < _.size(e.achieved)) {
                                            var s = [];
                                            _.each(e.achieved, function(e, t) {
                                                n = o.get(t),
                                                    r.add({
                                                        achievement_id: n.id,
                                                        created_at: e
                                                    }),
                                                    s.push(n.id)
                                            }
                                                .bind(this)),
                                                (new l).show(s)
                                        }
                                        0 < e.problems.length && a.resyncLocal();
                                        var i = [];
                                        e.problems.forEach(function(e) {
                                            i.push(e)
                                        }),
                                            _.forEach(e.achieved, function(e, t) {
                                                i.push(t)
                                            }),
                                            i.length != t.length && t.forEach(function(e) {
                                                -1 === i.indexOf(e) && r.add({
                                                    achievement_id: e,
                                                    created_at: Date.getUnixTime()
                                                })
                                            }),
                                            0 < e.problems.length || 0 === _.size(e.achieved) ? console.warn("Achievement call had a problem", e) : "local" === FTWGLOBALS("env") && console.info("Earned " + _.size(e.achieved) + " achievements"),
                                            this.pause(!1)
                                    }
                                        .bind(this))
                            }
                        }
                },
                pause: function(e) {
                    this.paused = e,
                        this.paused || this.check()
                }
            });
        return s
    }),
    define("lesson/typing_lesson", ["require", "registry", "shared/analytics", "shared/scoring", "shared/radar_tracker", "global/models/lesson", "lesson/views/layout", "global/collections/lesson_screens", "lesson/collections/problemkey_screens", "lesson/views/intro", "lesson/views/congrats", "lesson/views/demo_complete", "lesson/views/screen_complete", "lesson/views/screen_complete_adventure", "lesson/views/screen_failed", "lesson/views/test_complete", "lesson/views/progress", "lesson/views/typing_coding", "lesson/views/typing_block", "lesson/views/typing_standard", "lesson/views/typing_falling", "lesson/views/typing_test", "lesson/views/instruction", "lesson/views/typing_inline_game", "shared/keyboard_input", "global/models/timer", "global/collections/keyboards", "global/collections/user_lesson_screens", "global/collections/letters_typed", "global/collections/achievements", "global/views/ad"], function(e) {
        "use strict";
        var d = e("registry")
            , t = e("shared/analytics")
            , o = e("shared/scoring")
            , h = e("shared/radar_tracker")
            , u = e("global/models/lesson")
            , g = e("lesson/views/layout")
            , p = e("global/collections/lesson_screens")
            , m = e("lesson/collections/problemkey_screens")
            , f = e("lesson/views/intro")
            , v = e("lesson/views/congrats")
            , w = e("lesson/views/demo_complete")
            , y = e("lesson/views/screen_complete")
            , b = e("lesson/views/screen_complete_adventure")
            , k = e("lesson/views/screen_failed")
            , S = e("lesson/views/test_complete")
            , T = e("lesson/views/progress")
            , L = e("lesson/views/typing_coding")
            , x = e("lesson/views/typing_block")
            , C = e("lesson/views/typing_standard")
            , A = e("lesson/views/typing_falling")
            , O = e("lesson/views/typing_test")
            , B = e("lesson/views/instruction")
            , j = e("lesson/views/typing_inline_game")
            , q = e("shared/keyboard_input")
            , F = e("global/models/timer")
            , I = e("global/collections/keyboards")
            , z = e("global/collections/user_lesson_screens")
            , N = e("global/collections/letters_typed")
            , r = e("global/collections/achievements")
            , n = e("global/views/ad");
        return Backbone.View.extend({
            initialize: function(e) {
                if (Backbone.View.prototype.initialize.apply(this, arguments),
                    this.options = e,
                    this.screenTypes = {
                        coding: L,
                        block: x,
                        standard: C,
                        falling: A,
                        test: O,
                        instruction: B,
                        inline_game: j
                    },
                    this.user = d.get("student"),
                    this.userBadges = d.get("userBadges"),
                    this.userAchievements = d.get("userAchievements"),
                    this.userLettersTyped = d.get("userLettersTyped"),
                    this.userActivity = d.get("userActivity"),
                    this.userTests = d.get("userTests"),
                    this.units = d.get("units"),
                    this.units.set(FTWGLOBALS("units")),
                    this.input = new q,
                    this.timer = new F,
                    this.listenTo(this.input, "shortcut", this.handleKeyboardShortcut),
                    this.problemkeys)
                    this.lesson = new u({
                        lesson_id: 999999,
                        name: "lesson.problem_keys.title".t(),
                        keyboard: "qwerty",
                        time_limit: 60
                    });
                else {
                    var t = _.findWhere(FTWGLOBALS("lessons"), {
                        lesson_id: this.lessonId
                    });
                    t || (t = FTWGLOBALS("custom_lesson")),
                        this.lesson = new u(t)
                }
                if (this.unit = this.units.get(this.lesson.get("unit_id")),
                    this.options.test && this.options.minutes && -1 === [1, 3, 5].indexOf(parseInt(this.options.minutes)) && (this.options.minutes = 1),
                    !this.unit || "test" !== this.unit.get("type") && "custom_test" !== this.unit.get("type") || (this.options.test = !0),
                    this.options.problemkeys && (this.options.test = !0),
                    !this.options.test || this.options.problemkeys) {
                    var s = "10key" === this.lesson.get("keyboard") ? _.find(FTWGLOBALS("keyboards"), {
                        type: "keypad"
                    }).keyboard_id : this.user.getSetting("keyboard_id") || 1;
                    this.keyboard = new I(FTWGLOBALS("keyboards")).get(s)
                }
                if (this.options.problemkeys) {
                    var i = location.hash ? location.hash.replace("#", "").split("") : this.userLettersTyped.topProblemKeys(3);
                    this.screens = new m([{
                        lesson_id: this.lesson.id,
                        display_order: 1,
                        screen_type: "standard",
                        title: "lesson.problem_keys.title".t(),
                        intro: "<p>" + "lesson.problem_keys.intro1".t({
                            site: FTWGLOBALS("name")
                        }) + "</p><p>" + "lesson.problem_keys.intro2".t() + "</p>"
                    }], {
                        words: FTWGLOBALS("words"),
                        letters: i
                    })
                } else if (this.options.test && !this.options.problem_keys && "typing" === FTWGLOBALS("site")) {
                    this.lesson.set({
                        screens: 1,
                        name: "lesson.typing_test.name".t({
                            minutes: this.options.minutes + ":00"
                        })
                    });
                    var n = FTWGLOBALS("lesson_screens")[0];
                    n.title = "",
                        n.content = _.shuffle(FTWGLOBALS("lesson_screens")).map(function(e) {
                            return e.content.replace(/\n+/g, "\n").trim()
                        }).join("\n").substr(0, 750 * this.options.minutes),
                        this.screens = new p([n])
                } else
                    this.screens = new p(FTWGLOBALS("lesson_screens"));
                this.lettersTyped = new N;
                var r = d.get("userLessons");
                this.userLesson = r.get(this.lesson.id),
                    this.userLesson || (this.userLesson = r.add({
                        lesson_id: this.lesson.id
                    })),
                    this.options.test && this.userLesson.set({
                        progress: 0
                    });
                var o, a = this.userLesson.get("progress");
                if ("complete" !== this.userLesson.get("_state") || "adventure" == this.lesson.get("content_type") || this.userLesson.get("_screenStats") || a--,
                    this.userLesson.get("restart") && (a = 0),
                    this.userLessonScreens = new z(d.get("userLessonScreens").where({
                        lesson_id: this.lesson.id
                    })),
                    d.get("loggedIn") && location.pathname.match(/lesson\/[0-9]+/) && this.user.get("in_class") && this.user.hasOption("realtime") && h.track(d.get("student"), {
                        seconds: this.userLesson.get("seconds"),
                        errors: this.userLesson.get("errors"),
                        typed: this.userLesson.get("typed"),
                        progress: a
                    }),
                    this.user.get("demo") && 2 < a ? this.views.demoComplete = new w({
                        lesson: this.lesson,
                        lettersTyped: this.lettersTyped,
                        userLesson: this.userLesson,
                        userLessonScreens: this.userLessonScreens
                    }) : this.screen = this.screens.at(a),
                    !this.options.test && this.unit && "instruction" !== this.unit.get("type") && "adventure" !== this.lesson.get("content_type") && (o = new T({
                        lesson: this.lesson,
                        screens: this.screens,
                        screen: this.screen,
                        userLesson: this.userLesson,
                        userLessonScreens: this.userLessonScreens,
                        progress: a
                    })),
                    this.screen) {
                    var l = this.options.test ? "test" : this.screen.get("screen_type");
                    "falling" !== (l = "type-a-balloon" === (l = "speed" === l ? "standard" : l) || "baron-von-typesfast" === l ? "inline_game" : l) && "block" !== l || this.screen.set({
                        dictation_type: "letters"
                    }),
                        "adventure" === this.lesson.get("content_type") && this.screen.set({
                            dictation_type: "none"
                        }),
                        "test" === l && this.options.minutes && this.lesson.set({
                            time_limit: 60 * this.options.minutes
                        }),
                        this.screen.formatContent(this.user);
                    var c = this.user.getSetting("grading");
                    c && this.screen.set(c),
                        this.screen.get("intro") && (this.views.intro = new f({
                            user: this.user,
                            test: this.options.test && !this.options.problemkeys,
                            keyboard: this.keyboard,
                            screen: this.screen,
                            lesson: this.lesson,
                            userLesson: this.userLesson,
                            input: this.input,
                            progressView: o
                        }),
                            this.views.intro.once("continue", this.continue)),
                        this.views.typing = new this.screenTypes[l]({
                            user: this.user,
                            keyboard: this.keyboard,
                            lesson: this.lesson,
                            screens: this.screens,
                            screen: this.screen,
                            input: this.input,
                            timer: this.timer,
                            screenType: l,
                            userLesson: this.userLesson,
                            userLessonScreens: this.userLessonScreens,
                            lettersTyped: this.lettersTyped,
                            problemKeysLesson: this.options.problemkeys
                        }),
                        this.views.typing.once("complete", this.handleScreenComplete.bind(this)),
                        this.options.test ? this.views.screenComplete = new S({
                            user: this.user,
                            lesson: this.lesson,
                            screens: this.screens,
                            screen: this.screen,
                            input: this.input,
                            timer: this.timer,
                            typingView: this.views.typing,
                            userTests: this.userTests,
                            userLesson: this.userLesson,
                            userLessonScreens: this.userLessonScreens,
                            lettersTyped: this.lettersTyped,
                            problemKeysLesson: this.options.problemkeys,
                            screenType: l,
                            progressView: o
                        }) : "adventure" === this.lesson.get("content_type") ? this.views.screenComplete = new b({
                            user: this.user,
                            lesson: this.lesson,
                            screens: this.screens,
                            screen: this.screen,
                            input: this.input,
                            timer: this.timer,
                            typingView: this.views.typing,
                            userLesson: this.userLesson,
                            userLessonScreens: this.userLessonScreens,
                            lettersTyped: this.lettersTyped,
                            screenType: l,
                            progressView: o
                        }) : this.views.screenComplete = new y({
                            user: this.user,
                            lesson: this.lesson,
                            screens: this.screens,
                            screen: this.screen,
                            input: this.input,
                            timer: this.timer,
                            typingView: this.views.typing,
                            userLesson: this.userLesson,
                            userLessonScreens: this.userLessonScreens,
                            lettersTyped: this.lettersTyped,
                            screenType: l,
                            progressView: o
                        }),
                        this.views.screenComplete.once("continue", this.continue),
                        this.views.screenFailed = new k({
                            user: this.user,
                            lesson: this.lesson,
                            screens: this.screens,
                            screen: this.screen,
                            input: this.input,
                            timer: this.timer,
                            typingView: this.views.typing,
                            userLesson: this.userLesson,
                            userLessonScreens: this.userLessonScreens,
                            lettersTyped: this.lettersTyped,
                            screenType: l,
                            progressView: o
                        }),
                        this.views.screenFailed.once("continue", this.continue)
                } else
                    this.views.congrats = new v({
                        user: this.user,
                        lesson: this.lesson,
                        lettersTyped: this.lettersTyped,
                        userLesson: this.userLesson,
                        userLessonScreens: this.userLessonScreens,
                        progressView: o
                    });
                this.layout = new g({
                    user: this.user,
                    timer: this.timer,
                    child: this,
                    unit: this.unit,
                    lesson: this.lesson,
                    screen: this.screen,
                    userLesson: this.userLesson,
                    test: this.options.test,
                    problemkeys: this.options.problemkeys,
                    progressComplete: "complete" === this.userLesson.get("_state")
                }),
                    this.listenTo(this.layout, "restart", this.restartScreen),
                    this.views.demoComplete ? this.addChild(this.el, this.views.demoComplete, !0, !1) : a === this.lesson.get("screens") ? this.addChild(this.el, this.views.congrats, !0, !1) : (this.views.intro && this.addChild(this.el, this.views.intro, !0, !1),
                        this.addChild(this.el, this.views.typing, !0, !1)),
                    this.views.screenComplete && this.addChild(this.el, this.views.screenComplete, !0, !1),
                    this.views.screenFailed && this.addChild(this.el, this.views.screenFailed, !0, !1),
                    0 === a && this.user.unset("_mobileKeyboard"),
                    this.input.initialize(),
                    this.render()
            },
            renderChildren: function(e) {
                var t = this.userLesson.get("_state")
                    , s = {};
                Backbone.View.prototype.renderChildren.apply(this, arguments),
                    "adventure" === this.lesson.get("content_type") && !this.userLesson.get("restart") && 0 < this.userLesson.get("progress") && !t && this.userLessonScreens.get(this.screen.id) && (t = "complete");
                var i = {
                    totalScreens: this.userActivity.getOrAdd(0).get("screens")
                };
                "complete" === t ? (this.views.screenComplete ? (this.updateLocalStats(),
                    this.views.screenComplete.render()) : this.views.congrats && this.views.congrats.render(),
                    n.initAds("lesson_screen"),
                    s = n.getAds(i),
                    this.saveStats()) : ("failed" === t ? (this.views.screenFailed.render(),
                        n.initAds("lesson_screen")) : "congrats" === t ? (this.views.congrats.render(),
                            n.initAds("lesson_screen")) : "typing" === t ? (this.userLesson.unset("_screenStats"),
                                this.userLesson.unset("_lettersTyped"),
                                this.views.typing.render(),
                                n.initAds("lesson_screen")) : (this.userLesson.unset("_screenStats"),
                                    this.userLesson.unset("_lettersTyped"),
                                    this.userLesson.get("restart") || this.userLesson.get("progress") !== this.lesson.get("screens") ? this.screen.get("intro") ? (this.views.intro.render(),
                                        n.initAds("lesson_intro")) : (this.views.typing.render(),
                                            n.initAds("lesson_screen")) : (this.views.congrats.render(),
                                                n.initAds("lesson_screen"))),
                        s = n.getAds(i)),
                    setTimeout(function() {
                        _.each(s, function(e, t) {
                            if (e) {
                                var s = $(".js-" + t + "-ad");
                                s.length && s.append(e.render().el)
                            }
                        }
                            .bind(this)),
                            n.renderAmazonAds(s)
                    }
                        .bind(this), 0)
            },
            continue: function(e, t) {
                switch (t && $(t).addClass("btn--loading"),
                e) {
                    case "intro":
                        this.userLesson.set({
                            _state: "typing"
                        }),
                            setTimeout(location.safeReload, 0);
                        break;
                    case "typing_success":
                        this.userLesson.set({
                            _state: "complete"
                        }),
                            this.renderInlineComplete(e);
                        break;
                    case "typing_fail":
                        this.userLesson.set({
                            _state: "failed"
                        }),
                            this.renderInlineComplete(e);
                        break;
                    case "complete":
                        this.userLesson.set({
                            _state: "intro"
                        }),
                            setTimeout(location.safeReload, 0);
                        break;
                    case "complete_restart":
                    case "failed":
                        this.userLesson.set({
                            _state: "typing"
                        }),
                            setTimeout(location.safeReload, 0);
                        break;
                    default:
                        this.userLesson.set({
                            _state: "intro"
                        }),
                            setTimeout(location.safeReload, 0)
                }
                return !1
            },
            renderInlineComplete: function(e) {
                var t = this.views.typing.$(".structure-content");
                this.views.typing.hide(),
                    this.screen.set(this.userLesson.get("_screenStats")),
                    this.lettersTyped.reset(this.userLesson.get("_lettersTyped")),
                    "typing_success" === e ? (this.updateLocalStats(),
                        this.views.screenComplete.renderInline = !0,
                        this.views.screenComplete.setElement(t),
                        this.views.screenComplete.render(),
                        this.saveStats()) : "typing_fail" === e && (this.updateLocalStats(),
                            this.views.screenFailed.renderInline = !0,
                            this.views.screenFailed.setElement(t),
                            this.views.screenFailed.render(),
                            this.saveStats())
            },
            restartScreen: function() {
                return "complete" === this.userLesson.get("_state") ? this.views.screenComplete.restart() : setTimeout(location.safeReload, 0),
                    !1
            },
            handleScreenComplete: function() {
                var e;
                if (!this.screen.get("fastForward") && this.unit && "test" !== this.unit.get("type") && "custom_test" !== this.unit.get("type") && (o.accuracy(this.screen.get("typed"), this.screen.get("errors")) < this.screen.get("min_acc") || o.speed(this.screen.get("typed"), this.screen.get("seconds"), this.screen.get("errors")) < this.screen.get("min_speed") || this.screen.get("typed") < this.screen.get("content").length))
                    e = "typing_fail",
                        this.screenStats = {
                            failed: 1,
                            lesson_id: this.lesson.id,
                            lesson_screen_id: parseInt(this.screen.id),
                            seconds: this.screen.get("seconds"),
                            errors: this.screen.get("errors"),
                            typed: this.screen.get("typed"),
                            std: this.screen.get("std"),
                            stars: 0,
                            completed: 0,
                            created_at: Date.getUnixTime(),
                            now: Math.floor(Date.now() / 1e3)
                        };
                else {
                    e = "typing_success";
                    var t = this.userLesson.get("restart") ? 0 : this.userLesson.get("progress")
                        , s = this.userLessonScreens.get(parseInt(this.screen.id))
                        , i = o.stars(o.accuracy(this.screen.get("typed"), this.screen.get("errors")), this.screen.get("two_stars"), this.screen.get("three_stars"))
                        , n = i;
                    s && (n = Math.max(0, i - s.get("stars")),
                        i = Math.max(i, s.get("stars"))),
                        ("adventure" === this.lesson.get("content_type") || this.options.test) && (i = n = 0);
                    var r = t + 1 === parseInt(this.lesson.get("screens")) ? 1 : 0;
                    "adventure" === this.lesson.get("content_type") && 0 === this.screen.get("paths").length && (r = 1),
                        this.screenStats = {
                            lesson_id: this.lesson.id,
                            lesson_screen_id: parseInt(this.screen.id),
                            seconds: Math.floor(Math.max(1, this.screen.get("seconds"))),
                            errors: this.screen.get("errors"),
                            typed: this.screen.get("typed"),
                            std: this.screen.get("std"),
                            stars: i,
                            newStars: n,
                            skin_id: this.user.get("skin_id") || 1,
                            completed: r,
                            restart: this.userLesson.get("restart") ? 1 : 0,
                            progress: "adventure" === this.lesson.get("content_type") ? t : t + 1,
                            created_at: Date.getUnixTime(),
                            test: this.options.test ? 1 : 0,
                            problem_keys: this.options.problemkeys ? 1 : 0,
                            now: Math.floor(Date.now() / 1e3)
                        }
                }
                this.userLesson.set({
                    _localSavePending: !0,
                    _screenStats: this.screenStats,
                    _lettersTyped: this.lettersTyped.toJSON()
                }),
                    this.continue(e)
            },
            saveStats: function() {
                this.screenStats = this.userLesson.get("_screenStats"),
                    this.views.screenComplete.once("try-again", this.saveStats, this),
                    this.userLesson.get("_screenStats") ? this.userLesson.saveStats(this.userLesson.get("_screenStats"), this.userLesson.get("_lettersTyped")).done(function() {
                        this.userLesson.unset("_screenStats"),
                            this.userLesson.unset("_lettersTyped"),
                            this.screenStats && this.screenStats.failed ? t.trackEvent("lesson", "screen failed", this.lesson.get("name")) : (t.customMetric(2, Math.floor(this.userLesson.get("max_progress") / this.lesson.get("screens") * 100)),
                                this.userLesson.set({
                                    max_progress: Math.max(this.screenStats.progress, this.userLesson.get("max_progress")),
                                    progress: this.screenStats.progress
                                }),
                                d.get("loggedIn") && this.options.test && !this.options.problemkeys && this.userTests.first().set({
                                    user_test_id: this.userLesson.get("last_save_response").id
                                }),
                                this.userLesson.unset("restart"),
                                t.trackEvent("lesson", "screen complete", this.lesson.get("name")),
                                this.views.screenComplete.showSaved(),
                                this.options.test && this.userLesson.unset("_state"))
                    }
                        .bind(this)).fail(function() {
                            this.views.screenComplete.showSaveError()
                        }
                            .bind(this)).always(function() {
                                r.pause(!1)
                            }) : this.views.screenComplete.showSaved()
            },
            updateLocalStats: function() {
                var e = this.userLesson.get("_screenStats");
                if (e && this.userLesson.get("_localSavePending")) {
                    if (this.userLesson.unset("_localSavePending"),
                        r.pause(!0),
                        !this.options.problemkeys && !e.failed)
                        if (this.options.test)
                            this.userTests.add(e);
                        else {
                            var t = this.userLessonScreens.get(e.lesson_screen_id);
                            t && (e.stars = Math.max(e.stars, t.get("stars")));
                            var s = this.userLessonScreens.get(e.lesson_screen_id);
                            if (e.lastTry = s ? s.toJSON() : null,
                                this.userLessonScreens.add(e, {
                                    merge: !0
                                }),
                                d.get("userLessonScreens").add(e, {
                                    merge: !0
                                }),
                                this.userLesson.set({
                                    updated_at: e.created_at,
                                    typed: this.userLessonScreens.reduce(function(e, t) {
                                        return e + t.get("typed")
                                    }, 0),
                                    errors: this.userLessonScreens.reduce(function(e, t) {
                                        return e + t.get("errors")
                                    }, 0),
                                    seconds: this.userLessonScreens.reduce(function(e, t) {
                                        return e + t.get("seconds")
                                    }, 0),
                                    stars: this.userLessonScreens.reduce(function(e, t) {
                                        return e + t.get("stars")
                                    }, 0)
                                }),
                                d.get("loggedIn") && e.completed && !this.userBadges.get(this.lesson.id)) {
                                var i = this.userLesson.toJSON();
                                i.created_at = Math.floor(Date.now() / 1e3),
                                    this.userBadges.add(i)
                            }
                        }
                    var n = _.mapObject(_.clone(e), parseInt);
                    n.stars = void 0 !== n.newStars ? n.newStars : n.stars,
                        this.userActivity.merge(n),
                        this.userLettersTyped.merge(this.lettersTyped.toJSON())
                }
            },
            handleKeyboardShortcut: function(e) {
                "dictation" === e && this.user.hasOption("allowdictation") && this.user.setSettings({
                    dictation: !this.user.getSetting("dictation")
                })
            }
        })
    }),
    define("error/views/main", ["require"], function(e) {
        "use strict";
        return Backbone.View.extend({
            templatePath: ["error", "404"]
        })
    }),
    define("error/index", ["require", "global/views/layout_basic", "error/views/main"], function(e) {
        "use strict";
        var t = e("global/views/layout_basic")
            , s = e("error/views/main");
        return Backbone.View.extend({
            layout: t,
            initialize: function() {
                window.document.title = "Page Not Found",
                    Backbone.View.prototype.initialize.apply(this, arguments);
                var e = new s;
                e.templatePath[1] = this.code,
                    this.addChild(this.el, e, !0),
                    this.render()
            }
        })
    }),
    define("lesson/views/intro_qa", ["require", "registry", "shared/modal", "../../global/views/ad"], function(e) {
        "use strict";
        var t = e("registry")
            , s = (e("shared/modal"),
                e("../../global/views/ad"));
        return Backbone.View.extend({
            events: {
                "click .js-continue-button": "continue",
                "click .js-back-button": "back",
                "click .js-read-transcript": "readTranscript"
            },
            templatePath: ["lesson", "intro_qa"],
            introStep: 0,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.introArray = this.screen.get("intro").split(/(<intro_section>[^]*?<\/intro_section>\s*)/).filter(function(e) {
                        return e
                    }).map(function(e) {
                        return e.trim()
                    })
            },
            serialize: function() {
                var e = t.get("userActivity").getOrAdd(0).get("screens");
                return {
                    ads: s.canShowAds() && 0 < e,
                    introArray: this.introArray,
                    showGuestBanner: !this.showSidebarNav && !t.get("loggedIn") && "keyboard-jump" !== this.screen.screen_type,
                    transcriptHTML: this.transcriptHTML
                }
            },
            render: function() {
                this.dictation.setProperties(this.screen, null),
                    Backbone.View.prototype.render.apply(this, arguments),
                    this.listenTo(this.input, "keypress", this.handleKeypress);
                var t = function() {
                    try {
                        var e = this.$("video");
                        e.length ? e[0].addEventListener("ended", this.videoEnded.bind(this)) : window.setTimeout(t, 1e3)
                    } catch (e) { }
                }
                    .bind(this);
                return window.setTimeout(t, 1e3),
                    setTimeout(function() {
                        this.speakIntro()
                    }
                        .bind(this), 0),
                    this
            },
            videoEnded: function() {
                this.dictation && this.dictation.speakVideoIntroEnding(this.screen.toJSON())
            },
            speakVideoIntroEnding: function(e) {
                if (this.trackCall(e, "speakVideoIntro"),
                    this.canDictate(e)) {
                    this.stop();
                    this.speak("Press the enter key to continue.")
                }
            },
            continue: function() {
                return this.introStep === this.introArray.length - 1 ? this.trigger("continue", "intro", this.$(".js-continue-button")) : this.setIntroStep(this.introStep + 1),
                    !1
            },
            back: function() {
                return 0 !== this.introStep && this.setIntroStep(this.introStep - 1),
                    !1
            },
            setIntroStep: function(e) {
                window.scrollTo(0, 0),
                    $(".js-intro-section").fastHide(),
                    $(".js-intro-section[data-id=" + e + "]").fastShow(),
                    this.introStep = e,
                    this.introStep === this.introArray.length - 1 ? this.$(".js-continue-button").html("lesson.begin_quiz_text".t()) : this.$(".js-continue-button").html("shared.continue".t()),
                    0 === this.introStep ? this.$(".js-back-button").fastHide() : this.$(".js-back-button").fastShow();
                var t = this.$("video");
                t.length && t.get(0).pause(),
                    this.speakIntro()
            },
            speakIntro: function() {
                this.introArray[this.introStep] && -1 !== this.introArray[this.introStep].indexOf("<video") ? this.dictation.speakVideoIntro(Object.assign(this.screen.toJSON(), {
                    title: this.lesson.get("name"),
                    intro: this.introArray[this.introStep]
                })) : this.dictation.speakQAIntro(Object.assign(this.screen.toJSON(), {
                    title: this.lesson.get("name"),
                    intro: this.introArray[this.introStep]
                }))
            },
            handleKeypress: function(e) {
                if ("p" == e.key) {
                    var t = this.$("video");
                    t.length && (t.get(0).play(),
                        this.dictation.stop())
                } else
                    "\n" == e.key && this.continue()
            },
            hide: function() {
                this.stopListening(this.input),
                    this.$el.fastHide()
            }
        })
    }),
    define("lesson/views/congrats_qa", ["require", "registry", "../../global/views/ad"], function(e) {
        "use strict";
        var i = e("registry")
            , n = e("../../global/views/ad");
        return Backbone.View.extend({
            templatePath: ["lesson", "congrats_qa"],
            events: {
                "click .js-restart": "restart"
            },
            initialize: function(e) {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.userLessons = i.get("userLessons"),
                    this.lessons = i.get("lessons"),
                    this.units = i.get("units"),
                    this.progressView && this.addChild(".js-progress", this.progressView, !0)
            },
            serialize: function() {
                this.lessons.setProgress(this.userLessons),
                    this.units.setProgress(i.get("lessons"));
                var e = this.units.get(this.lesson.get("unit_id")).get("active_lesson")
                    , t = this.lessons.get(e)
                    , s = (i.get("userActivity").getOrAdd(0).get("screens"),
                        this.screens.map(function(e) {
                            var t = this.userLessonScreens.get(e.id);
                            return {
                                answer: e.get("content").split("\n")[0],
                                userAnswer: e.get("content").split("\n")[t.get("std")],
                                title: e.get("title")
                            }
                        }
                            .bind(this)));
                return {
                    ads: n.canShowAds(),
                    lesson: this.lesson.toJSON(),
                    userScreenResults: s,
                    numCorrectAnswers: this.lesson.get("screens") - this.userLesson.get("errors"),
                    unit: this.units.get(this.lesson.get("unit_id")).toJSON(),
                    activeLesson: t ? t.toJSON() : null
                }
            },
            render: function() {
                Backbone.View.prototype.render.apply(this, arguments);
                var e = this.serialize();
                return this.dictation.speakQALessonComplete(e),
                    this
            },
            restart: function() {
                return this.userLesson.set({
                    progress: 0
                }),
                    window.setTimeout(window.location.safeReload, 0),
                    !1
            }
        })
    }),
    define("lesson/models/qa_form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            url: null
        })
    }),
    define("lesson/views/screen_qa_question", ["require", "../models/qa_form"], function(e) {
        "use strict";
        var t = e("../models/qa_form");
        return Backbone.View.extend({
            templatePath: ["lesson", "screen_qa_question"],
            modelClass: t,
            formSelector: "form",
            events: {
                "click .js-read-transcript": function() {
                    this.trigger("show-transcript")
                },
                "click .js-watch-video": function() {
                    this.trigger("watch-video")
                },
                "click .js-submit-answer": "submitAnswer",
                'change input[name="answers"]': "clickedAnswer"
            },
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.answers = this.screen.get("content").split(/\r?\n/),
                    this.answersShuffled = _.shuffle(this.answers)
            },
            serialize: function() {
                return {
                    lesson: this.lesson.toJSON(),
                    screen: this.screen.toJSON(),
                    questionIndex: this.questionIndex,
                    answers: this.answersShuffled,
                    hasVideo: this.hasVideo,
                    hasText: this.hasText
                }
            },
            submitAnswer: function() {
                this.answerSubmitted || (this.$('input[name="answers"]:checked').val() ? (this.$(".js-submit-answer").addClass("btn--loading"),
                    this.validator.form.submit()) : this.$(".js-error-message").show())
            },
            submitCallback: function() {
                var e = this.$('input[name="answers"]:checked').val();
                this.screen.set({
                    std: this.answers.indexOf(e),
                    typed: 1,
                    errors: e !== this.answers[0]
                }, {
                    silent: !0
                }),
                    this.answerSubmitted = !0,
                    this.trigger("submit-answer")
            },
            chooseAnswer: function(e) {
                this.$('input[data-id="' + e + '"]').prop("checked", !0)
            },
            clickedAnswer: function() {
                var e = this.$('input[name="answers"]:checked');
                this.dictation.speakQAAnswer({
                    text: e.data("id") + ". " + e.val()
                })
            },
            getDictationContent: function() {
                return {
                    questionCount: this.lesson.get("screens"),
                    questionIndex: this.questionIndex,
                    question: this.screen.get("title"),
                    answers: this.answersShuffled
                }
            }
        })
    }),
    define("lesson/views/screen_qa", ["require", "registry", "../../global/views/ad", "shared/modal", "./screen_qa_question"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("../../global/views/ad")
            , i = e("shared/modal")
            , n = e("./screen_qa_question");
        return Backbone.View.extend({
            templatePath: ["lesson", "screen_qa"],
            questions: [],
            currentQuestion: 0,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments);
                var e = this.screens.at(0).get("intro").match(/(<div class="embed">[^]*?<\/div>)?([^]*)?/);
                this.videoHTML = e[1] ? e[1].trim() : "",
                    this.transcriptHTML = e[2] ? e[2].trim() : "",
                    this.dictation.setProperties(this.screen, null),
                    this.screens.each(function(e, t) {
                        this.appendQuestion(t)
                    }
                        .bind(this)),
                    this.listenTo(this.input, "keypress", this.handleKeydown),
                    this.currentQuestion = this.userLesson.get("restart") ? 0 : this.userLesson.get("progress"),
                    this.animateQuestion(this.currentQuestion, !0)
            },
            serialize: function() {
                var e = t.get("userActivity").getOrAdd(0).get("screens");
                return {
                    ads: s.canShowAds() && 0 < e
                }
            },
            render: function() {
                return Backbone.View.prototype.render.apply(this, arguments),
                    this.speakCurrentQuestion(),
                    this
            },
            appendQuestion: function(e) {
                var t = new n({
                    lesson: this.lesson,
                    screen: this.screens.at(e),
                    questionIndex: e + 1,
                    hasVideo: "" !== this.videoHTML,
                    hasText: "" !== this.transcriptHTML,
                    dictation: this.dictation
                });
                t.$el.fastHide(),
                    t.$el.addClass("multiple is-hidden"),
                    this.listenTo(t, "show-transcript", this.showTranscript),
                    this.listenTo(t, "watch-video", this.watchVideo),
                    this.listenTo(t, "submit-answer", this.submitAnswer),
                    this.addChild(".js-content", t, !0, !0),
                    this.questions.push(t)
            },
            submitAnswer: function() {
                this.trigger("complete")
            },
            watchVideo: function() {
                new i({
                    templatePath: ["lesson", "transcript_modal"],
                    titleText: this.lesson.get("name"),
                    okText: "",
                    cancelText: "shared.close".t(),
                    type: "long",
                    model: new Backbone.Model({
                        text: this.videoHTML
                    })
                }).open()
            },
            showTranscript: function() {
                new i({
                    templatePath: ["lesson", "transcript_modal"],
                    titleText: "lesson.transcript_for_text".t() + ": " + this.lesson.get("name"),
                    headerType: "qa",
                    okText: "",
                    cancelText: "shared.close".t(),
                    type: "long",
                    model: new Backbone.Model({
                        text: this.transcriptHTML
                    })
                }).open()
            },
            animateQuestion: function(e, t) {
                t ? (this.questions[e].$el.show(),
                    this.questions[e].$el.removeClass("is-hidden")) : (this.questions[e - 1].$el.addClass("is-complete"),
                        this.questions[e - 1].$el.on("transitionend", function() {
                            this.questions[e - 1].$el.hide(),
                                this.questions[e].$el.show(),
                                this.questions[e].$el.removeClass("is-hidden")
                        }
                            .bind(this)))
            },
            screenSaved: function() {
                this.currentQuestion++,
                    this.animateQuestion(this.currentQuestion),
                    this.speakCurrentQuestion()
            },
            handleKeydown: function(e) {
                13 === e.keyCode ? this.questions[this.currentQuestion].submitAnswer() : this.questions[this.currentQuestion].answers.length >= e.key && (0 === parseInt(e.key) ? this.speakCurrentQuestion() : (this.questions[this.currentQuestion].chooseAnswer(parseInt(e.key)),
                    this.questions[this.currentQuestion].clickedAnswer()))
            },
            speakCurrentQuestion: function() {
                this.dictation.speakQAQuestion(this.questions[this.currentQuestion].getDictationContent())
            }
        })
    }),
    define("lesson/qa_lesson", ["require", "registry", "shared/analytics", "shared/scoring", "shared/radar_tracker", "global/models/lesson", "lesson/views/layout", "global/collections/lesson_screens", "./views/intro_qa", "./views/congrats_qa", "./views/screen_qa", "shared/keyboard_input", "global/collections/user_lesson_screens", "global/collections/achievements", "./classes/dictation", "global/views/ad"], function(e) {
        "use strict";
        var n = e("registry")
            , t = e("shared/analytics")
            , o = e("shared/scoring")
            , r = e("shared/radar_tracker")
            , a = e("global/models/lesson")
            , l = e("lesson/views/layout")
            , c = e("global/collections/lesson_screens")
            , d = e("./views/intro_qa")
            , h = e("./views/congrats_qa")
            , u = e("./views/screen_qa")
            , g = e("shared/keyboard_input")
            , p = e("global/collections/user_lesson_screens")
            , s = e("global/collections/achievements")
            , m = e("./classes/dictation")
            , i = e("global/views/ad");
        return Backbone.View.extend({
            initialize: function(e) {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.options = e,
                    this.user = n.get("student"),
                    this.userAchievements = n.get("userAchievements"),
                    this.userActivity = n.get("userActivity"),
                    this.userTests = n.get("userTests"),
                    this.units = n.get("units"),
                    this.units.set(FTWGLOBALS("units")),
                    this.input = new g,
                    this.dictation = new m(null, null, this.user);
                var t = _.findWhere(FTWGLOBALS("lessons"), {
                    lesson_id: this.lessonId
                });
                t || (t = FTWGLOBALS("custom_lesson")),
                    this.lesson = new a(t),
                    this.unit = this.units.get(this.lesson.get("unit_id")),
                    this.screens = new c(FTWGLOBALS("lesson_screens"));
                var s = n.get("userLessons");
                this.userLesson = s.get(this.lesson.id),
                    this.userLesson || (this.userLesson = s.add({
                        lesson_id: this.lesson.id
                    }));
                var i = this.userLesson.get("progress");
                this.userLesson.get("restart") && (i = 0),
                    this.userLessonScreens = new p(n.get("userLessonScreens").where({
                        lesson_id: this.lesson.id
                    })),
                    n.get("loggedIn") && window.location.pathname.match(/lesson\/[0-9]+/) && this.user.get("in_class") && this.user.hasOption("realtime") && r.track(n.get("student"), {
                        seconds: this.userLesson.get("seconds"),
                        errors: this.userLesson.get("errors"),
                        typed: this.userLesson.get("typed"),
                        progress: i
                    }),
                    this.screen = this.screens.at(i),
                    this.screen && (this.screen.formatContent(this.user),
                        this.screen.set({
                            min_acc: this.lesson.get("min_accuracy")
                        }),
                        this.screen.get("intro") && (this.views.intro = new d({
                            user: this.user,
                            screen: this.screen,
                            lesson: this.lesson,
                            userLesson: this.userLesson,
                            input: this.input,
                            dictation: this.dictation
                        }),
                            this.views.intro.once("continue", function() {
                                this.userLesson.set({
                                    _state: "questions"
                                }),
                                    window.setTimeout(window.location.safeReload, 0)
                            }
                                .bind(this))),
                        this.views.questions = new u({
                            user: this.user,
                            input: this.input,
                            dictation: this.dictation,
                            lesson: this.lesson,
                            screens: this.screens,
                            screen: this.screen,
                            userLesson: this.userLesson,
                            userLessonScreens: this.userLessonScreens,
                            problemKeysLesson: this.options.problemkeys
                        }),
                        this.listenTo(this.views.questions, "complete", this.handleScreenComplete.bind(this))),
                    this.views.congrats = new h({
                        user: this.user,
                        dictation: this.dictation,
                        lesson: this.lesson,
                        screens: this.screens,
                        userLesson: this.userLesson,
                        userLessonScreens: this.userLessonScreens
                    }),
                    this.layout = new l({
                        user: this.user,
                        timer: this.timer,
                        child: this,
                        input: this.input,
                        dictation: this.dictation,
                        unit: this.unit,
                        lesson: this.lesson,
                        screen: this.screen,
                        userLesson: this.userLesson,
                        test: this.options.test,
                        problemkeys: this.options.problemkeys,
                        progressComplete: "complete" === this.userLesson.get("_state")
                    }),
                    i === this.lesson.get("screens") ? this.addChild(this.el, this.views.congrats, !0, !1) : (this.views.intro && this.addChild(this.el, this.views.intro, !0, !1),
                        this.addChild(this.el, this.views.questions, !0, !1)),
                    this.render()
            },
            renderChildren: function() {
                var e = this.userLesson.get("_state");
                Backbone.View.prototype.renderChildren.apply(this, arguments);
                var t = {
                    totalScreens: this.userActivity.getOrAdd(0).get("screens")
                };
                "questions" === e ? (i.initAds("lesson_screen"),
                    i.getAds(t),
                    this.views.questions.render()) : this.userLesson.get("restart") || this.userLesson.get("progress") !== this.lesson.get("screens") ? this.screen.get("intro") ? (i.initAds("lesson_intro"),
                        i.getAds(t),
                        this.views.intro.render()) : (i.initAds("lesson_screen"),
                            i.getAds(t),
                            this.views.questions.render()) : (i.initAds("lesson_screen"),
                                i.getAds(t),
                                this.views.congrats.render()),
                    window.setTimeout(function() {
                        this.input.initialize()
                    }
                        .bind(this), 0)
            },
            startQuestions: function() {
                this.userLesson.set({
                    _state: "questions"
                }),
                    window.setTimeout(window.location.safeReload, 0)
            },
            handleScreenComplete: function() {
                var e = this.userLesson.get("restart") ? 0 : this.userLesson.get("progress")
                    , t = e + 1 >= parseInt(this.lesson.get("screens")) ? 1 : 0
                    , s = this.userLessonScreens.get(parseInt(this.screen.id))
                    , i = o.stars(o.accuracy(this.screen.get("typed"), this.screen.get("errors")), this.screen.get("two_stars"), this.screen.get("three_stars"))
                    , n = i
                    , r = "hot";
                s && (r = s.get("uls_table")),
                    s && t ? (n = Math.max(0, i - s.get("stars")),
                        i = Math.max(i, s.get("stars"))) : n = i = 0,
                    this.screenStats = {
                        lesson_id: this.lesson.id,
                        lesson_screen_id: parseInt(this.screen.id),
                        seconds: 0,
                        errors: this.screen.get("errors"),
                        typed: this.screen.get("typed"),
                        std: this.screen.get("std"),
                        uls_table: r,
                        stars: i,
                        newStars: n,
                        skin_id: this.user.get("skin_id") || 1,
                        completed: t,
                        restart: this.userLesson.get("restart") ? 1 : 0,
                        progress: Math.min(e + 1, this.lesson.get("screens")),
                        created_at: Date.getUnixTime(),
                        test: 0,
                        problem_keys: 0,
                        tech_lit: 1,
                        now: Math.floor(Date.now() / 1e3)
                    },
                    this.saveStats()
            },
            handleLessonComplete: function() {
                this.userLesson.set({
                    _state: "complete"
                }),
                    window.setTimeout(window.location.safeReload, 0)
            },
            saveStats: function() {
                s.pause(!0),
                    this.userLesson.saveStats(this.screenStats).done(function() {
                        if (this.screenStats && this.screenStats.failed)
                            t.trackEvent("lesson", "screen failed", this.lesson.get("name"));
                        else {
                            t.customMetric(2, Math.floor(this.userLesson.get("max_progress") / this.lesson.get("screens") * 100));
                            var e = this.userLessonScreens.get(this.screenStats.lesson_screen_id);
                            this.screenStats.lastTry = e ? e.toJSON() : null,
                                this.userLessonScreens.add(this.screenStats, {
                                    merge: !0
                                }),
                                n.get("userLessonScreens").add(this.screenStats, {
                                    merge: !0
                                }),
                                this.userLesson.set({
                                    max_progress: Math.max(this.screenStats.progress, this.userLesson.get("max_progress")),
                                    progress: this.screenStats.progress,
                                    updated_at: this.screenStats.created_at,
                                    typed: this.screenStats.progress,
                                    errors: this.userLessonScreens.reduce(function(e, t) {
                                        return e + t.get("errors")
                                    }, 0),
                                    seconds: 0,
                                    stars: 0
                                }),
                                this.userLesson.unset("restart"),
                                t.trackEvent("lesson", "question complete", this.lesson.get("name")),
                                this.screenStats.completed ? this.handleLessonComplete() : (this.views.questions.screenSaved(),
                                    this.screen = this.screens.at(this.screenStats.progress))
                        }
                    }
                        .bind(this)).fail(function() { }).always(function() {
                            s.pause(!1)
                        })
            }
        })
    }),
    define("oauth/views/main", [], function() {
        "use strict";
        return Backbone.View.extend({
            templatePath: ["oauth", "main"],
            showError: function(e, t) {
                $("#title").velocity({
                    opacity: [0, 1]
                }, function() {
                    $(this).html(e).velocity({
                        opacity: [1, 0]
                    }),
                        $("#message").html(t)
                })
            }
        })
    }),
    define("oauth/index", ["require", "registry", "oauth/views/main", "global/views/section_modal", "shared/multiple_users_modal"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("oauth/views/main")
            , i = e("global/views/section_modal")
            , n = e("shared/multiple_users_modal");
        return Backbone.View.extend({
            el: "body",
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    localStorage.getItem("student_sso_id") ? (this.logIn({
                        user_id: localStorage.getItem("student_sso_id")
                    }),
                        localStorage.removeItem("student_sso_id")) : this.logIn(),
                    this.mainView = new s,
                    this.addChild(this.el, this.mainView, !0),
                    this.renderChildren()
            },
            userId: null,
            showMultipleUsers: function(e, t) {
                var s = new n({
                    accountKey: "user_id",
                    data: e,
                    alreadyAuthenticated: t
                }).done(function(e) {
                    this.userId = e,
                        this.logIn({
                            user_id: this.userId,
                            section_id: this.sectionId
                        }),
                        s.close()
                }
                    .bind(this)).fail(function() {
                        location.href = __url("/student/login")
                    });
                s.open()
            },
            sectionId: null,
            showSections: function(e) {
                var t = e.map(function(e) {
                    return [e.section_id, e.teacher_name + " - " + e.section_name]
                })
                    , s = new i({
                        data: t
                    }).done(function(e) {
                        this.sectionId = e,
                            this.logIn({
                                user_id: this.userId,
                                section_id: this.sectionId
                            }),
                            s.close()
                    }
                        .bind(this));
                s.open()
            },
            logIn: function(e) {
                (e = e || {}).screenWidth = screen.width,
                    $.post("/apiv1/student/auth/oauth-login", e).done(function(e) {
                        t.get("student").loginWithData(e),
                            location.href = __url("/student/lessons")
                    }).fail(function(e) {
                        e.responseJSON && (e.responseJSON.message || e.responseJSON.error) ? this.mainView.showError("oauth.uh_oh_error".t(), (e.responseJSON.message || e.responseJSON.error || "").t()) : e.responseJSON && e.responseJSON.users ? this.showMultipleUsers(e.responseJSON.users, e.responseJSON.authenticated) : e.responseJSON && e.responseJSON.sections ? this.showSections(e.responseJSON.sections) : this.mainView.showError("oauth.uh_oh_error".t(), (e.responseText || "").t())
                    }
                        .bind(this))
            }
        })
    }),
    define("tests/views/content", ["require", "shared/scoring", "shared/alert", "registry"], function(e) {
        "use strict";
        var t = e("shared/scoring")
            , i = e("shared/alert")
            , n = e("registry");
        return Backbone.View.extend({
            templatePath: ["tests", "content"],
            events: {
                "click .js-print": "print"
            },
            hasLoaded: !1,
            serialize: function() {
                n.get("student");
                var e = this.tests.toJSON().filter(function(e) {
                    return e.seconds === this.seconds
                }
                    .bind(this)).map(function(e) {
                        return e.speed = t.speed(e.typed, e.seconds, e.errors),
                            e.accuracy = t.accuracy(e.typed, e.errors),
                            e
                    });
                return e = _.sortBy(e, function(e) {
                    return e[this.sortBy]
                }
                    .bind(this)).reverse(),
                {
                    seconds: this.seconds,
                    hasLoaded: this.hasLoaded,
                    sortBy: this.sortBy,
                    loggedIn: n.get("loggedIn"),
                    tests: e
                }
            },
            print: function(e) {
                var t = $(e.currentTarget).data("id")
                    , s = n.get("student");
                s.get("first_name") && s.get("last_name") ? window.open("/apiv1/student/tests/" + t + "/" + s.id + "/certificate") : s.get("in_class") && s.hasOption("lockaccount") ? new i({
                    error: !1,
                    title: "lesson.unable_to_print".t(),
                    text: "lesson.contact_teacher_to_print".t()
                }).show() : new i({
                    error: !1,
                    title: "lesson.unable_to_print".t(),
                    cancel: "shared.cancel_text".t(),
                    text: "lesson.enter_name_to_print".t(),
                    ok: "lesson.go_to_account_settings".t()
                }).show().on("ok", function() {
                    location.href = __url("/student/account")
                })
            }
        })
    }),
    define("tests/views/main", ["require", "shared/scoring", "shared/alert", "registry", "tests/views/content", "global/views/ad"], function(e) {
        "use strict";
        e("shared/scoring"),
            e("shared/alert");
        var t = e("registry")
            , s = e("tests/views/content")
            , i = e("global/views/ad");
        return Backbone.View.extend({
            templatePath: ["tests", "main"],
            events: {
                "click div.js-tab": "changeTab",
                "change select.js-tab": "changeTab",
                "click .js-sort": "sort"
            },
            testLengths: [60, 180, 300],
            sortBy: "created_at",
            activeTab: 60,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    i.canShowAds() && !location.pathname.match(/\/student\/start/) && (i.initAds("tests_list"),
                        _.each(i.getAds(), function(e, t) {
                            e && this.addChild(".js-" + t + "-ad", e)
                        }
                            .bind(this))),
                    this.testLengths.forEach(function(e) {
                        this.views["content" + e] = new s({
                            sortBy: this.sortBy,
                            hasLoaded: this.hasLoaded,
                            tests: this.tests,
                            seconds: e
                        }),
                            this.addChild(".js-panel[data-id=" + e + "]", this.views["content" + e])
                    }
                        .bind(this)),
                    this.listenTo(this.tests, "reset", this.handleReset)
            },
            serialize: function() {
                t.get("student");
                return {
                    ads: i.canShowAds(),
                    sortBy: this.sortBy,
                    activeTab: this.activeTab,
                    testLengths: this.testLengths,
                    loggedIn: t.get("loggedIn")
                }
            },
            renderContent: function() {
                this.testLengths.forEach(function(e) {
                    this.views["content" + e].sortBy = this.sortBy,
                        this.views["content" + e].render()
                }
                    .bind(this))
            },
            handleReset: function() {
                this.testLengths.forEach(function(e) {
                    this.views["content" + e].hasLoaded = !0
                }
                    .bind(this)),
                    this.renderContent()
            },
            sort: function(e) {
                return this.$(".js-sort").removeClass("is-active"),
                    this.sortBy = $(e.currentTarget).addClass("is-active").data("id"),
                    this.renderContent(),
                    !1
            },
            changeTab: function(e) {
                var t = $(e.currentTarget)
                    , s = t.is("select") ? t.val() : t.data("id")
                    , i = this.$("select.js-tab");
                this.$("div.js-tab[data-id=" + s + "]");
                this.$(".js-panel[data-id=" + this.activeTab + "], .js-tab[data-id=" + this.activeTab + "]").removeClass("is-active"),
                    this.activeTab = s,
                    this.$(".js-panel[data-id=" + this.activeTab + "], .js-tab[data-id=" + this.activeTab + "]").addClass("is-active"),
                    i.val(this.activeTab)
            }
        })
    }),
    define("tests/index", ["require", "registry", "shared/scoring", "tests/views/main", "global/views/layout"], function(e) {
        "use strict";
        var t = e("registry")
            , s = (e("shared/scoring"),
                e("tests/views/main"))
            , i = e("global/views/layout");
        return Backbone.View.extend({
            layout: i,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.user = t.get("student"),
                    this.tests = t.get("userTests"),
                    t.get("loggedIn") || this.tests.reset(),
                    this.views.main = new s({
                        hasLoaded: !t.get("loggedIn") || 0 < this.tests.length,
                        user: this.user,
                        tests: this.tests
                    }),
                    this.addChild(this.el, this.views.main, !0),
                    this.render(),
                    t.get("loggedIn") && 0 === this.tests.length && this.tests.fetch({
                        reset: !0
                    })
            }
        })
    }),
    define("games/models/game", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "game_id",
            defaults: {
                name: "",
                display_order: 0,
                folder: ""
            }
        })
    }),
    define("games/collections/games", ["require", "games/models/game"], function(e) {
        "use strict";
        var t = e("games/models/game");
        return Backbone.Collection.extend({
            model: t,
            comparator: "display_order"
        })
    }),
    define("games/views/list", ["require", "registry", "games/collections/games", "global/views/ad"], function(e) {
        "use strict";
        var i = e("registry")
            , n = e("games/collections/games")
            , r = e("global/views/ad");
        return Backbone.View.extend({
            templatePath: ["games", "list"],
            events: {
                "click .js-game": "goToGame"
            },
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments);
                var t = i.get("student")
                    , e = _.filter(FTWGLOBALS("games"), function(e) {
                        return t.hasGame(e.game_id)
                    });
                if ($.isIE11() && (e = _.map(e, function(e) {
                    return "ztype" !== e.folder && "tommyq" !== e.folder && "keyboard-jump" !== e.folder || (e.display_order = 999,
                        e.failBrowser = !0),
                        e
                })),
                    this.games = new n(e),
                    r.canShowAds()) {
                    r.initAds("games_list");
                    var s = r.getAds();
                    _.each(s, function(e, t) {
                        e && this.addChild(".js-" + t + "-ad", e)
                    }
                        .bind(this)),
                        r.renderAmazonAds(s)
                }
            },
            serialize: function() {
                return {
                    showNitroType: i.get("student").hasGame("nitrotype"),
                    ads: r.canShowAds(),
                    games: this.games.toJSON()
                }
            },
            goToGame: function(e) {
                var t = parseInt($(e.currentTarget).data("id"))
                    , s = this.games.get(t);
                return !s.get("failBrowser") || (alert("games.browser_out_of_date".t({
                    game: s.get("name")
                })),
                    !1)
            }
        })
    }),
    define("games/index", ["require", "registry", "games/views/list", "global/views/layout"], function(e) {
        "use strict";
        e("registry");
        var t = e("games/views/list")
            , s = e("global/views/layout");
        return Backbone.View.extend({
            layout: s,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.views.mainView = new t,
                    this.addChild(this.el, this.views.mainView, !0),
                    this.render()
            }
        })
    }),
    define("global/models/user_game", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            initialize: function() { },
            urlRoot: "/apiv1/student/games",
            defaults: {
                game_id: 0,
                score: 0,
                seconds: 0,
                created_at: 0
            },
            saveScore: function() {
                var e = rot47(JSON.stringify(this.toJSON()));
                return $.post(this.urlRoot, {
                    data: e
                })
            }
        })
    }),
    define("global/collections/user_games", ["require", "global/models/user_game"], function(e) {
        "use strict";
        var t = e("global/models/user_game");
        return Backbone.Collection.extend({
            model: t,
            url: "/apiv1/student/games",
            comparator: function(e) {
                return -e.get("created_at")
            },
            getScores: function(e) {
                return $.get(this.url + "/" + e)
            },
            getLevels: function(t) {
                return _.uniq(_.pluck(this.toJSON().filter(function(e) {
                    return e.game_id === t
                }), "level"))
            },
            getDifficulties: function(t) {
                return _.uniq(_.pluck(this.toJSON().filter(function(e) {
                    return e.game_id === t
                }), "difficulty"))
            }
        })
    }),
    define("games/views/scoreboard", ["require", "registry", "global/models/user_game", "global/collections/user_games"], function(e) {
        "use strict";
        var s = e("registry")
            , i = e("global/models/user_game");
        e("global/collections/user_games");
        return Backbone.View.extend({
            templatePath: ["games", "scoreboard"],
            events: {
                "click .js-filter-difficulty,.js-filter-level": "filter"
            },
            hasLoaded: !0,
            selectedDifficulties: [],
            selectedLevels: [],
            initialize: function() {
                window.submitGameScoreboard = this.gameOver.bind(this),
                    this.scores = s.get("userGames"),
                    this.listenTo(this.scores, "add", this.render),
                    s.get("loggedIn") && FTWGLOBALS("game").scoreboard && 0 === this.scores.where({
                        game_id: FTWGLOBALS("game").game_id
                    }).length ? (this.hasLoaded = !1,
                        this.scores.getScores(FTWGLOBALS("game").game_id).done(this.update.bind(this))) : this.hasLoaded = !0
            },
            serialize: function() {
                return {
                    selectedDifficulties: this.selectedDifficulties,
                    selectedLevels: this.selectedLevels,
                    levels: this.scores.getLevels(FTWGLOBALS("game").game_id),
                    difficulties: this.scores.getDifficulties(FTWGLOBALS("game").game_id),
                    activeTab: this.activeTab,
                    hasLoaded: this.hasLoaded,
                    loggedIn: s.get("loggedIn"),
                    scores: _.where(this.scores.toJSON(), {
                        game_id: FTWGLOBALS("game").game_id
                    })
                }
            },
            filter: function(e) {
                this.selectedDifficulties = this.$(".js-filter-difficulty:checked").map(function() {
                    return $(this).val()
                }).get(),
                    this.selectedLevels = this.$(".js-filter-level:checked").map(function() {
                        return $(this).val()
                    }).get(),
                    this.render()
            },
            update: function(e) {
                this.hasLoaded = !0,
                    this.scores.add(e, {
                        merge: !0
                    })
            },
            gameOver: function(e) {
                if (s.get("loggedIn") && !(e.seconds <= 0)) {
                    e.game_id = FTWGLOBALS("game").game_id,
                        e.created_at = Date.getUnixTime();
                    var t = new i(e);
                    t.saveScore().done(function() {
                        this.scores.add(t)
                    }
                        .bind(this))
                }
            }
        })
    }),
    define("games/views/play", ["require", "registry", "global/views/ad", "games/views/scoreboard"], function(e) {
        "use strict";
        var i = e("registry")
            , t = e("global/views/ad")
            , s = e("games/views/scoreboard");
        return Backbone.View.extend({
            templatePath: ["games", "play"],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    t.canShowAds() && (t.initAds("game_play"),
                        _.each(t.getAds(), function(e, t) {
                            e && this.addChild(".js-" + t + "-ad", e)
                        }
                            .bind(this))),
                    FTWGLOBALS("game").scoreboard && (this.views.scoreboardView = new s,
                        this.addChild(".js-scoreboard", this.views.scoreboardView, !1))
            },
            serialize: function() {
                var e = FTWGLOBALS("game");
                return "flash" === e.type && e.html.match(/"\/game_files/) && (e.html = e.html.replace(/"\/game_files/g, '"/dist/student/extras/game_files'),
                    e.html = e.html.replace(/=\/game_files/g, "=/dist/student/extras/game_files")),
                {
                    ads: t.canShowAds(),
                    game: FTWGLOBALS("game")
                }
            },
            render: function() {
                return Backbone.View.prototype.render.apply(this, arguments),
                    setTimeout(function() {
                        if ("javascript" === FTWGLOBALS("game").type) {
                            var e = FTWGLOBALS("game")
                                , t = FTWGLOBALS(e.folder)
                                , s = i.get("student");
                            t.inited || ("tommyq" === e.folder || "keyboard-jump" === e.folder ? t({
                                loader: {
                                    baseURL: "/dist/student/extras/game_files/"
                                },
                                parent: "js-game"
                            }, {
                                gameType: "game",
                                avatar: s.getSkinName(s.get("skin_id"))
                            }) : "ztype" === e.folder ? new t(e.width, e.height, "/dist/student/extras/game_files/ztype/", $(".js-game")[0]) : new t(e.width, e.height, "/dist/student/extras/game_files/", $(".js-game")[0]),
                                t.inited = !0)
                        }
                    }, 0),
                    document.addEventListener("keypress", function(e) {
                        32 === e.which && e.preventDefault()
                    }
                        .bind(this), !1),
                    this
            }
        })
    }),
    define("games/views/layout", ["require", "global/views/layout_basic", "registry", "global/views/ad"], function(e) {
        "use strict";
        var t = e("global/views/layout_basic")
            , s = (e("registry"),
                e("global/views/ad"));
        return t.extend({
            templatePath: ["games", "layout"],
            serialize: function() {
                return {
                    ads: s.canShowAds()
                }
            }
        })
    }),
    define("games/play", ["require", "registry", "games/views/play", "games/views/layout"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("games/views/play")
            , i = e("games/views/layout");
        return Backbone.View.extend({
            layout: i,
            initialize: function() {
                if (t.get("student").hasGame(FTWGLOBALS("game").game_id)) {
                    var e = FTWGLOBALS("game");
                    if ($.isIE11() && ("ztype" === e.folder || "tommyq" === e.folder || "keyboard-jump" === e.folder))
                        return alert("games.browser_out_of_date".t({
                            game: e.name
                        })),
                            void (location.href = __url("/student/games"));
                    Backbone.View.prototype.initialize.apply(this, arguments),
                        this.user = t.get("student"),
                        this.views.mainView = new s,
                        this.addChild(this.el, this.views.mainView, !0),
                        this.render()
                } else
                    location.href = __url("/student/lessons")
            }
        })
    }),
    define("achievements/views/panel", ["require", "registry", "global/views/svg"], function(e) {
        "use strict";
        var s = e("registry");
        e("global/views/svg");
        return Backbone.View.extend({
            templatePath: ["achievements", "panel"],
            activeTab: "summary",
            className: "dashboard-listInner",
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.achievements.forEach(function(e) {
                        var t = e.getBadgeView();
                        this.addChild(".js-ach-image-" + e.id, t, !1)
                    }
                        .bind(this)),
                    this.achievements.getRecentlyCompleted(2).forEach(function(e) {
                        var t = e.getBadgeView();
                        this.addChild(".js-ach-recent-" + e.id, t, !1)
                    }
                        .bind(this)),
                    this.parent.getLessons().forEach(function(e) {
                        var t = this.userBadges.getBadgeForId(e.lesson_id);
                        this.addChild(".js-badge-image-" + e.lesson_id, t, !1)
                    }
                        .bind(this))
            },
            serialize: function() {
                var e = this.achievementGroups.getCounts(this.achievements)
                    , t = (s.get("student"),
                        this.parent.getSkins());
                return {
                    totalEarned: this.parent.getTotalEarned(),
                    totalAchievements: this.parent.getTotalAchievements(),
                    recent: this.achievements.getRecentlyCompleted(2),
                    activeTab: this.activeTab,
                    achievements: this.achievements,
                    groups: e,
                    lessons: this.parent.getLessons(),
                    units: this.parent.getUnits(),
                    badges: this.userBadges,
                    skins: t.toJSON(),
                    ranksEarned: this.parent.getRanksEarned(),
                    totalRanks: t.getTotalRanks(),
                    totalRanksPerSkin: t.at(0).getTotalRanks()
                }
            }
        })
    }),
    define("achievements/views/main", ["require", "registry", "achievements/views/panel", "global/views/ad", "global/views/svg"], function(e) {
        "use strict";
        e("registry");
        var t = e("achievements/views/panel")
            , s = e("global/views/ad");
        e("global/views/svg");
        return Backbone.View.extend({
            templatePath: ["achievements", "main"],
            events: {
                "click div.js-tab": "switchTab",
                "change select.js-tab": "switchTab",
                "keydown .js-tab": function(e) {
                    13 === e.which && this.$(document.activeElement).hasClass("js-tab") && this.switchTab(e)
                },
                "keydown .js-panel-item .screenReader": "escapePanel"
            },
            activeTab: "summary",
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    s.canShowAds() && (s.initAds("other"),
                        _.each(s.getAds(), function(e, t) {
                            e && this.addChild(".js-" + t + "-ad", e)
                        }
                            .bind(this))),
                    this.views.panel = new t({
                        parent: this,
                        activeTab: this.activeTab,
                        userBadges: this.userBadges,
                        userAchievements: this.userAchievements,
                        achievements: this.achievements,
                        achievementGroups: this.achievementGroups,
                        lessons: this.lessons
                    }),
                    this.addChild(".js-panel-item", this.views.panel)
            },
            serialize: function() {
                var e = this.achievementGroups.getCounts(this.achievements);
                return {
                    ads: s.canShowAds(),
                    activeTab: this.activeTab,
                    groups: e
                }
            },
            switchTab: function(e) {
                var t = $(e.currentTarget)
                    , s = t.is("select") ? t.val() : t.data("id")
                    , i = this.$("select.js-tab");
                this.$("div.js-tab[data-id=" + s + "]");
                this.$(".js-panel[data-id=" + this.activeTab + "], .js-tab[data-id=" + this.activeTab + "]").removeClass("is-active"),
                    this.activeTab = s,
                    this.$(".js-panel[data-id=" + this.activeTab + "], .js-tab[data-id=" + this.activeTab + "]").addClass("is-active"),
                    i.val(this.activeTab),
                    this.views.panel.activeTab = this.activeTab,
                    this.views.panel.render(),
                    "keydown" === e.type && this.$(".tab-panel .screenReader").eq(0).focus()
            },
            getTotalEarned: function() {
                var e = this.achievementGroups.getCounts(this.achievements);
                return _.reduce(e, function(e, t) {
                    return e + t.completed
                }, 0) + this.userBadges.length + this.getRanksEarned()
            },
            getTotalAchievements: function() {
                var e = this.achievementGroups.getCounts(this.achievements);
                return _.reduce(e, function(e, t) {
                    return e + t.total
                }, 0) + this.getLessons().length + this.skins.getTotalRanks()
            },
            getRanksEarned: function() {
                var s = this.userActivity.getOrAdd(0);
                return this.skins.reduce(function(e, t) {
                    return s && 0 < s.get("typed") ? e + t.getRank(s.get("typed") - s.get("errors")).id : e
                }
                    .bind(this), 0)
            },
            getUnits: function() {
                return FTWGLOBALS("units").filter(function(e) {
                    return !("test" === e.type || "custom_test" === e.type || "custom" === e.type || "instruction" === e.type || !e.badge || 0 === _.where(FTWGLOBALS("lessons"), {
                        unit_id: e.unit_id
                    }).length)
                })
            },
            getLessons: function() {
                var e = FTWGLOBALS("lessons")
                    , t = this.getUnits();
                return e.filter(function(e) {
                    return _.find(t, {
                        unit_id: e.unit_id
                    }) && "lesson" === e.type
                }
                    .bind(this))
            },
            getSkins: function() {
                var n = this.userActivity.getOrAdd(0);
                return this.skins.forEach(function(e) {
                    if (n && 0 < n.get("typed") || (this.user.get("skin_id") || 1) === e.id) {
                        var t = n ? n.toJSON() : {
                            typed: 0,
                            errors: 0
                        }
                            , s = e.getRank(t.typed - t.errors)
                            , i = e.getNextRank(t.typed - t.errors);
                        e.set({
                            rank: s,
                            nextRank: i,
                            typed: t.typed - t.errors
                        })
                    }
                }
                    .bind(this)),
                    this.skins
            },
            escapePanel: function(e) {
                27 === e.which && this.$(".js-tab.is-active").focus()
            }
        })
    }),
    define("achievements/index", ["require", "registry", "achievements/views/main", "global/collections/skins", "global/views/layout"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("achievements/views/main")
            , i = e("global/collections/skins")
            , n = e("global/views/layout");
        return Backbone.View.extend({
            layout: n,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.userBadges = t.get("userBadges"),
                    this.userAchievements = t.get("userAchievements"),
                    this.achievements = t.get("achievements"),
                    this.achievementGroups = t.get("achievementGroups"),
                    this.lessons = t.get("lessons"),
                    this.user = t.get("student"),
                    this.userActivity = t.get("userActivity"),
                    this.skins = new i(FTWGLOBALS("skins")),
                    this.achievements.setCompleted(this.userAchievements);
                var e = "summary";
                this.openGroup && ("badges" === this.openGroup || this.achievementGroups.get(parseInt(this.openGroup))) && (e = this.openGroup),
                    this.views.mainView = new s({
                        activeTab: e,
                        userBadges: this.userBadges,
                        userAchievements: this.userAchievements,
                        achievements: this.achievements,
                        achievementGroups: this.achievementGroups,
                        units: this.units,
                        lessons: this.lessons,
                        user: this.user,
                        userActivity: this.userActivity,
                        skins: this.skins
                    }),
                    this.addChild(this.el, this.views.mainView, !0),
                    this.render()
            }
        })
    }),
    define("scoreboard/views/panel", ["require", "registry"], function(e) {
        "use strict";
        var t = e("registry");
        return Backbone.View.extend({
            templatePath: ["scoreboard", "panel"],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.listenTo(this.scoreboard, "sort", this.render)
            },
            serialize: function() {
                t.get("student");
                return {
                    type: this.scoreboard.comparatorKey,
                    data: this.scoreboard.toJSON()
                }
            }
        })
    }),
    define("scoreboard/views/main", ["require", "registry", "global/views/ad", "scoreboard/views/panel"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("global/views/ad")
            , i = e("scoreboard/views/panel");
        return Backbone.View.extend({
            templatePath: ["scoreboard", "main"],
            events: {
                "click .js-tab": "changeType"
            },
            activeTab: "speed",
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    s.canShowAds() && (s.initAds("other"),
                        _.each(s.getAds(), function(e, t) {
                            e && this.addChild(".js-" + t + "-ad", e)
                        }
                            .bind(this))),
                    this.views.panel = new i({
                        scoreboard: this.scoreboard
                    }),
                    this.addChild(".js-panel-item", this.views.panel)
            },
            serialize: function() {
                t.get("student");
                return {
                    ads: s.canShowAds(),
                    activeTab: this.activeTab,
                    type: this.scoreboard.comparatorKey
                }
            },
            changeType: function(e) {
                var t = $(e.currentTarget)
                    , s = t.data("id");
                return this.activeTab = s,
                    this.scoreboard.comparatorKey = s,
                    this.scoreboard.sort(),
                    this.$(".js-tab.is-active").removeClass("is-active"),
                    t.addClass("is-active"),
                    !1
            }
        })
    }),
    define("scoreboard/collections/scoreboard", ["require", "shared/scoring"], function(e) {
        "use strict";
        var t = e("shared/scoring");
        return Backbone.Collection.extend({
            model: Backbone.Model.extend({
                idAttribute: "user_id"
            }),
            url: "/apiv1/student/scoreboard",
            parse: function(e) {
                return _.isArray(e) && e.forEach(function(e) {
                    e.speed = t.speed(e.typed, e.seconds, e.errors),
                        e.accuracy = t.accuracy(e.typed, e.errors),
                        e.active = e.seconds
                }),
                    Backbone.Collection.prototype.parse.call(this, e)
            },
            comparatorKey: "speed",
            comparator: function(e) {
                return -e.get(this.comparatorKey)
            }
        })
    }),
    define("scoreboard/index", ["require", "registry", "global/views/layout", "scoreboard/views/main", "scoreboard/collections/scoreboard"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("global/views/layout")
            , i = e("scoreboard/views/main")
            , n = e("scoreboard/collections/scoreboard");
        return Backbone.View.extend({
            layout: s,
            initialize: function() {
                if (Backbone.View.prototype.initialize.apply(this, arguments),
                    t.get("student").hasOption("scoreboard")) {
                    var e = new n;
                    e.fetch({
                        reset: !0
                    }),
                        this.listenTo(e, "reset", function() {
                            this.render()
                        }
                            .bind(this)),
                        this.views.mainView = new i({
                            scoreboard: e
                        }),
                        this.addChild(this.el, this.views.mainView, !0)
                } else
                    location.href = __url("/student/lessons")
            }
        })
    }),
    define("progress/views/dashboard", ["require", "shared/scoring", "registry", "global/collections/lessons"], function(e) {
        "use strict";
        var s = e("shared/scoring")
            , i = e("registry")
            , t = e("global/collections/lessons");
        return Backbone.View.extend({
            daysBack: 0,
            events: {
                "click #dashboard-filter a": "changeTime"
            },
            templatePath: ["progress", "dashboard"],
            initialize: function(e) {
                this.options = e,
                    this.userBadges = i.get("userBadges"),
                    this.user = i.get("student"),
                    this.userLettersTyped = i.get("userLettersTyped"),
                    this.userActivity = i.get("userActivity"),
                    this.lessons = new t(FTWGLOBALS("lessons"))
            },
            serialize: function() {
                var e = this.userActivity.getCompiled(this.daysBack)
                    , t = (i.get("units"),
                        this.userLettersTyped.topProblemKeys(3).map(function(e) {
                            return e.id.toUpperCase()
                        }).join(""));
                return "FUK" == t && (t = "UKF"),
                {
                    daysBack: this.daysBack,
                    user: this.user.toJSON(),
                    stars: e.stars,
                    seconds: e.seconds,
                    speed: s.speed(e.typed, e.seconds, e.errors),
                    accuracy: s.accuracy(e.typed, e.errors),
                    time: e.seconds.writtenSeconds().ucWords(),
                    keys: t,
                    loggedIn: i.get("loggedIn")
                }
            },
            changeTime: function(e) {
                this.daysBack = $(e.currentTarget).data("id");
                var t = this.userActivity.getCompiled(this.daysBack);
                return this.$("#dashboard-speed").countdown(s.speed(t.typed, t.seconds, t.errors), null, 400).parent().velocity("fadeIn"),
                    this.$("#dashboard-accuracy").countdown(0 < t.typed ? s.accuracy(t.typed, t.errors) : 0, null, 400).parent().velocity("fadeIn"),
                    this.$("#dashboard-stars").countdown(t.stars, null, 400).parent().velocity("fadeIn"),
                    this.$("#dashboard-time").html(t.seconds.writtenSeconds().ucWords()).velocity("fadeIn"),
                    this.$("#dashboard-filter a").removeClass("is-active"),
                    this.$("#dashboard-filter a[data-id=" + this.daysBack + "]").addClass("is-active"),
                    !1
            }
        })
    }),
    define("progress/views/main", ["require", "registry", "global/views/ad", "shared/scoring"], function(e) {
        "use strict";
        var i = e("registry")
            , n = e("global/views/ad")
            , r = e("shared/scoring");
        return Backbone.View.extend({
            templatePath: ["progress", "main"],
            serialize: function() {
                i.get("userLessons");
                var e = i.get("student")
                    , t = i.get("lessons")
                    , s = i.get("units");
                return {
                    ads: n.canShowAds(),
                    scoring: r,
                    grading: e.getSetting("grading"),
                    units: s.toJSON(),
                    lessons: t.toJSON(),
                    user: e.toJSON()
                }
            }
        })
    }),
    define("progress/index", ["require", "registry", "progress/views/dashboard", "progress/views/main", "global/views/layout"], function(e) {
        "use strict";
        var s = e("registry")
            , i = e("progress/views/dashboard")
            , n = e("progress/views/main")
            , t = e("global/views/layout");
        return Backbone.View.extend({
            layout: t,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.user = s.get("student"),
                    this.userLessons = s.get("userLessons"),
                    this.userLessons.set(s.get("userTests").getCompiled(), {
                        remove: !1
                    }),
                    s.get("units").reset(_.where(FTWGLOBALS("units"), {
                        product_id: this.user.getSetting("product_id")
                    }));
                var t = s.get("units").pluck("unit_id");
                s.get("lessons").reset(_.filter(FTWGLOBALS("lessons"), function(e) {
                    return -1 != _.indexOf(t, e.unit_id)
                })),
                    s.get("lessons").add(s.get("customLessons").toJSON()),
                    s.get("lessons").setProgress(this.userLessons),
                    s.get("units").setProgress(s.get("lessons")),
                    this.views.dashboard = new i,
                    this.views.main = new n,
                    this.addChild(this.el, this.views.dashboard, !0),
                    this.addChild(this.el, this.views.main, !0),
                    this.render()
            }
        })
    }),
    define("account/views/password", ["require", "registry"], function(e) {
        "use strict";
        var t = e("registry");
        return Backbone.View.extend({
            templatePath: ["account", "password"],
            formSelector: "form",
            initialize: function(e) {
                this.successNotice = "account.password_updated".t()
            },
            submitCallback: function() {
                Backbone.View.prototype.submitCallback.apply(this, arguments),
                    t.get("student").unset("must_change_password")
            }
        })
    }),
    define("account/views/profile", ["require", "registry"], function(e) {
        "use strict";
        var t = e("registry");
        return Backbone.View.extend({
            templatePath: ["account", "profile"],
            formSelector: "form",
            initialize: function(e) {
                this.successNotice = "account.profile_updated".t()
            },
            serialize: function() {
                return {
                    user: t.get("student").toJSON()
                }
            },
            submitCallback: function(e) {
                t.get("student").set(e),
                    Backbone.View.prototype.submitCallback.apply(this, arguments)
            }
        })
    }),
    define("account/views/join_code", ["require", "registry"], function(e) {
        "use strict";
        var s = e("registry");
        return Backbone.View.extend({
            templatePath: ["account", "join_code"],
            formSelector: "form",
            keyboardId: 0,
            initialize: function(e) {
                this.user = s.get("student"),
                    this.successNotice = "account.self_join_pending_success".t()
            },
            serialize: function() {
                return {
                    user: s.get("student").toJSON()
                }
            },
            submitCallback: function(e) {
                var t = s.get("student");
                e && e.section && e.section.product_id !== t.getSetting("product_id") && t.setSettings({
                    product_id: e.settings.product_id
                }),
                    t.set(e),
                    $(".js-joincode").velocity("slideUp", function() {
                        $(".js-joincode").parent().remove()
                    }),
                    Backbone.View.prototype.submitCallback.apply(this, arguments)
            }
        })
    }),
    define("account/models/profile_form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            defaults: {},
            validationRules: {
                first_name: {
                    required: !0
                },
                last_name: {
                    required: !0
                },
                email: {
                    email: !0
                }
            },
            validationMessages: {},
            url: "/apiv1/student/user/profile"
        })
    }),
    define("account/models/password_form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            defaults: {},
            validationRules: {
                oldPassword: {
                    required: !0
                },
                password: {
                    required: !0
                },
                password2: {
                    required: !0,
                    equalTo: "input[name=password]"
                }
            },
            url: "/apiv1/student/user/password"
        })
    }),
    define("account/models/joincode_form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            defaults: {},
            validationRules: {
                join_code: {
                    required: !0
                }
            },
            validationMessages: {
                join_code: {
                    INVALID: "shared.invalid_code".t()
                }
            },
            url: "/apiv1/student/user/join"
        })
    }),
    define("account/views/main", ["require", "registry", "account/views/password", "account/views/profile", "account/views/join_code", "account/models/profile_form", "account/models/password_form", "account/models/joincode_form", "global/views/ad"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("account/views/password")
            , i = e("account/views/profile")
            , n = e("account/views/join_code")
            , r = e("account/models/profile_form")
            , o = e("account/models/password_form")
            , a = e("account/models/joincode_form")
            , l = e("global/views/ad");
        return Backbone.View.extend({
            templatePath: ["account", "main"],
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    l.canShowAds() && (l.initAds("other"),
                        _.each(l.getAds(), function(e, t) {
                            e && this.addChild(".js-" + t + "-ad", e)
                        }
                            .bind(this))),
                    this.user = t.get("student"),
                    this.user.get("in_class") && this.user.hasOption("lockaccount") || (this.views.profile = new i({
                        model: new r
                    }),
                        this.addChild(".js-profile", this.views.profile, !1)),
                    this.user.get("in_class") && !this.user.hasOption("changepassword") || (this.views.password = new s({
                        model: new o
                    }),
                        this.addChild(".js-password", this.views.password, !1)),
                    "typing" === FTWGLOBALS("site") && "clever" !== this.user.get("login_type") && "classlink" !== this.user.get("login_type") && (this.views.joincode = new n({
                        model: new a
                    }),
                        this.addChild(".js-joincode", this.views.joincode, !1))
            },
            serialize: function() {
                return {
                    ads: l.canShowAds(),
                    user: this.user.toJSON(),
                    lockAccount: this.user.hasOption("lockaccount"),
                    changePassword: this.user.hasOption("changepassword")
                }
            }
        })
    }),
    define("account/index", ["require", "registry", "account/views/main", "global/views/layout"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("account/views/main")
            , i = e("global/views/layout");
        return Backbone.View.extend({
            layout: i,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.user = t.get("student"),
                    "edutyping" != FTWGLOBALS("site") || !this.user.hasOption("lockaccount") || this.user.hasOption("changepassword") ? (this.views.mainView = new s,
                        this.addChild(this.el, this.views.mainView, !0),
                        this.render()) : location.href = __url("/student/lessons")
            }
        })
    }),
    define("upgrade/views/main", ["require", "registry"], function(e) {
        "use strict";
        var t = e("registry");
        return Backbone.View.extend({
            templatePath: ["upgrade", "main"],
            serialize: function() {
                return {
                    user: t.get("student").toJSON(),
                    price: FTWGLOBALS("pricing").price
                }
            }
        })
    }),
    define("upgrade/views/complete", ["require", "registry"], function(e) {
        "use strict";
        e("registry");
        return Backbone.View.extend({
            templatePath: ["upgrade", "complete"],
            serialize: function() {
                return {
                    price: FTWGLOBALS("pricing").price
                }
            }
        })
    }),
    define("upgrade/models/upgrade", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            url: "/apiv1/student/upgrade"
        })
    }),
    define("upgrade/index", ["require", "registry", "global/views/layout", "upgrade/views/main", "upgrade/views/complete", "shared/analytics", "upgrade/models/upgrade", "shared/alert"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("global/views/layout")
            , i = e("upgrade/views/main")
            , n = e("upgrade/views/complete")
            , r = e("shared/analytics")
            , o = e("upgrade/models/upgrade")
            , a = e("shared/alert");
        return Backbone.View.extend({
            events: {
                "click .js-submit": "upgrade"
            },
            layout: s,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.user = t.get("student"),
                    this.model = new o,
                    "object" == typeof StripeCheckout ? (this.stripeHandler = StripeCheckout.configure({
                        key: FTWGLOBALS("stripeKey"),
                        image: "/dist/shared/images/stripe_" + FTWGLOBALS("site") + ".jpg",
                        token: this.confirmOrder.bind(this),
                        bitcoin: !0
                    }),
                        $(window).on("popstate", this.stripeHandler.close.bind(this.stripeHandler)),
                        this.views.main = new i,
                        this.views.complete = new n,
                        this.views.complete.$el.fastHide(),
                        this.addChild(this.el, this.views.main, !0),
                        this.addChild(this.el, this.views.complete, !0),
                        this.render()) : new a({
                            title: "upgrade.uh_oh_alert_title".t(),
                            text: "upgrade.uh_oh_alert_text".t()
                        })
            },
            renderWaiting: function(e) {
                this.$(".js-submit").addClass("btn--loading")
            },
            renderComplete: function() {
                this.views.main.$el.fastHide(),
                    this.views.complete.render(),
                    this.views.complete.$el.fastShow()
            },
            upgrade: function(e) {
                return !$(e.currentTarget).hasClass("btn--loading") && (t.get("loggedIn") ? "premium" !== this.user.get("membership") ? (this.stripeHandler.open({
                    name: FTWGLOBALS("name"),
                    description: "upgrade.upgrade_account_description".t({
                        name: this.user.get("username")
                    }),
                    amount: Math.round(100 * FTWGLOBALS("pricing").price),
                    zipCode: !0,
                    email: this.user.get("email") || null,
                    allowRememberMe: !0
                }),
                    !1) : void new a({
                        title: "upgrade.hey_wait_title".t(),
                        text: "upgrade.hey_wait_text".t()
                    }) : (new a({
                        title: "upgrade.uh_oh_must_login_title".t(),
                        text: "upgrade.uh_oh_must_login_text".t()
                    }),
                        !1))
            },
            confirmOrder: function(e) {
                this.renderWaiting(),
                    this.model.save(e).done(function(e) {
                        e.total = e.price,
                            e.store = FTWGLOBALS("site");
                        var t = [{
                            product: FTWGLOBALS("pricing").name,
                            price: e.total,
                            quantity: 1,
                            category: "Student"
                        }];
                        this.user.set({
                            membership: "premium"
                        }),
                            this.renderComplete(e),
                            r.trackSale(e, t)
                    }
                        .bind(this)).fail(function(e) {
                            this.render(),
                                e.responseJSON ? e.responseJSON.declined ? new a({
                                    title: "upgrade.credit_card_alert_title".t({
                                        error: e.responseJSON.declined
                                    }),
                                    text: "upgrade.credit_card_alert_text".t()
                                }) : new a({
                                    title: "upgrade.error_occurred_title".t({
                                        error: e.responseJSON.error
                                    }),
                                    text: "upgrade.error_occurred_text".t()
                                }) : new a({
                                    title: "upgrade.unknown_error_occurred_title".t(),
                                    text: "upgrade.unknown_error_occurred_title".t()
                                })
                        }
                            .bind(this))
            }
        })
    }),
    define("global/models/signup", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            url: "/apiv1/student/auth/signup",
            defaults: {
                username: "",
                password: "",
                password2: "",
                email: "",
                language: ""
            },
            validationRules: {
                username: {
                    minlength: 4,
                    maxlength: 30,
                    username: !0,
                    required: !0,
                    remote: {
                        url: "/apiv1/student/auth/username",
                        type: "post",
                        data: {}
                    }
                },
                email: {
                    email: !0
                },
                password: {
                    required: !0,
                    minlength: 4,
                    notMatchUsername: !0
                },
                password2: {
                    required: !0,
                    minlength: 4,
                    equalTo: "#reg-form input[name=password]"
                },
                tos: {
                    required: !0
                }
            },
            validationMessages: {
                username: {
                    remote: "shared.username_exists".t(),
                    minlength: "shared.username_invalid_length".t(),
                    maxlength: "shared.username_invalid_length".t()
                },
                email: {
                    email: "shared.invalid_email_optional".t(),
                    remote: "auth.email_exists".t()
                },
                password: {
                    notMatchUsername: "shared.password_can_not_match_username".t(),
                    minlength: "shared.password_invalid_length".t()
                },
                password2: {
                    equalTo: "shared.passwords_do_not_match".t()
                }
            }
        })
    }),
    define("signup/views/main", ["require", "global/models/signup"], function(e) {
        "use strict";
        var t = e("global/models/signup");
        return Backbone.View.extend({
            section: {},
            formSelector: "#reg-form",
            modelClass: t,
            events: {
                "click .js-clever-login": function() {
                    return this.trigger("cleverLogin"),
                        !1
                },
                "click .js-google-login": function() {
                    return this.trigger("googleLogin"),
                        !1
                },
                "click .js-classlink-login": function() {
                    return this.trigger("classlinkLogin"),
                        !1
                }
            },
            templatePath: ["signup", "main"],
            submitCallback: function(e) {
                this.trigger("login", e)
            },
            serialize: function() {
                return {
                    section: this.section,
                    joinCode: this.joinCode
                }
            }
        })
    }),
    define("signup/index", ["require", "registry", "shared/analytics", "signup/views/main", "join/views/loading", "join/views/failed", "global/views/layout_basic"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("shared/analytics")
            , i = e("signup/views/main")
            , n = e("join/views/loading")
            , r = e("join/views/failed")
            , o = e("global/views/layout_basic");
        return Backbone.View.extend({
            layout: o,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.views.main = new i({
                        code: this.code
                    }),
                    this.listenTo(this.views.main, "login", this.login),
                    this.listenTo(this.views.main, "cleverLogin", this.cleverLogin),
                    this.listenTo(this.views.main, "googleLogin", this.googleLogin),
                    this.listenTo(this.views.main, "classlinkLogin", this.classlinkLogin),
                    this.joinCode && (this.views.loading = new n,
                        this.views.failed = new r,
                        this.views.failed.$el.fastHide(),
                        this.views.main.$el.fastHide(),
                        this.views.main.joinCode = this.joinCode,
                        $.post("/apiv1/student/auth/join-validate", {
                            join_code: this.joinCode
                        }).done(this.showForm.bind(this)).fail(this.showFailed.bind(this)),
                        this.addChild(this.el, this.views.loading, !0),
                        this.addChild(this.el, this.views.failed, !0)),
                    this.addChild(this.el, this.views.main, !0),
                    this.render(),
                    this.$("#reg-form input[name=username]").focus()
            },
            showForm: function(e) {
                e.language && "en" !== e.language && e.language !== FTWGLOBALS("language") ? location.href = "/" + e.language + location.pathname + location.hash : ("edutyping" === FTWGLOBALS("site") && (this.views.main.model.validationRules.username.remote.data.district_id = e.district_id),
                    this.views.main.section = e,
                    this.views.loading.$el.fastHide(),
                    this.views.main.render().$el.fastShow(),
                    this.$("#reg-form input[name=username]").focus())
            },
            showFailed: function() {
                this.views.loading.$el.fastHide(),
                    this.views.failed.$el.fastShow()
            },
            login: function(e) {
                s.trackPage("/student/signup/success"),
                    t.get("student").loginWithData(e),
                    location.href = __url("/student/start")
            },
            cleverLogin: function() {
                var e = _.random(1e4, 99999);
                return $.cookie("state", e, {
                    path: "/"
                }),
                    $.cookie("lang", FTWGLOBALS("language"), {
                        path: "/",
                        expires: 30
                    }),
                    location.href = "https://clever.com/oauth/authorize?client_id=" + FTWGLOBALS("cleverClientId") + "&redirect_uri=" + encodeURIComponent(FTWGLOBALS("cleverRedirectUri")) + "&response_type=code&state=" + e,
                    !1
            },
            googleLogin: function() {
                return $.cookie("sso", "student", {
                    path: "/"
                }),
                    $.cookie("join_code", this.joinCode || "", {
                        path: "/"
                    }),
                    $.cookie("lang", FTWGLOBALS("language"), {
                        path: "/",
                        expires: 30
                    }),
                    location.href = FTWGLOBALS("googleSsoUri"),
                    !1
            },
            classlinkLogin: function() {
                var e = _.random(1e4, 99999);
                return $.cookie("state", e, {
                    path: "/"
                }),
                    $.cookie("lang", FTWGLOBALS("language"), {
                        path: "/",
                        expires: 30
                    }),
                    location.href = "https://launchpad.classlink.com/oauth2/v2/auth?scope=profile&client_id=" + FTWGLOBALS("classlinkClientId") + "&redirect_uri=" + encodeURIComponent("https://" + location.hostname + FTWGLOBALS("classlinkRedirectUri")) + "&response_type=code&state=" + e,
                    !1
            }
        })
    }),
    define("notepad/views/main", ["require"], function(e) {
        "use strict";
        return Backbone.View.extend({
            templatePath: ["notepad", "main"],
            events: {
                "keydown .js-line": "processInput"
            },
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.listenTo(this.timer, "change:seconds", this.updateSeconds)
            },
            processInput: function(e) {
                if (this.disableBackspaceEle || (this.disableBackspaceEle = this.$("#bs"),
                    this.secondsEle = this.$(".js-seconds"),
                    this.timer.start()),
                    this.disableBackspaceEle.prop("checked") && (8 === e.which || 46 === e.which))
                    return !1
            },
            updateSeconds: function() {
                this.secondsEle.html(Math.floor(this.timer.get("seconds")).countdownSeconds())
            }
        })
    }),
    define("notepad/index", ["require", "notepad/views/main", "global/models/timer", "global/views/layout"], function(e) {
        "use strict";
        var t = e("notepad/views/main")
            , s = e("global/models/timer")
            , i = e("global/views/layout");
        return Backbone.View.extend({
            layout: i,
            initialize: function() {
                Backbone.View.prototype.initialize.apply(this, arguments),
                    this.timer = new s,
                    this.views.mainView = new t({
                        timer: this.timer
                    }),
                    this.addChild(this.el, this.views.mainView, !0),
                    this.render(),
                    this.$(".js-line").focus()
            }
        })
    }),
    define("router", ["require", "registry", "lessons/index", "login/index", "lessons/index", "password/index", "login/index", "skins/index", "lessons/index", "lesson/typing_lesson", "error/index", "lesson/qa_lesson", "lesson/typing_lesson", "oauth/index", "error/index", "tests/index", "error/index", "lesson/typing_lesson", "games/index", "games/play", "achievements/index", "scoreboard/index", "progress/index", "error/index", "account/index", "upgrade/index", "error/index", "signup/index", "login/index", "signup/index", "error/index", "notepad/index", "error/index", "error/index"], function(i) {
        "use strict";
        var n = i("registry")
            , s = Backbone.Router.extend({
                routes: {
                    "": function() {
                        return "typing" === FTWGLOBALS("site") ? new (i("lessons/index")) : new (i("login/index"))
                    },
                    start: function() {
                        return new (i("lessons/index"))
                    },
                    password: function() {
                        return new (i("password/index"))
                    },
                    login: function() {
                        return new (i("login/index"))
                    },
                    themes: function() {
                        return new (i("skins/index"))
                    },
                    lessons: function() {
                        return new (i("lessons/index"))
                    },
                    "lesson/:id(/:slug)": function(e, t) {
                        if ("problemkeys" === e)
                            return location.hash ? new (i("lesson/typing_lesson"))({
                                problemkeys: !0
                            }) : void (location.href = "/student/lessons");
                        var s = _.findWhere(FTWGLOBALS("lessons"), {
                            lesson_id: parseInt(e)
                        });
                        return s || (s = _.findWhere(n.get("customLessons").toJSON(), {
                            lesson_id: parseInt(e)
                        })) ? t ? "qa" === s.content_type ? new (i("lesson/qa_lesson"))({
                            lessonId: parseInt(e)
                        }) : new (i("lesson/typing_lesson"))({
                            lessonId: parseInt(e)
                        }) : void (location.href = "/student/lessons") : new (i("error/index"))({
                            code: 404
                        })
                    },
                    oauth: function() {
                        return new (i("oauth/index"))
                    },
                    tests: function() {
                        return "edutyping" === FTWGLOBALS("site") ? new (i("error/index"))({
                            code: 404
                        }) : new (i("tests/index"))
                    },
                    "test/:minutes": function(e) {
                        return "edutyping" === FTWGLOBALS("site") ? new (i("error/index"))({
                            code: 404
                        }) : new (i("lesson/typing_lesson"))({
                            lessonId: 385,
                            test: !0,
                            minutes: e
                        })
                    },
                    games: function() {
                        return new (i("games/index"))
                    },
                    "games/play/:slug": function(e) {
                        location.href = __url("/student/game/" + e)
                    },
                    "game/:slug": function(e) {
                        return new (i("games/play"))({
                            slug: e
                        })
                    },
                    achievements: function() {
                        var e = location.hash.replace("#", "");
                        return new (i("achievements/index"))({
                            openGroup: e
                        })
                    },
                    scoreboard: function() {
                        return new (i("scoreboard/index"))
                    },
                    progress: function() {
                        return "edutyping" === FTWGLOBALS("site") ? new (i("progress/index")) : new (i("error/index"))({
                            code: 404
                        })
                    },
                    account: function() {
                        return new (i("account/index"))
                    },
                    verify: function() {
                        var e = location.hash.replace("#", "").split("-");
                        location.href = "/apiv1/student/tests/" + e[0] + "/" + e[1] + "/certificate?language=" + FTWGLOBALS("language")
                    },
                    upgrade: function() {
                        return "typing" === FTWGLOBALS("site") ? new (i("upgrade/index")) : new (i("error/index"))({
                            code: 404
                        })
                    },
                    join: function() {
                        return new (i("signup/index"))({
                            joinCode: location.hash.replace("#", "")
                        })
                    },
                    "join/login": function() {
                        return new (i("login/index"))({
                            joinCode: location.hash.replace("#", "")
                        })
                    },
                    signup: function() {
                        return "typing" === FTWGLOBALS("site") ? new (i("signup/index")) : new (i("error/index"))({
                            code: 404
                        })
                    },
                    notepad: function() {
                        return "edutyping" === FTWGLOBALS("site") ? new (i("notepad/index")) : new (i("error/index"))({
                            code: 404
                        })
                    },
                    "*notFound": function() {
                        return new (i("error/index"))({
                            code: 404
                        })
                    }
                }
            });
        return {
            initialize: function() {
                new s;
                var e = location.pathname.split("/")
                    , t = "student" === e[1] ? "student" : e[1] + "/student";
                Backbone.history.start({
                    pushState: !0,
                    root: t,
                    hashChange: !1
                })
            }
        }
    }),
    define("global/models/user", ["require", "shared/model_backends/localstorage", "registry"], function(e) {
        "use strict";
        var p = e("shared/model_backends/localstorage")
            , m = e("registry");
        return Backbone.Model.extend({
            idAttribute: "user_id",
            defaults: {
                user_id: 0,
                teacher_id: null,
                section_id: null,
                section: {},
                school: {},
                district: {},
                options: null,
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                last_login: 0,
                demo: !1,
                speed: "wpm",
                spaces: 1,
                skin_id: 1,
                scoreboard: 1,
                settings: {
                    product_id: !window.__noLocalStorage && window.localStorage.getItem("product_id") ? window.localStorage.getItem("product_id") : "jr",
                    show_hands: 1,
                    animated_hands: 1,
                    show_keyboard: 1,
                    typing_sounds: 0,
                    error_sounds: 1,
                    individual_org_type: "",
                    dictation: 0
                },
                _mobileKeyboard: ""
            },
            options: null,
            typingForcedOptions: {
                locklessons: !1,
                lockscreens: !1,
                sequential: !1,
                showkeyboard: !0,
                nobackspace: !1,
                realtime: !0,
                hidepause: !0,
                showrestart: !0,
                testcerts: !0
            },
            individualForcedOptions: {
                lockaccount: !1,
                locklessons: !1,
                lockscreens: !1,
                sequential: !1,
                showkeyboard: !0,
                nobackspace: !1,
                realtime: !1,
                hidepause: !0,
                showrestart: !0,
                changepassword: !0,
                allowsounds: !0,
                allowdictation: !0,
                testcerts: !0
            },
            loginWithData: function(e) {
                this.clearLocalStorage(),
                    e.settings = Object.assign({}, this.defaults.settings, e.settings);
                for (var t, s = [], i = 97; i <= 122; i++)
                    t = {
                        id: String.fromCharCode(i),
                        typed: 0,
                        errors: 0
                    },
                        e.letters_typed[String.fromCharCode(i) + "typed"] && (t.typed = e.letters_typed[String.fromCharCode(i) + "typed"]),
                        e.letters_typed[String.fromCharCode(i) + "errors"] && (t.errors = e.letters_typed[String.fromCharCode(i) + "errors"]),
                        s.push(t);
                var n = m.get("userLettersTyped");
                n.reset(s, {
                    silent: !0
                }),
                    n.setBackend(new p("userLettersTyped"), "model"),
                    delete e.letters_typed;
                var r = m.get("customLessons");
                r.reset(e.custom, {
                    silent: !0
                }),
                    r.setBackend(new p("customLessons"), "model"),
                    delete e.custom;
                var o = m.get("userActivity");
                o.reset(window.__makeAssoc(e.activity, e.activity_fields), {
                    silent: !0
                }),
                    o.setBackend(new p("userActivity"), "model"),
                    delete e.activity,
                    delete e.activity_fields;
                var a = m.get("userLessons");
                a.reset(window.__makeAssoc(e.lessons, e.lessons_fields), {
                    silent: !0
                }),
                    a.setBackend(new p("userLessons"), "model"),
                    delete e.lessons,
                    delete e.lessons_fields;
                var l = m.get("userLessonScreens");
                l.reset(window.__makeAssoc(e.screens, e.screens_fields), {
                    silent: !0
                }),
                    l.setBackend(new p("userLessonScreens"), "model"),
                    delete e.screens,
                    delete e.screens_fields;
                var c = m.get("userAchievements");
                c.reset(e.achievements, {
                    silent: !0
                }),
                    c.setBackend(new p("userAchievements"), "model"),
                    delete e.achievements;
                var d = m.get("userBadges");
                d.reset(e.badges, {
                    silent: !0
                }),
                    d.setBackend(new p("userBadges"), "model"),
                    delete e.badges;
                var h = m.get("userTests");
                e.tests && e.tests_fields ? h.reset(window.__makeAssoc(e.tests, e.tests_fields), {
                    silent: !0
                }) : h.reset([], {
                    silent: !0
                }),
                    h.setBackend(new p("userTests"), "model"),
                    delete e.tests,
                    delete e.tests_fields;
                var u = m.get("userGames");
                e.games && e.games_fields ? u.reset(window.__makeAssoc(e.games, e.games_fields), {
                    silent: !0
                }) : u.reset([], {
                    silent: !0
                }),
                    u.setBackend(new p("userGames"), "model"),
                    delete e.games,
                    delete e.games_fields,
                    this.clear({
                        silent: !0
                    }),
                    this.set(e, {
                        silent: !0
                    }),
                    this.setBackend(new p("student"), "model"),
                    localStorage.setItem("student_skin", e.skin_id);
                var g = m.get("products");
                localStorage.setItem("product_id", e.settings.product_id || g.first().id)
            },
            resyncLocal: function() {
                $.get("/apiv1/student/auth/resync").done(function(e) {
                    m.get("userActivity").reset(window.__makeAssoc(e.activity, e.activity_fields)),
                        m.get("userLessons").reset(window.__makeAssoc(e.lessons, e.lessons_fields)),
                        m.get("userLessonScreens").reset(window.__makeAssoc(e.screens, e.screens_fields)),
                        e.tests && e.tests_fields ? m.get("userTests").reset(window.__makeAssoc(e.tests, e.tests_fields)) : m.get("userTests").reset([]),
                        e.games && e.games_fields ? m.get("userGames").reset(window.__makeAssoc(e.games, e.games_fields)) : m.get("userGames").reset([])
                })
            },
            hasOption: function(e) {
                var t = this.get("settings")
                    , s = t && t.options ? t.options : {};
                if ("changepassword" === e && this.get("must_change_password"))
                    return !0;
                if ("lockaccount" === e && this.get("must_update_name"))
                    return !1;
                if (_.isEmpty(s))
                    return !0;
                if (_.isArray(s)) {
                    var i = {};
                    s.forEach(function(e) {
                        return i[e] = !0
                    }),
                        t.options = s = i,
                        this.set({
                            settings: t
                        })
                }
                return s[e]
            },
            hasGame: function(e) {
                var t = this.get("settings");
                return !t || !t.games || -1 !== t.games.indexOf(e)
            },
            refreshSession: function() {
                return $.get("/apiv1/student/auth/refresh-session")
            },
            logOut: function(e) {
                e = e || {},
                    this.clearLocalStorage()
            },
            clearLocalStorage: function() {
                var e = localStorage.length
                    , t = [];
                $.cookie("sso", "", {
                    path: "/"
                }),
                    $.cookie("sso_id", "", {
                        path: "/"
                    }),
                    $.cookie("join_code", "", {
                        path: "/"
                    });
                for (var s = 0; s < e; s++)
                    rot47(localStorage.key(s)).match(/^student/) && t.push(localStorage.key(s)),
                        localStorage.key(s).match(/^student/) && t.push(localStorage.key(s));
                t.forEach(function(e) {
                    localStorage.removeItem(e)
                })
            },
            getSkinName: function(s) {
                return FTWGLOBALS("skins").reduce(function(e, t) {
                    return t.id == s ? t.file : e
                }, "app")
            },
            changeSkin: function(e) {
                this.set({
                    skin_id: e
                }),
                    localStorage.setItem("student_skin", e);
                var t = $("#base-stylesheet")
                    , s = t.attr("href").split("/")
                    , i = s.pop().split(".");
                i[0] = this.getSkinName(e),
                    t.attr("href", s.join("/") + "/" + i.join(".")),
                    m.get("loggedIn") && $.post("/apiv1/student/user/profile", {
                        skin_id: e
                    })
            },
            hideAnnouncementModal: function(e) {
                var t = this.get("hidden_announcements") || [];
                t.push(e.banner_announcement_id),
                    t = _.uniq(t),
                    this.set({
                        hidden_announcements: t
                    }),
                    $.post("/apiv1/student/user/hide-announcement-modal", {
                        ids: t
                    })
            },
            getSetting: function(e) {
                return this.get("settings")[e]
            },
            setSettings: function(e) {
                var t = this.get("settings");
                this.set({
                    settings: Object.assign({}, t, e)
                }),
                    e.language && $.cookie("lang", e.language, {
                        path: "/",
                        expires: 30
                    }),
                    this.trigger("settings_changed", Object.keys(e))
            }
        })
    }),
    define("shared/authentication", [], function() {
        "use strict";
        var e = function(e, t) {
            this.prefix = e,
                this.user = t,
                $.ajaxSetup({
                    beforeSend: function(e) {
                        e.setRequestHeader("Authorization", "Bearer " + this.token()),
                            e.setRequestHeader("x-language", FTWGLOBALS("language"))
                    }
                        .bind(this),
                    complete: function(e, t) {
                        if (("success" === t && 200 == e.status || 403 == e.status) && (e.getResponseHeader("Authorization") || e.responseJSON && e.responseJSON.token) && this.token(e.responseJSON.token || e.getResponseHeader("Authorization")),
                            e.responseJSON && e.responseJSON.checkTimestamp) {
                            var s = e.responseJSON.checkTimestamp;
                            if (600 < Math.abs(s - Date.getUnixTime()))
                                return alert("shared.computer_time_problem_header".t() + "\n\n" + "shared.computer_time_problem_text".t({
                                    computer_time: moment().format("h:mm a"),
                                    correct_time: moment(1e3 * s).format("h:mm a"),
                                    site: FTWGLOBALS("name")
                                })),
                                    !1
                        }
                    }
                        .bind(this)
                }),
                $(document).ajaxError(function(e, t) {
                    401 == t.status && (console.error("Invalid token or session", t),
                        localStorage.removeItem(this.prefix + "_jwt_token"))
                }
                    .bind(this))
        };
        return _.extend(e.prototype, {
            valid: function() {
                return this.token() && !this.expired()
            },
            expired: function() {
                var e = this.expiration();
                return !e || Date.now() > 1e3 * e
            },
            expiration: function() {
                var e = this.payload();
                return e ? e.exp : 0
            },
            token: function(e) {
                return e ? (localStorage.setItem(this.prefix + "_jwt_token", e.replace("Bearer ", "")),
                    e) : localStorage.getItem(this.prefix + "_jwt_token")
            },
            payload: function() {
                var e = this.token();
                if (e) {
                    var t = e.split(".")[1];
                    if (t)
                        return JSON.parse(atob(t))
                }
            }
        }),
            e
    }),
    define("global/models/product", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "product_id",
            defaults: {
                name: "",
                display_order: 0
            }
        })
    }),
    define("global/collections/products", ["require", "global/models/product"], function(e) {
        "use strict";
        var t = e("global/models/product");
        return Backbone.Collection.extend({
            model: t,
            comparator: "display_order"
        })
    }),
    define("global/models/language", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({})
    }),
    define("global/collections/languages", ["require", "global/models/language"], function(e) {
        "use strict";
        var t = e("global/models/language");
        return Backbone.Collection.extend({
            model: t,
            comparator: "id"
        })
    }),
    define("global/collections/user_lessons", ["require", "registry"], function(e) {
        "use strict";
        var i = e("registry")
            , t = Backbone.Model.extend({
                idAttribute: "lesson_id",
                defaults: {
                    progress: 0,
                    max_progress: 0,
                    typed: 0,
                    errors: 0,
                    seconds: 0,
                    completed: 0,
                    updated_at: 0,
                    created_at: 0,
                    last_save_response: null
                },
                saveStats: function(e, t) {
                    e.seconds = GetSeconds(e.typed);
                    // Math.round((12*e.typed)/wpm);
                    //e.seconds *= 4;
                    //e.seconds += Math.round(Math.random() * 10 - 5);
                    if (e) {
                        var s = i.get("student");
                        if (e.user_id = s.id,
                            s.get("section_id") && (e.section_id = s.get("section_id")),
                            s.get("teacher_id") && (e.teacher_id = s.get("teacher_id")),
                            e.product_id = s.getSetting("product_id"),
                            delete e.lastTry,
                            i.get("loggedIn") && !s.get("demo"))
                            return $.postJSON("/apiv1/student/stats", {
                                stats: e,
                                keys: t
                            }).done(function(e) {
                                e && this.set({
                                    last_save_response: e
                                })
                            }
                                .bind(this))
                    }
                    return $.Deferred().resolve()
                },
                saveAdventurePath: function(e) {
                    var t = i.get("student");
                    return e.user_id = t.id,
                        i.get("loggedIn") && !t.get("demo") ? $.postJSON("/apiv1/student/stats", {
                            stats: e
                        }) : $.Deferred().resolve()
                },
                restart: function() {
                    return i.get("loggedIn") ? $.postJSON("/apiv1/student/lessons/restart", {
                        lesson_id: this.id
                    }) : $.Deferred().resolve()
                }
            });
        return Backbone.Collection.extend({
            model: t
        })
    }),
    define("global/collections/user_activity", ["require"], function(e) {
        "use strict";
        var t = Backbone.Model.extend({
            idAttribute: "hour",
            defaults: {
                hour: 0,
                typed: 0,
                seconds: 0,
                errors: 0,
                screens: 0,
                stars: 0
            }
        });
        return Backbone.Collection.extend({
            model: t,
            comparator: "hour",
            getOrAdd: function(e) {
                var t = this.get(e);
                return t || (t = this.add({
                    hour: e
                })),
                    t
            },
            merge: function(e) {
                e.hour = e.created_at - e.created_at % 3600,
                    e.screens = 1;
                var t = this.get(e.hour);
                t ? t.inc({
                    typed: e.typed,
                    seconds: e.seconds,
                    errors: e.errors,
                    screens: e.screens,
                    stars: e.stars
                }) : this.add(e),
                    e.hour = 0,
                    (t = this.get(0)) ? t.inc({
                        typed: e.typed,
                        seconds: e.seconds,
                        errors: e.errors,
                        screens: e.screens,
                        stars: e.stars
                    }) : this.add(e)
            },
            getCompiled: function(e) {
                if (0 === e) {
                    var t = this.get(0);
                    return t ? t.toJSON() : {
                        typed: 0,
                        seconds: 0,
                        errors: 0,
                        screens: 0,
                        stars: 0
                    }
                }
                var s = Date.getUnixTime() - 86400 * e;
                return this.toJSON().reduce(function(e, t) {
                    return t.hour >= s && (e.typed += parseInt(t.typed),
                        e.seconds += parseInt(t.seconds),
                        e.errors += parseInt(t.errors),
                        e.screens += parseInt(t.screens),
                        e.stars += parseInt(t.stars)),
                        e
                }, {
                    typed: 0,
                    seconds: 0,
                    errors: 0,
                    screens: 0,
                    stars: 0
                })
            }
        })
    }),
    define("global/collections/user_tests", ["require", "shared/scoring", "global/collections/user_lessons"], function(e) {
        "use strict";
        var s = e("shared/scoring")
            , t = (e("global/collections/user_lessons"),
                Backbone.Model.extend({
                    idAttribute: "user_test_id",
                    defaults: {
                        lesson_id: 0,
                        seconds: 0,
                        errors: 0,
                        typed: 0,
                        completed: 0,
                        created_at: 0
                    }
                }));
        return Backbone.Collection.extend({
            model: t,
            comparator: function(e) {
                return -e.get("created_at")
            },
            url: function() {
                return "/apiv1/student/tests"
            },
            getCompiled: function() {
                return _.values(_.reduce(this.toJSON(), function(e, t) {
                    return t.speed = s.speed(t.typed, t.seconds, t.errors),
                        e[t.lesson_id] ? (e[t.lesson_id].typed += parseInt(t.typed),
                            e[t.lesson_id].seconds += parseInt(t.seconds),
                            e[t.lesson_id].errors += parseInt(t.errors),
                            e[t.lesson_id].completed += 1,
                            e[t.lesson_id].fastest = Math.max(e[t.lesson_id].fastest, t.speed),
                            e[t.lesson_id].created_at = t.created_at) : (e[t.lesson_id] = t,
                                e[t.lesson_id].completed = 1,
                                e[t.lesson_id].created_at = t.created_at,
                                e[t.lesson_id].fastest = t.speed),
                        e
                }, {}))
            }
        })
    }),
    define("global/models/achievement_group", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "achievement_group_id",
            defaults: {
                name: "",
                description: "",
                subdescription: "",
                display_order: ""
            }
        })
    }),
    define("global/collections/achievement_groups", ["require", "global/models/achievement_group"], function(e) {
        "use strict";
        var t = e("global/models/achievement_group");
        return Backbone.Collection.extend({
            model: t,
            comparator: "order",
            getCounts: function(s) {
                return _.map(this.toJSON(), function(e) {
                    var t = s.where({
                        achievement_group_id: e.achievement_group_id
                    });
                    return e.total = t.length,
                        e.completed = t.filter(function(e) {
                            return 0 < e.get("created_at")
                        }).length,
                        e
                })
            }
        })
    }),
    define("global/models/user_badge", ["require"], function(e) {
        "use strict";
        return Backbone.Model.extend({
            idAttribute: "lesson_id",
            defaults: {
                typed: 0,
                errors: 0,
                seconds: 0,
                created_at: 0
            }
        })
    }),
    define("global/collections/user_badges", ["require", "global/models/user_badge", "global/views/svg"], function(e) {
        "use strict";
        var t = e("global/models/user_badge")
            , n = e("global/views/svg");
        return Backbone.Collection.extend({
            model: t,
            comparator: "created_at",
            getBadgeForId: function(e) {
                var t = _.find(FTWGLOBALS("lessons"), {
                    lesson_id: parseInt(e)
                })
                    , s = _.find(FTWGLOBALS("units"), {
                        unit_id: t.unit_id
                    });
                if (!t || !s)
                    return !1;
                var i = "/dist/student/images/badges/badge-lesson-" + s.badge + ".svg";
                return new n({
                    path: i,
                    preprocess: function(e) {
                        e.querySelector("#pathTitleText").textContent = t.name.escapeHTML(),
                            e.querySelector("#subTitleText").textContent = s.name.escapeHTML()
                    }
                        .bind(this)
                })
            }
        })
    }),
    define("global/models/support_form", ["require", "shared/form_model"], function(e) {
        "use strict";
        return e("shared/form_model").extend({
            url: "/apiv1/student/contact/form",
            validationRules: {
                name: {
                    required: !0
                },
                email: {
                    required: !0
                },
                reason: {
                    required: !0
                },
                message: {
                    required: !0
                }
            }
        })
    }),
    define("global/views/support_modal", ["require", "registry", "global/models/support_form", "shared/modal"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("global/models/support_form");
        return e("shared/modal").extend({
            titleText: "contact.title".t({
                site: FTWGLOBALS("name")
            }),
            successNotice: "contact.success".t(),
            templatePath: ["global", "support_modal"],
            type: "long",
            modelClass: s,
            formSelector: "form",
            serialize: function() {
                return {
                    user: t.get("student").toJSON(),
                    reasons: [[], ["contact.bug".t(), "contact.bug".t()], ["contact.access".t(), "contact.access".t()], ["contact.upgrade".t(), "contact.upgrade".t()], ["contact.info".t(), "contact.info".t()], ["contact.other".t(), "contact.other".t()]]
                }
            }
        })
    }),
    define("shared/announcement_modal", ["require", "registry", "shared/modal"], function(e) {
        "use strict";
        var t = e("registry")
            , s = e("shared/modal");
        return s.extend({
            titleText: null,
            successNotice: null,
            modalTemplatePath: ["global", "announcement_modal"],
            templatePath: ["global", "announcement_modal_content"],
            close: function() {
                if (this.prefix) {
                    var e = t.get(this.prefix);
                    this.$("input[name=dont_show_again]").prop("checked") && e.get("announcementModal") && e.hideAnnouncementModal({
                        banner_announcement_id: this.data.banner_announcement_id
                    }),
                        e.unset("announcementModal")
                }
                s.prototype.close.apply(this, arguments)
            }
        })
    }),
    define("shared/form_validator", ["require", "shared/notice"], function(e) {
        "use strict";
        var t = ".ignore"
            , s = e("shared/notice");
        $.validator.setDefaults({
            ignore: t
        });
        var i = function(e) {
            (e = e || {}).submitDelay = e.submitDelay || 300,
                _.extend(this, e),
                this.fileUpload && (this.model.fileUpload = this.form),
                _.extend(this, Backbone.Events);
            var t = this.model.validationRules || {}
                , n = this.model.validationMessages || {};
            _.each(t, function(e, i) {
                _.isObject(e) && _.each(e, function(e, t) {
                    var s = n[i] || {};
                    s[t] || (s[t] = ("shared.validation." + t).t()),
                        n[i] = s
                })
            }),
                this.validatorOptions = {
                    errorPlacement: this.errorPlacement.bind(this),
                    submitHandler: this.submitHandler.bind(this),
                    invalidHandler: this.errorHandler.bind(this),
                    rules: t,
                    messages: n,
                    onfocusout: !1,
                    highlight: this.highlight,
                    unhighlight: this.unhighlight,
                    errorClass: "is-error",
                    errorElement: "p"
                },
                this.validator = this.form.validate(this.validatorOptions),
                this.form.find("input").keypress(function(e) {
                    if (13 === e.keyCode)
                        return $(e.currentTarget).blur(),
                            this.form.submit(),
                            !1
                }
                    .bind(this)),
                this.button.click(this.buttonClick.bind(this))
        };
        return i.prototype.toggleValidation = function(e) {
            this.validator.settings.ignore = e ? t : "*"
        }
            ,
            i.prototype.buttonClick = function() {
                return this.form.submit(),
                    !1
            }
            ,
            i.prototype.errorHandler = function(e, t) {
                var s = this.getErrorElements(t);
                return $.Velocity(s, "ftw.miniShake", function() {
                    s.forEach(function(e) {
                        e.css({
                            transform: ""
                        })
                    })
                }),
                    this.trigger("invalid"),
                    !1
            }
            ,
            i.prototype.getErrorElements = function(e) {
                return this.validator.errorList.map(function(e) {
                    return $(e.element).next().hasClass("chosen-container") ? $(e.element).next() : $(e.element)
                })
            }
            ,
            i.prototype.errorPlacement = function(e, t) {
                var s = t.closest(".fieldset");
                s.length ? ($(e).addClass("error"),
                    s.find(".split-cell:nth-child(2)").html(e)) : t.parent().append(e).addClass("error")
            }
            ,
            i.prototype.highlight = function(e, t) {
                $(e).next().hasClass("chosen-container") ? $(e).next().addClass("is-error") : $(e).addClass(t)
            }
            ,
            i.prototype.unhighlight = function(e, t) {
                $(e).next().hasClass("chosen-container") ? $(e).next().removeClass(t) : ($(e).removeClass(t),
                    $(e).parent().removeClass("error"))
            }
            ,
            i.prototype.submitHandler = function() {
                if (!this.submitting) {
                    this.disableButton(),
                        this.trigger("submitting");
                    var t = {}
                        , s = this.model.toJSON()
                        , n = [];
                    _.compact(_.uniq(this.form.find("input,textarea,select").map(function(e, t) {
                        return t.name
                    }))).forEach(function(e) {
                        var i, t, s = this.form.find("[name=" + e + "]");
                        1 === s.length ? "checkbox" === (i = s.attr("type") || "text") ? t = s.prop("checked") ? s.val() || 1 : 0 : "radio" === i ? s.prop("checked") && (t = s.val()) : t = s.val() : t = s.toArray().map(function(e) {
                            var t, s = $(e);
                            return "checkbox" === (i = s.attr("type") || "text") ? t = s.prop("checked") ? s.val() || 1 : void 0 : "radio" === i ? s.prop("checked") && (t = s.val()) : t = s.val(),
                                t
                        }).filter(function(e) {
                            return void 0 !== e
                        }),
                            void 0 !== t && n.push({
                                name: s.attr("name"),
                                value: t
                            })
                    }
                        .bind(this)),
                        this.dataParser && (n = this.dataParser(n, this.form)),
                        n.forEach(function(e) {
                            e.value != s[e.name] && (t[e.name] ? (_.isArray(t[e.name]) || (t[e.name] = [t[e.name]]),
                                t[e.name].push(e.value)) : t[e.name] = e.value)
                        }),
                        setTimeout(function() {
                            this.save(t, {
                                patch: !0,
                                silent: !1,
                                wait: !0
                            })
                        }
                            .bind(this), this.submitDelay || 0)
                }
            }
            ,
            i.prototype.save = function(e, t) {
                this.model.url || this.model.urlRoot ? this.model.save(e, t).done(function(e) {
                    this.submitting = !1,
                        this.enableButton(),
                        this.saveSuccess(e)
                }
                    .bind(this)).fail(function(e) {
                        this.submitting = !1,
                            this.enableButton();
                        var t = {};
                        (t = e.responseJSON ? e.responseJSON : {
                            error: e.responseText || "shared.form_validator.unknown_error".t()
                        }).error && (new s({
                            error: !0,
                            text: t.error.t()
                        }).show(this.button),
                            delete t.error),
                            this.saveError(t)
                    }
                        .bind(this)) : (this.submitting = !1,
                            this.model.set(e),
                            this.saveSuccess(e))
            }
            ,
            i.prototype.saveSuccess = function(e) {
                this.trigger("done", e, this.model, this.form)
            }
            ,
            i.prototype.saveError = function(s) {
                var i = [];
                if (this.form && this.form.length && (i = _.flatten(this.form.find("input,select,textarea").toArray().map(function(e) {
                    return $(e).attr("name")
                }))),
                    (s = _.each(s || {}, function(e, t) {
                        "message" !== t && "error" !== t && -1 === i.indexOf(t) || (_.isArray(e) ? s[t] = e.map(function(e) {
                            return e.t(_.defaults({
                                sub: s[t + "_sub"]
                            }, s))
                        }) : s[t] = e.t(_.defaults({
                            sub: s[t + "_sub"]
                        }, s)))
                    })) && "object" == typeof s)
                    try {
                        var e = s.message && s.errors ? s.errors : s
                            , n = {};
                        _.forEach(e, function(e, t) {
                            $("form [name=" + t + "]").length && (n[t] = e)
                        }),
                            this.form.validate().showErrors(n),
                            this.errorHandler(),
                            this.form.find("[name=" + Object.keys(n)[0] + "]").focus()
                    } catch (e) {
                        console.error(e)
                    }
                this.trigger("error", s)
            }
            ,
            i.prototype.disableButton = function() {
                this.button.addClass("btn--loading"),
                    this.submitting = !0
            }
            ,
            i.prototype.enableButton = function() {
                this.button.removeClass("btn--loading"),
                    this.submitting = !1
            }
            ,
            i.prototype.validate = function() {
                return this.validator.form()
            }
            ,
            i
    }),
    define("shared/view", ["require", "templates", "shared/notice", "shared/form_validator"], function(e) {
        "use strict";
        var i = e("templates")
            , s = e("shared/notice")
            , t = e("shared/form_validator");
        _.extend(Backbone.View.prototype, {
            views: null,
            modelClass: null,
            formSelector: "",
            successNotice: "",
            fileUpload: !1,
            initialize: function(e) {
                this.views = {},
                    this.delegate("click", ".form-fieldset .js-show", this.togglePasswordDisplay.bind(this)),
                    _.extend(this, e),
                    this.modelClass && !this.model && (this.model = new this.modelClass(this.data))
            },
            addChild: function(e, t, s, i) {
                return s = s || !1,
                    i = void 0 === i || i,
                    this._childViews || (this._childViews = []),
                    this._childViews.push({
                        view: t,
                        selector: e,
                        append: s,
                        render: i
                    }),
                    this
            },
            removeChild: function(t) {
                var e = _.findIndex(this._childViews, function(e) {
                    return t === e.view
                });
                -1 < e && delete this._childViews[e],
                    this._childViews = _.compact(this._childViews)
            },
            renderChildren: function(n) {
                return n = n ? $(n) : this.$el,
                    this._childViews && 0 < this._childViews.length && this._childViews.forEach(function(e, t) {
                        if (e)
                            if (e.selector) {
                                var s = "string" == typeof e.selector ? n.find(e.selector) : $(e.selector)
                                    , i = e.render ? e.view.render().el : e.view.el;
                                0 < t && e.append ? s.append(i) : s.html(i)
                            } else
                                n.append(i)
                    }
                        .bind(this)),
                    this
            },
            serialize: function() {
                return {}
            },
            render: function() {
                var e, t;
                if (this.template ? e = this.template : this.templatePath && (e = i(this.templatePath[0], this.templatePath[1]),
                    this.template = e),
                    e ? (t = $(e(this.serialize())),
                        this.renderChildren(t),
                        this.$el.html(t)) : this.renderChildren(),
                    this.layout) {
                    var s = "function" == typeof this.layout ? new this.layout : this.layout;
                    s.render(),
                        s.$("#app").append(this.el),
                        $("body").append(s.el)
                }
                return this.initializeValidation(),
                    this.setupIDE(),
                    this
            },
            ides: null,
            setupIDE: function() {
                var s = $(".js-ide").toArray();
                s.length && (this.ides = [],
                    s.forEach(function(t) {
                        $(s).removeClass("js-ide");
                        var e = CodeMirror.fromTextArea(t, {
                            lineNumbers: !0,
                            lineWrapping: !0,
                            mode: $(t).data("ide") || "htmlmixed",
                            autoCloseBrackets: !0,
                            autoCloseTags: !0,
                            matchBrackets: !0,
                            matchTags: !0,
                            showTrailingSpace: !0,
                            lint: !0,
                            extraKeys: {
                                "Ctrl-Q": function(e) {
                                    e.foldCode(e.getCursor())
                                }
                            },
                            foldCode: !0,
                            foldGutter: !0,
                            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
                        });
                        e.on("change", function(e) {
                            t.value = e.getValue()
                        }),
                            this.ides.push(e)
                    }
                        .bind(this)))
            },
            destroyIDE: function() {
                this.ides && (this.ides.forEach(function(e) {
                    e.toTextArea()
                }),
                    this.ides = [])
            },
            initializeValidation: function() {
                return this.formSelector && this.model && (this.validator = new t({
                    form: this.$(this.formSelector),
                    button: this.$(".js-submit,.submit"),
                    buttonClick: this.buttonClick.bind(this),
                    model: this.model,
                    dataParser: this.dataParser ? this.dataParser.bind(this) : null,
                    fileUpload: this.fileUpload
                }),
                    this.listenTo(this.validator, "done", this.submitCallback),
                    this.listenTo(this.validator, "error", this.errorCallback),
                    this.listenTo(this.validator, "submitting", this.submittingCallback)),
                    this
            },
            submittingCallback: function() { },
            submitCallback: function(e) {
                if (this.successNotice) {
                    var t = "function" == typeof this.successNotice ? this.successNotice(e) : this.successNotice;
                    new s({
                        text: t
                    }).show()
                }
            },
            buttonClick: function() {
                return this.validator.form.submit(),
                    !1
            },
            errorCallback: function(e) {
                e ? "object" == typeof e ? (e.message || e.error) && new s({
                    text: "shared.view.error_callback_notice_text".t({
                        error: e.message || e.error
                    }),
                    error: !0
                }).show() : alert("shared.view.error_callback_invalid_response".t({
                    error: JSON.stringify(e)
                })) : alert("shared.view.error_callback_error_communicating".t())
            },
            resetForm: function() {
                this.formSelector && (this.$(this.formSelector)[0].reset(),
                    this.model.clear(),
                    this.$("input[type=text]:eq(0)").focus())
            },
            togglePasswordDisplay: function(e) {
                var t = $(e.currentTarget)
                    , s = t.parent().find("input");
                return "text" === s.attr("type") ? (s.attr("type", "password"),
                    t.html("shared.password.show_button".t())) : (s.attr("type", "text"),
                        t.html("shared.password.hide_button".t())),
                    s.focus(),
                    !1
            }
        })
    }),
    define("shared/model", ["require"], function(e) {
        "use strict";
        Backbone.Collection.prototype.initialize = function() {
            this.listenTo(this, "change", function() {
                this._hasChanged = !0
            })
        }
            ,
            Backbone.Collection.prototype.hasChanged = function() {
                return this._hasChanged || !1
            }
            ,
            Backbone.Model.prototype.setBackend = function(e, t) {
                return this.backend && this.off("change", this.backend.change),
                    e.setModel(this),
                    this.on("change", e.change, e),
                    "backend" == t ? this.set(e.getData()) : "model" == t && e.setData(this.toJSON()),
                    this.backend = e,
                    this
            }
            ,
            Backbone.Model.prototype.inc = function() {
                var s, i = {};
                return "object" == typeof arguments[0] ? (s = null,
                    _.each(arguments[0], function(e, t) {
                        s = this.get(t) || 0,
                            i[t] = s + e
                    }, this),
                    this.set(i, arguments[1])) : "string" == typeof arguments[0] && arguments[1] ? (s = this.get(arguments[0]) || 0,
                        i[arguments[0]] = s + arguments[1],
                        this.set(i, arguments[3])) : void 0
            }
            ,
            Backbone.Model.prototype.getClone = function(e) {
                return _.clone(this.attributes[e])
            }
    }),
    define("shared/collection", ["require", "registry"], function(e) {
        "use strict";
        e("registry");
        var t = Backbone.Collection.prototype.reset;
        Backbone.Collection.prototype.reset = function() {
            this._hasReset = !0,
                t.apply(this, arguments)
        }
            ,
            Backbone.Collection.prototype.hasReset = function() {
                return this._hasReset || !1
            }
            ,
            Backbone.Collection.prototype.parse = function(e) {
                return _.isObject(e) && e.data && e.total ? (this.state.totalRecords = e.total,
                    e.data) : e
            }
            ,
            Backbone.Collection.prototype.setBackend = function(e, t) {
                return e.setModel(this),
                    this.on("change", e.change, e),
                    this.on("add", e.add, e),
                    this.on("remove", e.remove, e),
                    this.on("reset", e.reset, e),
                    this.on("sort", e.sort, e),
                    "backend" == t ? this.reset(e.getData(), {
                        silent: !0
                    }) : "model" == t && e.setData(this.toJSON()),
                    this
            }
            ,
            Backbone.Collection.prototype.destroyMany = function(e) {
                var t = this.model.prototype.urlRoot;
                return t || (t = "string" == typeof this.url ? this.url : this.url()),
                    $.ajax({
                        url: t + "/many",
                        data: JSON.stringify(e),
                        method: "DELETE"
                    }).done(function() {
                        this.remove(e)
                    }
                        .bind(this))
            }
            ,
            Backbone.Collection.prototype.sortField = "",
            Backbone.Collection.prototype.sortDir = "asc";
        var s = function(e, t) {
            var s = String(e.get(this.sortField))
                , i = String(t.get(this.sortField))
                , n = "asc" == this.sortDir ? 1 : -1;
            if ("string" != typeof s && "string" != typeof i)
                return function(e, t) {
                    var s = e.get(this.sortField)
                        , i = t.get(this.sortField)
                        , n = "asc" == this.sortDir ? 1 : -1;
                    return s < i ? -1 * n : i < s ? 1 * n : 0
                }
                    .call(this, e, t);
            var r, o, a, l, c, d, h = 0, u = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
            if (s === i)
                return 0;
            for (r = s.toLowerCase().match(u) || "",
                o = i.toLowerCase().match(u) || "",
                d = r.length; h < d;) {
                if (!o[h])
                    return 1 * n;
                if ((a = r[h]) !== (l = o[h++]))
                    return c = a - l,
                        isNaN(c) ? (l < a ? 1 : -1) * n : c * n
            }
            return (o[h] ? -1 : 0) * n
        };
        Backbone.Collection.prototype.setSort = function(e, t) {
            this.sortDir = t || ("asc" == this.sortDir && this.sortField == e ? "desc" : "asc"),
                this.sortField = e,
                this.reSort()
        }
            ,
            Backbone.Collection.prototype.reSort = function() {
                this.comparator !== s && (this.comparator = s),
                    this.sort()
            }
    }),
    define("shared/form_helpers", ["require", "templates"], function(e) {
        "use strict";
        var c = e("templates");
        window.FORM = window.FORM || {},
            window.FORM.textGroup = function(e, t, s, i, n, r, o, a) {
                return i = i || {},
                    c("global", "form_helper_group")({
                        label: s || e.replace(/_/g, " ").ucWords(),
                        name: e,
                        element: window.FORM.text(e, t, i, n),
                        first: r,
                        disabled: o,
                        groupClasses: a || {}
                    })
            }
            ,
            window.FORM.checkboxGroup = function(e, t, s, i, n, r, o, a) {
                return i = i || {},
                    c("global", "form_helper_group")({
                        label: s || e.replace(/_/g, " ").ucWords(),
                        name: e,
                        element: window.FORM.checkbox(e, t, i, n),
                        first: r,
                        disabled: o,
                        groupClasses: a || {}
                    })
            }
            ,
            window.FORM.fileGroup = function(e, t, s, i, n, r, o, a) {
                return i = i || {},
                    c("global", "form_helper_group")({
                        label: s || e.replace(/_/g, " ").ucWords(),
                        name: e,
                        element: window.FORM.file(e, t, i, n),
                        first: r,
                        disabled: o,
                        groupClasses: a || {}
                    })
            }
            ,
            window.FORM.textareaGroup = function(e, t, s, i, n, r, o, a) {
                return i = i || {},
                    c("global", "form_helper_group")({
                        label: s || e.replace(/_/g, " ").ucWords(),
                        name: e,
                        element: window.FORM.textarea(e, t, i, n),
                        first: r,
                        disabled: o,
                        groupClasses: a || {}
                    })
            }
            ,
            window.FORM.passwordGroup = function(e, t, s, i, n, r, o, a, l) {
                return i = i || {},
                    c("global", "form_helper_group")({
                        label: s || e.replace("_", " ").ucWords(),
                        name: e,
                        showToggle: l || {},
                        element: window.FORM.password(e, t, i, n, l),
                        first: r,
                        disabled: o,
                        groupClasses: a || {}
                    })
            }
            ,
            window.FORM.selectGroup = function(e, t, s, i, n, r, o, a, l) {
                return n = n || {},
                    c("global", "form_helper_group")({
                        label: i || e.replace("_", " ").ucWords(),
                        name: e,
                        first: o,
                        disabled: a,
                        element: window.FORM.select(e, t, s, n, r),
                        groupClasses: l || {}
                    })
            }
            ,
            window.FORM.dateGroup = function(e, t, s, i, n, r, o, a) {
                return i = i || {},
                    c("global", "form_helper_group")({
                        name: e,
                        label: s || e.replace("_", " ").ucWords(),
                        element: window.FORM.date(e, t, i, n),
                        first: r,
                        disabled: o,
                        groupClasses: a || {}
                    })
            }
            ,
            window.FORM.hiddenGroup = function(e, t, s, i, n, r, o, a) {
                return n = n || {},
                    c("global", "form_helper_group")({
                        name: e,
                        label: i || e.replace(/_/g, " ").ucWords(),
                        element: window.FORM.hidden(e, t, s, n, r),
                        first: o,
                        groupClasses: a || {}
                    })
            }
            ,
            window.FORM.text = function(e, t, s, i) {
                return s = s || {},
                    i = i || [],
                    c("global", "form_helper_text")({
                        name: e,
                        value: _.isObject(t) ? t[e] : t,
                        params: s,
                        classes: i
                    })
            }
            ,
            window.FORM.checkbox = function(e, t, s, i) {
                return s = s || {},
                    i = i || [],
                    t = t || 1,
                    c("global", "form_helper_checkbox")({
                        name: e,
                        value: _.isObject(t) ? t[e] : t,
                        params: s,
                        classes: i
                    })
            }
            ,
            window.FORM.file = function(e, t, s, i) {
                return s = s || {},
                    i = i || [],
                    c("global", "form_helper_file")({
                        name: e,
                        value: _.isObject(t) ? t[e] : t,
                        params: s,
                        classes: i
                    })
            }
            ,
            window.FORM.textarea = function(e, t, s, i) {
                return s = s || {},
                    i = i || [],
                    c("global", "form_helper_textarea")({
                        name: e,
                        value: _.isObject(t) ? t[e] : t,
                        params: s,
                        classes: i
                    })
            }
            ,
            window.FORM.password = function(e, t, s, i, n) {
                return s = s || {},
                    i = i || [],
                    c("global", "form_helper_password")({
                        name: e,
                        value: _.isObject(t) ? t[e] : t,
                        params: s,
                        classes: i,
                        showToggle: n
                    })
            }
            ,
            window.FORM.select = function(e, t, s, i, n) {
                return i = i || {},
                    n = n || [],
                    c("global", "form_helper_select")({
                        name: e,
                        value: _.isObject(t) ? t[e] : t,
                        options: s,
                        params: i,
                        classes: n
                    })
            }
            ,
            window.FORM.date = function(e, t, s, i) {
                return s = s || {},
                    i = i || [],
                    t = "0000-00-00" == (t = _.isObject(t) ? t[e] : t) ? "" : t,
                    c("global", "form_helper_date")({
                        name: e,
                        value: t,
                        params: s,
                        classes: i
                    })
            }
            ,
            window.FORM.hidden = function(e, t, s, i, n) {
                return i = i || {},
                    n = n || [],
                    c("global", "form_helper_hidden")({
                        name: e,
                        displayValue: s,
                        value: _.isObject(t) ? t[e] : t,
                        params: i,
                        classes: n
                    })
            }
    }),
    define("app", ["require", "shared/helpers", "registry", "router", "shared/radar_tracker", "shared/scoring", "shared/analytics", "shared/notice", "global/models/user", "shared/alert", "shared/authentication", "shared/model_backends/localstorage", "global/collections/products", "global/collections/languages", "global/collections/units", "global/collections/lessons", "global/collections/user_lesson_screens", "global/collections/user_lessons", "global/collections/letters_typed", "global/collections/user_games", "global/collections/user_activity", "global/collections/user_tests", "global/collections/achievements", "global/collections/achievement_groups", "global/collections/user_badges", "global/views/support_modal", "shared/announcement_modal", "shared/view", "shared/model", "shared/collection", "shared/form_helpers"], function(e) {
        "use strict";
        "function" == typeof bugsnag && "object" == typeof window.bugsnagClient && window.bugsnagClient.leaveBreadcrumb("Loaded app file", {
            file: "student"
        }),
            e("shared/helpers");
        var m = e("registry")
            , t = e("router")
            , s = e("shared/radar_tracker")
            , n = e("shared/scoring")
            , r = e("shared/analytics")
            , i = e("shared/notice")
            , f = e("global/models/user")
            , o = e("shared/alert")
            , a = e("shared/authentication")
            , v = e("shared/model_backends/localstorage")
            , w = e("global/collections/products")
            , y = e("global/collections/languages")
            , b = e("global/collections/units")
            , k = e("global/collections/lessons")
            , S = e("global/collections/user_lesson_screens")
            , T = e("global/collections/user_lessons")
            , L = e("global/collections/letters_typed")
            , x = e("global/collections/user_games")
            , C = e("global/collections/user_activity")
            , A = e("global/collections/user_tests")
            , O = e("global/collections/achievements")
            , B = e("global/collections/achievement_groups")
            , j = e("global/collections/user_badges")
            , l = e("global/views/support_modal")
            , c = e("shared/announcement_modal");
        return e("shared/view"),
            e("shared/model"),
            e("shared/collection"),
            e("shared/form_helpers"),
        {
            prefix: "student",
            noAuthRequired: [/\/student$/, /student\/login$/, /\/student\/signup$/, /\/student\/oauth$/, /\/student\/verify$/, /\/student\/join$/, /\/student\/join\/login$/],
            initialize: function() {
                moment.locale($.mapLanguageToLibrary("moment", FTWGLOBALS("language"))),
                    numeral.locale($.mapLanguageToLibrary("numeral", FTWGLOBALS("language"))),
                    this.browserCheck() && (this.globals(),
                        this.authentication() && (this.bugsnag(),
                            "production" === FTWGLOBALS("env") && this.analytics(),
                            this.tracker(),
                            this.router(),
                            this.views(),
                            this.support(),
                            this.dropdown(),
                            this.flashMessage(),
                            this.announcementModal()))
            },
            browserCheck: function() {
                return navigator.userAgent.match(/MSIE [5|6|7|8|9|10]\./) ? (location.href = __url("/failbrowser"),
                    !1) : !window.__noLocalStorage
            },
            globals: function() {
                m.set("data", window.FTW),
                    m.set("isMobile", navigator.userAgent.match(/iPad|iPhone|Android/)),
                    v.setPrefix(this.prefix),
                    v.setEncryption(rot47);
                var e = new w(FTWGLOBALS("products"));
                m.set("products", e);
                var t = new y(_.values(FTWGLOBALS("languages")));
                m.set("languages", t);
                var s = new b;
                m.set("units", s);
                var i = new k;
                m.set("lessons", i),
                    m.set("achievements", new O(FTWGLOBALS("achievements"))),
                    m.set("achievementGroups", new B(FTWGLOBALS("achievement_groups")));
                var n = new k;
                n.setBackend(new v("customLessons"), "backend"),
                    m.set("customLessons", n);
                var r = new T;
                r.setBackend(new v("userLessons"), "backend"),
                    m.set("userLessons", r);
                var o = new S;
                o.setBackend(new v("userLessonScreens"), "backend"),
                    m.set("userLessonScreens", o);
                var a = new C;
                a.setBackend(new v("userActivity"), "backend"),
                    m.set("userActivity", a);
                var l = new x;
                l.setBackend(new v("userGames"), "backend"),
                    m.set("userGames", l);
                var c = new O;
                c.setBackend(new v("userAchievements"), "backend"),
                    m.set("userAchievements", c);
                var d = new j;
                d.setBackend(new v("userBadges"), "backend"),
                    m.set("userBadges", d);
                var h = new A;
                h.setBackend(new v("userTests"), "backend"),
                    m.set("userTests", h);
                var u = new L;
                u.setBackend(new v("userLettersTyped"), "backend"),
                    m.set("userLettersTyped", u);
                var g = new f;
                g.setBackend(new v(this.prefix), "backend"),
                    m.set(this.prefix, g);
                var p = _.debounce(O.check.bind(O), 300);
                a.on("all", p),
                    l.on("all", p),
                    r.on("all", p),
                    o.on("all", p),
                    h.on("all", p)
            },
            authentication: function(e) {
                var t = m.get(this.prefix)
                    , s = new a(this.prefix, t);
                if (m.set("auth", s),
                    t.get("demo"))
                    return !0;
                $(document).ajaxError(function(e, t) {
                    var s = parseInt(t.status);
                    (401 === s || 403 === s || t.responseJSON && t.responseJSON.logOut) && (m.set("loggedIn", !1),
                        m.get(this.prefix).logOut(),
                        this.loggedOutNotice())
                }
                    .bind(this));
                var i = this.noAuthRequired.reduce(function(e, t) {
                    return location.pathname.match(t) ? e + 1 : e
                }, 0);
                if ("edutyping" === FTWGLOBALS("site") && !s.valid() && !i)
                    return t.logOut(),
                        location.href = __url("/" + this.prefix + "/login"),
                        !1;
                if (!i && (!s.valid() && t.id || t.id && s.payload() && s.payload().sub !== t.id))
                    return t.logOut(),
                        location.href = __url("/" + this.prefix + "/login"),
                        !1;
                if (s.valid() && t.id) {
                    var n = function() {
                        setTimeout(this.loggedOutNotice.bind(this), 1e3 * s.expiration() - Date.now() - 60)
                    }
                        .bind(this);
                    m.set("loggedIn", !0),
                        1e3 * s.expiration() - Date.now() < 72e5 ? t.refreshSession().done(n) : n()
                }
                return m.set("token", s.token()),
                    m.get("loggedIn") && (t.get("must_change_password") || t.get("must_update_name")) && "username" === t.get("login_type") && !location.pathname.match(/\/student\/account/) ? (t.get("must_change_password") && t.get("must_update_name") ? t.set({
                        _flashMessage: "app.must_set_name_and_password".t()
                    }) : t.get("must_change_password") ? t.set({
                        _flashMessage: "app.must_change_password".t()
                    }) : t.set({
                        _flashMessage: "app.must_set_name".t()
                    }),
                        location.href = __url("/student/account"),
                        !1) : ("edutyping" === FTWGLOBALS("site") || "premium" === t.get("membership") && "premium" === s.payload().membership ? localStorage.setItem("student_membership", "premium") : localStorage.removeItem("student_membership"),
                            -1 === ["ftw", "edutypingrocks"].indexOf(t.get("district").code) && m.get("products").remove("typingu"),
                            !0)
            },
            flashMessage: function() {
                var e = m.get(this.prefix);
                e.get("_flashMessage") && (new i({
                    text: e.get("_flashMessage")
                }).show(),
                    e.unset("_flashMessage"))
            },
            loggedOutNotice: function() {
                m.get(this.prefix).logOut(),
                    new o({
                        title: "app.logged_out_title".t(),
                        text: "app.logged_out_body".t(),
                        closeButton: !1
                    }).on("ok", function() {
                        $.loginRedirect(this.prefix)
                    }
                        .bind(this))
            },
            analytics: function() {
                var e = m.get(this.prefix)
                    , t = m.get("userActivity").getCompiled(999)
                    , s = n.speed(t.typed, t.seconds)
                    , i = m.get("userLessons").toJSON().filter(function(e) {
                        return 0 < e.progress
                    }).length;
                "edutyping" === FTWGLOBALS("site") && m.get("loggedIn") ? (r.setUserId("s" + e.get("user_id")),
                    r.customDimension(2, e.get("login_type")),
                    e.get("district").status && r.customDimension(3, e.get("district").status),
                    e.get("created_at") && r.customDimension(4, Math.floor(Math.floor(Date.now() / 1e3 - e.get("created_at")) / 60 / 60 / 24)),
                    0 < s && (s = 10 * Math.floor(s / 10),
                        r.customDimension(5, s + "-" + (s + 9))),
                    r.customDimension(6, i),
                    r.customDimension(8, e.getSetting("product_id"))) : "typing" === FTWGLOBALS("site") && (r.customDimension(1, m.get("loggedIn") ? "yes" : "no"),
                        m.get("loggedIn") ? (r.setUserId("s" + e.get("user_id")),
                            e.get("teacher_id") ? r.customDimension(2, "in class") : r.customDimension(2, "individual"),
                            r.customDimension(3, e.get("login_type")),
                            r.customDimension(4, e.get("membership")),
                            r.customDimension(5, Math.floor(Math.floor(Date.now() / 1e3 - e.get("created_at")) / 60 / 60 / 24)),
                            0 < s && (s = 10 * Math.floor(s / 10),
                                r.customDimension(6, s + "-" + (s + 9))),
                            r.customDimension(7, i)) : r.customDimension(2, "anon")),
                    ga("send", "pageview")
            },
            tracker: function() {
                var e = m.get("student");
                e.hasOption("realtime") && m.get("loggedIn") && e.get("in_class") && !location.pathname.match(/\/student\/lesson\/[0-9]+/) && s.track(m.get(this.prefix))
            },
            router: function() {
                t.initialize()
            },
            support: function() {
                $(".js-support-link").fastShow().click(function() {
                    return new l({}).open(),
                        !1
                })
            },
            dropdown: function() {
                $(".js-dropdown").keydown(function(e) {
                    13 !== e.which || $(e.target).hasClass("dropdown-item") && $(e.target).hasClass("popdown-item") || (e.preventDefault,
                        $(this).addClass("is-hover"),
                        $(".js-dropdown.is-hover .dropdown-item:first-of-type, .js-dropdown.is-hover .popdown-item:first-of-type").focus())
                }),
                    $(".js-dropdown").focus(function() {
                        $("body").click(function() {
                            $(".js-dropdown").removeClass("is-hover"),
                                $("body").unbind("click")
                        })
                    }),
                    $(".dropdown-item, .popdown-item").keydown(function(e) {
                        var t = $(this).parent().parent()
                            , s = t.attr("id")
                            , i = $(this).children().hasClass("dropdown-link")
                            , n = i ? $(".js-dropdown#" + s + " .dropdown-link") : $(".js-dropdown#" + s + " .dropdown-item, .js-dropdown#" + s + " .popdown-item")
                            , r = i ? n.parent().index(this) : n.index(this);
                        27 === e.which && (t.removeClass("is-hover"),
                            setTimeout(function() {
                                t.focus()
                            }, 10)),
                            e.shiftKey && 9 === e.which ? (e.preventDefault,
                                0 === r ? setTimeout(function() {
                                    n.eq(n.length - 1).focus()
                                }, 10) : setTimeout(function() {
                                    n.eq(r - 1).focus()
                                }, 10)) : 9 === e.which && (e.preventDefault,
                                    r < n.length - 1 ? setTimeout(function() {
                                        n.eq(r + 1).focus()
                                    }, 10) : setTimeout(function() {
                                        n.eq(0).focus()
                                    }, 10))
                    })
            },
            views: function() {
                setTimeout(O.check.bind(O), 500)
            },
            bugsnag: function() {
                if ("object" == typeof window.bugsnagClient) {
                    window.bugsnagClient.metaData = window.bugsnagClient.metaData || {},
                        window.bugsnagClient.user = m.get(this.prefix).toJSON();
                    var e = location.href.match(/lesson\/(\d+)/);
                    e && (window.bugsnagClient.metaData.userLesson = _.findWhere(m.get("userLessons").toJSON(), {
                        lesson_id: parseInt(e[1])
                    }),
                        window.bugsnagClient.metaData.userLessonScreens = _.where(m.get("userLessonScreens").toJSON(), {
                            lesson_id: parseInt(e[1])
                        })),
                        location.href.match("/test/") && (window.bugsnagClient.metaData.userTests = m.get("userTests").toJSON())
                }
            },
            announcementModal: function() {
                var e = m.get(this.prefix)
                    , t = e.get("hidden_announcements") || []
                    , s = e.get("announcementModal");
                m.get("loggedIn") && s && "modal" === s.type && 0 === _.filter(t, function(e) {
                    return parseInt(e) === s.banner_announcement_id
                }).length && new c({
                    prefix: this.prefix,
                    data: s
                }).open()
            }
        }
    }),
    require.config({
        urlArgs: "bust=" + (new Date).getTime(),
        baseUrl: "/src/student/js",
        paths: {
            shared: "../../shared/js",
            registry: "../../shared/js/registry",
            templates: "../../shared/js/templates"
        }
    }),
    require(["app"], function(t) {
        $(function() {
            var e = function() {
                t.initialize(),
                    svg4everybody()
            }
                .bind(this);
            window.__lessonsLoaded ? e() : $("#course-script").on("load", e)
        })
    }),
    define("main", function() { }),
    require(["app"]);
//# sourceMappingURL=app.min.js.map
//window.location.hash != "#nav" && window.location.pathname == "/student/lesson"
// if (window.location.pathname.indexOf("lesson/") > -1) { setInterval(()=>{
//     if (document.querySelector(".js-continue-button"))
//         document.querySelector(".js-continue-button").click();
//     else if (document.querySelector(".screenBasic-lines"))
//         jQuery._data(document, "events").keypress[0].handler();
//     else
//         document.querySelector("a.btn.btn--a").click();
// }, 100);
// }

function GetSeconds(typed) {
    return Math.round((12 * typed) / window.localStorage.getItem("wpm"));
}

if (window.localStorage.getItem("autoLesson") == "true") {
    setInterval(() => {
        if (document.querySelector(".js-continue-button")) document.querySelector(".js-continue-button").click();
        else document.querySelector("a.btn.btn--a").click();
    }, 100);
}

if (window.localStorage.getItem("autoType") == "true") {
    setInterval(() => {
        if (document.querySelector(".screenBasic-lines")) jQuery._data(document, "events").keypress[0].handler();
    }, 100);
}
