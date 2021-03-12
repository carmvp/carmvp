var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
window.onload = function() {
var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight; //兼容IOS，不需要的可以去掉	
var tip = document.getElementById('weixin-tip');
var innerWidth = $("#weixin-tt").innerWidth();
//var ttip = document.getElementById('weixin-tt');
var close = document.getElementById('close');
	if (is_weixin) {
	    $("#J_weixin,#J_q_weixin,#J_go_weixin,#J_c_weixin").live('click', function() {		
			tip.style.height = winHeight + 'px'; //兼容IOS弹窗整屏
			tip.style.display = 'block';
			return false;
		})		
		close.onclick = function() {
			tip.style.display = 'none';
		}
		$("#J_itemweixin").live('click', function() {		
			$('#weixin-tt').css('height',innerWidth); //兼容IOS弹窗整屏			
			$('#weixin-tt').addClass("quanpost");
			$('#xywxobg').show();
			$('#closed').show();
			
			return false;
		})
		$(function(){
		$('#closed').live('click',function(){
		$('#weixin-tt').css('height','auto');
		$('#xywxobg').hide();
		$('#closed').hide();
		$('#weixin-tt').removeClass("quanpost");
		});	
		});
	}
}