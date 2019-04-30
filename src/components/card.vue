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
export default {
  props: ['cid', 'title', 'avatar', 'publisher', 'time', 'coll'],
  methods: {
    click: function () {
      this.globalData.editableCard = false
      this.globalData.cid = this.cid
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
  padding: 0%
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
</style>
