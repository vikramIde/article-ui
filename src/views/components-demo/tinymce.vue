<template>
  <div class="components-container">
    <code>
      {{ $t('components.tinymceTips') }}
    </code>
    <div>
      <el-input v-model="title" placeholder="Title" style="margin-bottom:20px"/>
      <tinymce :height="300" v-model="content"/>
    </div>
    <el-input
      :autosize="{ minRows: 2, maxRows: 4}"
      v-model="excrept"
      type="textarea"
      placeholder="Please input short exprect"
      style="margin-top:20px"/>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      title: '',
      excrept: '',
      content:
      `<h1 style="text-align: center;">Welcome to the Post Editor</h1>
      <p style="text-align: center; font-size: 15px;"></p>`
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

