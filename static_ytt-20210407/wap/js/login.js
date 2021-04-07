!function(e) {
    "use strict";
    var t = {
        setLoginRegister: "/?m=user&a=register",
        setLoginLogin: "/?m=user&a=login",
        getLoginCodeeg: "/?m=user&a=codeeg",
        getLoginCodelg: "/?m=user&a=codelg",
        getLoginCodefg: "/?m=user&a=codefg",
        getIsLogin: "/?m=user&a=index",
        test: {
			email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            phone: /^[1][3,4,5,6,7,8][0-9]{9}$/,
            password: /^[A-Za-z0-9]{8,18}$/
        },
        getParam: function(e) {
            var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
            n = window.location.search.substr(1).match(t);
            return null != n ? unescape(n[2]) : null
        }
    },
    n = function() {
        this.$scope = {
            type: 1
        },
        this.isMobile = !1
    };
    n.prototype.init = function(e, n) {
        this.$element = n,
        this.$scope = $.extend(!0, this.$scope, e),
        this.openUrl = t.getParam("returnUrl") || this.$scope.returnUrl || "/?m=user&a=index";
        var i = $cmsApi.getCookie("TOKEN"),
        o = this;
        if (i) {
            if (this.$scope["switch"]) return this.initForm(),
            !1;
            $cmsApi.ajax({
                url: t.getIsLogin,
                data: {
                    token: i
                },
                type: "POST"
            }).done(function(e) {
                1 == e.status ? window.location.replace(o.openUrl) : ($cmsApi.delCookie("trace_id"), o.initForm())
            }).error(function(e) {
                $cmsApi.delCookie("trace_id"),
                o.initForm()
            })
        } else this.initForm()
    },
    n.prototype.initForm = function() {
        $(this.$element).submit(this.setFormItem.bind(this));
        var e = this;
        setTimeout(function() {
            e.verification(e.$element)
        },
        1e3),
        $(this.$element).find(".close").unbind("click").on("click",
        function() {
            $(this).parent().find("input").val(""),
            e.verification(e.$element)
        }),
        $(this.$element).find(".showPassword").unbind("click").on("click",
        function() {
            var e = $(this).parent().find("input");
            "text" == e.attr("type") ? (e.attr("type", "password"), $(this).addClass("icon-eyeclose").removeClass("icon-eyeopen")) : ($(this).removeClass("icon-eyeclose").addClass("icon-eyeopen"), e.attr("type", "text"))
        });
        var n = !1;
        $(this.$element).find("input[name]").unbind("keydown").on("keydown",
        function() {
            n || (n = !0, setTimeout(function() {
                n = !1,
                e.verification(e.$element)
            },
            100))
        }),
        $(this.$element).find(".getEmail").unbind("click").on("click",
        function() {
            var n = this,
            i = $(this).parents("form").find("input[name='email']");
            return "" != i.val() && t.test.email.test(i.val()) ? void(e.isMobile || e.noCaptcha(this,
            function(t) {
                e.setTime(n, t)
            })) : (i.parents(".form_input_item").attr("error", !0), setTimeout(function() {
                i.parents(".form_input_item").attr("error", !0)
            },
            100), !1)
        })
    },
    n.prototype.noCaptcha = function(e, t) {
        var n = "nc" + parseInt(1e3 * Math.random()),
        i = $('<div id="__' + n + '" class="noCaptcha">    <div id="' + n + '"></div></div>');
		var phonenum = $("input[name='phone']").val();
        $(e).parent().parent().append(i);
        var o = $(e).data("nc_appkey"),
        a = $(e).data("scene"),
        r = [o, (new Date).getTime(), Math.random()].join(":"),
        s = NoCaptcha.init({
            renderTo: "#" + n,
            appkey: o,
            scene: a,
            token: r,
            bannerHidden: !1,
            callback: function(e) {
                t({
                    csessionid: e.csessionid,
                    sig: e.sig,
                    token: r,
                    scene: a,
					phone:phonenum
                }),
                setTimeout(function() {
                    i.fadeOut("400",
                    function() {
                        i.remove()
                    })
                },
                1e3)
            },
            error: function(e) {
                console.log(e)
            }
        });
        s.on("fail",
        function(t) {
            $(e).parents(".form_input_item").css({
                "z-index": 80
            })
        }),
        NoCaptcha.setEnabled(!0),
        NoCaptcha.upLang("cn", {
            LOADING: "加载中...",
            SLIDER_LABEL: "请向右滑动验证",
            CHECK_Y: "验证通过",
            ERROR_TITLE: "非常抱歉，这出错了",
            CHECK_N: "验证未通过",
            OVERLAY_INFORM: "经检测你当前操作环境存在风险，请输入验证码",
            TIPS_TITLE: "验证码错误，请重新输入"
        }),
        s.reset()
    },
    n.prototype.setTime = function(e, n) {
        if (this.isMobile) return ! 1;
        var i = this,
        o = function() {
            var t = 59,
            n = $(e).html(),
            o = setInterval(function() {
                t <= 0 ? ($(e).html(n), i.isMobile = !1, clearInterval(o)) : $(e).html(t + "秒后,重新发送"),
                t--
            },
            1e3)
        },
        a = $(e).parents("form").find("input[name='email']");
        return "" != a.val() && t.test.email.test(a.val()) ? (this.isMobile = !0, n.email = a.val(), $cmsApi.loadAnimation(50), void $cmsApi.ajax({
            url: $(e).data("url"),
            type: "post",
            data: n
        }).done(function(e) {
            1 == e.status ? o() : i.isMobile = !1,
            $cmsApi.loadAnimation(100)
        }).error(function(e) {
            i.isMobile = !1
        })) : (a.parents(".form_input_item").attr("error", !0), setTimeout(function() {
            a.parents(".form_input_item").attr("error", !0)
        },
        100), !1)
    },
    n.prototype.verification = function(e) {
        var n = !0,
        i = {},
        o = $(e).serializeArray(),
        a = "",
        r = function(e) {
            "password" == e.name && (a = e.value),
            $("input[name='" + e.name + "']").parents(".form_input_item").removeAttr("error"),
            "phone" != e.name || "" == e.value || t.test.phone.test(e.value) ? "phone" == e.name && "" == e.value && (n = !1) : (n = !1, $("input[name='" + e.name + "']").parents(".form_input_item").attr("error", !0)),
			"email" != e.name || "" == e.value || t.test.email.test(e.value) ? "email" == e.name && "" == e.value && (n = !1) : (n = !1, $("input[name='" + e.name + "']").parents(".form_input_item").attr("error", !0)),
            "code" == e.name && "" != e.value && 6 != e.value.length ? (n = !1, $("input[name='" + e.name + "']").parents(".form_input_item").attr("error", !0)) : "code" == e.name && "" == e.value && (n = !1),
            "password" != e.name || "" == e.value || t.test.password.test(e.value) ? "password" == e.name && "" == e.value && (n = !1) : (n = !1, $("input[name='" + e.name + "']").parents(".form_input_item").attr("error", !0)),
            "repassword" == e.name && a != e.value ? (n = !1, $("input[name='" + e.name + "']").parents(".form_input_item").attr("error", !0)) : "repassword" == e.name && "" == e.value && (n = !1),
            "verify" == e.name && "" == e.value ? (n = !1, $("input[name='" + e.name + "']").parents(".form_input_item").attr("error", !0)) : "verify" == e.name && "" == e.value && (n = !1),
            n ? $("input[name='" + e.name + "']").parents("form").find("input[type='submit']").addClass("btn-primary").removeClass("btn-default") : $("input[name='" + e.name + "']").parents("form").find("input[type='submit']").removeClass("btn-primary").addClass("btn-default"),
            i[e.name] = e.value
        };
        return $.each(o,
        function(e, t) {
            r(t)
        }),
        [n, i]
    },
    n.prototype.setFormItem = function(e) {
        var t = (this.$scope, this.verification(this.$element));
        return this.foremItem = t[1],
        t[0] && ($cmsApi.loadAnimation(50), $cmsApi.ajax({
            url: this.$scope.url,
            type: "post",
            data: t[1]
        }).done(this.showClass.bind(this)).error(function(e) {
            $cmsApi.loadAnimation(100)
        })),
        !1
    },
    n.prototype.showClass = function(e) {
        var t = this;
        $cmsApi.loadAnimation(100),
        1 == e.status && (layer.msg(e.msg), e.data.code_msg && $cmsApi.setCookie("user_id", e.data.code_msg, 30), e.data.token && $cmsApi.setCookie("TOKEN", e.data.token, 30), e.data.trace_id && $cmsApi.setCookie("trace_id", e.data.trace_id), setTimeout(function() {
            window.location.replace(t.openUrl)
        },
        1e3))
    },
    e.modelsLogin = new n
} (wui);