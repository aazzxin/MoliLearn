<template>
  <div class="panel">
    <div class="panel-title">
      <text class="desc-text">标题</text>
      <div class="input-bar">
        <div class="title-input">
          <input class="weui-input" :placeholder="title !== '' ? '' : '输入标题'" v-model="title" :maxlength="255" @focus="inputFocus"></input>
        </div>
        <div class="bolck"></div>
      </div>
    </div>
    <text class="desc-text">答案 选项</text>
    <div class="panel-select">
      <div class="selection-list" v-for="(item,index) in selections" :key="index" :id="index">
        <div class="selection">
          <img class="checkImg" @click="checkSelection(index)" :src="item.checked ? '/static/images/round_checked.png' : '/static/images/round_unchecked.png'">
          <div class="selection-input">
            <input class="weui-input" :placeholder="item.value !== '' ? '' : '输入选项'" v-model="item.value" @focus="inputFocus"></input>
          </div>
          <img class="deleteSelectionImg" src="/static/images/edit-minus@2x.png" @click="deleteSelection(index)">
        </div>
      </div>
      <div class="add-selection-bar">
        <div class="addBtn" @click="addSelecion">
          <img class="addBtnImg" src="/static/images/edit-add@2x.png">
          <text class="addSelectionTxt">添加选项</text>
        </div>
      </div>
    </div>
    <text class="desc-text">设置</text>
    <div class="panel-setting">
      <div class="single-bar">
        <text class="singleTxt">切换多选</text>
        <div class="singleSwitch">
          <switch :checked="nonSingleValue" @change="switchChange"></switch>
        </div>
      </div>
    </div>
    <div class="button-bar">
      <div class="button-box">
        <mp-button @click="comfirm" type="primary" size="normal" btnClass="comfirmBtn">确认编辑</mp-button>
      </div>
    </div>
  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button'
import request from '@/utils/request.js'

export default {
  components: {
    mpButton
  },
  data () {
    return {
      title: '',
      answerIndex: -1,
      nonSingle: null,
      selections: []
    }
  },
  watch: {
    nonSingle (val) {
      if (!val) {
        let i = 0
        for (; i < this.selections.length; i++) {
          if (this.selections[i].checked) {
            this.answerIndex = i
            i += 1
            break
          }
        }
        for (; i < this.selections.length; i++) {
          this.selections[i].checked = false
        }
      }
    }
  },
  computed: {
    nonSingleValue () {
      console.log('compute non single', this.nonSingle)
      return this.nonSingle
    }
  },
  methods: {
    checkSelection: function (index) {
      this.selections[index].checked = !this.selections[index].checked
      if (this.selections[index].checked) {
        if (!this.nonSingle && this.answerIndex > -1) {
          this.selections[this.answerIndex].checked = false
        }
        this.answerIndex = index
      }
    },
    deleteSelection: function (index) {
      this.selections.splice(index, 1)
      console.log('delete selection', this.selections)
    },
    addSelecion: function () {
      console.log('add selection')
      this.selections.push({value: '', checked: false})
    },
    comfirm: function () {
      if (this.title === '') {
        request.showErrorToast('请填写题目标题')
        return
      }
      var checkboxList = []
      var answer = []
      let qstLength = 2 // 包括[]字符，限制在400内
      for (let i = 0; i < this.selections.length; i++) {
        if (this.selections[i].value === '') {
          request.showErrorToast('请补充选项内容')
          return
        }
        qstLength += this.selections[i].value.length
        checkboxList.push(this.selections[i].value)
        if (this.selections[i].checked) {
          answer.push(i.toString())
        }
      }
      if (qstLength + this.selections.length > 398) {
        request.showErrorToast('选项内容过多')
        return
      }
      if (answer.length === 0) {
        request.showErrorToast('勾选一个答案')
        return
      }
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      prevPage.setData({
        editQst: {
          title: this.title,
          type: 'select',
          single: !this.nonSingle,
          checkboxList: checkboxList,
          selectValue: answer
        }
      })
      wx.navigateBack({
        // 返回
        delta: 1
      })
    },
    switchChange: function (e) {
      this.nonSingle = e.mp.detail.value
    }
  },
  onLoad () {
    this.nonSingle = null
    if (this.globalData.editQuestion) {
      this.title = this.globalData.editQuestion.title
      this.selections = this.globalData.editQuestion.checkboxList.map(item => {
        return { value: item, checked: false };
      });
      this.nonSingle = this.globalData.editQuestion.selectValue.length > 1
      for (let i = 0; i < this.globalData.editQuestion.selectValue.length; i++) {
        let idx = parseInt(this.globalData.editQuestion.selectValue[i])
        this.selections[idx].checked = true
      }
    } else {
      this.title = ''
      this.selections = [{value: '', checked: false}]
      this.nonSingle = false
    }
  },
  onShow () {
    this.$forceUpdate()
    console.log('nonsingle', this.nonSingle)
  }
}
</script>

<style>
.panel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color:rgb(218, 218, 218);
}
.desc-text {
  width: 100%;
  font-size: 14px;
  font: rgb(172, 172, 172);
  display: block;
  padding-left: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.panel-title {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}
.input-bar {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
}
.title-input {
  width: 100%;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  flex: auto;
  flex-wrap: wrap;
  border-radius: 5px;
  background: #fff;
  border: 1rpx solid #e6e6ea;
}
.panel-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}
.selection {
  width: 100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  padding: 1px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.selection:first-child:before {
  display: none;
}
.selection:before {
  content: ' ';
  position: absolute;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1rpx solid #d9d9d9;
  color: #d9d9d9;
  left: 15px;
}
.checkImg {
  width: 18px;
  height: 18px;
  padding-right: 8px;
  padding-bottom: 1px;
  padding-top: 1px; 
}
.selection-input {
  size: 16px;
  width: 70%;
  margin-right: 65px;
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  flex: auto;
  flex-wrap: wrap;
}
.deleteSelectionImg {
  position: absolute;
  right: 45px;
  width: 18px;
  height: 18px;
  padding-bottom: 1px;
  padding-top: 1px; 
}

.add-selection-bar {
  width: 100%;
  background: #fff;
}
.addBtn {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.addBtnImg {
  width: 24px;
  height: 24px;
  padding-right: 5px;
  padding-left: 15px;
  padding-bottom: 15px;
  padding-top: 15px; 
}
.addSelectionTxt {
  font-size: 16px;
  font: rgb(77, 77, 204);
}
.panel-setting {
  width: 100%;
  display: flex;
  background: #fff;
}
.single-bar {
  width: 100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  padding: 5px 15px;
}
.singleTxt {
  font-size: 16px;
}
.singleSwitch {
  position: absolute;
  right: 15px;
  height: 15px;
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
  position: relative;
  right: 0;
  width: 100%;
}
.comfirmBtn {
  width: 100%;
}
</style>
