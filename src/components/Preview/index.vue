<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    destroy-on-close
    :fullscreen="false"
    width="65%"
  >
    <div
      class="preview-wrapper"
      v-loading="loading"
      element-loading-text="正在加载文档"
    >
      <vue-office-docx
        v-if="dialogProps.type === 'docx'"
        :src="dialogProps.url"
        style="width: 100%; height: 100%"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
      <vue-office-pdf
        v-else-if="dialogProps.type === 'pdf'"
        :src="dialogProps.url"
        style="width: 100%; height: 100%"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
      <vue-office-excel
        v-else-if="dialogProps.type === 'excel'"
        :src="dialogProps.url"
        style="width: 100%; height: 100%"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts" name="previewDialog">
import { ref } from "vue";
import { ElMessage } from "element-plus";
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入VueOfficePdf组件
import VueOfficePdf from "@vue-office/pdf";
//引入相关样式
import "@vue-office/docx/lib/index.css";
//引入相关样式
import "@vue-office/excel/lib/index.css";

// 弹窗是否显示状态
const dialogVisible = ref(false);
// 弹窗标题
const title = ref("文档预览");

const loading = ref(false);

const renderedHandler = () => {
  loading.value = false;
};

const errorHandler = () => {
  loading.value = false;
  ElMessage.warning({ message: "文档加载失败" });
};

type ComponentProps = {
  type: string;
  url: string;
};

// props定义
const dialogProps = ref<ComponentProps>({
  type: "",
  url: "",
});
// 接收父组件参数
const acceptParams = (params: ComponentProps) => {
  dialogProps.value = params;
  loading.value = true;
  dialogVisible.value = true;
};

// 暴露给父组件的方法
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped>
.preview-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 0;
  // height: calc(100vh - 73px);
  height: 60vh;
}
</style>
