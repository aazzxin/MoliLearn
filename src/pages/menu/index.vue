<template>
  <div>
    <fileList @load="onloadStatusChange" id="filelist" :showOperate="true" :type="recent" :items="items">
      <div v-if="items.length===0">
        <div class="no-record">暂无打开记录</div>
        <div @click="tapOpenDocs" class="open-doc">打开文档</div>
      </div>
    </fileList>
    <div @click="add" :class="floatBtnClass">
      <img class="createImgBg" src="/static/images/create_bg.png">
      <img class="createImg" src="/static/images/create.png">
    </div>
  </div>
</template>

<script>
import fileList from '@/components/fileList'
import i from '@/utils/util.js'
import request from '@/utils/request.js'
import api from '@/api/api.js'

var s = i.hideLoading
var h = i.showLoading

export default {
  components: {
    fileList
  },
  data () {
    return {
      page: 0,
      size: 10,
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
      ]
    }
  },
  computed: {
    floatBtnClass () {
      return `floatBtn ${this.active ? 'active' : ''}`
    }
  },
  methods: {
    loadCards: function () {
      var that = this
      request.request(api.CardsMenu, {page: this.page, size: this.size}).then(res => {
        console.log('request cards', res.data)
        that.items = that.items.concat(res.data)
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
            that.globalData.cid = null
            that.globalData.editableCard = true
            const url = '/pages/exam/main'
            mpvue.navigateTo({ url })
          }
        }
      })
    }
  },
  onLoad () {
    this.page = 0
    this.items = []
    this.loadCards()
  },
  onShow () {
    let pages = getCurrentPages()
    let currPage = pages[pages.length - 1]
    if (currPage.data.editSuccess && currPage.data.editSuccess === true) {

    }
  }
}
</script>

<style>
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
</style>
