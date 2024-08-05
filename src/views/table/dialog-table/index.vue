<template>
  <div class="tree-box" ref="treeDiv">
    <div class="search-wrapper">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" class="search-input" />
      <el-dropdown ref="dropdownRef" trigger="contextmenu" @command="dropCommand">
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
      <el-tree ref="treeRef" node-key="id" :data="data" :props="defaultProps" @node-click="handleNodeClick"
        :default-expand-all="expandAll" highlight-current :filter-node-method="filterNode" :current-node-key="-1" :expand-on-click-node="false" />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ElTree, DropdownInstance } from 'element-plus';
import { More } from '@element-plus/icons-vue';
import { ref, watch, onMounted, nextTick } from 'vue';
import { useElementSize } from '@vueuse/core'

const dropdownRef = ref<DropdownInstance>();
const expandAll = ref(true); // 初始时展开所有  
const filterText = ref('');
const treeRef = ref<InstanceType<typeof ElTree>>();
const data = ref<any>([]);

const maxHeight = ref();
const openMore = () => {
  if (!dropdownRef.value) return;
  dropdownRef.value.handleOpen();
};

const dropCommand = (command: string) => {
  expandAll.value = command === 'unfold';
  updateTreeExpansion(); // 更新树节点展开状态  
};

const updateTreeExpansion = async () => {
  await nextTick(); // 等待 DOM 更新  
  const store = treeRef.value?.store;
  const nodesMap = store ? store.nodesMap : {};
  if (expandAll.value) {
    Object.values(nodesMap).forEach((v) => v.expand())
  } else {
    Object.values(nodesMap).forEach((v) => v.collapse())
  }
};

const filterNode: any = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

interface Tree {
  id?: number,
  label: string,
  children?: Tree[],
}

const dataSource: Tree[] = [
  {
    id: -1,
    label: '全部',
  },
  {
    id: 1,
    label: '北京市',
    children: [
      {
        id: 2,
        label: '朝阳区',
        children: [
          {
            id: 3,
            label: '民族园街道'
          },
          {
            id: 4,
            label: '奥运村街道'
          }
        ]
      },
      {
        id: 5,
        label: '西城区',
        children: [
          {
            id: 6,
            label: '什刹海街道'
          },
          {
            id: 7,
            label: '护国寺街道'
          }
        ]
      },
    ],
  },
  {
    id: 8,
    label: '上海市',
    children: [
      {
        id: 9,
        label: '松江区',
        children: [
          {
            id: 10,
            label: '惠民街道'
          },
          {
            id: 11,
            label: '万达儿街道'
          }
        ]
      },
      {
        id: 12,
        label: '闵行区',
        children: [
          {
            id: 13,
            label: '会哇哈街道'
          },
          {
            id: 14,
            label: '五四广场街道'
          }
        ]
      },
    ],
  },
];

const treeDiv = ref(null);
onMounted(() => {
  data.value = dataSource;
  // 这里可以确保新的数据处于展开状态  
  updateTreeExpansion();
  const { height } = useElementSize(treeDiv);
  maxHeight.value = (height.value - 48) + 'px';
});

const defaultProps = {
  children: 'children',
  label: 'label',
};

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});  
</script>

<style lang="scss" scoped>
.tree-box {
  width: 220px;
  background-color: #fff;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;

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

:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content) {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>