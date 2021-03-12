!function($win) {
	function setCookie(t, e, i) {
		var n = new Date;
		n.setTime(n.getTime() + 1e3 * i), document.cookie = t + "=" + escape(e) + (";path=/;expires=" + n.toGMTString())
	}
	function getCookie(t) {
		return document.cookie.length > 0 && (c_start = document.cookie.indexOf(t + "="), c_start != -1) ? (c_start = c_start + t.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
	}
	var page = 100,
		index = 0;
	$win.getNumberText = function(t) {
		if (t < 1e4) return t;
		var e = [],
			i = 0;
		t = (t || 0).toString().split("");
		for (var n = !1, a = t.length - 1; a >= 0; a--) i++, n && e.unshift(t[a]), i % 4 || 0 == a || n || (e.unshift(t[a]), e.unshift("."), n = !0);
		return ("0" != e[2] ? e.join("") : function() {
			var t = "",
				i = !0;
			return $.each(e, function(e, n) {
				"." != n && i && (t += n, i = !1)
			}), t
		}()) + "万"
	};
	var $api = {
		touch: {
			start: 0,
			move: 0,
			end: 0
		},
		page: 1,
		setTime: [],
		loaditem: [],
		load: function() {
			return $(".ranking_load").fadeIn()
		},
		showLoad: function() {
			return $(".ranking_load").addClass("active")
		},
		touchInit: function(t) {
			var e = this;
			$(t).parent().on("touchstart", function(t) {
				e.touch.start = t.originalEvent.targetTouches[0].pageX
			}), $(t).parent().on("touchmove", function(t) {
				var i = t.originalEvent.targetTouches[0].pageX;
				e.touch.move = i, $(this).css({
					transform: "translate3d(" + (i - e.touch.start) + "px, 0px, 0px)",
					"transition-duration": "0ms"
				})
			}), $(t).parent().on("touchend", function(t) {
				t.preventDefault();
				var i = this;
				e.touch.end = e.touch.move - e.touch.start;
				var n = e.touch.end < 0 ? -e.touch.end : e.touch.end;
				n < 200 ? $(i).css({
					transform: "translate3d(0px, 0px, 0px)",
					"transition-duration": "400ms"
				}) : ($(i).css({
					transform: "translate3d(" + 1e3 * (e.touch.end < 0 ? -1 : 1) + "px, 0px, 0px)",
					"transition-duration": "400ms"
				}), e.load())
			})
		},
		setLoadItem: function(t, e) {
			return this.loaditem[t] = e, this.loaditem[t]
		},
		getLoadItem: function(t) {
			return this.loaditem[t]
		},
		getRealtimeFold: function(t, e) {
			var i = this,
				n = this.showLoad();
			return $.ajax({
				url: getRealtimeUrl + t +
				function() {
					var t = $(e).data("type");
					return t ? "&type=" + t : ""
				}(),
				type: "GET",
				dataType: "json",
				data: {
					
				}
			}).error(function() {
				n.removeClass("active"), alert("服务器繁忙请稍后再试！")
			}).done(function(t) {
				return n.removeClass("active"), i.setLoadItem(i.getNumberId(e), t)
			})
		},
		getNumberId: function(t) {
			return $(t).data("type") ? $(t).data("type") + $(t).data("cid") : $(t).data("cid")
		}
	},
		realTimeList = function(jsondata, swiper, getTemplate) {
			this.el = ".ranking_ullit", this.getTemplate = getTemplate, this.swiper = swiper, this.init(eval("(" + jsondata + ")"));
			var _this = this;
			$(swiper.wrapper).find(".swiper-slide").on("click", function() {
				var t = this;
				window.listIndex = 0, $(document).scrollTop(0), $(swiper.wrapper).data("type") ? ($("title").html($(this).find('a').text() + '_榜单'), ("showpage", {
					uid: $cmsLayer.getMtaCookie(),
					time: ((new Date).getHours() < 10 ? "0" + (new Date).getHours() : (new Date).getHours()) + ":" + ((new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes()),
					name: "榜单",					
					domainid: window.location.hostname.replace("www.", "")
				})) : ($("title").html($(this).find('a').text() + '_折上折'), ("showpage", {
					uid: $cmsLayer.getMtaCookie(),
					time: ((new Date).getHours() < 10 ? "0" + (new Date).getHours() : (new Date).getHours()) + ":" + ((new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes()),
					name: "折上折",					
					domainid: window.location.hostname.replace("www.", "")
				})), window.$type = $(this).data("type") || 1;
				var e = $api.getLoadItem($api.getNumberId(this));
				$(".pullup-goods").show(), 0 == $(this).index() ? $(".ranking_banner").show() : $(".ranking_banner").hide(), e ? ($(swiper.wrapper).find(".swiper-slide").removeClass("active"), $(t).addClass("active"), $(".pullup-goods").hide(), _this.init(e.data), swiper.slideTo(function(t, e) {
					return t < 3 ? 0 : t - 3
				}($(t).index(), $(t).lenght), 600, !1)) : $api.getRealtimeFold($(this).data("cid"), this).done(function(e) {
					$(swiper.wrapper).find(".swiper-slide").removeClass("active"), $(t).addClass("active"), $(".pullup-goods").hide(), _this.init(e.data), swiper.slideTo(function(t, e) {
						return t < 3 ? 0 : t - 3
					}($(t).index(), $(t).lenght), 600, !1)
				})
			}), this.endTime()
		};
	realTimeList.prototype.getItemList = function(t, e) {
		var i = "",
			n = this;
		return $.each(this.jsondata, function(a, o) {
			a >= t && a < e && (i += n.getTemplate(o, a + 1))
		}), i
	}, realTimeList.prototype.endTime = function() {
		if (0 == $(".ranking_time").length) return !1;
		var t = this;
		$(".ranking_time").data("time");
		$.ajax({
			url: "/?m=ajax&a=now",
			type: "GET",
			dataType: "JSON"
		}).done(function(e) {
			var i = new Date(1e3 * e.data.time),
				n = i.getMinutes(),
				a = Math.ceil((n + 1) / 20),
				o = 20 * a - 1;
			o > 59 && (o = 59), i.setMinutes(o);
			var r = i.getTime() + 59e3,
				s = !0;
			t.downTime({
				start: 1e3 * e.data.time,
				end: r
			}, function(t, e) {
				return e && s ? (s = !1, window.location.reload(), !1) : ($(".ranking_time b:eq(0)").html(0 == t[0] ? "" : "<span>" + t[0] + "</span>小时"), $(".ranking_time b:eq(1) span").html(t[1]), void $(".ranking_time b:eq(2) span").html(t[2]))
			})
		})
	}, realTimeList.prototype.init = function(t) {
		this.jsondata = t, index = 0, html = $(this.getItemList(index, page)).addClass("lazy0"), html.click(function(t) {
			var e = window.location.href.split("&cid=");
			window.history.replaceState(null, $(this).find('a').text() + "折上折", e[0])
		}), $(this.el).html(html), html.length || $(".pullup-goods").show().html("暂无商品，请敬请期待！"), $(".lazy0 img.lazy").lazyload({
			effect: "fadeIn"
		});
		var e = this;
		index++, $(document).scroll(function(t) {
			if ($(document).scrollTop() >= $(document).height() - $(window).height() - 150) {
				var i = e.getItemList(index * page, index * page + page);
				if ("" == i) return $(".pullup-goods").show().html("商品已加载完！"), !1;
				i = $(i).addClass("lazy" + index), $(e.el).append(i), $(".lazy" + index + " img.lazy").lazyload({
					effect: "fadeIn"
				}), index++
			}
		})
	}, realTimeList.prototype.downTime = function(t, e) {
		function i() {
			var a = new Date;
			a = a.getTime() + c;
			var o = s - a;
			if (o > 0) {
				var r = new Date;
				r = r.getTime();
				var d, u, p, m;
				d = Math.floor(o / 864e5), o -= 864e5 * d, u = Math.floor(o / 36e5), o -= 36e5 * u, p = Math.floor(o / 6e4), o -= 6e4 * p, m = Math.floor(o / 1e3), d && (u = 24 * d + u), u < 10 && (u = "0" + u), p < 10 && (p = "0" + p), m < 10 && (m = "0" + m);
				var h = [u ? u : "00", p, m];
				if (e(h), 0 == t.number) return !1;
				n = setTimeout(function() {
					i()
				}, 1e3)
			} else l || (l = !l, e(["00", "00", "00"], !0)), n = setTimeout(function() {
				i()
			}, 1e3), clearTimeout(n)
		}
		if (t.cid) {
			if (function() {
				var e = !1;
				return $.each($api.setTime, function(i, n) {
					t.cid == this && (e = !0)
				}), e
			}()) return !1;
			$api.setTime.push(t.cid)
		}
		var n, a = new Date(t.start),
			o = a.getTime(),
			r = new Date(t.end),
			s = r.getTime(),
			d = new Date,
			u = d.getTime(),
			c = o - u,
			l = !1;
		n = setTimeout(function() {
			i()
		}, 1e3)
	}, $win.realTimeList = realTimeList, $win.rankingApi = $api
}(window);