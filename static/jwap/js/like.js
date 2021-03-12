(function() {
	$(".bottom_bar_fav").on('click',function() {
		var iid = $(this).attr("data-pid");
		var mod = $(this).attr("data-type");
		if(!$.yangtata.dialog.islogin()) return ;
		$.ajax({
			url: yangtataER.root + '/?m=ajax&a=like',
				type: 'POST',
				data: {
				pid: iid,
				mod:mod
			},
			dataType: 'json',
			success: function(result){
				if(result.status == 1){
					layer.open({		   
					content: result.msg,
					skin: 'msg',
					time: 2			
					});
				$('.default').addClass('selected');
				$('.like.text').html('已收藏');
				}else if(result.status == 2){
					layer.open({		   
					content: result.msg,
					skin: 'msg',
					time: 2			
					});
				$('.default').removeClass('selected');
				$('.like.text').html('收藏');	
				}else{
					$.yangtata.tip({content:result.msg, icon:'error'});
				}
			}
		});		  
	});
})(jQuery);