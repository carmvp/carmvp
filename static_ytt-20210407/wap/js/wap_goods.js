!function() {
	var $api = {
		page: 1,
		catSort: "t",		
		loaditem: [],
		getUrl: "",
		getCatItem: function(t) {
			var i = this;
			return $.ajax({
				url: this.getUrl,
				type: "GET",
				dataType: "json",
				data: t || {}
			}).error(function() {
				$cmsLayer.msg("服务器繁忙请稍后再试！")
			}).done(function(a) {
				return i.setLoadItem(i.getNumberId(t.cid), a)
			})
		},
		setLoadItem: function(t, i) {
			var a = 0;
			for (var e in this.loaditem) a > 15 && this.loaditem.splice(0, 1), a++;
			this.loaditem.push({
				key: t,
				item: i
			});
			var o = new Date;
			if (localStorage) try {
				localStorage.setItem("WAPGOODSCAT", JSON.stringify({
					time: o.getTime(),
					data: this.loaditem
				}))
			} catch (s) {}
			return this.loaditem[t]
		},
		getLoadItem: function(id) {
			var ret, loaditem = this.loaditem;
			if (localStorage) try {
				var item = eval("(" + localStorage.getItem("WAPGOODSCAT") + ")"),
					time = new Date;
				loaditem = item ? time.getTime() - item.time > 59e3 ? this.loaditem : item.data : this.loaditem, this.loaditem = loaditem
			} catch (e) {}
			for (var key in loaditem) loaditem[key].key == id && (ret = loaditem[key].item);
			return ret
		},
		getNumberId: function(t) {
			return this.page + this.catSort + t
		}
	},
		cmsCat = function(t, i) {
			this.el = ".goods-list", this.pageStatus = !0, this.cid = t.cid, $api.page = 1, $api.getUrl = t.getUrl, $api.catSort = t.catSort, $(this.el).html(""), this.init()
		};
	cmsCat.prototype.init = function() {
		var t = this,
			i = ".order-nav-bg",
			a = ".order-nav";
		this.scroll(), $(document).unbind("scroll").scroll(function() {
			return t.orderNavBgTop = $(i).offset().top, t.isClickScoll ? (t.isClickScoll = !1, !1) : ($(document).scrollTop() >= t.orderNavBgTop - 47 - 98 ? ($(".order-nav-bg").css("height", "47px"), $(a).css({
				top: "88px",
				position: "fixed"
			})) : ($(".order-nav-bg").css("height", "0"), $(a).css({
				top: "0px",
				position: "relative"
			})), void($(document).scrollTop() >= $(document).height() - $(window).height() - 150 && t.scroll()))
		}), $(".order-nav a").unbind("click").on("click", function() {
			return $api.catSort = $(this).data("sort"), $(this).parents("ul").find("li").removeClass("theme-border-bottom-color-1").removeClass("cur").find("a").removeClass("theme-color-1").find("span").removeClass("ico-down").removeClass("ico-up"), $(this).addClass("theme-color-1").parents("li").addClass("theme-border-bottom-color-1").addClass("cur"), "price" == $api.catSort ? ($(this).find("span").addClass("ico-up").removeClass("ico-down"), $(this).data("sort", "price_h")) : "price_h" == $api.catSort && ($(this).find("span").addClass("ico-down").removeClass("ico-up"), $(this).data("sort", "price")), $api.page = 1, t.scroll(function(i) {
				setTimeout(function() {
					0 != $(".order-nav-bg").height() && (t.isClickScoll = !0, $(".order-nav-bg").height(0), $(window).scrollTop((t.orderNavBgTop || $(".order-nav-bg").offset().top) - 30 - 98))
				}, 100)
			}), !1
		})
	}, cmsCat.prototype.scroll = function(t) {
		t = t ||
		function() {};
		var i = this;
		if (0 == this.pageStatus) return $(i.el).append('<div class="pullup-goods"><div class="label">商品已经加载完毕！</div></div>'), !1;
		if (this.isAjax) return !1;
		this.isAjax = !0;
		var a = $api.getLoadItem($api.getNumberId(this.cid));
		return a ? (t(!0), this.showItem(a), !1) : ($(".cat_tab_list_load").show(), void $api.getCatItem({
			px: $api.catSort,
			cid: this.cid,
			page: $api.page			
		}).done(t.bind(this, !1)).done(this.showItem.bind(this)).error(function() {
			$(".cat_tab_list_load").hide()
		}))
	}, cmsCat.prototype.showItem = function(t) {
		var i = this,
			a = $("<div>" + t.data.content + "</div>").addClass("lazy" + $api.page);
		1 == $api.page ? $(i.el).html(a) : $(i.el).append(a), $(".lazy" + $api.page + " img.lazy").lazyload({
			effect: "fadeIn"
		}), i.pageStatus = t.data.pageStatus, $api.page = $api.page + 1, i.isAjax = !1, $(".cat_tab_list_load").fadeOut(400)
	}, window.cmsCat = cmsCat
}();