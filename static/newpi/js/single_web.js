for(var i = 0 ; i < dataDef.length ; i++){
    var item = i;
    var data = dataDef[item];
            if ($('.single_mod_item_' + data.page_num).length < 1) {
                $('<div class="single_mod_item single_mod_item_def single_mod_item_' + data.page_num + '"></div>').appendTo($('.single_wrap'));
                var item_head = '<div class="single_head"><h2><strong>' + data.show_name + '</strong></h2>\
                      <p>' + data.show_desc + '</p>\
                    </div>';
                $(item_head).appendTo($('.single_mod_item_' + data.page_num));
                $('<div class="single_main"><ul></ul></div>').appendTo($('.single_mod_item_' + data.page_num));

                $('<li class="fast_menu'+$('.fast_menu li').length+'"><i>'+$('.fast_menu li').length+'</i>' + data.show_name + '</li>').insertBefore($('li.goTop'));

                var fastHeight = $('.fast_menu').height()+33 + 31;
                $('.fast_menu').css('margin-top',-parseInt(fastHeight/2)+'px');

            }

            if ($('.single_mod_item_' + data.page_num).find('li').length < data.show_num) {
                var goodsStr = '<li><div class="goods_pic"><a rel="external nofollow" target="_blank" href="'+ goodsUrl + data.gid + '.html"><img src="' + data.pic + '_310x310.jpg"></a></div>'+'<div class="goods_info"><div class="goods_tit"><a rel="external nofollow" target="_blank" href="'+ goodsUrl + data.gid + '.html">' + data.d_title + '</a></div><div class="goods_price_coupon"><span class="fl goods_price"><b><i>￥</i>'+parseFloat((data.yuanjia - data.quan_jine).toFixed(2))+'</b>券后</span><span class="fr goods_coupon">领券直降<b><i>￥</i>'+parseFloat(data.quan_jine)+'</b></span></div><div class="go_buy"><span class="fl"><b>'+(data.xiaoliang>=10000?parseFloat(data.xiaoliang/10000).toFixed(1)+'万':data.xiaoliang)+'</b>人已抢</span><a href="'+ goodsUrl + data.gid + '.html" class="fr" rel="external nofollow" target="_blank">立即抢购</a></div></div></li>';
                $(goodsStr).appendTo($('.single_mod_item_' + data.page_num).find('.single_main').find('ul'));
            }
        
    
}



$(document).ready(function(){
    var setFastNum = function() {
        if ($('.single_main').offset().left > 150) {
            $('.fast_menu').css({'right': ($('.single_main').offset().left - 150) + 'px'});
        }
    }
    $(window).resize(function(){
        setFastNum();
    });
    setFastNum();
    setTimeout(function(){
        $('.fast_menu').removeClass('hide');
    },10);

    $('.fast_menu li').on('click',function(){
        if(!$(this).hasClass('cur')){
            if($(this).hasClass('goTop')){
                $('.fast_menu li').eq(0).addClass('cur');
                $("html,body").animate({"scrollTop":0},300);
            }else{
                $('.fast_menu li').removeClass('cur');
                $(this).addClass('cur');
                $("html,body").animate({"scrollTop":$('.single_mod_item').eq($(this).index()).offset().top+10},300);
            }
        }
    });

    $('.single_bottom .goTop ').on('click',function(){
        $("html,body").animate({"scrollTop":0},300);
    });

    var setScroll = function(){
        $('.fast_menu li').removeClass('cur');
        var scrollNum = $(document).scrollTop();
        if(scrollNum < $('.single_mod_item').eq(1).offset().top){
            $('.fast_menu li').eq(0).addClass('cur');
        }else{
            for(var i = 1 ; i < $('.single_mod_item').length ; i ++){
                if(i < $('.single_mod_item').length-1){
                    if(scrollNum >= $('.single_mod_item').eq(i).offset().top && scrollNum < $('.single_mod_item').eq(i+1).offset().top ){
                        $('.fast_menu li').eq(i).addClass('cur');
                    }
                }else{
                    if(scrollNum >= $('.single_mod_item').eq(i).offset().top){
                        $('.fast_menu li').eq(i).addClass('cur');
                    }
                }
            }
        }
    }



    $(document).scroll(function(){
      var oldScroll = $(document).scrollTop()+10;
      setTimeout(function(){
        if(oldScroll == $(document).scrollTop()+10){
          setScroll()
        }
      },100);
    });
      setScroll();
});