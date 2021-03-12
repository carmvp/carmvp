!function() {   	
    var o = function(i) {
        if (0 == i.length) return "";
        var e = function() {
            var e = "";
            return $.each(i,
            function(i, x) {
                e = e + '<li class="hotsell-item"><a class="hotsell-item-href" href="' + x.jump_url + '" target="_blank" title="' + x.title + '"><div class="img-outer"><img src="' + x.pic + '" alt="' + x.title + '" class="cpc-img lazy"></div><div class="desc clearfix" style="padding: 5px 10px;background: #ff5550;"><h3 class="now-price" style="color:#fff"><em class="rmb">券后 ¥</em>' + x.coupon_price + '<span style="float: right;margin-right: 5px;">' + x.quan + '元券</span></h3></div></a></li>'
            }),
            e
        };
        return e()
    }, 
	c = function(d) {
        if (0 == d.length) return "";
        var s = function() {
            var s = "";
            return $.each(d,
            function(d, a) {
				var hasquan = a.quan ? '<div class="have-coupon"> <img style="display: block;position: absolute;left: 0;top: 0;width: 92px;height: 52px;opacity: 0;" border="0">￥ <span style="font-weight: 700;font-size: 20px;line-height: 30px;">'+a.quan+'</span></div>': '';
                s = s + '<li><a href="'+a.jump_url+'" target="_blank" title="'+a.title+'"><img class="lazy" src="'+a.pic+'" alt="'+a.title+'">'+hasquan+'<div class="hot_price"><em class="hot_yang">￥</em><em class="hot_num">'+a.coupon_price+'</em></div></a></li>'
            }),
            s
        };
        return s()
    }, 
	l = function(){
		    
                return $('img.lazy').lazyload({threshold:200,failure_limit:30,effect : "fadeIn"})
	};
	k = function(d) {
        if (0 == d.length) return "";
        var s = function() {
            var s = "";
            return $.each(d,
            function(d, a) {				
                s = s + '<li><a href="' + a.jump_url + '" title="' + a.d_title + '" target="_blank"><img class="lazy" src="' + a.pic + '" alt="' + a.d_title + '"><div class="desc"></div><div class="desc-outer">' + a.d_title + '</div><span class="price " id="mv-price"><em class="arrow"></em><em>¥</em><i>' + a.jiage + '</i></span></a></li>'
            }),
            s
        };
        return s()
    }, 
	iid = $('.product-info').attr('data-iid');
       window.javaApi.checkUserLike({
              iid:iid
              }).then(function(result) {
                     if(result.status == 1){
						$('.like_'+iid).addClass("l-active");
			            $('.liketxt').text('已收藏').addClass('active');
						$(".nl-num-icon").addClass("active");
					  }
					  $('#likenum').text(result.data);
						window.javaApi.getGoodsDetail({
                               data:'{"itemNumId":"'+iid+'"}'
                               }).then(function(result) {
                               if(result.ret[0] == "SUCCESS::调用成功"){
							   var props = result.data.props.groupProps;
							   var kulist;
							   if(props){
							   kulist = JSON.stringify(result.data.props.groupProps[0].基本信息);   
							   }
						       var values = result.data.apiStack[0].value,videos = $.parseJSON(values),vitem=videos.item, durl =  result.data.item.taobaoPcDescUrl,shop = JSON.stringify(result.data.seller) ;
						window.javaApi.getGoodsDetailinfo({					
                            v:JSON.stringify(vitem),k:kulist,d:durl,s:shop
                            }).then(function(res) {
								if(res.data.ku){$("#itemku").html(res.data.ku);}
								if(res.data.tv){$('#itemtv').html(res.data.tv);$('.tv').show();}
				               if(res.data.descurl){descurl=res.data.descurl}else{
					           descurl = "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data=%7b%22id%22%3a%22"+iid+"%22%2c%22type%22%3a%221%22%2c%22f%22%3a%22%22%7d";
					           }				               
				            window.javaApi.getGoodsDetailImg({					
				                       dd:descurl
				                       }).then(function(i) { 	
                                           var iiccc = Loadimg; 			                           
				                           var img = i.data.pcDescContent;	
				                           img = img.replace(/src/g, 'data-original');						
				                           $('.imglist').html(img);	
				                           $('.imglist img').attr('class','lazy');
				                           $('.imglist img').attr('src',iiccc);
				                           $('.imglist div').attr('style','');
				                           $('.imglist p').attr('style','');					
				                           $('.imglist span').attr('style','');	
				                           $('.imglist img').attr('size','');
				                           $('.imglist img').attr('style','');
				                           $('.imglist table').attr('width','100%');
				                           $('.imglist').find('area').attr('href','javascript:;');
				                           $('.imglist').find('a').attr('href','javascript:;');
				                           $('img.lazy').lazyload({threshold:200,failure_limit:30,effect : "fadeIn"});	
                                       }),window.javaApi.getSameGoods({
                                              iid: iid
                                              }).then(function(resl) {
                                                 if(resl.status == 1){				                                        
													$("#samelist").html(c(resl.data))
				                                 }
                                              })
						
                       })				
						
					 }
                })
				
			  })
} ();