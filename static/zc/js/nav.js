$(function() {
	//左侧浮动导航
    var $navFun = function() {
        var st = $(document).scrollTop(), 
            headh = $("div.head").height(),           
            $nav_classify = $("div.jiu-side-nav");

        if(st > headh){
            $nav_classify.addClass("fixed");
        } else {
            $nav_classify.removeClass("fixed");
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
	
		//顶部分类浮动
    var $cateFun = function() {
        var st = $(document).scrollTop(), 
            headh = $("div.header").height()*2,           
            $nav_classify = $("div.zc_nav");

        if(st > headh){
            $nav_classify.addClass("fixed");			
        } else {
            $nav_classify.removeClass("fixed");
        }
    };

    var F_cate_scroll = function () {
        if(navigator.userAgent.indexOf('iPad') > -1){
            return false;
        }      
        if (!window.XMLHttpRequest) {
           return;          
        }else{
            //默认执行一次
            $cateFun();
            $(window).bind("scroll", $cateFun);
        }
    }
    F_cate_scroll();
	 
	
});
