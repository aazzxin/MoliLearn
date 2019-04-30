<template>
  <scroll-view
  scroll-y
  style="height: 100%; align-items: center;"
  @scrolltoupper="upper"
  @scrolltolower="lower"
  @scroll="scroll"
  :scroll-into-view="toView"
  :scroll-top="scrollTop">
    <div v-for="(file,index) in items" :key="index" :id="index">
      <fileItem @click="captureTapFileItem" @rename="rename" @refresh="refresh" :cid="file.cid" :coll="file.coll" :time="file.time" :total="file.total" :deviceid="file.deviceid" :ficon="file.ficon||ficon" :fid="file.id" :fname="file.fname" :fsize="file.fsize" :fsrc="file.fsrc" :ftype="file.ftype" :groupid="file.groupid" :highlightFname="file.title" :highlightSharer="file.highlight&&file.highlight.sharer_name" :index="index" :isbindTap="isbindTap" :linkgroupid="file.linkgroupid" :mtime="file.mtime" :mtime-recent="file.mtime_recent" :nobottomline="index===items.length-1&&lastOneNoBottomLine" :parentid="file.parentid" :path="file.path" :recent_members="file.recent_members" :selectedIndexs="selectedIndexs" :sharer="file.sharer" :showFrom="showFrom" :showModifyTime="showModifyTime" :showOperate="showOperate" :showRecentTime="showRecentTime" :showSelect="showSelect" :showSharer="showSharer" :showTeamAvatar="showTeamAvatar" :sid="file.sid" :type="type" :userRole="file.user_role" :wpsCourseId="file.store===19?file.storeid:''"></fileItem>
    </div>
    <slot v-if="showSlot"></slot>
    <div class="loading" v-if="!noMoreText">{{loadMoreText}}</div>
  </scroll-view>
</template>

<script>
import fileItem from './fileItem'

export default {
  components: {
    fileItem
  },
  props: {
    type: String,
    gid: String,
    pid: String,
    showOperate: Boolean,
    showTeamAvatar: Boolean,
    isbindTap: Boolean,
    showSelect: Number,
    selectedIndexs: Array,
    lastOneNoBottomLine: Boolean,
    noMoreText: Boolean,
    items: Array
  },
  data () {
    return {
      loadMoreText: 'Loading'
    }
  },
  methods: {
    captureTapFileItem () {
      console.log('captureTapFileItem')
    },
    rename () {
      this.$emit('rename')
    },
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style>
.scroll-view{
  align-items: center;
}
.loading{
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  font-size: 1em;
  color:darkgray;
}
</style>
