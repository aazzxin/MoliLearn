<template>
  <div class="panel">
    <div :class="panelClass" @click="edit">
      <div class="weui-media-box__title">
        <div class="question-index">
          {{index}}.
        </div>
        <div class="question-title">
          <textarea id="text-area" :value="title" :disabled="true" @linechange="textAreaLineChange" v-if="!showMask" :style="('height:' + txtHeight + 'px')"/>
          <rich-text class='rich-text' :nodes="title" :style="('height:' + txtHeight + 'px')" v-else/>
        </div>
        <img :src="isColl ? '/static/images/star-active.png' : '/static/images/star.png'" class="collect-img" @click.stop="collect">
      </div>
      <div class="answer-box">
        <div class="selection" v-if="type==='select'">
          <mpCheckbox :disabled="disabledCheck" :showCorrect="showAnswer" :list="checkboxList" :single="single" :answer="answer" v-model="selectValue" @input="checkboxChange"></mpCheckbox>
        </div>
      </div>
    </div>
    <div class="edit-bar" v-if="editStatue" v-for="(btn,index) in editBtns" :key="index" :id="index">
      <mbutton :src="btn.src" :index="index" :text="btn.text" @click="editClick"></mbutton>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import api from '@/api/api.js'
import mpCheckbox from 'mpvue-weui/src/checkbox'
import mbutton from './mbutton'

export default {
  components: {
    mpCheckbox,
    mbutton
  },
  props: {
    qid: String,
    index: Number,
    title: String,
    type: {
      type: String,
      value: 'select'
    },
    single: Boolean,
    checkboxList: Array,
    isColl: Boolean,
    answer: Array,
    selectValue: Array,
    editStatue: {
      type: Boolean,
      value: false
    },
    showAnswer: {
      type: Boolean,
      value: false
    }
  },
  data () {
    return {
      editBtns: [
        {
          src: '/static/images/svgs/note.svg',
          text: '编辑'
        },
        {
          src: '/static/images/svgs/note.svg',
          text: '复制'
        },
        {
          src: '/static/images/svgs/note.svg',
          text: '上移'
        },
        {
          src: '/static/images/svgs/note.svg',
          text: '下移'
        },
        {
          src: '/static/images/delete.png',
          text: '删除'
        }
      ],
      titleWidth: 32,
      titleHeight: 24.2,
      showMask: true,
      txtHeight: 24.2
    }
  },
  computed: {
    disabledCheck () {
      return this.globalData.editableCard || this.showAnswer
    },
    panelClass () {
      return `panel-main ${this.editStatue ? 'panel-main-edit' : ''}`
    },
    editable () {
      return this.globalData.editableCard
    },
    qstStyle () {
      console.log('text length', this.title.replace(/[^\x00-\xff]/g,"ab").length)
      let height = Math.ceil(this.title.replace(/[^\x00-\xff]/g,"ab").length / this.titleWidth)
      console.log('rows', height)
      height *= this.titleHeight
      return `height: ${height}px`
    }
  },
  methods: {
    checkboxChange: function (value) {
      console.log('check:', value)
      this.$emit('checkboxChange', this.qid, this.index - 1, value)
    },
    collect () {
      const that = this
      request.request(api.CollectQst, {qid: this.qid, coll: this.isColl ? 0 : 1}).then(res => {
        that.isColl = !that.isColl
        request.showSuccessToast(that.isColl ? '收藏成功' : '成功取消收藏')
      })
    },
    edit: function () {
      if (this.globalData.editableCard) {
        // this.editStatue = !this.editStatue
        this.$emit('edit', this.editStatue ? -1 : this.index - 1)
      }
    },
    editClick: function (index) {
      switch (index) {
        case 0:
          console.log('编辑')
          this.$emit('doEdit')
          break
        case 1:
          console.log('复制')
          this.$emit('doCopy')
          break
        case 2:
          console.log('上移')
          this.$emit('doUpMove')
          break
        case 3:
          console.log('下移')
          this.$emit('doDownMove')
          break
        case 4:
          console.log('删除')
          this.$emit('doDelete')
          break
        default:
          break
      }
    },
    textAreaLineChange(e) {
      console.log('change line',  e.mp.detail.lineCount)
      this.txtHeight = (e.mp.detail.height)
      this.showMask = true
    }
  },
  onLoad () {
    this.editStatue = false
    this.titleWidth = Math.ceil((wx.getSystemInfoSync().windowWidth * 0.8) / 10.2)
    console.log('width', this.titleWidth)
    console.log('height', this.titleHeight)
    console.log('checkbox list', this.checkboxList)
    this.showMask = false
  }
}
</script>

<style>
.panel {
  display: flex;
  position: relative;
  margin-top: 10px;
  line-height: 1.41176471;
  left: 0;
  right: 0;
  width: 100%;
  flex-wrap: wrap;
}
.panel:first-child {
  margin-top: 0;
}
.panel:first-child::before {
  height: 0;
}
.panel:before {
  top: 0;
  border-top: 1rpx solid darkgray;
}
.panel:after,
.panel:before {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  color: darkgray;
}
.panel:after {
  bottom: 0;
}
.panel-main-edit {
  border-left: 1px dashed;
  border-radius: 1px;
  border-spacing: 1px;
}
.panel-main {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.weui-media-box__title {
  display: flex;
  display: -webkit-flex;
  padding: 1px 1em;
  flex-direction: row;
  background: white;
}
.question-index {
  font: 20px bold;
  font-family: '微软雅黑';
  padding-right: 0.5em;
}
.question-title {
  width: 80%;
  margin: 0 0;
  position: relative;
}
.question-title textarea{
  width: 100%;
  display: -webkit-box;
  word-break: keep-all;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: nowrap;
  padding-right: 10px;
}
.question-title rich-text {
  display: block;
  white-space: pre-line;
  width: 100%;
  padding-right: 10px;
}
.rich-text rich-text {
  overflow: hidden;
  word-break:break-all;
  word-wrap: break-word;
}
.collect-img {
  text-align: right;
  margin-right: 15px;
  width: 20px;
  height: 20px;
}
.answer-box {
  background: white;
}
.edit-bar {
  width: 20%;
  padding-top: 5px;
  padding-bottom: 5px;
  align-items: center;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  flex: auto;
  background: #fff;
}
</style>
