<template>
  <div class="file-upload-container">
    <el-upload
      ref="upload"
      v-model:file-list="fileList"
      class="upload-demo"
      action="#"
      :limit="fileLimitCount"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :multiple="fileLimitCount > 1"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <template #tip>
        <div v-if="fileLimitCount === 1" class="el-upload__tip text-red">
          只能上传一份文件，再次选择的文件会被覆盖掉
        </div>
        <div v-else class="el-upload__tip text-red">
          可以批量选择多份文件，最多只能上传{{ fileLimitCount }}份文件
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts" name="FileUpload">
import { ref } from "vue";
import { genFileId } from "element-plus";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile,
} from "element-plus";

type FileProps = {
  limit: number;
  disabled: boolean;
};

const props = withDefaults(defineProps<FileProps>(), {
  limit: 1,
  disabled: false,
});

const fileLimitCount = ref(props.limit);

const fileList = ref<UploadUserFile[]>([]);

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = (files) => {
  if (props.limit === 1) {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
  } else {
    fileList.value = files.slice(0, props.limit);
  }
};
</script>

<style lang="scss">
.file-upload-container {
  width: 50%;
}
</style>
