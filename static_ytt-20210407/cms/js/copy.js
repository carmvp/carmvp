$(function () {
    $("#cnxh .cnxh_nav .left b").hover(function () {
        var data = $(this).attr("data");
        if (data == "1") {
            $("#cnxh .cnxh_nav .left b").eq(0).addClass("cur");
            $("#cnxh .cnxh_nav .left b").eq(1).removeClass("cur");
            $("#cnxh .cnxh_wrap").eq(0).addClass("current");
            $("#cnxh .cnxh_wrap").eq(1).removeClass("current");
        } else {
            $("#cnxh .cnxh_nav .left b").eq(1).addClass("cur");
            $("#cnxh .cnxh_nav .left b").eq(0).removeClass("cur");
            $("#cnxh .cnxh_wrap").eq(1).addClass("current");
            $("#cnxh .cnxh_wrap").eq(0).removeClass("current");
        }
    });

    
	$('#sc a').on('click', function(){
		var sURL = document.location.href;
		var sTitle = document.title;
		try{
			window.external.addFavorite(sURL, sTitle);
		}catch(e){
			try{
				window.sidebar.addPanel(sTitle, sURL, "");
			}catch(e){
				alert("加入收藏失败，请使用Ctrl+D进行添加");
			}
		}
	});
});