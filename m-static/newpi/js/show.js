/**
 * @name 买家秀投搞
 * @author cn666
 */
;(function($){
    $.cn666.show = {
        settings: {
            show_btn: '.J_show_btn'
        },
        init: function(options){
            options && $.extend($.cn666.show.settings, options);           
            $.cn666.show.ec();
        },
        ec: function(){
            var s = $.cn666.show.settings;
            $(s.show_btn).live('click', function(){
                if(!$.cn666.dialog.islogin()) return !1;    
				var id = $(this).attr('data-id');
                $.getJSON(cn666ER.root + '/?m=show&a=ajax_add', {id:id}, function(result){
                   if(result.status == 1){
                        $.dialog({id:'show_add', title:result.msg, content:result.data, width:800, height:500,padding:'', fixed:true, lock:true});
                        $.cn666.show.address_form($('#J_address_form'));
                    }else{
                        $.cn666.tip({content:result.msg, icon:'error'});
                    }
                });
            });
        },       
        address_form: function(form){
            form.ajaxForm({
                success: function(result){
                    if(result.status == 1){
                        $.dialog.get('show_add').close();
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
    $.cn666.show.init();
})(jQuery);