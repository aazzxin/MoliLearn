<template>
  <div @click="clickHandle">
    <mp-searchbar :isFocus=true :inputValue="inputValue" :placeholder="placeholder" @input="input" @blur="blur" @focus="focus" @confirm="confirm"></mp-searchbar>

    <div class="usermotto">
      <div class="weui-cells__title"></div>
      <div v-for="(item,index) in cards" :key="index" :id="index">
        <card :publisher="item.publisher" :time="item.time"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import mpSearchbar from 'mpvue-weui/src/searchbar'
import request from '@/utils/request.js'
import api from '@/api/api.js'

export default {
  data () {
    return {
      inputValue: '',
      placeholder: '',
      cards: [
        {
          publisher: 'user',
          time: '2018/12/24'
        },
        {
          publisher: 'asd',
          time: '2019/01/08'
        }
      ],
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      index: {}
    }
  },

  components: {
    card,
    mpSearchbar
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    input (ev) {
      console.log('input:', ev)
    },
    blur (ev) {
      console.log('blur:', ev)
    },
    focus (ev) {
      console.log('focus:', ev)
    },
    confirm (ev) {
      console.log('confirm:', ev)
    }
  },

  onLoad () {
    request.request(api.IndexUrl).then(res => {
      console.log('request')
      this.setData({
        cards: res.data.cards
      })
    })
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.usermotto {
  margin-top: 20px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
