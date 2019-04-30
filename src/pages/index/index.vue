<template>
  <div @click="clickHandle">
    <mp-searchbar :isFocus=true :inputValue="inputValue" :placeholder="placeholder" @input="input" @blur="blur" @focus="focus" @confirm="confirm"></mp-searchbar>

    <div class="usermotto">
      <div class="weui-cells__title"></div>
      <div v-for="(item,index) in cards" :key="index" :id="index">
        <card :cid="item.cid" :title="item.title" :avatar="item.avatar" :publisher="item.publisher" :time="item.time" :coll="item.coll"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import mpSearchbar from 'mpvue-weui/src/searchbar'
import request from '@/utils/request.js'
import api from '@/api/api.js'

export default {
  data () {
    return {
      page: 1,
      inputValue: '',
      placeholder: '',
      cards: [
        {
          cid: 'wx357',
          title: '标题一',
          publisher: 'user',
          time: new Date().toLocaleDateString(),
          coll: 1
        },
        {
          cid: 'wx123',
          title: '标题一',
          publisher: 'asd',
          time: new Date().toLocaleDateString(),
          coll: 153
        }
      ],
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      index: {}
    }
  },
  components: {
    card,
    mpSearchbar
  },
  methods: {
    init (callback) {
      var that = this
      that.page = 1
      request.request(api.IndexUrl).then(res => {
        console.log(res)
        that.cards = res.data
        if (callback) {
          callback()
        }
      })
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    input (ev) {
      console.log('input:', ev)
    },
    blur (ev) {
      console.log('blur:', ev)
    },
    focus (ev) {
      console.log('focus:', ev)
    },
    confirm (ev) {
      console.log('confirm:', ev)
    }
  },
  onLoad () {
    this.init()
  },
  created () {
    // let app = getApp()
  },
  onShow () {
    let pages = getCurrentPages()
    let currPage = pages[pages.length - 1]
    if (currPage.data.submitSuccess && currPage.data.submitSuccess === true) {
      this.init()
      currPage.data.submitSuccess = false
    }
  },
  onPullDownRefresh () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading()
    this.init(() => {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading()
      // 停止下拉动作
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom () {
    var that = this
    // Do something when page reach bottom.
    // 显示顶部刷新图标
    wx.showNavigationBarLoading()
    request.request(api.IndexUrl, {'page': this.page + 1}).then(res => {
      console.log(res.data)
      that.cards = that.cards.concat(res.data)
      if (res.data.length > 0) {
        that.page += 1
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading()
      // 停止下拉动作
      wx.stopPullDownRefresh()
    })
  }
}
</script>

<style scoped>
.usermotto {
  margin-top: 20px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
