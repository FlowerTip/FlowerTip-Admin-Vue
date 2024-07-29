// useBreakpoint.ts
import { ref, onMounted, onUnmounted } from "vue";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export const useBreakpoint = () => {
  const breakpoints: Breakpoints = {
    xs: 0, // 小于 768
    sm: 768, // 768px 到 992
    md: 992, // 992 到 1200
    lg: 1200, // 1200 到 1920
    xl: 1920, // 1920 及以上
  };

  const currentBreakpoint = ref<Breakpoint>("xl"); // 默认断点

  const updateBreakpoint = () => {
    const width = window.innerWidth;
    if (width < breakpoints.sm) {
      currentBreakpoint.value = "xs";
    } else if (width < breakpoints.md) {
      currentBreakpoint.value = "sm";
    } else if (width < breakpoints.lg) {
      currentBreakpoint.value = "md";
    } else if (width < breakpoints.xl) {
      currentBreakpoint.value = "lg";
    } else {
      currentBreakpoint.value = "xl";
    }
  };

  onMounted(() => {
    updateBreakpoint(); // 初始化
    window.addEventListener("resize", updateBreakpoint);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateBreakpoint);
  });

  return { currentBreakpoint };
};
