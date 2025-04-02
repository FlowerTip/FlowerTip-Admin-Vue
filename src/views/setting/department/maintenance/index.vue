<template>
  <div class="table-box">
    <div class="tree-box" ref="treeDiv">
      <div class="search-wrapper">
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
          class="search-input"
          :prefix-icon="Search"
        />
        <el-dropdown
          ref="dropdownRef"
          trigger="contextmenu"
          @command="dropCommand"
        >
          <span class="el-dropdown-link">
            <el-icon class="more-btn" @click="openMore">
              <More />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="unfold">展开全部</el-dropdown-item>
              <el-dropdown-item command="fold">折叠全部</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-scrollbar :max-height="maxHeight">
        <el-tree
          ref="treeRef"
          node-key="departmentId"
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :default-expand-all="expandAll"
          highlight-current
          :filter-node-method="filterNode"
          :current-node-key="currentNodeKey"
          :expand-on-click-node="false"
          :show-checkbox="false"
        />
      </el-scrollbar>
    </div>
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
      class="diy-table"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeaderLeft>
        <el-button type="primary" :icon="CirclePlus" @click="openAddWorkPost"
          >新增岗位</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          >编辑岗位</el-button
        >
        <el-button
          type="danger"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          >删除岗位</el-button
        >
      </template>
    </ProTable>
    <!-- 新增岗位 || 编辑方位 -->
    <WorkPostDialog ref="WorkPostDialogRef" />
  </div>
</template>

<script setup lang="ts" name="AdvancedTable">
import { ElTree, DropdownInstance } from "element-plus";
import {
  More,
  Search,
  CirclePlus,
  Delete,
  EditPen,
} from "@element-plus/icons-vue";
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useElementSize } from "@vueuse/core";
import { FilterNodeMethodFunction } from "element-plus/es/components/tree/src/tree.type";
import WorkPostDialog from "./components/workPostDialog.vue";
import {
  reqWorkPostList,
  reqSaveWorkPost,
  reqDelWorkPost,
} from "@/api/workPost";
import { reqDepartmentList } from "@/api/department";
import ProTable from "@/components/ProTable/index.vue";
import { dayjs } from "element-plus";

const WorkPostDialogRef = ref();
const openAddWorkPost = () => {
  const params = {
    api: reqSaveWorkPost,
    rowData: {
      workPostName: "",
      workPostNum: "",
      description: "",
      departmentId: currentNodeKey.value,
    },
    getTableList: updateTableList,
  };
  WorkPostDialogRef.value!.acceptParams(params);
};

const deleteRadio = (row: AccountItem) => {
  ElMessageBox.confirm("此操作将删除该岗位，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code } = await reqDelWorkPost({
        ids: [row.workPostId!],
      });
      if (code === 200) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        updateTableList({
          pageSize: 20,
          currentPage: 1,
          departmentId: currentNodeKey.value,
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

const modifiyInfo = (row: AccountItem) => {
  WorkPostDialogRef.value!.acceptParams({
    api: reqSaveWorkPost,
    rowData: { ...row },
    getTableList: updateTableList,
  });
};

const dropdownRef = ref<DropdownInstance>();
const expandAll = ref(true); // 初始时展开所有
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const data = ref<any>([]);
const currentNodeKey = ref();

const maxHeight = ref();
const openMore = () => {
  if (!dropdownRef.value) return;
  dropdownRef.value.handleOpen();
};

const dropCommand = (command: string) => {
  expandAll.value = command === "unfold";
  updateTreeExpansion(); // 更新树节点展开状态
};
const updateTreeExpansion = async () => {
  await nextTick(); // 等待 DOM 更新
  const store = treeRef.value?.store;
  const nodesMap = store ? store.nodesMap : {};
  if (expandAll.value) {
    Object.values(nodesMap).forEach((v) => v.expand());
  } else {
    Object.values(nodesMap).forEach((v) => v.collapse());
  }
};

const filterNode: FilterNodeMethodFunction = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

interface Tree {
  departmentId?: number;
  departmentName: string;
  id?: number;
  label: string;
  children?: Tree[];
}

const treeDiv = ref(null);
onMounted(() => {
  getTreeData();
});

const getTreeData = async () => {
  const result = await reqDepartmentList({
    departmentName: filterText.value,
  });
  if (result.code === 200) {
    data.value = result.data.list as any;
    // 这里可以确保新的数据处于展开状态
    updateTreeExpansion();
    const { height } = useElementSize(treeDiv);
    maxHeight.value = height.value - 48 + "px";
    await nextTick();
    const currSelectRow = data.value[0] as any;
    currentNodeKey.value = currSelectRow.children[0].departmentId;
    updateTableList({
      pageSize: 20,
      currentPage: 1,
      departmentId: currentNodeKey.value,
    });
  }
};

const defaultProps = {
  children: "children",
  label: "departmentName",
};

const handleNodeClick = (data: Tree) => {
  console.log(data.departmentId);
  currentNodeKey.value = data.departmentId;
  updateTableList({
    pageSize: 20,
    currentPage: 1,
    departmentId: currentNodeKey.value,
  });
};

watch(filterText, () => {
  getTreeData();
});

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
    width: 200,
    isShowColumn: true,
  },
  {
    id: 2,
    prop: "workPostNum",
    label: "岗位编号",
    width: 140,
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
    width: 200,
    isShowColumn: true,
    sortable: true,
    type: "datetime",
  },
  {
    id: 6,
    prop: "updatedAt",
    label: "更新时间",
    width: 200,
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
    width: 220,
  },
]);

// 表格数据
let tableData = ref<WorkPostItem[]>([]);
const total = ref(0);

const updateTableList = async (reqParams: Req.WorkPostListParam) => {
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

const selectRow = ref<WorkPostItem[]>([]);
const selectionChange = (val: WorkPostItem[]) => {
  selectRow.value = val;
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
  display: flex;
}

.diy-table {
  flex: 1;
  margin-left: 10px;
  width: calc(100% - 220px);
}

.tree-box {
  min-width: 220px;
  background-color: #fff;
  padding: 10px 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  .search-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .more-btn {
      font-size: 18px;
      height: 32px;
      line-height: 32px;
      margin-left: 10px;
      cursor: pointer;
      transform: rotate(90deg);
    }
  }
}

/* 处理el-tree文本过长的问题 */
:deep(
    .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content
  ) {
  background-color: var(--el-color-primary);
  color: #fff;

  .el-icon {
    color: #fff;
  }
}

:deep(.el-tree-node__content) {
  height: auto;
  min-height: var(--el-tree-node-content-height);

  .el-tree-node__label {
    text-wrap: wrap;
    padding: 6px 0;
  }
}
</style>
