var type_num = $("a[data-check='1']").attr("data-type"),
csh_type = $("a[data-check='1']").attr("data-types"),
cre_cc = $(".swiper-slide[data-check='1']"),
now_cc = parseInt(cre_cc.attr("data-hour")),
time_min = (new Date).getMinutes(),
time_hour = (new Date).getHours(),
wap_ddq = new Vue({
    el: "#wap_ddq",
    data: {
        datas: data[type_num].list,
        recDatas: data[type_num].commend_arr,
        bkDatas: data[type_num].host_arr,
        notStart: !1,
        icoBk: !1
    },
    filters: {
        int1: function(e) {
            return parseFloat(e).toFixed(2).replace(/[.]?0+$/, "")
        },
        "int": function(e) {
            return parseFloat(e).toFixed(0)
        },
        indent: function(e) {
            return "【" == e.split("")[0] ? '<i style="margin-left: -0.5em"></i>' + e: e
        }
    },
    methods: {
        jump: function(e, t, a) {
            this.datas = data[e].list,
            this.recDatas = data[e].commend_arr,
            this.bkDatas = data[e].host_arr,
            1 == t ? (1 == a && time_hour - now_cc < 1 && time_min < 10 ? this.icoBk = !1 : this.icoBk = !0, this.notStart = !1, $(".goods-list").eq(3).after($(".rec-goods.bkfc"))) : this.notStart = !0
        }
    },
    mounted: function() {
        0 == csh_type ? this.notStart = !0 : time_hour - now_cc < 1 && time_min < 10 ? this.icoBk = !1 : this.icoBk = !0,
        $(".goods-list").eq(3).after($(".rec-goods.bkfc")),
        $(".swiper-slide[data-check='1']").addClass("active"),
        $(".lazy").lazyload({
            effect: "fadeIn"
        })
    },
    updated: function() {
        $(".lazy").lazyload({
            effect: "fadeIn"
        })
    }
}),
creIndex = $(".swiper-slide[data-check='1']").index() - 2,
mySwiper = new Swiper(".swiper-container", {
    direction: "horizontal",
    slidesPerView: 5,
    initialSlide: creIndex
});
$(".swiper-slide").click(function() {
    mySwiper.slideTo(parseInt(mySwiper.clickedIndex - 2), 1e3, !1),
    $(".swiper-slide").removeClass("active"),
    $(this).addClass("active"),
    $("title").html($(this).text() + "咚咚抢"),
    $(window).width() < 321 ? $(window).scrollTop() >= 109 && $(window).scrollTop(109) : 320 < $(window).width() && $(window).width() < 376 ? $(window).scrollTop() >= 126 && $(window).scrollTop(126) : $(window).scrollTop() >= 136 && $(window).scrollTop(136);
    var e = $(this).attr("data-type");
    "0" == data[e].list.length ? ($(".hasNogoods").find("p").text("(ง •̀_•́)ง 亲！本场好货还在精心挑选中"), $(".nogoods").addClass("ranking_ullit_default_icon")) : ($(".nogoods").removeClass("ranking_ullit_default_icon"), $(".hasNogoods").find("p").text("都是小编精心挑选的超值好货哦~(｡･∀･)ﾉﾞ")),
    
   ("showpage", {
        uid: $cmsLayer.getMtaCookie(),
        time: ((new Date).getHours() < 10 ? "0" + (new Date).getHours() : (new Date).getHours()) + ":" + ((new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes()),
        name: "咚咚抢"
    })
}),
$(window).load(function() {
    ("showpage", {
        uid: $cmsLayer.getMtaCookie(),
        time: ((new Date).getHours() < 10 ? "0" + (new Date).getHours() : (new Date).getHours()) + ":" + ((new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes()),
        name: "咚咚抢",
        siteid: standId,
        domainid: window.location.hostname.replace("www.", "")
    })
}),
$(".img-block").height($(".img-block .img").width()),
$(window).resize(function() {
    $(".img-block").height($(".img-block .img").width())
}),
$(window).scroll(function() {
    $(window).width() < 321 ? 108 < $(window).scrollTop() ? ($(".wap-banner").addClass("myfixed"), $(".wap-navTime").addClass("navFixed"), $(".zw-block").show()) : ($(".wap-banner").removeClass("myfixed"), $(".wap-navTime").removeClass("navFixed"), $(".zw-block").hide()) : 320 < $(window).width() && $(window).width() < 376 ? 126 < $(window).scrollTop() ? ($(".wap-banner").addClass("myfixed"), $(".wap-navTime").addClass("navFixed"), $(".zw-block").show()) : ($(".wap-banner").removeClass("myfixed"), $(".wap-navTime").removeClass("navFixed"), $(".zw-block").hide()) : 136 < $(window).scrollTop() ? ($(".wap-banner").addClass("myfixed"), $(".wap-navTime").addClass("navFixed"), $(".zw-block").show()) : ($(".wap-banner").removeClass("myfixed"), $(".wap-navTime").removeClass("navFixed"), $(".zw-block").hide())
}),
"0" == data[type_num].list.length ? ($(".hasNogoods").find("p").text("(ง •̀_•́)ง 亲！本场好货还在精心挑选中"), $(".nogoods").addClass("ranking_ullit_default_icon")) : ($(".nogoods").removeClass("ranking_ullit_default_icon"), $(".hasNogoods").find("p").text("都是小编精心挑选的超值好货哦~(｡･∀･)ﾉﾞ"));