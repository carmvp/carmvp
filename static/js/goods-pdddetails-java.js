!function() {   	    
	c = function(d) {
        if (0 == d.length) return "";
        var s = function() {
            var s = "";
            return $.each(d,
            function(d, a) {
				var hasquan = a.quan ? '<div class="have-coupon"> <img style="display: block;position: absolute;left: 0;top: 0;width: 92px;height: 52px;opacity: 0;" border="0">￥ <span style="font-weight: 700;font-size: 20px;line-height: 30px;">'+a.quan+'</span></div>': '';
                s = s + '<li><a href="'+a.jump_url+'" target="_blank" title="'+a.title+'"><img class="lazy" src="'+a.pic_url+'" alt="'+a.title+'">'+hasquan+'<div class="hot_price"><em class="hot_yang">￥</em><em class="hot_num">'+a.coupon_price+'</em></div></a></li>'
            }),
            s
        };
        return s()
    }, 
	iid = $('.product-info').attr('data-iid'),cat = $('.product-info').attr('data-cat');
       window.javaApi.checkUserLike({
              iid:iid
              }).then(function(result) {
                     if(result.status == 1){
						$('.like_'+iid).addClass("l-active");
			            $('.liketxt').text('已收藏').addClass('active');
						$(".nl-num-icon").addClass("active");
					  }
					  $('#likenum').text(result.data);
						window.javaApi.getPddSameGoods({
                                              cat: cat
                                              }).then(function(resl) {
                                                 if(resl.status == 1){				                                        
													$("#samelist").html(c(resl.data))
				                                 }
                        })
				
			  })
} ();