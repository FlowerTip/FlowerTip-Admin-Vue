<template>
  <div class="pro-table-wrapper">
    <!-- 搜索条件区域 -->
    <SearchForm
      :toggleFoldCallBack="toggleFoldCallBack"
      :updateTableList="updateTableList"
      :conditionList="conditionList"
      :hiddenSearch="hiddenSearch"
    />
    <div class="pro-table">
      <!-- 工具栏区域 -->
      <div class="pro-table-toolbox">
        <div class="toolbox-left-buttons">
          <slot name="tableHeaderLeft" />
        </div>
        <div class="toolbox-right-buttons">
          <el-button
            v-show="conditionList.length > 0"
            link
            class="popover-btn"
            @click="toggleSearch"
          >
            <el-icon class="el-icon--right">
              <Search />
            </el-icon>
            {{ hiddenSearch ? "搜索条件" : "隐藏搜索" }}
          </el-button>
          <el-button link class="popover-btn" @click="refreshTable">
            <el-icon class="el-icon--right">
              <Refresh />
            </el-icon>
            刷新列表
          </el-button>
          <el-button link v-popover="popoverRef" class="popover-btn">
            <el-icon class="el-icon--right">
              <Tools />
            </el-icon>
            显示列
          </el-button>
          <el-popover
            ref="popoverRef"
            trigger="click"
            virtual-triggering
            persistent
          >
            <div class="column-wrapper">
              <div class="top-btn-group">
                <span class="top-title"
                  ><el-checkbox
                    v-model="selectAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                  ></el-checkbox
                  ><span class="title-text">列设置</span></span
                >
                <el-button type="primary" link @click="resetColumn"
                  >重置</el-button
                >
              </div>
              <el-checkbox-group
                class="switch-group-box"
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <div class="item">
                  <p class="switch-title">固定在左侧</p>
                  <div
                    v-for="col in leftFixedColumns"
                    :key="col.id"
                    class="switch-box-item"
                  >
                    <el-checkbox
                      :value="col.id"
                      :label="col.label"
                    ></el-checkbox>
                  </div>
                </div>
                <div class="item">
                  <p class="switch-title">不固定</p>
                  <div
                    v-for="col in noFixedColumns"
                    :key="col.id"
                    class="switch-box-item"
                  >
                    <el-checkbox
                      :value="col.id"
                      :label="col.label"
                    ></el-checkbox>
                  </div>
                </div>
                <div class="item">
                  <p class="switch-title">固定在右侧</p>
                  <div
                    v-for="col in rightFixedColumns"
                    :key="col.id"
                    class="switch-box-item"
                  >
                    <el-checkbox
                      :value="col.id"
                      :label="col.label"
                    ></el-checkbox>
                  </div>
                </div>
              </el-checkbox-group>
            </div>
          </el-popover>
          <slot name="tableHeaderRight" />
        </div>
      </div>
      <!-- 表格内容区域 -->
      <el-table
        ref="elTableRef"
        :data="tableData"
        class="pro-table-eleTableBox"
        :header-cell-style="
          () => ({
            'background-color': settingStore.color,
            color: '#fff',
            border: 'none',
            'font-size': '16px',
            'font-weight': 400,
          })
        "
        :row-key="rowKey"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :max-height="maxHeight"
        v-loading="loading"
        element-loading-text="正在加载"
        @selection-change="selectionChange"
        :border="false"
      >
        <!-- 默认插槽 -->
        <slot v-if="showDefaultSlot" />
        <!-- 表格展示列 -->
        <template v-for="item in columns" :key="item.id">
          <!-- color 颜色背景块 -->
          <el-table-column
            v-if="item.type === 'color'"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :sortable="item.sortable ?? false"
            :width="item.width ?? 'auto'"
            :fixed="item.fixed ?? false"
          >
            <template #default="scope">
              <div
                class="color-item"
                :style="{ 'background-color': scope.row[item.prop] }"
              ></div>
            </template>
          </el-table-column>
          <!-- 图片 -->
          <el-table-column
            v-else-if="item.type === 'image'"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :sortable="item.sortable ?? false"
            :width="item.width ?? 'auto'"
            :fixed="item.fixed ?? false"
          >
            <template #default="scope">
              <div class="image-item">
                <img :src="scope.row[item.prop]" :alt="item.prop" />
              </div>
            </template>
          </el-table-column>
          <!-- 操作按钮列 -->
          <el-table-column
            v-else-if="item.type === 'slot'"
            label="操作"
            align="center"
            :fixed="item.fixed"
            :min-width="item.width"
          >
            <template #default="scope">
              <slot name="operation" :scope="scope"></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="item.prop"
            :label="item.label"
            :align="item.align ?? 'center'"
            :sortable="item.sortable ?? false"
            :min-width="item.width ?? 'auto'"
            :fixed="item.fixed ?? false"
          >
            <template v-slot="scope">
              {{
                item.type === "date" || item.type === "datetime"
                  ? formatTime(scope.row[item.prop], item.type)
                  : scope.row[item.prop]
              }}
            </template>
          </el-table-column>
        </template>
        <!-- 无表格数据，空列表 -->
        <template #empty>
          <el-empty
            class="hidden-lg-and-down"
            description="暂无表格数据，请重新查询"
            :image-size="200"
          >
            <template #image>
              <img src="../../assets/images/empty.png" alt="empty" />
            </template>
          </el-empty>
          <span class="hidden-xl-only">暂无表格数据，请重新查询</span>
        </template>
      </el-table>
      <!-- 分页器区域 -->
      <el-pagination
        v-if="total > 0"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :background="background"
        layout="->, total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup name="proTable">
