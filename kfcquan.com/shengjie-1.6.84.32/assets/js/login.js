//登录类表单
function jinsom_login_form(title,type,width){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/login/"+type+".php",
success: function(msg){
layer.closeAll(); 
layer.open({
title:title,
btn:false,
closeBtn:2,
type: 1,
area:[width+'px','auto'],
skin:'jinsom-login-form '+type,
content:msg
})
}
});  
}



//弹窗选择登录方式
function jinsom_pop_login_style(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/login/login-style.php",
success: function(msg){
layer.closeAll(); 
layer.open({
title:'登录帐号',
btn: false,
closeBtn:2,
type: 1,
area: ['400px','auto'],
skin: 'jinsom-login-form login',
content: msg
})
}
});  
} 





//修改手机号表单
function jinsom_update_phone_form(author_id,close){
phone=$('#jinsom-profile-phone').val();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/update-phone.php",
data: {author_id:author_id,phone:phone},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'绑定手机号',
btn: false,
type: 1,
resize:false,
closeBtn:close,
area: '350px',
skin: 'jinsom-login-form',
content: msg
});
}
});
}

//修改邮箱表单
function jinsom_update_mail_form(author_id,close){
email=$('#jinsom-profile-mail').val();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/update-mail.php",
data: {author_id:author_id,email:email},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'绑定邮箱',
btn: false,
type: 1,
resize:false,
closeBtn:close,
area: '350px',
skin: 'jinsom-login-form',
content: msg
});

}
});
}

//忘记密码 第一步 输入手机号/邮箱
function jinsom_get_password_one_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/password.php",
data: {type:1},
success: function(msg){
layer.closeAll();
layer.open({
title:'重置密码',
btn: false,
type: 1,
resize:false,
closeBtn:2,
area: ['350px'],
skin: 'jinsom-login-form',
content: msg
});

}
});    
}


//忘记密码 第二步
function jinsom_get_password_two_form(){
username= $('#jinsom-pop-username').val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/password.php",
data: {type:1,username:username},
success: function(msg){
if(msg.code==0){
layer.closeAll('loading');
layer.msg(msg.msg);  
}else if(msg.code==1){
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/password.php",
data: {type:2,user_id:msg.user_id,username:username},
success: function(msg){
layer.closeAll();
layer.open({
title:'重置密码',
btn: false,
type: 1,
resize:false,
closeBtn:2,
area: ['350px','190px'],
skin: 'jinsom-login-form',
content: msg
});
layui.use('form', function(){
var form = layui.form;
form.render();//表单重渲染
});

}
});
}
}
}); 
}


//忘记密码 第三步
function jinsom_get_password_three_form(user_id){
style = $('.jinsom-pop-login-form input[name="style"]:checked ').val();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/password.php",
data: {user_id:user_id,style:style,type:3},
success: function(msg){
layer.closeAll();
layer.open({
title:'重置密码',
btn: false,
type: 1,
resize:false,
closeBtn:2,
area: ['350px','280px'],
skin: 'jinsom-login-form',
content: msg
});
}
}); 
}



//弹出修改密码表单
function jinsom_update_password_form(user_id){
if(jinsom.is_black){
layer.msg('你是黑名单用户，禁止设置操作！');	
return false;
}
layer.open({
title:'用户ID：'+user_id+' - 修改密码',
btn: false,
type: 1,
resize:false,
closeBtn:2,
area: ['350px'],
skin: 'jinsom-login-form',
content: '\
<div class="jinsom-pop-login-form">\
<li class="pass"><input placeholder="请输入新的密码" id="jinsom-pop-password" type="text" autocomplete="off"></li>\
<li class="pass-b"><input id="jinsom-pop-password-b" type="text" placeholder="请再输入一遍"></li>\
<div class="jinsom-login-btn">\
<span class="ok opacity" onclick="jinsom_update_password('+user_id+');">完成修改</span>\
</div>\
</div>\
'
});
}

//完善资料表单
function jinsom_update_nickname_form(author_id){
nickname=$('#jinsom-nickname').val();
layer.open({
title:'修改昵称',
btn: false,
type: 1,
resize:false,
area: ['350px'],
skin: 'jinsom-login-form',
content: '\
<div class="jinsom-pop-login-form">\
<li class="username">\
<input placeholder="请输入一个好听的昵称" id="jinsom-pop-username" type="text">\
</li>\
<div class="jinsom-login-btn">\
<span class="ok opacity" onclick="jinsom_update_nickname('+author_id+');">完成设置</span>\
</div>\
</div>\
'
});
}



//==============================do action、执行动作=====================


