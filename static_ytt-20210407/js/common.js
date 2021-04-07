!function() {    
    var $cmsApi = {		
        loadProgress: 100,
        loadAnimation: function(e) {
            var t = $('<div class="ui_load"><p></p></div><div class="ui_load_bg"></div>');
            0 == $(".ui_load").length && $("body").append(t);
            var i = e < 50 ? 3e3: e < 80 ? 800 : 200;
            return $(".ui_load").find("p").animate({
                width: e + "%"
            },
            i),
            e == this.loadProgress && setTimeout(function() {
                $(".ui_load,.ui_load_bg").fadeOut("400",
                function() {
                    $(this).remove()
                })
            },
            800),
            t
        },
		jsonAjax: function (e, t) {
            e = $.extend(!0, {
                dataType: 'jsonp',
                jsonp: 'callback',
            }, e);
            return e.data = e.data || {}, $.ajax(e).done(function (e) {
                t ? t(e) : 0 != e.ret[0] && e.ret[0] != -1 && e.ret[0] && "SUCCESS::调用成功" != e.ret[0] && "" != e.ret[0] && layer.msg(e.msg)
            }).error(function () {
                
            })
        },
		postAjax: function (e, t) {
            e = $.extend(!0, {
                type: "POST",
                dataType: "JSON"
            }, e);
            return e.data = e.data || {}, $.ajax(e).done(function (e) {
                t ? t(e) : 0 != e.status && e.status != -1 && e.msg && "ok" != e.msg && "" != e.msg 
            }).error(function () {
                
            })
        }
	};
    window.cmsApi = $cmsApi
} ();