<template>
  <div>
    <div class="weui-cells">
      <navigator url="/pages/exam/main" @click="click" class="card" hover-class="weui-cell_active">
        <div class="weui-panel__hd">
          <div class="weui-media-box__info__meta">
            <image :src="avatar ? avatar : '/static/images/user.png'" style="width: 20px;height: 20px;margin-right: 5px; border-radius: 50%;" />
          </div>
          <div class="publisher"> {{publisher}} </div>
          <div class="publish-time">{{time}}</div>
          <img :src="isColl ? '/static/images/star-active.png' : '/static/images/star.png'" class="collect-img" @click.stop="collect">
        </div>
        <div class="weui-panel__bd">
          <view class="weui-media-box weui-media-box_text">
            <view class="weui-media-box__title weui-media-box__title_in-text">{{title}}</view>
            <view class="weui-media-box__info">
              <view class="weui-media-box__info__meta">收藏：{{coll}}</view>
            </view>
          </view>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import api from '@/api/api.js'
export default {
  props: ['cid', 'title', 'avatar', 'publisher', 'time', 'coll', 'isColl'],
  methods: {
    click: function () {
      this.globalData.editableCard = false
      this.globalData.editCard.cid = this.cid
    },
    collect () {
      const that = this
      request.request(api.CollectCard, {cid: this.cid, coll: this.isColl ? 0 : 1}).then(res => {
        that.isColl = !that.isColl
        request.showSuccessToast(that.isColl ? '收藏成功' : '成功取消收藏')
      })
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
.release_time {
  align-items: flex-end; 
}
.weui-panel__hd {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1px 15px;
}
.weui-media-box {
  padding-top:5px;
  padding-bottom: 5px;
}
.publisher {
  padding-right: 15px;
  color:cornflowerblue;
  white-space: nowrap;
}
.publish-time {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: end;
  z-index: 500;
  top: 0;
  width: 100%;
  position: relative;
  border-left: 1px solid #cecece;
}
.collect-img {
  text-align: right;
  margin-right: 15px;
  width: 30px;
  height: 20px;
}
</style>
