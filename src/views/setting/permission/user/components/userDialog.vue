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
        <el-form-item label="所属岗位" prop="workPostId">
          <el-select
            v-model="dialogForm.workPostId"
            clearable
            placeholder="请选择所属岗位"
          >
            <el-option
              v-for="item in workPostOptions"
              :key="item.workPostId"
              :label="item.description"
              :value="item.workPostId!"
            />
          </el-select>
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
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { formatTime } from "@/utils/tool";
import { reqWorkPostList } from "@/api/workPost.ts";

// 弹窗是否显示状态
const dialogVisible = ref(false);
// 弹窗标题
const title = ref<string>();

const workPostOptions = ref<WorkPostItem[]>([]);

onMounted(async () => {
  const { code, data } = await reqWorkPostList({
    currentPage: 1,
    pageSize: 100,
  });
  if (code === 200) {
    workPostOptions.value = data.list;
  } else {
    workPostOptions.value = [];
  }
});

// 表单数据
const dialogForm = ref<AccountItem>({
  username: "",
  password: "",
  workPostId: "",
});

const dialogFormRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名称",
      trigger: "blur",
    },
    { min: 2, max: 6, message: "名称字符在2个到6个之间", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "请输入用户密码",
      trigger: "blur",
    },
  ],
  workPostId: [
    {
      required: true,
      message: "请选择所属岗位",
      trigger: "change",
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
        const {code, data} = await dialogProps.value?.api(req);
        if (code !== 200) {
          ElMessage.error({ message: data.message });
          loading.value = false;
          return;
        }
        ElMessage.success({ message: data.message });
        dialogProps.value?.getTableList({
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

type AcceptParams = {
  rowData: AccountItem;
  api: (params: AccountItem) => Promise<any>;
  getTableList: (params: {
    currentPage: number;
    pageSize: number;
  }) => Promise<Res.AccountListRes>;
};
// props定义
const dialogProps = ref<AcceptParams>();
// 接收父组件参数
const acceptParams = (params: AcceptParams) => {
  const row = params.rowData;
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
