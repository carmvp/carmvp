	var _html="<div class='alert_fullbg' style='display:block;'></div>"
	var _height=$(window).height();
	var executeFlg = true;
	var timer;
	$(document).ready(function(){
	    var w_h=$("#head").width();
		//$("#index .search-area").css('width',w_h-100);
		if( $(".next-nav ul li a.active").offset() != null ){
            $(".next-nav .box").scrollLeft($(".next-nav ul li a.active").offset().left);
        }
		//alert(0);
	})
	//分类动画
	$(".classify .btn-type,.all_o,.searchlogo").on('click',function(){
		$("body").css("paddingBottom","0");
		//$(".back-top").css("display","none");
		$(".main").css({"height":_height,"overflow":"hidden"})
		$(".app").append(_html);
		$(".alert_fullbg").css('z-index','201');
		$(".app-other").css({'left':'0','visibility':'visible','overflow':'auto'});
		$(".app-other").css('height',_height)
		$(".alert_fullbg").on('click',function(){
			$("body").css("paddingBottom","45px");
			//$(".back-top").css("display","block");
			$(".app-other").css({'left':'-70%','visibility':'hidden'});
			$(this).remove();
			clearTimeout(timer);
			timer=setTimeout(function(){
			    $(".app-other").css('height',"auto")
			    $(".main").css({"height":"auto","overflow":"visible"})
			},400);
		});
	})
	
	
	//滚动一级导航浮动
	var nav_f_show=function(){
		$(window).on('scroll',function(){
		if($(window).scrollTop()>$("#nav").offset().top&&executeFlg==true){
			$("#nav ul").addClass("fised");
		}
		else{
			$("#nav ul").removeClass("fised");
		}
	})
	}
	//二级导航浮动以及适配
	var nav_t_show=function(){
	    var box=$(".next-nav").width();
	    var _box_h=0;
		$(".next-nav ul li").each(function(i){
		    _box_h+=$(this).width();
		})
		$(".next-nav ul").css("width",_box_h);
		$(window).on('scroll',function(){
		if($(window).scrollTop()>$(".next-nav").offset().top&&executeFlg==true){
			$(".next-nav .box").addClass("fixed");
		}
		else{
			$(".next-nav .box").removeClass("fixed");
		}
	})
	}
	if($(".next-nav ul li").size()>0){
		nav_t_show();
	}
	if($("#nav").size()>0){
		nav_f_show();
	}
	/**
     * 首页幻灯片 mumian
     * @param {}
     * @time 2015-02-10
     */
    var carousel_index = function(){
	    //var area_h=$(".banner li a").height();
		//$(".area").css("height",area_h);
        if($(".banner li").size() <= 1) return;
        $(".banner li").each(function(){
            $(".adType").append('<a></a>');
        });
		$('.area').swipeSlide({
		continuousScroll:true,
		speed : 3000,
		transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)'
		},function(i){
		$('.adType').children().eq(i).addClass('current').siblings().removeClass('current');
		});
    }
    carousel_index();
	//搜索
	//alert($("#search_keyword").val());
	searchFun=function(){
		
		var $search_txt = $(".box-search #keyword");
		$search_txt.on('keyup', function () {
                if ($(this).val() == "") {
                    $(this).next().css("display","none");
                } else {
                    $(this).next().css("display","block");
                }
            });
		$(".box-search .del").on('click',function(){
						$(this).css("display","none");
						$search_txt.val("");
		})
	}
	searchFun();
	$(".closed").on("click",function(){
    	$(".go-app").hide();
    	return false;
    })
	
var $navsFuns = function() {
        var st = $(document).scrollTop();		
		var aa = document.getElementById("head").offsetWidth;
		//$("#index,#t-index").css('width',aa-110);
        $("#box-search").css('width',aa-115);
		$("#sokey").css('width',aa-125);
		$(".buton").css('width','40px');
		$(".classify.ditops").css('width','55px');
		if($("#search").length > 0){
		var headh = $("#search").offset().top; 	
		}
        $nav_classify = $(".searchbox");    
		if($("#goods").length > 0){
		var sortheadh = $("#goods").offset().top;  	
		}		           
        $sort_classify = $(".mod-list");
        if(st > headh){
            $nav_classify.addClass("fiexd");	
			$("#search-wrap").show();
        } else {
            $nav_classify.removeClass("fiexd");	
			$("#search-wrap").hide();
        }
		 if(st > sortheadh){
            $sort_classify.addClass("fixed");
        } else {
            $sort_classify.removeClass("fixed");
        }
    };

    var F_navs_scrolls = function () {
        if(navigator.userAgent.indexOf('iPad') > -1){
            return false;
        }      
        if (!window.XMLHttpRequest) {
           return;          
        }else{            
            $navsFuns();
            $(window).bind("scroll", $navsFuns);
        }
    }
    F_navs_scrolls();



   
