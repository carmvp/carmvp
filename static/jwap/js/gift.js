/**
 * @name 礼物中心
 * @author yangtata
 */
;(function($){
    $.yangtata.gift = {
        settings: {
            gift_btn: '.J_gift_btn'
        },
        init: function(options){
            options && $.extend($.yangtata.gift.settings, options);
            //详细信息切换
            $('ul.J_desc_tab').tabs('div.J_desc_panes > div');
            $.yangtata.gift.ec();
        },
        ec: function(){
            var s = $.yangtata.gift.settings;
            $(s.gift_btn).on('click', function(){
                if(!$.yangtata.dialog.islogin()) return !1;
                var id = $(this).attr('data-id'),
                    num_input = $(this).attr('data-num'),
                    num = $(num_input).val();
                $.getJSON(yangtataER.root + '/?m=gift&a=ec', {id:id, num:num}, function(result){
                    if(result.status == 1){
                        layer.open({		   
						content:result.msg,
						skin: 'msg',
						time: 3			
						});
                    }else if(result.status == 2){
                        $.dialog({id:'gift_address', title:result.msg, content:result.data, width:'auto', padding:'', fixed:true, lock:true});
                        $.yangtata.gift.address_form($('#J_address_form'));
                    }else{
                        layer.open({		   
						content:result.msg,
						skin: 'msg',
						time: 3			
						});
                    }
                });
            });
        },
        //地址表单
        address_form: function(form){
            form.ajaxForm({
                success: function(result){
                    if(result.status == 1){
                        $.dialog.get('gift_address').close();
                        $.yangtata.tip({content:result.msg});
						layer.open({		   
						content:result.msg,
						skin: 'msg',
						time: 3			
						});
                        window.location.reload();
                    } else {
                        layer.open({		   
						content:result.msg,
						skin: 'msg',
						time: 3			
						});
                    }
                },
                dataType: 'json'
            });
        }
    };
    $.yangtata.gift.init();
})(jQuery);