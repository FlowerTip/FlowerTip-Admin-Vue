<template>
  <div class="dialog-table">
    <div class="tree-box" ref="treeDiv">
      <div class="search-wrapper">
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" class="search-input" :prefix-icon="Search" />
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
          :default-expand-all="expandAll" highlight-current :filter-node-method="filterNode" :current-node-key="-1"
          :expand-on-click-node="false" :show-checkbox="false" />
      </el-scrollbar>
    </div>
    <div class="right-wrapper">
      <div class="condition">
        <span class="label">账单状态（单选）：</span>
        <div class="radio-group" @click="radioClick">
          <div class="radio-item" :class="{ active: radio.id === radioIndex }" v-for="radio in radioList"
            :key="radio.id" :data-id="radio.id">
            <el-icon v-if="radio.icon" class="radio-icon">
              <component :is="radio.icon"></component>
            </el-icon>
            {{ radio.label }}
          </div>
        </div>
      </div>
      <div class="condition">
        <span class="label">报销状态（多选）：</span>
        <div class="checkbox-group" @click="checkboxClick">
          <div class="radio-item" :class="{ active: checkboxIndex.includes(checkbox.id) }" v-for="checkbox in radioList"
            :key="checkbox.id" :data-id="checkbox.id">
            <el-icon v-if="checkbox.icon" class="radio-icon">
              <component :is="checkbox.icon"></component>
            </el-icon>
            {{ checkbox.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElTree, DropdownInstance, ElMessage } from "element-plus";
import { More, Search, Edit } from "@element-plus/icons-vue";
import { ref, watch, onMounted, nextTick } from "vue";
import { useElementSize } from "@vueuse/core";
import { FilterNodeMethodFunction } from "element-plus/es/components/tree/src/tree.type";

const radioList = [
  {
    id: -1,
    label: "全部",
  },
  {
    id: 1,
    label: "待提交",
    icon: Edit,
  },
  {
    id: 2,
    label: "待审核",
    icon: Edit,
  },
  {
    id: 3,
    label: "已驳回",
    icon: Edit,
  },
  {
    id: 4,
    label: "已通过",
    icon: Edit,
  },
];

const radioIndex = ref(-1);

const radioClick = (event: MouseEvent) => {
  const targetElement = event.target as HTMLDivElement;
  const { id } = targetElement.dataset;
  if (!id) return;
  radioIndex.value = Number(id);
  const radioLabel = radioList.find((radio) => radio.id == radioIndex.value)?.label;
  ElMessage.success(
    "点击了id值为：" + radioIndex.value + "；label值为：" + radioLabel
  );
};

const checkboxIndex = ref<number[]>([-1]);
const checkboxClick = (event: MouseEvent) => {
  const targetElement = event.target as HTMLDivElement;
  const { id } = targetElement.dataset;
  if (!id) return;
  const idNum = Number(id);
  const spliceIndex = checkboxIndex.value.findIndex((curr) => curr === idNum);
  if (spliceIndex !== -1) {
    checkboxIndex.value.splice(spliceIndex, 1);
    if (checkboxIndex.value.length === 0) {
      checkboxIndex.value = [-1];
    }
  } else {
    if (idNum === -1) {
      checkboxIndex.value = [idNum];
      ElMessage.success("点击了ids值为：" + "[" + checkboxIndex.value + "]");
      return;
    }
    const currIndex = checkboxIndex.value.findIndex((idVal) => idVal === -1);
    currIndex !== -1 && checkboxIndex.value.splice(currIndex, 1);
    checkboxIndex.value.push(idNum);
  }
  ElMessage.success("点击了ids值为：" + "[" + checkboxIndex.value + "]");
};

const dropdownRef = ref<DropdownInstance>();
const expandAll = ref(true); // 初始时展开所有
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const data = ref<any>([]);

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
  id?: number;
  label: string;
  children?: Tree[];
}

const dataSource: Tree[] = [
  {
    id: -1,
    label: "全部",
  },
  {
    id: 1,
    label: "北京市",
    children: [
      {
        id: 2,
        label: "朝阳区",
        children: [
          {
            id: 3,
            label: "民族园街道",
          },
          {
            id: 4,
            label: "奥运村街道",
          },
        ],
      },
      {
        id: 5,
        label: "西城区",
        children: [
          {
            id: 6,
            label: "什刹海街道",
          },
          {
            id: 7,
            label: "护国寺街道",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    label: "上海市",
    children: [
      {
        id: 9,
        label: "松江区",
        children: [
          {
            id: 10,
            label: "惠民街道",
          },
          {
            id: 11,
            label: "万达儿街道",
          },
        ],
      },
      {
        id: 12,
        label: "闵行区",
        children: [
          {
            id: 13,
            label: "会哇哈街道",
          },
          {
            id: 14,
            label: "五四广场街道",
          },
        ],
      },
    ],
  },
  {
    id: 15,
    label: "天津市",
    children: [
      {
        id: 16,
        label: "滨海新区",
        children: [
          {
            id: 17,
            label: "惠民街道",
          },
          {
            id: 18,
            label: "万达儿街道",
          },
        ],
      },
      {
        id: 19,
        label: "回族区",
        children: [
          {
            id: 20,
            label: "会哇哈街道",
          },
          {
            id: 21,
            label: "五四广场街道",
          },
          {
            id: 22,
            label: "大广街道",
          },
          {
            id: 22,
            label: "二级街道",
          },
        ],
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
  maxHeight.value = height.value - 48 + "px";
});

const defaultProps = {
  children: "children",
  label: "label",
};

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});
</script>

<style lang="scss" scoped>
.dialog-table {
  height: 100%;
  display: flex;

  .right-wrapper {
    flex: 1;
    background-color: #fff;
    margin-left: 10px;
    padding: 20px;

    .condition {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .label {
        font-size: 14px;
        margin-right: 10px;
      }
    }

    .radio-group,
    .checkbox-group {
      display: flex;
      align-items: center;

      .radio-item {
        margin-right: 16px;
        min-width: 80px;
        text-align: center;
        padding: 6px;
        border-radius: 40px;
        background-color: #999;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        background-color: var(--el-color-primary-light-9);
        border-width: 1px;
        border-style: solid;
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
        justify-content: center;

        .radio-icon {
          font-size: 16px;
          color: var(--el-color-primary);
          padding-right: 2px;
        }

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          background-color: var(--el-color-primary);
          color: #fff;
          font-weight: 600;

          .radio-icon {
            color: #fff;
            font-weight: 600;
          }
        }

        &.active {
          background-color: var(--el-color-primary);
          color: #fff;
          font-weight: 600;

          .radio-icon {
            color: #fff;
            font-weight: 600;
          }
        }
      }
    }
  }
}

.tree-box {
  width: 220px;
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
:deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
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
