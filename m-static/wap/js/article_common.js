function topSearchWid() {
	if ($(".main-back").length > 0) {
		Math.ceil($(".main-title").width()) - Math.ceil($(".main-back").width()) - 85
	} else {
		for (var t = 0, a = 0; a < $(".mui-action-menu").length; a++) t += $(".mui-action-menu").eq(a).width();
		Math.ceil($(".main-title").width()) - Math.ceil($(".main-logo").width()) - Math.ceil(t) - 10
	}
}
function hideCate() {
	$(".menu-content").removeClass("show1"), $(".myco1").removeClass("show"), $("#menu-mask").removeClass("show"), $(".menu-cat") && $(".menu-cat i").removeClass("show"), setTimeout(function() {
		$("#show-top-menu").css("z-index", -1)
	}, 400)
}
function setState(t) {
	var a = "";
	$(".goods-list") ? a = $(".goods-list") : $(".first-list") ? a = $(".goods-list") : $(".ads-list") && (a = $(".ads-list"));
	var e = window.location.href,
		i = {
			url: e,
			list: a.html(),
			title: "",
			page: t
		};
	window.history.state ? window.history.replaceState(i, null, e) : window.history.pushState(i, null, e)
}
function aClick() {
	$(".goods-list a").click(function(t) {
		if (t.preventDefault(), $(".goods-list")) var a = $(".goods-list").data("page");
		else if ($(".ads-list")) var a = $(".ads-list").data("page");
		else if ($(".first-list")) var a = $(".first-list").data("page");
		else var a = 0;
		$(this).hasClass("tb_app") || setState(a);
		var e = navigator.userAgent.toLowerCase();
		$(this).hasClass("ui-link") && "micromessenger" == e.match(/MicroMessenger/i) || (window.location.href = $(this).attr("href"))
	})
}


var mainTitle = ".main-title",
	cms_ua = navigator.userAgent.toLowerCase(),
	isFocus = 0;
