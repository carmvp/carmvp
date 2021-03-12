/**
 * @name 商品评论
 * @author andery@foxmail.com
 * @url http://www.cn666.com
 */
;(function($){
    $.cn666.comment = {
        settings: {            
            page_list: '#note_comment_list',
            page_bar: '#J_cmt_page'            
        },
        init: function(options){
            options && $.extend($.cn666.comment.settings, options);
            $.cn666.comment.list();            
        },
        //列表
        list: function(){
            var s = $.cn666.comment.settings;
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
                        $.cn666.tip({content:result.msg, icon:'error'});
                    }
                });
                return false;
            });
        },       
    };
    $.cn666.comment.init();
})(jQuery);