!function(win) {
	"use strict";
	var wui = function() {
			this.v = "1.0.0"
		};
	wui.fn = wui.prototype;
	var doc = document,
		config = wui.fn.cache = {},
		getPath = function() {
			var e = doc.scripts,
				t = e[e.length - 1].src;
			return t.substring(0, t.lastIndexOf("/") + 1)
		}(),
		error = function(e) {
			win.console && console.error && console.error("wui hint: " + e)
		},
		isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
		modules = "object" == typeof modsConfig ? modsConfig.moduleUrl : {
			layer: "modules/layer",
			jquery: "modules/jquery",
			directive: "modules/directive",
			box: "modules/box",
			validate: "modules/validate",
			umeditor: "modules/umeditor",
			swiper: "modules/swiper",
			number: "modules/number",
			mobile: ""
		};
	config.modules = {}, config.status = {}, config.timeout = 30, config.event = {}, config.directive = {}, config.version = "" == (new wui).v ? (new Date).getTime() : (new wui).v, wui.fn.define = function(e, t) {
		var n = this,
			i = "function" == typeof e,
			o = function() {
				return "function" == typeof t && t(function(e, t) {
					wui[e] = t, config.status[e] = !0
				}), this
			};
		return i && (t = e, e = []), wui["wui.all"] || !wui["wui.all"] && wui["wui.mobile"] ? o.call(n) : (n.uses(e, o), n)
	}, wui.fn.uses = function(e, t, n) {
		function i(e, t) {
			var n = "PLaySTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/;
			if ("load" === e.type || n.test((e.currentTarget || e.srcElement).readyState)) {
				config.modules[c] = t, u.removeChild(f);
				var i = t.match(/\/([^\/]+)\.js/)[1];
				config.status[c] = i, function r() {
					return ++a > 1e3 * config.timeout / 4 ? error(c + " is not a valid module") : void(config.status[c] ? o() : setTimeout(r, 4))
				}()
			}
		}
		function o() {
			n.push(wui[c]), e.length > 1 ? r.uses(e.slice(1), t, n) : "function" == typeof t && t.apply(wui, n)
		}
		var r = this,
			s = config.dir = config.dir ? config.dir : getPath,
			u = doc.getElementsByTagName("body")[0];
		e = "string" == typeof e ? [e] : e, window.jQuery && jQuery.fn.on && (r.each(e, function(t, n) {
			"jquery" === n && e.splice(t, 1)
		}), wui.jquery = jQuery);
		var c = e[0],
			a = 0;
		if (n = n || [], config.host = config.host || (s.match(/\/\/([\s\S]+?)\//) || ["//" + location.host + "/"])[0], 0 === e.length || wui["wui.all"] && modules[c] || !wui["wui.all"] && wui["wui.mobile"] && modules[c]) return o(), r;
		var f = doc.createElement("script"),
			l = (modules[c] ? s + "js/" : config.base || "") + (r.modules[c] || ("http" == c.substr(0, 4) ? c : s + c)) + (c.match(/.*\.js.*/) ? "" : ".js");
		if (f.type = "application/javascript", f.charset = "utf-8", f.src = l +
		function() {
			var e = config.version === !0 ? config.v || (new Date).getTime() : config.version || "";
			return e ? "?v=" + e : ""
		}(), config.modules[c])!
		function v() {
			return ++a > 1e3 * config.timeout / 4 ? error(c + " is not a valid module") : void("string" == typeof config.modules[c] && config.status[c] ? o() : setTimeout(v, 4))
		}();
		else {
			if (r.nginit) {
				config.modules[c] = l;
				var d = l.match(/\/([^\/]+)\.js/)[1];
				config.status[c] = d, $("body").append(f), i({
					type: "load"
				}, l)
			} else u.appendChild(f);
			!f.attachEvent || f.attachEvent.toString && f.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? f.addEventListener("load", function(e) {
				i(e, l)
			}, !1) : f.attachEvent("onreadystatechange", function(e) {
				i(e, l)
			})
		}
		return config.modules[c] = l, r
	}, wui.fn.getStyle = function(e, t) {
		var n = e.currentStyle ? e.currentStyle : win.getComputedStyle(e, null);
		return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](t)
	}, wui.fn.link = function(e, t, n) {
		var i = this,
			o = doc.createElement("link"),
			r = doc.getElementsByTagName("head")[0];
		"string" == typeof t && (n = t);
		var s = e.match(/.*\.css.*/) ? "http" == e.substr(0, 4) ? e : config.dir + e : config.dir + "css/" + e + ".css";
		n = s.match(/\/([^\/\.]+)\.css/)[1];
		var u = o.id = "lwj-ui-css-" + n,
			c = 0;
		return doc.getElementById(u) ? i : (o.rel = "stylesheet", o.type = "text/css", o.href = s +
		function() {
			var e = config.version === !0 ? config.v || (new Date).getTime() : config.version || "";
			return e ? "?v=" + e : ""
		}(), o.media = "all", doc.getElementById(u) || r.appendChild(o), "function" != typeof t ? i : (function a() {
			return ++c > 1e3 * config.timeout / 100 ? error(e + " timeout") : void(doc.getElementById(u) ?
			function() {
				t()
			}() : setTimeout(a, 100))
		}(), i))
	}, wui.fn.addcss = function(e, t, n) {
		e = "object" == typeof e ? e : [e];
		for (var i = 0; i < e.length; i++) wui.fn.link(e[i], t, i)
	}, wui.fn.img = function(e, t, n) {
		var i = new Image;
		return i.src = e, i.complete ? t(i) : (i.onload = function() {
			i.onload = null, t(i)
		}, void(i.onerror = function(e) {
			i.onerror = null, n(e)
		}))
	}, wui.fn.config = function(e) {
		e = e || {};
		for (var t in e) config[t] = e[t];
		return this
	}, wui.fn.modules = function() {
		var e = {};
		for (var t in modules) e[t] = modules[t];
		return e
	}(), wui.fn.extend = function(e) {
		var t = this;
		e = e || {};
		for (var n in e) t[n] || t.modules[n] ? error("模块名 " + n + " 已被占用") : t.modules[n] = e[n];
		return t
	}, wui.fn.data = function(e, t) {
		if (e = e || "wui", win.JSON && win.JSON.parse) {
			if (null === t) return delete localStorage[e];
			t = "object" == typeof t ? t : {
				key: t
			};
			try {
				var n = JSON.parse(localStorage[e])
			} catch (i) {
				var n = {}
			}
			return t.value && (n[t.key] = t.value), t.remove && delete n[t.key], localStorage[e] = JSON.stringify(n), t.key ? n[t.key] : n
		}
	}, wui.fn.device = function(e) {
		var t = navigator.userAgent.toLowerCase(),
			n = function(e) {
				var n = new RegExp(e + "/([^\\s\\_\\-]+)");
				return e = (t.match(n) || [])[1], e || !1
			},
			i = {
				os: function() {
					return /windows/.test(t) ? "windows" : /linux/.test(t) ? "linux" : /mac/.test(t) ? "mac" : /iphone|ipod|ipad|ios/.test(t) ? "ios" : void 0
				}(),
				ie: function() {
					return !!(win.ActiveXObject || "ActiveXObject" in win) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")
				}(),
				weixin: n("micromessenger")
			};
		return e && !i[e] && (i[e] = n(e)), i.android = /android/.test(t), i.ios = "ios" === i.os, i
	}, wui.fn.hint = function() {
		return {
			error: error
		}
	}, wui.fn.each = function(e, t) {
		var n, i = this;
		if ("function" != typeof t) return i;
		if (e = e || [], e.constructor === Object) {
			for (n in e) if (t.call(e[n], n, e[n])) break
		} else for (n = 0; n < e.length && !t.call(e[n], n, e[n]); n++);
		return i
	}, wui.fn.stope = function(e) {
		e = e || win.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
	}, wui.fn.onevent = function(e, t, n) {
		return "string" != typeof e || "function" != typeof n ? this : (config.event[e + "." + t] = [n], this)
	}, wui.fn.event = function(e, t, n) {
		var i = this,
			o = null,
			r = t.match(/\(.*\)$/) || [],
			s = (t = e + "." + t).replace(r, ""),
			u = function(e, t) {
				var r = t && t.call(i, n);
				r === !1 && null === o && (o = !1)
			};
		return wui.each(config.event[s], u), r[0] && wui.each(config.event[t], u), o
	}, wui.fn.directive = function(dirName, events) {
		config.directive[dirName] = config.directive[dirName] ? config.directive[dirName] : events;
		var events = events(),
			$this = this,
			result = {},
			isUses = 0;
		return result.init = function(e, t) {
			var n = {};
			if (n.fn = $this, n.element = e, 0 == n.element.length) return $this;
			for (var i in events) this.isType(i, events[i], n, t)
		}, result.isValue = function(e) {
			return !e || "" == e
		}, result.isType = function(e, t, n, i) {
			if (this.isValue(t)) return !1;
			switch (e) {
			case "template":
				n.template = t;
				break;
			case "uses":
				isUses = 1, $this.uses(t, function() {
					isUses = 2
				});
				break;
			case "addcss":
				isUses = 1, $this.addcss(t, function() {
					isUses = 2
				}, t);
				break;
			case "scope":
				n.scope = {};
				for (var o in t) n.scope[o] = this.isScope(o, t[o], n);
				break;
			case "link":
				setTimeout(function() {
					if (1 === isUses || 2 === isUses) var e = setInterval(function() {
						2 === isUses && (clearInterval(e), i(n))
					}, 100);
					else i(n)
				}, 100);
				break;
			default:
				error(e + "未知参数！")
			}
		}, result.isScope = function($key, $value, _$scope) {
			function valAttr(e, t) {
				return e.attr(t) ? e.attr(t) : e.data(t)
			}
			switch ($value[0]) {
			case "=":
				var val = valAttr(_$scope.element, $value.substr(1));
				return eval("(" + ("" != val ? val : "{}") + ")");
			case "~":
				var val = valAttr(_$scope.element, $value.substr(1));
				return val && "" != val && "function" == typeof eval("(" + val + ")") ? eval("(" + val + ")") : null;
			default:
				return valAttr(_$scope.element, $value)
			}
		}, setTimeout(function() {
			$.each($("*[" + dirName + "]"), function(e, t) {
				result.init($(this), events.link)
			})
		}, 600), this
	}, wui.fn.init = function(e) {
		switch (e) {
		case "directive":
			for (var t in config.directive) this.directive(t, config.directive[t]);
			break;
		default:
			for (var t in config.directive) this.directive(t, config.directive[t])
		}
	}, wui.fn.ngModule = function(e, t) {
		var n = this;
		return e.factory("wui", function(e) {
			return n
		}), this.nginit = e, this.uses(t, function() {}), e
	}, wui.fn.loadAll = function(e, t) {
		var n = e.uses && e.addcss ? 2 : e.uses || e.addcss ? 1 : 0,
			i = 1;
		e.uses && this.uses(e.uses, function() {
			i++
		}), e.addcss && this.addcss(e.addcss, function() {
			i++
		}, e.addcss);
		var o = setInterval(function() {
			n <= i && (t(), clearInterval(o))
		}, 400)
	}, win.wui = new wui
}(window);