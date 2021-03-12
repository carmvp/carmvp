!function() {
	var t = new Swiper("div[ui-swiper]", {
		slidesPerView: "auto",
		initialSlide: activeIndex
	}),
		e = {
			touch: {
				start: 0,
				move: 0,
				end: 0
			},
			page: 1,
			time: 1544191200,
			openBox: function() {
				var t = 1 == weibo_open ? 1 : 0,
					e = navigator.userAgent.toLowerCase();
				return ("weibo" == e.match(/WeiBo/i) || "weibo" == e.match(/Weibo/i)) && 1 == t
			}(),
			load: window.rankingApi.load.bind(this),
			showLoad: window.rankingApi.showLoad.bind(this),
			isAjaxUp: !1,
			getLoadId: function(t) {
				return t.id ? t.id : t.time + t.p
			},
			getEveryItem: function(t, i, n) {
				var a = this,
					o = this.getLoadItem(e.getLoadId(i));
				if (o) return n(o), o;
				if (e.isAjaxUp) return !1;
				e.isAjaxUp = !0;
				var s = e.showLoad();
				return $.ajax({
					url: t,
					type: "GET",
					dataType: "json",
					data: i
				}).error(function() {
					s.removeClass("active"), $cmsLayer.msg("请重新刷新！"), e.isAjaxUp = !1
				}).done(function(t) {
					s.removeClass("active"), 0 != t.data.length && a.setLoadItem(e.getLoadId(i), t), n(t), e.isAjaxUp = !1
				})
			},
			open: function(t, e) {
				return e ? 2 == weixin || this.openBox ? "onclick='evaryBanjia.openShowBox(" + t.id + ")'" : "onclick=\"window.location.href='" + goodsUrl + "&iid=" + t.id + "'\"" : 2 == weixin || this.openBox ? "onclick='evaryBanjia.openShowBox(" + t.id + ")'" : 'href="' + goodsUrl + "&iid=" + t.id + '"'
			},
			getActivityId: function(t) {
				return 0 == parseInt(t.activity_id) ? t.today_sellnum : t.item_sold_num
			},
			getCouponAmount: function(t) {
				return parseInt(t.coupon_amount) > 0 && 0 == parseInt(t.use_quan) ? '<p class="quan"><span>' + t.coupon_amount + "元券</span></p>" : "" == t.preferential || null == t.preferential ? "" : '<p style="display: inline-block; height:22px;">&nbsp;</p>'
			},
			touchInit: function(t, e) {
				var i = this;
				$(t).parent().unbind("touchstart").on("touchstart", function(t) {
					i.touch = {
						start: 0,
						move: 0,
						end: 0
					}, i.touch.start = t.originalEvent.targetTouches[0].pageX
				}), $(t).parent().unbind("touchmove").on("touchmove", function(t) {
					var e = t.originalEvent.targetTouches[0].pageX;
					i.touch.move = e;
					var n = e - i.touch.start < 0 ? -(e - i.touch.start) : e - i.touch.start;
					n >= 100 && $("body").css("overflow", "hidden")
				}), $(t).parent().unbind("touchend").on("touchend", function(t) {
					var n = this;
					i.touch.end = i.touch.move - i.touch.start;
					var a = i.touch.end < 0 ? -i.touch.end : i.touch.end;
					a < 180 || 0 == i.touch.move ? ($(n).css({
						transform: "translate3d(0px, 0px, 0px)",
						"transition-duration": "400ms"
					}), $("body").removeAttr("style")) : ($(n).css({
						transform: "translate3d(" + 1e3 * (i.touch.end < 0 ? -1 : 1) + "px, 0px, 0px)",
						"transition-duration": "400ms"
					}), setTimeout(function() {
						$(n).css({
							transform: "translate3d(" + -(1e3 * (i.touch.end < 0 ? -1 : 1)) + "px, 0px, 0px)",
							"transition-duration": "0ms"
						}), setTimeout(function() {
							$(n).css({
								transform: "translate3d(0px, 0px, 0px)",
								"transition-duration": "400ms"
							})
						}, 1), $("body").removeAttr("style"), e(i.touch.end < 0)
					}, 400))
				})
			},
			template: function(t) {
				t = t.data;
				var e = "",
					i = this;
				return $.each(t, function(t, n) {
					e = e + "<li " + i.open(this, !0) + ' class="' + (i.indexTime < i.swiperIndex ? "odd" : "") + '" ><a ' + i.open(this) + ' class="img"><img  class="lazy" src="/static/wap/images/rolling.gif" data-original="' + this.pic_url + '_310x310.jpg"  alt=""></a>   <div class="text">     <a ' + i.open(this) + "><h3>" + (2 == parseInt(this.activity_type) ? "<i class=' icon-juhuashuan'></i>" : 1 == parseInt(this.activity_type) ? "<i class=' icon-taoqianggou'></i>" : "") + this.name + '</h3></a>     <div class="tablist">       <div class="nrtab">' + (this.preferential ? "<span>" + this.preferential + "</span>" : "") + i.getCouponAmount(this) + '         <p class="txt">' + this.yijuhua + '</p>       </div>       <div class="col-6">         <p class="money" style="padding-top:20px;">           <b><i>¥</i> ' + this.sale_price + '</b>         </p>       </div>       <div class="col-6 text-right button">' + (i.indexTime >= i.swiperIndex ? "<span>已抢" + i.getActivityId(this) + "件</span>" : "<span>&nbsp;</span>") + (i.indexTime >= i.swiperIndex ? '<a class="out" ' + i.open(this) + '><img src="/static/wap/images/btn.svg" /></a>' : "<a " + i.open(this) + " >即将开始</a>") + "       </div>     </div>   </div> </li>"
				}), e
			},
			templateWeixin: function(t, e) {
				return '<div class="weixin-tip"><div class="wechat-line"></div><div class="wechat-brow"></div><div class="tkl-layer">    <div class="mid-txt"><span>或</span></div>    <div class="tkl-code yjfz_copy">        <div class="code" >                <span  id="code2_ios" class="tkl_text ua_ios" style="display: inline;" >' + t + '</span>        </div>        <a class="keycope" id="keycope' + e + '" href="javascript:;" aria-label=" ' + t + ' " >一键复制</a>    </div>    <p>长按复制上方淘口令，打开手机淘宝购买</p></div><div class="weixin-cover"></div></div>'
			}
		},
		i = function(t) {
			this.el = $("#itemEvery"), this.loaditem = [], this.setLoadItem = window.rankingApi.setLoadItem.bind(this), this.getLoadItem = window.rankingApi.getLoadItem.bind(this), this.isUpItem = !0, this.init()
		};
	i.prototype.init = function() {
		var i = this,
			n = $(".ranking_nav_tab .swiper-slide.active");
		if (e.time = 0 === n.length ? $(".ranking_nav_tab .swiper-slide:eq(0)").data("time") : n.data("time"), e.indexTime = $(".ranking_nav_tab .timeActive").index(), e.swiperIndex = $(".ranking_nav_tab .timeActive").index(), $(".ranking_nav_tab .swiper-slide").unbind("click").on("click", function() {
			i.el.html(""), $(document).scrollTop(0), e.page = 1, e.time = $(this).data("time"), i.isUpItem = !0, e.swiperIndex = $(this).index(), $(".ranking_nav_tab .swiper-slide").removeClass("active"), $(this).addClass("active"), t.slideTo(function(t, e) {
				return t
			}($(this).index(), $(this).lenght), 600, !1), i.getEvery(), $("title").html($(this).text() + "大额券"), ("showpage", {
				uid: $cmsLayer.getMtaCookie(),
				time: ((new Date).getHours() < 10 ? "0" + (new Date).getHours() : (new Date).getHours()) + ":" + ((new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes()),
				name: "大额券",
				siteid: standId,
				domainid: window.location.hostname.replace("www.", "")
			})
		}), $(document).scroll(function(t) {
			$(document).scrollTop() >= $(document).height() - $(window).height() - 250 && i.isUpItem && (i.isUpItem = !1, i.getEvery())
		}), this.el.html(""), "" != window.location.hash) {
			var a = window.location.hash.slice(1),
				o = $(".ranking_nav_tab .swiper-slide[data-time='" + a + "']"),
				s = $(".ranking_nav_tab .swiper-slide");
			e.time = a, s.removeClass("active"), e.swiperIndex = o.index(), t.slideTo(function(t, e) {
				return t
			}(o.index(), s.lenght), 600, !1), o.addClass("active")
		}
		i.getEvery()
	}, i.prototype.getEvery = function() {
		var t = e.getEveryItem.bind(this);
		t(ajax_url, {			
			p: e.page
		}, this.showItem.bind(this))
	}, i.prototype.showItem = function(t) {
		var i = e.template(t),
			n = $(i).addClass("lazy" + e.page);
		return this.el.append(n), "" == i && 1 == e.page ? (this.el.html('<div class="ranking_ullit_default" style="margin-top: 0">   <div class="ranking_ullit_default_icon"></div>   <p>当场好货还在精心挑选中~(｡･∀･)ﾉ</p></div>'), !1) : (t.more || this.el.append("<li class='load'>都是小编精心挑选的超值好货哦~(｡･∀･)ﾉﾞ</li>"), $(".lazy" + e.page + " img.lazy").lazyload({
			effect: "fadeIn"
		}), this.isUpItem = t.more, void(e.page = e.page + 1))
	}, i.prototype.openShowBox = function(t) {
		var i = this,
			n = e.getEveryItem.bind(this);
		n(tkurl, {
			id: t
		}, function(n) {
			$("body").append(e.templateWeixin(n.data, t)), $(".weixin-tip").show();
			var a = new Clipboard("#keycope" + t, {
				text: function(t) {
					return t.getAttribute("aria-label")
				}
			});
			a.on("success", function(t) {
				t.trigger.innerHTML = "已复制", t.trigger.style.background = "#67cf84", t.trigger.parentNode.style.borderColor = "#67cf84", t.clearSelection()
			}), a.on("error", function(t) {
				t.trigger.style.background = "#f47171", t.trigger.parentNode.style.borderColor = "#f47171", t.trigger.innerHTML = "复制失败", t.clearSelection()
			}), $(".weixin-cover").unbind("click").on("click", function() {
				$(".weixin-tip").remove()
			}), $("#code2_ios").unbind("touchend").on("touchend", function() {
				i.selectText("code2_ios")
			})
		})
	}, i.prototype.selectText = function(t) {
		setTimeout(function() {
			var e = document.getElementById(t);
			if (document.body.createTextRange) {
				var i = document.body.createTextRange();
				i.moveToElementText(e), i.select()
			} else if (window.getSelection) {
				var n = window.getSelection(),
					i = document.createRange();
				i.selectNodeContents(e), n.removeAllRanges(), n.addRange(i)
			}
		}, 200)
	}, window.evaryBanjia = new i
}();