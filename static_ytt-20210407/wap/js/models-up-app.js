!function(t) {
    "use strict";
    var e = {
        template: function(t, e, o) {
            var s = "",
            i = "";
            switch (t.location) {
            case "top":
                s = "top:" + $(o).offset().top + "px;bottom:auto;",
                i = "icon-shang";
                break;
            case "bottom":
                s = "bottom:0px",
                i = "icon-shachu";
                break;
            default:
                return ""
            }
            return '<div class="up_app ' + t.location + '" style="' + s + '" ><div class="col-mar"><p class="img"><img src="' + e.icon + '" / ></p><div class="text"><p class="name">下载<span>' + e.name + 'App</span></p><p class="title">' + (e.desc || "&nbsp;") + '</span></p><a class="btn btn-secondary" href="' + e.url + '">立即下载</a><a class="close iconfont ' + i + '"></a></div></div></div>'
        }
    },
    o = function() {
        this.$scope = {
            url: "/?m=ajax&a=down",
            location: "bottom"
        }
    };
    o.prototype.init = function(t, e) {
        return this.$element = e,
        this.$scope = $.extend(!0, this.$scope, t),
        !$(this.$element).find(".up_app").length && !$cmsApi.getCookie("APP_UP_LOAD") && void this.showUp()
    },
    o.prototype.showUp = function(t) {
        var o, s = this;
        $cmsApi.ajax({
            url: this.$scope.url,
            type: "post",
            data: {
                token: $cmsApi.getCookie("MTA-USER-ID")
            }
        }).done(function(t) {
            if (1 == t.status) {
                if (o = $(e.template(s.$scope, t.data, s.$element)), $(s.$element).find(".up_app").length) return ! 1;
                $(s.$element).append(o),
                setTimeout(function() {
                    o.addClass("active")
                },
                1e3);
                var i = !0;
                $(document).scroll(function() {
                    i && (setTimeout(function() {
                        $cmsApi.setCookie("APP_UP_LOAD", !0, 1 / 12),
                        s.hideUp(o)
                    },
                    5e3), i = !1)
                }),
                o.find(".close").click(function(t) {
                    $cmsApi.setCookie("APP_UP_LOAD", !0, 1),
                    s.hideUp(o)
                })
            }
        })
    },
    o.prototype.hideUp = function(t) {
        t.removeClass("active"),
        setTimeout(function() {
            t.remove()
        },
        500)
    },
    t.modelsUpApp = new o
} (wui);