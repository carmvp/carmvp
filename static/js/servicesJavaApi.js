!function(a) {
    $JavaApi = { 		
		checkUserLike: function(a) {
            return window.cmsApi.postAjax({
                url: "/?m=item&a=check_like",
                data: a
                
            })
        },	
		getGoodsDetail: function(a) {
            return window.cmsApi.jsonAjax({
                url: "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.4.8&appKey=12574478&api=mtop.taobao.detail.getdetail&v=6.0&dataType=jsonp&ttid=2017%40taobao_h5_6.6.0&AntiCreep=true&type=jsonp",
                data: a
                
            })
        },
		getGoodsDetailinfo: function(a) {
            return window.cmsApi.postAjax({
                url: "/?m=item&a=getdetail",
                data: a
                
            })
        },
		getGoodsDetailImg: function(a) {			
            return window.cmsApi.jsonAjax({
                url: a.dd,
                data:{}
                
            })
        },  
        getSameGoods: function(a) {
            return window.cmsApi.postAjax({
                url: "/?m=item&a=same_json",
                data: a
            })
        },
        getOrlikeGoods: function(a) {
            return window.cmsApi.postAjax({
                url: "/?m=item&a=get_orlike",
                data: a
            })
        },
		getPddSameGoods: function(a) {
            return window.cmsApi.postAjax({
                url: "/?m=detail&a=same_json",
                data: a
            })
        },
        
    },
    window.javaApi = $JavaApi
} ();