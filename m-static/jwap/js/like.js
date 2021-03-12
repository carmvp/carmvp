(function($) {
	$(".joa_load_app").live('click', function() {
		var pid = $(this).attr("data-pid");
		if(!$.cn666.dialog.islogin()) return ;
		$.ajax({
			url: cn666ER.root + '/?m=ajax&a=like',
				type: 'POST',
				data: {
				pid: pid
			},
			dataType: 'json',
			success: function(result){
				if(result.status == 1){
					$.cn666.tip({content:result.msg, icon:'success'});
				}else if(result.status == 2){
					$.cn666.tip({content:result.msg, icon:'error'});
				}else{
					$.cn666.tip({content:result.msg, icon:'error'});
				}
			}
		});
		  
	});

})(jQuery);