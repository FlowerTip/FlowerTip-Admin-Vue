<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :tableColumns="columns"
      :tableData="tableData"
      :conditionList="conditionList"
      rowKey="departmentId"
      :loading="loading"
      :updateTableList="updateTableList"
      :total="total"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeaderLeft>
        <el-button type="primary" :icon="CirclePlus" @click="openAddDepartment"
          >新增部门</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="Plus"
          @click="addChildrenInfo(slotData.scope.row)"
          >添加部门</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          >编辑部门</el-button
        >
        <el-button
          type="danger"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          >删除部门</el-button
        >
      </template>
    </ProTable>
    <!-- 新增部门 || 编辑部门 -->
    <DepartmetnDialog ref="DepartmetnDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable/index.vue";
import { dayjs } from "element-plus";
import DepartmetnDialog from "./components/departmentDialog.vue";
import {
  reqDepartmentList,
  reqDelDepartMent,
  reqSaveDepartment,
} from "@/api/department";

const DepartmetnDialogRef = ref();
const openAddDepartment = () => {
  const params = {
    api: reqSaveDepartment,
    rowData: {
      departmentName: "",
      description: "",
      sort: "",
      parentId: 0,
    },
    getTableList: updateTableList,
  };
  DepartmetnDialogRef.value!.acceptParams(params);
};

const addChildrenInfo = (row: DepartMentItem) => {
  DepartmetnDialogRef.value!.acceptParams({
    api: reqSaveDepartment,
    rowData: {
      departmentName: "",
      description: "",
      sort: "",
      parentId: row.departmentId,
    },
    getTableList: updateTableList,
  });
};

const deleteRadio = (row: DepartMentItem) => {
  ElMessageBox.confirm("此操作将删除该部门，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code } = await reqDelDepartMent({
        departmentId: row.departmentId,
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

const modifiyInfo = (row: DepartMentItem) => {
  DepartmetnDialogRef.value!.acceptParams({
    api: reqSaveDepartment,
    rowData: { ...row },
    getTableList: updateTableList,
  });
};

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "部门名称",
    prop: "departmentName",
    placeholder: "请输入部门名称",
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
    prop: "departmentName",
    label: "部门名称",
    isShowColumn: true,
    align: "left",
  },
  { id: 2, prop: "departmentId", label: "部门编号", isShowColumn: true },
  {
    id: 3,
    prop: "description",
    label: "部门描述",
    isShowColumn: true,
  },
  {
    id: 4,
    prop: "parentName",
    label: "上级部门",
    isShowColumn: true,
  },
  {
    id: 5,
    prop: "createdAt",
    label: "创建时间",
    isShowColumn: true,
    sortable: true,
    type: "datetime",
  },
  {
    id: 6,
    prop: "updatedAt",
    label: "更新时间",
    isShowColumn: true,
    sortable: true,
    type: "datetime",
  },
  {
    id: 7,
    prop: "operation",
    label: "操作",
    fixed: "right",
    isShowColumn: true,
    type: "slot",
    width: 120,
  },
]);
const loading = ref(false);

const tableData = ref<DepartMentItem[]>([]);
const total = ref(0);

const updateTableList = async (reqParams: Req.DepartMentListParam) => {
  loading.value = true;
  const { code, data } = await reqDepartmentList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item) => ({
      ...item,
      createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    }));
    tableData.value = menus as unknown as DepartMentItem[];
    total.value = 0;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  updateTableList({});
});
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
}
</style>
