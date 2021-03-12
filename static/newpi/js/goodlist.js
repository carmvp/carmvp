(function($){	
var xymonth = new Array('一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月');
var xyweek = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
var xytoday = new Date();
$(".xydate #mon").text(xymonth[xytoday.getMonth()]);
	$(".xydate #day").text(xytoday.getDate());
	$(".xydate #wek").text(xyweek[xytoday.getDay()]);
})(jQuery);

$(function () {	
	//全选  
    $("#selectAll").click(function () {
         $("input[type=checkbox]").prop("checked", true);  
    });  
	//取消全选 
    $("#unSelect").click(function () {  
         $("input[type=checkbox]").prop("checked", false);  
    });  
    //反选 
    $("#reverse").click(function () { 
         $("input[type=checkbox]").each(function () {  
              $(this).prop("checked", !$(this).prop("checked"));  
         });		 
    });	
	//获取选中选项的值给删除 
	$("#getValue").click(function(){
		$("input[name=do]").val('del');
		var adIds = "";  
        $("input:checkbox[type=checkbox]:checked").each(function(i){  
            if(0==i){  
                adIds = $(this).val();  
            }else{  
                adIds += (","+$(this).val());  
            }  
        }); 
      	$("#get_ids").val(adIds);
    });
	//获取选中选项的值给设置已读
	$("#setreaded").click(function(){
		$("input[name=do]").val('setread');
		var adIds = "";  
        $("input:checkbox[type=checkbox]:checked").each(function(i){  
            if(0==i){  
                adIds = $(this).val();  
            }else{  
                adIds += (","+$(this).val());  
            }  
        }); 
      	$("#get_ids").val(adIds);
    });
}); 
(function($){
    
    var carousel_index = function(){
        if($(".banner li").size() == 1) $(".banner li").eq(0).css("opacity", "1");
        if($(".banner li").size() <= 1) return;
        var i = 0,max = $(".banner li").size()- 1,playTimer;
        $(".banner li").each(function(){
            $(".adType").append('<a></a>');
        });
    //初始化
        $(".adType a").eq(0).addClass("current");
    $(".banner li").eq(0).css({"z-index":"2","opacity":"1"});
    var playshow=function(){
        $(".adType a").removeClass("current").eq(i).addClass("current");
        $(".top_bar .banner li").eq(i).css("z-index", "2").fadeTo(500, 1, function(){
        $(".top_bar .banner li").eq(i).siblings("li").css({
                  "z-index": 0,
                  opacity: 0
        }).end().css("z-index", 1);
        });
    }
    var next = function(){
      i = i>=max?0:i+1;
      playshow()
    }
    var prev = function(){
      i = i<=0?max:i-1;
      playshow()
    }
        var play = setInterval(next,3000);
        $(".banner li a,.banner_arrow").hover(function(){
            clearInterval(play);
            $(".banner_arrow").css("display","block");
        },function(){
            clearInterval(play);
            play = setInterval(next,3000);
            $(".banner_arrow").css("display","none");
        });
        $(".banner_arrow .arrow_prev").on('click', function(event) {prev();});
        $(".banner_arrow .arrow_next").on('click', function(event) {next();});
        $(".adType a").mouseover(function(){
            if($(this).hasClass("current")) return;
            var index = $(this).index()-1;
            var playTimer = setTimeout(function(){
                clearInterval(play);
                i = index;
                next();
            },500)
        }).mouseout(function(){
                clearTimeout(playTimer);
            });
    }
    carousel_index();

    /**
     * 将文字信息上下滚动
     * Author: zhuwenfang
     * Date: 14-01-10
     * Time: PM 16:55
     * Function: scrolling the dom 'li' up&down
     **/
    var liAutoScroll = function(){
        var liScrollTimer;
        var $obj = $('.links_list_box');
        $obj.hover(function(){
            clearInterval(liScrollTimer);
        }, function(){
            liScrollTimer = setInterval(function(){
                $obj.find(".links_list").animate({
                    marginTop : -20 + 'px'
                }, 500, function(){
                    $(this).css({ marginTop : "0px"}).find("li:first").appendTo(this);
                });

            }, 3000);
        }).trigger("mouseleave");

    }
    liAutoScroll();
})(jQuery);
(function($){
    $(".goods-list li").hover(function(){               
        $(this).addClass("hover");		
        $(this).find(".btn.buy span").html() == "淘宝" && $(this).find(".btn.buy span").html("去淘宝");
        $(this).find(".btn.buy span").html() == "天猫" && $(this).find(".btn.buy span").html("去天猫");
		$(this).find(".btn.buy span").html() == "品牌" && $(this).find(".btn.buy span").html("去抢购");
        $(this).find(".btn.buy span").html() == "我要兑换" && $(this).find(".btn.buy span").html("去兑换");
        $(this).find(".btn.buy span").html() == "京东" && $(this).find(".btn.buy span").html("去京东");
    },function(){        
        $(this).removeClass("hover");			
        $(this).find(".btn.buy span").html() == "去淘宝" && $(this).find(".btn.buy span").html("淘宝");
        $(this).find(".btn.buy span").html() == "去天猫" && $(this).find(".btn.buy span").html("天猫");
		$(this).find(".btn.buy span").html() == "去抢购" && $(this).find(".btn.buy span").html("品牌");
        $(this).find(".btn.buy span").html() == "去兑换" && $(this).find(".btn.buy span").html("我要兑换");
        $(this).find(".btn.buy span").html() == "去京东" && $(this).find(".btn.buy span").html("京东");
    });

    $(".goods-list li").each(function(){
        if($(this).find('span.price-old').width()>= 65||$(this).find('span.price-current').width()>= 125){
            $(this).find('span.discount').hide();
        }
        if($(this).find('.list-good').hasClass("gone") || $(this).find('.list-good').hasClass("start")){
            $(this).find("a").attr("href","javascript:;");
            $(this).find("a").removeAttr("target");

        }
    })

    $(".goods-list .buy-over a").on('click', function(e){
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }else {//IE浏览器
            window.event.cancelBubble = true;
        }
    });

    //卷皮列表页提醒
    $(".goods-list li .good-pic,.goods-list li .good-title,.goods-list li .good-price,.goods-list .mask-bg,.goods-list .buy-over,.goods-list .gone").on('click', function(){
       
 
        if($(this).parents("li").find(".item-btn.start_1").size() == 0 && !$(this).parents("li").find(".list-good").hasClass("gone")){
            return true;
        }
       if($(this).parents("li").find(".gift").hasClass("gone")){
            return false;
        }
        var gid = $(this).parents("li").attr("id");		
        var type = $(this).parents("li").attr("type");	
        if($(this).parents("li").find(".list-good").hasClass("gone")){
            if($(this).hasClass("good-title") || $(this).hasClass("good-price")) return true;
            if($(this).parents("li").find(".like-ico").hasClass("l-active")){
                var content = '<div class="top_tips"><p><em class="over">商品抢光了！</em></p><p class="tips01">因商品已经抢光，无法跳转到淘宝下单</p></div><div class="item-btn clear"><div class="collect-box  fl"><a data-type="'+type+'" data-pid="'+gid+'" class="y-like item-like active" href="javascript:void(0)"> <em class="heart"></em><p class="like-l">已收藏</p></a><p class="like-o"><span class="fl">下载APP购物更省钱</span><a href="/help/app" target="_blank" class="phone fr"></a></p></div></div>';
            }else{
                var content = '<div class="top_tips"><p><em class="over">商品抢光了！点击收藏随时关注</em></p><p class="tips01">因商品已经抢光，无法跳转到淘宝下单</p></div><div class="item-btn clear"><div class="collect-box  fl"><a class="y-like item-like" data-type="'+type+'" data-pid="'+gid+'" href="javascript:;"><em class="heart"></em><p class="like-l">收藏</p></a><p class="like-o"><span class="fl">下载APP购物更省钱</span><a href="/help/app" target="_blank" class="phone fr"></a></p></div></div>';
            }
        }else{
            if($(this).parents("li").find(".like-ico").hasClass("l-active")){
                var content = '<div class="top_tips"><p><em class="over">商品还未开始，请关注您的收藏夹！</em></p></div><div class="item-btn clear"><div class="collect-box  fl"><a data-type="'+type+'" data-pid="'+gid+'" class="y-like item-like active" href="javascript:void(0)"><em class="heart"></em><p class="like-l">已收藏</p></a><p class="like-o"><span class="fl">下载APP购物更省钱</span><a href="/help/app" target="_blank" class="phone fr"></a></p></div></div>';
            }else{
                var content = '<div class="top_tips"><p><em class="over">商品还未开始，点击收藏随时关注！</em></p></div><div class="item-btn clear"><div class="collect-box  fl"><a class="y-like item-like" data-type="'+type+'" data-pid="'+gid+'" href="javascript:;"><em class="heart"></em><p class="like-l">收藏</p></a><p class="like-o"><span class="fl">下载APP购物更省钱</span><a href="/help/app" target="_blank" class="phone fr"></a></p></div></div>';
            }
        }

        b = new XDLightBox({
            title: "温馨提示",
            lightBoxId: "alert_remind",
            contentHtml: content,
            scroll: false
        });
        b.init();
        return false;
    });

})(jQuery);
(function($){
    $(".zc-list .boxt").hover(function(){
        $(this).find(".list-good").hasClass("gone") && $(this).find(".like-ceng").size() != 0 && $(this).find(".like-ico").hasClass("l-active") && $(this).find(".like-ceng").show();
        if($(this).find(".list-good").hasClass("gone")) return;
        if($(this).find(".brand-bd").size() != 0) return;
        $(this).addClass("hover");
        $(this).find(".btn span").html() == "淘宝" && $(this).find(".btn span").html("去淘宝");
        $(this).find(".btn span").html() == "天猫" && $(this).find(".btn span").html("去天猫");		
    },function(){
        $(this).find(".like-ceng").hide();
        $(this).removeClass("hover");
        $(this).find(".btn span").html() == "去淘宝" && $(this).find(".btn span").html("淘宝");
        $(this).find(".btn span").html() == "去天猫" && $(this).find(".btn span").html("天猫");
    });

    $(".zc-list .boxt").each(function(){
        if($(this).find('span.price-old').width()>= 65||$(this).find('span.price-current').width()>= 125){
            $(this).find('span.discount').hide();
        }
        if($(this).find('.list-good').hasClass("gone")){
            $(this).find(".btn a").attr("href","javascript:;");
            $(this).find(".btn a").removeAttr("target");

        }
    })
    $(".zc-list .buy-over a").on('click', function(e){
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }else {//IE浏览器
            window.event.cancelBubble = true;
        }
    });
})(jQuery);
(function($) {
	$(document).on('click', '.y-like',function(){
		if ($(this).find(".like-ico").size() != 0) {
		$("#likeico").remove();
		$(this).append('<div id="likeico"><span class="heart_left"></span><span class="heart_right"></span></div>');
		setTimeout(function() {
		$("#likeico").remove()
        }, 1500);
		}
		var pid = $(this).attr("data-pid");
		var mod = $(this).attr("data-type");
		if(!$.yangtata.dialog.islogin()) return ;
		$.ajax({
			url: yangtataER.root + '/?m=ajax&a=like',
				type: 'POST',
				data: {
				pid: pid,
				mod:mod
			},
			dataType: 'json',
			success: function(result){
				if(result.status == 1){					
                    $(".like_" + pid).addClass("l-active");
					$(".item-like").addClass("active");
					$("p.like-l,.liketxt").html("已收藏");	
					$("#likeico").removeClass('unliked').addClass('like-big').addClass('demo1');
                    $(this).css("display", "inline");					
				}else if(result.status == 2){
					$(".like_" + pid).removeClass("l-active");
					$(".item-like").removeClass("active");
					$("p.like-l,.liketxt").html("收藏");	
					$("#likeico").removeClass('like-big').addClass('unliked').removeClass('demo1');
                    $(this).css("display", "");
				}else{
					$.yangtata.tip({content:result.msg, icon:'error'});
				}
			}
		});		  
	});
})(jQuery);
$("#sbox").hover(function(){
		$(this).find(".wholike").show();
		
	},function(){
		$(this).find(".wholike").hide();
	});
	
