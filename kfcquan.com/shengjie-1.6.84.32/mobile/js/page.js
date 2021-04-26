

//---------------------------内容详情页面-----------------
myApp.onPageBeforeInit('post-single',function(page){
post_id=page.query['post_id'];

if($('.jinsom-video-playing').length>0){
current_post_id=$('.jinsom-video-playing').attr('post_id');
window['video_'+current_post_id].pause();
}

jinsom_lightbox();//灯箱

// $('.jinsom-single.video .jinsom-video-img').trigger("click");


//音乐模块
play_post_id=$('.jinsom-player-footer-btn .play').attr('post_id');
if(play_post_id==post_id&&!player.paused){//正在播放的文章id和点击查看的文章id是一致，并且播放器是在播放的状态
$('.jinsom-music-voice-'+post_id).html('<i class="jinsom-icon jinsom-yuyin1 tiping"> </i> 播放中...');	
}


$('.jinsom-single-comment>.header li').click(function(){
$(this).addClass('on').siblings('li').removeClass('on');
SetCookie('comment_author',$(this).attr('data'));
dom='.page-on-center .jinsom-single-comment-list';
jinsom_comment_data(1,post_id,$(dom).attr('type'),$(dom).attr('bbs_id'),dom);
})

//记录历史访问
history_single=GetCookie('history_single');
if(history_single){

history_single_arr= new Array();
history_single_arr=history_single.split(",");

if(history_single_arr.includes(post_id)){
history_single_arr.splice($.inArray(post_id,history_single_arr),1);//删除指定的文章id
history_single_arr.push(post_id);
}else{
if(history_single_arr.length>30){
history_single_arr.shift();
}
history_single_arr.push(post_id);
}
SetCookie('history_single',history_single_arr.join(','));
}else{
SetCookie('history_single',post_id);
}


//加载更多评论
comment_loading = false;
comment_page = 2;
post_id=page.query['post_id'];
comment_list=$('.jinsom-single-comment-list-'+post_id);
$('.jinsom-page-single-content-'+post_id+'.infinite-scroll').on('infinite',function(){
if(comment_loading) return;
type=comment_list.attr('type');
bbs_id=comment_list.attr('bbs_id');
comment_loading = true;
comment_list.after(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/comment.php",
data: {page:comment_page,post_id:post_id,type:type,bbs_id:bbs_id},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
comment_loading = true; 
}else{
comment_list.append(msg);
comment_page++;
comment_loading = false;  
} 
jinsom_lightbox();//灯箱
}
});
});//加载更多评论


//点击滑动到评论区域
$('.toolbar a.comment').click(function(){
$('.page-content').animate({scrollTop:$(".jinsom-single-comment-"+post_id).offset().top},500);
});


});




//---------------------------案例页面-----------------
myApp.onPageBeforeInit('case',function(page){
$('.jinsom-home-menu.case li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$(this).parents('.navbar').next().children('.page-on-center').find('ul').eq($(this).index()).show().siblings().hide();
});
});


//---------------------------动态评论-----------------
myApp.onPageAfterAnimation('comment-post',function(page){
post_id=page.query['post_id'];
name=page.query['name'];
//$('#jinsom-comment-content-'+post_id).focus();
if(name!='undefined'){
$('#jinsom-comment-content-'+post_id).val('@'+name+' ');
}

if($('#comment-1').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('comment-1'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_comment(post_id,$('#comment-1').attr('reload'),res.ticket,res.randstr);}
});
}



document.querySelector('#file').addEventListener('change',function(){
var that = this;
var number=that.files.length;
var words_images_max=6;	

if(number>words_images_max||$('#jinsom-publish-images-list li').length>=words_images_max){
layer.open({content:'最多只能上传'+words_images_max+'张图片！',skin:'msg',time:2});
return false;
}

a=0;//计时器
for(i = 0; i< number; i ++) {
$('.jinsom-publish-words-form .add i').hide();//显示加载loading
$('.jinsom-publish-words-form .add span').css('display','inline-block');//显示加载loading
info=that.files[i];
if(info.type!='image/gif'){
lrz(info,{quality:parseFloat(jinsom.comment_img_quality)})
.then(function (rst) {
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/words-base64.php",
data:{base64:rst.base64},
success: function(msg){
img_count=$('#jinsom-publish-images-list li').length;//获取已经上传的图片数量
if(img_count>=words_images_max-1){//如果已经上传了9张
$('.jinsom-publish-words-form .add').hide();//隐藏添加按钮
}
if(img_count<words_images_max){//如果上传的超过了9张就不载入容器
if(msg.code==1){
$('#jinsom-publish-images-list').append('<li><i class="jinsom-icon jinsom-guanbi" onclick="jinsom_remove_image('+words_images_max+',this)"></i><a href="'+msg.file_url+'" data-fancybox="gallery-publish"><img src="'+msg.file_url+'"></a></li>');
jinsom_lightbox();//渲染灯箱
a++;

if(a==number){//如果照片已经上传完成就关闭
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
layer.open({content:msg.msg,skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画	
}

}
});
});

}else{//gif图片上传
if(info.size/(1024*1024)<jinsom.mobile_gif_size_max){
var reader = new FileReader();
reader.onload = function (evt) {
image=evt.target.result;
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/words-base64.php",
data:{base64:image},
success: function(msg){
img_count=$('#jinsom-publish-images-list li').length;//获取已经上传的图片数量
if(img_count>=words_images_max-1){//如果已经上传了9张
$('.jinsom-publish-words-form .add').hide();//隐藏添加按钮
}
if(img_count<words_images_max){//如果上传的超过了9张就不载入容器
if(msg.code==1){
$('#jinsom-publish-images-list').append('<li><i class="jinsom-icon jinsom-guanbi" onclick="jinsom_remove_image('+words_images_max+',this)"></i><a href="'+msg.file_url+'" data-fancybox="gallery-publish"><img src="'+msg.file_url+'"></a></li>');
jinsom_lightbox();//渲染灯箱
a++;

if(a==number){//如果照片已经上传完成就关闭
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
layer.open({content:msg.msg,skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画	
}

}
});


}
reader.readAsDataURL(info);
}else{
layer.open({content:'上传的动图不能超过'+jinsom.mobile_gif_size_max+'MB！',skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}



}

}
});

//图片拖动排序
var el = document.getElementById('jinsom-publish-images-list');
var sortable = Sortable.create(el);


jinsom_comment_aite_user_js();//评论@好友


});



//--------------------------- 一级回帖-----------------
myApp.onPageAfterAnimation('comment-bbs-post',function(page){
post_id=page.query['post_id'];
bbs_id=page.query['bbs_id'];

if($('#comment-2').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('comment-2'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_bbs_comment(post_id,bbs_id,res.ticket,res.randstr);}
});
}


document.querySelector('#file').addEventListener('change',function(){
var that = this;
var number=that.files.length;
var words_images_max=6;	

if(number>words_images_max||$('#jinsom-publish-images-list li').length>=words_images_max){
layer.open({content:'最多只能上传'+words_images_max+'张图片！',skin:'msg',time:2});
return false;
}

a=0;//计时器
for(i = 0; i< number; i ++) {
$('.jinsom-publish-words-form .add i').hide();//显示加载loading
$('.jinsom-publish-words-form .add span').css('display','inline-block');//显示加载loading
info=that.files[i];
if(info.type!='image/gif'){
lrz(info,{quality:parseFloat(jinsom.comment_img_quality)})
.then(function (rst) {
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/words-base64.php",
data:{base64:rst.base64},
success: function(msg){
img_count=$('#jinsom-publish-images-list li').length;//获取已经上传的图片数量
if(img_count>=words_images_max-1){//如果已经上传了9张
$('.jinsom-publish-words-form .add').hide();//隐藏添加按钮
}
if(img_count<words_images_max){//如果上传的超过了9张就不载入容器
if(msg.code==1){
$('#jinsom-publish-images-list').append('<li><i class="jinsom-icon jinsom-guanbi" onclick="jinsom_remove_image('+words_images_max+',this)"></i><a href="'+msg.file_url+'" data-fancybox="gallery-publish"><img src="'+msg.file_url+'"></a></li>');
jinsom_lightbox();//渲染灯箱
a++;

if(a==number){//如果照片已经上传完成就关闭
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
layer.open({content:msg.msg,skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画	
}

}
});
});

}else{//gif图片上传
if(info.size/(1024*1024)<jinsom.mobile_gif_size_max){
var reader = new FileReader();
reader.onload = function (evt) {
image=evt.target.result;
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/words-base64.php",
data:{base64:image},
success: function(msg){
img_count=$('#jinsom-publish-images-list li').length;//获取已经上传的图片数量
if(img_count>=words_images_max-1){//如果已经上传了9张
$('.jinsom-publish-words-form .add').hide();//隐藏添加按钮
}
if(img_count<words_images_max){//如果上传的超过了9张就不载入容器
if(msg.code==1){
$('#jinsom-publish-images-list').append('<li><i class="jinsom-icon jinsom-guanbi" onclick="jinsom_remove_image('+words_images_max+',this)"></i><a href="'+msg.file_url+'" data-fancybox="gallery-publish"><img src="'+msg.file_url+'"></a></li>');
jinsom_lightbox();//渲染灯箱
a++;

if(a==number){//如果照片已经上传完成就关闭
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
layer.open({content:msg.msg,skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画	
}

}
});


}
reader.readAsDataURL(info);
}else{
layer.open({content:'上传的动图不能超过'+jinsom.mobile_gif_size_max+'MB！',skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}



}

}
});

//图片拖动排序
var el = document.getElementById('jinsom-publish-images-list');
var sortable = Sortable.create(el);

jinsom_comment_aite_user_js();//评论@好友


});

//--------------------------- 二级回帖-----------------
myApp.onPageAfterAnimation('comment-bbs-post-floor',function(page){
post_id=page.query['post_id'];
bbs_id=page.query['bbs_id'];
comment_id=page.query['comment_id'];
name=page.query['name'];
//$('#jinsom-comment-content-'+post_id).focus();
if(name!='undefined'){
$('#jinsom-comment-content-'+post_id).val('@'+name+' ');
}

if($('#comment-3').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('comment-3'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_bbs_comment_floor(comment_id,post_id,bbs_id,res.ticket,res.randstr);}
});
}



jinsom_comment_aite_user_js();//评论@好友


});


//---------------------------搜索页面-----------------
myApp.onPageBeforeInit('search-mobile',function(page){
search_keywords=page.query['search_keywords'];
if(search_keywords){
jinsom_search(search_keywords);	
}
$('#jinsom-search').focus();
$('#jinsom-search-form').submit(function (event) {
//动作：阻止表单的默认行为
event.preventDefault();
value=$('#jinsom-search').val();
jinsom_search(value);
})
});



//---------------------------论坛大厅-----------------
myApp.onPageBeforeInit('bbs-show',function(page){
$('#jinsom-bbs-slider').owlCarousel({
items: 1,
margin:15,
autoplay:true,
autoplayTimeout:5000,
loop: true,
});

$('.jinsom-bbs-tab-post-header>li').click(function(event){
$(this).addClass('on').siblings().removeClass('on').parent().next().children().eq($(this).index()).show().siblings().hide();
});
});

//---------------------------话题中心-----------------
myApp.onPageBeforeInit('topic-show',function(page){
navbar_height=parseInt($('.navbar').height());
w_height=parseInt($(window).height());
$('.jinsom-topic-show-form').height(w_height-navbar_height);
$('.jinsom-topic-show-form .left>li').click(function(event){
$(this).addClass('on').siblings().removeClass('on').parent().next().children().eq($(this).index()).show().siblings().hide();
});
});


//--------------------------sns默认页面-----------------
myApp.onPageBeforeInit('sns',function(page){
$('#jinsom-sns-slider').owlCarousel({
items: 1,
margin:15,
autoplay:true,
autoplayTimeout:5000,
loop: true,
});
jinsom_index_sns_js_load();
});


//--------------------------实时动态-----------------
myApp.onPageBeforeInit('now',function(page){
//加载更多
now_loading = false;
now_page=2;
now_list=$('.jinsom-now-content .jinsom-chat-user-list');
$('.jinsom-now-content.infinite-scroll').on('infinite',function(){
if (now_loading) return;
now_loading = true;
now_list.append(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/now.php",
data: {page:now_page},
success: function(msg){
if(msg!=0){
now_list.append(msg);
now_loading = false; 
now_page++;
}else{
now_loading = true; 
}
$('.jinsom-load-post').remove();
}
});
}); 


});



//---------------------------提现-----------------
myApp.onPageBeforeInit('cash',function(page){
$('.jinsom-cash-form-content .type>m').click(function(){
$(this).addClass('on').siblings().removeClass('on');
if($(this).attr('type')=='alipay'){
$('.jinsom-cash-form-content .alipay-phone').show();
$('.jinsom-cash-form-content .wechat-phone').hide();
}else{
$('.jinsom-cash-form-content .alipay-phone').hide();
$('.jinsom-cash-form-content .wechat-phone').show();	
}
});
$("#jinsom-cash-number").bind("input propertychange",function(){
number=Math.floor($(this).val()/$(this).attr('data'));
$('.jinsom-cash-form-content .number n').text(number+'元');
});
});


//签到
myApp.onPageBeforeInit('sign', function (page) {
if($('#sign-1').length>0&&!jinsom.is_admin){
if(jinsom.is_login){
new TencentCaptcha(document.getElementById('sign-1'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_sign(document.getElementById('sign-1'),res.ticket,res.randstr);}
});
}else{
$('#sign-1').click(function(){
myApp.loginScreen();
});
}
}

var hadsign = new Array(); //已签到的数组
hadsign[0] = "765189111";
sign_str=$('#jinsom-sign-data-hide').text();
if(sign_str){
sign_arr=new Array();
sign_arr=sign_str.split(",");
for(i=0;i<sign_arr.length;i++){
hadsign[i+1]=sign_arr[i];
}
}

var cale = new Calendar("jinsom-sign-body", {
qdDay: hadsign,
});

});


//简单注册
myApp.onPageBeforeInit('reg-simple', function (page) {
if($('#reg-2').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('reg-2'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_pop_reg_simple(res.ticket,res.randstr);}
});
}
});


//邮件注册
myApp.onPageBeforeInit('reg-email', function (page) {
if($('#code-2').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('code-2'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_get_code(120,'email',res.ticket,res.randstr);}
});
}
if($('#reg-2').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('reg-2'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_pop_reg_mail(res.ticket,res.randstr);}
});
}
});


