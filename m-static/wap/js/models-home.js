!function(t) {
	"use strict";
	t.directive("ui-home-number", function() {
		return {
			scope: {
				time: "time",
				num: "=num"
			},
			link: function(t) {
				var a = t.scope,
					e = t.element;
				if ($(e).attr("isLoad")) return !1;
				$(e).attr("isLoad", !0);
				var i = [],
					n = function(t) {
						var a = [],
							e = 0;
						t = (t || 0).toString().split("");
						for (var i = t.length - 1; i >= 0; i--) e++, a.unshift(t[i]), e % 3 || 0 == i || a.unshift(",");
						return a.join("")
					},
					s = function(t, a, s) {
						var o = !1;
						if (!s) {
							if ($.each(i, function(t, a) {
								this == e && (o = !0)
							}), o) return !1;
							i.push(e)
						}
						$(e).parent().show();
						var r, d, l = $(e),
							c = $cmsApi.accMul(a, 1e3),
							m = $cmsApi.accMul(t, .1),
							u = +new Date;
						d = setInterval(function() {
							r = +new Date, s = s || $cmsApi.accMul(t, .9);
							var a = r - u,
								e = $cmsApi.accAdd(s, $cmsApi.accMul(m, $cmsApi.accDiv(a, c)));
							a >= c ? (e = t, clearInterval(d)) : e = Math.floor(e) > t ? t : Math.floor(e), l.text(n(e))
						}, 16)
					},
					o = function(t, a, i) {
						t = parseInt(t), a = parseInt(a);
						var s = a - t;
						if (0 == s) return $(e).html(n(a)), $(e).parent().fadeIn(400), !1;
						var o = $("<span class='home_num_show' eq='" + i + "'>+" + s + "</span>");
						if ($("body").append(o), 0 != i) {
							var r = $(e).offset();
							o.css({
								left: r.left + "px",
								top: r.top + "px",
								"margin-left": "-" + (("" + s).length - .5) + "em"
							})
						}
						setTimeout(function() {
							o.addClass("off")
						}, 400), setTimeout(function() {
							o.addClass("no"), setTimeout(function() {
								$(e).html(n(a)), $(e).parent().fadeIn(400)
							}, 200), setTimeout(function() {
								o.remove()
							}, 3e3)
						}, 1500)
					},
					r = function(t) {
						if (t.status && 0 != t.data.length) {
							var a = 1,
								e = t.data;
							e.length > 1 ? o(e[0].coupon_num, e[1].coupon_num, 0) : o(e[0].coupon_num, e[0].coupon_num, 0);
							var i = setInterval(function() {
								a != e.length && e[a + 1] ? o(e[a].coupon_num, e[a + 1].coupon_num, a) : (clearInterval(i), d()), a++
							}, 7e3)
						} else setTimeout(d, 1e4)
					};
				if (!a.num) {
					var d = function() {
							$cmsApi.ajax({
								url: "/?m=ajax&a=getquannum"
							}).done(r)
						};
					d()
				}
				var l = function() {
						$(e).offset().top <= $(document).scrollTop() + $(window).height() && a.num && s(a.num, a.time)
					};
				$(document).scroll(l), l()
			}
		}
	});
	var a = {
		swiperIndex: 0,
		getIndexIndexWebViewTemplate: function(t, a) {
			var e = !1;
			return t.data.basic && !t.data.basic.module_visible ? e : e = '<div class="home_ant_webview " ui-mta-modular data-mta_name="' + t.mta_name + '" style="' + this.getClass(t.data.css) + '" >' + t.data.config[0] + '</div><div class="hr"></div>'
		},
		getIndexTodayBigTemplate: function(t, a) {
			var e = !1;
			if (t.data.basic && !t.data.basic.module_visible) return e;
			return e = '<div class="home_ant_brand " style="' + this.getClass(t.data.css) + ("" != t.data.config.img ? " background-image:url(" + t.data.config.img + ") " : "") + '" ><div class="tab" style=""><a class="img"><img src="' + t.data.config.logo + '" /></a> <div class="nr"><h3 class="bt" style="' + t.data.config.d_name_style + '">' + t.data.config.d_name + '</h3> <p class="text" style="' + t.data.config.name_style + '">' + t.data.config.name + '</p> </div> </div><div class="swiper-container  swiper-container-horizontal"><ul class="swiper-wrapper" data-type="' + t.data.config.reload_type + '" ui-mta-modular data-mta_name="' + t.mta_name + '" >' +
			function() {
				var a = "";
				return $.each(t.data.config.list, function(t, e) {
					a = a + '<div class="swiper-slide"><div class="swiper-cent"><div class="cent"><a href="' + (this.status ? this.jump_url : "javascript:;") + '" class="img" data-mold="' + this.mold + '" data-el="' + (t + 1) + '" data-addr="' + this.jump_url + '">' + ("" != this.show_label ? '<span class="but">' + this.show_label + "</span>" : "") + (this.status ? "" : '<span class="msg">已抢光</span>') + '<img src="' + this.pic + '_310x310.jpg" alt="">' + ("" != this.show_label_down ? '<p class="text">' + this.show_label_down + "</p> " : "") + '</a><p class="name">' + this.d_title + '</p><p class="money"><i>¥</i>' + $cmsApi.accSub(this.yuanjia, this.quan_jine) + " <del>¥" + this.yuanjia + "</del></p></div></div></div>"
				}), a
			}() + '</div></ul></div><div class="hr"></div>'
		},
		getIndexWillBringTemplate: function(t, a) {
			var e = !1;
			if (t.data.basic && !t.data.basic.module_visible) return e;
			return e = '<div class="home_ant_voucher " style="' + this.getClass(t.data.css) + '" ><h3 class="home_h3 row-s"><div class="col-mar"><div class="col-12-4 text-left">        <i></i>' + (t.data.basic.title || "大家都在领") + '    </div>    <div class="col-12-8 text-right" style="display:none">        <span ui-home-number data-time="2" >--.--.--.--</span> 次实时领券    </div></div></h3><div class="swiper-container  swiper-container-horizontal"><ul class="swiper-wrapper" data-type="' + t.data.config.reload_type + '" data-time="' + t.data.config.reload_time + '" ui-mta-modular data-mta_name="' + t.mta_name + '" >' +
			function() {
				var a = "";
				return $.each(t.data.config.list, function(t, e) {
					var i = Math.ceil(100 * $cmsApi.accDiv(this.quan_over, $cmsApi.accAdd(this.quan_over, this.quan_num)));
					a = a + '<div class="swiper-slide"><div class="swiper-cent"><div class="cent"><a href="' + (this.status ? this.jump_url : "javascript:;") + '" class="img" data-mold="' + this.mold + '" data-el="' + (t + 1) + '" data-addr="' + this.jump_url + '">' + (this.status ? "" : '<span class="msg">已抢光</span>') + '<img src="' + this.pic + '_310x310.jpg" alt=""><p class="text">' + $cmsApi.digitalAbbNumber(parseInt(this.quan_over)) + "<span>人已领</span> <i>|</i> " + this.quan_jine + '元券</p> </a><p class="name">' + this.d_title + '</p><p class="money"><i>¥</i>' + $cmsApi.accSub(this.yuanjia, this.quan_jine) + " <del>¥" + this.yuanjia + '</del></p><p class="progress" data-progress="' + (this.status ? i : 100) + '"><i></i></p></div></div></div>'
				}), a
			}() + '</div></ul></div><div class="hr"></div>'
		},
		getIndexOfferLettersTemplate: function(a, e) {
			var i = !1;
			if (a.data.basic && !a.data.basic.module_visible) return i;
			var n = function(t, a) {
					var e = "";
					return $.each(a, function(a, i) {
						e = e + '<span style="' + t.d_tag_style + '">' + this + "</span>"
					}), e
				};
			return i = '<div class="home_ant_express " style="' + this.getClass(a.data.css) + '" ><img class="img" src="' + (a.data.config.logo ||"/static/wap/images/kblogo.png") + '" alt="" /><ul class="ant_home_banner" data-type="' + a.data.config.reload_type + '" data-time="' + a.data.config.reload_time + '" ui-mta-modular data-mta_name="' + a.mta_name + '" >' +
			function() {
				var t = "";
				return $.each(a.data.config.list, function(a, e) {
					t = t + '<li class="' + (0 == a ? "active" : "") + '"><a href="' + this.jump_url + '" data-mold="' + this.mold + '" data-el="' + (a + 1) + '" data-addr="' + this.jump_url + '" ><div class="text"><p class="name">' + (this.tag && "" != this.tag ? '<span style="' + this.tag_style + '">' + this.tag + "</span>" : "") + '<font style="' + this.name_style + '">' + this.name + '</font></p><div class="tab">' + n(this, this.d_tag) + '</div></div> <img class="bg" src="' + this.img + '" alt="" /></a></li>'
				}), t
			}() + '</ul></div><div class="hr"></div>'
		},
		getIndexImageNavTemplate: function(t, a) {
			var e = !1;
			return t.data.basic && !t.data.basic.module_visible ? e : e = '<div style="' + this.getClass(t.data.css) + '"   class="home_ant_banner"><div class="row-s" ui-mta-modular data-mta_name="' + t.mta_name + '" >' +
			function() {
				var a = "";
				return $.each(t.data.config, function(t, e) {
					a = a + '<a href="' + this.jump_url + '" class="img" data-mold="' + this.mold + '" data-el="' + (t + 1) + '" data-addr="' + this.jump_url + '" ><img src="' + this.img + '" alt="" /></a> ' + (this.close_btn ? '<a href="javascript:;" class="close iconfont icon-guanbi" data-time="' + this.close_btn_time + '"></a>' : "")
				}), a
			}() + '</div></div><div class="hr"></div>'
		},
		getIndexBannerNavTemplate: function(t, a) {
			var e = !1;
			return t.data.basic && !t.data.basic.module_visible ? e : e = '<div class="ui_swiper" >     <div class="swiper-container"   >         <div class="swiper-wrapper" ui-mta-modular data-mta_name="' + t.mta_name + '">' +
			function() {
				var a = "";
				return $.each(t.data.config, function(t, e) {
					a = a + '<div class="swiper-slide" ><a ' +
					function() {
						var t = "";
						if (!e.tongji) return t;
						for (var a in e.tongji) t = t + "data-" + a + "='" + e.tongji[a] + "' ";
						return t + "ui-utm "
					}() + 'href="' + this.jump_url + '" data-mold="' + this.mold + '" data-el="' + (t + 1) + '" data-addr="' + this.jump_url + '" ><img src="' + this.img + '" alt=""></a></div>'
				}), a
			}() + '         </div>         <div class="swiper-pagination"></div>     </div> </div><div class="hr"></div>'
		},
		getIndexIconNavTemplate: function(t, a) {
			var e = !1;
			return t.data.basic && !t.data.basic.module_visible ? e : e = '<div class="home_nav" style="' + this.getClass(t.data.css) + '" >    <ul class="row-s" ui-mta-modular  data-mta_name="' + t.mta_name + '">' +
			function() {
				var a = "";
				return $.each(t.data.config.data, function(e, i) {
					a = a + '<li class="' + (4 == parseInt(t.data.config.num) ? "col-12-3" : "col-10-2") + '"><a href="' + this.jump_url + '"  data-mold="' + this.mold + '" data-el="' + (e + 1) + '" data-addr="' + this.jump_url + '"  ><i class="iconfont"><img src="' + this.img + '" alt="" /></i><span style="' + this.name_style_id + '">' + this.name + "</span></a></li>"
				}), a
			}() + '    </ul></div><div class="hr"></div>'
		},
		getIndexContentNavTemplate: function(t, a) {
			var e = !1;
			if (t.data.basic && !t.data.basic.module_visible) return e;
			var i = function(t) {
					var a = "";
					return $.each(t.img_list, function(t, e) {
						a = a + '<p class="' + (0 == t ? "active" : "") + '"><img src="' + this + '" alt=""></p>'
					}), a
				};
			return e = '<div class="home_ant_list home_ant_num' + t.data.config.length + '" style="' + this.getClass(t.data.css) + '">    <ul class="row-s"  ui-mta-modular  data-mta_name="' + t.mta_name + '" >' +
			function() {
				var e = "";
				return $.each(t.data.config, function(t, n) {
					e = e + '<li class="li' + (t + 1) + '">    <a href="' + this.jump_url + '" data-mold="' + this.mold + '" data-el="' + (t + 1) + '" data-addr="' + this.jump_url + '">        <h3 style="' + this.name_style_id + '">' + this.name + "</h3>" + (1 != parseInt(this.count_down) && this.down_time ? '<div class="time ant_home_time" data-key="' + a + '" data-type="' + t + '" data-index="' + t + "\" data-time='" + JSON.stringify(this.down_time) + "'><span>" + this.down_time.field + '</span><i class="iconfont">--:--:--</i></div>' : '<div class="text" style="' + this.d_name_style_id + '">' + this.d_name + "</div>") + '        <div class="imglist ant_home_banner"  data-type="' + this.show_img_type + '">' + i(this) + "        </div>    </a></li>"
				}), e
			}() + '    </ul></div><div class="hr"></div>'
		},
		getClass: function(t) {
			var a = "";
			for (var e in t) a = a + e + ":" + t[e] + ";";
			return a
		},
		getSwitchType: function(t, a) {
			switch (t.type) {
			case "indexBannerNav":
				return this.getIndexBannerNavTemplate(t, a);
			case "indexIconNav":
				return this.getIndexIconNavTemplate(t, a);
			case "indexContentNav":
				return this.getIndexContentNavTemplate(t, a);
			case "indexContentThreeNav":
				return this.getIndexContentNavTemplate(t, a);
			case "indexImageNav":
				return !$cmsApi.getCookie("INDEX_IMAGE_CLOSE") && this.getIndexImageNavTemplate(t, a);
			case "indexOfferLetters":
				return this.getIndexOfferLettersTemplate(t, a);
			case "indexTodayBig":
				return this.getIndexTodayBigTemplate(t, a);
			case "indexWillBring":
				return this.getIndexWillBringTemplate(t, a);
			case "indexWebView":
				return this.getIndexIndexWebViewTemplate(t, a);
			case "indexWebView":
				return this.getIndexIndexWebViewTemplate(t, a);
			default:
				return console.log("数据格式 " + t.type), !1
			}
		},
		getDownTime: function(t, a) {
			function e() {
				var n = new Date;
				n = n.getTime() + c;
				var s = r - n;
				if (s > 0) {
					var o = new Date;
					o = o.getTime();
					var d, l, m, u;
					d = Math.floor(s / 864e5), s -= 864e5 * d, l = Math.floor(s / 36e5), s -= 36e5 * l, m = Math.floor(s / 6e4), s -= 6e4 * m, u = Math.floor(s / 1e3), d && (l = 24 * d + l), l < 10 && (l = "0" + l), m < 10 && (m = "0" + m), u < 10 && (u = "0" + u);
					var h = [l ? l : "00", m, u];
					if (a(h), 0 == t.number) return !1;
					i = setTimeout(function() {
						e()
					}, 1e3)
				} else a(!1), clearTimeout(i)
			}
			var i, n = new Date(t.start),
				s = n.getTime(),
				o = new Date(t.end),
				r = o.getTime(),
				d = new Date,
				l = d.getTime(),
				c = s - l;
			i = setTimeout(function() {
				e()
			}, 1e3)
		}
	},
		e = function() {
			this.$scope = {
				item: !1
			}
		};
	e.prototype.init = function(t, a) {
		this.$element = a, this.$scope = $.extend(!0, this.$scope, t), this.showItem()
	}, e.prototype.showItem = function() {
		var t = this,
			e = "";
		$.each(this.$scope.item, function(t, i) {
			var n = a.getSwitchType(this, t);
			n && (e += n)
		}), $(this.$element).html(e);
		var i = setInterval(function() {
			Swiper && (new Swiper(".ui_swiper .swiper-container", {
				autoplay: 5e3,
				pagination: ".swiper-pagination",
				paginationClickable: ".swiper-pagination",
				nextButton: ".swiper-button-next",
				prevButton: ".swiper-button-prev"
			}), new Swiper(".home_ant_voucher .swiper-container", {
				slidesPerView: "auto",
				initialSlide: 0
			}), clearInterval(i))
		}, 300);
		$.each($(this.$element).find(".ant_home_banner"), function(a, e) {
			t.contentNav.homeBanner(this, $(this).data("type"))
		}), $.each($(this.$element).find(".ant_home_time"), function(a, e) {
			t.contentNav.showDownTime(this, $(this).data("time"))
		}), $(".home_ant_banner .close").unbind("click").on("click", function(a) {
			a.preventDefault(), t.indexImageNav.init(a)
		}), this.contentNav.homeScroll(this.$element), this.fixedNavHeader(), wui.init("directive")
	}, e.prototype.indexImageNav = {
		init: function(t) {
			$cmsApi.setCookie("INDEX_IMAGE_CLOSE", !1, new Date(1e3 * $(t.target).data("time"))), $(".home_ant_banner").next(".hr").remove(), $(".home_ant_banner").remove()
		}
	}, e.prototype.contentNav = {
		setTimeIndex: 0,
		showDownTime: function(t, e) {
			var i = this,
				n = $(t).data("index");
			$cmsApi.getTime(function(s) {
				a.getDownTime({
					start: 1e3 * parseFloat(s),
					end: 1e3 * e.time
				}, function(a) {
					if (a && 1 == n) $(t).addClass("active").find(".iconfont").html(a[0] + ":" + a[1] + ":" + a[2]);
					else if (a && 1 != n) $(t).removeClass("time").addClass("active").addClass("time_two").html("<b>" + a[0] + "</b>:<b>" + a[1] + "</b>:<b>" + a[2] + "</b>");
					else if (a) $(t).addClass("active");
					else {
						if (i.setTimeIndex > 1) return !1;
						$cmsApi.ajax({
							url: "/?m=ajax&a=cdown",
							data: {
								type: $(t).data("type"),
								key: $(t).data("key")
							}
						}).done(function(a) {
							a.data.down_time && (i.showDownTime(t, a.data.down_time), $(t).find("span").html(a.data.down_time.field)), i.setTimeIndex++
						})
					}
				})
			})
		},
		homeBanner: function(t, a) {
			var e = function(t, a) {
					var e = 20;
					do {
						var i = Math.floor(Math.random() * a);
						if (-1 == t.indexOf(i)) return i;
						e--
					} while (e)
				},
				i = function(n) {
					var s = $(t).find(">*"),
						o = $(t).find(">*.active").index(),
						r = $(t).find(">*.active");
					switch (parseInt(a)) {
					case 2:
						return 1 != s.length && (o += 1, r.removeClass("active").addClass("tow"), $(t).find(">*:eq(" + (o == s.length ? 0 : o++) + ")").addClass("active"), setTimeout(function() {
							r.removeClass("tow")
						}, 400), i);
					case 3:
						var d = e([100], s.length);
						r.removeClass("active").addClass("tow"), $(t).find(">*:eq(" + d + ")").addClass("active"), setTimeout(function() {
							r.removeClass("tow")
						}, 400);
						break;
					default:
						return !1
					}
				};
			if (3 == parseInt(a)) i();
			else {
				setInterval(i, 1e3 * $(t).data("time") || 5e3)
			}
		},
		homeScroll: function(t) {
			var a = $(t).find(".progress").offset().top;
			$(document).scroll(function(e) {
				a <= $(window).scrollTop() + $(window).height() / 3 && $.each($(t).find(".progress i"), function(t, a) {
					$(this).css({
						width: $(this).parents(".progress").data("progress") + "%"
					})
				})
			})
		}
	}, e.prototype.fixedNavHeader = function() {
		var t = $(window).width(),
			a = 0,
			e = !1;
		$(document).on("scroll", function() {
			e || (e = !0, setTimeout(function() {
				e = !1
			}, 50), $(document).scrollTop() >= t && $(document).scrollTop() > a ? $("body>.header_pr,.ui_icon_tab").css({
				"-webkit-transform": "translateY(-46px) translateX(0)",
				transform: "translateY(-46px) translateX(0)"
			}) : $(document).scrollTop() < a - 10 && $("body>.header_pr,.ui_icon_tab").css({
				"-webkit-transform": "translateY(0) translateX(0)",
				transform: "translateY(0) translateX(0)"
			}), a = $(document).scrollTop())
		})
	}, t.homeModels = new e
}(wui);