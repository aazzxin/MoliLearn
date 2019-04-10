<template>
  <div>
    <img :class="size" :src="getSvg(type)">
  </div>
</template>

<script>

export default {
  props: {
    type: String,
    size: {
      type: String,
      value: 'normal'
    }
  },
  methods: {
    getSvg: function (type) {
      var klass
      switch (type) {
        case 'teams':
          klass = 'teamlist'
          break
        case 'img':
          klass = 'img'
          break
        case 'auto':
          klass = 'uploadfile'
          break
        case 'xls':
          ;
        case 'xlsx':
          klass = 'xls'
          break
        case 'docx':
          ;
        case 'rtf':
          klass = 'doc'
          break
        case 'txt':
          ;
        case 'text':
          klass = 'text'
          break
        case 'pptx':
          klass = 'ppt'
          break
        case 'code':
          klass = 'unknown'
          break
        case 'wpscourselink':
          klass = 'wps_course'
          break
        default:
          klass = type
      };
      return ('/static/images/svgs/' + klass + '.svg')
    }
  }
}
</script>

<style>

</style>