//手机号注册
myApp.onPageBeforeInit('reg-phone', function (page) {
if($('#code-1').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('code-1'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_get_code(120,'phone',res.ticket,res.randstr);}
});
}
if($('#reg-1').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('reg-1'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_pop_reg_phone(res.ticket,res.randstr);}
});
}
});

//邀请注册
myApp.onPageBeforeInit('reg-invite', function (page) {
if($('#reg-3').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('reg-3'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_pop_reg_invite(res.ticket,res.randstr);}
});
}
});

//忘记密码-手机号
myApp.onPageBeforeInit('forget-password-phone', function (page){
if($('#code-8').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('code-8'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_get_code(120,'pass-phone',res.ticket,res.randstr);}
});
}
});

//忘记密码-邮箱
myApp.onPageBeforeInit('forget-password-email', function (page){
if($('#code-9').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('code-9'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_get_code(120,'pass-email',res.ticket,res.randstr);}
});
}
});

//手机号登录
myApp.onPageBeforeInit('login-phone', function (page) {
if($('#code-5').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('code-5'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_get_code(120,'phone-login',res.ticket,res.randstr);}
});
}
if($('#reg-5').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('reg-5'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_login_phone(res.ticket,res.randstr);}
});
}
});



//发布红包
myApp.onPageBeforeInit('publish-redbag', function (page) {
$('.jinsom-publish-redbag-form .type li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$('.jinsom-publish-redbag-form .tips').html($(this).attr('title'));
});

$('.jinsom-publish-redbag-form .img-list li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
});
});

//幸运抽奖
myApp.onPageBeforeInit('luck-draw', function (page) {
$('.jinsom-luck-draw-list li').click(function(){//列表tab切换
$(this).addClass('on').siblings().removeClass('on');
$(this).parent().next().children().eq($(this).index()).show().siblings().hide();
});
});


//消息
myApp.onPageBeforeInit('notice', function (page){
$('.jinsom-mine-box li.notice .item-after,.jinsom-mine-box.cell li.notice i,.toolbar .mine i').empty();//移除红点
jinsom_index_notice_js_load();

//下拉刷新
var ptrContent = $('.jinsom-notice-page-content.pull-to-refresh-content');
ptrContent.on('refresh', function (e) {
if($('.jinsom-load-post').length>0){//防止多次下拉
return false;	
}
$('.jinsom-chat').prepend(jinsom.loading_post);
myApp.pullToRefreshDone();
// //下拉刷新完成
setTimeout(function (){
jinsom_index_notice_js_load();
$('.jinsom-chat-tab a').first().addClass('active').siblings().removeClass('active');
layer.open({content:'刷新成功',skin:'msg',time:2});
}, 800);

});
});

//---------------------------内页视频专题-----------------
myApp.onPageBeforeInit('video-special',function(page){
jinsom_index_video_special_js_load('#jinsom-page-video-special');//视频专题需要加载的js
});

//---------------------------上传头像页面-----------------
myApp.onPageBeforeInit('upload-avatar',function(page){
var avatar = new Mavatar({el: '#jinsom-avatar-demo',backgroundColor:'#fff',width:'250px',height:'250px', fileOnchange: function (e) {
}});
margintop=($('body').width()-250)/2;
$('#jinsom-avatar-demo').css('margin-top',margintop+'px');
$('#jinsom-clip-avatar').click(function(event) {
myApp.showIndicator();
avatar.imageClipper(function (data) {
$.ajax({
type:"POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/avatar-base64.php",
data:{base64:data,user_id:page.query['user_id']},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
$('.jinsom-setting-box .avatarimg img.avatar').attr('src',msg.file_url);
if(msg.self){//如果是自己操作
$('.jinsom-mine-user-info img.avatar,.jinsom-setting-box .avatarimg img.avatar,.jinsom-home-navbar img.avatar').attr('src',msg.file_url);
}
history.back(-1);//返回上一页
}else if(msg.code==3){//打开开通会员页面
layer.open({content:msg.msg,skin:'msg',time:2});
function c(){myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/recharge-vip.php'});}setTimeout(c,1500);
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
avatar.resetImage();
}
}
});	
})
});


// function reset() {
// avatar.resetImage();
// }
// //获取上传前信息
// function getInfo() {
// var fileInfo = avatar.getfileInfo();
// console.log(fileInfo);
// }
// //获取base64
// function getdata() {
// var urldata = avatar.getDataUrl();
// console.log(urldata);
// }

});

//---------------------------设置页面-----------------
myApp.onPageInit('setting', function (page) {
$('.jinsom-setting-box li.vip-time').change(function(event) {//设置VIP到期时间
vip_time=$(this).children('input').val();
author_id=$('.jinsom-setting-content').attr('data');
this_dom=$(this);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/profile-admin.php",
data:{value:vip_time,author_id:author_id,type:'vip_time'},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
this_dom.find('.value').html(vip_time);
}
}
});

});

$('.jinsom-setting-box li.blacklist').change(function(event) {//设置黑名单
blacklist=$(this).children('input').val();
author_id=$('.jinsom-setting-content').attr('data');
this_dom=$(this);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/profile-admin.php",
data:{value:blacklist,author_id:author_id,type:'blacklist_time'},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
this_dom.find('.value').html(blacklist);
}
}
});

});


$('.jinsom-setting-box li.verify select').change(function(event){//设置认证类型
verify=$(this).val();
verify_text=$(this).children('option:selected').attr('data');
author_id=$('.jinsom-setting-content').attr('data');
this_dom=$(this);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/profile-admin.php",
data:{value:verify,author_id:author_id,type:'verify'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
this_dom.siblings('.value').html(verify_text);
}
}
});
});

$('.jinsom-setting-box li.user_power select').change(function(event){//设置用户组
user_power=$(this).val();
author_id=$('.jinsom-setting-content').attr('data');
this_dom=$(this);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/profile-admin.php",
data:{value:user_power,author_id:author_id,type:'user_power'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
if(user_power==1){
this_dom.siblings('.value').html('正常用户');
}else if(user_power==2){
this_dom.siblings('.value').html('网站管理');
}else if(user_power==3){
this_dom.siblings('.value').html('巡查员');
}else if(user_power==4){
this_dom.siblings('.value').html('风险账户');
}else if(user_power==5){
this_dom.siblings('.value').html('审核员');
}
}
}
});
});

});
//---------------------------更多设置页面-----------------
myApp.onPageInit('setting-more', function (page) {

//下拉选择器
$('.jinsom-setting-box li.select select').change(function(event) {
value=$(this).val();
author_id=$('.jinsom-setting-content').attr('data');
this_dom=$(this);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/profile.php",
data:{value:value,author_id:author_id,type:this_dom.parents('li').attr('data')},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
this_dom.siblings('.value').html(this_dom.children('option:selected').text());
}
}
});
});


//设置生日
$('.jinsom-setting-box li.birthday').change(function(event) {
birthday=$(this).children('input').val();
author_id=$('.jinsom-setting-content').attr('data');
this_dom=$(this);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/profile.php",
data:{value:birthday,author_id:author_id,type:'birthday'},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
this_dom.find('.value').html(birthday);
}
}
});
});

});


//---------------------------更多设置页面-----------------
myApp.onPageInit('setting-email-notice', function (page) {

//下拉选择器
$('.jinsom-setting-box li.select select').change(function(event) {
value=$(this).val();
author_id=$('.jinsom-setting-content').attr('data');
this_dom=$(this);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/profile.php",
data:{value:value,author_id:author_id,type:this_dom.parents('li').attr('data')},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
this_dom.siblings('.value').html(this_dom.children('option:selected').text());
}
}
});
});


});


