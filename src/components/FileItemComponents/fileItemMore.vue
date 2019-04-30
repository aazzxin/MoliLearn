<template>
  <div class="weui-media-box__info__meta" hover-class="weui-cell_active" @click="tapMore">
    <img class="opt-item" style="width: 20px;height: 20px;margin-left: 5px" src="/static/images/more.png">
  </div>
</template>

<script>
export default {
  props: {
  },
  methods: {
    tapMore: function () {
      var e = this
      var t = e.getItemList()
      wx.showActionSheet({
        itemList: t,
        success: function (i) {
          e.mapHandler(t[i.tapIndex])
        }
      })
    },
    getItemList: function () {
      var e = ['重命名', '编辑', '删除']
      return e
    },
    mapHandler: function (e) {
      var t = ''
      switch (e) {
        case '重命名':
          this.rename()
          t = 'more_rename_click'
          break

        case '编辑':
          this.edit()
          t = 'more_rename_click'
          break

        case '删除':
          this.del()
          t = 'more_delete_click'
          break
      }
      // t.length > 0 && I.stat(t)
      console.log(t)
    },
    rename: function () {
      this.$emit('rename')
    },
    edit: function () {
      this.$emit('edit')
    },
    del: function () {
      this.$emit('del')
    }
  }
}
</script>

<style>
</style>