import {
  reactive,
  ref,
  onMounted,
  onBeforeUnmount,
  watchEffect,
  computed,
} from "vue";
import { formatTime } from "@/utils/tool";
import useSettingStore from "@/store/modules/settingStore";
import { CheckboxValueType } from "element-plus";
import { Refresh, Tools, Search } from "@element-plus/icons-vue";
import SearchForm from "@/components/SearchForm/index.vue";
import { useBreakpoint } from "@/hooks/useBreakpoint.ts";
import { ColumnItem } from "./types";

const { currentBreakpoint } = useBreakpoint();

const heightDefaultObj = {
  xl: 0,
  lg: 0,
  md: 0,
  sm: 50,
  xs: 50,
};

const elTableRef = ref();
const clearSelection = () => {
  elTableRef.value!.clearSelection();
};

const popoverRef = ref();
const props = defineProps([
  "tableColumns",
  "tableData",
  "updateTableList",
  "loading",
  "conditionList",
  "total",
  "selectionChange",
  "rowKey",
]);

const selfColumns = ref(props.tableColumns);
const isIndeterminate = ref(false);
const checkedCities = ref(selfColumns.value.map((item: ColumnItem) => item.id));
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  selectAll.value = checkedCount === selfColumns.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < selfColumns.value.length;
};
const selectAll = ref(true);
const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedCities.value = val
    ? selfColumns.value.map((item: ColumnItem) => item.id)
    : [];
  selfColumns.value = selfColumns.value.map((item: ColumnItem) => {
    return {
      ...item,
      isShowColumn: val,
    };
  });
  isIndeterminate.value = checkedCities.value.length === 0 ? false : !val;
};

// 表格动态列原始数据
const columns = computed(() => {
  return selfColumns.value.filter((col: ColumnItem) =>
    checkedCities.value.find((val: string | number) => val == col.id)
  );
});
// 左侧固定的动态列数据
const leftFixedColumns = computed(() => {
  return selfColumns.value.filter((item: ColumnItem) => item.fixed === "left");
});
// 右侧固定的动态列数据
const rightFixedColumns = computed(() => {
  return selfColumns.value.filter((item: ColumnItem) => item.fixed === "right");
});
// 非固定列的动态列数据
const noFixedColumns = computed(() => {
  return selfColumns.value.filter(
    (item: ColumnItem) => item.fixed !== "left" && item.fixed !== "right"
  );
});

const showDefaultSlot = computed(() => {
  return selectAll.value || (!selectAll.value && isIndeterminate.value);
});

const settingStore = useSettingStore();
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
});

const background = ref(true);
const hiddenSearch = ref(false);

// 初始化表格的最大高度
const maxHeight = ref<number | string>("auto");
const chInstance = ref(0);

// 切换搜索条件展开和折叠
const toggleFoldCallBack = (condHeight: number) => {
  setTableHeight(condHeight);
  chInstance.value = condHeight;
};

// 分页器-每页条数发生改变逻辑函数
const handleSizeChange = (val: number) => {
  pagination.currentPage = 1;
  pagination.pageSize = val;
  props.updateTableList(pagination);
};
// 分页器-当前页码发生改变逻辑函数
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val;
  props.updateTableList(pagination);
};

// 刷新表格
const refreshTable = () => {
  props.updateTableList(pagination);
};
// 切换是否显示搜索条件
const toggleSearch = () => {
  hiddenSearch.value = !hiddenSearch.value;
};
// 重置显示列
const resetColumn = () => {
  checkedCities.value = selfColumns.value.map((item: ColumnItem) => item.id);
  isIndeterminate.value = false;
  selectAll.value = true;
};

