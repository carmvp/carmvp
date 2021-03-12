$(function() {
    var $navFun = function() {
        var st = $(document).scrollTop(), 
            headh = $(".findgoods_content_similar").offset().top;           
            $nav_classify = $(".findgoods_content_detail_price");
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
            $navFun();
            $(window).bind("scroll", $navFun);
        }
    }
    F_nav_scroll();	
	
});

