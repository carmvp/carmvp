var copyClickA = function(obj){
    if(obj.prop('href')!='javascript:void(0)' || obj.data('href') != undefined){
      var id = obj.prop('href').split('id=')[1]||obj.data('href').split('id=')[1];
      $.post(tpwd,{id:id},function(res){
        if (typeof res == 'string'){
          res = JSON.parse(res);
        }
        $('.weixin-tip').css('display','block');
        if(res.msg == 1){          
		  $('.tkl-layer .tkl_text').text(res.tbcode);
          $('.tkl-layer').css('display','block');
          if($('.keycope').length>0){
            $('.keycope').text('一键复制');
            $('.keycope').css({'background': '#ff4400','color': 'white'});
            $('.keycope').attr('aria-label',res.tbcode);
          }
        }else{
          $('.tkl-layer').css('display','none');
        }
      }).error(function(){
        $('.weixin-tip').css('display','block');
        $('.tkl-layer').css('display','none');
      })
    }
}


for(item in dataDef){//楼层商品数据
    var data = dataDef[item];
         
           
            if ($('.single_mod_item_' + data.page_num).length < 1) {
                $('<div class="single_mod_item single_mod_item_def single_mod_item_' + data.page_num + '"></div>').appendTo($('.single_wrap'));
                var item_head = '<div class="single_head"><h2><span>' + data.show_name + '</span></h2>\
                      <p>' + data.show_desc + '</p>\
                    </div>';
                $(item_head).appendTo($('.single_mod_item_' + data.page_num));
                $('<div class="single_main"><ul></ul></div>').appendTo($('.single_mod_item_' + data.page_num));
                $('<li><span>' + data.show_name + '</span></li>').appendTo($('.fast_menu ul'));
            }
          var goodsLink = goodsUrl + data.gid;
          if($('.weixin-tip').length > 0){//微信
            goodsLink = 'href="javascript:void(0)" data-href="'+goodsLink+'" onclick="copyClickA($(this))"';
          }else{
            goodsLink = 'href="'+goodsLink+'"';
          }


          if ($('.single_mod_item_' + data.page_num).find('li').length < 24 && $('.single_nine_main').length <1 || $('.single_nine_main').length > 0 && $('.single_mod_item_' + data.page_num).find('li').length < 100) {
                var goodsStr = '<li><div class="goods_pic"><a rel="external nofollow" target="_blank" '+goodsLink+'><img class="lazy" src="'+loaddingImg+'" data-original="'+data.pic+'_310x310.jpg"></a></div>'+'<div class="goods_info"><div class="goods_tit"><a target="_blank" rel="external nofollow" '+goodsLink + '>' + data.d_title + '</a></div><div class="goods_price_coupon"><span class="fl goods_price"><b><i>￥</i>'+parseFloat((data.yuanjia - data.quan_jine).toFixed(2))+'</b></span><span class="fr goods_coupon">领券直降<b><i>￥</i>'+parseFloat(data.quan_jine)+'</b></span></div><div class="go_buy"><span class="fl"><b>'+(data.xiaoliang>=10000?parseFloat(data.xiaoliang/10000).toFixed(1)+'万':data.xiaoliang)+'</b>人已抢</span><a '+goodsLink+' class="fr" target="_blank" rel="external nofollow">立即抢购</a></div></div></li>';
                $(goodsStr).appendTo($('.single_mod_item_' + data.page_num).find('.single_main').find('ul'));
            }

        
    
    if(item == dataDef.length-1){
      $("img.lazy").lazyload();
    }
}

