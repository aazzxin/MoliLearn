<template>
  <div class="weui-media-box weui-media-box_text" style="width: 85%;">
    <navigator url="/pages/exam/main" @click="click" class="card">
      <div class="weui-media-box__title weui-media-box__title_in-text">
        {{highlightFname}}
      </div>
      <div class="weui-media-box__info" v-if="fsrc||fsize||mtime||mtime_recent||coll||time||total||sharer">
        <div class="weui-media-box__info__meta" v-if="ftype!='wpscourselink'&&showRecentTime">{{date(mtime_recent)}}</div>
        <div class="weui-media-box__info__meta" v-if="ftype!='wpscourselink'&&showModifyTime">{{date(mtime)}}</div>
        <div class="weui-media-box__info__meta" v-if="ftype!=='folder'&&fsrc&&showFrom">{{'来自 '+fsrc}} </div>
        <div class="weui-media-box__info__meta" v-if="time">发布时间：{{time}}</div>
        <div class="weui-media-box__info__meta" v-if="coll||total">题目数：{{total}} | 收藏数：{{coll}}</div>
        <div class="weui-media-box__info__meta" v-if="ftype!=='team'&&sharer&&showSharer">{{sharer}} 分享</div>
      </div>
    </navigator>
  </div>
</template>

<script>
import data from '@/components/date.js'

export default {
  props: {
    fname: String,
    ftype: String,
    fsrc: String,
    fsize: Number,
    mtime: Number,
    mtime_recent: Number,
    sharer: String,
    showSharer: Boolean,
    showRecentTime: Boolean,
    showModifyTime: Number,
    showFrom: Boolean,
    showSize: Boolean,
    path: String,
    highlightFname: String,
    highlightCreator: String,
    highlightSharer: String,
    coll: Number,
    time: String,
    total: Number
  },
  methods: {
    data: function (timestamp) {
      data.relative(timestamp)
    },
    click: function () {
      console.log('click info')
      this.globalData.editableCard = true
    }
  }
}
</script>

<style>
.weui-media-box {
  padding: 5px;
}
.weui-media-box:before {
  height: 0px;
  border-top: 1rpx solid #e5e5e5;
}
.weui-media-box_text {
  float: left;
  padding-right: 1em;
}
.weui-media-box__title_in-text {
  margin-bottom: 0px;
  color: black;
}
.weui-media-box__info {
  margin-top: 5px;
}
</style>
