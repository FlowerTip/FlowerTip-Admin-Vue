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
import { reactive, ref, computed, onMounted } from "vue";
import { SearchFormInterFace } from "@/types";
import { useBreakpoint } from "@/hooks/useBreakpoint.ts";

const foldDefaultObj = {
  xl: 3,
  lg: 2,
  md: 1,
  sm: 1,
  xs: 1,
};
const { currentBreakpoint } = useBreakpoint();

const props = defineProps([
  "toggleFoldCallBack",
  "updateTableList",
  "conditionList",
  "hiddenSearch",
]);

const searchFormRef = ref();

const conditionFold = ref(true);

const initConditionFoldLen = foldDefaultObj[currentBreakpoint.value];

console.log(initConditionFoldLen, "initConditionFoldLen");

const showFoldBtn = computed(() => {
  return props.conditionList.length > initConditionFoldLen;
});

const showSearchBtn = computed(() => {
  if (props.hiddenSearch) return false;
  return props.conditionList.length > 0;
});

const xlSpanCount = computed(() => {
  let totalSpan = 0;
  if (initConditionFoldLen > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.span;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(0, initConditionFoldLen);
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
  if (initConditionFoldLen > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.lgSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(0, initConditionFoldLen);
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

console.log(lgSpanCount.value, "lgSpanCount");

const mdSpanCount = computed(() => {
  let totalSpan = 0;
  if (initConditionFoldLen > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.mdSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(0, initConditionFoldLen);
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
  if (initConditionFoldLen > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.smSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(0, initConditionFoldLen);
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
  if (initConditionFoldLen > 0) {
    if (!conditionFold.value) {
      totalSpan = props.conditionList.reduce((prev: number, next: any) => {
        return prev + next.xsSpan;
      }, 0);
    } else {
      const sliceCondList = props.conditionList.slice(0, initConditionFoldLen);
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

console.log(xlSpanCount.value, "rSpanCount@@@");

const toggleFold = () => {
  conditionFold.value = !conditionFold.value;
  const rowCount = parseInt(
    (props.conditionList.length / (initConditionFoldLen + 1)) as any
  );
  const foldHeight = conditionFold.value ? 0 : rowCount * 50;
  props.toggleFoldCallBack(foldHeight);
};

const sliceCodList = computed(() => {
  return props.conditionList.slice(
    0,
    conditionFold.value ? initConditionFoldLen : props.conditionList.length
  );
});

const searchForm = reactive<SearchFormInterFace>({});

onMounted(() => {
  props.conditionList.forEach((cond: any) => {
    searchForm[cond.prop] = cond.type === "datetimerange" ? [] : "";
  });
});

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