//---------------------------更多个人说明页面-----------------
myApp.onPageAfterAnimation('setting-desc', function (page) {
t=$('#jinsom-setting-desc').val(); 
$('#jinsom-setting-desc').val("").focus().val(t); 
});

//---------------------------更多头衔设置页面-----------------
myApp.onPageAfterAnimation('setting-honor', function (page) {
$('.jinsom-user_honor-select-form .list li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
});

});


//---------------------------设置-修改手机号-----------------
myApp.onPageAfterAnimation('setting-phone', function (page) {
if($('#code-3').length>0){
new TencentCaptcha(document.getElementById('code-3'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_get_code(120,'phone',res.ticket,res.randstr);}
});
}
});

//---------------------------设置-修改邮箱号-----------------
myApp.onPageAfterAnimation('setting-email', function (page) {
if($('#code-4').length>0){
new TencentCaptcha(document.getElementById('code-4'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_get_code(120,'email',res.ticket,res.randstr);}
});
}

});



//--------------------论坛页面-------
myApp.onPageInit('bbs',function(page){
//$('[data-page=bbs] .navbar').removeClass('color');//移除color
bbs_id=page.query.bbs_id;


//渲染瀑布流
if($('.jinsom-bbs-post-list-3').length>0){
waterfull_margin=$('#jinsom-waterfull-margin').height();
var grid=$('.jinsom-bbs-post-list-3').masonry({
itemSelector:'.grid',
gutter:waterfull_margin,
transitionDuration:0
});
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
});   
} 


//滚动事件
$('.jinsom-bbs-content').scroll(function(){
scrollTop =$(this).scrollTop();//滚动高度

if(scrollTop>50){
$('[data-page=bbs] .navbar-inner.navbar-on-center').addClass('color');
}else{
$('[data-page=bbs] .navbar-inner.navbar-on-center').removeClass('color');
};

});

bbs_loading = false;
bbs_page=2;


//bbs_post_list=$('.page-on-center .jinsom-bbs-post-list');
bbs_post_list=$('[data-page="bbs"] .jinsom-bbs-post-list');
$('.jinsom-bbs-content.infinite-scroll').on('infinite',function(){
if (bbs_loading) return;
bbs_loading = true;
bbs_post_list.after(jinsom.loading_post);
type=$('.jinsom-bbs-menu-'+bbs_id+' li.on').attr('type');
topic=$('.jinsom-bbs-menu-'+bbs_id+' li.on').attr('topic');
if(type==''||type==undefined){type='new';}

$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/bbs.php",
data: {page:bbs_page,bbs_id:bbs_id,type:type,topic:topic},
success: function(msg){
if(msg!=0){
bbs_post_list.append(msg);

if(bbs_post_list.hasClass('jinsom-bbs-post-list-3')){//瀑布流
grid.masonry('reloadItems');  
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
});
}

bbs_loading = false; 
bbs_page++;
}else{
// layer.open({content:'没有更多内容！',skin:'msg',time:2});
bbs_loading = true; 
}
$('.jinsom-load-post').remove();
}
});


}); //滚动事件



}); 

//---------------------------话题页面-----------------
myApp.onPageBeforeInit('topic',function(page){
topic_id=page.query.topic_id;


jinsom_lightbox();

//滚动事件
$('.jinsom-topic-content').scroll(function(){
navbarH=$('.navbar').height();
viewH =Math.round($(this).height()),//可见高度
contentH =$(this).get(0).scrollHeight,//内容高度
scrollTop =$(this).scrollTop();//滚动高度

if(scrollTop>30){
$('[data-page=topic] .navbar-inner.navbar-on-center').addClass('color');
}else{
$('[data-page=topic] .navbar-inner.navbar-on-center').removeClass('color');
};


if(contentH - viewH - scrollTop-navbarH <20){ //到达底部时,加载新内容
if($('.jinsom-topic-content .jinsom-loading').length==0&&$('.jinsom-topic-content .jinsom-empty-page').length==0){
more_list=$('.jinsom-topic-post-list');
page=parseInt(more_list.attr('page'));
more_list.after(jinsom.loading);
type=more_list.attr('type');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/topic.php",
data: {page:page,topic_id:topic_id,type:type},
success: function(msg){
if(msg!=0){
more_list.append(msg);
page=page+1;
more_list.attr('page',page);
}else{
more_list.append('<div class="jinsom-empty-page">没有更多内容</div>'); 
}
$('.jinsom-load').remove();
}
});


}
}

});



});

//--------------------------大转盘页面-----------------
myApp.onPageBeforeInit('lottery',function(page){
$('.jinsom-lottery-money span.add').click(function(){
number=$('#jinsom-lottery-money').val();
if(number){
number=parseInt(number);
}else{
number=0;
}
add_number=parseInt($(this).attr('data'));
$('#jinsom-lottery-money').val(number+add_number);
});
});


//---------------------------个人主页-自己-----------------
myApp.onPageBeforeInit('member-mine',function(page){
// $('[data-page=member-mine] .navbar').removeClass('color');//移除color
jinsom_lightbox();
});


myApp.onPageAfterAnimation('member-mine', function (page){
author_id=page.query.author_id;

//加载更多
mine_loading=false;
var mine_page;
if(!mine_page){
mine_page=2;
}

$('.page-on-center #jinsom-member-mine-page').on('infinite',function(){
if(mine_loading) return;
mine_post_list=$('.page-on-center .jinsom-member-mine-post-list');
mine_loading = true;
mine_post_list.after(jinsom.loading_post);
type=$('.page-on-center .jinsom-member-menu li.on').attr('type');
data=$('.page-on-center .jinsom-member-menu li.on').attr('data');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/data.php",
data: {page:mine_page,type:type,load_type:'more',data:data,author_id:author_id},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
mine_loading = true; 
}else{
mine_post_list.append(msg);
jinsom_lightbox()
mine_page++;
mine_loading = false;  
} 
}
});
}); 


$('.page-on-center #jinsom-member-mine-page').scroll(function(){
scrollTop=$(this).scrollTop();//滚动高度
if(scrollTop>200){
$('[data-page=member-mine] .navbar-inner.navbar-on-center').addClass('color');
}else{
$('[data-page=member-mine] .navbar-inner.navbar-on-center').removeClass('color');
};
});


//查看自己头像
$('.jinsom-member-header .avatarimg').on('click',function(){
avatar_url=$(this).children('img').attr('src');
show_avatar = myApp.photoBrowser({
photos : [avatar_url],
theme:'dark',
toolbar:false,
type:'popup',
});
show_avatar.open();
});

}); 

//---------------------------个人主页-别人-----------------

myApp.onPageBeforeInit('member-other',function(page){
// $('[data-page=member-other] .navbar').removeClass('color');//移除color
jinsom_lightbox();
});

myApp.onPageAfterAnimation('member-other', function (page) {
author_id=page.query.author_id;

//加载更多
other_loading=false;
var other_page;
if(!other_page){
other_page=2;	
}


$('.page-on-center #jinsom-member-other-page').on('infinite',function(){
if(other_loading) return;
other_post_list=$('.page-on-center .jinsom-member-other-post-list');
other_loading = true;
other_post_list.after(jinsom.loading_post);
type=$('.page-on-center .jinsom-member-menu li.on').attr('type');
data=$('.page-on-center .jinsom-member-menu li.on').attr('data');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/data.php",
data: {page:other_page,type:type,load_type:'more',data:data,author_id:author_id},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
other_loading = true; 
}else{
other_post_list.append(msg);
jinsom_lightbox()
other_page++;
other_loading = false;  
} 
}
});
}); 

//滚动事件
$('.page-on-center #jinsom-member-other-page').scroll(function(){
scrollTop =$(this).scrollTop();//滚动高度
if(scrollTop>200){
$('[data-page=member-other] .navbar-inner.navbar-on-center').addClass('color');
}else{
$('[data-page=member-other] .navbar-inner.navbar-on-center').removeClass('color');
};
});


//查看他人头像
$('.jinsom-member-header .avatarimg').on('click',function(){
avatar_url=$(this).children('img').attr('src');
show_avatar = myApp.photoBrowser({
photos : [avatar_url],
theme:'dark',
toolbar:false,
type:'popup',
});
show_avatar.open();
});


}); 




//===========================消息页面================================

//消息页面下拉刷新
var ptrContent = $('#jinsom-view-notice .pull-to-refresh-content');
ptrContent.on('refresh', function (e) {
setTimeout(function (){//显示刷新成功
$('#jinsom-view-notice .preloader').hide();
$('#jinsom-view-notice .jinsom-refresh-success').show();
}, 800);

//下拉刷新完成
setTimeout(function (){
myApp.pullToRefreshDone();
$('#jinsom-view-notice .preloader').show();
$('#jinsom-view-notice .jinsom-refresh-success').hide();


}, 1600);

});


//---------------------------单对单聊天-----------------
myApp.onPageBeforeInit('chat-one',function(page){
author_id=page.query.author_id;
jinsom_lightbox();
$('#jinsom-chat-user-'+author_id+' .tips').remove();//消灭提示
$('.jinsom-chat-list-content').scrollTop($('.jinsom-chat-list-content')[0].scrollHeight);


jinsom_ajax_get_messages(author_id);//长轮询

//图片加载完成
$(".jinsom-chat-message-list-content img").on('load',function(){
$('.jinsom-chat-list-content').scrollTop($('.jinsom-chat-list-content')[0].scrollHeight);
});


//点击内容 撤回菜单
// $('.jinsom-chat-message-list-content').on('click',function(){
// myApp.popover('.jinsom-chat-tap-popover',this);
// });

$('.jinsom-chat-list-content').scroll(function(){
navbarH=$('.navbar').height();
viewH =Math.round($(this).height()),//可见高度
contentH =$(this).get(0).scrollHeight,//内容高度
scrollTop =$(this).scrollTop();//滚动高度
if(contentH - viewH - scrollTop-navbarH*2 >200){ //到达底部时,加载新内容
$('.jinsom-msg-tips').show();
}else{
$('.jinsom-msg-tips').hide().html('底部');	
}
});


document.querySelector('#im-file').addEventListener('change',function(){
myApp.showPreloader('上传中...');
data=new FormData($("#jinsom-im-upload-form")[0]);
$.ajax({
type: "POST",
dataType:'json',
contentType: false,
processData: false, 
url:jinsom.jinsom_ajax_url+"/upload/im-one.php",
data:data,
success: function(msg){
myApp.hidePreloader();
$('#im-file').val('');
if(msg.code==1){
$('.jinsom-chat-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info avatarimg-'+jinsom.user_id+'">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content"><a href="'+msg.file_url+'" data-fancybox="gallery"><img src="'+msg.file_url+'"></a></div></li>');
$('.jinsom-chat-list-content').scrollTop($('.jinsom-chat-list-content')[0].scrollHeight);
$(".jinsom-chat-message-list-content img").on('load',function(){
$('.jinsom-chat-list-content').scrollTop($('.jinsom-chat-list-content')[0].scrollHeight);
});
}else{
layer.open({content:msg.msg,skin:'msg',time:2});	
}
}
});
});


});

//关闭聊天
myApp.onPageBack('chat-one', function (page){//返回
jinsom_stop_user_Ajax();//关闭长轮询   
})



