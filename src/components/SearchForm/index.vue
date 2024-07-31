<template>
  <div v-if="showSearchBtn" class="search-form-box">
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="100px"
    >
      <el-row>
        <el-col
          :xl="cond.span || 6"
          :lg="cond.lgSpan || 8"
          :md="cond.mdSpan || 12"
          :sm="cond.smSpan || 24"
          :xs="cond.xsSpan || 24"
          v-for="cond in sliceCodList"
          :key="cond.id"
        >
          <el-form-item
            :label="cond.label + '：'"
            :prop="cond.prop"
            class="flex-form-item"
          >
            <!-- 输入框 -->
            <el-input
              v-if="cond.type === 'input'"
              v-model="searchForm[cond.prop] as unknown as any"
              :placeholder="cond.placeholder"
              clearable
            />
            <!-- 下拉框 -->
            <el-select
              v-else-if="cond.type === 'select'"
              v-model="searchForm[cond.prop] as unknown as any"
              :placeholder="cond.placeholder"
              clearable
            >
              <el-option
                v-for="op in cond.optionList"
                :key="op.value"
                :label="op.label"
                :value="op.value"
              />
            </el-select>
            <!-- 日期组合 -->
            <el-date-picker
              v-else-if="cond.type === 'daterange'"
              v-model="searchForm[cond.prop] as unknown as any"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <!-- 日期时间 -->
            <el-date-picker
              v-else-if="cond.type === 'datetime'"
              v-model="searchForm[cond.prop] as unknown as any"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择日期时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xl="xlSpanCount"
          :lg="lgSpanCount"
          :md="mdSpanCount"
          :xs="xsSpanCount"
          :sm="smSpanCount"
          class="el-col-wrapper"
        >
          <el-form-item class="btn-group-item flex-end">
            <el-button type="primary" :icon="Search" @click="search"
              >查询</el-button
            >
            <el-button plain :icon="RefreshRight" @click="reset"
              >重置</el-button
            >
            <el-button
              v-show="showFoldBtn"
              type="primary"
              link
              @click="toggleFold"
            >
              {{ conditionFold ? "展开" : "收起" }}
              <el-icon v-if="conditionFold">
                <ArrowDown />
              </el-icon>
              <el-icon v-else>
                <ArrowUp />
              </el-icon>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup name="searchForm">
import {
  Search,
  RefreshRight,
  ArrowDown,
  ArrowUp,
} from "@element-plus/icons-vue";
import { reactive, ref, computed, onMounted, onUnmounted } from "vue";
import { SearchFormInterFace } from "@/types";
import { useBreakpoint } from "@/hooks/useBreakpoint.ts";

const foldDefaultObj = {
  xl: 3,
  lg: 2,
  md: 1,
  sm: 0,
  xs: 0,
};

const heightDefaultObj = {
  xl: 0,
  lg: 0,
  md: 0,
  sm: 50,
  xs: 50,
};

const props = defineProps([
  "toggleFoldCallBack",
  "updateTableList",
  "conditionList",
  "hiddenSearch",
]);

const searchFormRef = ref();

const conditionFold = ref(true);

const { currentBreakpoint } = useBreakpoint();

const initConditionFoldLen = ref(3);

const showFoldBtn = computed(() => {
  return props.conditionList.length > initConditionFoldLen.value;
});

const showSearchBtn = computed(() => {
  if (props.hiddenSearch) return false;
  return props.conditionList.length > 0;
});

const xlSpanCount = computed(() => {
  let totalSpan = 0;
  if (initConditionFoldLen.value > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.span;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(
        0,
        initConditionFoldLen.value
      );
      totalSpan = sliceCondList.reduce((prev: number, next: any) => {
        return prev + next.span;
      }, 0);
    }
  } else {
    totalSpan = props.conditionList.reduce((prev: number, next: any) => {
      return prev + next.span;
    }, 0);
  }
  return 24 - (totalSpan % 24);
});

