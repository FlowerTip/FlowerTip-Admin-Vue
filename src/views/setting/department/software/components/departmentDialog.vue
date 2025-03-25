<template>
  <el-dialog v-model="dialogVisible" :title="title" destroy-on-close width="500px">
    <div class="form-layout-wrapper">
      <el-form ref="dialogFormRef" label-suffix=" :" :model="dialogForm" :rules="dialogFormRules" label-width="auto"
        class="form-container">
        <el-form-item label="上级部门" prop="parentId">
          <el-tree-select :disabled="canSelected" v-model="dialogForm.parentId"
            :data="departmentList" :props="{
              value: 'departmentId',
              label: 'departmentName',
            }" check-strictly :render-after-expand="false" placeholder="请选择上级部门" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="dialogForm.departmentName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="排列序号" prop="sort">
          <el-input v-model.number="dialogForm.sort" placeholder="请输入排列序号" />
        </el-form-item>
        <el-form-item label="部门描述" prop="description">
          <el-input type="textarea" :rows="3" v-model="dialogForm.description" placeholder="请填写部门描述" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="dialogConfirm" :loading="loading">保存</el-button>
        <el-button @click="dialogCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="menuDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { formatTime } from "@/utils/tool";
import { reqDepartmentList } from "@/api/department";
import { onMounted } from "vue";
import { computed } from "vue";

const getDepartmentList = async () => {
  const { code, data } = await reqDepartmentList({});
  if (code === 200) {
    departmentList.value = [
      {
        departmentName: "当前单位",
        departmentId: 0,
        description: "当前登录账号所在的企业单位",
        parentId: null,
        children: data.list,
      },
    ] as unknown as Res.DepartMentListData[];
  } else {
    departmentList.value = [];
  }
};

onMounted(() => {
  getDepartmentList();
});

const rowFormItem = ref<DepartMentItem>();

const canSelected = computed(() => {
  return rowFormItem.value?.parentId ? true : rowFormItem.value?.departmentId ? true: false;
})

// 弹窗是否显示状态
const dialogVisible = ref(false);
// 弹窗标题
const title = ref<string>();

const departmentList = ref<Res.DepartMentListData[]>([]);

// 表单数据
const dialogForm = ref<DepartMentItem>({
  description: "",
  sort: 0,
  departmentName: "",
  departmentId: 0,
  parentId: 0,
});

const dialogFormRules = reactive({
  departmentName: [
    {
      required: true,
      message: "请输入部门名称",
      trigger: "blur",
    },
  ],
  sort: [
    {
      required: true,
      message: "请输入序号",
      trigger: "blur",
    },
  ],
  parentId: [
    {
      required: true,
      message: "请选择上级部门",
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
        description: dialogForm.value.description,
        sort: dialogForm.value.sort,
        departmentName: dialogForm.value.departmentName,
        departmentId: dialogForm.value.departmentId,
        parentId: dialogForm.value.parentId,
        updateTime: formatTime(),
      };
      try {
        loading.value = true;
        await dialogProps.value?.api(req);
        ElMessage.success({ message: `${title.value}成功` });
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
  rowData: DepartMentItem;
  api: (params: DepartMentItem) => Promise<any>;
  getTableList: (params: {
    currentPage: number;
    pageSize: number;
  }) => Promise<Res.DepartMentListData>;
};
// props定义
const dialogProps = ref<AcceptParams>();
// 接收父组件参数
const acceptParams = (params: AcceptParams) => {
  const row = params.rowData;
  rowFormItem.value = {
    ...row
  };
  title.value = row!.departmentId ? "编辑部门" : "新增部门";
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
