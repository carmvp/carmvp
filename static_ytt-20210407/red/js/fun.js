function CloseNLRAF(a) {
	if (a) {
		$.cookie("NLRAF", "true", {
			path: "/",
			expires: 30
		})
	} else {
		$.cookie("NLRAF", "true", {
			path: "/"
		})
	}
	$("#afp").slideUp()
}

$(function(){	
	if ($.cookie("NLRAF") == null && !/favorite|desk|zt11/.test(location.search)) {
		if (!$("#afp").length) {
			$("body").prepend('<div id="afp" class="totop-tips" style="display:none;"><p>请按键盘 <strong>CTRL + D</strong> 把'+WEBNICK+'放入收藏夹，折扣信息一手掌握！<label id="nlraf" onclick="CloseNLRAF(true)" for="check_nlraf"><input style="display:none;" type="checkbox" id="check_nlraf" /><a href="javascript:void(0)">不再提醒</a></label><a id="cafpa" href="javascript:void(0)" onclick="CloseNLRAF(false)"></a><a id="cafp" href="javascript:void(0)" onclick="CloseNLRAF(false)"><span class="closet"><em>x</em>关闭</span></a></p></div>')
		}
		$("#afp").slideDown("slow")
	}

	
	
	
});