<template>
  <div class="panel">
    <div class="panel-main" @click="edit">
      <div class="weui-media-box__title">
        <div class="question-index">
          第{{index}}题
        </div>
        <div class="question-title">
          {{title}}
        </div>
      </div>
      <div class="answer-box">
        <div class="selection" v-if="type==='select'">
          <mpCheckbox :disabled="disabledCheck" :list="checkboxList" :single="single" v-model="selectValue" @input="checkboxChange"></mpCheckbox>
        </div>
      </div>
    </div>
    <div class="edit-bar" v-if="editStatue" v-for="(btn,index) in editBtns" :key="index" :id="index">
      <mbutton :src="btn.src" :text="btn.text"></mbutton>
    </div>
  </div>
</template>

<script>
import mpCheckbox from 'mpvue-weui/src/checkbox'
import mbutton from './mbutton'

export default {
  components: {
    mpCheckbox,
    mbutton
  },
  props: {
    editable: Boolean,
    index: Number,
    title: String,
    type: {
      type: String,
      value: 'select'
    },
    single: Boolean,
    checkboxList: Array,
    editStatue: {
      type: Boolean,
      value: false
    }
  },
  data () {
    return {
      disabledCheck: false,
      selectValue: [],
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
      ]
    }
  },
  methods: {
    checkboxChange: function (value) {
      console.log('check:', value)
    },
    edit: function () {
      if (this.editable) {
        // this.editStatue = !this.editStatue
        this.$emit('edit', this.editStatue ? -1 : this.index - 1)
      }
    }
  },
  onLoad () {
    if (this.editable) {
      this.disabledCheck = true
    }
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
.panel::before {
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
.panel-main {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.weui-media-box__title {
  display: flex;
  display: -webkit-flex;
  padding-left: 1em;
  flex-direction: row;
  background: white;
}
.question-index {
  font-size: 20px;
  font-family: '微软雅黑';
  padding-right: 1em;
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
