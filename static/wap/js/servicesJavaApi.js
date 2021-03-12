!function(a) {
    $JavaApi = {       
        getNewCategoryProductModelDetailByModel: function(a) {            
            return $cmsApi.javaAjax({
                url: "/?m=ajax&a=entityd",
                data: a
            })
        },
        
        getCategoryIndexLingquanLiveNew: function(a) {
            return $cmsApi.javaAjax({
                url: "/?m=ajax&a=ajaxnew",
                data: a
            })
        },
        getGoodsSysQuanNum: function(a) {
            return $cmsApi.javaAjax({
                url: "/?m=ajax&a=get_quannum",
                data: a                
            })
        },
        getGoodsListCategory: function(a) {
            return $cmsApi.javaAjax({
                url: "/?m=ajax&a=cate",
                data: a                
            })
        },
		getGoodsDetail: function(a) {
            return $cmsApi.jsonAjax({
                url: "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/",
                data: a
                
            })
        },
		getGoodsDetailinfo: function(a) {
            return $cmsApi.postAjax({
                url: "/?m=item&a=getdetail",
                data: a
                
            })
        },
		getGoodsDetailImg: function(a) {			
            return $cmsApi.jsonAjax({
                url: a.dd,
                data:{}
                
            })
        },        
        getSimilarGoods: function(a) {
            return $cmsApi.postAjax({
                url: "/?m=item&a=get_same",
                data: a
            })
        },
        getRecommendGoods: function(a) {
            return $cmsApi.postAjax({
                url: "/?m=item&a=get_orlike",
                data: a
            })
        }
        
    },
    wui.javaApi = $JavaApi
} (wui);