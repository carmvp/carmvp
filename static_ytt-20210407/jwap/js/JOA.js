var JOA = {
    n:0,
    browser:{
        v: (function(){
            var u = navigator.userAgent, app = navigator.appVersion, p = navigator.platform;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                UCB: u.match(/UCBrowser/i) == "UCBrowser",
                QQB: u.match(/MQQBrowser/i) == "MQQBrowser",
                win: p.indexOf('Win') > -1,//判断是否是WIN操作系统
                mac: p.indexOf('Mac') > -1//判断是否是Mac操作系统

            };
        })()
    },
    //设置应用打开地址和下载地址
    setAppInfo:{
        iosUrl : "juanpi://m.juanpi.com/", //ios应用地址
        androidUrl : "juanpi://m.juanpi.com/", //android应用地址
        download:true, //下载开关
        downloadUrl : "http://a.app.qq.com/o/simple.jsp?pkgname=com.juanpi.ui" //应用下载地址
    },
    //使用iframe打开手机上的应用
    iframe2open:function(){
        this.n = (new Date).getTime();
        var i = document.createElement("iframe");
            i.src = this.browser.v.ios ? this.setAppInfo.iosUrl : this.setAppInfo.androidUrl;
            i.style.display = "none";
            document.body.appendChild(i);
    },
    //打开成功进入应用，失败就进入下载页面
    jump2download:function(){
        var t = null;
        clearTimeout(t);
        t = setTimeout(function () {
            var s = (new Date).getTime();
            if(400 >= s-JOA.n && JOA.setAppInfo.download === true){
                window.location = JOA.setAppInfo.downloadUrl;
            }
        }, 200);
    }
};