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
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import ProTable from "@/components/ProTable/index.vue";
import { dayjs } from "element-plus";
import { reqTableList } from "@/api/menu";

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
  },
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
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
}
</style>
