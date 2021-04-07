/**
 * static.cms - v1.0.0  License By
 * WEB小组
 */
!function (a) {
    $JavaApi = {
        getCategoryIndexLingquanLiveNew: function (a) {
            return $cmsApi.javaAjax({
                url: "/?m=ajax&a=ajaxnew",
                data: a
            })
        },getCategoryIndexLingquanLiveNewtwo: function (a) {
            return $cmsApi.getJson({
                url: "/?m=ajax&a=getnext",
                data: a
            })
        }
    }, wui.javaApi = $JavaApi
}(wui);

function upFindProductList(i, t) {
    wui.javaApi.getCategoryIndexLingquanLiveNew({
        page: String(page),               
    }).then(function (i) {
        i.data.data && (page++, t && t()), i.data.data.map(function (i) {
            var t = i.istmall ? "天猫" : "淘宝",
			 f = i.commission ? '<span class="label2">最高返' + i.commission + '元</span>' : '',
                e = "";
            e = '<li class="find_product_list"><a href="' + i.jump_url + '"><div class="find_product_list_img"><img ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + i.pic + "_310x310.jpg" + $cmsApi.checkWebp() + '" alt=""></div><p class="find_product_list_title">' + i.d_title + '</p><div class="find_product_label"><span class="label1">' + i.quan_jine + '元券</span>' + f + '</div><p class="find_product_price">券后&nbsp;&nbsp;￥&nbsp;<span>' + parseFloat($cmsApi.accSub(i.yuanjia, i.quan_jine)) + '</span></p><div class="find_product_more"><p>' + t + " ￥<span>" + parseFloat(i.yuanjia) + "</span></p><span>已售<span>" + $cmsApi.digitalAbbNumber(i.xiaoliang) + "</span></span></div></a></li>", uls[0].offsetHeight > uls[1].offsetHeight ? $(uls[1]).append(e) : $(uls[0]).append(e)
        }), wui.init("directive"),wui.javaApi.getCategoryIndexLingquanLiveNewtwo({
        page: String(page),               
    })
    })
	
}
var uls = $("#find_product_group").children(),
page = 1;
upFindProductList();
