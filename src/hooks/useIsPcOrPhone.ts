import { ref, onMounted, onBeforeUnmount } from "vue";

/**
 * @description 获取当前设备的是PC还是移动端
 */
const useIsPcOrPhone = () => {
  const screenWidth = ref(document.documentElement.clientWidth);
  const isPhone = ref(screenWidth.value < 993);
  const updateScreenStatus = () => {
    isPhone.value = document.body.offsetWidth < 993;
  };
  onMounted(() => {
    window.addEventListener("resize", updateScreenStatus);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateScreenStatus);
  });
  return {
    isPhone,
  };
};

export default useIsPcOrPhone;
