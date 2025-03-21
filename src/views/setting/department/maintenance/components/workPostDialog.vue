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
        <el-form-item label="岗位名称" prop="workPostName">
          <el-input
            v-model="dialogForm.workPostName"
            placeholder="请输入岗位名称"
          />
        </el-form-item>
        <el-form-item label="岗位编号" prop="workPostNum">
          <el-input
            v-model="dialogForm.workPostNum"
            placeholder="请输入岗位编号"
          />
        </el-form-item>
        <el-form-item label="岗位描述" prop="description">
          <el-input
            type="textarea"
            :rows="3"
            v-model="dialogForm.description"
            placeholder="请填写岗位描述"
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
const dialogForm = ref<WorkPostItem>({
  workPostName: "",
  workPostNum: "",
  description: "",
  departmentId: "",
  workPostId: "",
});

const dialogFormRules = reactive({
  workPostName: [
    {
      required: true,
      message: "请输入岗位名称",
      trigger: "blur",
    },
  ],
  workPostNum: [
    {
      required: true,
      message: "请输入岗位编号",
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
        await dialogProps.value?.api(req);
        ElMessage.success({ message: `${title.value}成功` });
        dialogProps.value?.getTableList({
          currentPage: 1,
          pageSize: 20,
          departmentId: dialogForm.value.departmentId,
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

type AcceptParams = {
  rowData: WorkPostItem;
  api: (params: WorkPostItem) => Promise<any>;
  getTableList: (params: {
    currentPage: number;
    pageSize: number;
    departmentId: string | number;
  }) => Promise<Res.WorkPostListData>;
};
// props定义
const dialogProps = ref<AcceptParams>();
// 接收父组件参数
const acceptParams = (params: AcceptParams) => {
  const row = params.rowData;
  title.value = row!.workPostId ? "编辑岗位" : "新增岗位";
  dialogForm.value = row!;
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
