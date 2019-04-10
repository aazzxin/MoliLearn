var e = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (t) {
  return typeof t
} : function (t) {
  return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t
}
var n = Object.assign || function (t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e]
    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
  }
  return t
}
var r = require('../config/index.js')
var o = r.extMap
var i = r.dotviews
var a = r.shares
var u = {}
var c = function () {
  var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '').split('.')
  return (t.length > 1 ? t.pop() : '').toLowerCase()
}
var f = function (t) {
  return !!~[ 'wxls', 'wdoc', 'wppt' ].indexOf(c(t))
}
var l = function (t) {
  return c(t) === 'pom'
}
var g = function (t) {
  return c(t) === 'pof'
}
var p = function (t) {
  return c(t) === 'h5'
}
var h = function (t) {
  try {
    return decodeURIComponent(t)
  } catch (e) {
    return t
  }
}
var d = function (t) {
  var e = o[c(t)]
  return ~a.indexOf(e) ? e : 'unknown'
}
var m = function (t, e) {
  if (void 0 !== e && e !== 'file' && e !== 'sharefile') return t
  var n = ''
  var r = t.split('.')
  var o = r.length
  if (o > 1) {
    var i = '.' + r[o - 1]
    n = t.substring(0, t.length - i.length)
  } else n = t
  return n
}
var v = function () {
  return wx.hideNavigationBarLoading()
}
var x = function (t) {
  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
  var r = arguments[2]
  var o = arguments[3]
  var i = wx.getCurrentPages()
  var a = i && i[i.length - 1]
  var u = a.route || a.__route__ || ''
  var s = '../'.repeat(Math.max(0, u.split('/').length - 1))
  var c = []
  for (var f in n) {
    var l = n[f]
    let t = void 0 === l ? 'undefined' : e(l)
    t === 'object' ? c.push(f + '=' + JSON.stringify(l)) : void 0 !== l && c.push(f + '=' + l)
  }
  var g = c.length ? '?' + c.join('&') : ''
  var p = [ t, t.match(/[^/]+$/)[0] ].join('/')
  var h = s + 'pages/' + p
  var d = {
    url: s + 'pages/' + p + g
  }
  d.fail = o
  '/tabBars/'.test(h) ? wx.switchTab(d) : r ? wx.redirectTo(d) : wx.navigateTo(d)
}
var w = function (t) {
  return {
    year: t.getFullYear(),
    month: t.getMonth() + 1,
    day: t.getDate(),
    hour: t.getHours(),
    minute: t.getMinutes(),
    second: t.getSeconds()
  }
}

