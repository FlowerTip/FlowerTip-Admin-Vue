import axios from "axios";

export const versionCheck = async () => {
  if (import.meta.env.MODE === "development") return;
  const res = await axios.get("version.json");
  if (__APP_VERSION__ !== res.data.version) {
    // 这里可以根据需求是否弹出询问弹窗还是直接刷新 我这里是直接刷新
    window.location.reload();
  }
};
