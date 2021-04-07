(function($){
    XDLightBox = function(k) {
        c = $;
        var a = this,
        f = null,
        d = c.extend({
            title: "",
            lightBoxId: "",
            ajax: false,
            contentHtml: "",
            scroll: false,
            isBgClickClose: true,
            type: "default"
        },
        k),
        b = null,
        i = null,
        h = null,
        j = function() {
            return (document.documentElement.scrollTop || document.body.scrollTop) + ((document.documentElement.clientHeight || document.body.clientHeight) - b.height()) / 2
        };
        a.getBoxFrame = function() {
            return b
        };
        a.getFrameId = function() {
            return d.lightBoxId
        };
        a.getBackground = function() {
            return h
        };
        a.close = function() {
            f && f.abort();
            b.remove();
            h.remove();
            c("body").unbind("keydown")
        };
        a.resize = function() {
            var a = (c(window).width() - b.width()) / 2,
            g = j();
            i.css({
                width: b.width(),
                height: b.height()
            });
            c.browser.msie && c.browser.version == "6.0" && h.css("height", document.documentElement.clientHeight || document.body.clientHeight);
            d.scroll ? c.browser.msie && c.browser.version == "6.0" ? (b.css({
                left: a,
                top: g
            }).show(), c(window).scroll(function() {
                var a = j();
                b.css("top", a)
            })) : (g = ((document.documentElement.clientHeight || document.body.clientHeight) - b.height()) / 2, b.css({
                left: a,
                top: g,
                position: "fixed"
            }).show()) : b.css({
                left: a,
                top: g
            }).show()
        };
        a.init = function() {
            if (d.lightBoxId != "") {
                if (d.type == "default") var e = XDTEMPLATE.lightBox.replace(/{title}/g, d.title).replace(/{id}/g, d.lightBoxId);
                e = d.ajax ? e.replace(/{body}/g, "") : e.replace(/{body}/g, d.contentHtml);
                c("body").append('<div class="alert_fullbgs"></div>'+e);
                b = c("#" + d.lightBoxId);
                i = c(".lb_fix");
                h = c(".alert_fullbgs");
                d.ajax && a.loading();
                a.resize();
                c(window).resize(function() {
                    a.resize()
                });
                c(".alert_close").click(function() {
                    a.close()
                });
                c(".alert_fullbgs").click(function() {
                    d.isBgClickClose && a.close()
                })
            }
        };
        a.fadeout = function() {
            f && 
            f.abort();
            b.fadeOut(500);
            h.fadeOut(500, 
            function() {
                a.close()
            })
        };
        a.startAjax = function(a) {
            f = a
        };
        a.buildContent = function(e) {
            var g = false;
            b.find(".alert_contents").size() == 0 && (b.find(".alert_box").html('<div class="alert_top"><span>' + d.title + '</span><a href="javascript:;" class="alert_close" ></a></div><div class="alert_contents"></div>'), g = true);
            b.find(".alert_contents").html(e);
            g && c("#" + d.lightBoxId + " .alert_close").click(function() {
                a.close()
            });
            a.resize()
        };
        a.success = function(e) {
            e = '<div class="alert_suc"><em></em><span>{text}</span><a href="javascript:;" class="close alert_close"></a></div>'.replace(/{text}/, 
            e);
            b.find(".lb_hd").hide();
            b.find(".alert_box").html(e);
            a.resize();
            b.find(".alert_bbg .alert_close").click(function() {
                a.close()
            });
            setTimeout(function() {
                a.fadeout()
            },
            1E3)
        };
        a.success_close = function(e, c) {
            var d = '<div class="lb_nohd"><a href="javascript:;" class="lb_close"></a><div class="lb_s">{text}</div></div>'.replace(/{text}/, e);
            b.find(".content").html(d);
            b.find(".lb_hd").hide();
            a.resize();
            b.find(".lb_nohd .lb_close").click(function() {
                a.close()
            });
            setTimeout(function() {
                a.close()
            },
            c || 1E3)
        };
        a.fail = function(c, 
        d) {
            var f = '<div class="lb_nohd"><a href="javascript:;" class="lb_close"></a><div class="lb_f">{text}</div></div>'.replace(/{text}/, c);
            b.find(".content").html(f);
            b.find(".lb_hd").hide();
            a.resize();
            b.find(".lb_nohd .lb_close").click(function() {
                a.close()
            });
            setTimeout(function() {
                a.close()
            },
            d || 2E3)
        };
        a.loading = function(c) {
            c || (c = "请稍后");
            b.find(".alert_box").html('<div class="alert_loading"><img src="'+__U_STATIC__+'/img/icon/loading.gif" /><span>{text}......</span><a href="javascript:;" class="alert_close">取消</a></div>'.replace(/{text}/, 
            c));
            a.resize()
        }
    }


})(jQuery, window);
(function (d) { 
    XDTEMPLATE = {
        lightBox: '<div id="{id}" class="alert_bgs">'
            + '<div class="alert_box">'
            + '<div class="alert_top">'
            + '<span>{title}</span>'
            + '<a href="javascript:;" class="alert_close"></a>'
            + '</div>'
            + '<div class="alert_contents">{body}</div>'
            + '</div></div>',
        lightBoxLoading: '<div class="alert_loading">'
            + '<img src="../img/icon/loading.gif" />'
            + '<span>请稍后......</span>'
            + '<a href="javascript:;" class="alert_close">取消</a>'
            + '</div>'        
    };    
})(jQuery);