//弹窗提交登录
function jinsom_pop_login(ticket,randstr){
username=$("#jinsom-pop-username").val();
password=$("#jinsom-pop-password").val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:  jinsom.jinsom_ajax_url+"/action/login.php",
data: {username:username,password:password,ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.closeAll();//关闭弹窗
layer.msg(msg.msg);
function d(){window.location.reload();}setTimeout(d,2000);
}else{
layer.msg(msg.msg);
}
}
});
}

//侧栏提交登录
function jinsom_sidebar_login(ticket,randstr){
username=$("#jinsom-sidebar-username").val();
password=$("#jinsom-sidebar-password").val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:  jinsom.jinsom_ajax_url+"/action/login.php",
data: {username:username,password:password,ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.msg(msg.msg);
function d(){window.location.reload();}setTimeout(d,2000);
}else{
layer.msg(msg.msg);
}
}
});
}

//手机号登录
function jinsom_pop_login_phone(ticket,randstr){
phone=$("#jinsom-pop-phone").val();
code=$("#jinsom-pop-code").val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:  jinsom.jinsom_ajax_url+"/action/login.php",
data: {phone:phone,code:code,ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.closeAll();//关闭弹窗
layer.msg(msg.msg);
function d(){window.location.reload();}setTimeout(d,2000);
}else{
layer.msg(msg.msg);
}
}
});
}

//提交简单注册
function jinsom_pop_reg_simple(ticket,randstr){
username=$('#jinsom-pop-username').val();
password=$('#jinsom-pop-password').val();
if(!$('#jinsom-reg-doc').is(':checked')){layer.msg('请仔细阅读用户注册条款！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,password:password,type:'simple',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);  
if(msg.code==1){ 
function a(){window.location.reload();}setTimeout(a,2000); 
}
}
}); 
}

//提交邮箱注册
function jinsom_pop_reg_mail(ticket,randstr){
username=$('#jinsom-pop-username').val();
mail=$('#jinsom-pop-mail').val();
password=$('#jinsom-pop-password').val();
code=$.trim($('#jinsom-pop-code').val());
if(!$('#jinsom-reg-doc').is(':checked')){layer.msg('请仔细阅读用户注册条款！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,mail:mail,password:password,code:code,type:'email',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);  
if(msg.code==1){ 
function a(){window.location.reload();}setTimeout(a,2000); 
}
}
}); 
}

//提交手机号注册
function jinsom_pop_reg_phone(ticket,randstr){
username=$('#jinsom-pop-username').val();
phone=$('#jinsom-pop-phone').val();
password=$('#jinsom-pop-password').val();
code=$('#jinsom-pop-code').val();
if(!$('#jinsom-reg-doc').is(':checked')){layer.msg('请仔细阅读用户注册条款！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,phone:phone,password:password,code:code,type:'phone',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg); 
if(msg.code==1){
function a(){window.location.reload();}setTimeout(a,2000);  
}
}
}); 
}

//提交邀请码注册
function jinsom_pop_reg_invite(ticket,randstr){
username=$('#jinsom-pop-username').val();
code=$('#jinsom-pop-code').val();
password=$('#jinsom-pop-password').val();

if(!$('#jinsom-reg-doc').is(':checked')){layer.msg('请仔细阅读用户注册条款！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType: 'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,code:code,password:password,type:'reg-invite',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);	
if(msg.code==1){//注册成功
function a(){window.location.reload();}setTimeout(a,2500); 
}
}
});

}


//获取验证码（手机注册、邮箱注册、修改手机号、修改邮箱）
function jinsom_get_code(t,type,ticket,randstr){
if(type=='phone'){
phone=$('#jinsom-pop-phone').val();
if(phone==''){layer.msg('手机号不能为空！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {phone:phone,type:'reg-phone',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){//成功
layer.msg(msg.msg);  
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time(" + i + ","+t+")", i * 1000);
}    
}else{
layer.msg(msg.msg); //失败
}
}
}); 
}else if(type=='email'){
mail=$('#jinsom-pop-mail').val();
if(mail==''){layer.msg('邮箱号不能为空！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {mail:mail,type:'reg-email',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){//成功
layer.msg(msg.msg);  
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time(" + i + ","+t+")", i * 1000);
}    
}else{
layer.msg(msg.msg); //失败
}
}
}); 	
}else if(type=='pass-email'){
user_id=$('#jinsom-pop-password-id').val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {user_id:user_id,type:'pass-email',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){//成功
layer.msg(msg.msg);  
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time(" + i + ","+t+")", i * 1000);
}    
}else{
layer.msg(msg.msg); //失败
}
}
}); 	
}else if(type=='pass-phone'){
user_id=$('#jinsom-pop-password-id').val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {user_id:user_id,type:'pass-phone',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){//成功
layer.msg(msg.msg);  
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time(" + i + ","+t+")", i * 1000);
}    
}else{
layer.msg(msg.msg); //失败
}
}
}); 	
}else if(type=='phone-login'){//手机号登录
phone=$('#jinsom-pop-phone').val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {phone:phone,type:'phone-login',ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){//成功
layer.msg(msg.msg);  
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time(" + i + ","+t+")", i * 1000);
}    
}else{
layer.msg(msg.msg); //失败
}
}
}); 	
}
}

