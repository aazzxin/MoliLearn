<template>
  <div class="panel">
    <div class="titleInput">
      <input class="weui-input" :placeholder="titleValue !== '' ? '' : '请输入标题'" v-if="editableCard === true" v-model="titleValue" @focus="inputFocus"></input>
    </div>
    <div class="panel-exam">
      <div class="questions" v-for="(item,index) in questions" :key="index" :id="index">
        <question @edit="edit" :qid="item.qid" :index="index + 1" :title="item.title" :type="item.type" 
        :checkboxList="item.checkboxList" :selectValue="item.selectValue" :single="item.single" @checkboxChange="checkboxChange"
        :answer="item.answer" :editStatue="editIndex===index" :showAnswer="compareAnswer"
        @doEdit="doEdit" @doCopy="doCopy" @doUpMove="doUpMove" @doDownMove="doDownMove" @doDelete="doDelete"></question>
      </div>
    </div>
    <div class="add-question-panel" v-if="editableCard">
      <div class="add-question" @click="addQuestion">
        <img class="add-question-img" src="/static/images/edit-add@2x.png">
        <text>添加题目</text>
      </div>
    </div>
    <div class="button-bar">
      <div class="button-box" v-if="isLast || editableCard">
        <mp-button @click="comfirm" type="primary" size="normal" btnClass="comfirmBtn">{{comfirmTxt}}</mp-button>
      </div>
    </div>
  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button'
import question from '@/components/question'
import request from '@/utils/request.js'
import api from '@/api/api.js'

