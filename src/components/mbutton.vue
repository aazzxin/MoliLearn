<template>
  <div class="weui-btn" @click="click">
    <image :src="src" style="width: 20px;height: 20px;" />
    <text style="font-size: 14px;">{{text}}</text>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    src: {
      type: String,
      value: '/static/images/svgs/note.svg'
    },
    text: String
  },
  data () {
    return {
    }
  },
  methods: {
    click: function () {
      this.$emit('click', this.index)
    }
  }
}
</script>

<style>
.weui-btn {
  display: inline-block;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
