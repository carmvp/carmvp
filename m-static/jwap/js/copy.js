$(function() {
    var clipboard, textTipsIndex;
    clipboard = new Clipboard('.J_clipboard', {
        target: function() {
            return document.getElementById('copy-input');
        }
    });
    clipboard.on('success', function() {
        return layer.msg('已复制');
    });
    clipboard.on('error', function() {
        return layer.msg('您的浏览器不支持一键复制，请升级浏览器或更换浏览器');
    });

    textTipsIndex = null;
    $('.good-price .text').mouseenter(function() {
        var html, imgSrc, txt;
        $(this).text('复制');
        txt = $(this).attr('data-text');
        txt = txt.replace(/\n/ig, "<br/>");
        imgSrc = $(this).attr('data-pic');
        html = "<div id='copy-input' style='width: 1px;height: 1px;overflow: hidden'><img style='width: 290px;height: 290px;' src='" + imgSrc + "'><br/>" + txt + "</div>";
        textTipsIndex = layer.tips(txt, this, {
            time: 0,
            area: ['500px']
        });
        $('#copy-input').remove();
        return $('body').append(html);
    });
    $('.good-price .text').mouseleave(function() {
        layer.close(textTipsIndex);
        return $(this).text('文案');
    });
});

$(function() {
    var clipboard = new Clipboard('#copy_span',{
        target:function () {
            return document.getElementById('copy_goods');
        }
    });
    clipboard.on('success', function() {
        return layer.msg('已复制');
    });
    clipboard.on('error', function() {
        return layer.msg('您的浏览器不支持一键复制，请升级浏览器或更换浏览器');
    });
    $('#copy_span').mouseenter(function () {
        $(this).text('确认复制')
    });
    $('#copy_span').mouseleave(function () {
        return $(this).text('一键复制');
    })
});
    //  淘口令
    $(function() {
        var clipboard = new Clipboard('#copy_tkl_coupon',{
            target:function () {
                return document.getElementById('tkl_coupon');
            }
        });
        clipboard.on('success', function() {
            return layer.msg('已复制');
        });
        clipboard.on('error', function() {
            return layer.msg('您的浏览器不支持一键复制，请手动长按上面文字，全选（扩选）按确定复制即可');
        });
        $('#copy_span').mouseenter(function () {
            $(this).text('确认复制')
        });
        $('#copy_span').mouseleave(function () {
            return $(this).text('一键复制');
        })
    });

    $(function() {
        var clipboard = new Clipboard('#copy_tkl_nick',{
            target:function () {
                return document.getElementById('tkl_nick');
            }
        });
        clipboard.on('success', function() {
            return layer.msg('已复制');
        });
        clipboard.on('error', function() {
            return layer.msg('您的浏览器不支持一键复制，请手动长按上面文字，全选（扩选）按确定复制即可');
        });
        $('#copy_span').mouseenter(function () {
            $(this).text('确认复制')
        });
        $('#copy_span').mouseleave(function () {
            return $(this).text('一键复制');
        })
    });


