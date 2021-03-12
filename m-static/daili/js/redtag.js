function getinfos() {
    var a = $("#searchprompt").val();
    if (a = a.replace(/(^\s*)|(\s*$)/g, ""), "" == a) return $(".searchprompt-info").show(),
    $("#sugwords").html("").height(0),    
    !1;
    var b = encodeURIComponent(a);
    $.ajax({
        dataType: "jsonp",
        url: "http://suggest.taobao.com/sug?extras=1&code=utf-8&q=" + b,
        success: function(a) {
            for (var b = a.result,
            c = "",
            d = b.length,
            e = 0,
            f = 0; d > f; f++) c += "<li>",
            c += b[f][0] + "",
            c += "</li>";
            $("#sugwords").html(c),
            e = 24 * d,
            $("#sugwords").height(e),
            7 >= d && d > 0 ? $("#js-hot-more").hide() : 10 == d ? $("#js-hot-more").show().width(190).height(240).removeClass("active").find("a").removeClass("l8") : 8 == d ? $("#js-hot-more").show().width(190).height(192).removeClass("active").find("a").addClass("l8") : 0 == d && $("#js-hot-more").show().width(190).height(e).removeClass("active").find("a").removeClass("l8"),
            j = -1,
            ylen = $(".searchprompt-info li").length,
            0 == ylen ? $("#js-hot-more").addClass("active") : $(".searchprompt-info").show(),
            initevent()
        }
    })
}
function initevent() {
    var a = $(".searchprompt-info li");
    a.hover(function() {
        $(this).addClass("cur").siblings().removeClass("cur"),
        j = $(this).index()
    },
    function() {
        $(this).removeClass("cur")
    }),
    a.click(function() {
        $("#searchprompt").val($(this).html()),
        $(".searchprompt-info").hide(),
        $("#searchForm").submit(),
		squan = layer.open({
        type: 2,
        content: '查询中,请稍等...'
       })
    })
}
function initeventinput() {
    $("#searchprompt").keydown(function(a) {
        var b = a.keyCode || a.which || a.charCode,
        c = $(".searchprompt-info li"),
        d = $("#searchprompt");
        if (38 == b ? (j--, 0 > j && (j = ylen - 1)) : 40 == b && (j++, j >= ylen && (j = 0)), 38 == b || 40 == b) {
            c.eq(j).addClass("cur").siblings().removeClass("cur");
            var e = c.eq(j).html();
            e && (e = e.replace(/(^\s*)|(\s*$)/g, "")),
            "" != e && null != e && d.val(c.eq(j).html())
        }
    }),
    $("#searchprompt").keyup(function(a) {
        var b = a.keyCode || a.which || a.charCode;
        38 != b && 40 != b && getinfos()
    })
}



$(function() {
    return ie6 || ie7 ? ( $("#searchprompt").addClass("focused").blur(), !1) : (initeventinput(), $("#searchForm").bind("submit",
    function() {
        $(".searchprompt-info").hide()
    }), void $(document).click(function(a) {
        a.target == document.getElementById("searchprompt") ? ("" == $("#sugwords").html() && $(".searchprompt-info").show(), getinfos(), $("#searchprompt").hasClass("focused") || $("#searchprompt").addClass("focused").select()) : ($(".searchprompt-info").hide(), $("#searchprompt").removeClass("focused"))
    }))
}); 

var isIE = !!window.ActiveXObject,
width = $(window).width(),
ie6 = isIE && !window.XMLHttpRequest,
ie7 = "Microsoft Internet Explorer" == navigator.appName && "7." == navigator.appVersion.match(/7./i);