$("#share").hover(function(){
		$(this).find(".share").show();
		
	},function(){
		$(this).find(".share").hide();
	});
	
$(function(){
var $sort = $("#J-search").find(".main-nav-search-dropdown");
var F_s_select = function(){    
    var F_s_open_chanl = function(o){
        o.addClass('open');
    };
    var F_s_close_chanl = function(o){
        o.removeClass('open');
    };
    $sort.on({
        mouseover: function(){
            F_s_open_chanl($(this));
        },
        mouseout: function(){
            F_s_close_chanl($(this));
        }
    });
    $sort.find('a').on('click', function(event) {
        event.preventDefault();
        var a1 = '<span sid="1">搜标题</span>';
        var a2 = '<span sid="2">搜链接</span>';		
        if ($(this).find("span").attr("sid") == 1 ){
            $sort.find('a').eq(0).html(a1);
            $sort.find('a').eq(1).html(a2);				
			$("#inp").attr("value","search");
        }else{
            $sort.find('a').eq(0).html(a2);
            $sort.find('a').eq(1).html(a1);			
			$("#inp").attr("value","q");			
        }
        F_s_close_chanl($sort);
    });
}
    F_s_select();
});	
$("#show-qcodes").hover(function(){
    $("#new-qcodes").css('display','block');
},function(){
    $("#new-qcodes").css('display','none');
});


$('.is_show').on('click',function(){
  if(!$.yangtata.dialog.islogin()) return !1;
})
$(function(){    
    var F_gdwin = function(){
        var gdwin_close = function(){
            $("#tan_chuang_div").hide();
            $.cookie("gdwin","1", {
                expires: 0.5,
                path: "/"
            });
        }
        if($.cookie("gdwin") == null){
            $("#tan_chuang_div").show();
            $("div.gdwin-box a.btn-close").on("click",gdwin_close);
            $("div.gdwin-box a.a_close").on("click",gdwin_close);
        }else{
            $("#tan_chuang_div").hide();
        }       
        $("div.gdwin-bg").on("click mousedown",function(e){
            return false;
        })
    }
    F_gdwin();	
});