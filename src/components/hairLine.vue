<template>
  <div class="wrapper">
    <block wx:if="isStatic">
    <div class="onepx_static" v-if="hasHairline">
        <div class="hairline_static" :style="{background:color}"></div>
    </div>
    <div class="normal_static" :style="{'border-top': '1px solid' + color}" wx:else></div>
    </block>
    <block wx:else>
    <div class="onepx" v-if="hasHairline">
        <div class="hairline" :style="{background:color}"></div>
    </div>
    <div class="normal" :style="{'border-top': '1px solid' + color}" wx:else></div>
    </block>
  </div>
</template>

<script>
var t = wx.getSystemInfoSync().pixelRatio > 1
export default {
  props: {
    isStatic: Boolean,
    color: String
  },
  data () {
    return {
      hasHairline: t,
      isStatic: !1,
      color: '#e6e6e6'
    }
  },
  attached: function () {
    var t = {}
    t.isStatic = this.properties.isStatic || !1
    t.color = this.properties.color || '#e6e6e6'
    this.setData(t)
  }
}
</script>

<style>

</style>