//---------------------群聊-------
myApp.onPageBeforeInit('chat-group',function(page){
bbs_id=page.query.bbs_id;
jinsom_lightbox();
$('.jinsom-chat-group-list-content').scrollTop($('.jinsom-chat-group-list-content')[0].scrollHeight);

jinsom_ajax_get_messages_group(bbs_id);//长轮询

//图片加载完成
$('.jinsom-chat-message-list-content img').on('load',function(){
$('.jinsom-chat-group-list-content').scrollTop($('.jinsom-chat-group-list-content')[0].scrollHeight);
});

//点击内容 撤回菜单
// $('.jinsom-chat-message-list-content').on('click',function(){
// myApp.popover('.jinsom-chat-tap-popover',this);
// });


$('.jinsom-chat-group-list-content').scroll(function(){
navbarH=$('.navbar').height();
viewH =Math.round($(this).height()),//可见高度
contentH =$(this).get(0).scrollHeight,//内容高度
scrollTop =$(this).scrollTop();//滚动高度
console.log(navbarH);
if(contentH - viewH - scrollTop-navbarH*2 >200){ //到达底部时,加载新内容
$('.jinsom-msg-tips').show();
}else{
$('.jinsom-msg-tips').hide().html('底部');	
}
});


document.querySelector('#im-file').addEventListener('change',function(){
myApp.showPreloader('上传中...');
data=new FormData($("#jinsom-im-upload-form")[0]);
$.ajax({
type: "POST",
dataType:'json',
contentType: false,
processData: false, 
url:jinsom.jinsom_ajax_url+"/upload/im-group.php",
data:data,
success: function(msg){
myApp.hidePreloader();
$('#im-file').val('');
if(msg.code==1){
$('.jinsom-chat-group-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info avatarimg-'+jinsom.user_id+'">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content"><a href="'+msg.file_url+'" data-fancybox="gallery"><img src="'+msg.file_url+'"></a></div></li>');
$('.jinsom-chat-group-list-content').scrollTop($('.jinsom-chat-group-list-content')[0].scrollHeight);
$(".jinsom-chat-message-list-content img").on('load',function(){
$('.jinsom-chat-group-list-content').scrollTop($('.jinsom-chat-group-list-content')[0].scrollHeight);
});
}else{
layer.open({content:msg.msg,skin:'msg',time:2});	
}
}
});
});

});


//关闭群聊
myApp.onPageBack('chat-group', function (page){//返回
jinsom_stop_group_Ajax();//关闭长轮询   
})





//---------------------------发布动态页面-----------------
myApp.onPageBeforeInit('publish',function(page){
type=page.query.type;

if(type=='words'){
if($('#publish-'+type).length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('publish-'+type),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_publish_words(res.ticket,res.randstr);}
});
}
}else if(type=='music'){
if($('#publish-'+type).length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('publish-'+type),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_publish_music_video('music',res.ticket,res.randstr);}
});
}
}else if(type=='video'){
if($('#publish-'+type).length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('publish-'+type),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_publish_music_video('video',res.ticket,res.randstr);}
});
}
}else if(type=='single'){
if($('#publish-'+type).length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('publish-'+type),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_publish_single(res.ticket,res.randstr);}
});
}	
}else if(type=='secret'){
if($('#publish-'+type).length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('publish-'+type),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_publish_secret(res.ticket,res.randstr);}
});
}	
}else if(type=='bbs'){//帖子类型||发布帖子||发表帖子
if($('#publish-bbs').length>0&&!jinsom.is_admin){
new TencentCaptcha(document.getElementById('publish-bbs'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_publish_bbs(res.ticket,res.randstr);}
});
}

if($('.jinsom-publish-words-form .download-box').length>0){
$(".jinsom-bbs-download-add").click(function(){
add=$('.download-box .li').html();
$(this).before('<div class="li"><i class="jinsom-icon jinsom-guanbi"></i>'+add+'</div>');
}); 
$('.jinsom-publish-words-form .download-box').on('click','.li>i',function(){
$(this).parent().remove();
});
}

//选择子分类
$('.jinsom-publish-select-cat .select-content li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$('input[name="bbs_child_id"]').val($(this).attr('data'));
});

$('.jinsom-publish-power-list').children('li').eq(0).addClass('on');
type=$('.jinsom-publish-power-list').children('li').eq(0).attr('type');
$('input[name="post-type"]').val(type);

if(type=='pay_see'){
$('.power-content .price').show();
}
if(type=='answer'){
$('.power-content .answer-price').show();
}
if(type=='pay_see'||type=='vip_see'||type=='login_see'||type=='comment_see'){
$('.power-content textarea').show();
}

$("body").on("click",'.jinsom-publish-power-list li', function(e){
$('.jinsom-publish-power-list-form li').eq($(this).index()).addClass('on').siblings().removeClass('on');
type=$(this).attr('type');
$('input[name="post-type"]').val(type);

if(type=='pay_see'){
$('.power-content .price').show();
}
if(type=='answer'){
$('.power-content textarea').hide();
$('.power-content .price').hide();
$('.power-content .answer-price').show();
}
if(type=='pay_see'||type=='vip_see'||type=='login_see'||type=='comment_see'){
$('.power-content textarea').show();
$('.power-content .answer-price').hide();
if(type!='pay_see'){
$('.power-content .price').hide();	
}
}
if(type=='activity'||type=='vote'||type=='normal'){
$('.power-content .price,.power-content .answer-price,.power-content textarea').hide();
}
layer.closeAll();
});

}


if(type!='bbs'&&type!='secret'){//不是帖子
$("body").on("click",'.jinsom-publish-power-list li', function(e){
$('.jinsom-publish-power-list-form li').eq($(this).index()).addClass('on').siblings().removeClass('on');
type=$(this).attr('type');
$('#jinsom-pop-power').val($(this).attr('data'));


if(type=='pay'||type=='password'||type=='vip'||type=='login'||type=='comment'||type=='verify'||type=='follow'){
$('.power-content textarea,.power-content label,.power-content .img-power').show();

if(type=='pay'){
$('.power-content .price').show();
$('.power-content .password').hide();
}
if(type=='password'){
$('.power-content .password').show();
$('.power-content .price').hide();
}
if(type=='vip'||type=='login'){
$('.power-content .price,.power-content .password').hide();
}
}else if(type=='open'||type=='private'){
$('.power-content .price,.power-content .password,.power-content textarea,.power-content label,.power-content .img-power').hide();
}
layer.closeAll();
});
}