const lgSpanCount = computed(() => {
  let totalSpan = 0;
  if (initConditionFoldLen.value > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.lgSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(
        0,
        initConditionFoldLen.value
      );
      totalSpan = sliceCondList.reduce((prev: number, next: any) => {
        return prev + next.lgSpan;
      }, 0);
    }
  } else {
    totalSpan = props.conditionList.reduce((prev: number, next: any) => {
      return prev + next.lgSpan;
    }, 0);
  }
  return 24 - (totalSpan % 24);
});

const mdSpanCount = computed(() => {
  let totalSpan = 0;
  if (initConditionFoldLen.value > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.mdSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(
        0,
        initConditionFoldLen.value
      );
      totalSpan = sliceCondList.reduce((prev: number, next: any) => {
        return prev + next.mdSpan;
      }, 0);
    }
  } else {
    totalSpan = props.conditionList.reduce((prev: number, next: any) => {
      return prev + next.mdSpan;
    }, 0);
  }
  return 24 - (totalSpan % 24);
});

const smSpanCount = computed(() => {
  let totalSpan = 0;
  if (initConditionFoldLen.value > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.smSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(
        0,
        initConditionFoldLen.value
      );
      totalSpan = sliceCondList.reduce((prev: number, next: any) => {
        return prev + next.smSpan;
      }, 0);
    }
  } else {
    totalSpan = props.conditionList.reduce((prev: number, next: any) => {
      return prev + next.smSpan;
    }, 0);
  }
  return 24 - (totalSpan % 24);
});

const xsSpanCount = computed(() => {
  let totalSpan = 0;
  if (initConditionFoldLen.value > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.xsSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(
        0,
        initConditionFoldLen.value
      );
      totalSpan = sliceCondList.reduce((prev: number, next: any) => {
        return prev + next.xsSpan;
      }, 0);
    }
  } else {
    totalSpan = props.conditionList.reduce((prev: number, next: any) => {
      return prev + next.xsSpan;
    }, 0);
  }
  return 24 - (totalSpan % 24);
});

const rowCount = computed(() => {
  return parseInt(
    (props.conditionList.length / (initConditionFoldLen.value + 1)) as any
  );
});
const foldHeight = computed(() => {
  let height = 0;
  const defaultHeight = heightDefaultObj[currentBreakpoint.value];
  if (conditionFold.value) {
    height = defaultHeight;
  } else {
    height = rowCount.value * 50;
  }
  return height;
});
const toggleFold = () => {
  conditionFold.value = !conditionFold.value;
  props.toggleFoldCallBack(foldHeight.value);
};

const sliceCodList = computed(() => {
  return props.conditionList.slice(
    0,
    conditionFold.value
      ? initConditionFoldLen.value === 0
        ? 1
        : initConditionFoldLen.value
      : props.conditionList.length
  );
});

const searchForm = reactive<SearchFormInterFace>({});

onMounted(() => {
  props.conditionList.forEach((cond: any) => {
    searchForm[cond.prop] = cond.type === "datetimerange" ? [] : "";
  });
  setCondFoldHeight();
  window.addEventListener("resize", setCondFoldHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", setCondFoldHeight);
});
const setCondFoldHeight = () => {
  initConditionFoldLen.value = foldDefaultObj[currentBreakpoint.value];
};
const search = () => {
  props.updateTableList({
    pageSize: 20,
    currentPage: 1,
    ...searchForm,
  });
};

const reset = () => {
  searchFormRef.value.resetFields();
  props.updateTableList({
    pageSize: 20,
    currentPage: 1,
    ...searchForm,
  });
};
</script>

<style lang="scss" scoped>
.search-form-box {
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-light);
  background-color: #fff;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;

  .flex-form-item {
    display: flex;
    align-items: center;
  }

  .el-col-wrapper {
    display: flex;

    .btn-group-item {
      flex: 1;
      display: flex;

      :deep(.el-form-item__content) {
        flex: 1;
        display: flex;
        align-items: center;
      }

      &.flex-end {
        :deep(.el-form-item__content) {
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
