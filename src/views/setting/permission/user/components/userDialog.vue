<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    destroy-on-close
    width="500px"
  >
    <div class="form-layout-wrapper">
      <el-form
        ref="dialogFormRef"
        label-suffix=" :"
        :model="dialogForm"
        :rules="dialogFormRules"
        label-width="auto"
        class="form-container"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model="dialogForm.username"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            show-password
            type="password"
            v-model="dialogForm.password"
            placeholder="请输入用户密码"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="dialogConfirm" :loading="loading"
          >保存</el-button
        >
        <el-button @click="dialogCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="menuDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { formatTime } from "@/utils/tool";

// 弹窗是否显示状态
const dialogVisible = ref(false);
// 弹窗标题
const title = ref<string>();

// 表单数据
const dialogForm = ref<any>({
  username: "",
  password: "",
});

const dialogFormRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名称",
      trigger: "blur",
    },
    { min: 2, max: 6, message: '名称字符在2个到6个之间', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: "请输入用户密码",
      trigger: "blur",
    },
  ],
});
const dialogFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);
// 弹窗确定按钮逻辑
const dialogConfirm = () => {
  dialogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const req = {
        ...dialogForm.value,
        updateTime: formatTime(),
      };
      try {
        loading.value = true;
        await dialogProps.value.api!(req);
        ElMessage.success({ message: `${title.value}成功` });
        dialogProps.value.getTableList!({
          currentPage: 1,
          pageSize: 20,
        });
        dialogVisible.value = false;
        loading.value = false;
        // 重置表单
        resetForm(dialogFormRef.value);
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    } else {
      ElMessage.warning("表单信息填写有误");
    }
  });
};
// 弹窗取消按钮逻辑
const dialogCancel = () => {
  dialogVisible.value = false;
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// props定义
const dialogProps = ref<any>();
// 接收父组件参数
const acceptParams = (params: any): void => {
  const row: any = params.rowData;
  title.value = row!.id ? "编辑用户" : "新增用户";
  dialogForm.value = row;
  dialogProps.value = params;
  dialogVisible.value = true;
};

// 暴露给父组件的方法
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped>
.form-layout-wrapper {
  padding: 10px 0;

  .form-container {
    .form-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      margin-bottom: 20px;

      .label {
        width: 120px;
        padding-right: 10px;
        text-align: right;
      }

      .value {
        flex: 1;
        background-color: #fff;
        padding: 0 10px;
        border: 1px solid #ebeef5;
      }
    }
  }
}
</style>
