var api = require('../api/api.js')
// const serverPath = 'http://molicaen.cn/api/'

/**
 * 封封微信的的request
 */
function request (url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Molilearn-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log('request success', res)
        if (res.statusCode === 200) {
          if (res.data.errno === 401) {
            // 需要登录后才可以操作

            let code = null
            return login().then((res) => {
              code = res.code
              return getUserInfo()
            }).then((userInfo) => {
              // 登录远程服务器
              request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
                if (res.errno === 0) {
                  // 存储用户信息
                  wx.setStorageSync('userInfo', res.data.userInfo)
                  wx.setStorageSync('token', res.data.token)

                  resolve(res)
                } else {
                  reject(res)
                }
              }).catch((err) => {
                reject(err)
              })
            }).catch((err) => {
              reject(err)
            })
          } else if (res.data.errno === 0) {
            resolve(res.data)
          } else {
            showErrorToast(res.data.errmsg)
          }
        } else {
          reject(res.errMsg)
        }
      },
      fail: function (err) {
        reject(err)
        console.log('failed')
      }
    })
  })
}

function get (url, data = {}) {
  return request(url, data, 'GET')
}

function post (url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * 检查微信会话是否过期
 */
function checkSession () {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true)
      },
      fail: function () {
        reject(new Error('session outdate'))
      }
    })
  })
}

/**
 * 调用微信登录
 */
function login () {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

function getUserInfo () {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

function showErrorToast (msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/send-fail.png'
  })
}
function showSuccessToast (msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/send-ok.png'
  })
}
function showLoadingToast () {
  wx.showToast({
    icon: 'loading'
  })
}

export default {
  request,
  get,
  post,
  showErrorToast,
  showSuccessToast,
  showLoadingToast,
  checkSession,
  login,
  getUserInfo
}
