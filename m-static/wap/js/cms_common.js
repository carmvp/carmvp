function ok() {}
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
}), $(".search form").submit(function(t) {
	var a = $.trim($(".search_area").val());
	if ("" == a) return !1
}), window.$cmsLayer = {
	loaditem: [],
	setMtaCookie: function() {
		if (this.getMtaCookie()) return this.getMtaCookie();
		var t = 365,
			a = new Date;
		a.setTime(a.getTime() + 24 * t * 60 * 60 * 1e3), document.cookie = "MTA-USER-ID=" + escape(function() {
			for (var t = "", a = 0; a < 4; a++) t += parseInt(1e8 * Math.random());
			return t
		}()) + ";expires=" + a.toGMTString()
	},
	getMtaCookie: function() {
		var t, a = new RegExp("(^| )MTA-USER-ID=([^;]*)(;|$)");
		return !!(t = document.cookie.match(a)) && unescape(t[2])
	},
	getCookie: function(t) {
		var a, e = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
		return !!(a = document.cookie.match(e)) && unescape(a[2])
	},
	msg: function(t) {
		return 0 == $(".cms_layer_msg").length && $("body").append('<div class="cms_layer_msg" ><span style="top:' + $(window).height() / 2 + 'px;">' + t + "</span></div>"), setTimeout(function() {
			$(".cms_layer_msg").fadeOut(400, function() {
				$(this).remove()
			})
		}, 1500), $(".cms_layer_msg")
	},
	copy: function(t, a) {
		var e = function() {
				function t(t, e) {
					return a(t) === e
				}
				function a(t) {
					return e[Object.prototype.toString.call(t)] || "object"
				}
				var e = {};
				return ["Null", "Undefined", "Number", "Boolean", "String", "Object", "Function", "Array", "RegExp", "Date"].forEach(function(t) {
					e["[object " + t + "]"] = t.toLowerCase()
				}), {
					isType: t,
					getType: a
				}
			}();
		if (null === t || "object" != typeof t) return t;
		var i, n, s, o = e.isType(t, "array") ? [] : {};
		for (i in t) n = t[i], s = e.getType(n), !a || "array" !== s && "object" !== s ? o[i] = n : o[i] = this.copy(n);
		return o
	},
	digitalAbbNumber: function(t) {
		if (t < 1e4) return t;
		var a = [],
			e = 0;
		t = (t || 0).toString().split("");
		for (var i = !1, n = t.length - 1; n >= 0; n--) e++, i && a.unshift(t[n]), e % 4 || 0 == n || i || (a.unshift(t[n]), a.unshift("."), i = !0);
		return ("0" != a[2] ? a.join("") : function() {
			var t = "",
				e = !0;
			return $.each(a, function(a, i) {
				"." != i && e && (t += i, e = !1)
			}), t
		}()) + "万"
	},
	load: function() {
		0 == $(".cms_layer_load").length && $("body").append('<div class="cms_layer_load"></div>');
		var t = $(".cms_layer_load").show();
		return t
	},
	setLoadItem: function(t, a) {
		var e = 0;
		for (var i in this.loaditem) e > 15 && this.loaditem.splice(0, 1), e++;
		this.loaditem.push({
			key: t,
			item: a
		});
		var n = new Date;
		if (localStorage) try {
			localStorage.setItem("LOCAL-STORAGE-ITEM", JSON.stringify({
				time: n.getTime(),
				data: this.loaditem
			}))
		} catch (s) {}
		return this.loaditem[t]
	},
	getLoadItem: function(id) {
		var ret, loaditem = this.loaditem;
		if (localStorage) try {
			var item = eval("(" + localStorage.getItem("LOCAL-STORAGE-ITEM") + ")"),
				time = new Date;
			loaditem = item ? time.getTime() - item.time > 1e5 ? this.loaditem : item.data : this.loaditem, this.loaditem = loaditem
		} catch (e) {}
		for (var key in loaditem) loaditem[key].key == id && (ret = loaditem[key].item);
		return ret
	},
	goodsListTpl: function(t, a, e) {
		for (var i = "", n = 0; n <= t.length - 1; n++) i = i + '<li class="col-6" ><div class="cent"><a style="height:' + $(window).width() / 2 + 'px;" href="' + (t[n].jump_url ? t[n].jump_url : a + "&iid=" + t[n].id) + '" class="img"><img class="lazy" src="/static/wap/images/rolling.gif" data-original="' + t[n].pic + '_310x310.jpg" alt=""></a><div class="mar"><a href=' + (t[n].jump_url ? t[n].jump_url : a + "&iid=" + t[n].id) + '><h3 class="bt">' + t[n].d_title + '</h3></a><div class="row-s num"><div class="col-6">' + (1 == t[n].istmall ? " 天猫价 ¥" + t[n].yuanjia : "淘宝价 ¥" + t[n].yuanjia) + '</div><div class="col-6 text-right">已售' + this.digitalAbbNumber(t[n].xiaoliang) + '</div></div><div class="row-s"><div class="col-6 money"><span>券后价&nbsp;¥</span>' + this.accSub(t[n].yuanjia, t[n].quan_jine) + '</div><div class="col-6"><span class="quan"><i>' + t[n].quan_jine + '元券</i></span></div></div></div></div></li>';
		return i
	},
	goodsListTplTwo: function(t, a, e) {           
            for (var o = "",n = 0; n <= t.length - 1; n++) o = o + '<li class="row-s"><a  href="' + t[n].jump_url +'" ><p  class="img"><img ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + t[n].pic + '_310x310.jpg" alt=""></p><div class="cent"><h3 style="margin-bottom:0">' + t[n].d_title + '</h3>' + (t[n].commission ? '<div><span style="font-size:12px;border: 1px solid #fe4a65;color:#fe4a65;padding:0 3px;">最高返' + t[n].commission +'元<span></div><div class="num col-aaa " style="padding-top:.5rem">' : '<div class="num col-aaa " >') + ' <del>原售价  ' + t[n].yuanjia + '</del><span class="fr">已售' + this.digitalAbbNumber(t[n].xiaoliang) + '件</span></div><div class=" money col-money"><p class="quan fr"><i>' + parseFloat(t[n].quan_jine) + '元券</i></p>券后价 <span class=""><i>￥</i>' + this.accSub(t[n].yuanjia, t[n].quan_jine) + '</span></div></div></a></li>';
            return o
        },
		
		
	goodsListTplzt: function(t, a, e) {           
            for (var o = "",n = 0; n <= t.length - 1; n++) o = o + '<li class="row-s"><a  href="' + t[n].jump_url +'" ><p  class="img"><img ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + t[n].pic_url + '_310x310.jpg" alt=""></p><div class="cent"><h3 style="margin-bottom:0">' + t[n].title + '</h3>' + (t[n].commission ? '<div><span style="font-size:12px;border: 1px solid #fe4a65;color:#fe4a65;padding:0 3px;">最高返' + t[n].commission +'元<span></div><div class="num col-aaa " style="padding-top:.5rem">' : '<div class="num col-aaa "> ') + ' <del>原售价  ' + t[n].price + '</del><span class="fr">已售' + this.digitalAbbNumber(t[n].volume) + '件</span></div><div class=" money col-money">'+(t[n].quan ? '<p class="quan fr"><i>' + parseFloat(t[n].quan) + '元券</i></p>券后价 <span class=""><i>￥</i>' + parseFloat(t[n].zk_price) + '</span>' : '现售价 <span class=""><i>￥</i>' + parseFloat(t[n].zk_price) + '</span>')+'</div></div></a></li>';
            return o
        },	
	giftgoodsListTplTwo: function(t, a, e) {            
            for (var o = "",n = 0; n <= t.length - 1; n++) o = o + '<li class="product_list col-12-6 product_null"><div>'+ t[n].modelclass +'<div class="product_img"><img class="lazy" src="/static/wap/images/rolling.gif" data-original="'+ t[n].img +'" alt="'+ t[n].title +'" style="background: rgb(255, 255, 255); display: block;"></div><div class="product_list_info"> <div class="title"><span class="title_info">'+ t[n].title +'</span></div><div class="master_money">￥'+ t[n].price +'</div><div class="price_integral"><span>'+ t[n].score +'</span>'+ t[n].exchange +'<span class="count text-center">剩'+ t[n].stock +'</span></div></div></div></li>';
            return o
        },	
	goodsListTplpdd: function(t, a, e) {
		for (var i = "", n = 0; n <= t.length - 1; n++) i = i + '<li class="col-6" ><div class="cent"><a style="height:' + $(window).width() / 2 + 'px;" href="' + (t[n].jump_url ? t[n].jump_url : a + "&id=" + t[n].id) + '" class="img"><img class="lazy" src="/static/wap/images/rolling.gif" data-original="' + t[n].pic + '" alt=""></a><div class="mar"><a href=' + (t[n].jump_url ? t[n].jump_url : a + "&id=" + t[n].id) + '><h3 class="bt">' + t[n].d_title + '</h3></a><div class="row-s num"><div class="col-6">原售价 ¥' + t[n].yuanjia + '</div><div class="col-6 text-right">已售' + t[n].xiaoliang + '</div></div><div class="row-s"><div class="col-6 money"><span>券后价&nbsp;¥</span>' + this.accSub(t[n].yuanjia, t[n].quan_jine) + '</div><div class="col-6"><span class="quan"><i>' + t[n].quan_jine + '元券</i></span></div></div></div></div></li>';
		return i
	},
	goodsListTplpddTwo: function(t, a, e) {
		for (var i = "", n = 0; n <= t.length - 1; n++)
         img =  t[n].pic.replace(/ads/g, 'n1'),
			i = i + '<div class="goods-item" id="cms-goods-items_'+ t[n].id +'"><a data-gid="'+ t[n].id +'" href="'+ t[n].jump_url +'" class="img">'+(t[n].quan_jine ? '<span class="coupon-wrapper theme-bg-color-1">券 <i>￥</i><b>'+ t[n].quan_jine +'</b></span>' : '')+'<img class="lazy" src="/static/wap/images/rolling.gif" data-original="'+ img +'" alt=""></a><a data-gid="'+ t[n].id +'" href="'+ t[n].jump_url +'" class="title"><div class="text">'+ t[n].d_title +'</div></a><div class="price-wrapper"><span class="price">￥<span>'+ t[n].jiage +'</span></span>'+(t[n].yuanjia ? '<span class="price_yj">￥'+ t[n].yuanjia +'</span>' : '')+'<div class="sold-wrapper"><span class="text">销量</span><span class="sold-num">'+ t[n].xiaoliang +'</span></div>'+ (t[n].commission ? '<div><span style="font-size:12px;border: 1px solid #fe4a65;color:#fe4a65;padding:0 3px;">最高返' + t[n].commission +'元<span></div>' : '') +'</div></div>'; 
		return i
	},
	accSub: function(t, a) {
		var e, i, n, s;
		try {
			e = t.toString().split(".")[1].length
		} catch (o) {
			e = 0
		}
		try {
			i = a.toString().split(".")[1].length
		} catch (o) {
			i = 0
		}
		return n = Math.pow(10, Math.max(e, i)), s = e >= i ? e : i, ((t * n - a * n) / n).toFixed(s)
	}
}, $(window).load(function() {
	$cmsLayer.setMtaCookie()
}), !
function() {
	var util = function() {
			function t(t, e) {
				return a(t) === e
			}
			function a(t) {
				return e[Object.prototype.toString.call(t)] || "object"
			}
			var e = {};
			return ["Null", "Undefined", "Number", "Boolean", "String", "Object", "Function", "Array", "RegExp", "Date"].forEach(function(t) {
				e["[object " + t + "]"] = t.toLowerCase()
			}), {
				isType: t,
				getType: a
			}
		}(),
		$api = {
			getUrl: "/?m=ajax&a=type",
			loaditem: [],
			getActiveItem: function(t, a) {
				var e = "",
					i = "",
					n = [],
					s = 0;
				return $.each(t.data, function(t, o) {
					e = e + "<a class='" + (this.cid == a[0] ? "active" : "") + "'  data-id='" + this.cid + "'>" + this.name + "</a>", this.cid == a[0] && (s = t, i = function() {
						var t = "";
						return $.each(o.sub_class, function(e, i) {
							t = t + '<li style="" class="cat-item ' + (this.id == a[0] ? "active" : "") + '" ><a href="' + this.jump_url + '" data-cid="' + this.id + '"><img class="lazy" src="/static/wap/images/1.png" data-original="' + this.icon + '_310x310.jpg" alt="">' + this.name + "</a></li>"
						}), t
					}(), n = this)
				}), e = e + '<p class="bg" style="top:' + (45 * s + 44) + 'px;"></p>', [e, i, n]
			},
			setLoadItem: function(t, a) {
				var e = 0;
				for (var i in this.loaditem) e > 15 && this.loaditem.splice(0, 1), e++;
				this.loaditem.push({
					key: t,
					item: a
				});
				new Date;
				return localStorage.removeItem("WAPGOODSCLASS"), this.loaditem[t]
			},
			getLoadItem: function(id) {
				var ret, loaditem = this.loaditem;
				if (localStorage) {
					var item = eval("(" + localStorage.getItem("WAPGOODSCLASS") + ")"),
						time = new Date;
					loaditem = item ? time.getTime() - item.time > 1e5 ? this.loaditem : item.data : this.loaditem, this.loaditem = loaditem
				}
				for (var key in loaditem) loaditem[key].key == id && (ret = loaditem[key].item);
				return ret
			},
			getNumberId: function(t) {
				return this.page + this.catSort + t
			},
			load: function() {
				return 0 == $(".show-top-menu-load").length && $("body").append('<div class="show-top-menu-load"></div>'), $(".show-top-menu-load")
			},
			template: function(t, a, e, i) {
				$.each(t.data, function(t, e) {
					a[0] = parseInt(this.cid) == parseInt(a[0]) ? e.cid : a[0], $.each(this.sub_class, function(t, i) {
						a[1] = parseInt(this.id) == parseInt(a[0]) ? this.id : a[0], a[0] = parseInt(this.id) == parseInt(a[0]) ? e.cid : a[0]
					})
				});
				var n = $api.getActiveItem(t, a);
				return '<nav class="show-top-menu " id="' + e + '" style="z-index:100"><div class="menu-content myco1  " style="padding:0;">    <div class="menu-nav"  style="padding:0; -webkit-overflow-scrolling: touch; -webkit-box-flex: 1; position: fixed;"><div class="ov_h" style="height:44px;"></div>' + n[0] + ' <div class="ov_h" style="height:' + i + ';"></div>   </div>    <div class="cent" style="height:100%; -webkit-overflow-scrolling: touch; -webkit-box-flex: 1; "><div class="ov_h" style="height:44px;"></div>        <div class="img ' + ("" == n[2].jump_url ? "hide" : "") + '" >            <a ' +
				function() {
					return "" == n[2].jump_url ? "" : 'href="' + n[2].jump_url + '"'
				}() + '><img src="' + n[2].banner + '" alt=""></a>        </div>        <ul class="main-cat2">' + n[1] + '        </ul><div class="ov_h" style="height:' + i + ';"></div><span class="up-menu theme-color-1 theme-border-color-1">收起分类</span>    </div></div></nav>'
			},
			getClassItem: function(t, a) {
				var e = this;
				return $.ajax({
					url: this.getUrl,
					type: "GET",
					dataType: "json",
					data: a || {
						type: 1
					}
				}).error(function() {
					$cmsLayer.msg("服务器繁忙请稍后再试！")
				}).done(function(t) {
					return e.setLoadItem(100051, t)
				})
			},
			copy: function(t, a) {
				if (null === t || "object" != typeof t) return t;
				var e, i, n, s = util.isType(t, "array") ? [] : {};
				for (e in t) i = t[e], n = util.getType(i), !a || "array" !== n && "object" !== n ? s[e] = i : s[e] = this.copy(i);
				return s
			}
		},
		cmsClass = function() {
			this.config = $api.copy($api), this.el = "*[ui-class]", this.init()
		};
	cmsClass.prototype.init = function() {
		var t = this;
		t.cid = "cmsClass";
		"" != window.location.hash && window.location.hash.slice(1);
		$.each($(t.el), function(a, e) {
			$(e).unbind("click").on("click", function() {
				t.item ? $("#" + t.cid).toggleClass("active") : t.getElementsByTag(a, e), $(this).hasClass("active") ? ($(this).removeClass("active"), $("html").removeAttr("style")) : ($(this).addClass("active"), $("html").css({
					overflow: "hidden"
				}))
			})
		})
	}, cmsClass.prototype.getElementsByTag = function(t, a) {
		var e = "" != window.location.hash && window.location.hash.slice(1),
			i = $(a).data("url"),
			n = parseInt(e) ? [e] : $(a).data("active"),
			s = this,
			o = this.config.getLoadItem(100051);
		if (o) return s.item = o, $("body").append(s.config.template(o, n || [o.data[0].cid], s.cid, $(a).data("bottom") || 0)), setTimeout(function() {
			$(".show-top-menu img.lazy").lazyload({
				effect: "fadeIn"
			})
		}, 1e3), s.show(s.cid, a), !1;
		var c = s.config.load();
		this.config.getClassItem(i).done(function(t) {
			s.item = t, $("body").append(s.config.template(t, n || [t.data[0].cid], s.cid, $(a).data("bottom") || 0)), setTimeout(function() {
				$(".show-top-menu img.lazy").lazyload({
					effect: "fadeIn"
				})
			}, 1e3), s.show(s.cid, a)
		}).error(function() {
			c.hide()
		})
	}, cmsClass.prototype.show = function(t, a) {
		var e = this;
		$(".show-top-menu-load").hide(), setTimeout(function() {
			$("#" + t).toggleClass("active")
		}, 10), $("#" + t).find(".menu-nav a").unbind("click").on("click", function() {
			$("#" + t).find(".menu-nav a").removeClass("active"), $(this).addClass("active"), $("#" + t).find(".menu-nav .bg").css("top", 45 * $(this).index());
			var a = e.config.getActiveItem(e.item, [$(this).data("id"), 0]);
			$("#" + t).find("div.img").html("<a " +
			function() {
				return "" == a[2].jump_url ? "" : 'href="' + a[2].jump_url + '"'
			}() + ' ><img src="' + a[2].banner + '" /></a>'), "" == a[2].jump_url ? $("#" + t).find("div.img").addClass("hide") : $("#" + t).find("div.img").removeClass("hide"), $("#" + t).find(".main-cat2").addClass("active").html(a[1]), $(".show-top-menu img.lazy").lazyload({
				effect: "fadeIn"
			}), setTimeout(function() {
				$("#" + t).find(".main-cat2").removeClass("active")
			}, 10), $("#" + t).find(".menu-content .main-cat2 li a").unbind("click").on("click", function() {
				var t = window.location.href.split("#") || window.location.href;
				history.pushState(1, "首页", t[0] + "#" + $(this).data("cid"))
			});
			var i = window.location.href.split("#");
			window.history.pushState(null, name + "折扣，领券立减", i[0] + "#" + $(this).data("id"))
		}), history.pushState(1, "首页", window.location.href.split("#")[0]), $("#" + t).find(".menu-content .main-cat2 li a").unbind("click").on("click", function() {
			var t = window.location.href.split("#") || window.location.href;
			history.pushState(1, "首页", t[0] + "#" + $(this).data("cid"))
		})
	}, window.cmsClass = new cmsClass
}(), !
function() {
	var navSwiper = $("div[ui-nav-swiper]");
	if (0 == navSwiper.length) return !1;
	var api = {
		getUrl: "/?m=ajax&a=type",
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
				function() {
					return "" == c.url ? i ? "" : "href='" + e + "?m=index&a=cate&cid=" + c.cid + "'" : "href='" + c.url + "'"
				}() + " data-cid='" + this.cid + "'>" + this.name + "</a></div>", this.cid == a[0] && (o = t, s = function() {
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
		tplTabBox: function(t) {
			return '<div class="icon_nav_tab_box" style="display: none;"><div class="tab">全部分类 <a href="javascript:;"></a></div><ul class="ullit" style="height:' + ($(document).height() - 46) + 'px;">' +
			function() {
				var a = "";
				return $.each(t, function(t, e) {
					a = a + '<li><a href="' + e.url + '">   <img src="' + e.small_pic + '" alt="">   <span>' + e.title + "</span></a></li>"
				}), a
			}() + '<div class="ov_h"></div></ul></div>'
		}
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
					name: "精选",
					url: url,
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