//更新获取验证码的倒计时
function jinsom_reg_update_time(num,t) {
if(num == t) {
$(".jinsom-get-code").val('获取验证码');
$('.jinsom-get-code').attr("disabled",false); 
$('.jinsom-get-code').removeClass('no');
}else {
printnr = t-num;
$(".jinsom-get-code").val('('+ printnr +')重新获取');
$('.jinsom-get-code').addClass('no');
}
}


//提交修改手机号的表单
function jinsom_update_phone(user_id){
phone=$('#jinsom-pop-phone').val();
code=$('#jinsom-pop-code').val();
if(phone==''){layer.msg('请输入手机号！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/phone.php",
data: {user_id:user_id,phone:phone,code:code},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.closeAll();//关闭弹窗
layer.msg(msg.msg); 
$('#jinsom-profile-phone').val(phone);
$('.layui-form-mid.phone i.aa').text('修改');
}else{
layer.msg(msg.msg); 
}
}
});
}

//提交修改邮箱的表单
function jinsom_update_mail(author_id){
mail=$('#jinsom-pop-mail').val();
code=$('#jinsom-pop-code').val();
if(mail==''){layer.msg('请输入邮箱！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/email.php",
data: {author_id:author_id,mail:mail,code:code},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.closeAll();//关闭弹窗
layer.msg(msg.msg); 
$('#jinsom-profile-mail').val(mail);
$('.layui-form-mid.mail i.aa').text('修改');
}else{
layer.msg(msg.msg); 
}
}
});

}




//提交-忘记密码 最后一步
function jinsom_get_password_finish_form(user_id){
style=$('#jinsom-pop-password-style').val();
code=$('#jinsom-pop-code').val();
password=$('#jinsom-pop-password').val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/password.php",
data: {style:style,code:code,password:password,user_id:user_id},
success: function(msg){
layer.closeAll('loading');

if(msg.code==1){
layer.closeAll();
layer.msg(msg.msg);	
function d(){jinsom_login_form('密码登录','login-password',350);}
setTimeout(d,2000);
}else{
layer.msg(msg.msg);	
}

}
}); 

}



//修改昵称后端处理
function jinsom_update_nickname(author_id){
nickname=$.trim($('#jinsom-pop-username').val());
if(nickname==''){layer.msg('请输入你的昵称！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/nickname.php",
data: {nickname:nickname,author_id:author_id},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.closeAll();
layer.msg(msg.msg); 
$('#jinsom-nickname').val(msg.nickname);
}else{
layer.msg(msg.msg); 
}

}
});
}




//修改密码
function jinsom_update_password(user_id){
var password_1= $.trim($('#jinsom-pop-password').val());
var password_2= $.trim($('#jinsom-pop-password-b').val());
if(password_1==''||password_2==''){layer.msg('请输入要修改的密码！'); return false;}
if(password_1!=password_2){layer.msg('两次输入的密码不一样！');return false;}
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/password.php",
data: {pass1:password_1,pass2:password_2,user_id:user_id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg); 
if(msg.code==1){
function d(){layer.closeAll();}setTimeout(d,2000);
}
}

});     
}


//退出登录
function jinsom_login_out(){
layer.confirm('你确定要退出本帐号吗？',{
title:'退出登录',
btnAlign: 'c',
btn: ['确定','按错了'] 
}, function(){
layer.msg('已退出，欢迎再次回来！');
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/update/profile.php",
data: {login_out:1},
success: function(msg){
function d(){window.location.reload();}setTimeout(d,2500);
}
});
});
}


//解绑QQ登录
function jinsom_social_login_off(type,author_id,obj){
title='你确定要解绑'+$(obj).parents('.jinsom-binding-social').prev().text()+'吗？';
layer.confirm(title, {
title:'解除绑定',
btnAlign: 'c',
btn: ['确定','取消'] 
}, function(){
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/social-login-off.php",
data: {type:type,author_id:author_id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$(obj).parents('.jinsom-binding-social').empty();	
}
}
});    
});
}