if(type!='video'&&type!='music'&&type!='secret'){
document.querySelector('#file').addEventListener('change', function () {
var that = this;
var number=that.files.length;

if(type=='words'){
var words_images_max=jinsom.words_images_max;//最大上传数量
}else{
var words_images_max=40;	
}

if(number>words_images_max||$('#jinsom-publish-images-list li').length>=words_images_max){
layer.open({content:'最多只能上传'+words_images_max+'张图片！',skin:'msg',time:2});
return false;
}

a=0;//计时器
for(i = 0; i< number; i ++) {
$('.jinsom-publish-words-form .add i').hide();//显示加载loading
$('.jinsom-publish-words-form .add span').css('display','inline-block');//显示加载loading
info=that.files[i];
if(info.type!='image/gif'){
lrz(info,{quality:parseFloat(jinsom.publish_img_quality)})
.then(function (rst) {
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/words-base64.php",
data:{base64:rst.base64},
success: function(msg){
img_count=$('#jinsom-publish-images-list li').length;//获取已经上传的图片数量
if(img_count>=words_images_max-1){//如果已经上传了9张
$('.jinsom-publish-words-form .add').hide();//隐藏添加按钮
}
if(img_count<words_images_max){//如果上传的超过了9张就不载入容器
if(msg.code==1){
$('#jinsom-publish-images-list').append('<li><i class="jinsom-icon jinsom-guanbi" onclick="jinsom_remove_image('+words_images_max+',this)"></i><a href="'+msg.file_url+'" data-fancybox="gallery-publish"><img src="'+msg.file_url+'"></a></li>');
jinsom_lightbox();//渲染灯箱
a++;

if(a==number){//如果照片已经上传完成就关闭
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
layer.open({content:msg.msg,skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画	
}

}
});
});

}else{//gif图片上传
if(info.size/(1024*1024)<jinsom.mobile_gif_size_max){
var reader = new FileReader();
reader.onload = function (evt) {
image=evt.target.result;
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/words-base64.php",
data:{base64:image},
success: function(msg){
img_count=$('#jinsom-publish-images-list li').length;//获取已经上传的图片数量
if(img_count>=words_images_max-1){//如果已经上传了9张
$('.jinsom-publish-words-form .add').hide();//隐藏添加按钮
}
if(img_count<words_images_max){//如果上传的超过了9张就不载入容器
if(msg.code==1){
$('#jinsom-publish-images-list').append('<li><i class="jinsom-icon jinsom-guanbi" onclick="jinsom_remove_image('+words_images_max+',this)"></i><a href="'+msg.file_url+'" data-fancybox="gallery-publish"><img src="'+msg.file_url+'"></a></li>');
jinsom_lightbox();//渲染灯箱
a++;

if(a==number){//如果照片已经上传完成就关闭
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
layer.open({content:msg.msg,skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}

}else{
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画	
}

}
});


}
reader.readAsDataURL(info);
}else{
layer.open({content:'上传的动图不能超过'+jinsom.mobile_gif_size_max+'MB！',skin:'msg',time:2});
$('#file').val('');//清空已选状态
$('.jinsom-publish-words-form .add i').show();//关闭loading动画
$('.jinsom-publish-words-form .add span').hide();	//关闭loading动画
}



}

}
});

//图片拖动排序
var el = document.getElementById('jinsom-publish-images-list');
var sortable = Sortable.create(el);

}//图片上传结束




if(type=='video'){
document.querySelector('#jinsom-upload-video').addEventListener('change', function () {

//判断后缀
var location=$(this).val();
var point=location.lastIndexOf(".");
type=location.substr(point+1);
if(jinsom.upload_video_type.indexOf(type)== -1 ){
layer.open({content:'不支持该文件类型！'+type,skin:'msg',time:2});
$('#jinsom-upload-video').val('');
return false;
}

var percent = $('.jinsom-upload-video-btn .percent');
var progress = $(".jinsom-upload-video-btn p");

$("#jinsom-upload-video-form").ajaxSubmit({
dataType:'json',
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
percent.width(percentVal);
progress.html(percentVal);
if(percentVal=='100%'){
progress.html('视频正在处理中...');	
}
},
success:function(msg){
$('#jinsom-upload-video').val('');
if(msg.code==0){
layer.open({content:msg.msg,skin:'msg',time:2});
percent.width(0);
progress.html('选择一个视频');
}else if(msg.code==1){
$('#jinsom-upload-video-form').hide();
$('.jinsom-remove-video-toolbar').css('display','flex');
$('#jinsom-video-url').val(msg.file_url);

var jinsom_view_video = new Player({
id: 'jinsom-publish-video-demo',
url:msg.file_url,
'x5-video-player-type': 'h5',
'x5-video-player-fullscreen': false,
playbackRate: [0.5,1,1.5,2,6],
fitVideoSize:'fixWidth',
playsinline: true,
videoInit: true,
autoplay:true,
ignores: ['volume','pc'],
closeVideoTouch: true,
rotate:{
innerRotate: true, //只旋转内部video
clockwise: false // 旋转方向是否为顺时针
}
});

video = $('#jinsom-publish-video-demo video');
video.attr('crossOrigin','Anonymous');

jinsom_view_video.on("canplay", function(){
video_time=$('#jinsom-publish-video-demo .xgplayer-time em').text();
video_time_s=video_time.split(':')[video_time.split(':').length - 1];
video_time_m=video_time.split(':',1);
$('#jinsom-video-time').val(parseInt(video_time_m)*60+parseInt(video_time_s));
});

$('.jinsom-remove-video-toolbar .del').click(function(){
$('#jinsom-publish-video-demo').empty().attr('class','').attr('style','');
$('.jinsom-remove-video-toolbar').css('display','none');
$('#jinsom-upload-video-form').show();
percent.width(0);
progress.html('选择一个视频');
$('.jinsom-remove-video-toolbar .read').removeClass('on').text('截取封面');
$('.jinsom-publish-video-set-cover-content').empty();
$('#jinsom-video-img-url,#jinsom-video-url').val('');
});

$('.jinsom-remove-video-toolbar .read').click(function(){
if(!$(this).hasClass('on')){
var canvas = document.createElement("canvas");
// canvas.width = video[0].videoWidth;
// canvas.height = video[0].videoHeight;
video_width=$('#jinsom-publish-video-demo').width();
video_height=$('#jinsom-publish-video-demo').height();
canvas.width=video_width;
canvas.height=video_height;
var ctx=canvas.getContext("2d");
if(myApp.device.os=='ios'&&jinsom_get_file_type(msg.file_url)=='.mov'&&(video_height>video_width)){
ctx.rotate(90*Math.PI/180);
ctx.translate(0,-video_width);
ctx.drawImage(video[0], 0, 0, canvas.width*2, canvas.height);
}else{
ctx.drawImage(video[0], 0, 0, canvas.width, canvas.height);	
}
video_cover=canvas.toDataURL("image/jpeg");

$('.jinsom-publish-video-set-cover-content').html('<img src="'+video_cover+'">');
$.ajax({
type:"POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/upload/video-img-base64.php",
data:{base64:video_cover},
success: function(rel){
if(rel.code==1){
$('#jinsom-video-img-url').val(rel.file_url);	
$('.jinsom-remove-video-toolbar span.read').addClass('on').text('已截取封面');
$('.jinsom-publish-video-set-cover-content').html('<img src="'+rel.file_url+'">');
}else{
layer.open({content:rel.msg,skin:'msg',time:2});
$('.jinsom-remove-video-toolbar span.read').addClass('on').removeAttr('data-popup').removeClass('open-popup');
}
}
});	
}
});

$('#jinsom-publish-remove-video-cover').click(function(){
$('.jinsom-remove-video-toolbar .read').removeClass('on').text('截取封面');
$('.jinsom-publish-video-set-cover-content').empty();
$('#jinsom-video-img-url').val('');
});

}


}, 
error:function(){
$('#jinsom-upload-video-form').show();
percent.width(0);
progress.html('选择一个视频');
layer.open({content:'上传失败！',skin:'msg',time:2});
$('#jinsom-upload-video').val('');
return false;
} 
});

});
}


if(type=='music'){//上传音乐
document.querySelector('#jinsom-upload-music').addEventListener('change', function () {

//判断后缀
var location=$(this).val();
var point=location.lastIndexOf(".");
type=location.substr(point+1);
if(jinsom.upload_music_type.indexOf(type)== -1 ){
layer.open({content:'不支持该文件类型！'+type,skin:'msg',time:2});
return false;
}
	
var percent = $('.jinsom-upload-music-btn .percent');
var progress = $(".jinsom-upload-music-btn p");

$("#jinsom-upload-music-form").ajaxSubmit({
dataType:'json',
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
percent.width(percentVal);
progress.html(percentVal);
if(percentVal=='100%'){
progress.html('音频正在处理中...');	
}
},
success:function(msg){
$('#jinsom-upload-music').val('');
if(msg.code==0){
layer.open({content:msg.msg,skin:'msg',time:2});
percent.width(0);
progress.html('选择一个音频');
}else if(msg.code==1){
$('#jinsom-music-url').val(msg.file_url);
progress.html('音频已经上传');
}


}, 
error:function(){
$('#jinsom-upload-music-form').show();
percent.width(0);
progress.html('选择一个音频');
layer.open({content:'上传失败！',skin:'msg',time:2});
$('#jinsom-upload-music').val('');
return false;
} 
});

});


}



if(type!='select'){

jinsom_comment_aite_user_js();//发布@好友

//选择话题
$('.jinsom-publish-topic-popup').on('opened',function (){//打开
if($('.jinsom-publish-aite-form .list.topic li').length==0){
$('.jinsom-publish-aite-form .list.topic').prepend(jinsom.loading_post);
$.ajax({
type: "POST",
url: jinsom.mobile_ajax_url+"/topic/topic-hot.php",
success: function(msg){
html='';
for (var i = 0; i < msg.data.length; i++){
html+='\
<li onclick="jinsom_publish_topic_selete(this)" data="'+msg.data[i].name+'">\
<div class="avatarimg">'+msg.data[i].avatar+'</div>\
<div class="name">#'+msg.data[i].name+'#</div>\
<div class="hot"><i class="jinsom-icon jinsom-huo"></i> '+msg.data[i].hot+'</div>\
</li>';
}
$('.jinsom-publish-aite-form .list.topic').html(html);
}
}); 

}
});

}

if(type=='secret'){
$('.jinsom-publish-secret-color-list li').click(function(){
$(this).parent().prev().children('textarea').css('background',$(this).attr('data'));
$('[name=color]').val($(this).attr('data'));
});
$('.jinsom-publish-secret-type-list li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
});
}



});





//---------------------------//充值金币页面-----------------
myApp.onPageAfterAnimation('recharge-credit',function(page){
$('.jinsom-recharge-number li').click(function() {
$(this).addClass('on').siblings().removeClass('on');
$('#jinsom-credit-recharge-number').val($(this).children('.bottom').attr('data'));
});
$('.jinsom-recharge-type li').click(function() {
$('#jinsom-credit-recharge-form input[name="WIDout_trade_no"]').val(new Date().getTime());
$(this).addClass('on').siblings().removeClass('on');
type=$(this).attr('data');
$('#jinsom-recharge-type').val(type);
if(type=='alipay_mobile'){
$('#jinsom-credit-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/alipay/alipay-h5.php');	
}else if(type=='wechatpay_mp'){
$('#jinsom-credit-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/wechatpay/wechat-mp.php');	
}else if(type=='epay_alipay'||type=='epay_wechatpay'){
$('#jinsom-credit-recharge-form').append('<input type="hidden" name="pay_type" value="'+type+'">');
$('#jinsom-credit-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/epay/index.php');	
}
});
});

//---------------------------//开通会员页面-----------------
myApp.onPageAfterAnimation('recharge-vip',function(page){
$('.jinsom-recharge-number li').click(function() {
$(this).addClass('on').siblings().removeClass('on');

if($('.jinsom-recharge-type li.on').length>0){
if($('.jinsom-recharge-type li.on').attr('data')=='creditpay'){
$('#jinsom-credit-recharge-number').val($(this).children('.bottom').attr('credit_price'));	
}else{
$('#jinsom-credit-recharge-number').val($(this).children('.bottom').attr('rmb_price'));	
}
}
});	



$('.jinsom-recharge-type li').click(function() {
$('#jinsom-credit-recharge-form input[name="WIDout_trade_no"]').val(new Date().getTime());
$(this).addClass('on').siblings().removeClass('on');
type=$(this).attr('data');
$('#jinsom-recharge-type').val(type);
if(type=='creditpay'){
$('#jinsom-credit-recharge-number').val($('.jinsom-recharge-number li.on').children('.bottom').attr('credit_price'));

$(".jinsom-recharge-number li").each(function(){
$(this).children('.bottom').find('m').html($(this).children('.bottom').attr('credit_price'));
});
$('.jinsom-recharge-number li .bottom i').html(jinsom.credit_name);
}else{
$('#jinsom-credit-recharge-number').val($('.jinsom-recharge-number li.on').children('.bottom').attr('rmb_price'));	

$(".jinsom-recharge-number li").each(function(){
$(this).children('.bottom').find('m').html($(this).children('.bottom').attr('rmb_price'));
});
$('.jinsom-recharge-number li .bottom i').html('元');
if(type=='alipay_mobile'){
$('#jinsom-credit-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/alipay/alipay-h5.php');	
}else if(type=='wechatpay_mp'){
$('#jinsom-credit-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/wechatpay/wechat-mp.php');	
}else if(type=='epay_alipay'||type=='epay_wechatpay'){
$('#jinsom-credit-recharge-form').append('<input type="hidden" name="pay_type" value="'+type+'">');
$('#jinsom-credit-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/epay/index.php');	
}	
}

});
});

//---------------------------//发送礼物页面-----------------
myApp.onPageAfterAnimation('send-gift',function(page){
$('.jinsom-send-gift-form li').click(function() {
$(this).addClass('on').siblings().removeClass('on');
$('.jinsom-send-gift-toolbar span.send i').html($(this).children('.bottom').attr('data'));
});
});


//---------------------系统通知------
myApp.onPageBeforeInit('system-notice',function(page){
system_notice_loading = false;
system_notice_page=2;
system_notice_list=$('.jinsom-site-notice-content');
$('.jinsom-site-notice-content.infinite-scroll').on('infinite',function(){
if (system_notice_loading) return;
system_notice_loading = true;
system_notice_list.append(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/system-notice.php",
data: {page:system_notice_page},
success: function(msg){
if(msg!=0){
system_notice_list.append(msg);
system_notice_loading = false; 
system_notice_page++;
}else{
system_notice_loading = true; 
}
$('.jinsom-load-post').remove();
}
});


}); 
});



//我的粉丝页面
myApp.onPageAfterAnimation('follower', function (page) {
type=page.query['type'];

//滚动事件
$('.jinsom-follower-content').scroll(function(){
navbarH=$('.navbar').height();
viewH =Math.round($(this).height()),//可见高度
contentH =$(this).get(0).scrollHeight,//内容高度
scrollTop =$(this).scrollTop();//滚动高度
if(contentH - viewH - scrollTop-navbarH <20){ //到达底部时,加载新内容
if($('.jinsom-follower-content .jinsom-loading').length==0&&$('.jinsom-follower-content .jinsom-empty-page').length==0){
more_list=$('.jinsom-chat-user-list.follower');
page=parseInt(more_list.attr('page'));
user_id=more_list.attr('user_id');
more_list.after(jinsom.loading);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/user/follower.php",
data: {page:page,user_id:user_id,type:type},
success: function(msg){
if(msg.code!=0){  

html='';
for (var i = msg.data.length - 1; i >= 0; i--){
html+='\
<li>\
<div class="item-content">\
<div class="item-media">\
<a href="'+msg.data[i].link+'" class="link">\
'+msg.data[i].avatar+msg.data[i].verify+'\
</a>\
</div>\
<div class="item-inner">\
<div class="item-title">\
<a href="'+msg.data[i].link+'" class="link">\
<div class="name">'+msg.data[i].nickname+msg.data[i].vip+'</div>\
<div class="desc">'+msg.data[i].desc+'</div>\
</a>\
</div>\
</div>\
'+msg.data[i].follow+'\
</div>\
</li>';
}
more_list.append(html);
page=page+1;
more_list.attr('page',page);
}else{
more_list.append('<div class="jinsom-empty-page">暂时没有更多了</div>'); 
}
$('.jinsom-load').remove();
}
});
}
}

});

}); 


