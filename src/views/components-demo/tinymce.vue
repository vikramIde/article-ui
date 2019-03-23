<template>
  <div class="components-container">
    <div>
      <el-input v-model="title" placeholder="Title" style="margin-bottom:10px"/>
      <el-select v-model="value5" multiple placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <input id="file_upload" type="file" multiple="true">
      <el-input
        :autosize="{ minRows: 10, maxRows: 10}"
        v-model="content"
        type="textarea"
        placeholder="Please input details"
        style="margin-top:10px"/>
        <!-- <tinymce :height="300" v-model="content"/> -->
    </div>
    <el-input
      :autosize="{ minRows: 2, maxRows: 4}"
      v-model="excrept"
      type="textarea"
      placeholder="Please input short exprect"
      style="margin-top:20px;margin-bottom:10px"/>
    <el-button style="float:right" @click="submit">Submit</el-button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { createArticle } from '@/api/article'
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      title: '',
      excrept: '',
      content: '',
      files: [],
      value5: '',
      options: [{
        value: 'Lisure1',
        label: 'Lisure'
      }, {
        value: 'Technical2',
        label: 'Technical'
      }, {
        value: 'Uncategorised3',
        label: 'Uncategorised'
      }, {
        value: 'Music4',
        label: 'Music'
      }, {
        value: 'Travel5',
        label: 'Travel'
      }]
    }
  },
  methods: {
    handlePreview(file) {
      debugger
      this.files.push(file)
    },

    submit() {
      const data = new FormData()
      data.user_id = this.$store.getters.user_id
      var blog_file = document.querySelector('#file_upload')
      data.append('blog_file', blog_file.files[0])
      data.append('title', this.title)
      data.append('description', this.content)
      data.append('excerpts', this.excrept)
      createArticle(data)
        .then(res => {
          console.log(res)
        })
        .catch(res => {

        })
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

