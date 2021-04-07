$(function() {
$(".home-nav-item.home-nav-1").hover(function(){
$(this).addClass("home-nav-active");
$(".home-nav-item.home-nav-1 .home-nav-menu").show();
}, function(){
$(this).removeClass("home-nav-active");
$(".home-nav-item.home-nav-1 .home-nav-menu").hide();
});
$(".home-nav-item.home-nav-2").hover(function(){
$(this).addClass("home-nav-active");
$(".home-nav-item.home-nav-2 .home-nav-menu").show();
}, function(){
$(this).removeClass("home-nav-active");
$(".home-nav-item.home-nav-2 .home-nav-menu").hide();
});
$(".home-nav-item.home-nav-3").hover(function(){
$(this).addClass("home-nav-active");
$(".home-nav-item.home-nav-3 .home-nav-menu").show();
}, function(){
$(this).removeClass("home-nav-active");
$(".home-nav-item.home-nav-3 .home-nav-menu").hide();
});
$(".home-nav-item.home-nav-4").hover(function(){
$(this).addClass("home-nav-active");
$(".home-nav-item.home-nav-4 .home-nav-menu").show();
}, function(){
$(this).removeClass("home-nav-active");
$(".home-nav-item.home-nav-4 .home-nav-menu").hide();
});
$(".sitenav-logined").hover(function(){
$(this).addClass("sitenav-active");
}, function(){
$(this).removeClass("sitenav-active");
});
});