//---------------------我的访客-------
myApp.onPageBeforeInit('visitor',function(page){
$('.jinsom-mine-page li.visitor .item-title>i,.jinsom-mine-page li.visitor p>i').remove();//移除红点
});







//收入记录
myApp.onPageBeforeInit('income', function (page) {
//滚动事件
$('.jinsom-recharge-note-content').scroll(function(){
navbarH=$('.navbar').height();
viewH =Math.round($(this).height()),//可见高度
contentH =$(this).get(0).scrollHeight,//内容高度
scrollTop =$(this).scrollTop();//滚动高度
if(contentH - viewH - scrollTop-navbarH <20){ //到达底部时,加载新内容
if($('.jinsom-recharge-note-content .jinsom-loading').length==0&&$('.jinsom-recharge-note-content .jinsom-empty-page').length==0){
more_list=$('.jinsom-chat-user-list.recharge-note');
page=parseInt(more_list.attr('page'));
type=more_list.attr('type');
more_list.after(jinsom.loading);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/note/credit.php",
data: {page:page,type:type},
success: function(msg){
if(msg.code!=0){  

html='';
for (var i = msg.data.length - 1; i >= 0; i--){
html+='\
<li>\
<div class="item-content">\
<div class="item-media">\
'+msg.data[i].avatar+'\
</div>\
<div class="item-inner">\
<div class="item-title">\
<div class="name">'+msg.data[i].content+'</div>\
<div class="desc">'+msg.data[i].time+'</div>\
</div>\
</div>\
<div class="item-after">+'+msg.data[i].number+'</div>\
</div>\
</li>';
}
more_list.append(html);
page=page+1;
more_list.attr('page',page);
}else{
more_list.append('<div class="jinsom-empty-page">没有更多记录</div>'); 
}
$('.jinsom-load').remove();
}
});
}
}

});

}); 

//支出记录
myApp.onPageBeforeInit('outlay', function (page) {
//滚动事件
$('.jinsom-recharge-note-content').scroll(function(){
navbarH=$('.navbar').height();
viewH =Math.round($(this).height()),//可见高度
contentH =$(this).get(0).scrollHeight,//内容高度
scrollTop =$(this).scrollTop();//滚动高度
if(contentH - viewH - scrollTop-navbarH <20){ //到达底部时,加载新内容
if($('.jinsom-recharge-note-content .jinsom-loading').length==0&&$('.jinsom-recharge-note-content .jinsom-empty-page').length==0){
more_list=$('.jinsom-chat-user-list.recharge-note');
page=parseInt(more_list.attr('page'));
type=more_list.attr('type');
more_list.after(jinsom.loading);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/note/credit.php",
data: {page:page,type:type},
success: function(msg){
if(msg.code!=0){  

html='';
for (var i = msg.data.length - 1; i >= 0; i--){
html+='\
<li>\
<div class="item-content">\
<div class="item-media">\
'+msg.data[i].avatar+'\
</div>\
<div class="item-inner">\
<div class="item-title">\
<div class="name">'+msg.data[i].content+'</div>\
<div class="desc">'+msg.data[i].time+'</div>\
</div>\
</div>\
<div class="item-after out">-'+msg.data[i].number+'</div>\
</div>\
</li>';
}
more_list.append(html);
page=page+1;
more_list.attr('page',page);
}else{
more_list.append('<div class="jinsom-empty-page">没有更多记录</div>'); 
}
$('.jinsom-load').remove();
}
});
}
}

});

}); 



//充值记录
myApp.onPageBeforeInit('recharge-note', function (page) {
//滚动事件
$('.jinsom-recharge-note-content').scroll(function(){
navbarH=$('.navbar').height();
viewH =Math.round($(this).height()),//可见高度
contentH =$(this).get(0).scrollHeight,//内容高度
scrollTop =$(this).scrollTop();//滚动高度
if(contentH - viewH - scrollTop-navbarH <20){ //到达底部时,加载新内容
if($('.jinsom-recharge-note-content .jinsom-loading').length==0&&$('.jinsom-recharge-note-content .jinsom-empty-page').length==0){
more_list=$('.jinsom-chat-user-list.recharge-note');
page=parseInt(more_list.attr('page'));
type=more_list.attr('type');
more_list.after(jinsom.loading);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/note/credit.php",
data: {page:page,type:type},
success: function(msg){
if(msg.code!=0){  

html='';
for (var i = msg.data.length - 1; i >= 0; i--){
html+='\
<li>\
<div class="item-content">\
<div class="item-media">\
'+msg.data[i].avatar+'\
</div>\
<div class="item-inner">\
<div class="item-title">\
<div class="name">'+msg.data[i].content+'</div>\
<div class="desc">'+msg.data[i].time+'</div>\
</div>\
</div>\
<div class="item-after">+'+msg.data[i].number+'</div>\
</div>\
</li>';
}
more_list.append(html);
page=page+1;
more_list.attr('page',page);
}else{
more_list.append('<div class="jinsom-empty-page">没有更多记录</div>'); 
}
$('.jinsom-load').remove();
}
});
}
}

});

}); 



//活动报名表单
myApp.onPageAfterAnimation('activity-form', function (page) {


$('.jinsom-upload-activity-form-1 input').change(function(){
$(".jinsom-upload-activity-form-1").ajaxSubmit({
dataType:'json',
success:function(msg){
if(msg.code==0){
layer.open({content:msg.msg,skin:'msg',time:2});	
}
$(".jinsom-upload-activity-form-1").parent().hide().next().val(msg.file_url).after('<img src="'+msg.file_url+'">');
}, 
error:function(){
layer.open({content:'上传失败！',skin:'msg',time:2});
} 
});
});

$('.jinsom-upload-activity-form-2 input').change(function(){
$(".jinsom-upload-activity-form-2").ajaxSubmit({
dataType:'json',
success:function(msg){
if(msg.code==0){
layer.open({content:msg.msg,skin:'msg',time:2});	
}
$(".jinsom-upload-activity-form-2").parent().hide().next().val(msg.file_url).after('<img src="'+msg.file_url+'">');
}, 
error:function(){
layer.open({content:'上传失败！',skin:'msg',time:2});
} 
});
});

$('.jinsom-upload-activity-form-3 input').change(function(){
$(".jinsom-upload-activity-form-3").ajaxSubmit({
dataType:'json',
success:function(msg){
if(msg.code==0){
layer.open({content:msg.msg,skin:'msg',time:2});	
}
$(".jinsom-upload-activity-form-3").parent().hide().next().val(msg.file_url).after('<img src="'+msg.file_url+'">');
}, 
error:function(){
layer.open({content:'上传失败！',skin:'msg',time:2});
} 
});
});


});



//任务事件
myApp.onPageAfterAnimation('task', function (page) {
$('#jinsom-task-navbar-center span').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$('.jinsom-task-form-content').find('ul').eq($(this).index()).show().siblings().hide();
});
});


//生成内容海报
myApp.onPageBeforeInit('content-playbill',function(page){
url=page.query['url'];
jinsom_qrcode('jinsom-content-playbill-code',60,60,url);
$('#jinsom-add-content-playbill').click(function(){
obj=$(this);
obj.html('<i class="fa fa-spinner fa-spin"></i> 海报生成中...')
const vm = this;
const domObj = document.getElementById('jinsom-content-playbill');
const left = domObj.getBoundingClientRect().left;
const top = domObj.offsetTop;
const width = domObj.offsetWidth;
const height = domObj.offsetHeight;
const scale = 3;
const canvas = document.createElement('canvas');
canvas.width = width*scale;
canvas.height = height*scale;
canvas.style.width=width+"px";
canvas.style.height=height+"px";
const context = canvas.getContext("2d");
context.scale(scale,scale);
context.translate(-left,-top);
html2canvas(domObj,{
// dpi:1,
scale: scale,
canvas: canvas,
useCORS: true,
logging: false,
// allowTaint:true,
width:width,
height:height,
}).then(function(canvas) {


vm.posterImg = canvas.toDataURL('image/jpeg')
vm.mask = true;
$('#jinsom-content-playbill').html('<img src="'+vm.posterImg+'">');
obj.after('<div class="jinsom-save-content-playbill">「 海报已生成，长按图片进行保存 」</div>');
obj.remove()
});
});

});


//推广
myApp.onPageBeforeInit('referral', function (page) {

//复制推广链接
var clipboard = new ClipboardJS('#jinsom-referral-cover');
clipboard.on('success', function(e) {
e.clearSelection();
layer.open({content:'复制成功！',skin:'msg',time:2});
});
});



//直播
myApp.onPageBeforeInit('live', function (page) {
video_url=$('#jinsom-video-live').attr('data');
if(video_url){
cover=$('#jinsom-video-live').attr('cover');
video_type=jinsom_video_type(video_url);
window.player=new window[video_type]({
id:'jinsom-video-live',
url:video_url,
poster:cover,
'x5-video-player-type': 'h5',
'x5-video-player-fullscreen': false,
playsinline: true,
// fluid: true,
// autoplay:true,
ignores: ['volume','pc'],
closeVideoTouch: true,
rotate:{
innerRotate: true, //只旋转内部video
clockwise: false // 旋转方向是否为顺时针
}
});
// $('#jinsom-video-live .xgplayer-start').click();
}


//直播tab菜单
$('.jinsom-live-page-nav li').click(function(){
$('.jinsom-live-toolbar textarea,.jinsom-live-toolbar').removeAttr('style');
$('.jinsom-live-toolbar,.jinsom-right-bar').hide();
$(this).addClass('on').siblings().removeClass('on');
$(this).parents('.jinsom-live-page-header').next().children('ul').eq($(this).index()).show().siblings().hide();
if($(this).hasClass('comment')){
$('.jinsom-live-toolbar,.jinsom-right-bar').show();
$('.jinsom-live-page-nav-list').scrollTop($('.jinsom-live-page-nav-list')[0].scrollHeight);//互动评论向下啦
}
});

jinsom_ajax_get_live_comment();//发起
jinsom_lightbox();
});

myApp.onPageAfterAnimation('live', function (page) {
$('.jinsom-live-page-nav-list').scrollTop($('.jinsom-live-page-nav-list')[0].scrollHeight);//互动评论向下啦
});

//关闭直播界面
myApp.onPageBack('live',function (page){//返回
ajax_get_live_comment.abort();
})



