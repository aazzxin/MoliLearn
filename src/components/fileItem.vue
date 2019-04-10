<template>
  <div>
    <div class="weui-cells" @click="tapFile">
      <div class="weui-panel__hd">
        <fileItemInfo :detail="detail" :name="fname" :fsize="fsize" :fsrc="fsrc" :ftype="ftype" :highlightCreator="highlightCreator" :highlightFname="highlightFname" :highlightSharer="highlightSharer" :mtime="mtime" :mtime-recent="mtime_recent" :path="path" :sharer="sharer" :showFrom="showFrom" :showModifyTime="showModifyTime" :showRecentTime="showRecentTime" :showSharer="showSharer" :showSize="showSize"></fileItemInfo>
        <fileItemMore :deviceid="deviceid" :fid="fid" :fname="fname" :fsize="fsize" :fsrc="fsrc" :ftype="ftype" :groupid="groupid" :isBindTapOperate="isBindTapOperate" :linkgroupid="linkgroupid" :parentid="parentid" :path="path" :sid="sid" v-if="showOperate&&ftype!=='wpscourselink'"></fileItemMore>
        <fileItemSelect :index="index" :selectedIndexs="selectedIndexs" v-if="showSelect>=3||ftype==='folder'&&showSelect>=2||(ftype==='file'||ftype==='sharefile')&&showSelect>=1"></fileItemSelect>
      </div>
    </div>
  </div>
</template>

<script>
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
    fid: String,
    sid: String,
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
    detail: String,
    sharer: String,
    showSharer: Boolean,
    linkgroupid: String
  },
  data () {
    return {
      fileSid: '',
      platform: '',
      wpsCourseAppid: 'wx8b11aa0e50eb061a',
      wpsCoursePath: 'src/pages/timetable/index'
    }
  },
  methods: {
    tapFile: function (ev) {
      console.log('tap file:', ev)
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
