<template>
  <div>
    <fileList @load="onloadStatusChange" id="filelist" :showOperate="true" :type="recent" :items="items">
      <div v-if="items.length===0">
        <div class="no-record">暂无打开记录</div>
        <div @click="tapOpenDocs" class="open-doc">打开文档</div>
      </div>
    </fileList>
  </div>
</template>

<script>
import fileList from '@/components/fileList'
import i from '@/utils/util.js'
var s = i.hideLoading
var h = i.showLoading

export default {
  components: {
    fileList
  },
  data () {
    return {
      isCompanyAccount: !1,
      showWechatFile: !0,
      userAdvertBarShown: !1,
      showSlot: true,
      items: [
        {
          detail: 'this is detail',
          highlight: {
            file_name: 'File Name',
            creator_name: 'creator name'
          }
        },
        {
          detail: 'this is detail',
          highlight: {
            file_name: 'File Name',
            creator_name: 'creator name'
          }
        }
      ]
    }
  },
  methods: {
    onloadStatusChange: function (e) {
      var t = e.detail.status
      t === 'loaded' ? s() : t === 'loading' && h()
    },
    tapOpenDocs: function () {
      console.log('tap Open Docs')
    }
  },
  onLoad () {
  }
}
</script>

<style>

</style>