$(window).scroll(function(t) {
	if (!a) var a = navigator.userAgent.toLowerCase();
	if ("iphone" == a.match(/iphone/i) || "ipad" == a.match(/ipad/i)) if ($(".search_area").is(":focus") && isFocus) {
		var e = $(document).scrollTop();
		$(document).scrollTop(e), $(mainTitle).css({
			position: "absolute",
			top: e
		})
	} else $(mainTitle).css({
		position: "fixed",
		top: 0
	})
});
var oPh = $(".search_area").attr("placeholder");
$(".search") && topSearchWid(), $(window).resize(function() {
	$(".search") && topSearchWid()
}), $(".up-menu,#menu-mask").click(function() {
	hideCate()
}), $("#menu-mask2").click(function() {
	$("#detail-top-menu").removeClass("show")
});
var isTimeTitle = 0;	
$(".main-title,.main-open").click(function(t) {
	if (isTimeTitle > 0) return !1;	
	var a = setInterval(function() {
		isTimeTitle++, isTimeTitle > 6 && (isTimeTitle = 0, clearInterval(a))
	}, 100);
	"mui-action-menu" == t.target.id || "menu-cat-btn" == t.target.id || "menu-cat-btn" == t.target.parentNode.id ? ($("#menu-mask2").click(), $("#menu-mask").hasClass("show") ? hideCate() : ($("#show-top-menu").css("z-index", 100), $(".myco1").addClass("show"), $(".menu-content").addClass("show1"), $("#menu-mask").addClass("show"), $(".menu-cat") && $(".menu-cat i").addClass("show"))) : (hideCate(), $("#detail-top-menu").hasClass("show") ? $("#menu-mask2").click() : "cat-action-menu" == t.target.id && $("#detail-top-menu").addClass("show"))
}), $(document).ready(function() {
	var t = $("#show-top-meun"),
		a = $("#menu-mask").height(),
		e = $(window).height();
	$(t).find(".mask").css("height", (a > e ? a : e) + "px"), $(t).find(".menu-content").css("height", (a > e ? a : e) + "px"), $(window).resize(function() {
		$(t).find(".mask").css("height", (a > e ? a : e) + "px"), $(t).find(".menu-content").css("height", (a > e ? a : e) + "px")
	});
	var i = $(".goods-item a.img"),
		n = $(".goods-item a.img,.goods-item-ads a.img").width(),
		s = i.length;
	i.css({
		height: n + "px"
	}), $(window).scroll(function() {
		$(window).scrollTop() > 500 ? $(".toTop").fadeIn(1500) : $(".toTop").fadeOut(1500)
	});
	var o = parseInt($(".layout").css("paddingBottom"));
	$(".toTop").css({
		bottom: (o > 0 ? o + 10 : 30) + "px"
	}), setInterval(function() {
		var t = $(".goods-item a.img,.goods-item-ads a.img");
		s != t.length && (s = t.length, $(".goods-item .img,.goods-item-ads a.img").css({
			height: (n || $(".goods-item a.img,.goods-item-ads a.img").width()) + "px"
		}))
	}, 1e3), $(".toTop").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 1e3)
	})
}), $(".main-back").on("click", function() {
	if ("block" == $(".search-pop").css("display")) $(".search-pop").css("display", "none");
	else if ("javascript:void(0)" == $(this).attr("href")) {
		if (window.history.length > 1) return window.history.back(-1), !1;
		window.location.href = "/"
	}
}),!
function() {
	var navSwiper = $("div[ui-anav-swiper]");
	if (0 == navSwiper.length) return !1;
	var api = {
		getUrl: "/?m=ajax&a=acat",
		config: navSwiper.data("config") ? eval("(" + navSwiper.data("config") + ")") : {
			slidesPerView: "auto",
			initialSlide: 0
		},
		getActiveItem: function(t, a, e, i) {
			var n = "",
				s = "",
				o = 0;
			t.data;
			return $.each(t.data, function(t, c) {
				this.cid == a[0] && (api.config.initialSlide = t < 3 ? 0 : t - 2), n = n + "<div class='swiper-slide " + (this.cid == a[0] ? "active" : "") + "'><a " +
				"href='" + c.jump_url + "'" + " data-cid='" + this.cid + "'>" + this.name + "</a></div>", this.cid == a[0] && (o = t, s = function() {
					var t = "";
					return $.each(c.sub_class, function(e, i) {
						t = t + '<li style="" class="cat-item ' + (this.cid == a[0] ? "active" : "") + '" ><a href="' + this.jump_url + '"><img class="lazy" src="/static/wap/images/1.png" data-original="' + this.icon + '_310x310.jpg" alt=""><span>' + this.name + "</span></a></li>"
					}), t
				}())
			}), s = "" != s ? "<ul>" + s + "<div class='ov_h'></div></ul>" : "", [n, s]
		},
		getClassItem: function(t, a) {
			return $.ajax({
				url: this.getUrl,
				type: "GET",
				dataType: "json",
				data: a || {
					type: 2
				}
			}).error(function() {
				$cmsLayer.msg("服务器繁忙请稍后再试！")
			}).done(function(t) {
				return t
			})
		},
		
	},
		getGoodsNav = function() {
			var url = navSwiper.data("url"),
				active = navSwiper.data("active"),
				callback = !! navSwiper.data("callback") && eval("(" + navSwiper.data("callback") + ")"),
				ready = navSwiper.data("ready") ? eval("(" + navSwiper.data("ready") + ")") : function() {},
				itemNav = navSwiper.data("item") || !1,
				_this = this,
				getNavDone = function(t) {
					_this.item = t;
					var a = active || [t.data[0].cid];
					t = api.getActiveItem(t, a, url, callback), navSwiper.removeClass("tav_load").find(".swiper-wrapper").html(t[0]), $(".cat_tab_list").html(t[1]), $(".cat_tab_list img.lazy").lazyload({
						effect: "fadeIn"
					}), showGoodsNav(_this.item, url, callback), setTimeout(function() {
						ready(a)
					}, 600)
				};
			return itemNav ? (getNavDone({
				data: itemNav
			}), !1) : void api.getClassItem(url).done(function(t) {
				t.data.unshift({
					id: 0,
					name: "全部",
					url: "/",
					jump_url:"/article",
					cid: 0,
					sub_class: []
				}), getNavDone(t)
			})
		},
		showGoodsNav = function(t, a, e) {
			var i = new Swiper(navSwiper.find(".swiper-container"), api.config);
			navSwiper.find(".tab_def_list").on("click", function() {
				$(".icon_nav_tab_box").show(0, function() {
					$(this).addClass("active")
				})
			}), navSwiper.find(".swiper-slide a").on("click", function() {
				if ($(this).attr("href")) return !0;
				var n = $(this).data("cid"),
					s = api.getActiveItem(t, [n], a);
				$(".cat_tab_list").addClass("active").html(s[1]), $(".cat_tab_list img.lazy").lazyload({
					effect: "fadeIn"
				}), setTimeout(function() {
					$(".cat_tab_list").removeClass("active")
				}, 50), navSwiper.find(".swiper-slide").removeClass("active"), $(this).parent().addClass("active"), i.slideTo(function(t, a) {
					return t < 3 ? 0 : t - 2
				}($(this).parent().index(), $(navSwiper.find(".swiper-slide")).lenght), 600, !1), e && e(n, $(this).text())
			}), $(".icon_nav_tab_box .tab a").on("click", function() {
				$(".icon_nav_tab_box").removeClass("active"), setTimeout(function() {
					$(".icon_nav_tab_box").hide()
				}, 400)
			})
		};
	getGoodsNav()
}();