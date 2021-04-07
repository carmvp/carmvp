function setCookie(e, t, a) {
	var o = new Date;
	o.setTime(o.getTime() + a), document.cookie = e + "=" + escape(t) + (";expires=" + o.toGMTString())
}
function getCookie(e) {
	return document.cookie.length > 0 && (c_start = document.cookie.indexOf(e + "="), c_start != -1) ? (c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}
var randData = function(e, t, a, o) {
		var i = "";
		if (a = 1 == a.switch_type ? a : a.data[0], 2 == t) {
			var s;
			if (s = "" == getCookie(o) ? "" : getCookie(o), a.data.length > 1) {
				for (var c = a.data.length, n = [], _ = 0; _ < c; _++) a.data[_].ad_id != s && n.push(a.data[_]);
				c = parseInt(Math.random() * n.length), i = n[c]
			} else i = a.data[0];
			s = i.ad_id, setCookie(o, s, 1e16)
		} else i = a;
		return i
	},
	scrollData = function(e, t, a) {
		var o = [{}],
			i = new Array,
			s = a.data;
		if (2 == e) {
			if (o.switch_time = a.switch_time, 1 == t);
			else {
				for (var c = s.length, n = 0; n < c; n++) {
					var _ = parseInt(Math.random() * s.length);
					i.push(s[_]), s.splice(_, 1)
				}
				s = i
			}
			o.data = s
		}
		return o
	};
$(document).ready(function(e) {
	var t = "/?m=ajax&a=recomd";
	$.ajax({
		type: "POST",
		url: t,
		data: {
		},
		dataType: "json",
		success: function(e) {
			if (0 == e.status && e.data.length > 0) {
				if (e.data[0].cms_wap_index && e.data[0].cms_wap_index.data.length > 0) {
					var t = e.data[0].cms_wap_index,
						a = 1 == t.close_btn ? '<span class="ggw_fm_close ggw_fm_close_box"></span>' : "",
						o = 1 == t.close_after ? "ggw_cok" : "",
						i = randData(t.switch_type, t.content_source, t, "cms_wap_sort_index"),
						s = '<div class="ggw_fm cms_ggw ' + o + '" data-cok="cms_wap_index"><div class="ggw_fm_cover  "></div><div class="ggw_fm_main"><a href="' + i.href + '" ><img src="' + i.img_url + '" alt=""></a></div>' + a + "</div>";
					1 == t.close_after ? 0 == getCookie("cms_wap_index") && "" != getCookie("cms_wap_index") || $("body").append(s) : (setCookie("cms_wap_index", "0", 1), $("body").append(s))
				}
				if (e.data[0].cms_wap_right && e.data[0].cms_wap_right.data.length > 0) {
					var c = e.data[0].cms_wap_right,
						a = 1 == c.close_btn && 3 != c.close_after ? '<span class="ggw_fm_close"></span>' : "",
						o = 1 == c.close_after ? "ggw_cok ggw_clo" : 2 == c.close_after ? "ggw_clo" : "",
						n = randData(c.switch_type, c.content_source, c, "cms_wap_sort_right"),
						_ = '<div class="ggw_fr cms_ggw ' + o + '" data-cok="cms_wap_right"><div class="ggw_fr_main"><a href="' + n.href + '"><img src="' + n.img_url + '" alt=""></a>' + a + "</div></div>";
					1 == c.close_after ? 0 == getCookie("cms_wap_right") && "" != getCookie("cms_wap_right") || $("body").append(_) : (setCookie("cms_wap_right", "0", 1), $("body").append(_))
				}
			}
		}
	}).then(function() {
		var e = "<style></style>";
		$("body").append(e), $(".ggw_fm").length > 0 && ($(document).scrollTop(0), $("body").css("overflow", "hidden"));
		var t = new Date;
		if (t.setHours("23"), t.setMinutes("59"), t.setSeconds("60"), $(".ggw_cok a").click(function() {
			document.cookie = $(this).parents(".ggw_cok").data("cok") + "=" + escape(0) + (";expires=" + t.toGMTString())
		}), $(".ggw_fm_close").click(function() {
			document.cookie = $(this).parents(".ggw_cok").data("cok") + "=" + escape(0) + (";expires=" + t.toGMTString())
		}), $(".ggw_fm_close").on("click", function() {
			$(this).hasClass("ggw_fm_close_box") ? $(this).parent().remove() : $(this).parent().parent().remove(), $("body").css("overflow", "")
		}), $(".ggw_fm_main a").on("click", function(e) {
			var t = $(this).attr("href");
			$("body").css("overflow", ""), $(".ggw_fm").remove(), setTimeout(function() {
				window.location.href = t
			}, 10)
		}), $(".ggw_clo a").on("click", function(e) {
			var t = $(this).attr("href");
			$(this).parents(".ggw_clo").remove(), setTimeout(function() {
				window.location.href = t
			}, 10)
		}), $("#ggw_fm_swiper").length > 0 && 0 != $(".ggw_fm_swiper").data("time") && $(".ggw_fm_swiper_slide").length > 1) {
			var a = new Swiper(".ggw_fm_swiper", {
				loop: !0,
				autoplay: $(".ggw_fm_swiper").data("time")
			});
			document.getElementById("ggw_fm_swiper").ontouchend = function(e) {
				a.startAutoplay()
			}, document.getElementById("ggw_fm_swiper").ontouchstart = function(e) {
				a.stopAutoplay()
			}
		}
		window.onresize = function() {
			$(".ggw_fm_swiper_slide").height($(".ggw_fm_swiper").width() / 4), $(".ggw_fm_swiper").height($(".ggw_fm_swiper").width() / 4)
		}, $(".ggw_fm_swiper_slide").height($(".ggw_fm_swiper").width() / 4), $(".ggw_fm_swiper").height($(".ggw_fm_swiper").width() / 4)
	})
});