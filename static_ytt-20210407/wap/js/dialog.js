/**
 * @name 弹窗
 */
;(function($){
    $.yangtata.dialog = {
        //登陆
        islogin: function(){
			var yttuid = $('#YTTUID').val();
            return "" == yttuid ? ($.yangtata.dialog.login(), !1) : !0;
        },
        login: function(){
            $.getJSON('/?m=user&a=login', function(result){
                if(result.status == 0){
                    $.yangtata.tip({content:result.msg, icon:'error'});
                }else{
                    $.dialog({id:'login', title:lang.login_title, content:result.data, padding:'', fixed:true, lock:true});
                    $.yangtata.dialog.dlogin_form($('#J_dlogin_form'));
                }
            });
        },
        dlogin_form: function(form){
            form.ajaxForm({
                beforeSubmit: function(){
                    var username = form.find('.J_username').val(),
                        password = form.find('.J_password').val();
                    if(username == ''){
                        form.find('#J_login_fail').html('请输入用户名！').css("visibility", 'visible');
                        return !1;
                    }
                    if(password == ''){
                        form.find('#J_login_fail').html('请输入密码！').css("visibility", 'visible');
                        return !1;
                    }
                },
                success: function(result){
                    if(result.status == 1){
                        $.dialog.get('login').title(false).content('<div class="d_loading">'+result.msg+'</div>').time(2000);
                        window.location.reload();
                    } else {
                        form.find('#J_login_fail').html(result.msg).css("visibility", 'visible');
                    }
                },
                dataType: 'json'
            });
        },closeAll: function(e) {
            $(e).find(".close").on("click",
            function() {
                layer.closeAll()
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
        getCodeShow: function(e) {            
            var t = this,
            a = '<div class="buy-box"><a href="javascript:;" class="close buy-icon"></a><div class="buy-box-tab buy-box-tab-bg">复制淘口令</div><div class="buy-box-center"><div class="code-cent"><div class="cente-text" ><div><p class="textarea" id="codeCopy" >' + (e.replace(/\n/g, "<br />") || "无内容") + '</p></div></div><p class="text">由于微信内无法直接购买，请复制淘口令后打开淘宝APP，等待几秒弹出活动窗口后再点击领取</p><a href="javascript:;" class="buy-btn-copy" aria-label="' + (e.replace(/<br>/g,"/r") || "无内容") + '">一键复制</a></div></div></div>',
                c = function(e) {
                    var t = new Clipboard(e, {
                        text: function(e) {
                            return e.getAttribute("aria-label");
                        }
                    });
                    t.on("success",
                    function(t) {
						$.yangtata.dialog.layer("复制成功！"),
                        $(e).addClass("active").html("复制成功")                                               
                    }),
                    t.on("error",
                    function(t) {
                        $.yangtata.dialog.layer('复制失败，请长按文字手动复制！'),
                        $(e).addClass("error").html("复制失败")
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
                        $.yangtata.dialog.closeAll(".buy-copy"),
                        c(".buy-copy .buy-btn-copy");
                        $(".cente-text .textarea").val();
                        $(".cente-text .textarea").on("touchend",
                        function() {
                            $.yangtata.dialog.selectText("codeCopy")
                        })
                    }
                })
        },
		layer:function(e) {
		var setLayer = setInterval(function() {        
            $(".icon_msg").remove();
            var t = $('<div class="icon_msg"><span>' + e + "</span></div>");
            $("body").append(t),
            t.addClass("active"),
            setTimeout(function() {
                t.addClass("up").removeClass("active"),
                setTimeout(function() {
                    t.remove();
					$.yangtata.dialog.selectText("codeCopy");
					//window.location = "taobao://h5.m.taobao.com";
                },
                400)
            },
            2e3)
        
        clearInterval(setLayer)
    },
    300);  
    } 
    };
})(jQuery);