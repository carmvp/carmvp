define(function(require,exports,module){
    return function(){
        /**
     * xiaoxiong，首页价格字数超出，隐藏折扣标签
     * @param {}
     * @time 2014-09-09
     */ 
        var F_hidden_zhe = function(){
            $("li").each(function(){
                  if($(this).find('span.price-current').width() >= 125){
                   $(this).find('.discount').hide();
                }
            })
         }
         F_hidden_zhe();
         
         /**
          * 卷皮九块邮内页点击x关闭
          * @time 2014-12-20
          */
       $(".arrow-up").click(function(){
           $('.bady-tips').hide();
       });
       
        /**
         * fangfang_notclear 此函数在其他地方没有被引用到
         * @time 2014-02-17
         */
        //json对象转换成json串
        var Obj2str = function(o) {
            if (o == undefined) {
                return "";
            }
            var r = [];
            if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
            if (typeof o == "object") {
                if (!o.sort) {
                    for (var i in o)
                        r.push("\"" + i + "\":" + Obj2str(o[i]));
                    r = "{" + r.join() + "}"
                } else {
                    for (var i = 0; i < o.length; i++)
                        r.push(Obj2str(o[i]))
                    r = "[" + r.join() + "]";
                }
                return r;
            }
            return o.toString().replace(/\"\:/g, '":""');
        }


        //举报 弹框
        

        /**
         * fangfang 商品内页，用户撰写评论的输入框'#pub_content'
         * @time 2014-02-17
         */
        var str="快来和大伙儿一起讨论吧！";
        $("#pub_content").focus(function(){
             var content =  $("#pub_content").val();
             if(content == str){
                 $("#pub_content").val('');
             }
         }).blur(function(){
            var content =  $("#pub_content").val();
            if(content == ''){
                $("#pub_content").val('快来和大伙儿一起讨论吧！');
            }
        });
        $("#pub_content").keydown(function(){
            var strlen = $("#pub_content").val().length;
            if(strlen>=1){
                $(".pub-area-ft .cur").css('color','#ff6600');
                if(strlen>=140){
                $(".pub-area-ft .counts").css('color','#ff6600');
                }
                else{
                    $(".pub-area-ft .counts").css('color','#999');
                }
            }
            else{
                $(".pub-area-ft .cur").css('color','#999')  
            }
            
        }).keyup(function(){
                var strlen = $("#pub_content").val().length;
                $(".pub-area-ft .cur").text(strlen);
                if(strlen>=1){
                $(".pub-area-ft .cur").css('color','#ff6600');
                if(strlen>=140){
                $(".pub-area-ft .counts").css('color','#ff6600');
                }
                else{
                    $(".pub-area-ft .counts").css('color','#999');
                }
            }
            else{
                $(".pub-area-ft .cur").css('color','#999')  
            }
            });
        /**
         * fangfang 商品内页，举报选择项下拉框是否选择最后一项(即val为8)，显示或隐藏'.other'即其他原因输入框
         * @time 2014-02-17
         */
        $("#reportAn").change( function() {
            if($(this).val()==8) {
                $(".other").show();
            } else {
                $(".other").hide();
            }
        });
        //ajax发送举报内容到后台
        XD.JUBAO_SMT = function () {
    	   if (XDPROFILE.uid == "") {
	             XD.user_handsome_login_init();
	             XD.user_handsome_login();
	             return false;
            }
    	    var iid = $("#report_title").attr("re");
    	    var gtype = $("#jubao_" + iid).attr("gtype");
            data = {
                'action':"reportPost",
                'iid':iid,
                'rtype':$("#reportAn").val(),
                'demo':$("#otherReasons").val(),
                'uid':XDPROFILE.uid ,
                'gtype' : gtype
            };
            var demo = data['demo'].replace(/\s/g,"");
            if(data['rtype']==0) {
                alert("请选择举报理由");
            }else if(data['rtype'] == 8 && demo == ""){
                alert("请填写其它原因");
            }else if(demo.length > 140){
                alert('请在140字以内说明理由');
            }else{
                $.getJSON( __URL_JUANPI__ + "/shareajax?callback=?",data,function(re){
                    alert(re.msg);
                    $('.alert_bg').hide();
                    $('.alert_fullbg').hide();
                });
            }
        };


        var myCarousel = function(){
            var playTimer = null;
            var index = 0;
            var img = $("#slide_index dl dd img");
            var btn = $("#slide_index .slide_page span");
            var oList = $("#slide_index dl");

            //按钮点击切换
            btn.mouseover(function(){
                index = $(this).index();
                var i = $(this).index() - btn.index($("#slide_index .slide_page span.cur"));
                i = i-1;
                if(i>0){
                    for (i; i > 0; i--){
                        oList.find("dd:first").insertAfter(oList.find("dd:last"));
                    }
                }else{
                    for (i; i < 0; i++){
                        oList.find("dd:last").insertBefore(oList.find("dd:first"));
                    }
                }
                oList.stop(false,true);
                oList.css("margin-left",0);
                cutover(function(){
                    oList.find("dd:first").insertAfter(oList.find("dd:last"));
                    oList.css("margin-left",0);
                });

            });

            function next(){
                index++;
                if(index > btn.length - 1){
                    index = 0;
                }
                cutover(function(){
                    oList.find("dd:first").insertAfter(oList.find("dd:last"));
                    oList.css("margin-left",0);
                });
            }

            playTimer = setInterval(next, 3000);

            function cutover(func){
                oList.stop(false,true);
                btn.removeClass("cur");
                btn.eq(index).addClass("cur");
                $("#slide_index .slide_title").html('<a target="_blank" href="'+oList.find("dd:eq(1) a").attr("href")+'">'+oList.find("dd:eq(1) img").data("title")+'</a>');
                $("#slide_index .slide_desc").html('<a target="_blank" href="'+oList.find("dd:eq(1) a").attr("href")+'">'+oList.find("dd:eq(1) img").attr("alt")+'</a>');
                oList.animate({marginLeft:"-310px"},func);
            }

            //鼠标移入展示区停止自动播放
            $("#slide_index").mouseover(function (){
                    clearInterval(playTimer)
                }
            )

            //鼠标离开展示区开始自动播放
            $("#slide_index").mouseout(function (){
                clearInterval(playTimer);
                playTimer = setInterval(next, 3000)
            });
        }

        if($("#slide_index").size() > 0 && $("#slide_index dd").size() > 1){
            $("#slide_index a").click(function(){
                var title = $(".slide_desc a").text();
                if (ga) ga('send', 'event', '首页广告位', title, ' ');
            });
            myCarousel();
        }




        
    }
});

