/**
 * @name 商品评论
 * @author andery@foxmail.com
 * @url http://www.yangtata.com
 */
;(function($){
    $.yangtata.comment = {
        settings: {            
            page_list: '#note_comment_list',
            page_bar: '#J_cmt_page'            
        },
        init: function(options){
            options && $.extend($.yangtata.comment.settings, options);
            $.yangtata.comment.list();            
        },
        //列表
        list: function(){
            var s = $.yangtata.comment.settings;
            $('li', $(s.page_list)).on({
                mouseover: function(){
                    $(this).addClass('hover');
                },
                mouseout: function(){
                    $(this).removeClass('hover');
                }
            });
            $(document).on('click', '.pre', $(s.page_bar), function(){
                var url = $(this).attr('href');
                $.getJSON(url, function(result){
                    if(result.status == 1){
						$('body,html').animate({scrollTop:580},2000);
                        $(s.page_list).html(result.data.list);
                        $(s.page_bar).html(result.data.page);						
                    }else{
                        $.yangtata.tip({content:result.msg, icon:'error'});
                    }
                });
                return false;
            });
        }
        
    };
    $.yangtata.comment.init();
})(jQuery);