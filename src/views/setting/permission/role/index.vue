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
        <el-button type="primary" :icon="CirclePlus" @click="openAddRoleDrawer"
          >新增角色</el-button
        >
        <!-- <el-button type="danger" :icon="Remove" @click="deleteSelect">删除角色</el-button> -->
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
          type="primary"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          :disabled="slotData.scope.row.roleName === '超级管理员'"
          >删除角色</el-button
        >
      </template>
    </ProTable>
    <!-- 分配权限 -->
    <el-drawer v-model="addRoleDrawer" direction="rtl" @open="openFormDrawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <div class="form-layout-wrapper">
          <el-tree
            ref="treeRef"
            style="max-width: 600px"
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            :props="defaultProps"
            check-strictly
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="permissionConfirm">保存</el-button>
          <el-button @click="permissionCancel">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 新增角色 -->
    <el-dialog
      v-model="insertRoleDrawer"
      :title="roleForm.id ? '编辑角色' : '新增角色'"
      destroy-on-close
      @open="openFormDrawer"
      width="500px"
    >
      <div class="form-layout-wrapper">
        <el-form
          ref="roleFormRef"
          label-suffix=" :"
          :model="roleForm"
          :rules="roleFormRules"
          label-width="auto"
          class="form-container"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="roleForm.roleName"
              placeholder="请输入角色名称"
            />
          </el-form-item>
          <el-form-item label="备注信息" prop="remark">
            <el-input
              v-model="roleForm.remark"
              type="textarea"
              :rows="5"
              placeholder="请输入角色备注信息"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="insertRoleConfirm">保存</el-button>
          <el-button @click="insertRoleCancel">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { PagainationType } from "@/types";
import {
  reqRoleList,
  reqSaveRole,
  reqDelRole,
  reqBatchPermission,
  reqGetPermission,
} from "@/api/role";
import { reqTableList } from "@/api/menu";
import ProTable from "@/components/ProTable/index.vue";
import {
  CirclePlus,
  Delete,
  User,
  Remove,
  EditPen,
} from "@element-plus/icons-vue";
import { dayjs, ElMessage, ElMessageBox } from "element-plus";

const proTableRef = ref();
const loading = ref(false);

const roleForm = ref<any>({
  roleName: "",
  remark: "",
});

const roleFormRules = reactive({
  roleName: [
    {
      required: true,
      message: "请输入角色名称",
      trigger: "blur",
    },
  ],
});

const insertRoleDrawer = ref(false);
const insertRoleCancel = () => {
  insertRoleDrawer.value = false;
};

const defaultProps = {
  children: "children",
  label: "name",
};

const treeRef = ref();

const permissionConfirm = async () => {
  const nodes1 = treeRef.value.getCheckedKeys();
  // const nodes2 = treeRef.value.getHalfCheckedKeys();
  // const list = [...nodes1, ...nodes2];

  const req = {
    roleId: currRoleId.value,
    // menusId: list.filter((id: number) => id !== -1),
    menusId: nodes1,
  };
  if (req.menusId && req.menusId.length === 0) {
    ElMessage.warning("请分配权限");
    return;
  }
  const { code, data } = (await reqBatchPermission(req)) as any;
  if (code === 200) {
    ElMessage.success(data.message);
    addRoleDrawer.value = false;
  }
};
const permissionCancel = () => {
  addRoleDrawer.value = false;
};

let treeData = ref([]);

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
  },
  {
    id: 2,
    prop: "remark",
    label: "备注信息",
    isShowColumn: true,
  },
  {
    id: 3,
    prop: "updateTime",
    label: "更新时间",
    isShowColumn: true,
    sortable: true,
  },
  {
    id: 4,
    prop: "operation",
    label: "操作",
    fixed: "right",
    isShowColumn: true,
    type: "slot",
  },
]);

type tableDataItem = {
  roleName: string;
  remark: string;
  updateTime: Date;
};
// 表格数据
let tableData = ref<tableDataItem[]>([]);
const total = ref(0);
const updateTableList = async (reqParams: PagainationType) => {
  loading.value = true;
  const { code, data }: any = await reqRoleList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item: tableDataItem) => ({
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

const addRoleDrawer = ref(false);
const currRoleId = ref();
const openAddRoleDrawer = () => {
  roleForm.value.id && (roleForm.value.id = "");
  roleForm.value.roleName = "";
  roleForm.value.remark = "";
  insertRoleDrawer.value = true;
};

const roleFormRef = ref();

const openFormDrawer = () => {
  if (roleForm.value.id) {
    return;
  }
  roleFormRef.value?.resetFields();
};

const insertRoleConfirm = () => {
  roleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const req = {
        ...roleForm.value,
        updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      const { code, data }: any = await reqSaveRole(req);
      if (code === 200) {
        roleFormRef.value?.resetFields();
        ElMessage.success(data.message);
        updateTableList({ pageSize: 20, currentPage: 1 });
        insertRoleDrawer.value = false;
      }
    } else {
      ElMessage.warning("表单信息填写有误");
    }
  });
};
const selectRow = ref([]);
const selectionChange = (val: any) => {
  console.log(val, "val");
  selectRow.value = val;
};

const deleteRadio = (row: any) => {
  ElMessageBox.confirm("此操作将删除这条数据，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data }: any = await reqDelRole({
        ids: [row.id],
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
  ElMessageBox.confirm("此操作将删除选择的数据，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data }: any = await reqDelRole({
        ids: selectRow.value.map((item: any) => item.id),
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

const batchPermission = (row: any) => {
  currRoleId.value = row.id;
  getPermission({});
  addRoleDrawer.value = true;
};

const getPermission = async (reqParams: any) => {
  const { code, data }: any = await reqTableList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item: tableDataItem) => ({
      ...item,
      updateTime: dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
    }));
    // treeData.value = [{ name: "全部数据", id: -1, children: menus }] as any;
    treeData.value = menus as any;
    getSelectPerssion();
  }
};

const getSelectPerssion = async () => {
  const { code, data }: any = await reqGetPermission({
    roleId: currRoleId.value,
  });
  if (code === 200) {
    const selectTreeIds = data.list;
    treeRef.value.setCheckedKeys(selectTreeIds);
  }
};

const modifiyInfo = (row: any) => {
  Object.assign(roleForm.value, {}, row);
  insertRoleDrawer.value = true;
};
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
