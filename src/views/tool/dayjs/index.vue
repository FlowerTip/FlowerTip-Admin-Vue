<template>
  <div class="dayjs-wrapper">
    <p>当前日期时间：{{ currDateTime }}</p>
    <p>近一周：{{ currWeekBeginTime }} 至 {{ currWeekEndTime }}</p>
    <p>近一月：{{ currMonthBeginTime }} 至 {{ currMonthEndTime }}</p>
    <p>近一年：{{ currYearBeginTime }} 至 {{ currYearEndTime }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { dayjs } from "element-plus";

const formatStr = "YYYY-MM-DD HH:mm:ss";

const currDateTime = ref(dayjs().format(formatStr));

const currWeekBeginTime = ref(
  dayjs(dayjs().subtract(6, "day")).format(formatStr)
);
const currWeekEndTime = ref(dayjs().format(formatStr));

const currMonthBeginTime = ref(
  dayjs(dayjs().subtract(29, "day")).format(formatStr)
);
const currMonthEndTime = ref(dayjs().format(formatStr));

const currYearBeginTime = ref(
  dayjs(dayjs().subtract(364, "day")).format(formatStr)
);
const currYearEndTime = ref(dayjs().format(formatStr));
</script>

<style lang="scss" scoped>
.dayjs-wrapper {
  height: 100%;
  background-color: #fff;
  padding: 20px;
  p {
    line-height: 40px;
  }
}
</style>
