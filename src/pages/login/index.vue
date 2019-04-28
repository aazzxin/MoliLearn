<template>
  <div class="index container">
    <div class="header">
      <img class="header-img" src="/static/images/blue-logo.png">
      <div class="slogan">在线练习</div>
    </div>
    <div class="footer">
      <button open-type="getUserInfo" @getuserinfo="onGotUserInfo" :disabled="disabled" hoverClass="other-button-hover" type="primary">微信登录</button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import api from '@/api/api.js'
export default {
  data () {
    return {
      code: null,
      web_url: '',
      data: {
        title: '在线练习系统',
        src: ''
      }
    }
  },
  methods: {
    onGotUserInfo: function (e) {
      var that = this
      let userInfo = e.mp.detail
      // 登录远程服务器
      console.log('userinfo', userInfo)
      request.request(api.AuthLoginByWeixin, { code: this.code, userInfo: userInfo }, 'POST').then(res => {
        console.log('login', res)
        if (res.errno === 0) {
          // 存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo)
          wx.setStorageSync('token', res.data.token)
          request.showSuccessToast('登录成功')
          that.navigate()
        } else {
          request.showErrorToast('登录失败')
          that.login()
        }
      })
    },
    navigate: function () {
      console.log('login')
      const url = '../index/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    login: function () {
      var that = this
      request.login().then(res => {
        that.code = res
        console.log('code', that.code)
      })
    }
  },
  onLoad () {
    this.login()
  }
}
</script>

<style>
.index,.bg .web-view-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.container {
    padding-top: 0;
    padding-bottom: 140rpx!important;
}

.index {
    background: url("https://image.wjx.com/images/smallProgram/bg1@2x.png");
    background-repeat: no-repeat;
    background-position: center 220rpx;
    background-size: contain;
}

@media all and (min-width:320px) {
    .index {
        background-position: center 180rpx;
    }

    .container {
        padding-bottom: 120rpx!important;
    }
}

@media all and (min-width:375px) {
    .index {
        background-position: center 210rpx;
    }

    .container {
        padding-bottom: 120rpx!important;
    }
}

@media all and (min-width:375px) and (-webkit-min-device-pixel-ratio:3.0) {
    .index {
        background-position: center 210rpx;
    }

    .container {
        padding-bottom: 240rpx!important;
    }
}

@media all and (min-width:411px) {
    .container {
        padding-bottom: 120rpx!important;
    }
}

.header {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.header-img {
    align-self: center;
    width: 73rpx;
    height: 73rpx;
    margin-bottom: 25rpx;
}

.slogan-img {
    width: 332rpx;
    height: 28rpx;
}

.footer button {
    width: 630rpx;
    height: 108rpx;
    font-size: 36rpx;
    line-height: 108rpx;
    margin-bottom: 30rpx;
}

.wjx-btn {
    color: #fff;
    background-color: #1DA0FA;
}

.slogan {
    font-size: 24rpx;
    color: #57B5F6;
    letter-spacing: 16rpx;
}
</style>
