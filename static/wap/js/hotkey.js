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
                for (b = 0; 13 > b; b++) d.push('<li class="src-item"><a href="' + Sopath+a.data[b][0]+Suffix + '" >' + a.data[b][0] + "</a></li>");
                for (c = 14; 26 > c; c++) e.push('<li class="src-item"><a href="' + Qsopath+a.data[c][0]+Suffix + '">' + a.data[c][0] + "</a></li>");
				d = d.sort(randomsort);
				e = e.sort(randomsort);
                f = d.join(""),
                g = e.join("");
                var num = Math.floor(Math.random()*26);
                $("#search_area").val(a.data[num][0]),	
				$('.search_kwd').html(a.data[num][0]),
                $(".dd").prepend(f);
				$(".cc").html("" + g)
            }
        })
    }
};

$(function() {
    return ie6 || ie7 ? (searchHotWord.init(), !1) : (searchHotWord.init())
});
var isIE = !!window.ActiveXObject,
width = $(window).width(),
ie6 = isIE && !window.XMLHttpRequest,
ie7 = "Microsoft Internet Explorer" == navigator.appName && "7." == navigator.appVersion.match(/7./i);

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;    
}
