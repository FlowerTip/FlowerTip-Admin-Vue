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
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { dayjs } from "element-plus";
import { reqDepartmentList } from "@/api/department";

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
  },
  {
    id: 6,
    prop: "updatedAt",
    label: "更新时间",
    isShowColumn: true,
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
