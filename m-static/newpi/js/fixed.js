$(function() {
    var $navFun = function() {
        var st = $(document).scrollTop(), 
            headh = $(".propertylist-box").offset().top;           
            $nav_classify = $(".J_ScrollFloat");
        if(st > headh){
            $nav_classify.addClass("box-fixed");
			$nav_classify.css({"position": "fixed","top":"0px","width":"228px"});
			
        } else {
            $nav_classify.removeClass("box-fixed");	
			$nav_classify.removeAttr("style"); 
        }
    };
    var F_nav_scroll = function () {
        if(navigator.userAgent.indexOf('iPad') > -1){
            return false;
        }      
        if (!window.XMLHttpRequest) {
           return;          
        }else{
            //默认执行一次
            $navFun();
            $(window).bind("scroll", $navFun);
        }
    }
    F_nav_scroll();
	$(".J_PropertyList").hover(function(){
    $(this).addClass("fixed");
    },function(){
    $(this).removeClass("fixed");
    });
	$(".zw-itemListBox ul li").hover(function(){
    $(this).addClass("zw-li");
	$(this).find(".zw-pins").css("display","inline");	
    },function(){
    $(this).removeClass("zw-li");
	$(this).find(".zw-pins").css("display","none");
    });
	
});

