<template>
  <div class="panel">
    <div class="panel-exam">
      <div class="questions" v-for="(item,index) in questions" :key="index" :id="index">
        <question :editable="editable" @edit="edit" :index="item.index" :title="item.title" :type="item.type" :checkboxList="item.checkboxList" :single="item.single" :editStatue="editIndex===index"></question>
      </div>
    </div>
    <div class="button-bar">
      <div class="button-box" v-if="page!==1">
        <mp-button @click="last" type="default" size="normal" btnClass="lastBtn">上一页</mp-button>
      </div>
      <div class="button-box" :style="page===1?'padding-left:50%':''">
        <mp-button @click="next" type="default" size="normal" btnClass="nextBtn" >下一页</mp-button>
      </div>
    </div>
  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button'
import question from '@/components/question'

export default {
  components: {
    mpButton,
    question
  },
  data () {
    return {
      eid: '',
      page: 1,
      editable: true,
      editIndex: -1,
      questions: [
        {
          index: 1,
          title: 'question',
          type: 'select',
          checkboxList: [
            {value: 'selection1'},
            {value: 'selection2'}
          ]
        },
        {
          index: 2,
          title: 'question2',
          type: 'select',
          checkboxList: [
            {value: 'selection1'},
            {value: 'selection2'},
            {value: 'selection3'}
          ],
          single: false
        },
        {
          index: 3,
          title: 'question2',
          type: 'select',
          checkboxList: [
            {value: 'selection1'},
            {value: 'selection2'},
            {value: 'selection3'}
          ],
          single: false
        },
        {
          index: 4,
          title: 'question2',
          type: 'select',
          checkboxList: [
            {value: 'selection1'},
            {value: 'selection2'},
            {value: 'selection3'}
          ],
          single: false
        },
        {
          index: 5,
          title: 'question2',
          type: 'select',
          checkboxList: [
            {value: 'selection1'},
            {value: 'selection2'},
            {value: 'selection3'},
            {value: 'selection4'}
          ],
          single: false
        }
      ]
    }
  },
  methods: {
    edit: function (index) {
      this.editIndex = index
    },
    last: function () {
      this.page -= 1
      console.log(this.page)
    },
    next: function () {
      this.page += 1
      console.log(this.page)
    }
  },
  onLoad () {
  }
}
</script>

<style>
.panel {
  height: 100%;
  display: flex;
  padding-bottom: 1em;
}
.panel-exam {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 0.3em;
  height: 98%;
  background-color: #e5e5e5;
}
.questions {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.button-bar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  flex: auto;
  background: #fff;
}
.button-box {
  width: 50%;
}
.lastBtn,
.nextBtn {
  width: 100%;
}
</style>
