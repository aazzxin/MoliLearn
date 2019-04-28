<template>
  <div class="panel">
    <div :class="panelClass" @click="edit">
      <div class="weui-media-box__title">
        <div class="question-index">
          {{index}}.
        </div>
        <div class="question-title">
          {{title}}
        </div>
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
      disabledCheck: false,
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
  computed: {
    panelClass () {
      return `panel-main ${this.editStatue ? 'panel-main-edit' : ''}`
    },
    editable () {
      return this.globalData.editableCard
    }
  },
  methods: {
    checkboxChange: function (value) {
      console.log('check:', value)
      this.$emit('checkboxChange', this.qid, value)
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
    }
  },
  onLoad () {
    this.editStatue = false
    this.disabledCheck = this.globalData.editableCard
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
  padding-right: 1em;
}
.question-title {
  font: 18px ;
  font-family: '微软雅黑';
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
