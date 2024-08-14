<template>
  <el-drawer v-model="drawerVisiable" direction="rtl">
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
        <el-button type="primary" @click="drawerConfirm" :loading="loading"
          >保存</el-button
        >
        <el-button @click="drawerCancel">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { reqMenuList } from "@/api/menu";
import { reqGetPermission } from "@/api/role";
import { formatTime } from "@/utils/tool";

type tableDataItem = {
  roleName: string;
  remark: string;
  updateTime: Date;
};

const defaultProps = {
  children: "children",
  label: "name",
};

let treeData = ref([]);

const drawerVisiable = ref(false);

const loading = ref(false);

const treeRef = ref();

const drawerConfirm = async () => {
  const checkedKeys = treeRef.value.getCheckedKeys();
  const req = {
    roleId: dialogProps.value.roleId,
    menusId: checkedKeys,
  };
  if (req.menusId && req.menusId.length === 0) {
    ElMessage.warning("请分配权限");
  } else {
    try {
      loading.value = true;
      await dialogProps.value.api!(req);
      ElMessage.success({ message: `分配权限成功` });
      dialogProps.value.getTableList!({
        currentPage: 1,
        pageSize: 20,
      });
      drawerVisiable.value = false;
      loading.value = false;
    } catch (err) {
      loading.value = false;
      console.log(err);
    }
  }
};

const drawerCancel = () => {
  drawerVisiable.value = false;
};

// props 定义
const dialogProps = ref<any>();

const getPermission = async (reqParams: any) => {
  const { code, data }: any = await reqMenuList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item: tableDataItem) => ({
      ...item,
      updateTime: formatTime(item.updateTime, "datetime"),
    }));
    treeData.value = menus as any;
    getSelectPerssion();
  }
};

const getSelectPerssion = async () => {
  const { code, data }: any = await reqGetPermission({
    roleId: dialogProps.value.roleId,
  });
  if (code === 200) {
    const selectTreeIds = data.list;
    treeRef.value!.setCheckedKeys(selectTreeIds);
  }
};

// 接收父组件参数
const acceptParams = (params: any): void => {
  dialogProps.value = params;
  drawerVisiable.value = true;
  getPermission({});
};

// 暴露给父组件的方法
defineExpose({
  acceptParams,
});
</script>

<style lang="scss" scoped></style>
