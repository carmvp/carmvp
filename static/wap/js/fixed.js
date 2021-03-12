$(function() {
    var $navFun = function() {
        var st = $(document).scrollTop(), 
            headh = $(".common-nav-waterfall").offset().top;           
            $nav_classify = $(".nine_nav_tab");
        if(st > headh){
            $nav_classify.addClass("fix-top");			
        } else {
            $nav_classify.removeClass("fix-top");			
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
});
