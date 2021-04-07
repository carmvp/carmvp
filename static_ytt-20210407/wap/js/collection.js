!function(e) {
    "use strict";
    var t = {
        localStorage: $cmsApi.localStorage(30),
        localKey: "collection",
        collection: function(e, t, i) {
            var s = '<div><div class="user_forme_tab_checked">    <label class="col-888">        <input type="checkbox" name="tow" />        <i class="iconfont"></i> <span user-num >已失效<i></i></span>    </label></div><ul class="goods-two user_goods_list" ></ul><div class="user_coll_main">    <div class="user_coll_h3">        <span>            <em></em>                <i class="iconfont icon-cainixihuan"></i>                为您精选            <em class="r"></em>        </span>    </div>    <ul class="goods-new row-s listlove"></ul></div><div>';
            return s = $(s),
            s.find(".user_goods_list").append(e),
            s.find(".user_goods_list").append(t),
            s.find(".listlove").append(i),
            0 == i.length && s.find(".user_coll_main").hide(),
            0 == t.length && s.find(".user_forme_tab_checked").remove(),
            0 == s.find(".user_goods_list").find("li").length && s.find(".user_goods_list").append(this.goodsListMsg()),
            s
        },
        goodsListMsg: function() {
            return '<div class="default_msg"><i class="iconfont icon-shoppingbag"></i>暂无收藏<p class="col-mar text-center"><a class="btn btn-primary btn-max" href="?r=web/index">去首页逛逛吧</a></p></div>'
        },
        getMorenTpl: function() {
            return '<div class="user_coll_def"><p class="img"></p> <div class="text">登录后添加收藏 <p class="msg">收藏云端同步，不错过任何优惠哦</p> </div><div class="but"><a class="btn btn-secondary btn-max" href="/?m=user&a=login">登录/注册</a></div></div>'
        },
        goodsListTplTwo: function(t, i, s, o) {
            for (var a = "",
            n = 0; n <= t.length - 1; n++) switch (o) {
            case 1:
                a = a + '<li class="row-s " ><div class="label"><label><input type="checkbox" value="' + t[n].id + '" name="item"><i class="iconfont"></i></label><p class="img"><a href="' + (t[n].jump_url ? t[n].jump_url: i + "&iid=" + t[n].id) + '" > ' + (t[n].end_days ? '<span class="end_time">券' + t[n].end_days + "天后失效</span>": "") + ' <img ui-lazyload src="' + (s || '/static/wap/images/rolling.gif" data-original="' + t[n].pic + '_310x310.jpg" alt=""></a></p><div class="cent"><a href="' + (t[n].jump_url ? t[n].jump_url: i + "&iid=" + t[n].id) + '" ><h3>' + t[n].d_title + '</h3></a><div class="num col-aaa"><span>' + (1 == t[n].istmall ? " 天猫价 ¥" + t[n].yuanjia: "淘宝价 ¥" + t[n].yuanjia) + '</span><span class="fr">已售' + $cmsApi.digitalAbbNumber(t[n].xiaoliang) + '件</span></div><div class="col-money money"><p class="quan fr"><i>' + t[n].quan_jine + '元券</i></p>券后价 <span class=""><i>¥</i>' + $cmsApi.accSub(t[n].yuanjia, t[n].quan_jine) + '</span></div></div><a data-id="' + t[n].id + '" class="remove btn btn-secondary">删除</a></div></li>';
                break;
            case 2:
                a = a + '<li class="row-s tow" ><div class="label"><label><input type="checkbox" value="' + t[n].id + '" name="item_tow"><i class="iconfont"></i></label><p class="img"><a href="' + (t[n].jump_url ? t[n].jump_url: i + "&iid=" + t[n].id) + '" ><span class="msg">券已失效</span><img ui-lazyload src="' + (s || '/static/wap/images/rolling.gif" data-original="' + t[n].pic + '_310x310.jpg" alt=""></a></p><div class="cent"><a href="' + (t[n].jump_url ? t[n].jump_url: i + "&iid=" + t[n].id) + '" ><h3>' + t[n].d_title + '</h3></a><div class="but money"><p class="fl col-888">券后价 <span class=""><i>¥</i>' + $cmsApi.accSub(t[n].yuanjia, t[n].quan_jine) + '</span><p class="fr"><a href="?r=p/similar&category_id=' + t[n].category_id + '" class="btn btn-primary btn-min">找相似</a></p></div></div><a data-id="' + t[n].id + '" class="remove btn btn-secondary">删除</a></div></li>';
                break;
            default:
                a += $cmsApi.goodsListTpl([t[n]], i)
            }
            return a
        },
        touch: {
            start: 0,
            move: 0,
            end: 0
        },
        touchInit: function(e, t) {
            var i = this;
            $(e).on("touchstart",
            function(e) {
                i.touch.start = 0,
                i.touch.end = 0,
                i.touch.start = e.originalEvent.targetTouches[0].pageX,
                $(e.target).parents("li").siblings().removeClass("active_r")
            }),
            $(e).on("touchmove",
            function(e) {
                var t = e.originalEvent.targetTouches[0].pageX;
                i.touch.move = t
            }),
            $(e).on("touchend",
            function(e) {
                i.touch.end = i.touch.move - i.touch.start;
                var t = i.touch.end < 0 ? -i.touch.end: i.touch.end;
                t > 40 && i.touch.end < 0 ? $(e.target).parents("li").addClass("active_r") : t > 40 && i.touch.end >= 0 && $(e.target).parents("li").removeClass("active_r")
            })
        }
    },
    i = function() {
        this.$scope = {
            type: 2,
            item: []
        },
        this.isMobile = !1
    };
    i.prototype.init = function(e, t) {
        this.$element = t,
        this.$scope = $.extend(!0, this.$scope, e),
        $cmsApi.loadAnimation(40),
        this.showTime()
    },
    i.prototype.cetCollection = function() {
        var e = [],
        i = t.localStorage.getLocalStorage(t.localKey);
        e = i ? i.data: e;
        var s = [];
        for (var o in e) JSON.stringify(e[o].item) == JSON.stringify(this.$scope.item) && delete e[parseInt(o)];
        for (var o in e) e[o] && e.length < 99 && s.push(e[o]);
        s.unshift({
            tiem: (new Date).getTime(),
            item: this.$scope.item
        }),
        t.localStorage.setLocalStorage(t.localKey, s),
        $cmsApi.loadAnimation(100)
    },
    i.prototype.showTime = function() {
        var e = t.localStorage.getLocalStorage(t.localKey),
        i = this;
        return $cmsApi.getCookie("TOKEN") ? void this.isItemList(e,
        function(e, s, o) {
            var a = $(t.goodsListTplTwo(e, i.$scope.openUrl, !1, 1)),
            n = $(t.goodsListTplTwo(s, i.$scope.openUrl, !1, 2)),
            c = $(t.goodsListTplTwo(o, i.$scope.openUrl));
            $(i.$element).html(t.collection(a, n, c)),
            $(i.$element).find("img").lazyload({
                effect: "fadeIn"
            }),
            t.touchInit(a),
            t.touchInit(n),
            $cmsApi.loadAnimation(100),
            $(".user_coll_edit_switch").unbind("touchend").on("touchend",
            function(e) {
                e.preventDefault(),
                $(this).data("type") && "no" == $(this).data("type") ? ($(this).html("编辑"), $(this).data("type", "off"), $(".user_coll_bottom,.user_forme_tab_checked,.user_goods_list li").removeClass("active"), $(".scroll_top").css({
                    bottom: "0px"
                })) : ($(this).html("完成"), $(".scroll_top").css({
                    bottom: "50px"
                }), $(this).data("type", "no"), $(".user_coll_bottom,.user_forme_tab_checked,.user_goods_list li").addClass("active")),
                i.showNum()
            }),
            $("input[type='checkbox']").unbind("change").on("change",
            function(e) {
                return ! i.isCheckedState && ($(this).is(":checked") && "all" == $(this).attr("name") ? $(".user_goods_list input[type='checkbox']").prop("checked", !0) : "all" == $(this).attr("name") && $(".user_goods_list input[type='checkbox']").prop("checked", !1), $(this).is(":checked") && "tow" == $(this).attr("name") ? $(".user_goods_list li.tow input[type='checkbox']").prop("checked", !0) : "tow" == $(this).attr("name") && $(".user_goods_list li.tow input[type='checkbox']").prop("checked", !1), void i.showNum())
            }),
            $(".removeCllectionItem").unbind("touchend").on("touchend",
            function(e) {
                var t = [];
                $.each($(".user_goods_list input[type='checkbox']:checked"),
                function(e, i) {
                    t.push($(this).val())
                }),
                i.hideRemove(t, $(".user_goods_list input[type='checkbox']:checked"))
            }),
            $(a).find(".remove").click(function() {
                i.hideRemove([$(this).data("id")], this)
            }),
            $(n).find(".remove").click(function() {
                i.hideRemove([$(this).data("id")], this)
            })
        }) : ($(this.$element).html(t.getMorenTpl()), $(".user_coll_edit_switch").hide(), $cmsApi.loadAnimation(100), !1)
    },
    i.prototype.isItemList = function(e, t) {
        $cmsApi.ajax({
            url: "?r=user/listajax",
            data: {
                token: $cmsApi.getCookie("TOKEN")
            },
            type: "post"
        }).done(function(e) {
            1 == e.status && t(e.data.eff, e.data.fai, e.data.like)
        })
    },
    i.prototype.showNum = function() {
        this.isCheckedState = !0;
        var e = $(".user_goods_list input[type='checkbox']:checked").length;
        e > 0 ? $("span[user-num]").addClass("col-666").find("i").html(e) : $("span[user-num]").removeClass("col-666").find("i").html(e),
        e == $(".user_goods_list input[type='checkbox']").length && $("input[name='all']").prop("checked", !0),
        function() {
            var e = !1;
            return $.each($(".user_goods_list input[type='checkbox']:checked"),
            function(t, i) {
                "item_tow" == $(this).attr("name") && (e = !0)
            }),
            e
        } () ? $("input[name='tow']").prop("checked", !0) : $("input[name='tow']").prop("checked", !1),
        this.isCheckedState = !1
    },
    i.prototype.hideRemove = function(e, t) {
        if (0 == e.length) return ! 1;
        var i = this;
        wui.layer.confirm("是否要删除收藏？", {
            btn: ["是", "否"]
        },
        function() {
            wui.layer.load(),
            $cmsApi.ajax({
                url: "?r=user/del",
                data: {
                    list: e,
                    token: $cmsApi.getCookie("TOKEN")
                },
                type: "post"
            }).done(function(e) {
                1 == e.status && ($(t).parents("li").fadeIn(400,
                function() {
                    $(this).remove()
                }), i.showNum()),
                layer.closeAll()
            })
        })
    },
    e.modelsCollection = new i
} (wui);