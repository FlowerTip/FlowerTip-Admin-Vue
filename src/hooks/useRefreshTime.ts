import { dayjs } from "element-plus";
import { ref } from "vue";

/**
 * @description 获取当前时间
 */
export const useRefreshTime = () => {
  let currentTime = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"));

  const timer = setInterval(() => {
    currentTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);

  const clearTimer = () => {
    clearInterval(timer);
  };
  return {
    currentTime,
    clearTimer,
  };
};
