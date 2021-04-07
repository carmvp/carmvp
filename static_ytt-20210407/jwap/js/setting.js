/**
 * @name 邀请好友
 * @author yangtata@vip.qq.com
 * @url http://www.yangtata.com
 */
;(function(){
    $.yangtata.yousite = {
        init: function(){            
            $.yangtata.yousite.union();            
        },
		union: function(){
            $('#links_btn').on('click', function(){
                var sibling_input=$(this).siblings('input.links_in');
				sibling_input.select();
				 $.yangtata.yousite.copy(sibling_input.val(),'ok');
            });
			$('input.links_in').click(function(){
				$(this).data('focus',1);
				$(this).select();
			});
			$('input.links_in').blur(function(){
				if($(this).data('focus')){
					 $.yangtata.yousite.copy($(this).val(),'not');
					$(this).data('focus',0);
				}
			});
        },

		copy: function(text,isalert) {
             if(window.clipboardData){
				window.clipboardData.setData('text',text);
				alert('复制成功');
			}else{
				if(isalert=='ok'){
					alert('很抱歉，您的浏览器不支持自动复制，请直接手动复制');
				}
			}
         },
        
    };
    $.yangtata.yousite.init();
})(jQuery);