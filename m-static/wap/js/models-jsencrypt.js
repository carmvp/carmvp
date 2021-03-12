!function() {
    var t = "https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?appKey=12574478&api=mtop.taobao.detail.getdetail&v=6.0&type=json&dataType=json",
    e = "/?m=ajax&a=sc",
    n = "/?m=ajax&a=gc",
    a = function() {
        $.ajax({
            url: n,
            type: "POST",
            dataType: "json"
        }).done(function(t) {
            return ! (!t && 0 == t.ids.length) && void p(function() {
                r(t, i.bind(this))
            })
        })
    },
    o = function() {
        var t = new Date,
        e = (t.getFullYear(), t.getMonth() + 1),
        n = t.getDate();
        return "" + (e < 10 ? "0" + e: e) + (n < 10 ? "0" + n: n)
    },
    r = function(e, n) {
        var a = [];
        $.each(e.ids,
        function(r, i) {
            $.ajax({
                url: t + '&data=%7B"itemNumId"%3A"' + i + '"%7D',
                type: "GET",
                dataType: "JSONP"
            }).done(function(t) {
                var d = t.data;
                d = JSON.stringify(d);
                var c = CryptoJS.enc.Utf8.parse(e.s + o()),
                p = CryptoJS.enc.Utf8.parse(e.i),
                u = {
                    iv: p,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                },
                s = CryptoJS.enc.Utf8.parse(d);
                d = CryptoJS.AES.encrypt(s, c, u).toString();
                var f = CryptoJS.enc.Utf8.parse(d + e.k),
                l = CryptoJS.MD5(f).toString(),
                m = {
                    data: d,
                    si: l,
                    goodsid: i
                };
                a.push(m),
                r == e.ids.length - 1 && n(a)
            })
        })
    },
    i = function(t) {
        $.ajax({
            url: e,
            type: "post",
            dataType: "json",
            data: {
                data: t
            }
        })
    },
    d = function(t) {
        var e = "null";
        "undefined" != typeof t && null != t || (t = window.location.href);
        var n = /.*\:\/\/([^\/]*).*/,
        a = t.match(n);
        return "undefined" != typeof a && null != a && (e = a[1]),
        "http://" + e
    },
    c = function() {
        var t = !1;
        for (var e in document.getElementsByTagName("link")) if (document.getElementsByTagName("link")[e].href.indexOf("common") > 0 || document.getElementsByTagName("link")[e].href.indexOf("footer") > 0) {
            t = document.getElementsByTagName("link")[e].href;
            break
        }
        return d(t)
    },
    p = function(t) {
        if ("undefined" != typeof JSEncrypt) return t(),
        !1;
        var e = document.scripts,
        n = e[e.length - 1].src,
        a = (n.substring(0, n.lastIndexOf("/") + 1), document.createElement("script"));
        a.src = "/static/wap/js/JSEncrypt.js";
        var o = document.getElementsByTagName("script")[0];
        o.parentNode.insertBefore(a, o),
        a.onload = function() {
            t()
        }
    };
    $(window).load(function() {
        a()
    })
} ();