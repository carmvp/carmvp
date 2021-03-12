!function(t) {
    "use strict";
    var i = {
        localStorage: $cmsApi.localStorage(30),
        localKey: "FOOTPRINT",
        footprint: function(t, i) {
            var e = '<div><ul class="goods-two user_goods_list list" ></ul><div class="user_coll_main">    <div class="user_coll_h3 two">        <span>            <em></em>                已失效            <em class="r"></em>        </span>    </div>    <ul class="goods-two user_goods_list listTwo" ></ul></div></div>';
            return e = $(e),
            e.find(".list").append(t),
            e.find(".listTwo").append(i),
            0 == i.length && e.find(".user_coll_main").hide(),
            e
        },
        goodsListMsg: function() {
            return '<div class="default_msg"><i class="iconfont icon-shoppingbag"></i>暂无足迹内容</div>'
        },
        goodsListTplTwo: function(i, e, a, o) {
            for (var s = "",
            n = 0; n <= i.length - 1; n++) s = o ? s + '<li class="row-s " >    <div class="label">    <p class="img"><a href="' + e + "&iid=" + i[n].item.id + '&source=re" ><span class="msg">已失效</span><img ui-lazyload src="' + (a || '/static/wap/images/rolling.gif" data-original="' + i[n].item.pic + '_310x310.jpg" alt=""></a></p>        <div class="cent">        <a href="' + e + "&iid=" + i[n].item.id + '" ><h3>' + i[n].item.d_title + '</h3></a>    <div class="but money">        <p class="fl col-888">券后价 <span class=""><i>¥</i>' + parseFloat($cmsApi.accSub(i[n].item.yuanjia, i[n].item.quan_jine)) + '</span>        <p class="fr">            <a href="?r=p/similar&category_id=' + i[n].item.category_id + '" class="btn btn-primary btn-min">找相似</a>        </p>    </div>        </div>        <a data-id="' + i[n].item.id + '" class="remove btn btn-secondary">删除</a>    </div></li>': s + '<li class="row-s " >    <div class="label">    <p class="img"><a href="' + e + "&iid=" + i[n].item.id + '&source=re" ><img ui-lazyload src="' + (a || '/static/wap/images/rolling.gif" data-original="' + i[n].item.pic + '_310x310.jpg" alt=""></a></p>        <div class="cent">        <a href="' + e + "&iid=" + i[n].item.id + '&source=re" ><h3>' + i[n].item.d_title + '</h3></a>        <div class="num col-aaa">            <span>' + (1 == i[n].item.istmall ? " 天猫价 ¥" + parseFloat(i[n].item.yuanjia) : "淘宝价 ¥" + parseFloat(i[n].item.yuanjia)) + '</span><span class="fr">已售' + $cmsApi.digitalAbbNumber(i[n].item.xiaoliang) + '件</span>        </div>        <div class="money col-money">        <p class="quan fr"><i>' + parseFloat(i[n].item.quan_jine) + '元券</i></p>券后价 <span class=" "><i>¥</i>' + parseFloat($cmsApi.accSub(i[n].item.yuanjia, i[n].item.quan_jine)) + '</span>        </div>        </div>        <a data-id="' + i[n].item.id + '" class="remove btn btn-secondary">删除</a>    </div></li>';
            return s
        },
        removeItem: function(t, e) {
            $.each(t.data,
            function(i, a) {
                $.each(e,
                function(e, o) {
                    parseInt(a.item.id) == parseInt(o) && delete t.data[i]
                })
            });
            var a = [];
            $.each(t.data,
            function(t, i) {
                i && a.push(i)
            }),
            0 == a.length ? ($(".layout").html(i.goodsListMsg()), i.localStorage.removeLocalStorage(i.localKey)) : i.localStorage.setLocalStorage(i.localKey, a)
        },
        removeItemAll: function() {
            wui.layer.confirm("是否要删除足迹？", {
                btn: ["是", "否"]
            },
            function() {
                $(".layout >*").remove(),
                i.localStorage.removeLocalStorage(i.localKey),
                $(".layout").html(i.goodsListMsg()),
                layer.closeAll()
            })
        },
        touch: {
            start: 0,
            move: 0,
            end: 0
        },
        touchInit: function(t, i) {
            var e = this;
            $(t).on("touchstart",
            function(t) {
                e.touch.start = 0,
                e.touch.end = 0,
                e.touch.start = t.originalEvent.targetTouches[0].pageX,
                $(t.target).parents("li").siblings().removeClass("active_r")
            }),
            $(t).on("touchmove",
            function(t) {
                var i = t.originalEvent.targetTouches[0].pageX;
                e.touch.move = i
            }),
            $(t).on("touchend",
            function(t) {
                e.touch.end = e.touch.move - e.touch.start;
                var i = e.touch.end < 0 ? -e.touch.end: e.touch.end;
                i > 40 && e.touch.end < 0 ? $(t.target).parents("li").addClass("active_r") : i > 40 && e.touch.end >= 0 && $(t.target).parents("li").removeClass("active_r")
            })
        }
    },
    e = function() {
        this.$scope = {
            type: 2,
            item: [],
            openUrl: "index.php?r=p/dnew"
        },
        this.isMobile = !1
    };
    e.prototype.init = function(t, i) {
        this.$element = i,
        this.$scope = $.extend(!0, this.$scope, t),
        $cmsApi.loadAnimation(40),
        1 === parseInt(this.$scope.type) ? this.setFootprint() : this.showTime()
    },
    e.prototype.setFootprint = function() {
        var t = [],
        e = i.localStorage.getLocalStorage(i.localKey);
        t = e ? e.data: t;
        var a = [],
        o = {
            id: this.$scope.item.id,
            pic: this.$scope.item.pic,
            d_title: this.$scope.item.d_title,
            quan_jine: this.$scope.item.quan_jine,
            yuanjia: this.$scope.item.yuanjia,
            quan_jine: this.$scope.item.quan_jine,
            istmall: this.$scope.item.istmall,
            yuanjia: this.$scope.item.yuanjia,
            yuanjia: this.$scope.item.yuanjia,
            xiaoliang: this.$scope.item.xiaoliang,
            category_id: this.$scope.item.category_id
        };
        for (var s in t) JSON.stringify(t[s].item) == JSON.stringify(o) && delete t[parseInt(s)];
        for (var s in t) t[s] && t.length < 99 && a.push(t[s]);
        a.unshift({
            tiem: (new Date).getTime(),
            item: o
        }),
        i.localStorage.setLocalStorage(i.localKey, a),
        $cmsApi.loadAnimation(100)
    },
    e.prototype.showTime = function() {
        var t = i.localStorage.getLocalStorage(i.localKey),
        e = this;
        t ? this.isItemList(t,
        function(t, a) {
            var o = $(i.goodsListTplTwo(t, e.$scope.openUrl)),
            s = $(i.goodsListTplTwo(a, e.$scope.openUrl, !1, 2));
            $(e.$element).html(i.footprint(o, s)),
            $(e.$element).find("img").lazyload({
                effect: "fadeIn"
            }),
            i.touchInit(o),
            i.touchInit(s),
            $(o).find(".remove").click(e.hideRemove.bind(e)),
            $(s).find(".remove").click(e.hideRemove.bind(e)),
            $(".removeAll").click(function() {
                i.removeItemAll()
            }),
            $cmsApi.loadAnimation(100)
        }) : ($(this.$element).html(i.goodsListMsg()), $cmsApi.loadAnimation(100))
    },
    e.prototype.isItemList = function(t, i) {
        var e = [];
        $.each(t.data,
        function(t, i) {
            e.push(i.item.id)
        });
        var a = [],
        o = [];
        $cmsApi.ajax({
            url: "?r=user/pastdue",
            data: {
                list: e
            },
            type: "post"
        }).done(function(e) {
            $.each(t.data,
            function(t, s) { !
                function() {
                    var t = !1;
                    return $.each(e.data,
                    function(i, e) {
                        e == s.item.id && (t = !0)
                    }),
                    t
                } () ? o.push(s) : a.push(s),
                i(a, o)
            })
        })
    },
    e.prototype.hideRemove = function(t) {
        var e = i.localStorage.getLocalStorage(i.localKey);
        setTimeout(function() {
            $(t.target).parents("li").fadeIn(400,
            function() {
                $(this).remove(),
                i.removeItem(e, [$(t.target).data("id")])
            })
        },
        300)
    },
    t.modelsFootprint = new e
} (wui);