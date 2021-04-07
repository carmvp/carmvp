!function(e) {    
    e.goodsShareCode = function() {
        return {
			tmallCode: !1,
            setTmallGoodsCode: function(e, t, a) {
                var o = this;
                if (window.third_link) {
                    if (this.tmallCode) return t(this.tmallCode),
                    !1;
                    $cmsApi.ajax({
                        url: window.third_link || "",
                        type: "GET",
                        dataType: "JSON"
                    }).done(function(e) {
                        if (1 == e.status) {                            
                            var c = {
                                code: e.data.code.replace(/￥/g, "$"),
                                link: e.data.link
                            };
                            o.tmallCode = c,
                            t(c)
                        } else a(window.default_link)
                    }).fail(function() {
                        a(window.default_link)
                    }).always(function(e, t) {
                        "success" != t && a(window.default_link)
                    })
                } else this.tmallCode = e,
                t(e)
            },			
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
			getCanvasImageinhtml: function(e, t) {
                var a = this;
                if (window.canvasImage) return a.getImagesCode(0, 0),
                !1;
                var o = layer.open({
                    type: 2,
                    title: !1,
                    closeBtn: 0,
                    shade: !1,
                    skin: "buy-copy buy-opacity",
                    content: e,
                    success: function() {
                        var e = setInterval(function() {
                            window.canvasImage && (layer.close(o), t && t(window.canvasImage), clearInterval(e))
                        },
                        500)
                    }
                })
            },
			getCanvasImagesinhtml: function(e, t) {
                var a = this;                
                var o = layer.open({
                    type: 2,
                    title: !1,
                    closeBtn: 0,
                    shade: !1,
                    skin: "buy-copy buy-opacity",
                    content: e,
                    success: function() {
                        var e = setInterval(function() {
                            window.canvasImage && (layer.close(o), t && t(window.canvasImage), clearInterval(e))
                        },
                        500)
                    }
                })
            },
            getCanvasImage: function(e) {
                var t = this;
                if (window.canvasImage) return t.getImagesCode(0, 0),
                !1;
                var a = layer.load(),
                c = layer.open({
                    type: 2,
                    title: !1,
                    closeBtn: 0,
                    shade: !1,
                    skin: "buy-copy buy-opacity",
                    content: e,
                    success: function() {
                        var e = setInterval(function() {
                            window.canvasImage && (t.getImagesCode(c, a), clearInterval(e))
                        },
                        1e3)
                    }
                })
            },
            getImagesCode: function(e, t) {
                $(".buy-wrapper-new ul li:eq(0)").click();
                 var a = .72 * window.innerWidth,
                i = .72 * window.innerWidth / 600 * 920,					 
                o = this;
                layer.open({
                    type: 1,
                    title: !1,
                    closeBtn: 0,
                    shadeClose: !0,
                    shade: .5,					
					offset:'auto',  
					area: [a + "px", i + "px"],
                    skin: "buy-copy buy-copy-img",
                    content: '<div class="buy-box"  ><p class="buy-msg-bottom"></p><a href="javascript:;" class="close buy-icon"></a> <div class="buy-box-center"><a><img id="imgbase64"  style="border-radius: 5px;width:' + a + "px; height:" + i + 'px;" src="' + window.canvasImage + '" alt=""  /></a></div> </div> ',
                    success: function() {
                        layer.close(t),
                        layer.close(e),
                        o.closeAll(".buy-copy")
                    }
                })
            },
            getCodeShow: function(ce) {
                $(".buy-wrapper-new ul li:eq(0)").click();
                var t = this,
                a = '<div class="buy-box"><a href="javascript:;" class="close buy-icon"></a><div class="buy-box-tab buy-box-tab-bg">复制分享文案</div><div class="buy-box-center"><div class="code-cent"><div class="cente-text" ><div><p class="textarea" id="codeCopy" >' + (ce.replace(/\n/g, "<br />") || "无内容") + '</p></div></div><p class="text">长按文字区域手动复制推广文案</p><a href="javascript:;" class="buy-btn-copy" aria-label="' + (ce.replace(/<br>/g,"/r") || "无内容") + '">一键复制</a></div></div></div>',
                c = function(e) {
                    var t = new Clipboard(e, {
                        text: function(e) {
                            return e.getAttribute("aria-label");
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
					area: ['90%', 'auto'],
                    shade: .5,
                    skin: "buy-copy buy-taokoulin",
                    content: a,
                    success: function() {
                        t.closeAll(".buy-copy"),
                        c(".buy-copy .buy-btn-copy");
                        $(".cente-text .textarea").val();
                        $(".cente-text .textarea").on("touchend",
                        function() {
                            t.selectText("codeCopy")
                        })
                    }
                })
            },
			getCodecopy: function(ce) {                
                var t = this,                
                c = function(e) {
                    var t = new Clipboard(e, {
                        text: function(e) {
                            return ce;
                        }
                    });
                    t.on("success",
                    function(t) {						
                        layer.msg("复制成功！")
                    }),
                    t.on("error",
                    function(t) {
                        layer.msg("复制失败，请长按文字手动复制！")
                    })
                };
                c(".code");
            },
            selectText: function(e) {
                setTimeout(function() {
                    var t = document.getElementById(e);
                    if (document.body.createTextRange) {
                        var a = document.body.createTextRange();
                        a.moveToElementText(t),
                        a.select()
                    } else if (window.getSelection) {
                        var c = window.getSelection(),
                        a = document.createRange();
                        a.selectNodeContents(t),
                        c.removeAllRanges(),
                        c.addRange(a)
                    }
                },
                200)
            },
			//*最低可返'+e.money+'元。复制此信息，
            getCodeShopping: function(e) {				
                var t = this,
				txt = e.code + '原价'+e.price+'元，'+e.isja+'价'+e.coupon_price+'元。',
				txt2 = e.title+'【包邮】\n\n【原价】'+e.price+'元\n【'+e.isja+'价】'+e.coupon_price+'元\n------------------\n复制这条信息，'+e.code+'，打开【手机淘宝】即可购买',
				txt3 = e.code,
                a = '<div class="buy-box"><a href="javascript:;" class="close buy-icon"></a><div class="code-pic-info"><a class="pic-img"><img src="' + e.pic + '" /></a></div><div class="buy-box-center"><div class="code-cent" ><div class="cente-text  code-pic-cent" style="margin-bottom:23px;"><div><p class="textarea" id="codeCopy" >' + (txt || "无内容") + '</p ></div></div><a href="javascript:;" class="buy-btn-copy" aria-label="' + txt3 + '">一键复制</a></div></div></div>',
                c = function(e) {
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
                        c(".buy-copy .buy-btn-copy");
                        $(".cente-text textarea").val();
                        $(".cente-text .textarea").on("touchend",
                        function() {
                            t.selectText("codeCopy")
                        })
                    }
                })
            }
        }
    } ()
} (wui);