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
      :selectionChange="selectionChange"
      rowKey="id"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
        :reserve-selection="true"
        fixed="left"
      ></el-table-column>
    </ProTable>
  </div>
</template>

<script setup lang="ts" name="AdvancedTable">
import { onMounted, reactive, ref } from "vue";
import { PagainationType } from "@/types";
import { reqWorkPostList } from "@/api/workPost";
import ProTable from "@/components/ProTable/index.vue";
import { dayjs } from "element-plus";

const proTableRef = ref();
const loading = ref(false);

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "岗位名称",
    prop: "workPostName",
    placeholder: "请输入岗位名称",
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSpan: 24,
  },
]);
// 表格配置项
const columns = reactive([
  {
    id: 1,
    prop: "workPostName",
    label: "岗位名称",
    fixed: "left",
    width: 120,
    isShowColumn: true,
  },
  {
    id: 2,
    prop: "workPostNum",
    label: "岗位编号",
    width: 80,
    isShowColumn: true,
  },
  {
    id: 3,
    prop: "departmentName",
    label: "所属部门",
    width: 100,
    isShowColumn: true,
  },
  {
    id: 4,
    prop: "description",
    label: "岗位描述",
    isShowColumn: true,
    width: 220,
  },
  {
    id: 5,
    prop: "createdAt",
    label: "创建时间",
    width: 120,
    isShowColumn: true,
    sortable: true,
  },
  {
    id: 6,
    prop: "updatedAt",
    label: "更新时间",
    width: 120,
    isShowColumn: true,
    sortable: true,
  },
]);

// 表格数据
let tableData = ref<WorkPostItem[]>([]);
const total = ref(0);

const updateTableList = async (reqParams: PagainationType) => {
  proTableRef.value.pagination.currentPage = reqParams.currentPage;
  proTableRef.value.pagination.pageSize = reqParams.pageSize;
  loading.value = true;
  const { code, data } = await reqWorkPostList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item) => ({
      ...item,
      updatedAt: dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    }));
    total.value = data.total as number;
    proTableRef.value!.clearSelection();
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  updateTableList({ pageSize: 20, currentPage: 1 });
});
const selectRow = ref<WorkPostItem[]>([]);
const selectionChange = (val: WorkPostItem[]) => {
  selectRow.value = val;
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
}

.form-layout-wrapper {
  .form-container {
    .form-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      margin-bottom: 20px;

      &.image {
        height: 148px;

        .value {
          border: 0;
          padding: 0;
        }

        img {
          display: block;
          width: 148px;
          height: 148px;
        }
      }

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
