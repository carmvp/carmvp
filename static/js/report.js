;(function($) {	//举报
	$('.buy_ed').on('click', function(){
		if(!$.yangtata.dialog.islogin()) return !1;
		var znid = $(this).attr('znid');
		var title = $(this).attr('title');
		$.getJSON(yangtataER.root+'/?m=ajax&a=report&znid='+znid, function(result){
			if(result.status == 1){
				$.dialog({id:'report', title:'问题商品举报', content:result.data, padding:'',width:'400px', fixed:true, lock:true});
				$.yangtata.item.report($('#J_report'));
			}else{
				$.yangtata.tip({content:result.msg, icon:'error'});
			}
		});
	});

 

})(jQuery);