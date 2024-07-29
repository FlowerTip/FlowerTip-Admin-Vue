<template>
  <div class="page-container">
    <div class="upload-item">
      <h3>多张图片上传</h3>
      <div class="wrapper">
        <ImgListUpload>
          <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
        </ImgListUpload>
      </div>
    </div>
    <div class="upload-item">
      <h3>禁用上传组件</h3>
      <div class="wrapper">
        <ImgListUpload :disabled="true">
          <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
        </ImgListUpload>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImgListUpload from "@/components/Upload/img.vue";
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
    padding: 10px;

    h3 {
      font-size: 20px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
