<template>
  <div class="table-box">
    <ProTable
      ref="proTableRef"
      :tableColumns="columns"
      :conditionList="conditionList"
      :tableData="tableData"
      :total="total"
      :updateTableList="updateTableList"
      :loading="loading"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeaderLeft>
        <el-button type="primary" :icon="CirclePlus" @click="openAddRoleDrawer"
          >新增用户</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="User"
          @click="batchPermission(slotData.scope.row)"
          :disabled="slotData.scope.row.username === '系统管理员'"
          >分配角色</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          :disabled="slotData.scope.row.username === '系统管理员'"
          >编辑用户</el-button
        >
        <el-button
          type="primary"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          :disabled="slotData.scope.row.username === '系统管理员'"
          >删除用户</el-button
        >
      </template>
    </ProTable>
    <!-- 分配权限 -->
    <RoleDialog ref="RoleDialogRef" />
    <!-- 新增用户 || 编辑用户 -->
    <UserDialog ref="UserDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  reqAccountList,
  reqSaveAccount,
  reqDelAccount,
  reqBatchRole,
} from "@/api/account";
import ProTable from "@/components/ProTable/index.vue";
import UserDialog from "./components/userDialog.vue";
import RoleDialog from "./components/roleDialog.vue";
import { CirclePlus, Delete, User, EditPen } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

const proTableRef = ref();
const loading = ref(false);

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "用户名称",
    prop: "username",
    placeholder: "请输入用户名称",
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSPan: 24,
  },
]);
// 表格配置项
const columns = reactive([
  {
    id: 1,
    prop: "username",
    label: "用户名称",
    fixed: "left",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 2,
    prop: "password",
    label: "用户密码",
    fixed: "left",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 3,
    prop: "workPostName",
    label: "所属岗位",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 4,
    prop: "departmentName",
    label: "所属部门",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 5,
    prop: "operation",
    label: "操作",
    fixed: "right",
    isShowColumn: true,
    type: "slot",
    width: 300,
  },
]);

// 表格数据
let tableData = ref<AccountItem[]>([]);
const total = ref(0);
const updateTableList = async (reqParams: Req.AccountListParam) => {
  loading.value = true;
  const { code, data } = await reqAccountList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item) => ({
      ...item,
    }));
    total.value = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  updateTableList({
    currentPage: 1,
    pageSize: 20,
  });
});

const UserDialogRef = ref();
const openAddRoleDrawer = () => {
  const params = {
    api: reqSaveAccount,
    rowData: {
      username: "",
      password: "",
    },
    getTableList: updateTableList,
  };
  UserDialogRef.value!.acceptParams(params);
};

const deleteRadio = (row: AccountItem) => {
  ElMessageBox.confirm("此操作将删除该用户，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code } = await reqDelAccount({
        ids: [row.id!],
      });
      if (code === 200) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        updateTableList({
          pageSize: 20,
          currentPage: 1,
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

const RoleDialogRef = ref();

const batchPermission = (row: AccountItem) => {
  const params = {
    userId: row.id,
    api: reqBatchRole,
    getTableList: updateTableList,
  };
  RoleDialogRef.value!.acceptParams(params);
};

const modifiyInfo = (row: AccountItem) => {
  UserDialogRef.value!.acceptParams({
    api: reqSaveAccount,
    rowData: { ...row },
    getTableList: updateTableList,
  });
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
}

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
