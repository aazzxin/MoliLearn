<template>
  <div>
    <div class="weui-cells">
      <navigator url="/pages/exam/main" class="card" hover-class="weui-cell_active">
        <div class="weui-panel__hd">
          <div class="weui-media-box__info__meta">
            <image src="/static/images/user.png" style="width: 20px;height: 20px;margin-right: 5px" />
          </div>
          <div class="publisher"> {{publisher}} </div>
          <div class="publish-time">{{time}}</div>
        </div>
        <div class="weui-panel__bd">
          <view class="weui-media-box weui-media-box_text">
            <view class="weui-media-box__title weui-media-box__title_in-text">标题一</view>
            <view class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</view>
            <view class="weui-media-box__info">
              <view class="weui-media-box__info__meta">文字来源</view>
              <view class="weui-media-box__info__meta">时间</view>
              <view class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</view>
            </view>
          </view>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
export default {
  props: ['publisher', 'time']
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
.publisher {
  padding-right: 15px;
  color:cornflowerblue;
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
