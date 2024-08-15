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
      <!-- 表格 header 按钮 -->
      <template #tableHeaderLeft>
        <el-button
          v-permission="['btn.advanced-table.add']"
          type="primary"
          :icon="CirclePlus"
          @click="openAddRoleDrawer"
          >新增学员</el-button
        >
        <el-button
          v-permission="['btn.advanced-table.del']"
          type="danger"
          :icon="Remove"
          @click="deleteSelect"
          >删除学员</el-button
        >
        <el-button
          v-permission="['btn.advanced-table.import']"
          :icon="Upload"
          @click="importTable"
          >导入数据</el-button
        >
        <el-button
          v-permission="['btn.advanced-table.export']"
          :icon="Download"
          @click="exportTable"
          >导出数据</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="View"
          @click="viewInfo(slotData.scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          >编辑</el-button
        >
        <el-button
          type="primary"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          >删除</el-button
        >
      </template>
    </ProTable>
    <!-- 新增学员 || 编辑学员抽屉 -->
    <StudentDrawer ref="StudentDrawerRef" />
    <!-- 查看学员抽屉 -->
    <InfoDrawer ref="InfoDrawerRef" />
    <!-- 导入数据弹窗 -->
    <ImportDialog ref="ImportDialogRef" />
  </div>
</template>

<script setup lang="ts" name="AdvancedTable">
import { onMounted, reactive, ref } from "vue";
import { PagainationType } from "@/types";
import { reqStudentList, reqSaveStudent, reqDelStudent } from "@/api/student";
import ProTable from "@/components/ProTable/index.vue";
import InfoDrawer from "./components/infoDrawer.vue";
import StudentDrawer from "./components/studentDrawer.vue";
import ImportDialog from "@/components/Upload/importDialog.vue";
import useExport from "@/hooks/useExport";
import {
  CirclePlus,
  Delete,
  View,
  Remove,
  Upload,
  Download,
  EditPen,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, ElLoading, dayjs } from "element-plus";

const proTableRef = ref();
const loading = ref(false);

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "学员名称",
    prop: "username",
    placeholder: "请输入学员名称",
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSpan: 24,
  },
  {
    id: 2,
    type: "select",
    label: "个头大小",
    prop: "big",
    placeholder: "请选择个头大小",
    optionList: [
      {
        label: "大",
        value: 1,
      },
      {
        label: "小",
        value: 0,
      },
    ],
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSpan: 24,
  },
  {
    id: 3,
    type: "select",
    label: "性别",
    prop: "sex",
    placeholder: "请选择性别",
    optionList: [
      {
        label: "男",
        value: 1,
      },
      {
        label: "女",
        value: 0,
      },
    ],
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSpan: 24,
  },
  {
    id: 4,
    type: "input",
    label: "地址",
    prop: "address",
    placeholder: "请输入地址",
    span: 6,
    lgSpan: 8,
    mdSpan: 12,
    smSpan: 24,
    xsSpan: 24,
  },
  {
    id: 5,
    type: "datetime",
    label: "档案时间",
    prop: "time",
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
    id: 10,
    prop: "avatarUrl",
    label: "学员头像",
    width: 100,
    isShowColumn: true,
    type: "image",
    fixed: "left",
  },
  {
    id: 1,
    prop: "username",
    label: "学员姓名",
    fixed: "left",
    width: 120,
    isShowColumn: true,
  },
  {
    id: 2,
    prop: "age",
    label: "年龄",
    sortable: true,
    width: 80,
    isShowColumn: true,
  },
  { id: 3, prop: "address", label: "地址", width: 200, isShowColumn: true },
  {
    id: 4,
    prop: "bigLabel",
    label: "个头大小",
    width: 100,
    isShowColumn: true,
  },
  {
    id: 5,
    prop: "color",
    label: "性格色彩",
    isShowColumn: true,
    width: 120,
    type: "color",
  },
  { id: 6, prop: "hobby", label: "兴趣", width: 200, isShowColumn: true },
  { id: 7, prop: "sexLabel", label: "性别", width: 60, isShowColumn: true },
  { id: 8, prop: "school", label: "学校", width: 200, isShowColumn: true },
  {
    id: 9,
    prop: "time",
    label: "档案时间",
    width: 160,
    isShowColumn: true,
    sortable: true,
  },
  {
    id: 11,
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 220,
    isShowColumn: true,
    type: "slot",
  },
]);

// 表格数据
let tableData = ref<StudentItem[]>([]);
const total = ref(0);

const updateTableList = async (reqParams: PagainationType) => {
  loading.value = true;
  const { code, data } = await reqStudentList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item) => ({
      ...item,
      bigLabel: item.big ? "大" : "小",
      sexLabel: item.sex ? "男" : "女",
      time: dayjs(item.time).format("YYYY-MM-DD HH:mm:ss"),
    }));
    total.value = data.total;
    proTableRef.value!.clearSelection();
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

onMounted(() => {
  updateTableList({ pageSize: 20, currentPage: 1 });
});

const StudentDrawerRef = ref();
const openAddRoleDrawer = () => {
  const params = {
    dialogForm: {},
    api: reqSaveStudent,
    getTableList: updateTableList,
  };
  StudentDrawerRef.value!.acceptParams(params);
};

const selectRow = ref<StudentItem[]>([]);
const selectionChange = (val: StudentItem[]) => {
  selectRow.value = val;
};

const deleteRadio = (row: StudentItem) => {
  ElMessageBox.confirm("此操作将删除该学员，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data } = await reqDelStudent({
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

const deleteSelect = () => {
  if (selectRow.value.length === 0) {
    ElMessage.warning("请选择要删除的数据");
    return;
  }
  ElMessageBox.confirm("此操作将批量删除选择的学员，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data } = await reqDelStudent({
        ids: selectRow.value.map((item) => item.id) as number[],
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

const InfoDrawerRef = ref();
const viewInfo = (row: StudentItem) => {
  const params = {
    detailInfo: row,
  };
  InfoDrawerRef.value!.acceptParams(params);
};

const modifiyInfo = (row: StudentItem) => {
  const params = {
    dialogForm: { ...row },
    api: reqSaveStudent,
    getTableList: updateTableList,
  };
  StudentDrawerRef.value!.acceptParams(params);
};

const ImportDialogRef = ref();
const importTable = () => {
  const params = {};
  ImportDialogRef.value!.acceptParams(params);
};

const exportTable = () => {
  if (selectRow.value.length === 0) {
    ElMessage.warning("请选择要导出的数据");
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: `正在导出数据`,
    background: "rgba(0, 0, 0, 0.8)",
  });
  const list = JSON.stringify(selectRow.value);
  const data = JSON.parse(list);
  const filterColumn = columns.filter(
    (col) => col.prop !== "operation" && col.label !== "操作"
  );
  const config = filterColumn.map((item) => {
    return {
      title: item.label,
      dataIndex: item.prop,
    };
  });
  useExport(config, data, "学员列表", (progress: number) => {
    if (progress === 100) {
      setTimeout(() => {
        loading.close();
        ElMessage({
          type: "success",
          message: "数据导出成功",
        });
        proTableRef.value!.clearSelection();
      }, 2000);
    }
  });
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
