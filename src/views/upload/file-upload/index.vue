<template>
  <div class="page-container">
    <div class="upload-item">
      <h3>单份文件上传</h3>
      <div class="wrapper">
        <FileUpload :limit="1" :disabled="false" />
      </div>
    </div>
    <div class="upload-item">
      <h3>多份文件上传</h3>
      <div class="wrapper">
        <FileUpload :limit="5" :disabled="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FileUpload from "@/components/Upload/file.vue";
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .upload-item {
    width: 100%;
    padding: 40px;
    h3 {
      font-size: 20px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