$(document).ready(function(){

  $(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
      $(".toTop").fadeIn(1500);
    }
    else {
      $(".toTop").fadeOut(1500);
    }
  });
  $('.toTop').click(function(){
    $('body,html').animate({scrollTop:0},1000);
  })


  var num = $('.fast_menu ul li').length,
    doc_width = $(document).width()-20,
    li_width = parseInt(doc_width/4);
  $('.fast_menu ul').width(li_width*num+'px');
  $('.fast_menu ul li').css('width',li_width+'px');



  var fastMunScroll = function(){
    if(!$('.fast_menu').hasClass('fast_menu_show')){
      $('.fast_menu ul').width(li_width*num+'px');
      var index = $('.fast_menu li.cur').index(),
        w = $('.fast_menu li').eq(0).width(),
        l = 0;
      if(index < ($('.fast_menu li').length - 4) ){
          l = index*w+'px';
      }else{
          l = ($('.fast_menu li').length - 4)*w + 'px'
      }
      $('.fast_menu ul').css("left",'-'+l);
    }
  }

  fastMunScroll();


  $('.fast_right').on('click',function(){
    if($(this).hasClass('menu_show')){
      $(this).removeClass('menu_show');
      $('.fast_menu').removeClass('fast_menu_show');
      fastMunScroll();
    }else{
      $(this).addClass('menu_show');
      $('.fast_menu').addClass('fast_menu_show');
    }
  })



    $('.fast_menu li').on('click',function(){
        if(!$(this).hasClass('cur')){

            if($(this).hasClass('goTop')){
                $('.fast_menu li').eq(0).addClass('cur');
                $("html,body").animate({"scrollTop":0},300,function(){

                  $('.fast_menu li').removeClass('cur');
                  $(this).addClass('cur');
                });
            }else{

                $("html,body").animate({"scrollTop":$('.single_mod_item').eq($(this).index()).offset().top-50},300,function(){

                  $('.fast_menu li').removeClass('cur');
                  $(this).addClass('cur');
                });
            }
          fastMunScroll();
        }
    });
    var setScroll = function(){
        var scrollNum = $(document).scrollTop()+60;
        $('.fast_menu li').removeClass('cur');
		if(scrollNum < $('.single_mod_item').eq(0).offset().top){
			$('.fast_menu').addClass('hide');
       }else{
			$('.fast_menu').removeClass('hide');
		}
        if(scrollNum < $('.single_mod_item').eq(1).offset().top){
            $('.fast_menu li').eq(0).addClass('cur');            
            fastMunScroll();
        }else{            
            for(var i = 1 ; i < $('.single_mod_item').length ; i ++){
                if(i < $('.single_mod_item').length-1){
                    if(scrollNum >= $('.single_mod_item').eq(i).offset().top && scrollNum < $('.single_mod_item').eq(i+1).offset().top ){
                        $('.fast_menu li').eq(i).addClass('cur');
                      fastMunScroll();
                    }
                }else{
                    if(scrollNum >= $('.single_mod_item').eq(i).offset().top){
                        $('.fast_menu li').eq(i).addClass('cur');
                      fastMunScroll();
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



    //微信弹出
    $(".keycope").on("click", function () {
        $('.copy_dom').html($(this).attr('aria-label'));
    });

    if($('.weixin-tip').length > 0){
        $('a').on('click',function(e){
          e.preventDefault();
          //copyClickA($(this));
        })

    }



//微信点击站外链接弹出提示
    $('.weixin-cover').click(function(){
        $('.weixin-tip').css('display','none');
        $('.tkl').css('display','block');
        $('.buy-wrapper').css('display','block');
        $('#myVideo').css('display','block');
    });

    var kycopy = 1,ios = 1;
    function isIOS10() {
        //获取固件版本
        var getOsv = function () {
            var reg = /OS ((\d+_?){2,3})\s/;
            if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
                var osv = reg.exec(navigator.userAgent);
                if (osv.length > 0) {
                    return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
                }
            }else{
                ios = 0;
            }
            return '';
        };
        var osv = getOsv();
        var osvArr = osv.split('.');
        //初始化显示ios9引导
        if (osvArr && osvArr.length > 0) {
            if (parseInt(osvArr[0]) >= 10) {
                return true
            }
        }
        return false
    }

//ios版本

    if(isIOS10()){
        kycopy = 1;
    }else{
        kycopy = 0
    }
//文字输入
    function iptNum(ths,sta) {
        if(sta) {
            taoKeyNum = ths.value;
        }
        if(ths.value != taoKeyNum) {
            ths.value = taoKeyNum;
        }
    }

//不支持clip
    if(kycopy == 0 && ios == 1){
        $('.tkl-code').removeClass('yjfz_copy');
        // $('.keycope').remove();
        document.addEventListener("selectionchange", function (e) {
            if (window.getSelection().anchorNode.parentNode.id == 'code1_ios' && document.getElementById('code1_ios').innerText != window.getSelection()) {
                var key = document.getElementById('code1_ios');
                window.getSelection().selectAllChildren(key);
            }
            if (window.getSelection().anchorNode.parentNode.id == 'code2_ios' && document.getElementById('code2_ios').innerText != window.getSelection()) {
                var key = document.getElementById('code2_ios');
                window.getSelection().selectAllChildren(key);
            }
        }, false);
    }else{
        if(ios == 1){
            var clipboard = new Clipboard('.keycope', {
                //动态设置复制内容
                target:function() {
                    // return trigger.getAttribute('aria-label');
                    return document.querySelector('.copy_dom');
                }
            });

            clipboard.on('success', function(e){
                $('.copy_dom').html('');
                e.trigger.innerHTML="已复制";
                e.trigger.style.background = "#67cf84";
                e.trigger.parentNode.style.borderColor = "#67cf84";
                e.clearSelection();
            });

            clipboard.on('error', function(e) {
                $('.copy_dom').html('');
                e.trigger.style.background = "#f47171";
                e.trigger.parentNode.style.borderColor = "#f47171";
                e.trigger.innerHTML="复制失败";
            });

            $('.yjfz_copy textarea').remove();
        }else{

            //一键复制!ios
            var dseClip = new Clipboard('.keycope', {
                text: function(trigger) {
                    return trigger.getAttribute('aria-label');
                }
            });
            dseClip.on('success', function(e) {
                e.trigger.style.background = "#67cf84";
                e.trigger.parentNode.style.borderColor = "#67cf84";
                e.trigger.innerHTML="已复制";
                e.clearSelection();
            });
            dseClip.on('error', function (e) {

                e.trigger.style.background = "#f47171";
                e.trigger.parentNode.style.borderColor = "#f47171";
                e.trigger.innerHTML="复制失败";
                e.clearSelection();
            });
        }

    }

});
