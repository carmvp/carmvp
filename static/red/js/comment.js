/**
 * @name 商品评论
 * @author andery@foxmail.com
 * @url http://www.yangtata.com
 */
;(function($){
    $.yangtata.comment = {
        settings: {
            container: '#pub_area',
            page_list: '#note_comment_list',
            page_bar: '#J_cmt_page',
            pub_content: '#pub_content',
            pub_btn: '#pub_submit'
        },
        init: function(options){
            options && $.extend($.yangtata.comment.settings, options);
            $.yangtata.comment.list();
            $.yangtata.comment.publish();
        },
        //列表
        list: function(){
            var s = $.yangtata.comment.settings;
            $('li', $(s.page_list)).live({
                mouseover: function(){
                    $(this).addClass('hover');
                },
                mouseout: function(){
                    $(this).removeClass('hover');
                }
            });
            $('a', $(s.page_bar)).live('click', function(){
                var url = $(this).attr('href');
                $.getJSON(url, function(result){
                    if(result.status == 1){
                        $(s.page_list).html(result.data.list);
                        $(s.page_bar).html(result.data.page);
                    }else{
                        $.yangtata.tip({content:result.msg, icon:'error'});
                    }
                });
                return false;
            });
        },
        //发表评论
        publish: function(){
            var s = $.yangtata.comment.settings;
            $(s.pub_btn).live('click', function(){
                if(!$.yangtata.dialog.islogin()) return !1;
                var id = $(s.container).attr('data-id'),
                    dv = $(s.pub_content).attr('def-val'),
                    content = $(s.pub_content).val();
                if(content == dv){
                    $(s.pub_content).focus();
                    return false;
                }
                $.ajax({
                    url: yangtataER.root + '/?m=showitem&a=comment',
                    type: 'POST',
                    data: {
                        id: id,
                        content: content
                    },
                    dataType: 'json',
                    success: function(result){
                        if(result.status == 1){
                            $(s.pub_content).val('');
                            $(s.page_list).prepend(result.data);
                        }else{
                            $.yangtata.tip({content:result.msg, icon:'error'});
                        }
                    }
                });
            });
        }
    };
    $.yangtata.comment.init();
})(jQuery);