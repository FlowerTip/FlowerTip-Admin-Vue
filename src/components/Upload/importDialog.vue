<template>
  <!-- 导入数据弹窗 -->
  <el-dialog v-model="dialogVisible" title="导入数据" width="600" draggable>
    <div class="dialog-wrapper">
      <div class="step-item">
        <span class="label">第一步：</span>
        <span class="value">下载导入数据模版</span>
        <div class="block-wrapper">
          <el-button type="primary" link>下载模版</el-button>
        </div>
      </div>
      <div class="step-item">
        <span class="label">第二步：</span>
        <span class="value">上传录入数据的Excel文件</span>
        <div class="block-wrapper">
          <el-upload class="upload-demo" drag action="#" :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽文件直接上传 或者 <em>选择文件上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">文件大小不能超过500KB</div>
            </template>
          </el-upload>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">
          确认
        </el-button>
        <el-button @click="dialogCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import {
  UploadFilled,
} from "@element-plus/icons-vue";

const dialogVisible = ref(false);

const dialogProps = ref();

const dialogConfirm = () => {
  dialogVisible.value = false
}

const dialogCancel = () => {
  dialogVisible.value = false
}

// 接收父组件参数
const acceptParams = (params: any): void => {
  dialogProps.value = params;
  dialogVisible.value = true;
};

// 暴露给父组件的方法
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  padding: 16px 10px;
  margin: 0 auto;

  .step-item {
    min-height: 60px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-size: 15px;
      font-weight: 700;
    }

    .block-wrapper {
      margin-top: 16px;
    }
  }
}
</style>
