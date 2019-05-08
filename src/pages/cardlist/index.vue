<template>
  <div class="panel">
    <div class="weui-cells__title"
      v-for="(item,index) in list" :key="index" :id="index">
      <card :cid="item.cid" :title="item.title" :avatar="item.avatar" :publisher="item.publisher" :time="item.time" :coll="item.coll"
      :isColl="item.isColl"></card>
    </div>
  </div>
</template>

<script>
// Use Vuex
import request from '@/utils/request.js'
import api from '@/api/api.js'
import card from '@/components/card'
export default {
  data () {
    return {
      page: 0,
      total: -1,
      list: []
    }
  },
  components: {
    card
  },
  computed: {
    isLast () {
      return this.list.length === this.total
    }
  },
  methods: {
    loadQst (callback) {
      const that = this
      request.request(this.globalData.collect ? api.CollCardList : api.History, {page: this.page + 1}).then(res => {
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
