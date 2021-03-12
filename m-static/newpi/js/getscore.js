;(function($){
    $.yangtata.jinjia = {
        settings: {
            jinjia_btn: '.jinjia'
        },
        init: function(options){
            options && $.extend($.yangtata.jinjia.settings, options);
            $.yangtata.jinjia.ec();
        },
        ec: function(){
            var s = $.yangtata.jinjia.settings;
            $(s.jinjia_btn).on('click', function(){
                if(!$.yangtata.dialog.islogin()) return !1;
                    var iid = $(this).attr('data-id');                    
                $.getJSON(yangtataER.root + '/?m=ajax&a=getscore', {iid:iid}, function(result){
                    if(result.status == 1){                        
						$.dialog({id:'getscore', title:'商品竞价', content:result.data, padding:'', fixed:true, lock:true});
                        $.yangtata.jinjia.getscore_form($('#J_check_form'));
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
    $.yangtata.jinjia.init();
})(jQuery);