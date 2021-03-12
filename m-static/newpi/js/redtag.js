function getinfos() {
    var a = $("#searchprompt").val();  
	if ("" == a) return $(".searchprompt-info").hide(),
    $("#sugwords").html("").height(0),    
    !1;
    var b = encodeURIComponent(a);
    $.ajax({
        dataType: "jsonp",
        url: "https://suggest.taobao.com/sug?extras=1&code=utf-8&q=" + b,
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
            j = -1,
            c && $(".searchprompt-info").show(),
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
		layer.msg('搜索中，请稍侯', {icon: 16,shade: 0.5});
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

searchHotWord = {
    init: function() {
        $.ajax({
            dataType: "jsonp",
            url: "https://textlink.simba.taobao.com/lk?number=26",
            data: "",
            success: function(a) {
                var b, c, d = [],
                e = [],
                f = "",
                g = "";
                for (b = 1; 11 > b; b++) 2 == b || 5 == b || 8 == b ? d.push('<a class="red" href="'+yangtataER.root +'/?m=search&a=index&k=' + a.data[b][0] + '"  target="_blank">' + a.data[b][0] + "</a>") : 3 == b || 6 == b || 9 == b ? d.push('<a class="blue" href="'+yangtataER.root +'/?m=search&a=index&k=' + a.data[b][0] + '"  target="_blank">' + a.data[b][0] + "</a>") : d.push('<a href="'+yangtataER.root +'/?m=search&a=index&k=' + a.data[b][0] + '" target="_blank">' + a.data[b][0] + "</a>"),
                10 != b && d.push("<span>|</span>");
                for (c = 11; 26 > c; c++) e.push('<a href="'+yangtataER.root +'/?m=search&a=index&k=' + a.data[c][0] + '"  target="_blank">' + a.data[c][0] + "</a>");
                f = d.join(""),
                g = e.join(""),
                $("#searchprompt").val(a.data[0][0]),
                $("#js-hot-keys").html("" + f)
            }
        })
    }
};
$(function() {
    return ie6 || ie7 ? (searchHotWord.init(), $("#searchprompt").addClass("focused").blur(), !1) : (initeventinput(), searchHotWord.init(), $("#searchForm").bind("submit",
    function() {
        $(".searchprompt-info").hide()
    }), void $(document).click(function(a) {
        a.target == document.getElementById("searchprompt") ? ("" == $("#sugwords").html() && ($(".searchprompt-info").hide()), getinfos(), $("#searchprompt").hasClass("focused") || $("#searchprompt").addClass("focused").select()) : ($(".searchprompt-info").hide(), $("#searchprompt").removeClass("focused"))
    }))
});

 

var isIE = !!window.ActiveXObject,
width = $(window).width(),
ie6 = isIE && !window.XMLHttpRequest,
ie7 = "Microsoft Internet Explorer" == navigator.appName && "7." == navigator.appVersion.match(/7./i);