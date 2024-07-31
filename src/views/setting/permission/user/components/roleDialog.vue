<template>
  <el-dialog v-model="dialogVisible" title="分配权限" destroy-on-close width="500px">
    <div class="form-layout-wrapper">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
        全选
      </el-checkbox>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in treeData" :key="item.id" :label="item.roleName" :value="item.id">
          {{ item.roleName }}
        </el-checkbox>
      </el-checkbox-group>
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
import { ref } from "vue";
import {
  ElMessage,
  CheckboxValueType,
} from "element-plus";
import { reqRoleList } from "@/api/role";
import {
  reqGetRole,
} from "@/api/user";

let treeData = ref<any>([]);

const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedCities = ref([]);

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedCities.value = val ? treeData.value.map((item: any) => item.id) : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === treeData.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < treeData.value.length;
};

type tableDataItem = {
  username: string;
  password: string;
}

const getPermission = async (reqParams: any) => {
  const { code, data }: any = await reqRoleList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item: tableDataItem) => ({
      ...item,
    }));
    treeData.value = menus as any;
    getSelectPerssion();
  }
};

const getSelectPerssion = async () => {
  const { code, data }: any = await reqGetRole({
    userId: dialogProps.value.userId,
  });
  if (code === 200) {
    const selectTreeIds = data.list;
    checkedCities.value = selectTreeIds;
    if (
      checkedCities.value.length > 0 &&
      checkedCities.value.length < treeData.value.length
    ) {
      isIndeterminate.value = true;
    }
    if (selectTreeIds.length === treeData.value.length) {
      checkAll.value = true;
    }
  }
};

// 弹窗是否显示状态
const dialogVisible = ref(false);

const loading = ref<boolean>(false);
// 弹窗确定按钮逻辑
const dialogConfirm = async () => {
  const req = {
    userId: dialogProps.value.userId,
    rolesId: checkedCities.value,
  };
  if (req.rolesId && req.rolesId.length === 0) {
    ElMessage.warning("请分配角色");
    return;
  }
  try {
    loading.value = true;
    await dialogProps.value.api!(req);
    ElMessage.success({ message: `分配成功` });
    dialogProps.value.getTableList!({
      currentPage: 1,
      pageSize: 20,
    });
    dialogVisible.value = false;
    loading.value = false;
    isIndeterminate.value = false;
  } catch (err) {
    loading.value = false;
    console.log(err);
  }
};
// 弹窗取消按钮逻辑
const dialogCancel = () => {
  dialogVisible.value = false;
};

// props定义
const dialogProps = ref<any>();
// 接收父组件参数
const acceptParams = (params: any): void => {
  isIndeterminate.value = false;
  checkAll.value = false;
  checkedCities.value = [];
  dialogProps.value = params;
  dialogVisible.value = true;
  getPermission({})
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
