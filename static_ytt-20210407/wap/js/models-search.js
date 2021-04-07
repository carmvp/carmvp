!function(t) {
    "use strict";
    var e = {
        localStorageKey: "SEARCH",
        localStorage: $cmsApi.localStorage(30),
        templateWords: function(t, e) {
            var a = "";
            return $.each(t,
            function(t, i) {
                a = a + '<li >    <div class="col-mar row-s">        <div class="col-12-10 text-left"  search-key data-key="' + i + '" >        ' + i.replace(e, "<span>" + e + "</span>") + '        </div>        <div class="col-12-2 text-right">            <i class="iconfont icon-arrow addWords" data-key="' + i + '"></i>        </div>    </div></li>'
            }),
            a
        },
        templateWindvaneHot: function(t) {
            var e = "";
            return $.each(t,
            function(t, a) {
                e = e + '<a href="' + a.url + '">' + ("" != a.tag ? "<i>" + a.tag + "</i>": "") + "<span>" + a.name + "</span></a>"
            }),
            e = "" === e ? "": '<dl class="search_hot_act col-mar"><dt>大家都在搜</dt><dd>' + e + "</dd></dl>"
        },
        templateWindvane: function(t) {
            var e = "";
            return $.each(t,
            function(t, a) {
                e = e + '<dd search-key data-key="' + a.title + '" ><div class="col-mar row-s"><div class="col-12-6 text-left"><b class="b' + (t + 1) + '">' + (t + 1) + "</b>" + a.title + '</div><div class="col-12-6 text-right">' + a.num + ' <span class="hot' + a.tag + (0 == parseInt(a.tag) ? " out": "") + '">' + (1 == parseInt(a.tag) ? "热": "新") + "</span></div></div></dd>"
            }),
            e = "" === e ? "": '<div class="hr"></div><dl class="search_hot_list"><dt class="col-mar">热搜风向标</dt>' + e + "</dl>"
        },
        templateLocal: function() {
            var t = this.localStorage.getLocalStorage(this.localStorageKey),
            e = [];
            e = t ? t.data: e;
            var a = "";
            return $.each(e,
            function(t, e) {
                a = a + '<a search-key data-key="' + e + '" ><span>' + e + "</span></a>"
            }),
            a = "" === a ? "": '<dl style="max-height:143px; margin-bottom:10px;" class="search_hot_act col-mar"><dt>历史搜索<i class="iconfont icon-shanchu" del-local ></i></dt><dd>' + a + "</dd></dl>"
        },
        template: function(t, e, a) {
            var i = $("<form id='search_header' action='" + window.location.origin + window.location.pathname + "' style='position: relative; z-index:198;' method='GET' ></form>");
            return i.append('<div class="header_pr"><input type="hidden" name="r"  value="index/wapsearch" />    <div class="search_term " style="height:' + $(window).height() + 'px">        <div class="cent">             <ul class="search_act_list" style="display: none;">            </ul>            <div class="search_hot_cent">' + this.templateWindvaneHot(e.hot) + this.templateLocal() + this.templateWindvane(e.vane) + '              </div>        </div>    </div>    <header class="icon_header">        <a class="iconfont icon-zuojiantou ui-back"  ></a>        <div class="search">            <div class="icon_search result ' + (t.kw ? "": "active") + '">                <i class="iconfont icon-detail_search search_detail"></i>                <lable class="icon_tab"><span>' + (t.kw && t.kw.length >= 7 ? t.kw.substr(0, 7) + "...": t.kw) + '</span><i class="iconfont icon-shachu"></i></lable>                <div class="inputtext">                    <input type="text" name="kw" autocomplete="off" value="' + (t.kw || "") + '" placeholder="' + (e["default"] ? e["default"].name: "输入商品名或粘贴淘宝标题") + '" />                    <i class="iconfont icon-closecircle close"></i>                </div>                <input type="submit" class="sbumit" value="搜索" />            </div>        </div>    </header></div><div class="header_bg"></div>'),
            i
        },
        localKw: ""
    },
    a = function() {
        this.$scope = {
            url: "?r=index/getwords",
            windvaneUrl: "?r=index/windvane",
            id: "#search_header"
        },
        this.windvaneItem = !1
    };
    a.prototype.init = function(t, a) {
        this.$element = a,
        this.$scope = $.extend(!0, this.$scope, t),
        this.isClossKw = 2,
        e.localKw = this.$scope.kw;
        var i = this;
        this.$scope.kw || "" == this.$scope.kw ? this.getWindvane(function(t) {
            i.$searchEvent = e.template(i.$scope, t),
            i.searchHeader(i.$searchEvent)
        }) : i.getWindvane(function(t) {
            i.$searchEvent = e.template(i.$scope, t),
            i.windvaneItem["default"] && $(i.$element).find(".icon_search").text(i.windvaneItem["default"].name),
            $(a).on("click",
            function() {
                i.showSearch(i.$searchEvent)
            }),
            "" == i.$scope.kw && i.showSearch(i.$searchEvent),
            $cmsApi.loadAnimation(100)
        })
    },
    a.prototype.getWindvane = function(t) {
        var e = this;
        return this.windvaneItem ? (t(this.windvaneItem), !1) : ($cmsApi.loadAnimation(50), void $cmsApi.ajax({
            url: this.$scope.windvaneUrl
        }).done(function(a) {
            e.windvaneItem = a.data,
            t(a.data)
        }))
    },
    a.prototype.showSearch = function(t) {
        var e = this;
        0 === $(this.$scope.id).length ? ($("body").append(t), this.resultInit(), t.show()) : (t.show(), setTimeout(function() {
            e.$searchEvent.find("input[type='text']").focus()
        },
        600)),
        setTimeout(function() {
            $("html").addClass("ov_h"),
            e.$searchEvent.find(".search_term").css({
                height: $(window).height() + "px"
            }).addClass("active")
        },
        1)
    },
    a.prototype.scrollTop = 0,
    a.prototype.isShowSearch = function(t) {
        var e = this;
        t ? ($("html").removeClass("ov_h"), setTimeout(function() {
            $(window).scrollTop(e.scrollTop)
        },
        100)) : (this.scrollTop = $(window).scrollTop(), $("html").addClass("ov_h"))
    },
    a.prototype.searchHeader = function(t) {
        var e = this;
        $(this.$element).html(t.show()),
        this.resultInit(),
        t.find(".inputtext input").click(function(a) {
            $(this).parent().parent().hasClass("active") || ($(this).parent().parent().addClass("active"), t.find(".search_term").css({
                height: $(window).height() + "px"
            }).addClass("active"), $(this).val(e.$scope.kw)),
            $(this).focus(),
            e.isClossKw = 0,
            $("html").addClass("ov_h")
        }),
        t.find(".icon_tab").click(function(a) {
            $(this).parent().hasClass("active") || ($(this).parent().addClass("active"), t.find(".search_term").css({
                height: $(window).height() + "px"
            }).addClass("active"), t.find(".inputtext input").val("").focus()),
            e.isClossKw = 0,
            $("html").addClass("ov_h")
        })
    },
    a.prototype.resultInit = function() {
        var t, a = this;
        $("html").addClass("ov_h"),
        this.$searchEvent.find("input[type='text']").focus(function(e) {
            var i = this,
            s = "";
            t = setInterval(function() {
                "" != $(i).val() && $(i).parent().find(".close").show(),
                s = e.target.value,
                a.getKeydoWnords(e.target.value)
            },
            1e3)
        }).blur(function(e) {
            setTimeout(function() {
                $(e.target).parent().find(".close").hide()
            },
            100),
            clearInterval(t)
        }),
        setTimeout(function() {
            a.$searchEvent.find("input[type='text']").focus()
        },
        100),
        this.$searchEvent.find(".inputtext .close").on("click",
        function(t) {
            $(this).parent().find("input").val("").focus(),
            a.getKeydoWnords("")
        }),
        this.$searchEvent.find(".ui-back").unbind("click").on("click",
        function(t) {
            a.$scope.kw || "" == a.$scope.kw ? (2 === a.isClossKw && (1 == window.history.length ? window.location.href = window.location.origin : window.history.go( - 1)), a.isClossKw = 0 === a.isClossKw ? 2 : 0, a.$searchEvent.find(".search_term,.icon_search").removeClass("active")) : (a.$searchEvent.hide(), a.$searchEvent.find(".search_term").removeClass("active")),
            $("html").removeClass("ov_h")
        }),
        this.$searchEvent.find("*[search-key]").on("click",
        function() {
            a.setSubmitValue(this)
        }),
        this.$searchEvent.find("*[del-local]").on("click",
        function() {
            e.localStorage.removeLocalStorage(e.localStorageKey),
            $(this).parents(".search_hot_act ").remove()
        }),
        $(this.$scope.id).submit(function(t) {
            var e = $(this).find('input[name="kw"]').blur().val();
            return ! a.windvaneItem["default"] || e != a.windvaneItem["default"].name && "" != e ? "" == e || /^[\s]*$/.test(e) ? (layer.tips("请输入搜索关键词", $(this).find(".icon_search"), {
                tips: [3, "#FFBA3E"],
                time: 3e3
            }), $(this).find('input[name="kw"]').focus(), !1) : i() : (window.location.href = a.windvaneItem["default"].url, !1)
        });
        var i = function(t) {
            var i = $(a.$scope.id).find('input[name="kw"]').val(),
            s = e.localStorage,
            n = [],
            o = s.getLocalStorage(e.localStorageKey);
            n = o ? o.data: n;
            var c = [];
            for (var l in n) n[l] == i && delete n[parseInt(l)];
            for (var l in n) n[l] && n.length < 30 && c.push(n[l]);
            c.unshift($("<div>" + i + "</div>").text()),
            s.setLocalStorage(e.localStorageKey, c),
            a.$scope.callback ? (a.$searchEvent.find(".search_term,.icon_search").removeClass("active"), $(a.$scope.id).find(".icon_tab span").html(i.length >= 7 ? i.substr(0, 7) + "...": i), a.$scope.kw = i) : (a.$searchEvent.hide(), a.$searchEvent.find(".search_term").removeClass("active")),
            $("html").removeClass("ov_h");
            var r = !a.$scope.callback || "" == i || a.$scope.callback($(a.$scope.id));
            return r
        };
        "" != $(this.$scope.id).find('input[name="kw"]').val() ? i() : (this.isClossKw = 2, $cmsApi.loadAnimation(100), this.$searchEvent.find(".search_term").css({
            height: $(window).height() + "px"
        }).addClass("active"))
    },
    a.prototype.setSubmitValue = function(t) {
        var e = $("<div>" + $(t).data("key") + "</div>").text();
        this.$searchEvent.find("input[type='text']").val(e).parents("form").submit()
    },
    a.prototype.getKeydoWnords = function(t) {
        var a = this;
        return "" == t ? ($(a.$scope.id).find(".search_act_list").hide(), $(a.$scope.id).find(".search_hot_cent").show(), !1) : t != e.localKw && (e.localKw = t, void $cmsApi.ajax({
            url: this.$scope.url,
            data: {
                word: t
            }
        }).done(function(i) {
            if (1 == i.status && 0 !== i.data.length) {
                var s = $(e.templateWords(i.data, t));
                $(a.$scope.id).find(".search_act_list").html(s).show(),
                s.find(".addWords").click(function(t) {
                    var e = $("<div>" + $(this).data("key") + "</div>").text();
                    a.$searchEvent.find("input[type='text']").val(e).focus()
                }),
                s.find("*[search-key]").on("click",
                function() {
                    a.setSubmitValue(this)
                }),
                $(a.$scope.id).find(".search_hot_cent").hide()
            }
        }))
    },
    t.modelsUiSearch = new a
} (wui);