export default {
  components: {
    mpButton,
    question
  },
  data () {
    return {
      editableCard: false,
      titleValue: '',
      cid: '',
      page: 0,
      total: 999,
      size: 5,
      editIndex: -1,
      questions: [
        {
          qid: 'test1',
          index: 1,
          title: 'question',
          type: 'select',
          checkboxList: [
            'selection1',
            'selection2'
          ],
          answer: [
            0
          ],
          selectValue: ['0']
        },
        {
          qid: 'test2',
          index: 2,
          title: 'question2',
          type: 'select',
          checkboxList: [
            'selection1',
            'selection2',
            'selection3'
          ],
          single: false,
          answer: [
            0
          ]
        },
        {
          qid: 'test3',
          index: 3,
          title: 'question2',
          type: 'select',
          checkboxList: [
            'selection1',
            'selection2',
            'selection3'
          ],
          single: false,
          answer: [
            0
          ]
        },
        {
          qid: 'test4',
          index: 4,
          title: 'question2',
          type: 'select',
          checkboxList: [
            'selection1',
            'selection2',
            'selection3'
          ],
          single: false,
          answer: [
            0, 2
          ]
        },
        {
          qid: 'test5',
          index: 5,
          title: 'question2',
          type: 'select',
          checkboxList: [
            'selection1',
            'selection2',
            'selection3',
            'selection4'
          ],
          single: false,
          answer: [
            0, 1, 3
          ]
        }
      ],
      answers: {
      },
      compareAnswer: false
    }
  },
  computed: {
    isLast () {
      return this.questions.length === this.total
    },
    comfirmTxt () {
      return this.editableCard ? '保存修改' : this.compareAnswer ? '确认' : '提交答案'
    }
  },
  methods: {
    inputFocus: function (ev) {
      console.log(ev)
    },
    edit: function (index) {
      this.editIndex = index
    },
    checkboxChange: function (qid, index, value) {
      this.answers[qid] = value
      console.log('answers', this.answers)
      this.questions[index].selectValue = value
    },
    loadQst: function (callback) {
      var that = this
      request.request(this.globalData.editableCard ? api.EditQuestions : api.QuestionsList, {cid: this.cid, page: this.page + 1, size: this.size}).then(res => {
        if (res.data.length > 0) {
          that.page += 1
          that.questions = that.questions.concat(res.data)
        } else {
          that.total = that.questions.length
        }
        console.log('questions length', that.questions.length)
        console.log('total', that.total)
        that.$forceUpdate()

        if (callback) {
        }
          callback()
      })
    },
    submitComfirm: function () {
      let uncheckIdxs = [];
      console.log('answer', this.questions)
      for (let i = 0; i < this.questions.length; i++) {
        if (!this.answers[this.questions[i].qid] || this.answers[this.questions[i].qid].length === 0) {
          uncheckIdxs.push(this.questions[i].index)
        }
      }
      let uncheckStr = uncheckIdxs.length > 0 ? '你有以下题目未作答：\r\n' + uncheckIdxs.join(' ') + '\r\n' : ''
      var that = this
      wx.showModal({
        content: uncheckStr + '确认提交答案',
        success (res) {
          if (res.confirm) {
            request.request(api.SubmitAnswer, {cid: that.cid, answers: that.answers}).then(res => {
              that.compareAnswer = true
              console.log('questions', that.questions)
              for (let i = 0; i < that.questions.length; i++) {
                let qid = that.questions[i].qid
                if (res.data[qid]) {
                 that.questions[i].answer = res.data[qid]
                }
              }
            })
          }
        }
      })
    },
    doEdit: function () {
      this.globalData.editQuestion = this.questions[this.editIndex]
      const url = '/pages/question/main'
      mpvue.navigateTo({ url })
    },
    doCopy: function () {
      let index = this.editIndex
      this.questions.splice(index, 0, this.questions[index])
    },
    doUpMove: function () {
      let index = this.editIndex
      if (index > 0) {
        console.log(index)
        let temp = this.questions[index]
        this.questions[index] = this.questions[index - 1]
        this.questions[index - 1] = temp
        this.editIndex -= 1
      }
    },
    doDownMove: function () {
      let index = this.editIndex
      if (index < this.questions.length - 1) {
        console.log(index)
        let temp = this.questions[index]
        this.questions[index] = this.questions[index + 1]
        this.questions[index + 1] = temp
        this.editIndex += 1
      }
    },
    doDelete: function () {
      let that = this
      wx.showModal({
        content: '确认删除',
        success (res) {
          if (res.confirm) {
            that.questions.splice(that.editIndex, 1)
            that.editIndex = -1
          }
        }
      })
    },
    addQuestion: function () {
      this.editIndex = -1
      this.globalData.editQuestion = null
      const url = '/pages/question/main'
      mpvue.navigateTo({ url })
    },
    // 通知上一页编辑成功
    editSuccess: function () {
      console.log('edit success')
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      prevPage.setData({
        editSuccess: true
      })
      wx.navigateBack({
        // 返回
        delta: 1
      })
    },
    saveComfirm: function () {
      // 检测
      if (this.titleValue === '') {
        request.showErrorToast('请填写题库标题')
        return
      }
      // 刷新index
      for (let i = 0; i < this.questions.length; i++) {
        if (!this.questions[i].selectValue || this.questions[i].selectValue.length === 0) {
          request.showErrorToast('请为选择题勾选答案')
          return
        }
        this.questions[i].index = i + 1
      }
      var that = this
      wx.showModal({
        content: '确认保存修改',
        success (res) {
          if (res.confirm) {
            if (that.cid) {
              // cid不为空则修改题库
              request.request(api.SaveEdit, {cid: that.cid, title: that.titleValue, questions: that.questions}).then(res => {
                that.editSuccess()
              })
            } else {
              // 否则为新建题库
              request.request(api.AddCard, {title: that.titleValue, questions: that.questions}).then(res => {
                that.editSuccess()
              })
            }
          }
        }
      })
    },
    backComifrm: function () {
      // 标记答题后返回
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      prevPage.setData({
        submitSuccess: true
      })
      wx.navigateBack({
        delta: 1
      })
    },
    comfirm: function () {
      if (this.editableCard) {
        this.saveComfirm()
      } else if (this.compareAnswer) {
        this.backComifrm()
      } else {
        this.submitComfirm()
      }
    }
  },
  onLoad () {
    this.editableCard = this.globalData.editableCard
    this.cid = this.globalData.editCard.cid
    this.titleValue = this.globalData.editCard.title
    this.answers = {}
    this.compareAnswer = false
    this.loadedQsts = []
    this.page = 0
    this.questions = []
    this.editIndex = -1
    var that = this
    request.request(api.CardTotal, {cid: this.cid}).then(res => {
      that.total = res.data
    })
    this.loadQst()
  },
  onShow () {
    let pages = getCurrentPages()
    let currPage = pages[pages.length - 1]
    if (currPage.data.editQst && currPage.data.editQst !== null) {
      console.log('edit qst success!', currPage.data)
      if (this.editIndex === -1) {
        this.questions.push(currPage.data.editQst)
      } else {
        this.questions[this.editIndex] = currPage.data.editQst
      }
      currPage.data.editQst = null
    }
    this.$forceUpdate()
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    // 显示顶部刷新图标
    if (!this.isLast) {
      wx.showNavigationBarLoading()
      this.loadQst(function () {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading()
        // 停止下拉动作
        wx.stopPullDownRefresh()
      })
    } else {
      // 停止下拉动作
      wx.stopPullDownRefresh()
    }
  }
}
</script>

<style>
.panel {
  height: 100%;
  display: flex;
  padding-bottom: 1em;
}
.titleInput {
  display: flex;
  flex-direction: column;
  padding: 3px 6px;
  left: 0;
  right: 0;
  width: 100%;
  flex-wrap: wrap;
  border-bottom: 1px solid darkolivegreen;
}
.panel-exam {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95%;
  background-color: #e5e5e5;
}
.questions {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.add-question-panel {
  background: #e5e5e5;
  width: 100%;
}
.add-question {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-top: 25px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 25px;
  background: white;
}
.add-question-img {
  width: 24px;
  height: 24px;
  padding-right: 2px;
}
.button-bar {
  position: fixed;
  bottom: -6px;
  width: 100%;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  flex: auto;
  margin-top: 1.2em;
  background: #fff;
}
.button-box {
  width: 100%;
}
</style>
