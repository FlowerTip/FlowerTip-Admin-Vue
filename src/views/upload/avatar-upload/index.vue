<template>
  <div class="page-container">
    <div class="upload-item">
      <h3>圆形上传</h3>
      <div class="wrapper">
        <el-form :model="form" :rules="formRules" ref="formRef">
          <el-form-item prop="avatarUrl" label="个人头像：">
            <AvatarUpload
              width="80"
              height="80"
              type="circle"
              ref="uploadRef1"
              :disabled="false"
              v-model:image-url="form.avatarUrl"
            >
              <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
            </AvatarUpload>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
        <el-button @click="uploadAvatar" :loading="uploading">上传</el-button>
      </div>
    </div>
    <div class="upload-item">
      <h3>方形上传</h3>
      <div class="wrapper">
        <AvatarUpload width="240" height="164" type="round" :disabled="false">
          <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
        </AvatarUpload>
      </div>
    </div>
    <div class="upload-item">
      <h3>禁用圆形</h3>
      <div class="wrapper">
        <AvatarUpload width="164" height="164" type="circle" :disabled="true">
          <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
        </AvatarUpload>
      </div>
    </div>
    <div class="upload-item">
      <h3>禁用方形</h3>
      <div class="wrapper">
        <AvatarUpload width="240" height="164" type="round" :disabled="true">
          <template #tip>限制为2MB，只能上传PNG，JPG，GIF格式</template>
        </AvatarUpload>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import AvatarUpload from "@/components/Upload/avatar.vue";

const uploadRef1 = ref();
const form = ref({
  avatarUrl: "",
});
const formRules = ref({
  avatarUrl: [
    {
      required: true,
      message: "请上传头像",
      trigger: "change",
    },
  ],
});
const uploadAvatar = () => {
  uploading.value = true;
  uploadRef1.value.uploadServer();
};
const uploading = ref(false);

const formRef = ref();
const submitForm = () => {
  formRef.value!.validate((valid: boolean) => {
    if (valid) {
    }
  });
};

watchEffect(() => {
  if (form.value.avatarUrl) {
    uploading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 50px;

  .upload-item {
    flex: 1;
    height: 400px;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    justify-content: center;

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
