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
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeaderLeft>
        <el-button type="primary" :icon="CirclePlus" @click="openAddRoleDrawer"
          >新增用户</el-button
        >
        <!-- <el-button type="danger" :icon="Remove" @click="deleteSelect">删除用户</el-button> -->
      </template>
      <!-- 表格操作 -->
      <template #operation="slotData">
        <el-button
          type="primary"
          link
          :icon="User"
          @click="batchPermission(slotData.scope.row)"
          :disabled="slotData.scope.row.username === '超级管理员'"
          >分配角色</el-button
        >
        <el-button
          type="primary"
          link
          :icon="EditPen"
          @click="modifiyInfo(slotData.scope.row)"
          :disabled="slotData.scope.row.username === '超级管理员'"
          >编辑用户</el-button
        >
        <el-button
          type="primary"
          link
          :icon="Delete"
          @click="deleteRadio(slotData.scope.row)"
          :disabled="slotData.scope.row.username === '超级管理员'"
          >删除用户</el-button
        >
      </template>
    </ProTable>
    <!-- 分配权限 -->
    <el-dialog
      v-model="addRoleDrawer"
      title="分配角色"
      @open="openFormDrawer"
      destroy-on-close
      width="500px"
    >
      <div class="form-layout-wrapper">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="item in treeData"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
            {{ item.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="permissionConfirm">保存</el-button>
          <el-button @click="permissionCancel">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 新增用户 || 编辑用户 -->
    <el-dialog
      :title="roleForm.id ? '编辑用户' : '新增用户'"
      v-model="insertRoleDrawer"
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
          <el-form-item label="用户名称" prop="username">
            <el-input
              v-model="roleForm.username"
              placeholder="请输入用户名称"
            />
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input
              show-password
              type="password"
              v-model="roleForm.password"
              placeholder="请输入用户密码"
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
import { reqRoleList } from "@/api/role";
import {
  reqGetUserList,
  reqSaveUser,
  reqDelUser,
  reqBatchRole,
  reqGetRole,
} from "@/api/user";
import ProTable from "@/components/ProTable/index.vue";
import {
  CirclePlus,
  Delete,
  User,
  // Remove,
  EditPen,
} from "@element-plus/icons-vue";
import {
  dayjs,
  ElMessage,
  ElMessageBox,
  CheckboxValueType,
} from "element-plus";

const proTableRef = ref();
const loading = ref(false);

const roleForm = ref<any>({
  username: "",
  password: "",
});

const roleFormRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名称",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入用户密码",
      trigger: "blur",
    },
  ],
});

const insertRoleDrawer = ref(false);
const insertRoleCancel = () => {
  insertRoleDrawer.value = false;
};

const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedCities = ref([]);

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedCities.value = val ? treeData.value.map((item: any) => item.id) : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === treeData.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < treeData.value.length;
};

const permissionConfirm = async () => {
  const req = {
    userId: currUserId.value,
    rolesId: checkedCities.value,
  };
  if (req.rolesId && req.rolesId.length === 0) {
    ElMessage.warning("请分配角色");
    return;
  }
  const { code, data } = (await reqBatchRole(req)) as any;
  if (code === 200) {
    ElMessage.success(data.message);
    addRoleDrawer.value = false;
  }
};
const permissionCancel = () => {
  addRoleDrawer.value = false;
};

let treeData = ref<any>([]);

const conditionList = reactive([
  {
    id: 1,
    type: "input",
    label: "用户名称",
    prop: "username",
    placeholder: "请输入用户名称",
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
    prop: "username",
    label: "用户名称",
    fixed: "left",
    isShowColumn: true,
    width: 140
  },
  {
    id: 2,
    prop: "password",
    label: "用户密码",
    fixed: "left",
    isShowColumn: true,
    width: 140
  },
  {
    id: 4,
    prop: "operation",
    label: "操作",
    fixed: "right",
    isShowColumn: true,
    type: "slot",
    width: 300
  },
]);

type tableDataItem = {
  username: string;
  password: string;
};
// 表格数据
let tableData = ref<tableDataItem[]>([]);
const total = ref(0);
const updateTableList = async (reqParams: PagainationType) => {
  loading.value = true;
  const { code, data }: any = await reqGetUserList(reqParams);
  if (code === 200) {
    tableData.value = data.list.map((item: tableDataItem) => ({
      ...item,
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
const currUserId = ref();
const openAddRoleDrawer = () => {
  roleForm.value.id && (roleForm.value.id = "");
  roleForm.value.username = "";
  roleForm.value.password = "";
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
      const { code, data }: any = await reqSaveUser(req);
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

const deleteRadio = (row: any) => {
  ElMessageBox.confirm("此操作将删除这条数据，是否继续?", "删除提示", {
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    type: "warning",
  })
    .then(async () => {
      const { code, data }: any = await reqDelUser({
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

const batchPermission = (row: any) => {
  isIndeterminate.value = false;
  currUserId.value = row.id;
  getPermission({});
  addRoleDrawer.value = true;
};

const getPermission = async (reqParams: any) => {
  const { code, data }: any = await reqRoleList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item: tableDataItem) => ({
      ...item,
    }));
    treeData.value = menus as any;
    getSelectPerssion();
  }
};

const getSelectPerssion = async () => {
  const { code, data }: any = await reqGetRole({
    userId: currUserId.value,
  });
  if (code === 200) {
    const selectTreeIds = data.list;
    checkedCities.value = selectTreeIds;
    if (
      checkedCities.value.length > 0 &&
      checkedCities.value.length < treeData.value.length
    ) {
      isIndeterminate.value = true;
    }
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