//宠物窝-自己
myApp.onPageBeforeInit('pet-nest-mine', function (page){
if($('#pet-1').length>0&&!jinsom.is_admin){
pet_id=$('#pet-1').attr('data-id');
pet_number=$('#pet-1').attr('data-number');
new TencentCaptcha(document.getElementById('pet-1'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_pet_sell(pet_id,pet_number,document.getElementById('pet-1'),res.ticket,res.randstr);}
});
}
});

//宠物窝-别人
myApp.onPageBeforeInit('pet-nest-other', function (page){
if($('#pet-1').length>0&&!jinsom.is_admin){
pet_id=$('#pet-1').attr('data-id');
pet_number=$('#pet-1').attr('data-number');
new TencentCaptcha(document.getElementById('pet-1'),jinsom.machine_verify_appid,function(res){
if(res.ret === 0){jinsom_pet_steal(pet_id,pet_number,document.getElementById('pet-1'),res.ticket,res.randstr);}
});
}
});



//收藏
myApp.onPageBeforeInit('collect', function (page){
jinsom_lightbox();//灯箱
//加载更多
collect_loading = false;
var collect_page;
if(!collect_page){
collect_page=2;
}

collect_post_list=$('.jinsom-collect-content .jinsom-post-list');
$('.jinsom-collect-content.infinite-scroll').on('infinite',function(){
if(collect_loading) return;
collect_loading = true;
collect_post_list.after(jinsom.loading_post);
type=$('.jinsom-collect-tab li.on').attr('type');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/collect.php",
data: {page:collect_page,type:type,load_type:'more'},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
collect_loading = true; 
}else{
collect_post_list.append(msg);
jinsom_lightbox();
collect_page++;
collect_loading = false;  
} 
}
});
});


});


//收藏-图片
myApp.onPageBeforeInit('collect-img', function (page){
jinsom_lightbox();//灯箱

var grid=$('.jinsom-collect-img-content').masonry({//渲染瀑布流
itemSelector:'li',
gutter:7.5,
// transitionDuration:0
});
grid.masonry('reloadItems'); 
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
}); 

//加载更多
collect_img_loading = false;
var collect_img_page;
if(!collect_img_page){
collect_img_page=2;
}

collect_img_post_list=$('.jinsom-collect-img-content');
$('.jinsom-collect-img-content.infinite-scroll').on('infinite',function(){
if(collect_img_loading) return;
collect_img_loading = true;
collect_img_post_list.after(jinsom.loading_post);
type=$('.jinsom-collect-tab li.on').attr('type');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/collect-img.php",
data: {page:collect_img_page,type:type,load_type:'more'},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
collect_img_loading = true; 
}else{
collect_img_post_list.append(msg);
var grid=$('.jinsom-collect-img-content').masonry({//渲染瀑布流
itemSelector:'li',
gutter:7.5,
transitionDuration:0
});
grid.masonry('reloadItems'); 
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
}); 

jinsom_lightbox();
collect_img_page++;
collect_img_loading = false;  
} 
}
});
});
});



//树洞
myApp.onPageBeforeInit('secret',function(page){


//下拉刷新
ptrContent = $('.jinsom-secret-content.pull-to-refresh-content');
ptrContent.on('refresh', function (e){
myApp.pullToRefreshDone();
type=$('.jinsom-secret-menu li.on').attr('data');
jinsom_secret_post(type,'pull',this);
});


//加载更多
secret_loading = false;
secret_page = 2;
$('.jinsom-secret-content.infinite-scroll').on('infinite',function(){
if(secret_loading) return;
secret_post_list=$('.jinsom-post-secret-list');
secret_loading = true;
secret_post_list.after(jinsom.loading_post);
type=$('.jinsom-secret-menu li.on').attr('data');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/secret.php",
data: {page:secret_page,type:type,load_type:'more'},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
secret_loading = true; 
}else{
secret_post_list.append(msg);
jinsom_lightbox()
secret_page++;
secret_loading = false;  
} 
}
});
});
});


//匿名-我的
myApp.onPageBeforeInit('secret-mine',function(page){

//加载更多
secret_mine_loading = false;
secret_mine_page = 2;
$('.jinsom-secret-mine-content.infinite-scroll').on('infinite',function(){
if(secret_mine_loading) return;
secret_post_list=$('.jinsom-post-secret-list.mine');
secret_mine_loading = true;
secret_post_list.after(jinsom.loading_post);
type=$('.jinsom-secret-menu li.on').attr('data');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/secret.php",
data: {page:secret_mine_page,type:type,load_type:'more',author_id:1},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
secret_mine_loading = true; 
}else{
secret_post_list.append(msg);
jinsom_lightbox()
secret_mine_page++;
secret_mine_loading = false;  
} 
}
});
});

});

//匿名详情页
myApp.onPageBeforeInit('post-secret',function(page){
$('.jinsom-secret-comment-btn .text').click(function(){
obj=$(this).parent();
obj.html('<textarea id="jinsom-secret-comment-content"></textarea>');
obj.after('<div class="jinsom-secret-comment-content-btn" onclick="jinsom_secret_comment()">唠叨一下</div>');
$('#jinsom-secret-comment-content').focus();
});
});


//筛选页面
myApp.onPageBeforeInit('select',function(page){

//点击论坛板块切换
$('.jinsom-select-subnavbar-list>div .list li').click(function(){
$('.topic-list .bbs-topic').remove();
$('.jinsom-select-left-more-content .topic-list').prepend($('.bbs-topic-hidden').children('yyy').eq($(this).index()).html());
});
	
$('.jinsom-select-subnavbar-list .bbs,.jinsom-select-subnavbar-list .sort').click(function(){
$(this).siblings().removeClass('on').children('.list').hide().siblings('i').removeClass('jinsom-triangle').addClass('jinsom-lower-triangle');
$(this).addClass('on').children('.list').show().siblings('i').removeClass('jinsom-lower-triangle').addClass('jinsom-triangle');
});
$('.jinsom-select-subnavbar-list .list').click(function(e){
window.event.stopPropagation();
$(this).hide().siblings('i').removeClass('jinsom-triangle').addClass('jinsom-lower-triangle');
$(this).parent().removeClass('on');

// select_loading=false;
// $('.jinsom-select-content').attr('page',2);
// $('.jinsom-select-content').animate({scrollTop:0},0);
// jinsom_page_select_submit_form();//筛选数据
});
$('.jinsom-select-subnavbar-list>div .list li').click(function(e){
window.event.stopPropagation();
$(this).addClass('on').siblings().removeClass('on');
$(this).parents('.list').hide().siblings('span').text($(this).text());
$(this).parents('.list').siblings('i').removeClass('jinsom-triangle').addClass('jinsom-lower-triangle');
$(this).parents('.on').removeClass('on');

select_loading=false;
$('.jinsom-select-content').attr('page',2);
$('.jinsom-select-content').animate({scrollTop:0},0);
jinsom_page_select_submit_form();//筛选数据
});

$('.jinsom-select-subnavbar-list .more').click(function(){
$(this).siblings().removeClass('on').children('.list').hide().siblings('i').removeClass('jinsom-triangle').addClass('jinsom-lower-triangle');
layer.open({
type: 1,
className:'jinsom-select-left-more-form',
content: $('.jinsom-select-more-content').html(),
anim: 'left',
});	


$('.jinsom-select-left-more-content .topic-list li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$('.jinsom-select-more-content').html($(this).parents('.layui-m-layercont').html());
layer.closeAll();

select_loading=false;
$('.jinsom-select-content').animate({scrollTop:0},0);
$('.jinsom-select-content').attr('page',2);
jinsom_page_select_submit_form();//筛选数据
});	

});


//获取表单数据
function jinsom_get_select_data(){
url='';
//论坛
if($('.jinsom-select-subnavbar-list>.bbs .list li.on').length>0){
url+='bbs_id='+$('.jinsom-select-subnavbar-list>.bbs .list li.on').attr('data');	
}
//话题
if($('.jinsom-select-left-more-content .topic-select').length>0){
topic_select_i=0;
topic_str='';
$('.jinsom-select-left-more-content .topic-select').each(function(){
topic_id=$(this).find('.on').attr('data');
if(topic_id==undefined){
topic_id='all';
// $('.jinsom-select-left-more-content .topic-select').eq(topic_select_i).find('[data=all]').addClass('on');
}
topic_str+=topic_id+',';
topic_select_i++;
});
if(topic_str){
topic_str=topic_str.substring(0,topic_str.lastIndexOf(','));
url+='&topic_id='+topic_str;	
}
}

//字段
if($('.jinsom-select-left-more-content .field-select').length>0){
field_select_i=0;
field_str='';
$('.jinsom-select-left-more-content .field-select').each(function(){
field=$(this).find('.on').attr('data');
if(field==undefined){
field='all';
// $('.jinsom-page-select-header-box .field-select').eq(field_select_i).find('[data=all]').addClass('on');
}
field_str+=field+',';
field_select_i++;
});
if(field_str){
field_str=field_str.substring(0,field_str.lastIndexOf(','));
url+='&field='+field_str;    
}
}

//权限
if($('.jinsom-select-left-more-content .power li.on').length>0){
url+='&power='+$('.jinsom-select-left-more-content .power li.on').attr('data');	
}
//排序
if($('.jinsom-select-subnavbar-list>.sort .list li.on').length>0){
url+='&sort='+$('.jinsom-select-subnavbar-list>.sort .list li.on').attr('data');	
}


//页面ID
post_id=$('.jinsom-select-content').attr('post_id');
url+='&post_id='+post_id;
	

keyword=$('#jinsom-select-input').val();
if(keyword){
url+='&search='+keyword;	
}
return url;
}


//提交筛选表单
function jinsom_page_select_submit_form(){
waterfull_margin=$('#jinsom-waterfull-margin').height();
$('.jinsom-page-select-post-list').before(jinsom.loading_post);
url=jinsom_get_select_data()+'&page=1';
$.ajax({
type:"POST",
url:jinsom.jinsom_ajax_url+"/data/select.php",
data:url,
success: function(msg){
$('.jinsom-load-post').remove();
$('.jinsom-page-select-post-list').html(msg);
jinsom_lightbox();
if($('.jinsom-select-content').hasClass('waterfall')){//渲染瀑布流
var grid=$('.jinsom-page-select-post-list').masonry({
itemSelector:'li',
gutter:waterfull_margin,
// transitionDuration:0
});
grid.masonry('reloadItems'); 
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
});    
}



}//success
});



}//jinsom_page_select_submit_form

jinsom_page_select_submit_form();//筛选数据


//提交搜索
$('#jinsom-select-search-form').submit(function (event) {
event.preventDefault();//动作：阻止表单的默认行为
select_loading=false;
$('.jinsom-select-content').attr('page',2);
$('.jinsom-select-content').animate({scrollTop:0},0);
jinsom_page_select_submit_form();//筛选数据
});
$('#jinsom-select-input').focus(function(){
$(this).parents('.center').siblings('.subnavbar').find('.jinsom-select-subnavbar-list').children().removeClass('on').find('.list').hide();
$(this).parents('.center').siblings('.subnavbar').find('.jinsom-select-subnavbar-list').children().removeClass('on').find('.jinsom-triangle').addClass('jinsom-lower-triangle').removeClass('jinsom-triangle');
});




