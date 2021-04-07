/**
 * @name 买家秀投搞
 * @author yangtata
 */
;(function($){
    $.yangtata.show = {
        settings: {
            show_btn: '.J_show_btn'
        },
        init: function(options){
            options && $.extend($.yangtata.show.settings, options);           
            $.yangtata.show.ec();
        },
        ec: function(){
            var s = $.yangtata.show.settings;
            $(s.show_btn).on('click', function(){
                if(!$.yangtata.dialog.islogin()) return !1;    
				var id = $(this).attr('data-id');
                $.getJSON(yangtataER.root + '/?m=show&a=ajax_add', {id:id}, function(result){
                   if(result.status == 1){
                        $.dialog({id:'show_add', title:result.msg, content:result.data, width:800, height:500,padding:'', fixed:true, lock:true});
                        $.yangtata.show.address_form($('#J_address_form'));
                    }else{
                        $.yangtata.tip({content:result.msg, icon:'error'});
                    }
                });
            });
        },       
        address_form: function(form){
            form.ajaxForm({
                success: function(result){
                    if(result.status == 1){
                        $.dialog.get('show_add').close();
                        $.yangtata.tip({content:result.msg});
                        window.location.reload();
                    } else {
                        $.yangtata.tip({content:result.msg, icon:'error'});
                    }
                },
                dataType: 'json'
            });
        }
    };
    $.yangtata.show.init();
})(jQuery);