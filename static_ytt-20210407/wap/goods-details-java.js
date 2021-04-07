!function() {
    var i = function(i) {
        
        return i ? i: ""
    },
    o = function(i, o) {
        if (0 == i.length) return "";
        var e = function() {
            var e = "";
            return $.each(i,
            function(i, a) {
                e = e + '<div class="swiper-slide" ><div class="swiper-cent"><a href="' + a.jump_url + '" class="img" rel="nofollow" ><img src="' + a.pic + $cmsApi.checkWebp() + '" alt=""></a><p class="name">' + a.title + '</p><p class="quan"><span>' + a.quan + '元券</span></p><p class="money col-money">券后价  <span>¥' + a.coupon_price + "</span></p></div></div>"
            }),
            e
        };
        return e()
    },
    e = function(i) {          
        return i ? '<div class="goods_reco" ><h3>宝贝详情</h3><div class="imglist">' + i + "</div></div>": ""
    },
	l = function(){
		    var t = "img[ui-lazyload]";
                return ! $(t).attr("isLoad") && ($(t).attr("isLoad", !0), void $(t).lazyload({
                    effect: "fadeIn"
            })) || $(t).lazyload({threshold:200,failure_limit:30,effect : "fadeIn"})
	};	
    wui.directive("up-details-java",
    function() {		
        return {			
            uses: ["servicesJavaApi.js","lazyload.js"],
            scope: {                
                goodsid: "goodsid"                
            },
            link: function(a) {                
                var s = a.scope;
                a.element;				
                return !$(a.element).attr("isLoad") && ($(a.element).attr("isLoad", !0), wui.javaApi.getGoodsDetail({
                    data:'{"itemNumId":"'+s.goodsid+'"}'
                }).then(function(result) {					 
                     if(result.ret[0] == "SUCCESS::调用成功"){
						var props = result.data.props.groupProps;
						var kulist;
						if(props){
						kulist = JSON.stringify(result.data.props.groupProps[0].基本信息);   
						} 
						var values = result.data.apiStack[0].value,videos = $.parseJSON(values),vitem=videos.item, durl =  result.data.item.taobaoPcDescUrl,shop = JSON.stringify(result.data.seller) ;
						wui.javaApi.getGoodsDetailinfo({					
                            v:JSON.stringify(vitem),k:kulist,d:durl,s:shop
                            }).then(function(res) {	
				               if(res.data.descurl){descurl=res.data.descurl}else{
					           descurl = "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data=%7b%22id%22%3a%22"+s.goodsid+"%22%2c%22type%22%3a%221%22%2c%22f%22%3a%22%22%7d";
					           }
				               if(result.ret[0] == "SUCCESS::调用成功"){$("#goodsShopShow").html(i(res.data.shop),l());$("#itemku").html(i(res.data.ku));}
				            wui.javaApi.getSimilarGoods({
				                id: s.goodsid
				                }).then(function(i) {
				                !i.data ? ($("#goodsRecoShow").remove(), !1) :0 === i.data.length && $("#goodsRecoShow").remove(),$("#goodsRecoShow").find(".swiper-wrapper").html(o(i.data, s),l())
				                }),wui.javaApi.getGoodsDetailImg({					
				                       dd:descurl
				                       }).then(function(i) { 
				                           if (!i.data) return $(".header_goods .icon_header>div.title a:eq(1)").hide(),!1;
				                           var o = i.data.pcDescContent;
				                           o = o.replace("http://", "https://");
				                           o = o.replace(/src/g, 'ui-lazyload alt="" src="/static/wap/images/rolling.gif" data-original');	
				                           return 0 === o.length ? ($(".header_goods .icon_header>div.title a:eq(1)").hide(), !1) : ($("#goodsReco").html(e(res.data.tv+o)),$('.imglist div').attr('style',''),$('.imglist p').attr('style',''),$('.imglist img').attr('size',''),$('.imglist span').attr('style',''),$('.imglist img').attr('style',''),$('.imglist img').attr('height',''),$('.imglist table').attr('width','100%'),$('.imglist table').attr('height','100%'),$('.imglist table').attr('style',''),$('.imglist').find('area').attr('href','javascript:;'),$('.imglist').find('a').attr('href','javascript:;'),l())	
                                       }),wui.javaApi.getRecommendGoods({
                                              id: s.goodsid
                                              }).then(function(i) {
                                                 $("#RecommendGoodsShow").html($cmsApi.goodsListTpl(i.data)),l();
                                              })
						
                       })				
						
					 }
                })

					
					  					
					 )
            }
        }
    })
} ();