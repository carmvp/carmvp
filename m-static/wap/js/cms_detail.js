function ReplaceAll(e, t, a) {
    for (; e.indexOf(t) >= 0;) e = e.replace(t, a);
    return e
}
window.history.state && $(".ads-list").html(window.history.state.list);
var openApp = function(e) {
    var t = e.replace("http://", "").replace("https://", ""),
    a = document.createElement("iframe");
    a.src = "taobao://" + t,
    a.style.display = "none",
    document.body.appendChild(a),
    window.location = e
},
openAppIos9 = function(e) {
    var t = e.replace("http://", "").replace("https://", ""),
    a = "taobao://" + t;
    window.location = a,
    window.setTimeout(function() {
        window.location = e
    },
    3e3)
},
is_weixin = function() {
    var e = navigator.userAgent.toLowerCase();
    return "micromessenger" == e.match(/MicroMessenger/i)
};
$("a.tb_app").on("click",
function(e) {
    e.preventDefault();
    var t = $(this).attr("href");
    if (!is_weixin()) {
        $("body").html("<center style='margin-top: 10px;'>唤醒手机淘宝中...</center>");
        var a = navigator.userAgent.toLowerCase();
        "iphone os 9" == a.match(/iphone os 9/i) ? openAppIos9(t) : openApp(t)
    }
    MtaH5.clickStat("dovoucher", {
        vamount: $mta_quan,
        uid: $cmsLayer.getMtaCookie(),
        gid: window.location.href.split("&")[1].split("=")[1],
        siteid: standId,
        domainid: window.location.hostname.replace("www.", "")
    })
});
var isLoad = !1,
goodsId = $(".pic-detail-btn").data("goodsid");
$(".pic-detail-btn span.pic-detail-btn-span").click(function() {
    "none" == $(".pic-detail-show").css("display") ? ($(this).hasClass("cur") ? $(this).find("i").html("点击展开<em></em>") : ($(this).addClass("cur"), $(this).find("i").html("点击收起<em></em>")), $(".pic-detail-show").css("display", "block")) : ($(this).removeClass("cur"), $(this).find("i").html("点击展开<em></em>"), $(".pic-detail-show").css("display", "none")),
    isLoad || ($("span.loadding-lab").fadeIn(300), setTimeout(function() {
        $.ajax({
            type: "get",
            async: !1,
            url: 'http://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?&data={"item_num_id":"' + goodsId + '"}&type=jsonp',
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "showTuwen",
            success: function(e) {
                if ($("span.loadding-lab").fadeOut(300), e.data.images.length > 0) for (var t = 0; t < e.data.images.length; t++) $(".pic-detail-show").append('<p><img src="' + e.data.images[t] + '"/></p>');
                isLoad = !0
            },
            error: function() {}
        })
    },
    300))
}),
$(".keycope").on("click",
function() {
    $(".copy_dom").html($(this).attr("aria-label"))
}),
$(".weixin-cover").click(function() {
    $(".weixin-tip").css("display", "none"),
    $(".buy-wrapper").css("display", "block"),
    $("#myVideo").css("display", "block")
}),
$(".img .ui-link").click(function(e) {
    var t = ($(this).attr("href") ? $(this).attr("href") : $(this).data("href"), navigator.userAgent.toLowerCase());
    if ("micromessenger" == t.match(/MicroMessenger/i)) {
        if (e.preventDefault(), $(".weixin-tip").css("display", "block"), $(".buy-wrapper").css("display", "none"), $(this).data("href")) {
            $(this).data("href")
        } else {
            $(this).attr("href")
        }
        /iphone|ipad|ipod/.test(t) ? $(".wechat-brow").addClass("iosChat") : /android|adr|linux/.test(t) && $(".wechat-brow").addClass("androidChat"),
        $("#myVideo").css("display", "none")
    }
    var a = document.getElementById("myVideo");
    a && (a.pause(), $(".jp-video-play-icon").removeClass("video_playing"), $(".jp-video-play-icon").removeClass("video_pausing"), $(".jp-video-play-icon").addClass("video_pausing"))
}),
$(function() {
    function e() {
        var e = function() {
            var e = /OS ((\d+_?){2,3})\s/;
            if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
                var t = e.exec(navigator.userAgent);
                if (t.length > 0) return t[0].replace("OS", "").replace("os", "").replace(/\s+/g, "").replace(/_/g, ".")
            } else n = 0;
            return ""
        },
        t = e(),
        a = t.split(".");
        return !! (a && a.length > 0 && parseInt(a[0]) >= 10)
    }
    var t = null,
    a = function(e) {
        var t = parseInt($(".outTime b").eq(e).html());
        if (t > 0) {
            if (3 != e) var t = t - 1 < 10 ? "0" + (t - 1) : t - 1;
            else t -= 1;
            $(".outTime b").eq(e).html(t)
        } else {
            if (! (e > 0)) return ! 1;
            if (0 == a(e - 1)) return 3 == e ? $(".outTime b").eq(e).html(0) : $(".outTime b").eq(e).html("00"),
            !1;
            3 == e ? $(".outTime b").eq(e).html(9) : $(".outTime b").eq(e).html(59)
        }
    };
    $(".hd_type").length > 0 && (t = setInterval(function() {
        0 == a(3) && ($(".hd_type").remove(), clearInterval(t))
    },
    100));
    var i = 1,
    n = 1;
    if (i = e() ? 1 : 0, "undefined" == typeof Clipboard) return ! 1;
    
}),
!
function(e) {
    var t = {
        getPixelRatio: function(e) {
            var t = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / t
        },
        closeAll: function(e) {
            $(e).find(".close").on("click",
            function() {
                layer.closeAll()
            })
        },
        html2Canvas: function() {
            html2canvas(document.getElementById("buyBoxCode")).then(function(e) {
                window.parent.window.canvasImage = e.toDataURL("image/jpeg")
            })
        },
        getCanvasImage: function() {
            var e = this;
            if (window.canvasImage) return e.getImagesCode(0, 0),
            !1;
            var t = layer.load(),
            a = layer.open({
                type: 2,
                title: !1,
                closeBtn: 0,
                shade: !1,
                skin: "buy-copy buy-opacity",
                content: image_url,
                success: function() {
                    var i = setInterval(function() {
                        window.canvasImage && (e.getImagesCode(a, t), clearInterval(i))
                    },
                    1e3)
                }
            })
        },
        getImagesCode: function(e, t) {
            $(".buy-wrapper-new ul li:eq(0)").click();
            var a = .72 * window.innerWidth,
            i = .72 * window.innerWidth / 600 * 920,
            n = this;
            layer.open({
                type: 1,
                title: !1,
                closeBtn: 0,
                shadeClose: !0,
                shade: .5,
                area: [a + "px", i + "px"],
                skin: "buy-copy buy-copy-img",
                content: '<div class="buy-box"  ><p class="buy-msg-bottom"></p><a href="javascript:;" class="close buy-icon"></a> <div class="buy-box-center"><a><img style="border-radius: 5px;width:' + a + "px; height:" + i + 'px;" src="' + window.canvasImage + '" alt=""  /></a></div> </div> ',
                success: function() {
                    layer.close(t),
                    layer.close(e),
                    n.closeAll(".buy-copy")
                }
            })
        },
        getCodeShow: function(e) {
            $(".buy-wrapper-new ul li:eq(0)").click();
            var t = this,
            a = '<div class="buy-box"><a href="javascript:;" class="close buy-icon"></a><div class="buy-box-tab buy-box-tab-bg">复制分享文案</div><div class="buy-box-center"><div class="code-cent"><div class="cente-text" ><div><p class="textarea" id="codeCopy" >' + (e.replace(/\n/g, "<br />") || "无内容") + '</p></div></div><p class="text">长按文字区域手动复制淘口令</p><a href="javascript:;" class="buy-btn-copy" aria-label="' + (e.replace(/<br>/g, "/r") || "无内容") + '">一键复制</a></div></div></div>',
            i = function(e) {
                var t = new Clipboard(e, {
                    text: function(e) {
                        return e.getAttribute("aria-label")
                    }
                });
                t.on("success",
                function(t) {
                    layer.msg("复制成功！"),
                    $(e).addClass("active").html("复制成功"),
                    $(".buy-box .cente-text").select(),
                    t.clearSelection()
                }),
                t.on("error",
                function(t) {
                    layer.msg("复制失败，请长按文字手动复制！"),
                    $(e).addClass("active").html("复制失败"),
                    t.clearSelection()
                })
            };
            layer.open({
                type: 1,
                title: !1,
                closeBtn: 0,
                shadeClose: !0,
                shade: .5,
                skin: "buy-copy buy-taokoulin",
                content: a,
                success: function() {
                    t.closeAll(".buy-copy"),
                    i(".buy-copy .buy-btn-copy");
                    $(".cente-text .textarea").val();
                    $(".cente-text .textarea").on("touchend",
                    function() {
                        t.selectText("codeCopy")
                    })
                }
            })
        },
        selectText: function(e) {
            setTimeout(function() {
                var t = document.getElementById(e);
                if (document.body.createTextRange) {
                    var a = document.body.createTextRange();
                    a.moveToElementText(t),
                    a.select()
                } else if (window.getSelection) {
                    var i = window.getSelection(),
                    a = document.createRange();
                    a.selectNodeContents(t),
                    i.removeAllRanges(),
                    i.addRange(a)
                }
            },
            200)
        },
        getCodeShopping: function(e) {
            var t = this,
            a = '<div class="buy-box"><a href="javascript:;" class="close buy-icon"></a><div class="code-pic-info"><a class="pic-img"><img src="' + e.pic + '" /></a></div><div class="buy-box-center"><div class="code-cent" ><div class="cente-text  code-pic-cent" style="margin-bottom:23px;"><div><p class="textarea" id="codeCopy" >复制框内整段文字，打开【手淘APP】即可领券购买。' + (e.code || "无内容") + '</p ></div></div><a href="javascript:;" class="buy-btn-copy" aria-label="复制框内整段文字，打开【手淘APP】即可领券购买。' + (e.code || "无内容") + '">一键复制</a></div></div></div>',
            i = function(e) {
                var t = new Clipboard(e, {
                    text: function(e) {
                        return e.getAttribute("aria-label")
                    }
                });
                t.on("success",
                function(t) {
                    layer.msg("复制成功！"),
                    $(e).addClass("active").html("复制成功"),
                    $(".buy-box .cente-text").select(),
                    t.clearSelection()
                }),
                t.on("error",
                function(t) {
                    layer.msg("复制失败，请长按文字手动复制！"),
                    $(e).addClass("active").html("复制失败"),
                    t.clearSelection()
                })
            };
            layer.open({
                type: 1,
                title: !1,
                closeBtn: 0,
                shadeClose: !0,
                shade: .5,
                skin: "buy-copy buy-pic-box",
                content: a,
                success: function() {
                    t.closeAll(".buy-copy"),
                    i(".buy-copy .buy-btn-copy");
                    $(".cente-text textarea").val();
                    $(".cente-text .textarea").on("touchend",
                    function() {
                        t.selectText("codeCopy")
                    })
                }
            })
        },
        init: function() {
            $(".buy-wrapper-new *[weixin]").on("click",
            function() {
                return $("body").append('<div class="buy-weixin-msg"></div>'),
                $(".buy-weixin-msg").click(function(e) {
                    $(this).remove()
                }),
                !1
            })
        }
    };
    t.init(),
    e.$canvasImage = t
} (window);