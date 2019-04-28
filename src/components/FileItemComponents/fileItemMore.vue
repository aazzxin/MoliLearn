<template>
  <div class="weui-media-box__info__meta" hover-class="weui-cell_active" @click="tapMore">
    <img class="opt-item" style="width: 20px;height: 20px;margin-left: 5px" src="/static/images/more.png">
  </div>
</template>

<script>
export default {
  props: {
    ftype: String,
    groupid: Number,
    parentid: Number,
    deviceid: Number,
    fsrc: String,
    linkgroupid: String,
    fname: String,
    path: String,
    fsize: Number,
    isBindTapOperate: Boolean
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
      var e = ['重命名', '编辑', '选择多项', '删除']
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

        case '选择多项':
          this.multiple()
          t = 'more_multiselect_click'
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
      var e = this.props
      var t = e.groupid
      var i = e.fid
      var r = e.fname
      var o = e.ftype
      o === 'team' ? this.toRename(t, '0', r, o) : this.toRename(t, i, r, o)
    },
    toRename: function (e, t, i, r) {

    },
    edit: function () {
    },
    multiple: function () {

    },
    del: function () {
    }
  }
}
</script>

<style>
</style>