export default {
  getExtName: c,
  isCodoc: f,
  isPom: l,
  isShowtang: p,
  isDoc: function (t) {
    var e = c(t)
    return o[e] === 'doc'
  },
  isXls: function (t) {
    var e = c(t)
    return o[e] === 'xls'
  },
  isPpt: function (t) {
    var e = c(t)
    return o[e] === 'ppt'
  },
  isPdf: function (t) {
    var e = c(t)
    return o[e] === 'pdf'
  },
  decode: h,
  getShareIcon: d,
  getShareInfo: function (t, e, n) {
    var r = t.sid
    var o = t.fname
    var i = t.ftype
    var a = '/pages/share/share?sid=' + r + '&fname=' + o
    return {
      title: h(m(o, i)),
      path: a,
      imageUrl: e || 'https://qn.cache.wpscdn.cn/wxminiprogram/thumbs_v2/' + d(o) + '.png'
    }
  },
  getEditInvitationInfo: function (t, e, n, r, o) {
    var i = m(e, n)
    var a = '/pages/shareEditRedirect/shareEditRedirect?leid=' + t + '&fname=' + e
    return {
      title: h('邀请你一起写 「' + i + '」'),
      path: a,
      imageUrl: r || 'https://qn.cache.wpscdn.cn/wxminiprogram/thumbs_v2/' + d(e) + '.png'
    }
  },
  isPreviewAble: function (t) {
    var e = c(t)
    return o[e] === 'img' || l(t) || g(t) || ~i.indexOf(e)
  },
  isThirdPreview: function (t) {
    return f(t) || l(t) || p(t) || g(t)
  },
  gotoPage: x,
  isCurrentPageHomePage: function () {
    var t = wx.getCurrentPages()
    if (!t || t.length !== 1) return !1
    var e = t[0]
    var n = e.route || e.__route__ || ''
    return /tabBars/.test(n)
  },
  showLoading: function (t) {
    return wx.showNavigationBarLoading()
  },
  hideLoading: v,
  toast: function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
    v()
    var o = e.icon || 'none'
    if (wx.showToast(n({
      title: t,
      icon: o
    }, e)) && r) {
      var i = e.duration ? e.duration : 1500
      setTimeout(r, i)
    }
  },
  noExtName: m,
  isBatter: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'lastTape'
    var e = Date.now()
    var res = e - (u[t] || 0) < 1e3 || (u[t] = e, !1)
    return res
  },
  formatUrl: function (t, n) {
    if ((void 0 === n ? 'undefined' : e(n)) !== 'object') return t
    var r = ''
    for (var o in n) r = r + (r ? '&' : '?') + o + '=' + n[o]
    return t + r
  },
  formatDate_MMddHHmm: function (t) {
    var e = new Date()
    e.setTime(1e3 * t)
    var n = w(e)
    var r = n.month + '月' + n.day + '日 '
    r += n.hour < 10 ? '0' + n.hour : n.hour
    r += ':'
    r += n.minute < 10 ? '0' + n.minute : n.minute
    return r
  },
  formatDate_MMdd: function (t) {
    var e = new Date()
    e.setTime(1e3 * t)
    var n = w(e)
    return n.month + '月' + n.day + '日'
  },
  formatDate_HHmm: function (t) {
    var e = new Date()
    e.setTime(1e3 * t)
    var n = w(e)
    var r = ''
    r += n.hour < 10 ? '0' + n.hour : n.hour
    r += ':'
    r += n.minute < 10 ? '0' + n.minute : n.minute
    return r
  },
  highLightFormat: function (t, e) {
    for (var n = t.toLowerCase(), r = e.toLowerCase(), o = 0, i = '', a = n.indexOf(r, o); a !== -1;) {
      var u = t.substring(a, a + r.length)
      i = i + t.substring(o, a) + '<em>' + u + '</em>'
      o = a + r.length
      a = n.indexOf(r, o)
    }
    i += t.substring(o, t.length)
    return i
  },
  checkGlobalIntent: function () {
    var t = getApp()
    if (t.globalData.intent) {
      var e = t.globalData.intent.pages
      var n = e.shift()
      x(n, t.globalData.intent)
      e.length === 0 && delete t.globalData.intent
    }
  },
  getTeamRole: function (t, e) {
    var n = t.getCacheTeam(e)
    return n.user_role
  },
  getDateDelta: w,
  reloadCurrentPage: function () {
    var t = wx.getCurrentPages()
    t.length > 0 && t[t.length - 1].reload && t[t.length - 1].reload()
  },
  formatRemainTime: function (t) {
    var e = ''
    var n = t - Math.round(new Date() / 1e3)
    if (n > 0) {
      var r = Math.round(n / 86400)
      var o = parseInt(n % 86400 / 3600)
      if (r > 0) {
        e = ' ' + r + ' 天后'
      } else if (o > 0) {
        e = ' ' + o + ' 小时后'
      } else {
        var i = parseInt(n % 86400 % 3600 / 60)
        i === 0 && (i = 1)
        e = ' ' + i + ' 分钟后'
      }
    }
    return e
  },
  pathtxt: function (t) {
    var e = /\/tencent\/qqfile_recv\//i
    var n = /com\.tencent\.mipadqq:/i
    var r = /com\.tencent\.mqq:/i
    var o = /\/Tencent\/TIMfile_recv\//i
    var i = /Documents\/WeChat\sFiles\/[a-z0-9]+\/Files\//i
    var a = /tencent\/micromsg\/download\//i
    var u = /com\.tencent\.xin:/i
    var s = /C:\/Users\/[a-z0-9]+\/Desktop\//i
    var c = /C:\/Users\/[a-z0-9]+\/Downloads\//i
    var f = /\/Download/i
    return /\/Documents\/Tencent\sFiles\/[a-z0-9]+\/FileRecv\//i.test(t) || e.test(t) || n.test(t) || r.test(t) ? 'QQ' : o.test(t) ? 'TIM' : i.test(t) || a.test(t) || u.test(t) ? '微信' : s.test(t) ? '桌面' : c.test(t) || f.test(t) ? '下载' : '其他位置'
  },
  isPageShow: function (t) {
    var e = wx.getCurrentPages()
    if (e && e.length > 0) {
      var n = e[e.length - 1]
      return (n.route || n.__route__ || '') === t
    }
    return !1
  },
  rpx2px: function (t) {
    return t / 750 * wx.getSystemInfoSync().windowWidth
  },
  genUUid: function () {
    var t = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (e) {
      var n = (t + 16 * Math.random()) % 16 | 0
      return {time: Math.floor(t / 16), uid: (e === 'x' ? n : 7 & n | 8).toString(16)}
    })
  }
}
