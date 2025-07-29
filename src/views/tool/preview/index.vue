<template>
  <div class="preview-container">
    <div class="event-wrapper">
      <el-button @click="previewDoc">docx预览</el-button>
      <el-button @click="previewPdf">pdf预览</el-button>
      <el-button @click="previewExcel">excel预览</el-button>
    </div>
    <PreviewDialog ref="PreviewDialogRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PreviewDialog from "@/components/Preview/index.vue";

const PreviewDialogRef = ref();

const previewDoc = () => {
  const params = {
    url: "https://www.flowertipcn/docs/test.docx",
    type: "docx",
  };
  PreviewDialogRef.value.acceptParams(params);
};

const previewPdf = () => {
  const params = {
    url: "https://www.flowertipcn/docs/test.pdf",
    type: "pdf",
  };
  PreviewDialogRef.value.acceptParams(params);
};

const previewExcel = () => {
  const params = {
    url: "https://www.flowertipcn/docs/test.xlsx",
    type: "excel",
  };
  PreviewDialogRef.value.acceptParams(params);
};
</script>

<style lang="scss" scoped>
.preview-container {
  height: 100%;
  padding: 20px;
  background-color: #fff;
}
</style>