//加载更多
select_loading=false;
select_list=$('.jinsom-page-select-post-list');
$('.jinsom-select-content.infinite-scroll').on('infinite',function(){

//页数
page=$('.jinsom-select-content').attr('page');
url=jinsom_get_select_data()+'&page='+page;

if(select_loading) return;
select_page=parseInt($('.jinsom-select-content').attr('page'));
select_loading=true;
select_list.after(jinsom.loading_post);
waterfull_margin=$('#jinsom-waterfull-margin').height();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/data/select.php",
data:url,
success: function(msg){
$('.jinsom-load-post').remove();
if(msg!=0){
select_list.append(msg);
jinsom_lightbox();
if($('.jinsom-select-content').hasClass('waterfall')){//渲染瀑布流
var grid=$('.jinsom-page-select-post-list').masonry({
itemSelector:'li',
gutter:waterfull_margin,
transitionDuration:0
});
grid.masonry('reloadItems'); 
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
});
}

select_loading=false; 
select_page++;
$('.jinsom-select-content').attr('page',select_page);
}else{
// layer.open({content:'没有更多内容！',skin:'msg',time:2});
select_loading=true; 
}


//喜欢
$('.jinsom-select-content li .bar .like').click(function(){
num=parseInt($(this).children('span').text());
if($(this).children('i').hasClass('had')){
$(this).children('i').removeClass('jinsom-xihuan1 had').addClass('jinsom-xihuan2');
$(this).children('span').text(num-1);
}else{
$(this).children('i').removeClass('jinsom-xihuan2').addClass('jinsom-xihuan1 had');
$(this).children('span').text(num+1);	
}
}); 

}
});
}); 

});




//挑战列表页面
myApp.onPageBeforeInit('challenge',function(page){

//加载更多
challenge_loading=false;
challenge_page=2;
$('.jinsom-challenge-content.infinite-scroll').on('infinite',function(){
if(challenge_loading) return;
challenge_post_list=$('.jinsom-challenge-post-list');
challenge_loading=true;
if($('.jinsom-challenge-post-list.mine-join').length>0){
type=$('.jinsom-challenge-post-list.mine-join').attr('type');
}else if($('.jinsom-challenge-post-list.mine').length>0){
type=$('.jinsom-challenge-post-list.mine').attr('type');
}else{
type=$('.jinsom-challenge-menu li.on').attr('type');
}

challenge_post_list.after(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/challenge.php",
data: {page:challenge_page,type:type},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
challenge_loading=true; 
}else{
challenge_post_list.append(msg);
challenge_page++;
challenge_loading=false;  
} 
}
});
});

});

//发起挑战
myApp.onPageBeforeInit('challenge-publish',function(page){
$('.jinsom-publish-challenge-content .type li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$(this).parent().next().children('div').hide().eq($(this).index()).show();
if($(this).hasClass('a')){
$(this).parent().siblings('.shitou').show();
}else{
$(this).parent().siblings('.shitou').hide();
}
}); 
$('.jinsom-publish-challenge-content .shitou li,.jinsom-publish-challenge-content .price li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
}); 
});


//参与挑战
myApp.onPageBeforeInit('challenge-join',function(page){
$('.jinsom-challenge-content .shitou li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
});
});


//我的订单页面
myApp.onPageBeforeInit('order-mine',function(page){

read_type=page.query['read_type'];
if(read_type==2){
$('[type="status-2"]').click();	
}else if(read_type==1){
$('[type="status-1"]').click();
}else if(read_type=='collect'){
$('[type="collect"]').click();	
}

//加载更多
order_loading=false;
order_page=2;
$('.jinsom-shop-order-mine-content').on('infinite',function(){
if(order_loading) return;
order_list=$('.jinsom-shop-order-mine-list');
order_loading=true;
type=$('.jinsom-shop-menu li.on').attr('type');

order_list.after(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/order.php",
data: {page:order_page,type:type},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
order_loading=true; 
}else{
order_list.append(msg);
order_page++;
order_loading=false;  
} 
}
});
});

});



//商品详情页面
myApp.onPageBeforeInit('post-goods',function(page){
$('.navbar-inner').removeClass('color');
post_id=page.query['post_id'];
rand=page.query['rand'];
jinsom_lightbox();
var owlCar=$('#jinsom-goods-slider-'+rand).owlCarousel({
items: 1,
loop: true,
autoHeight: true,
dots:false,
onInitialized: counter,
onChanged: counter,
});

var carTimer = setInterval(function() {
if(owlCar.height() > 1) clearInterval(carTimer);
owlCar.trigger('refresh.owl.carousel', [100]);
}, 300);

function counter(event) {
if (!event.namespace) {
return;
}
var slides = event.relatedTarget;
$('.slider-counter').text(slides.relative(slides.current()) + 1 + '/' + slides.items().length);
}


$('.jinsom-page-goods-content').scroll(function(){
scrollTop=$(this).scrollTop();//滚动高度
if(scrollTop>100){
$('[data-page=post-goods] .navbar-inner.navbar-on-center').addClass('color');
}else{
$('[data-page=post-goods] .navbar-inner.navbar-on-center').removeClass('color');
};
});


//菜单点击
$('.jinsom-goods-single-box .title>li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$(this).parent().next().children('ul').hide().eq($(this).index()).show();
});



});

//---------------------------//订单界面-----------------
myApp.onPageAfterAnimation('order-details',function(page){
$('.jinsom-recharge-type li').click(function() {
$(this).addClass('on').siblings().removeClass('on');
type=$(this).attr('data');
$('#jinsom-recharge-type').val(type);
if(type=='alipay_mobile'){
$('#jinsom-goods-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/alipay/alipay-h5.php');	
}else if(type=='wechatpay_mp'){
$('#jinsom-goods-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/wechatpay/wechat-mp.php');	
}else if(type=='epay_alipay'||type=='epay_wechatpay'){
$('#jinsom-goods-recharge-form').append('<input type="hidden" name="pay_type" value="'+type+'">');
$('#jinsom-goods-recharge-form').attr('action',jinsom.home_url+'/Extend/pay/epay/index.php');	
}
});
});


//商品筛选页面
myApp.onPageBeforeInit('shop-select',function(page){
$('.jinsom-select-subnavbar-list .bbs,.jinsom-select-subnavbar-list .sort').click(function(){
$(this).siblings().removeClass('on').children('.list').hide().siblings('i').removeClass('jinsom-triangle').addClass('jinsom-lower-triangle');
$(this).addClass('on').children('.list').show().siblings('i').removeClass('jinsom-lower-triangle').addClass('jinsom-triangle');
});

$('.jinsom-select-subnavbar-list>div .list li').click(function(e){
window.event.stopPropagation();
$(this).addClass('on').siblings().removeClass('on');
$(this).parents('.list').hide().siblings('span').text($(this).text());
$(this).parents('.list').siblings('i').removeClass('jinsom-triangle').addClass('jinsom-lower-triangle');
$(this).parents('.on').removeClass('on');

select_loading=false;
$('.jinsom-shop-select-post-list').attr('page',1);
$('.jinsom-shop-goods-select-content').animate({scrollTop:0},0);
jinsom_shop_select_submit_form();//筛选数据
});


$('.jinsom-select-subnavbar-list .more').click(function(){
$(this).siblings().removeClass('on').children('.list').hide().siblings('i').removeClass('jinsom-triangle').addClass('jinsom-lower-triangle');
layer.open({
type: 1,
className:'jinsom-select-left-more-form',
content: $('.jinsom-select-more-content').html(),
anim: 'left',
});	


$('.jinsom-select-left-more-content .topic-list li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
$('.jinsom-select-more-content').html($(this).parents('.layui-m-layercont').html());
layer.closeAll();

select_loading=false;
$('.jinsom-shop-goods-select-content').animate({scrollTop:0},0);
$('.jinsom-shop-select-post-list').attr('page',1);
jinsom_shop_select_submit_form();//筛选数据
});	

});
jinsom_shop_select_submit_form();

//提交搜索
$('#jinsom-shop-select-search-form').submit(function (event) {
event.preventDefault();//动作：阻止表单的默认行为
select_loading=false;
$('.jinsom-shop-goods-select-content').animate({scrollTop:0},0);
$('.jinsom-shop-select-post-list').attr('page',1);
jinsom_shop_select_submit_form();//筛选数据
});

$('#jinsom-shop-select-input').focus(function(){
$(this).parents('.center').siblings('.subnavbar').find('.jinsom-select-subnavbar-list').children().removeClass('on').find('.list').hide();
$(this).parents('.center').siblings('.subnavbar').find('.jinsom-select-subnavbar-list').children().removeClass('on').find('.jinsom-triangle').addClass('jinsom-lower-triangle').removeClass('jinsom-triangle');
});


//加载更多
select_loading=false;
select_list=$('.jinsom-shop-select-post-list');
$('.jinsom-shop-goods-select-content.infinite-scroll').on('infinite',function(){
page=parseInt(select_list.attr('page'));
// select_list.attr('page',page+1);
if(select_loading) return;
select_loading=true;
jinsom_shop_select_submit_form();
}); 


//提交筛选表单
function jinsom_shop_select_submit_form(){
page=parseInt($('.jinsom-shop-select-post-list').attr('page'));
url='';
//论坛
if($('.jinsom-select-subnavbar-list>.bbs .list li.on').length>0){
url+='cat_id='+$('.jinsom-select-subnavbar-list>.bbs .list li.on').attr('data');	
}
//排序
if($('.jinsom-select-subnavbar-list>.sort .list li.on').length>0){
url+='&sort='+$('.jinsom-select-subnavbar-list>.sort .list li.on').attr('data');	
}
//页数
url+='&page='+page;
//列表布局
list_style=$('.jinsom-shop-select-post-list').attr('list_style');
url+='&list_style='+list_style;
//价格类型
url+='&price_type='+$('.jinsom-select-left-more-content .price_type li.on').attr('data');
//价格范围
url+='&price='+$('.jinsom-select-left-more-content .price li.on').attr('data');
//关键词
url+='&search='+$('#jinsom-shop-select-input').val();
console.log(url);
waterfull_margin=$('#jinsom-waterfull-margin').height();

if(page==1){
$('.jinsom-shop-select-post-list').before(jinsom.loading_post);
}else{
$('.jinsom-shop-select-post-list').after(jinsom.loading_post);	
}
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/post/goods-select.php",
data:url,
success: function(msg){
$('.jinsom-load-post').remove();
$('.jinsom-shop-select-post-list').attr('page',page+1);
if(page==1){
$('.jinsom-shop-select-post-list').html(msg);
}else{
if(msg!=0){
$('.jinsom-shop-select-post-list').append(msg);
select_loading=false;
}else{
select_loading=true;	
}	
}

if(list_style=='waterfall'){//渲染瀑布流
var grid=$('.jinsom-shop-select-post-list').masonry({
itemSelector:'li',
gutter:waterfull_margin,
transitionDuration:0
});
grid.masonry('reloadItems'); 
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
});    
}
}//success
});

}//jinsom_shop_select_submit_form

});