;(function($){
    $.yangtata.renlin = {
        settings: {
            renlin_btn: '.renlin'
        },
        init: function(options){
            options && $.extend($.yangtata.renlin.settings, options);
            $.yangtata.renlin.ec();
        },
        ec: function(){
            var s = $.yangtata.renlin.settings;
            $(s.renlin_btn).on('click', function(){
                if(!$.yangtata.dialog.islogin()) return !1;
                    var iid = $(this).attr('data-id');                    
                $.getJSON(yangtataER.root + '/?m=user&a=renlin', {iid:iid}, function(result){
                    if(result.status == 1){                        
						$.dialog({id:'getscore', title:'订单认领', content:result.data, padding:'', fixed:true, lock:true});
                        $.yangtata.renlin.getscore_form($('#J_check_form'));
                    }else{
                        $.yangtata.tip({content:result.msg, icon:'error'});
                    }
                });
            });
        },
        //地址表单
        getscore_form: function(form){
            form.ajaxForm({
                success: function(result){
                    if(result.status == 1){
                        //$.dialog.get('getscore').close();
                        $.yangtata.tip({content:result.msg, icon:'ok'});
                        window.location.reload();
                    } else {
                        $.yangtata.tip({content:result.msg, icon:'error'});
                    }
                },
                dataType: 'json'
            });
        }
    };
    $.yangtata.renlin.init();
})(jQuery);