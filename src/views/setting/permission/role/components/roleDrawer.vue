<template>
  <el-drawer v-model="drawerVisiable" direction="rtl">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <div class="form-layout-wrapper">
        <el-tree ref="treeRef" style="max-width: 600px" :data="treeData" show-checkbox default-expand-all node-key="id"
          :props="defaultProps" check-strictly @check="hanleCheck" @check-change="checkChange" />
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="drawerConfirm" :loading="loading">保存</el-button>
        <el-button @click="drawerCancel">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { reqMenuList } from "@/api/menu";
import { reqGetPermission } from "@/api/role";
import { formatTime } from "@/utils/tool";
import { TreeNode, TreeNodeData } from "element-plus/es/components/tree-v2/src/types";

const defaultProps = {
  children: "children",
  label: "name",
};

let treeData = ref<MenuItem[]>([]);

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
const dialogProps = ref();

const getPermission = async (reqParams: Req.MenuListParam) => {
  const { code, data } = await reqMenuList(reqParams);
  if (code === 200) {
    const menus = data.list.map((item) => ({
      ...item,
      updateTime: formatTime(item.updateTime as Date, "datetime"),
    }));
    treeData.value = menus;
    getSelectPerssion();
  }
};

const getSelectPerssion = async () => {
  const { code, data } = await reqGetPermission({
    roleId: dialogProps.value.roleId,
  });
  if (code === 200) {
    const selectTreeIds = data.list;
    treeRef.value!.setCheckedKeys(selectTreeIds);
    // 处理回显选中Tree树结构逻辑
    await nextTick();
    selectTreeIds.forEach((id) => {
      const nodeData = treeRef.value!.getNode(id); // 根据权限id，获取每个选中的树节点
      console.log("nodeData", nodeData);
      console.log("nodeData.parent?.id", nodeData.parent?.id);
      // 反显，上面setCheckedKeys后，如果父级没有选中，则把半选状态设置true
      if (nodeData?.parent?.id != 0 && !nodeData?.parent?.checked) {
        nodeData.parent.indeterminate = true;
      }
    });
  }
};
type AcceptParams = {
  roleId: number;
};
// 接收父组件参数
const acceptParams = (params: AcceptParams) => {
  dialogProps.value = params;
  drawerVisiable.value = true;
  getPermission({});
};

// 暴露给父组件的方法
defineExpose({
  acceptParams,
});

// 父子不关联，实现非最后一级，选中关联子数据功能
const hanleCheck = (data: TreeNodeData, node: TreeNode) => {
  console.log(data, node);
  // 获取当前节点是否被选中
  const isChecked = treeRef.value!.getNode(data).checked;
  // 如果当前节点被选中，则遍历下级子节点并选中，如果当前节点取消选中，则遍历下级节点并取消
  if (isChecked) {
    // 判断该节点是否有下级节点，如果有那么遍历设置下级节点为选中
    data.children &&
      data.children.length > 0 &&
      setChildreChecked(data.children, true);
  } else {
    // 如果节点取消选中，则取消该节点下的子节点选中
    data.children &&
      data.children.length > 0 &&
      setChildreChecked(data.children, false);
  }
  function setChildreChecked(node: any, isChecked: boolean) {
    node.forEach((item: any) => {
      item.children &&
        item.children.length > 0 &&
        setChildreChecked(item.children, isChecked);
      // 修改勾选状态
      treeRef.value!.setChecked(item.id, isChecked, true);
    });
  }
};
const checkChange = (data: TreeNodeData, checked: boolean, indeterminate: boolean) => {
  console.log(data, checked, indeterminate);
  // 选中全部子节点，父节点也默认选中，但是子节点再次取消勾选或者全部子节点取消勾选也不会影响父节点勾选状态
  let checkNode = treeRef.value!.getNode(data); //获取当前节点

  // 勾选部分子节点，父节点变为半选状态
  if (
    checkNode.parent &&
    checkNode.parent.childNodes.some((ele: TreeNodeData) => ele.checked)
  ) {
    checkNode.parent.indeterminate = true;
  }
  // 勾选全部子节点，父节点变为全选状态
  if (
    checkNode.parent &&
    checkNode.parent.childNodes.every((ele: TreeNodeData) => ele.checked)
  ) {
    checkNode.parent.checked = true;
    checkNode.parent.indeterminate = false;
  }
  // 如果取消所有第二节点的勾选状态，则第一层父节点也取消勾选
  if (
    checkNode.level == 2 &&
    checkNode.parent.childNodes.every((ele: TreeNodeData) => !ele.checked)
  ) {
    checkNode.parent.checked = false;
    checkNode.parent.indeterminate = false;
  }
};
</script>

<style lang="scss" scoped></style>
