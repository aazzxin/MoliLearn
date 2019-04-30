<template>
  <div>
    <div class="weui-cells" @click="tapFile" hover-class="weui-cell_active">
      <div class="weui-panel__hd">
        <fileItemInfo :coll="coll" :time="time" :total="total" :name="fname" :fsize="fsize" :fsrc="fsrc" :ftype="ftype" :highlightCreator="highlightCreator" :highlightFname="highlightFname" :highlightSharer="highlightSharer" :mtime="mtime" :mtime-recent="mtime_recent" :path="path" :sharer="sharer" :showFrom="showFrom" :showModifyTime="showModifyTime" :showRecentTime="showRecentTime" :showSharer="showSharer" :showSize="showSize"></fileItemInfo>
        <fileItemMore @rename="rename" @edit="edit" @del="del"></fileItemMore>
        <fileItemSelect :index="index" :selectedIndexs="selectedIndexs" v-if="showSelect>=3||ftype==='folder'&&showSelect>=2||(ftype==='file'||ftype==='sharefile')&&showSelect>=1"></fileItemSelect>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import api from '@/api/api.js'
import fileItemInfo from '@/components/FileItemComponents/fileItemInfo'
import fileItemMore from '@/components/FileItemComponents/fileItemMore'
import fileItemSelect from '@/components/FileItemComponents/fileItemSelect'

export default {
  components: {
    fileItemInfo,
    fileItemMore,
    fileItemSelect
  },
  props: {
    cid: String,
    index: Number,
    ficon: String,
    mtime_recent: Number,
    mtime: Number,
    fsize: Number,
    fsrc: String,
    ftype: String,
    fname: String,
    groupid: Number,
    parentid: Number,
    deviceid: Number,
    nobottomline: Boolean,
    type: String,
    isbindTap: Boolean,
    isBindTapOperate: Boolean,
    userRole: String,
    recent_members: Array,
    showOperate: {
      type: Boolean,
      value: !0
    },
    showSelect: Number,
    selectedIndexs: Array,
    showFrom: Boolean,
    showSize: Boolean,
    showRecentTime: Boolean,
    showModifyTime: Boolean,
    showTeamAvatar: Boolean,
    path: String,
    highlightFname: String,
    highlightCreator: String,
    highlightSharer: String,
    wpsCourseId: String,
    coll: Number,
    time: String,
    total: Number,
    sharer: String,
    showSharer: Boolean,
    linkgroupid: String
  },
  data () {
    return {
    }
  },
  methods: {
    tapFile: function (ev) {
      this.globalData.editCard.cid = this.cid
      this.globalData.editCard.title = this.highlightFname
    },
    rename () {
      this.$emit('rename')
    },
    edit () {
      console.log('edit')
      this.globalData.editableCard = true
      const url = '/pages/exam/main'
      mpvue.navigateTo({ url })
    },
    del () {
      console.log('del')
      const that = this
      wx.showModal({
        content: '确认删除该题库',
        success (res) {
          if (res.confirm) {
            request.request(api.DeleteCard, {cid: that.cid}).then(res => {
              that.$emit('refresh')
            })
          }
        }
      })
    }
  }
}
</script>

<style>
.weui-cells:before,
.weui-cells:after {
  content: '';
}
.weui-cells {
  margin-top: 0;
}
</style>
