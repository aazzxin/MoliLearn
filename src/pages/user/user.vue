<template>
  <div @click="clickHandle">
    <div class="column">
      <a class="userinfo">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" > 
      </a>
      <span class="userinfo-nickname">
          {{userInfo.nickName}}
      </span>
    </div>
    <div class="weui-navbar">
      <div v-for="(item,index) in tabs" :key="index" :id="index" class="weui-navbar__item">
        <div class="weui-navbar__title">{{item}}</div>
      </div>
    </div>
    <div class="weui-num">
      <div v-for="(item,index) in nums" :key="index" :id="index" class="weui-num__item">
        <div class="weui-num__title">{{item}}</div>
      </div>
    </div>
    <div class="weui-panel">
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd weui-cell_primary">
          <text>练习题库</text>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd weui-cell_primary">
          <text>收藏题库</text>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import request from '@/utils/request.js'
import api from '@/api/api.js'

export default {
  components: {
    card
  },
  props: {
    tabs: {
      type: Array,
      default: ['被收藏', '题库', '答对题']
    },
    nums: {
      type: Array,
      default: ['0', '0', '0']
    }
  },
  data () {
    return {
      userInfo: {
        nickName: '请登录',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  methods: {
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  onLoad () {
    /**
     * 获取用户信息
     */
    var userInfo = wx.getStorageSync('userInfo')
    this.userInfo.avatarUrl = userInfo.avatar
    this.userInfo.nickName = userInfo.nickName
  },
  onShow () {
    var that = this
    request.request(api.UserinfoUrl).then(res => {
      that.nums[0] = res.data.collNum
      that.nums[1] = res.data.cardsNum
      that.nums[2] = res.data.correctNum
    })
    this.$forceUpdate()
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
.log-item {
  margin: 10rpx;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.userinfo-nickname {
  color: #aaa;
}
.weui-navbar {
  position: relative;
  border: none;
  border-bottom: 0rpx solid #ccc;
}
.weui-navbar__item {
  padding: 0px 0;
}
.weui-num {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  z-index: 500;
  top: 0;
  width: 100%;
  position: relative;
}
.weui-num__item {
  position: relative;
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 0;
}
.weui-num__title {
  display: inline-block;
  font-size: 10px;
  max-width: 8em;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: #aaa;
}
</style>
