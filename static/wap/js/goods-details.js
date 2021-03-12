!function() {
    function e() {
        var e = null,
        o = function(e) {
            var t = parseInt($(".outTime b").eq(e).html());
            if (t > 0) {
                if (3 != e) var t = t - 1 < 10 ? "0" + (t - 1) : t - 1;
                else t -= 1;
                $(".outTime b").eq(e).html(t)
            } else {
                if (! (e > 0)) return ! 1;
                if (0 == o(e - 1)) return 3 == e ? $(".outTime b").eq(e).html(0) : $(".outTime b").eq(e).html("00"),
                !1;
                3 == e ? $(".outTime b").eq(e).html(9) : $(".outTime b").eq(e).html(59)
            }
        };
        $(".outTime").length > 0 && (e = setInterval(function() {
            0 == o(3) && clearInterval(e)
        },
        100))
    }
	if ($("#anchors_info").length <= 0) return ! 1;
    $(".goods_video .iconfont").on("click",
    function() {
        $(this).parent().addClass("active").find("video");
        var e = document.getElementById("myVideo");
        e.play()
    }),
    $(document).scroll(function(e) {
        var a = $(document).scrollTop();
        i();
        var d = a / ($(window).width() / 2);
        if (d = d >= .9 ? 1 : d, d <= 1) {
            $(".header_goods .icon_header>div.title").css({
                opacity: d
            });
            var s = 255 * (1 - d);
            $(".header_goods .icon_header>a").css({
                background: "rgba(0,0,0," + 30 * (1 - d) / 100 + ")",
                color: "rgba(" + s + "," + s + "," + s + ",1)"
            })
        }
        a >= $(window).width() / 2 ? $(".header_goods").addClass("active") : $(".header_goods").removeClass("active"),
        a >= $("#anchors_title").offset().top - $(window).height() && !$("#anchors_title").attr("upload") && t(),
        0 != $("#goods_item_list").length && a >= $("#goods_item_list").offset().top - $(window).height() && !$("#goods_item_list").attr("upload") 
    }),
    $(".header_goods .icon_header>div.title a").on("click",
    function() {
        $(".header_goods .icon_header>div.title a").removeClass("active"),
        $("html,body").animate({
            scrollTop: $("#" + $(this).addClass("active").attr("anchors")).offset().top - 40
        },
        400)
    });    
    t = function() {},
    i = function(e) {
        var o = {
            info: $("#anchors_info").offset().top - 45,
            title: $("#anchors_title").offset().top - 45,			
            ant: $("#anchors_ant").offset().top - 45
        },
        t = $(document).scrollTop();
        t >= o.info && t < o.title ? ($(".header_goods .icon_header>div.title a").removeClass("active"), $(".header_goods .icon_header>div.title a[anchors='anchors_info']").addClass("active")) : 
		t >= o.title && t < o.ant ? ($(".header_goods .icon_header>div.title a").removeClass("active"), $(".header_goods .icon_header>div.title a[anchors='anchors_title']").addClass("active")): 		
		t >= o.ant && ($(".header_goods .icon_header>div.title a").removeClass("active"), $(".header_goods .icon_header>div.title a[anchors='anchors_ant']").addClass("active"))
    };
    $(".goods_swiper .swiper-container").css({
        height: $(window).width(),
        overflow: "hidden"
    }),
    e()
} ()