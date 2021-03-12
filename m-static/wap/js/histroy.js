!function(t) {
    var i = {
        copy: function(t) {
            if ("object" != typeof t) return t;
            var a = {};
            for (var e in t) a[e] = i.copy(t[e]);
            return a
        }
    },
    a = function(t, a) {
        var e = [];
        $.each(i.copy(t),
        function(t, i) {
            this.updatetime = Date.parse(new Date(this.updatetime.replace(/-/g, "/"))),
            e.push(this)
        }),
        this.dtk_data = e,
        this.goodsUrl = a,
        this.itemShow = [],
        this.pageConfig = {
            each: 20,
            page: 1,
            maxPage: e.length
        }
    };
    a.prototype.onSort = function(t, i) {
        var a = this.dtk_data;
        switch (t) {
        case "desc":
            a = _.sortBy(a,
            function(t) {
                return t[i]
            });
            break;
        case "asc":
            a = _.sortBy(a,
            function(t) {
                return - t[i]
            })
        }
        $(".sort_main").html(""),
        this.pageConfig.page = 1,
        this.dtk_data = a,
        this.onShowSort(),
        this.itemShow = [],
        $(window).scrollTop(0)
    },
    a.prototype.onShowSort = function() {
        var t = this.pageConfig;
        return !! this.pageConfig.page && (this.getPage(t.page), void(t.page = !(t.page >= Math.ceil(t.maxPage / t.each)) && t.page + 1))
    },
    a.prototype.getPage = function(t) {
        var a = this;
        a.itemShow = [],
        a.pageConfig.page && $.each(this.dtk_data,
        function(e, s) { (a.pageConfig.each * (t - 1) || 0) <= e && e <= a.pageConfig.each * t && a.itemShow.push(i.copy(s))
        }),
        this.moduleShow(1)
    },
    a.prototype.getNumberText = function(t) {
        if (t < 1e4) return t;
        var i = [],
        a = 0;
        t = (t || 0).toString().split("");
        for (var e = !1,
        s = t.length - 1; s >= 0; s--) a++,
        e && i.unshift(t[s]),
        a % 4 || 0 == s || e || (i.unshift(t[s]), i.unshift("."), e = !0);
        return i.join("") + "万"
    },
    a.prototype.moduleShow = function(t) {
        var i, a = this,
        e = "",
        s = .36 * $(window).width();
        this.itemShow.length > 0 ?
        function() {
            switch (t) {
            case 1:
                $.each(a.itemShow,
                function(t, n) {
                    var o = this;
                    e += i == this.id ||
                    function() {
                        var t = !1;
                        return $.each($(".goods-item"),
                        function(i, a) {
                            t = $(this).data("id") == o.id + "_" + o.jiage
                        }),
                        t
                    } () ? "": '<div class="goods-item clearfix"><a data-transition="slide" href="' + this.jump_url + '" class="img ui-link" style="min-height:' + s + 'px"><img src="' + this.pic + '"></a><div class="text"> <div><a data-transition="slide" href="' + this.jump_url + '" class="title ui-link">' + this.d_title + '</a><span class="coupon-wrapper  theme-bg-color-1">'+ this.shop +'券 <i>￥</i><b>' + this.quan_jine + '</b></span><div class="price-wrapper"><span class="price">￥<span>' + this.jiage + '</span></span><span class="price_yj">券后</span><div class="sold-wrapper"><span class="text">销量 </span><span class="sold-num">' + a.getNumberText(this.xiaoliang) + "</span></div></div></div></div></div>",
                    i = this.id
                })
            }
        } () : void 0,
        1 == a.pageConfig.page ? $(".sort_main").html(e).addClass("ads-list2") : $(".sort_main").append(e)
    },    
    t.$sort = a
} (window);