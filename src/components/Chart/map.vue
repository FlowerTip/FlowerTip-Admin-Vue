<template>
  <div ref="MapChart" style="width: 100%; height: 580px"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";
import useSettingStore from "@/store/modules/settingStore";
import BJGeoJson from "../../../mock/map";

const settingStore = useSettingStore();
const MapChart = ref(null);
let myChart: any = null;

let sidebarMenuNode: HTMLDivElement;

const option = {
  tooltip: {
    trigger: "item",
    // formatter: "{b}<br/>监管单位总数：{c} (家)",
  },
  // visualMap: {
  //   show: false,
  //   min: 0,
  //   max: 1000,
  //   text: [">100", "无"],
  //   textStyle: {
  //     color: "#fff",
  //   },
  //   realtime: false,
  //   calculable: true,
  //   inRange: {
  //     color: ["#c45656", "#f89898", "#fab6b6", "#fcd3d3", "#fde2e2", "#fef0f0"],
  //   },
  // },
  geo: [
    {
      name: "北京市",
      type: "map",
      map: "BeiJing",
      aspectScale: -1.25, //长宽比
      layoutCenter: ["50%", "45%"],
      layoutSize: "60%",
      itemStyle: {
        normal: {
          areaColor: settingStore.color,
          shadowColor: "#000000",
          shadowOffsetY: 12,
          shadowOffsetX: 0,
        },
        emphasis: {
          shadowColor: "rgba(0, 0, 0, 1)",
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          borderColor: "#0CDEFF",
          borderWidth: 1,
          areaColor: "#c45656",
          label: {
            color: "#fff",
          },
        },
      },
      label: {
        show: false,
        color: "#fff",
      },
      select: {
        label: {
          color: "#fff",
        },
        itemStyle: {
          color: "#fff",
          // 选中区域红色
          areaColor: "#c45656",
          // 选中区域边框
          borderColor: "#0CDEFF",
          borderWidth: 1,
        },
      },
      data: [],
    },
  ],
  series: [
    {
      name: "北京市",
      type: "map",
      map: "BeiJing",
      aspectScale: -1.25, //长宽比
      layoutCenter: ["50%", "45%"],
      layoutSize: "60%",
      itemStyle: {
        normal: {
          areaColor: settingStore.color,
          shadowColor: "#000000",
        },
        emphasis: {
          shadowColor: "rgba(0, 0, 0, 1)",
          shadowBlur: 10,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          borderColor: "#0CDEFF",
          borderWidth: 1,
          areaColor: "#c45656",
          label: {
            color: "#fff",
          },
        },
      },
      label: {
        show: true,
        color: "#fff",
      },
      select: {
        label: {
          color: "#fff",
        },
        itemStyle: {
          color: "#fff",
          // 选中区域红色
          areaColor: "#c45656",
          // 选中区域边框
          borderColor: "#0CDEFF",
          borderWidth: 1,
        },
      },
      data: [],
    },
  ],
};
// this.districtConditions.forEach((item) => {
//   const obj = {
//     name: item.districtName,
//     value: item.eprCount,
//   };
//   option.series[0].data.push(obj);
// });
echarts.registerMap("BeiJing", BJGeoJson as unknown as string);

onMounted(() => {
  myChart = echarts.init(MapChart.value);
  myChart.setOption(option);
  window.addEventListener("resize", resizeChart);
  sidebarMenuNode = document.getElementsByClassName(
    "content-aside"
  )[0] as HTMLDivElement;
  sidebarMenuNode &&
    sidebarMenuNode.addEventListener("transitionend", resizeChart);
});

onBeforeMount(() => {
  window.removeEventListener("resize", resizeChart);
  sidebarMenuNode &&
    sidebarMenuNode.removeEventListener("transitionend", resizeChart);
});

const resizeChart = useDebounceFn(() => {
  myChart.resize();
}, 100);

watch(
  () => settingStore.color,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      const option = {
        tooltip: {
          trigger: "item",
          // formatter: "{b}<br/>监管单位总数：{c} (家)",
        },
        visualMap: {
          // show: false,
          min: 0,
          max: 1000,
          text: [">100", "无"],
          // textStyle: {
          //   color: "#fff",
          // },
          // realtime: false,
          calculable: true,
          inRange: {
            color: [
              "#c45656",
              "#f89898",
              "#fab6b6",
              "#fcd3d3",
              "#fde2e2",
              "#fef0f0",
            ],
          },
        },
        geo: [
          {
            name: "北京市",
            type: "map",
            map: "BeiJing",
            aspectScale: -1.25, //长宽比
            layoutCenter: ["50%", "45%"],
            layoutSize: "65%",
            itemStyle: {
              normal: {
                areaColor: settingStore.color,
                shadowColor: "#000000",
                shadowOffsetY: 12,
                shadowOffsetX: 0,
              },
              emphasis: {
                shadowColor: "rgba(0, 0, 0, 1)",
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                borderColor: "#0CDEFF",
                borderWidth: 1,
                areaColor: "#c45656",
                label: {
                  color: "#fff",
                },
              },
            },
            label: {
              show: false,
              color: "#fff",
            },
            select: {
              label: {
                color: "#fff",
              },
              itemStyle: {
                color: "#fff",
                // 选中区域红色
                areaColor: "#c45656",
                // 选中区域边框
                borderColor: "#0CDEFF",
                borderWidth: 1,
              },
            },
            data: [],
          },
        ],
        series: [
          {
            name: "北京市",
            type: "map",
            map: "BeiJing",
            aspectScale: -1.25, //长宽比
            layoutCenter: ["50%", "45%"],
            layoutSize: "65%",
            itemStyle: {
              normal: {
                areaColor: settingStore.color,
                shadowColor: "#000000",
              },
              emphasis: {
                shadowColor: "rgba(0, 0, 0, 1)",
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                borderColor: "#0CDEFF",
                borderWidth: 1,
                areaColor: "#c45656",
                label: {
                  color: "#fff",
                },
              },
            },
            label: {
              show: true,
              color: "#fff",
            },
            select: {
              label: {
                color: "#fff",
              },
              itemStyle: {
                color: "#fff",
                // 选中区域红色
                areaColor: "#c45656",
                // 选中区域边框
                borderColor: "#0CDEFF",
                borderWidth: 1,
              },
            },
            data: [],
          },
        ],
      };
      myChart = echarts.init(MapChart.value);
      myChart && myChart.setOption(option);
    }
    console.log(newVal, oldVal, "newVal, oldVal");
  }
);
</script>

<style lang="scss" scoped></style>
