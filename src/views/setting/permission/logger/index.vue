<template>
  <div class="table-box">
    <ProTable ref="proTableRef" :tableColumns="columns" :conditionList="conditionList" :tableData="tableData"
      :total="total" :updateTableList="updateTableList" :loading="loading">
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { reqLoggerList } from "@/api/logger";
import ProTable from "@/components/ProTable/index.vue";

const proTableRef = ref();
const loading = ref(false);

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "操作人",
    prop: "username",
    placeholder: "请输入操作人名称",
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
    id: 100,
    label: "",
    prop: "requestParams",
    isShowColumn: true,
    width: 60,
    type: "expand",
  },
  {
    id: 1,
    prop: "url",
    label: "请求地址",
    isShowColumn: true,
  },
  {
    id: 2,
    prop: "method",
    label: "请求方法",
    isShowColumn: true,
    width: 100,
  },
  {
    id: 3,
    prop: "responseTime",
    label: "响应时间",
    isShowColumn: true,
  },
  {
    id: 4,
    prop: "level",
    label: "日志等级",
    isShowColumn: true,
  },
  {
    id: 5,
    prop: "ip",
    label: "ip地址",
    isShowColumn: true,
    type: "tags",
  },
  {
    id: 6,
    prop: "userAgent",
    label: "操作系统",
    isShowColumn: true,
  },
  {
    id: 7,
    prop: "browser",
    label: "浏览器",
    isShowColumn: true,
  },
  {
    id: 8,
    prop: "username",
    label: "操作人",
    isShowColumn: true,
  },
  {
    id: 9,
    prop: "action",
    label: "操作内容",
    isShowColumn: true,
  },
  {
    id: 10,
    prop: "createdAt",
    label: "操作时间",
    isShowColumn: true,
    width: 140,
    type: "datetime",
    sortable: true,
  },
]);

// 表格数据
let tableData = ref<AccountItem[]>([]);
const total = ref(0);
const updateTableList = async (reqParams: Req.AccountListParam) => {
  loading.value = true;
  const { code, data } = await reqLoggerList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item: any) => ({
      ...item,
      requestParams: item.method === 'GET' ? (item.queryParams ? JSON.parse(item.queryParams) : {}) : (item.requestBody ? JSON.parse(item.requestBody) : {}),
      responseTime: item.responseTime + 'ms'
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
