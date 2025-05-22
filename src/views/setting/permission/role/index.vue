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
          >新增角色</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="User"
          @click="batchPermission(slotData.scope.row)"
          :disabled="slotData.scope.row.roleName === '超级管理员'"
          >分配权限</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          :disabled="slotData.scope.row.roleName === '超级管理员'"
          >编辑角色</el-button
        >
        <el-button
          type="danger"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          :disabled="slotData.scope.row.roleName === '超级管理员'"
          >删除角色</el-button
        >
      </template>
    </ProTable>
    <!-- 分配权限 -->
    <RoleDrawer ref="RoleDrawerRef" />
    <!-- 新增角色 || 编辑角色弹窗 -->
    <RoleDialog ref="RoleDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { CirclePlus, Delete, User, EditPen } from "@element-plus/icons-vue";
import { dayjs, ElMessage, ElMessageBox } from "element-plus";
import { PagainationType } from "@/types";
import ProTable from "@/components/ProTable/index.vue";
import RoleDialog from "./components/roleDialog.vue";
import RoleDrawer from "./components/roleDrawer.vue";
import {
  reqRoleList,
  reqSaveRole,
  reqDelRole,
  reqBatchPermission,
} from "@/api/role";

const proTableRef = ref();
const loading = ref(false);

// 搜索条件
const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "角色名称",
    prop: "roleName",
    placeholder: "请输入角色名称",
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
    prop: "roleName",
    label: "角色名称",
    isShowColumn: true,
    width: 100,
  },
  {
    id: 2,
    prop: "remark",
    label: "备注信息",
    isShowColumn: true,
    width: 120,
  },
  {
    id: 3,
    prop: "updateTime",
    label: "更新时间",
    isShowColumn: true,
    sortable: true,
    width: 160,
  },
  {
    id: 4,
    prop: "operation",
    label: "操作",
    fixed: "right",
    isShowColumn: true,
    type: "slot",
    width: 300,
  },
]);

// 表格数据
let tableData = ref<RoleItem[]>([]);
const total = ref(0);

const updateTableList = async (reqParams: PagainationType) => {
  loading.value = true;
  const { code, data } = await reqRoleList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item) => ({
      ...item,
      updateTime: dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
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

// 角色的增删改查
const RoleDialogRef = ref();

const openAddRoleDrawer = () => {
  RoleDialogRef.value!.acceptParams({
    api: reqSaveRole,
    rowData: {
      roleName: "",
      remark: "",
    },
    getTableList: updateTableList,
  });
};

const modifiyInfo = (row: RoleItem) => {
  RoleDialogRef.value!.acceptParams({
    api: reqSaveRole,
    rowData: { ...row },
    getTableList: updateTableList,
  });
};

const deleteRadio = (row: RoleItem) => {
  ElMessageBox.confirm("此操作将删除该角色，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data } = await reqDelRole({
        ids: [row.id as number],
      });
      if (code === 200) {
        ElMessage({
          type: "success",
          message: data.message,
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

// 分配权限
const RoleDrawerRef = ref();
const batchPermission = (row: RoleItem) => {
  const params = {
    roleId: row.id,
    api: reqBatchPermission,
    getTableList: updateTableList,
  };
  RoleDrawerRef.value!.acceptParams(params);
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
}
</style>
