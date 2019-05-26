<template>
  <div class="panel">
    <fileList @load="onloadStatusChange" @rename="rename" @refresh="init" id="filelist" :showOperate="true" :type="recent" :items="items">
      <div v-if="items.length===0">
        <div class="no-record">暂无打开记录</div>
        <div @click="tapOpenDocs" class="open-doc">打开文档</div>
      </div>
    </fileList>
    <div @click="add" :class="floatBtnClass">
      <img class="createImgBg" src="/static/images/create_bg.png">
      <img class="createImg" src="/static/images/create.png">
    </div>
    <div class="rename-panel" v-if="isRename">
      <input class="rename-input" v-model="renameValue" :maxlength="50" ="isRename" @blur="blur"></input>
      <mp-button @click="comfirm" type="primary" size="small" btnClass="renameBtn">确认</mp-button>
    </div>
  </div>
</template>

<script>
import fileList from '@/components/fileList'
import mpButton from 'mpvue-weui/src/button'
import i from '@/utils/util.js'
import request from '@/utils/request.js'
import api from '@/api/api.js'

var s = i.hideLoading
var h = i.showLoading

export default {
  components: {
    fileList,
    mpButton
  },
  data () {
    return {
      page: 0,
      size: 10,
      total: -1,
      items: [
        {
          coll: 155,
          total: 18,
          time: new Date().toLocaleDateString(),
          title: 'File Name'
        },
        {
          coll: 12,
          time: new Date().toLocaleDateString(),
          total: 24,
          title: 'File Name'
        }
      ],
      isRename: false,
      renameValue: ''
    }
  },
  computed: {
    floatBtnClass () {
      return `floatBtn ${this.active ? 'active' : ''}`
    },
    isLast () {
      return this.items.length === this.total
    },
  },
  methods: {
    loadCards: function () {
      var that = this
      request.request(api.CardsMenu, {page: this.page + 1, size: this.size}).then(res => {
        console.log('request cards', res.data)
        if (res.data.length > 0) {
          that.items = that.items.concat(res.data)
          that.page += 1
        } else {
          that.total = that.items.length
        }
      })
    },
    onloadStatusChange: function (e) {
      var t = e.detail.status
      t === 'loaded' ? s() : t === 'loading' && h()
    },
    tapOpenDocs: function () {
      console.log('tap Open Docs')
    },
    add: function () {
      var that = this
      wx.showModal({
        content: '确认添加题库',
        success (res) {
          if (res.confirm) {
            that.globalData.editCard.cid = null
            that.globalData.editCard.title = ''
            that.globalData.editableCard = true
            const url = '/pages/exam/main'
            mpvue.navigateTo({ url })
          }
        }
      })
    },
    rename: function () {
      this.renameValue = ''
      this.isRename = true
    },
    comfirm: function () {
      console.log('rename value', this.renameValue)
      const that = this
      request.request(api.RenameCard, {cid: that.globalData.editCard.cid, title: that.renameValue}).then(res => {
        that.init()
      })
    },
    blur: function (ev) {
      this.isRename = false
    },
    init: function () {
      this.page = 0
      this.items = []
      this.isRename = false
      this.loadCards()
    }
  },
  onLoad () {
    this.init()
  },
  onShow () {
    let pages = getCurrentPages()
    let currPage = pages[pages.length - 1]
    if (currPage.data.editSuccess && currPage.data.editSuccess === true) {
      this.init()
      currPage.data.editSuccess = false
    }
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
      this.loadCards(function () {
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
.panel {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.floatBtn {
  position: fixed;
  width: 100px;
  height: 100px;
  font-size: 0;
  line-height: 0;
  right: 0px;
  bottom: 5px;
}
.createImgBg {
  position: absolute;
  width: 100px;
  height: 100px;
}
.createImg {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 40px;
  height: 40px;
  justify-content: center;
  -webkit-transform-origin: center;
  transform-origin: center;
  transition-duration: 0.5s;
  transition-property: all;
}
.rename-panel {
  position: fixed;
  display: flex;
  align-items: center;
  padding: 5% 5%;
  margin: 50% 0%;
  width: 200px;
  height: 40px;
  align-self: center;
  background-color: aliceblue;
  border-radius: 5px;
}
.rename-input {
  height: 100%;
  width: 65%;
  margin-right: 5%;
  border-radius: 5px;
  border: 1px solid black;
}
.renameBtn {
  height: 100%;
  width: 30%;
  font-size: 8px;
}
</style>
