!function(e) {
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
        getCanvasImage: function(image_url) {
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
                content: '<div class="buy-box"  ><p class="buy-msg-bottom"></p><a href="javascript:;" class="close buy-icon"></a> <div class="buy-box-center"><a><img style="border-radius: 5px;" style="width:' + a + "px; height:" + i + 'px;" src="' + window.canvasImage + '" alt=""  /></a></div> </div> ',
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
            a = '<div class="buy-box"><a href="javascript:;" class="close buy-icon"></a><div class="buy-box-tab buy-box-tab-bg">复制分享文案</div><div class="buy-box-center"><div class="code-cent"><div class="cente-text" ><div><p class="textarea" id="codeCopy" >' + (e.replace(/\n/g, "<br />") || "无内容") + '</p></div></div><p class="text">长按文字区域手动复制文案</p><a href="javascript:;" class="buy-btn-copy" aria-label="' + (e.replace(/<br>/g, "/r") || "无内容") + '">一键复制</a></div></div></div>',
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
        getCodeShopping: function(code,pic) {
            var t = this,
            a = '<div class="buy-box"><a href="javascript:;" class="close buy-icon"></a><div class="code-pic-info"><a class="pic-img"><img src="' + pic + '" /></a></div><div class="buy-box-center"><div class="code-cent" ><div class="cente-text  code-pic-cent" style="margin-bottom:23px;"><div><p class="textarea" id="codeCopy" >复制框内整段文字，打开【手淘APP】即可马上购买。' + (code || "无内容") + '</p ></div></div><a href="javascript:;" class="buy-btn-copy" aria-label="复制框内整段文字，打开【手淘APP】即可马上购买。' + (code || "无内容") + '">一键复制</a></div></div></div>',
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
        
    };   
    e.$canvasImage = t
} (window);