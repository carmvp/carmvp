/**
 * @name 礼物中心
 * @author cn666
 */
;(function($){
    $.cn666.gift = {
        settings: {
            gift_btn: '.J_gift_btn'
        },
        init: function(options){
            options && $.extend($.cn666.gift.settings, options);
            //详细信息切换
            $('ul.J_desc_tab').tabs('div.J_desc_panes > div');
            $.cn666.gift.ec();
        },
        ec: function(){
            var s = $.cn666.gift.settings;
            $(s.gift_btn).live('click', function(){
                if(!$.cn666.dialog.islogin()) return !1;
                var id = $(this).attr('data-id'),
                    num_input = $(this).attr('data-num'),
                    num = $(num_input).val();
                $.getJSON(cn666ER.root + '/?m=gift&a=ec', {id:id, num:num}, function(result){
                    if(result.status == 1){
                        $.cn666.tip({content:result.msg});
                    }else if(result.status == 2){
                        $.dialog({id:'gift_address', title:result.msg, content:result.data, width:'auto', padding:'', fixed:true, lock:true});
                        $.cn666.gift.address_form($('#J_address_form'));
                    }else{
                        $.cn666.tip({content:result.msg, icon:'error'});
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
                        $.cn666.tip({content:result.msg});
                        window.location.reload();
                    } else {
                        $.cn666.tip({content:result.msg, icon:'error'});
                    }
                },
                dataType: 'json'
            });
        }
    };
    $.cn666.gift.init();
})(jQuery);