!function($wui) {
    $wui.cache.version = $('meta[name="version"]').attr("version") || "1.1.0",
    jQuery.fn.isChildAndSelfOf = function(e) {
        return this.closest(e).length > 0
    };
    var $cmsApi = {
		isWebp: function () {
            try {
                return 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") ? "_.webp" : ""
            } catch (e) {
                return ""
            }
        }(),
		getActivityConfig: function(item, text, type) {
            if (!item.market_group) return ! 1;
            var ActivityConfig = eval("(" + window.ActivityConfig + ")");
            return ActivityConfig = ActivityConfig[item.market_group[0]] ? ActivityConfig[item.market_group[0]] : ActivityConfig[item.market_group[0]],
            !(!ActivityConfig || 1 != parseInt(ActivityConfig.single_wap_label_switch)) && (ActivityConfig.goods_label_max = '<div class="act-label act_b_l"><p><img src="' + ActivityConfig.normal_label + '" />' + (text ? "<span>" + text + "</span>": "") + "</p></div>", ActivityConfig.goods_label_min = '<div class="act-label act_b_l"><p><img style="max-width:50%;" src="' + ActivityConfig.small_label + '" /></p></div>', ActivityConfig.goods_label_lm_min = '<div class="act-label act_b_l"><p><img style="max-width:50%;" src="' + ActivityConfig.not_column_label + '" /></p></div>', ActivityConfig.goods_label_bd_mx = '<div class="act-label act_b_l"><p><img src="https://img.alicdn.com/imgextra/i3/2053469401/O1CN01a6Eivg2JJhyjaIOD8_!!2053469401.png" /><span class="bd" >' + text + "</span></p></div>", ActivityConfig.goods_label_hd_min = '<div class="act-label act_b_l"><p><img style="max-width:50%;" src="' + ActivityConfig.active_label_wap + '" /></p></div>', type && "redPacket" === type && (item.red_packet || item.redPacket) && (ActivityConfig.goods_label_red_packet = '<div class="act-red-packet act_t_r"><p>￥' + (item.red_packet || item.redPacket) + "红包</p></div>"), ActivityConfig)
        },
        checkWebp: function () {
            return this.isWebp
        },
        setMtaCookie: function(e, t) {
            if (e = e || "MTA-USER-ID", t = t || 365, this.getMtaCookie()) return this.getMtaCookie();
            var i = t,
            a = new Date;
            a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3),
            document.cookie = e + "=" + escape(function() {
                for (var e = "",
                t = 0; t < 4; t++) e += parseInt(1e8 * Math.random());
                return e
            } ()) + ";expires=" + a.toGMTString()
        },
        getMtaCookie: function(e) {
            if (this.getCookie("trace_id")) return this.getCookie("trace_id");
            e = e || "MTA-USER-ID";
            var t, i = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return !! (t = document.cookie.match(i)) && unescape(t[2])
        },
        setCookie: function(e, t, i) {
            var a = i,
            o = new Date;
            console.log(o.getTime() + 24 * a * 60 * 60 * 1e3),
            o.setTime(o.getTime() + 24 * a * 60 * 60 * 1e3),
            document.cookie = e + "=" + escape(t) + ";expires=" + o.toGMTString()
        },
        getCookie: function(e) {
            var t, i = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return !! (t = document.cookie.match(i)) && unescape(t[2])
        },
        delCookie: function(e) {
            var t = new Date;
            t.setTime(t.getTime() - 1);
            var i = this.getCookie(e);
            null != i && (document.cookie = e + "=" + i + ";expires=" + t.toGMTString())
        },
        copy: function(e, t) {
            var i = function() {
                function e(e, i) {
                    return t(e) === i
                }
                function t(e) {
                    return i[Object.prototype.toString.call(e)] || "object"
                }
                var i = {};
                return ["Null", "Undefined", "Number", "Boolean", "String", "Object", "Function", "Array", "RegExp", "Date"].forEach(function(e) {
                    i["[object " + e + "]"] = e.toLowerCase()
                }),
                {
                    isType: e,
                    getType: t
                }
            } ();
            if (null === e || "object" != typeof e) return e;
            var a, o, n, r = i.isType(e, "array") ? [] : {};
            for (a in e) o = e[a],
            n = i.getType(o),
            !t || "array" !== n && "object" !== n ? r[a] = o: r[a] = this.copy(o);
            return r
        },
        getParam: function(e) {
            if (paramValue = "", isFound = !1, 0 == window.location.search.indexOf("?") && window.location.search.indexOf("=") > 1) for (arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"), i = 0; i < arrSource.length && !isFound;) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == e.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0),
            i++;
            return "" == paramValue && (paramValue = null),
            paramValue
        },
        localStorage: function(time) {
            var Days = time || .5,
            exp = new Date;
            if (exp.setTime(exp.getTime() + 24 * Days * 60 * 60 * 1e3), exp = exp.getTime(), window.localStorage) try {} catch(e) {
                return layer.msg("亲，无痕模式无法使用此功能！"),
                !1
            }
            var ret = {
                setLocalStorage: function(e, t) {
                    return window.localStorage.setItem("LOCAL_" + e, JSON.stringify({
                        time: exp,
                        data: t
                    }))
                },
                getLocalStorage: function(key) {
                    return eval("(" + window.localStorage.getItem("LOCAL_" + key) + ")")
                },
                removeLocalStorage: function(e) {
                    return window.localStorage.removeItem("LOCAL_" + e)
                },
                removeLocalStorageAll: function() {
                    for (var e in window.localStorage)"LOCAL" == e.split("_")[0] && this.removeLocalStorage(e)
                }
            };
            for (var i in window.localStorage) if ("LOCAL" == i.split("_")[0]) {
                var item = eval("(" + window.localStorage[i] + ")");
                item.time - (new Date).getTime() <= 0 && ret.removeLocalStorage(i)
            }
            return ret
        },
        loaditem: [],        
        digitalAbbNumber: function(e) {
            if ((e + "").indexOf("万") >= 0) return e;
            if (e < 1e4) return e;
            var t = [],
            i = 0;
            e = (e || 0).toString().split("");
            for (var a = !1,
            o = e.length - 1; o >= 0; o--) i++,
            a && t.unshift(e[o]),
            i % 4 || 0 == o || a || (t.unshift(e[o]), t.unshift("."), a = !0);
            return ("0" != t[2] ? t.join("") : function() {
                var e = "",
                i = !0;
                return $.each(t,
                function(t, a) {
                    "." != a && i && (e += a, i = !1)
                }),
                e
            } ()) + "万"
        },
        loadProgress: 100,
        loadAnimation: function(e) {
            var t = $('<div class="ui_load"><p></p></div><div class="ui_load_bg"></div>');
            0 == $(".ui_load").length && $("body").append(t);
            var i = e < 50 ? 3e3: e < 80 ? 800 : 200;
            return $(".ui_load").find("p").animate({
                width: e + "%"
            },
            i),
            e == this.loadProgress && setTimeout(function() {
                $(".ui_load,.ui_load_bg").fadeOut("400",
                function() {
                    $(this).remove()
                })
            },
            800),
            t
        },
        getTime: function(e) {
            return this.ajax({
                url: "/?m=ajax&a=now"
            }).done(function(t) {
                e(t.data.time)
            })
        },
		javaAjax: function (e, t) {
            e = $.extend(!0, {
                type: "GET",
                dataType: "JSON"
            }, e);
            return e.data = e.data || {}, $.ajax(e).done(function (e) {
                t ? t(e) : 0 != e.code && e.code != -1 && e.msg && "ok" != e.msg && "" != e.msg && layer.msg(e.msg)
            }).error(function () {
                $cmsApi.loadAnimation(100), console.log("请求失败地址：" + e.url), layer.msg && layer.msg("服务器繁忙请稍后再试！")
            })
        },
		postAjax: function (e, t) {
            e = $.extend(!0, {
                type: "POST",
                dataType: "JSON"
            }, e);
            return e.data = e.data || {}, $.ajax(e).done(function (e) {
                t ? t(e) : 0 != e.code && e.code != -1 && e.msg && "ok" != e.msg && "" != e.msg && layer.msg(e.msg)
            }).error(function () {
                $cmsApi.loadAnimation(100), console.log("请求失败地址：" + e.url), layer.msg && layer.msg("服务器繁忙请稍后再试！")
            })
        },
		jsonAjax: function (e, t) {
            e = $.extend(!0, {
                dataType: 'jsonp',
                jsonp: 'callback',
            }, e);
            return e.data = e.data || {}, $.ajax(e).done(function (e) {
                t ? t(e) : 0 != e.ret[0] && e.ret[0] != -1 && e.ret[0] && "SUCCESS::调用成功" != e.ret[0] && "" != e.ret[0] && layer.msg(e.msg)
            }).error(function () {
                $cmsApi.loadAnimation(100), console.log("请求失败地址：" + e.url), layer.msg && layer.msg("服务器繁忙请稍后再试！")
            })
        },
		getJson: function(e) {
            e = $.extend(!0, {
                type: "GET",
                dataType: "JSON"
            }, e);
            return e.data = e.data || {}, $.ajax(e).done(function (e) {
                t ? t(e) : 0 != e.code && e.code != -1 && e.msg && "ok" != e.msg && "" != e.msg && layer.msg(e.msg)
            }).error(function () {
                
            })
        },
        ajax: function(e, t) {
            return e = $.extend(!0, {
                type: "GET",
                dataType: "JSON"
            },
            e),
            $.ajax(e).done(function(e) {
                t ? t(e) : "undefined" != typeof e.status && e.msg && 1 != e.status && "ok" != e.msg && "" != e.msg && (40003 == e.code ? (layer.msg(e.msg), $cmsApi.delCookie("TOKEN"), window.location.href = "/?m=user&a=login") : 40007 == e.code ? $cmsApi.delCookie("TOKEN") : layer.msg(e.msg))
            }).error(function() {
                $cmsApi.loadAnimation(100),
                console.log("请求失败地址：" + e.url),
                layer.msg && layer.msg("服务器繁忙请稍后再试！")
            })
        },
        setLoadItem: function(e, t) {
            var i = 0;
            for (var a in this.loaditem) i > 15 && this.loaditem.splice(0, 1),
            i++;
            this.loaditem.push({
                key: e,
                item: t
            });
            var o = new Date;
            if (localStorage) try {
                localStorage.setItem("LOCAL-STORAGE-ITEM", JSON.stringify({
                    time: o.getTime(),
                    data: this.loaditem
                }))
            } catch(n) {}
            return this.loaditem[e]
        },
        getLoadItem: function(id) {
            var ret, loaditem = this.loaditem;
            if (localStorage) try {
                var item = eval("(" + localStorage.getItem("LOCAL-STORAGE-ITEM") + ")"),
                time = new Date;
                loaditem = item ? time.getTime() - item.time > 1e5 ? this.loaditem: item.data: this.loaditem,
                this.loaditem = loaditem
            } catch(e) {}
            for (var key in loaditem) loaditem[key].key == id && (ret = loaditem[key].item);
            return ret
        },
		goodsJavaListTpl: function(e, t, i, a) {
            t = t ||  "/?m=item&a=index";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) {
                e[n].tmall = e[n].tmall || e[n].istmall;
                var s = 1 == e[n].tmall ? "天猫价": "淘宝价",
                l = $cmsApi.getActivityConfig(e[n], e[n].normalLabelText, "redPacket");
                o = o + '<li class="col-12-6"  >    <div class="cent">        <a style="height:' + ($(window).width() / 2 - 7) + 'px;" href="' + e[n].jump_url  + '" class="img ui-act-label">' + (l ? l.goods_label_max: "") + (l && (e[n].red_packet || e[n].redPacket) ? l.goods_label_red_packet: "") + '<img class="lazy" ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + e[n].pic + "_310x310.jpg" + $cmsApi.checkWebp() + '" alt=""></a>        <div class="mar">            <a  href="' + e[n].jump_url + '" ><h3 class="bt ' + (1 == e[n].tmall ? "tianmao": "taobao") + '">' + e[n].title  + '</h3></a>            <div class="row-s num" style="opacity: ' + (0 != e[n].quan ? "1": "0") + ';">                <div class="col-12-6">' + (l ? l.base_price: s) + " ￥" + e[n].yuanjia + '</div>                <div class="col-12-6 text-right">' + (l ? l.base_sale_num_text: "已售") + '<span class="col-red" >' + this.digitalAbbNumber(e[n].xiaoliang) + '</span>件</div>            </div>            <div class="row-s but">                <div class="col-12-6 money">                    <span>' + (l ? l.base_price_text: 0 != parseFloat(e[n].quan) ? "券后价": s) + "&nbsp;￥</span>" + (l ? e[n].jiage: this.accSub(e[n].yuanjia, e[n].quan)) + "                </div>" + (0 != parseFloat(e[n].quan) ? '                <div class="col-12-6 ">                    <span class="quan"><i>' + parseFloat(e[n].quan) + "元券</i></span>                </div>": '<div class="col-12-6 text-right">                    <span class="xl">' + (l ? l.base_sale_num_text: "已售") + this.digitalAbbNumber(e[n].xiaoliang) + "</span>                </div>") + "            </div>        </div>    </div></li>"
            }
            return o
        },
        goodsJavaListTplTwo: function(e, t, i, a) {
            t = t || window.location.pathname + "?r=p/d";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) {
                var s = 1 == e[n].tmall ? "天猫价": "淘宝价",
                l = $cmsApi.getActivityConfig(e[n], e[n].normalLabelText, "redPacket");
                o = o + '<li id="cms-goods-items_' + e[n].id + '"  class="row-s"><a ui-jsbridge data-params="{ jump_type: 1,jump_value:' + e[n].id + '}"  href="' + (e[n].jump_url ? e[n].jump_url: t + "&id=" + e[n].id + (a ? "&source=" + a: "")) + (e[n].is_type ? "&type=" + e[n].is_type: "") + '" >    <div  class="img ui-act-label" >' + (l ? l.goods_label_min: "") + '<img ui-lazyload src="' + (i || $wui.cache.host) + '/web/images/rolling.gif" data-original="' + e[n].pic + "_310x310.jpg" + $cmsApi.checkWebp() + '" alt="">' + (e[n].goodsTag && "" != e[n].goodsTag ? '<span class="goods_tag">' + e[n].goodsTag + "</span>": "") + '</div>    <div class="cent">        <h3 class="' + (1 == e[n].tmall ? "tianmao": "taobao") + '">' + (e[n].dtitle && "" != e[n].dtitle ? e[n].dtitle: e[n].title) + '</h3>        <div class="num col-aaa " style="opacity: ' + (0 != e[n].quanJine ? "1": "0") + ';" >            <span>' + (l ? l.base_price_text: s) + " ￥" + e[n].yuanjia + '</span><span class="fr">' + (l ? l.base_sale_num_text: "已售") + '<b class="col-red" >' + this.digitalAbbNumber(e[n].xiaoliang) + '</b>件</span>        </div>        <div class=" money col-money">' + (0 != parseFloat(e[n].quanJine) ? '<p class="quan fr"><i>' + parseFloat(e[n].quanJine) + "元券</i></p>": '<p class="xiaoliang fr">' + (l ? l.base_sale_num_text: "已售") + '<span class="col-red">' + this.digitalAbbNumber(e[n].xiaoliang) + "</span>件</p>") + (l ? l.base_price_text: 0 != parseFloat(e[n].quanJine) ? "券后价": s) + ' <span class=""><i>￥</i>' + (l ? e[n].jiage: this.accSub(e[n].yuanjia, e[n].quanJine)) + "</span>        </div>    </div></a></li>"
            }
            return o
        },
		goodsListLabelTpl: function(e, t, i, a) {
            t = t || window.location.pathname + "?r=p/d";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) {
                var s = function() {
                    var t = e[n].label || e[n].labelTwo,
                    i = "";
                    return "object" != typeof t && t && (t = t.split(",")),
                    $.each(t,
                    function(e, t) {
                        i += t.title ? '<span class="activity_label label' + t.type + '">' + t.title + "</span>": '<span class="activity_label label1">' + t + "</span>"
                    }),
                    i
                } (),
                l = $cmsApi.getActivityConfig(e[n], e[n].normal_label_text, "redPacket"),
                r = l ? l.base_price: 1 == e[n].istmall ? "天猫价": "淘宝价";
                o = o + '<li class="col-12-6 label_tpl" id="cms-goods-items_' + e[n].id + '" >    <div class="cent">        <a ui-jsbridge data-params="{ jump_type: 1,jump_value:' + e[n].id + '}" ' +
                function() {
                    var t = "";
                    if (!e[n].tongji) return t;
                    for (var i in e[n].tongji) t = t + "data-" + i + "='" + e[n].tongji[i] + "' ";
                    return t + "ui-utm"
                } () + '  style="height:' + ($(window).width() - 15) / 2 + 'px;" href="' + (e[n].jump_url ? e[n].jump_url: t + "&id=" + e[n].id + (a ? "&source=" + a: "")) + (e[n].is_type ? "&type=" + e[n].is_type: "") + '" class="img ui-act-label ">' + (l ? l.goods_label_max: "") + (l && (e[n].red_packet || e[n].redPacket) ? l.goods_label_red_packet: "") + '<img class="lazy" ui-lazyload src="' + (i || $wui.cache.host) + '/web/images/rolling.gif" data-original="' + e[n].pic + "_310x310.jpg" + $cmsApi.checkWebp() + '" alt=""></a>        <div class="mar">            <a ui-jsbridge data-params="{ jump_type: 1,jump_value:' + e[n].id + '}"  href="' + (e[n].jump_url ? e[n].jump_url: t + "&id=" + e[n].id + (a ? "&source=" + a: "")) + (e[n].is_type ? "&type=" + e[n].is_type: "") + '" ><h3 class="bt ' + (1 == e[n].istmall ? "tianmao": "taobao") + '">' + e[n].d_title + '</h3><div class="huodong_label">' + s + '</div></a>            <div class="row-s num" style="opacity: ' + (0 != e[n].quan_jine ? "1": "0") + ';">                <div class="col-12-6">' + r + " ￥" + e[n].yuanjia + '</div>                <div class="col-12-6 text-right">' + (l ? l.base_sale_num_text: "已售") + '<span class="col-red">' + this.digitalAbbNumber(e[n].xiaoliang) + '</span></div>            </div>            <div class="row-s but">                <div class="col-12-6 money">                    <span>' + (l ? l.base_price_text: 0 != parseFloat(e[n].quan_jine) ? "券后价": r) + "&nbsp;￥</span>" + (l ? e[n].jiage: this.accSub(e[n].yuanjia, e[n].quan_jine)) + "                </div>" + (0 != parseFloat(e[n].quan_jine) ? '                <div class="col-12-6 ">                    <span class="quan"><i>' + parseFloat(e[n].quan_jine) + "元券</i></span>                </div>": '<div class="col-12-6 text-right">                    <span class="xl">' + (l ? l.base_sale_num_text: "已售") + this.digitalAbbNumber(e[n].xiaoliang) + "</span>                </div>") + "            </div>        </div>    </div></li>"
            }
            return o
        },
        goodsListLabelTplTwo: function(e, t, i, a) {
            t = t || window.location.pathname + "?r=p/d";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) {
                var s = function() {
                    var t = e[n].label.length && [].concat(e[n].label) || [],
                    i = '<div class="activity_group" ui-delete-overflow data-len="1" style="display:inline;">';
                    return (e[n].red_packet || e[n].redPacket) && t.unshift({
                        type: "11",
                        title: "付定再返" + (e[n].red_packet || e[n].redPacket) + "元红包"
                    }),
                    $.each(t,
                    function(e, t) {
                        i += '<span class="activity_label label' + t.type + '">' + t.title + "</span>"
                    }),
                    i += "</div>"
                } (),
                l = $cmsApi.getActivityConfig(e[n], e[n].normal_label_text, "redPacket"),
                r = l ? l.base_price: 1 == e[n].istmall ? "天猫价": "淘宝价";
                o = o + '<li class="label_tpl" id="cms-goods-items_' + e[n].id + '"  class="row-s"><a ui-jsbridge data-params="{ jump_type: 1,jump_value:' + e[n].id + '}"  href="' + (e[n].jump_url ? e[n].jump_url: t + "&id=" + e[n].id + (a ? "&source=" + a: "")) + (e[n].is_type ? "&type=" + e[n].is_type: "") + '" >    <div  class="img ui-act-label" >' + (l ? l.goods_label_min: "") + '<img ui-lazyload src="' + (i || $wui.cache.host) + '/web/images/rolling.gif" data-original="' + e[n].pic + "_310x310.jpg" + $cmsApi.checkWebp() + '" alt="">' + (e[n].goods_tag && "" != e[n].goods_tag ? '<span class="goods_tag">' + e[n].goods_tag + "</span>": "") + '</div>    <div class="cent">       <h3 class="' + (1 == e[n].istmall ? "tianmao": "taobao") + '">' + e[n].d_title + "</h3>" + s + '        <div class="num col-aaa " style="opacity: ' + (0 != e[n].quan_jine ? "1": "0") + ';" >            <span>' + r + " ￥" + e[n].yuanjia + '</span><span class="fr">' + (l ? l.base_sale_num_text: "已售") + '<b class="col-red" >' + this.digitalAbbNumber(e[n].xiaoliang) + '</b>件</span>        </div>        <div class=" money col-money">' + (0 != parseFloat(e[n].quan_jine) ? '<p class="quan fr"><i>' + parseFloat(e[n].quan_jine) + "元券</i></p>": '<p class="xiaoliang fr">' + (l ? l.base_sale_num_text: "已售") + '<span class="col-red">' + this.digitalAbbNumber(e[n].xiaoliang) + "</span>件</p>") + (l ? l.base_price_text: 0 != parseFloat(e[n].quan_jine) ? "券后价": r) + ' <span class=""><i>￥</i>' + (l ? e[n].jiage: this.accSub(e[n].yuanjia, e[n].quan_jine)) + "</span>        </div>    </div></a></li>"
            }
            return o
        },
        goodsListTpl: function(e, t, i, a) {
            t = t ||  "/?m=item&a=index";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) o = o + '<li class="col-12-6" >    <div class="cent">        <a  ' +
            function() {
                var t = "";
                if (!e[n].tongji) return t;
                for (var i in e[n].tongji) t = t + "data-" + i + "='" + e[n].tongji[i] + "' ";
                return t + "ui-utm"
            } () + ' style="height:' + $(window).width() / 2 + 'px;" href="' + (e[n].jump_url ? e[n].jump_url: t + "&iid=" + e[n].id) + '" class="img"><img class="lazy" ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + e[n].pic + '_310x310.jpg" alt=""></a>        <div class="mar">            <a  href="' + (e[n].jump_url ? e[n].jump_url: t + "&iid=" + e[n].id ) + '" ><h3 class="bt">' + e[n].d_title + '</h3></a>            <div class="row-s num">                <div class="col-12-6">' + (1 == e[n].istmall ? " 天猫价 ￥" + e[n].yuanjia: "淘宝价 ￥" + e[n].yuanjia) + '</div>                <div class="col-12-6 text-right">已售' + this.digitalAbbNumber(e[n].xiaoliang) + '</div>            </div>            <div class="row-s">                <div class="col-12-6 money">                    <span>券后&nbsp;￥</span>' + this.accSub(e[n].yuanjia, e[n].quan_jine) + '                </div>                <div class="col-12-6">                    <span class="quan"><i>' + parseFloat(e[n].quan_jine) + "元券</i></span>                </div>            </div>        </div>    </div></li>";
            return o
        },
		goodsListTplpdd: function(e, t, i, a) {
            t = t ||  "/?m=detail&a=index";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) o = o + '<li class="col-12-6" >    <div class="cent">        <a ' +
            function() {
                var t = "";
                if (!e[n].tongji) return t;
                for (var i in e[n].tongji) t = t + "data-" + i + "='" + e[n].tongji[i] + "' ";
                return t + "ui-utm"
            } () + ' style="height:' + $(window).width() / 2 + 'px;" href="' + (e[n].jump_url ? e[n].jump_url: t + "&id=" + e[n].id ) + '" class="img"><img class="lazy" ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + e[n].pic + '" alt=""></a>        <div class="mar">            <a  href="' + (e[n].jump_url ? e[n].jump_url: t + "&id=" + e[n].id) + '" ><h3 class="bt">' + e[n].d_title + '</h3></a>            <div class="row-s num">                <div class="col-12-6">原售价 ￥' + e[n].yuanjia + '</div>                <div class="col-12-6 text-right">已售' + this.digitalAbbNumber(e[n].xiaoliang) + '</div>            </div>            <div class="row-s">                <div class="col-12-6 money">                    <span>券后价&nbsp;￥</span>' + e[n].jiage + '                </div>                <div class="col-12-6">                    <span class="quan"><i>' + parseFloat(e[n].quan_jine) + "元券</i></span>                </div>            </div>        </div>    </div></li>";
            return o
        },
        goodsListTplIndex: function(e, t, i, a) {
            t = t || "/?m=item&a=index";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) o = o + '<li class="row-s"><a  href="' + (e[n].jump_url ? e[n].jump_url: t + "&iid=" + e[n].id ) + '" >    <p  class="img"><img ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + e[n].pic + '_310x310.jpg" alt=""></p>    <div class="cent">        <h3 style="margin-bottom:0" class="'+e[n].type+'">' + e[n].d_title + '</h3>    ' + (t[n].commission ? '<div><span style="font-size:12px;border: 1px solid #fe4a65;color:#fe4a65;padding:0 3px;">最高返' + e[n].commission +'元<span></div>' : '') + '    <div class="num col-aaa " style="padding-top:.5rem">            <span>' + (1 == e[n].istmall ? " 天猫价 ￥" + e[n].yuanjia: "淘宝价 ￥" + e[n].yuanjia) + '</span><span class="fr">已售' + this.digitalAbbNumber(e[n].xiaoliang) + '件</span>        </div>        <div class=" money col-money">        <p class="quan fr"><i>' + parseFloat(e[n].quan_jine) + '元券</i></p>券后价 <span class=""><i>￥</i>' + this.accSub(e[n].yuanjia, e[n].quan_jine) + "</span>        </div>    </div></a></li>";
            return o
        },
		goodsListTplTwo: function(e, t, i, a) {
            t = t || "/?m=item&a=index";
            for (var o = "",
            n = 0; n <= e.length - 1; n++) o = o + '<li class="row-s"><a  href="' + (e[n].jump_url ? e[n].jump_url: t + "&iid=" + e[n].id ) + '" >    <p  class="img"><img ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + e[n].pic + '_310x310.jpg" alt="">' + (e[n].goods_tag && "" != e[n].goods_tag ? '<span class="goods_tag">' + e[n].goods_tag + "</span>": "") + '</p>    <div class="cent">        <h3 class="'+e[n].type+'">' + e[n].d_title + '</h3>        <div class="num col-aaa ">            <span>' + (1 == e[n].istmall ? " 天猫价 ￥" + e[n].yuanjia: "淘宝价 ￥" + e[n].yuanjia) + '</span><span class="fr">已售' + this.digitalAbbNumber(e[n].xiaoliang) + '件</span>        </div>        <div class=" money col-money">        <p class="quan fr"><i>' + parseFloat(e[n].quan_jine) + '元券</i></p>券后价 <span class=""><i>￥</i>' + this.accSub(e[n].yuanjia, e[n].quan_jine) + "</span>        </div>    </div></a></li>";
            return o
        },
		articleListTplTwo: function(e, t, i, a) {            
            for (var o = "",
            n = 0; n <= e.length - 1; n++) o = o + '<li class="row-s"><a  href="' + e[n].jump_url + '" >    <p  class="img"><img ui-lazyload src="/static/wap/images/rolling.gif" data-original="' + e[n].pic + '" alt=""></p>    <div class="cent">        <h3 style="height: 1.5rem;margin-bottom: .4rem;">' + e[n].title + '</h3>        <div class="num col-aaa " style="height: 3.6rem;overflow: hidden;padding-top: 0;line-height: 1.3rem;display: -webkit-box;white-space: normal;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">' + e[n].seo_desc + '</div>        <div class=" money col-money" style="    position: absolute;top: 7rem;width: 100%;"><p class="fr" style="display:inline-block;height:22px;line-height:22px;padding:0 10px;background-color:#FF5722;color: #fff;white-space:nowrap;text-align:center;font-size:12px;border:none;border-radius:2px;cursor: pointer;margin-right:15px;margin-top: -5px;">浏览>></p><span style="font-size:.5rem">' + e[n].add_time + "</span></div>    </div></a></li>";
            return o
        },
        accSub: function(e, t) {
            var i, a, o, n;
            try {
                i = e.toString().split(".")[1].length
            } catch(r) {
                i = 0
            }
            try {
                a = t.toString().split(".")[1].length
            } catch(r) {
                a = 0
            }
            return o = Math.pow(10, Math.max(i, a)),
            n = i >= a ? i: a,
            ((e * o - t * o) / o).toFixed(n)
        },
        accAdd: function(e, t) {
            var i, a, o, n;
            try {
                i = e.toString().split(".")[1].length
            } catch(r) {
                i = 0
            }
            try {
                a = t.toString().split(".")[1].length
            } catch(r) {
                a = 0
            }
            if (n = Math.abs(i - a), o = Math.pow(10, Math.max(i, a)), n > 0) {
                var c = Math.pow(10, n);
                i > a ? (e = Number(e.toString().replace(".", "")), t = Number(t.toString().replace(".", "")) * c) : (e = Number(e.toString().replace(".", "")) * c, t = Number(t.toString().replace(".", "")))
            } else e = Number(e.toString().replace(".", "")),
            t = Number(t.toString().replace(".", ""));
            return (e + t) / o
        },
        accMul: function(e, t) {
            var i = 0,
            a = e.toString(),
            o = t.toString();
            try {
                i += a.split(".")[1].length
            } catch(n) {}
            try {
                i += o.split(".")[1].length
            } catch(n) {}
            return Number(a.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, i)
        },
        accDiv: function(arg1, arg2) {
            var t1 = 0,
            t2 = 0,
            r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length
            } catch(e) {}
            try {
                t2 = arg2.toString().split(".")[1].length
            } catch(e) {}
            with(window.Math) return r1 = Number(arg1.toString().replace(".", "")),
            r2 = Number(arg2.toString().replace(".", "")),
            r1 / r2 * pow(10, t2 - t1)
        },
        scrolltop: function() {
            $("body").append('<a class="iconfont icon-shang scroll_top"></a>');
            var e = $(window).height(),
            t = $(".layout").css("paddingBottom");
            $(".scroll_top").css({
                bottom: t
            }),
            $(document).scroll(function(t) {
                $(document).scrollTop() > e + e / 2 ? ($(".scroll_top").addClass("active"), $(".tmall_home_tab").css({
                    "-webkit-transform": " translateY(-50px) translateX(0)",
                    transform: "translateY(-50px) translateX(0)",
                    transition: "all .4s ease 0s",
                    "-webkit-transition": "all .4s ease 0s"
                })) : ($(".scroll_top").removeClass("active"), $(".tmall_home_tab").css({
                    "-webkit-transform": " translateY(0px) translateX(0)",
                    transform: "translateY(0px) translateX(0)",
                    transition: "all .4s ease 0s",
                    "-webkit-transition": "all .4s ease 0s"
                }))
            }),
            $(".scroll_top").click(function(e) {
                $("body,html").animate({
                    scrollTop: 0
                },
                400)
            })
        }
    };
    $wui.uses(["layer", "swiper"]).directive("ui-search",
    function() {
        return {
            uses: ["models-search.js"],
            scope: {
                kw: "kw",
                callback: "~callback"
            },
            link: function(e) {
                if ($(e.element).attr("isLoad")) return ! 1;
                $(e.element).attr("isLoad", !0);
                var t = e.scope,
                i = e.element;
                $wui.modelsUiSearch.init(t, i)
            }
        }
    }).directive("ui-hover",
    function() {
        return {
            scope: {
                list: "list"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                $(i).find(t.list).hover(function() {
                    $(i).find(t.list).removeClass("cur"),
                    $(this).addClass("cur"),
                    $(this).addClass("active")
                },
                function() {
                    $(this).removeClass("active")
                })
            }
        }
    }).directive("ui-show-pdd",
    function() {
        return {
            scope: {
                parents: "parents",
                "class": "css",
                active: "active"				
            },
            link: function(e) {
                var t = e.scope,
                i = e.element,
                a = function(e) {
                    return t["class"] ? $(t["class"]) : $(e).parents(t.parents || "div")
                };
                $(i).unbind("click").on("click",
                function() {					
					var e = this;
                    0 != t.active ? $(this).toggleClass("active") : $(this).removeClass("active"),
                    $(document).unbind("click").on("click",
                    function() {
                        $(event.target).isChildAndSelfOf(e, a(e)) || ($(e).removeClass("active"), a(e).removeClass("active"))
                    }),
                    a(this).toggleClass("active")						
                    
                })
            }
        }
    }).directive("ui-show",
    function() {
        return {
            scope: {
                parents: "parents",
                "class": "css",
                active: "active",
				money:"=money"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element,
                a = function(e) {
                    return t["class"] ? $(t["class"]) : $(e).parents(t.parents || "div")
                };
                $(i).unbind("click").on("click",
                function() {
					if(!yangtataER.uid  && $.cookie("mustlogin") == null && yangtataER.isdaili ==1){
					layer.open({
					type: 1
					,title: false
					,closeBtn: false
					,shadeClose:true
					,anim:2
					,area: 'auto;'
					,shade: 0.8
					,id: 'LAY_layuipro' 
					,btn: ['马上登陆', '不再提示']
					,btnAlign: 'c'
					,moveType: 1
					,content: '<div style="padding:20px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br><br>登陆后分享给好友购买最低可以获得'+t.money+'佣金哦<br><br>代理等级越高，获得的分成比率越高<br><br>累计收入越多，升级越快<br><br>如果不是代理，点这里申请->【<a href="/?m=shenqing" style="color:#fbff04">申请代理</a>】 ^_^</div>'
					,success: function(layero){
					var btn = layero.find('.layui-layer-btn');
					btn.find('.layui-layer-btn0').attr({
					href: '/?m=user&a=login'
					,target: '_blank'
					});
					layero.find('.layui-layer-btn-c').attr('style','text-align:center');
					btn.find('a').attr('style','padding:0 10px');
					}
					,btn2: function(index, layero){
					var date = new Date();
					date.setTime(date.getTime()+24*60*60*1000);
					$.cookie("mustlogin", "true", {
					path: "/",
					expires: date
					})	
					var e = this;
                    0 != t.active ? $(this).toggleClass("active") : $(this).removeClass("active"),
                    $(document).unbind("click").on("click",
                    function() {
                        $(event.target).isChildAndSelfOf(e, a(e)) || ($(e).removeClass("active"), a(e).removeClass("active"))
                    }),
                    a(this).toggleClass("active")
					}		
					});	
					}else{
					var e = this;
                    0 != t.active ? $(this).toggleClass("active") : $(this).removeClass("active"),
                    $(document).unbind("click").on("click",
                    function() {
                        $(event.target).isChildAndSelfOf(e, a(e)) || ($(e).removeClass("active"), a(e).removeClass("active"))
                    }),
                    a(this).toggleClass("active")	
					}
                    
                })
            }
        }
    }).directive("ui-share-code",
    function() {
        return {
            uses: ["goods-share-copy.js", "clipboard.min.js"],
            scope: {
                item: "=item"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                $(i).unbind("click").on("click",
                function() {
                    $wui.goodsShareCode.getCodeShow(t.item)
                })
            }
        }
    }).directive("ui-share-img",
    function() {
        return {
            uses: ["goods-share-copy.js", "clipboard.min.js"],
            scope: {
                img: "img"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                $(i).unbind("click").on("click",
                function() {
                    $wui.goodsShareCode.getCanvasImage(t.img)
                })
            }
        }
    }).directive("ui-code-shop",
    function() {
        return {
            uses: ["goods-share-copy.js", "clipboard.min.js"],
            scope: {
                item: "=item",   
				money: "=money" 
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                if ($(i).attr("isCodeShop")) return ! 1;
                $(i).attr("isCodeShop", !0);
                var a = function() {    
				if(!yangtataER.uid && $.cookie("mustlogin") == null && yangtataER.isdaili ==1){
					layer.open({
					type: 1
					,title: false
					,closeBtn: false
					,shadeClose:true
					,anim:2
					,area: 'auto;'
					,shade: 0.8
					,id: 'LAY_layuipro' 
					,btn: ['马上登陆', '直接购买']
					,btnAlign: 'c'
					,moveType: 1
					,content: '<div style="padding:20px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br><br>登陆后分享给好友购买最低可以获得'+t.money+'佣金哦<br><br>代理等级越高，获得的分成比率越高<br><br>累计收入越多，升级越快<br><br>如果不是代理，点这里申请->【<a href="/?m=shenqing" style="color:#fbff04">申请代理</a>】 ^_^</div>'
					,success: function(layero){
					var btn = layero.find('.layui-layer-btn');
					btn.find('.layui-layer-btn0').attr({
					href: '/?m=user&a=login'
					,target: '_blank'
					});
					layero.find('.layui-layer-btn-c').attr('style','text-align:center');
					btn.find('a').attr('style','padding:0 10px');
					}
					,btn2: function(index, layero){
					var date = new Date();
					date.setTime(date.getTime()+24*60*60*1000);
					$.cookie("mustlogin", "true", {
					path: "/",
					expires: date
					})	
					$wui.goodsShareCode.getCodeShopping(t.item)
					}		
					});	
					}else{
					$wui.goodsShareCode.getCodeShopping(t.item)	
					}                
                };
                $(i).find("a").click(function(e) {
                    return a(),
                    !1
                }),
                $(i).unbind("click").on("click", a.bind(this))
            }
        }
    }).directive("ui-weixin-open",
    function() {
        return {
            template: "<div class='weixin-msg'></div>",
            scope: {},
            link: function(e) {
                var t = (e.scope, e.element),
                i = $(e.template);
                $(t).unbind("click").on("click",
                function() {
                    $("body").append(i),
                    i.unbind("click").on("click",
                    function() {
                        $(this).remove()
                    })
                })
            }
        }
    }).directive("ui-lazyload",
    function() {
        return {
            uses: ["lazyload.js"],
            scope: {},
            link: function(e) {
                var t = (e.scope, e.element);
                return ! $(t).attr("isLoad") && ($(t).attr("isLoad", !0), void $(t).lazyload({
                    effect: "fadeIn"
                }))
            }
        }
    }).directive("ui-classify",
    function() {
        return {
            uses: ["models-goods-classify.js", "plugin/swiper/js/swiper.js"],
            addcss: ["plugin/swiper/swiper.css"],
            scope: {
                url: "url",
                fixed: "=fixed",
                item: "=item",
                callback: "=callback",
                ready: "=ready",
                active: "active"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element,
                a = setInterval(function() {
                    $wui.modelsGoodsClassify && ($wui.modelsGoodsClassify.init(t, i), clearInterval(a))
                },
                300)
            }
        }
    }).directive("ui-atricle",
    function() {
        return {
            uses: ["models-goods-atricle.js", "plugin/swiper/js/swiper.js"],
            addcss: ["plugin/swiper/swiper.css"],
            scope: {
                url: "url",
                fixed: "=fixed",
                item: "=item",
                callback: "=callback",
                ready: "=ready",
                active: "active"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element,
                a = setInterval(function() {
                    $wui.modelsGoodsClassify && ($wui.modelsGoodsClassify.init(t, i), clearInterval(a))
                },
                300)
				
            }
        }
    }).directive("ui-open-taobao",
    function() {
        return {
            scope: {},
            link: function(e) {
                var t = (e.scope, e.element),
                i = function(e) {
                    var t = e.replace("http://", "").replace("https://", ""),
                    i = document.createElement("iframe");
                    i.src = "taobao://" + t,
                    i.style.display = "none",
                    document.body.appendChild(i),
                    window.location = e
                },
                a = function(e) {
                    var t = e.replace("http://", "").replace("https://", ""),
                    i = "taobao://" + t;
                    window.location = i,
                    window.setTimeout(function() {
                        window.location = e
                    },
                    3e3)
                },
                o = function() {
                    var e = navigator.userAgent.toLowerCase();
                    return "micromessenger" == e.match(/MicroMessenger/i)
                };
                $(t).unbind("click").on("click",
                function(e) {
					e.preventDefault();
					var t = $(this).attr("href");
					var money = $(this).attr("data-money");
					if(!yangtataER.uid && $.cookie("mustlogin") == null && yangtataER.isdaili ==1){						
					layer.open({
					type: 1
					,title: false
					,closeBtn: false
					,shadeClose:true
					,anim:2
					,area: 'auto;'
					,shade: 0.8
					,id: 'LAY_layuipro' 
					,btn: ['马上登陆', '直接购买']
					,btnAlign: 'c'
					,moveType: 1
					,content: '<div style="padding:20px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br><br>登陆后分享给好友购买最低可以获得'+money+'佣金哦<br><br>代理等级越高，获得的分成比率越高<br><br>累计收入越多，升级越快<br><br>如果不是代理，点这里申请->【<a href="/?m=shenqing" style="color:#fbff04">申请代理</a>】 ^_^</div>'
					,success: function(layero){
					var btn = layero.find('.layui-layer-btn');
					btn.find('.layui-layer-btn0').attr({
					href: '/?m=user&a=login'
					,target: '_blank'
					});
					layero.find('.layui-layer-btn-c').attr('style','text-align:center');
					btn.find('a').attr('style','padding:0 10px');
					}
					,btn2: function(index, layero){
					var date = new Date();
					date.setTime(date.getTime()+24*60*60*1000);
					$.cookie("mustlogin", "true", {
					path: "/",
					expires: date
					})	
					if (!o()) {
					$("body").append("<center style='position: fixed; width:100%; height:100%; left:0;top:0; z-index:99999;background:#fff;'><br/>唤醒手机淘宝中...</center>");
					var n = navigator.userAgent.toLowerCase();
					"iphone os 9" == n.match(/iphone os 9/i) ? a(t) : i(t)
					}
					}		
					});	
					}else{
					if (!o()) {
					$("body").append("<center style='position: fixed; width:100%; height:100%; left:0;top:0; z-index:99999;background:#fff;'><br/>唤醒手机淘宝中...</center>");
					var n = navigator.userAgent.toLowerCase();
					"iphone os 9" == n.match(/iphone os 9/i) ? a(t) : i(t)
					}	
					}
					
                    
                })
            }
        }
    }).directive("ui-home-content",
    function() {
        return {
            uses: ["models-home.js"],
            scope: {
                item: "=item"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                return ! $(i).attr("isLoad") && ($(i).attr("isLoad", !0),void $wui.homeModels.init(t, i))
            }
        }
    }).directive("ui-goods-list-tow",
    function() {
        return {
            uses: ["models-goods-list-tow.js"],
            scope: {
                page: "=page",
                url: "url"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                $wui.modelsGoodsListTow.init(t, i)
            }
        }
    }).directive("ui-collection",
    function() {
        return {
            uses: ["lazyload.js", "collection.js"],
            scope: {
                item: "=item",
                type: "type",
                openUrl: "open-url"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                $wui.modelsCollection.init(t, i)
            }
        }
    }).directive("ui-add-collection",
    function() {
        return {
            scope: {
                id: "id",
				p_t: "type"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;                
                $cmsApi.ajax({
                    url: "/?m=like&a=checklike",
                    type: "POST",
                    data: {
                        id: t.id,  
						mod: t.p_t
                    }
                }).done(function(e) {
                    e.status ? $(i).addClass("active").unbind("click").on("click",
                    function(e) {
                        e.preventDefault(),
                        wui.layer.msg("该商品已经收藏！")
                    }) : o()
                });
                var o = function() {
                    var e = !1;
                    $(i).unbind("click").on("click",
                    function(o) {
                        return o.preventDefault(),
                        !e && (e = !0, void $cmsApi.ajax({
                            url: "/?m=like&a=add",
                            type: "POST",
                            data: {
                                id: t.id,
                                mod: t.p_t
                            }
                        }).done(function(t) {
                            e = !1,
                            1 == t.status && ($(i).addClass("active"), wui.layer.msg("添加收藏成功！"))
                        }).error(function() {
                            e = !1
                        }))
                    })
                }
            }
        }
    }).directive("ui-mta-modular",
    function() {
        return {
            scope: {
                type: "type",
                mtaName: "mta_name"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element;
                return ! $(i).attr("isLoad") && ($(i).attr("isLoad", !0), void $(i).find("*[data-mold]").unbind("click").on("click",
                function(e) {                    
                }))
            }
        }
    }).directive("ui-dragload",
    function() {
        return {
            uses: ["lazyload.js"],
            scope: {
                callback: "~callback",
                complete: "~complete"
            },
            link: function(e) {
                function t(e) {
                    $(window).scroll(function() {
                        var t = $(e).offset().top + .8 * $(e).height();
                        return ! o && void($(window).scrollTop() + $(window).height() >= t && (o = !o, a.callback(e, i)))
                    })
                }
                function i() {
                    o = !1
                }
                if ($(e.element).attr("isLoad")) return ! 1;
                $(e.element).attr("isLoad", !0);
                var a = e.scope;
                t($(e.element));
                var o = !1
            }
        }
    }).directive("ui-jsbridge",
    function() {
        return {
            uses: ["JSBridge.js"],
            scope: {
                on: "on",
                params: "=params"
            },
            link: function(e) {
                var t = e.scope,
                i = e.element,
                a = window.location.href.indexOf("cmsnative:jump");
                return ! ($(i).attr("isLoad") || a < 0) && ($(i).attr("isLoad", !0), t.params.title = t.params.title || "", t.params.jump_value = t.params.jump_value || "", void $(i).unbind("click").on(t.on || "click",
                function(e) {
                    if (t.params.jump_app_url) {
                        var i = layer.load();
                        $cmsApi.ajax({
                            url: t.params.jump_app_url,
                            type: "get",
                            dataType: "json"
                        }).done(function(e) {
                            layer.close(i),
                            t.params.jump_value = e.data.jump_app_url,
                            JSBridge.call("bridge", "intentCommon", t.params,
                            function(e) {
                                return ! 1
                            })
                        })
                    } else JSBridge.call("bridge", "intentCommon", t.params,
                    function(e) {
                        return ! 1
                    });
                    return ! 1
                }))
            }
        }
    }).directive("ui-back",
    function() {
        return {
            scope: {},
            link: function(e) {
                var t = (e.scope, e.element);
                $(t).on("click",
                function() {
                    if (!$(this).attr("href")) {
                        if (window.history.length > 1) return window.history.back( - 1),
                        !1;
                        window.location.href = window.location.origin
                    }
                })
            }
        }
    }).directive("share-code-taokoulin",
    function() {
        return {
            uses: ["goods-share-copy.js","mui.previewimage.js","photosave.js"],
            scope: {
                item: "=item"
            },
            link: function(e) {
                var o = e.scope,
                t = e.element;
                wui.goodsShareCode.setTmallGoodsCode(o.item,
                function(e) {
                    var o = /\$kouling\$/gi,
                    i = $(t).html().replace(o, e.code);
                    $(t).html(i),
                    $("#codeCopyVal").html(i.replace(/\n/g, "<br />") || "无内容")
                },
                function() {
                    layer.msg("服务器繁忙请稍后再试...")
                }),
                wui.goodsShareCode.getCanvasImageinhtml(ctpic,
                function(e) {					
					$cmsApi.ajax({
                            url: "/?m=share&a=getimg",
                            type: "POST",
							data: {
							src: e,  
							id: o.item
							},
                            dataType: "json"
                        }).done(function(a) {
                            $('.cimg').attr('id',''),
                            $(".goods_share_items .imgCode").html('<label><img class="cimg" data-src="" id="codeimg" src="/'+a+'" data-preview-src="" data-preview-group="1" alt=""></label>')
                        })	    
					
                })
            }
        }
    }).directive("ui-share-copycode",
    function() {
        return { 
            link: function(e) {                
                var i = e.element;
                $(i).unbind("click").on("click",
                function() {
					var text = $("#codeCopy").html();
                    wui.goodsShareCode.getCodecopy(text)
                })
            }
        }
    })
    $(window).load(function() {
        $cmsApi.setMtaCookie()
    });
    var setLayer = setInterval(function() {
        wui.layer && (wui.layer.msg = function(e) {
            $(".icon_msg").remove();
            var t = $('<div class="icon_msg"><span>' + e + "</span></div>");
            $("body").append(t),
            t.addClass("active"),
            setTimeout(function() {
                t.addClass("up").removeClass("active"),
                setTimeout(function() {
                    t.remove()
                },
                400)
            },
            2e3)
        },
        clearInterval(setLayer))
    },
    300);   	
    $cmsApi.scrolltop(),
    window.$cmsApi = $cmsApi
} (wui);