// 设置表格的最大高度
const setTableHeight = (condHeight = 0) => {
  const instance = hiddenSearch.value
    ? 0
    : condHeight
    ? condHeight
    : chInstance.value;
  const { showFooterBar, showTagsView, showBreadcrumb, showHeaderBar } =
    settingStore;
  const basetopmenuheight = showHeaderBar ? 50 : 0; // 顶部菜单的高度
  const basebreadcrumbheight = showBreadcrumb ? 40 : 0; // 面包屑的高度
  const basetagsViewheight = showTagsView ? 30 : 0; // 标签组的高度
  const footerbarHeight = showFooterBar ? 28 : 0; // 底部栏的高度
  const windowHeight = window.innerHeight;
  const searchHeight = hiddenSearch.value ? 0 : 74; // 搜索表单区域的高度
  const toolboxHeight = 40; // 表格头部的工具栏高度
  const tableHeaderHeight = 40; // 表格表头的高度
  const searchMbInstance = 12; // 搜索表单区域距离表格的下外边距
  const tablePadding = 20; // 表格区域自身的上下padding
  const tableMbInstance = 0; // 表格距离分页器的下外边距
  const paginationHeight = 32; // 分页器的高度
  const tableHeight =
    windowHeight -
    basetopmenuheight -
    basebreadcrumbheight -
    basetagsViewheight -
    footerbarHeight -
    searchHeight -
    instance -
    toolboxHeight -
    tableHeaderHeight -
    searchMbInstance -
    tablePadding -
    tableMbInstance -
    paginationHeight;
  maxHeight.value = tableHeight;
};

watchEffect(() => {
  setTableHeight(heightDefaultObj[currentBreakpoint.value]);
});

// 初始化钩子
onMounted(() => {
  setTableHeight(heightDefaultObj[currentBreakpoint.value]);
  window.addEventListener("resize", () =>
    setTableHeight(heightDefaultObj[currentBreakpoint.value])
  );
});

// 卸载钩子
onBeforeUnmount(() => {
  window.removeEventListener("resize", () =>
    setTableHeight(heightDefaultObj[currentBreakpoint.value])
  );
});

// 提供内部数据，给外部组件调用
defineExpose({
  pagination,
  clearSelection,
});
</script>

<style lang="scss" scoped>
/* 表格loading层级 */
:deep(.el-loading-mask) {
  z-index: 98;
}

.pro-table-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  .pro-table {
    flex: 1;
    box-shadow: var(--el-box-shadow-light);
    background-color: #fff;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;

    .pro-table-toolbox {
      height: 40px;
      overflow: hidden;
      margin-bottom: 6px;

      .toolbox-left-buttons {
        float: left;
        height: 32px;
      }

      .toolbox-right-buttons {
        float: right;
        height: 32px;
        text-align: right;
        display: flex;
        align-items: center;
      }
    }

    .pro-table-eleTableBox {
      flex: 1;
      margin-bottom: 16px;
      width: 100%;
      overflow-y: auto;
    }

    :deep(.el-table__header) {
      th {
        &.is-sortable {
          &.ascending {
            .caret-wrapper {
              .sort-caret {
                &.ascending {
                  border-bottom-color: transparent;
                }

                &.descending {
                  border-top-color: #fff;
                }
              }
            }
          }

          &.descending {
            .caret-wrapper {
              .sort-caret {
                &.ascending {
                  border-bottom-color: #fff;
                }

                &.descending {
                  border-top-color: transparent;
                }
              }
            }
          }

          .caret-wrapper {
            .sort-caret {
              &.ascending {
                border-bottom-color: #fff;
              }

              &.descending {
                border-top-color: #fff;
              }
            }
          }
        }
      }
    }
  }
}

.right-label {
  margin-left: 10px;
}

.top-btn-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  padding-bottom: 20px;

  .top-title {
    display: flex;
    align-items: center;

    .title-text {
      margin-left: 6px;
    }
  }
}

.switch-group-box {
  overflow-x: auto;
  height: 250px;
}

.item {
  margin-bottom: 10px;

  .switch-title {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    color: #73767a;
  }

  .switch-box-item {
    padding-left: 12px;
  }
}

.popover-btn {
  display: flex;
  align-items: center;

  .el-icon--right {
    font-size: 20px;
    padding-right: 4px;
  }
}

.color-item {
  width: 30px;
  height: 30px;
  margin: 0 auto;
}

.image-item {
  width: 80px;
  height: 80px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
  }
}

.empty-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
