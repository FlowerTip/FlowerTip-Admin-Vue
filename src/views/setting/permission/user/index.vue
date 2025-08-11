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
        <el-popconfirm
          width="180"
          :icon="WarningFilled"
          title="确定要删除该用户吗?"
          @confirm="deleteRadio(slotData.scope.row)"
        >
          <template #reference>
            <el-button
              link
              type="danger"
              :icon="Delete"
              :disabled="slotData.scope.row.username === '系统管理员'"
              >删除用户</el-button
            >
          </template>
        </el-popconfirm>
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
import {
  CirclePlus,
  Delete,
  User,
  EditPen,
  WarningFilled,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

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
    id: 5,
    prop: "roleNames",
    label: "权限角色",
    isShowColumn: true,
    width: 300,
    type: "tags",
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
    prop: "eprName",
    label: "所属单位",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 4,
    prop: "address",
    label: "单位地址",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 4,
    prop: "name",
    label: "姓名",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 4,
    prop: "age",
    label: "年龄",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 4,
    prop: "work_year_time",
    label: "工作年限",
    isShowColumn: true,
    width: 140,
  },
  {
    id: 4,
    prop: "salary",
    label: "薪资水平",
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
      username: item.account_name,
      password: item.account_password,
      workPostName: item.archive_info.work_post_name,
      roleNames: item.roles!.map((role) => role.roleName).join(", "),
      workPostId: item.account_work_post_id,
      eprName: item.archive_info.epr_name,
      name: item.archive_info.name,
      age: item.archive_info.age + "岁",
      address: item.archive_info.address,
      work_year_time: item.archive_info.work_year_time + "年",
      salary: item.archive_info.salary + "K",
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

const deleteRadio = async (row: AccountItem) => {
  const { code } = await reqDelAccount(row.id as number);
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
