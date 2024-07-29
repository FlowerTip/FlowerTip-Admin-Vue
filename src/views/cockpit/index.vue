<template>
  <div class="home">
    <el-row :gutter="10" class="row-wrap">
      <el-col :span="7" :xs="24" class="left-box">
        <div class="item">
          <div class="title">用户分布</div>
          <PieChart :chartOption="chartOption" />
        </div>
        <div class="item">
          <div class="title">城市人数</div>
          <BarChart :chartOption="chartOption1" />
        </div>
        <div class="item">
          <div class="title">热度趋势</div>
          <LineChart :chartOption="chartOption2" />
        </div>
      </el-col>
      <el-col :span="10" :xs="24" class="mid-box">
        <div class="item map">
          <div class="title">城市概况</div>
          <MapChart />
        </div>
        <div class="item">
          <div class="title">混合布局</div>
          <MixBarChart :chartOption="chartOption" />
        </div>
      </el-col>
      <el-col :span="7" :xs="24" class="right-box">
        <div class="item">
          <div class="title">维度分析</div>
          <div class="chart-children-wrapper">
            <div class="child-item">
              <PieChart :chartOption="chartOption5" />
            </div>
            <div class="child-item">
              <PieChart :chartOption="chartOption6" />
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">年度人口</div>
          <MoreBarChart :chartOption="chartOption4" />
        </div>
        <div class="item">
          <div class="title">状态分布</div>
          <MoreLineChart :chartOption="chartOption3" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import PieChart from "@/components/Chart/pie.vue";
import BarChart from "@/components/Chart/bar.vue";
import MapChart from "@/components/Chart/map.vue";
import LineChart from "@/components/Chart/line.vue";
import MoreLineChart from "@/components/Chart/more-line.vue";
import MoreBarChart from "@/components/Chart/more-bar.vue";
import MixBarChart from "@/components/Chart/mix.vue";
import { reactive } from "vue";

const chartOption = reactive({
  subtext: "总人数",
  name: "用户分布",
  text: "4000人",
  data: [
    {
      value: 1770,
      name: "北京",
    },
    {
      value: 670,
      name: "上海",
    },
    {
      value: 500,
      name: "广州",
    },
    {
      value: 600,
      name: "深圳",
    },
    {
      value: 400,
      name: "天津",
    },
    {
      value: 500,
      name: "西安",
    },
    {
      value: 300,
      name: "杭州",
    },
    {
      value: 200,
      name: "苏州",
    },
    {
      value: 100,
      name: "郑州",
    },
  ],
});

const chartOption1 = reactive({
  unit: "人",
  text: "用户人数",
  xAxisData: ["北京", "上海", "广州", "深圳", "杭州", "苏州", "西安", "郑州"],
  data: [120, 200, 150, 80, 70, 110, 130, 500],
});

const chartOption2 = reactive({
  unit: "人",
  xAxisData: ["北京", "上海", "广州", "深圳", "杭州", "苏州", "西安", "郑州"],
  data: [120, 200, 150, 80, 70, 110, 130, 500],
});

const chartOption3 = reactive({
  legendData: ["2021年", "2022年", "2023年", "2024年"],
  icon: "round",
  unit: "人",
  xAxisData: ["北京", "上海", "广州", "深圳", "杭州", "苏州", "西安", "郑州"],
  seriesData: [
    {
      name: "2021年",
      type: "line",
      stack: "Total",
      smooth: true,
      data: [120, 200, 150, 80, 70, 110, 130, 500],
    },
    {
      name: "2022年",
      type: "line",
      stack: "Total",
      smooth: true,
      data: [140, 230, 120, 180, 270, 110, 130, 200],
    },
    {
      name: "2023年",
      type: "line",
      stack: "Total",
      smooth: true,
      data: [320, 200, 250, 380, 270, 110, 130, 300],
    },
    {
      name: "2024年",
      type: "line",
      stack: "Total",
      smooth: true,
      data: [100, 20, 150, 580, 270, 110, 430, 1000],
    },
  ],
});

const chartOption4 = reactive({
  legendData: ["2021年", "2022年", "2023年", "2024年"],
  icon: "round",
  unit: "人",
  xAxisData: ["北京", "上海", "广州", "深圳", "杭州", "苏州", "西安", "郑州"],
  seriesData: [
    {
      name: "2021年",
      type: "bar",
      data: [120, 200, 150, 80, 70, 110, 130, 500],
    },
    {
      name: "2022年",
      type: "bar",
      data: [140, 230, 120, 180, 270, 110, 130, 200],
    },
    {
      name: "2023年",
      type: "bar",
      data: [320, 200, 250, 380, 270, 110, 130, 300],
    },
    {
      name: "2024年",
      type: "bar",
      data: [100, 20, 150, 580, 270, 110, 430, 1000],
    },
  ],
});

const chartOption5 = reactive({
  subtext: "总量",
  name: "用户分布",
  text: "200人",
  data: [
    {
      value: 1770,
      name: "北京",
    },
    {
      value: 670,
      name: "上海",
    },
    {
      value: 500,
      name: "广州",
    },
    {
      value: 600,
      name: "深圳",
    },
    {
      value: 400,
      name: "天津",
    },
    {
      value: 500,
      name: "西安",
    },
    {
      value: 300,
      name: "杭州",
    },
    {
      value: 200,
      name: "苏州",
    },
    {
      value: 100,
      name: "郑州",
    },
  ],
});

const chartOption6 = reactive({
  subtext: "总数",
  name: "用户分布",
  text: "100人",
  data: [
    {
      value: 1770,
      name: "北京",
    },
    {
      value: 670,
      name: "上海",
    },
    {
      value: 500,
      name: "广州",
    },
    {
      value: 600,
      name: "深圳",
    },
    {
      value: 400,
      name: "天津",
    },
    {
      value: 500,
      name: "西安",
    },
    {
      value: 300,
      name: "杭州",
    },
    {
      value: 200,
      name: "苏州",
    },
    {
      value: 100,
      name: "郑州",
    },
  ],
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  .row-wrap {
    margin-left: 0px !important;
    margin-right: 0px !important;

    .right-box,
    .left-box {
      display: flex;
      flex-direction: column;

      .item {
        margin-bottom: 10px;
      }
    }

    .mid-box {
      display: flex;
      flex-direction: column;
      .item {
        flex: 1;
        margin-bottom: 10px;
        &.map {
          flex: 3;
        }
      }
    }

    .item {
      box-sizing: border-box;
      padding: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background-color: #fff;
      flex: 1;

      .title {
        position: relative;
        font-size: 18px;
        font-weight: 700;
        padding-left: 10px;
        color: var(--el-color-primary);

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          display: inline-block;
          width: 6px;
          height: 18px;
          background-color: var(--el-color-primary);
          border-radius: 6px;
        }
      }

      .chart-children-wrapper {
        display: flex;

        .child-item {
          flex: 1;
        }
      }
    }
  }
}
</style>
