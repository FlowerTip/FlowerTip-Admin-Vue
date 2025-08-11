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
      :isOpenPage="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeaderLeft>
        <el-button type="primary" :icon="CirclePlus" @click="openAddMenu"
          >新增菜单</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          >编辑菜单</el-button
        >
        <el-button
          type="danger"
          link
          :icon="Delete"
          @click="deleteInfo(slotData.scope.row)"
          >删除菜单</el-button
        >
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { dayjs } from "element-plus";
import { reqMenuList } from "@/api/menu";

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
    label: "菜单名称",
    isShowColumn: true,
    align: "left",
  },
  { id: 2, prop: "code", label: "权限值", isShowColumn: true },
  {
    id: 3,
    prop: "typeLabel",
    label: "菜单类型",
    isShowColumn: true,
    type: "tag",
  },
  {
    id: 4,
    prop: "updateTime",
    label: "修改时间",
    isShowColumn: true,
    type: "datetime",
    sortable: true,
  },
  {
    id: 5,
    prop: "operation",
    label: "操作",
    fixed: "right",
    isShowColumn: true,
    type: "slot",
    width: 80,
  },
]);
const loading = ref(false);

const tableData = ref<MenuItem[]>([]);
const total = ref(0);

const updateTableList = async (reqParams: Req.MenuListParam) => {
  loading.value = true;
  const { code, data } = await reqMenuList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item) => ({
      ...item,
      updateTime: dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
    }));
    tableData.value = menus as unknown as MenuItem[];
    total.value = 0;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

const openAddMenu = () => {
  console.log("打开新增菜单弹窗");
  // 这里可以添加逻辑来打开一个弹窗或表单来添加新的菜单
};

const modifiyInfo = (row: MenuItem) => {
  console.log("编辑菜单信息", row);
};

const deleteInfo = (row: MenuItem) => {
  console.log("删除菜单信息", row);
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
