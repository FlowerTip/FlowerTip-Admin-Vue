<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :tableColumns="columns"
      :tableData="tableData"
      :conditionList="conditionList"
      rowKey="id"
      :loading="loading"
      :updateTableList="updateTableList"
      :total="total"
    >
      <!-- 表格操作 -->
      <!-- <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="CirclePlus"
          @click="openMenuDrawer(slotData.scope.row)"
          >添加菜单</el-button
        >
        <el-button type="primary" link :icon="EditPen">编辑菜单</el-button>
        <el-button type="primary" link :icon="Delete">删除菜单</el-button>
      </template> -->
    </ProTable>

    <!-- 添加权限菜单 || 编辑权限菜单弹窗 -->
    <menuDialog ref="menuDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { dayjs } from "element-plus";
// import { Delete, EditPen, CirclePlus } from "@element-plus/icons-vue";
// import { reqTableList, reqSaveTable } from "@/api/menu";
import { reqTableList } from "@/api/menu";
import menuDialog from "./components/menuDialog.vue";

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "菜单名称",
    prop: "name",
    placeholder: "请输入菜单名称",
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
    prop: "name",
    label: "权限菜单名称",
    isShowColumn: true,
    align: "left",
  },
  { id: 2, prop: "code", label: "菜单权限值", isShowColumn: true },
  {
    id: 3,
    prop: "typeLabel",
    label: "菜单类型",
    isShowColumn: true,
  },
  // {
  //   id: 4,
  //   prop: "operation",
  //   label: "操作",
  //   fixed: "right",
  //   isShowColumn: true,
  //   type: "slot",
  // },
]);
const loading = ref(false);

type tableDataItem = {
  name: string;
  code: string;
  level: number;
  updateTime: Date;
};

const tableData = ref([]);
const total = ref(0);

const updateTableList = async (reqParams: any) => {
  loading.value = true;
  const { code, data }: any = await reqTableList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item: tableDataItem) => ({
      ...item,
      updateTime: dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
    }));
    tableData.value = menus as any;
    total.value = 0;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  updateTableList({});
});
const menuDialogRef = ref();

// const openMenuDrawer = (rowData: any) => {
//   const params = {
//     type: 1,
//     rowData: { ...rowData },
//     api: reqSaveTable,
//     getTableList: updateTableList,
//   };
//   menuDialogRef.value.acceptParams(params);
// };
// const selectRow = ref([]);

// const deleteSelect = () => {
//   if (selectRow.value.length === 0) {
//     ElMessage.warning("请选择要删除的数据");
//     return;
//   }
//   ElMessageBox.confirm("此操作将删除选择的数据，是否继续?", "删除提示", {
//     cancelButtonText: "取消",
//     confirmButtonText: "确认",
//     type: "warning",
//   })
//     .then(async () => {
//       const { code, data }: any = await reqDelTable({
//         ids: selectRow.value.map((item: any) => item.id),
//       });
//       if (code === 200) {
//         ElMessage({
//           type: "success",
//           message: data.message,
//         });
//         updateTableList({
//           pageSize: 20,
//           currentPage: 1,
//         });
//       }
//     })
//     .catch(() => {
//       ElMessage({
//         type: "info",
//         message: "取消删除",
//       });
//     });
// };
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
}
</style>
