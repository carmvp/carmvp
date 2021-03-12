!function(i) {
	"use strict";
	var e = {
		swiperIndex: 0,
		template: function(i, e) {
			var t = this;
			return '<div class="cent" >    <div class="ant ">        <a href="' + i[0].jump_url + '" class="' + (0 == e.active ? "active" : "") + ' " >' + i[0].name + '</a>    </div>    <div class="swiper-wrapper">' +
			function() {
				var s = "";
				return $.each(i, function(i, a) {
					0 !== i && (t.swiperIndex = e.active == parseInt(this.cid) ? i : t.swiperIndex, s = s + ' <div class="swiper-slide ' + (e.active == parseInt(this.cid) ? "active" : "") + '" ><a href="' + this.jump_url + '" >' + this.name + "</a></div>")
				}), s
			}() + '    </div>    <a href="javascript:;" class="whole iconfont icon-xia"></a><div class="ullit_tab" style="width:' + $(window).width() + 'px;" >选择分类</div>    <div class="ullit" style="width:' + $(window).width() + 'px;left:-50px;"><ul class="row-s col-mar">' +
			function() {
				var s = "";
				return $.each(i, function(i, a) {
					t.swiperIndex = e.active == parseInt(this.cid) ? i : t.swiperIndex, s = s + '<li class="col-12-3 text-center"><a href="'  + this.jump_url + '"><i class="iconfont "><img src="' + this.icon + '" / ></i><span>' + this.name + "</span></a></li>"
				}), s
			}() + "</ul>    </div></div>"
		},
		getActiveItem: function(i, e, t, s) {
			var a = "",
				c = "",
				n = 0;
			i.data;
			return $.each(i.data, function(i, l) {
				this.cid == e[0] && (api.config.initialSlide = i < 3 ? 0 : i - 2), a = a + "<div class='swiper-slide " + (this.cid == e[0] ? "active" : "") + "'><a href='" + l.url + "' data-cid='" + this.cid + "'>" + this.name + "</a></div>", this.cid == e[0] && (n = i, c = function() {
					var i = "";
					return $.each(l.sub_class, function(t, s) {
						i = i + '<li style="" class="cat-item ' + (this.cid == e[0] ? "active" : "") + '" ><a href="' + this.jump_url + '"><img class="lazy" src="/static/wap/images/1.png" data-original="' + this.icon + '_310x310.jpg" alt=""><span>' + this.name + "</span></a></li>"
					}), i
				}())
			}), c = "" != c ? "<ul>" + c + "<div class='ov_h'></div></ul>" : "", [a, c]
		}
	},
		t = function() {
			this.$scope = {
				url: "/",
				item: !1,
				callback: !1,
				ready: !1,
				active: 0,
				config: {
					slidesPerView: "auto",
					initialSlide: 0
				}
			}
		};
	t.prototype.init = function(i, e) {
		return this.$element = e, this.$scope = $.extend(!0, this.$scope, i), !$(e).attr("isLoad") && ($(e).attr("isLoad", !0), void this.getClassItem())
	}, t.prototype.getClassItem = function() {
		var i = this.$scope,
			e = this;
		i.item ? e.showClass(i.item) : $cmsApi.ajax({
			url: i.url
		}).done(this.showClass.bind(this))
	}, t.prototype.showClass = function(i) {
		var t = this;
		this.$scope.item = i.data;
		var s = $(this.$element).offset().top;
		this.$scope.fixed && ($(this.$element).css({
			top: s <= 39 || s > 80 ? 45 : s + "px"
		}).addClass("fixed"), $(this.$element).after('<div class="ui_icon_tab_bg"></div>')), $(this.$element).html(e.template(this.$scope.item, this.$scope)), this.$scope.config.initialSlide = e.swiperIndex;
		var a = setInterval(function() {
			Swiper && (new Swiper(t.$element.find(".cent"), t.$scope.config), clearInterval(a))
		}, 300),
			c = $('<div class="classify_bg"></div>');
		$(this.$element).find(".whole").unbind("click").on("click", function() {
			$(".classify_bg").length ? c.remove() : $(t.$element).after(c), $(t.$element).toggleClass("active"), c.unbind("click").on("click", function() {
				$(t.$element).removeClass("active"), c.remove()
			})
		}), $(document).on("scroll", function() {
			$(t.$element).removeClass("active"), c.remove()
		})
	}, i.modelsGoodsClassify = new t
}(wui);