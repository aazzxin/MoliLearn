<template>
  <div class="weui-panel">
    <div @click="clickQst(item.qid)" class="weui-cell weui-cell_access" hover-class="weui-cell_active" 
      v-for="(item,index) in list" :key="index" :id="index">
      <div class="weui-cell__bd weui-cell_primary">
        <text>{{item.title}}</text>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import request from '@/utils/request.js'
import api from '@/api/api.js'
export default {
  data () {
    return {
      page: 0,
      total: -1,
      list: []
    }
  },
  computed: {
    isLast () {
      return this.list.length === this.total
    }
  },
  methods: {
    clickQst (qid) {
      this.globalData.qid = qid
      const url = '/pages/exam/main'
      mpvue.navigateTo({ url })
    },
    loadQst (callback) {
      const that = this
      request.request(this.globalData.collect ? api.CollQstList : api.WrongQst, {page: this.page + 1}).then(res => {
        if (res.data.length > 0) {
          that.list = that.list.concat(res.data)
          that.page += 1
        } else {
          that.total = that.list.length
        }
        if (callback) {
          callback()
        }
      })
    }
  },
  onLoad () {
    this.page = 0
    this.total = -1
    this.list = []
    this.loadQst()
  },
  onPullDownRefresh () {
    // 停止下拉动作
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    // 显示顶部刷新图标
    if (!this.isLast) {
      wx.showNavigationBarLoading()
      this.loadQst(function () {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading()
        // 停止下拉动作
        wx.stopPullDownRefresh()
      })
    } else {
      // 停止下拉动作
      wx.stopPullDownRefresh()
    }
  }
}
</script>

<style>
</style>
