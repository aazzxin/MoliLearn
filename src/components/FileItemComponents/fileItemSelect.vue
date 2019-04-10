<template>
  <div class="wrapper">
    <img class="selected_icon" :src="contains(selectedIndexs,index)?'/static/images/round_checked.png':'/static/images/round_unchecked.png'">
  </div>
</template>

<script>
import utils from '@/components/utils.js'

export default {
  props: {
    selectedIndexs: Array,
    index: Number
  },
  methods: {
    contains (selectedIndexs, index) {
      utils.contains(selectedIndexs, index)
    }
  }
}
</script>

<style>

</style>
