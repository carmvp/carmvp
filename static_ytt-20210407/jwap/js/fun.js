function CloseNLRAF(a) {	
	if (a) {
		var date = new Date();
        date.setTime(date.getTime()+30*24*60*60*1000);
		$.cookie("NLRAF", "true", {
			path: "/",
			expires: date
		})
	} else {
		var date = new Date();
        date.setTime(date.getTime()+1*1000);
		$.cookie("NLRAF", "true", {
			path: "/",
			expires: date
		})
	}
	$("#afp,#dialog_bgmask").slideUp()
}
$(function(){	
	if ($.cookie("NLRAF") == null && !/favorite|desk|zt11/.test(location.search)) {
		if (!$("#afp").length) {
			var bodywh = $("body").width();
			var wth = $(window).height();
			var cth = wth*0.1;
			var mainwh = $(".main").width();
			var cwh = mainwh*0.9;
			var clwh = mainwh*0.05;
			var lwh = (bodywh-mainwh)/2;
			var leftwh = lwh+clwh;
			html = '';
			html +='<div id="dialog_bgmask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed; -webkit-user-select: none; z-index: 9999999;" class="dialog-overlay-mask"></div>';
			html +='<a id="cafp" href="javascript:void(0)" onclick="CloseNLRAF(false)" class="dialog-overlay-close" role="button">';
			html +='<span class="dialog-overlay-close-x">ß</span>';
			html +='</a>';
			html +='<div class="dialog-overlay-content">';
			html +='<div class="container info-container">';
			html +='<div class="img-title">';
			html +='<img src="/static/images/fanc.png">';
			html +='</div>';
			html +='<div class="text-content"><div class="tip-title">';
			html +='返积分说明';
			html +='</div><div class="text-info"><ul><li><span class="red bold">';
			html +='重要提示：领券后没有下单购买将无法获得积分！';
			html +='</span></li><li><span class="bold black">';
			html +='返积分须知：';
			html +='</span></li><li>';
			html +='1.通过本站PC、WAP、APP进入淘宝网下单成功后均可返积分';
			html +='</li><li>';
			html +='2.通过本站查询优惠券后点击领券购买进入淘宝网付款成功后可返积分';
			html +='</li><li>';
			html +='3.目前仅支持淘宝和天猫商品返积分，确认收货后使用淘宝账号登陆本站可返积分';
			html +='</li><li>';
			html +='4.实际返积分数量以商家参与活动所设置的金额数量为准~本站显示预估积分';
			html +='</li><li><span class="bold black">';
			html +='无返积分的情况：';
			html +='</span></li><li>';
			html +='1.未开始抢购的商品不可返积分';
			html +='</li><li>';
			html +='2.商家已下架或未参与活动推广的不可返积分';
			html +='</li><li>';
			html +='3.查询没有积分的商品不可返积分';
			html +='</li></ul></div></div>';
			html +='<div class="bx-form supportCheck"><label id="nlraf" onclick="CloseNLRAF(true)" for="check_nlraf"><input class="iknow-checkbox" type="checkbox" id="check_nlraf"><span class="iknow-name">';
			html +='不再提示';
			html +='</span></label></div><div class="ok" id="cafp" href="javascript:void(0)" onclick="CloseNLRAF(false)">';
			html +='我知道了';
			html +='</div></div></div></div>';
			$("body").prepend(html)
		}
		$("#afp,#dialog_bgmask").slideDown("slow")
	}

	
	
	
});