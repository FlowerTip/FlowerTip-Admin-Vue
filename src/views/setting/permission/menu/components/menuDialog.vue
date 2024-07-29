<template>
  <el-dialog
    v-model="dialogVisible"
    title="添加菜单"
    :destroy-on-close="true"
    width="500px"
  >
    <div class="form-wrapper">
      <el-form
        ref="ruleFormRef"
        label-width="120px"
        label-suffix=" :"
        :rules="rules"
        :model="permissionData"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input
            v-model="permissionData!.name"
            placeholder="请输入菜单名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-select
            v-model="permissionData!.type"
            placeholder="请选择菜单类型"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="权限代码" prop="code">
          <el-input
            v-model="permissionData!.code"
            placeholder="请输入权限代码"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button
        type="primary"
        @click="handleSubmit(ruleFormRef)"
        :loading="loading"
      >
        确定
      </el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="menuDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";

const permissionData = ref<any>({
  name: "",
  type: "",
  code: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入菜单名称" }],
  type: [{ required: true, message: "请输入权限代码", tirgger: "change" }],
  code: [{ required: true, message: "请输入权限代码" }],
});

const typeOptions = ref([
  {
    label: "模块",
    value: 1,
  },
  {
    label: "页面",
    value: 2,
  },
  {
    label: "按钮",
    value: 3,
  },
]);

const dialogVisible = ref(false);
// dialog标题
const title = ref<string>();
const loading = ref<boolean>(false);

// props定义
const dialogProps = ref<any>({ type: 1 });
// 接收父组件参数
const acceptParams = (params: any): void => {
  const row: any = params.rowData;
  if (params.type === 1) {
    permissionData.value = {
      pid: row.id, // pid ==> parentId 父权限数据的id
      level: row.level! + 1,
      type: row.level == 3 ? 2 : 1,
    };
  } else {
    permissionData.value = row;
  }

  title.value = getDialogTitle(params);
  dialogProps.value = params;
  dialogVisible.value = true;
};
// 初始化dialog标题
const getDialogTitle = (params: any): string => {
  const level = params.rowData && params.rowData.level;
  let title = "";
  if (params.type === 1) {
    if (level === 1) {
      title = "添加二级菜单";
    }
    if (level === 2) {
      title = "添加三级菜单";
    }

    if (level === 3) {
      title = "添加功能";
    }
  } else {
    if (level === 1) {
      title = "修改一级菜单";
    }
    if (level === 2 || level === 3) {
      title = "修改二级菜单";
    }
    if (level === 4) {
      title = "修改功能";
    }
  }
  return title;
};
const ruleFormRef = ref<FormInstance>();

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    try {
      loading.value = true;
      await dialogProps.value.api!(permissionData.value);
      ElMessage.success({ message: `${title.value}成功！` });
      dialogProps.value.getTableList!();
      dialogVisible.value = false;
      loading.value = false;
      // 重置表单
      resetForm(formEl);
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 暴露给父组件的方法
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped>
.form-wrapper {
  padding: 20px 10px;
}
</style>
