<template>
  <div class="event-wrapper">
    <el-button @click="previewDoc">docx预览</el-button>
    <el-button @click="previewPdf">pdf预览</el-button>
    <el-button @click="previewExcel">excel预览</el-button>
  </div>
  <PreviewDialog ref="PreviewDialogRef" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PreviewDialog from '@/components/Preview/index.vue';


const PreviewDialogRef = ref();

const previewDoc = () => {
  const params = {
    url: 'http://static.shanhuxueyuan.com/test.docx',
    type: 'docx'
  }
  PreviewDialogRef.value.acceptParams(params)
}

const previewPdf = () => {
  const params = {
    url: 'http://static.shanhuxueyuan.com/test.pdf',
    type: 'pdf'
  }
  PreviewDialogRef.value.acceptParams(params)
}

const previewExcel = () => {
  const params = {
    url: 'http://static.shanhuxueyuan.com/test.xlsx',
    type: 'excel'
  }
  PreviewDialogRef.value.acceptParams(params)
}
</script>

<style lang="scss" scoped>
.event-wrapper {
  height: 100%;
  padding: 20px;
  background-color: #fff;
}
</style>
