import { dayjs } from "element-plus";
import { ElMapExportTable } from "table-excel";

const exportTale = (
  column: string[],
  data: unknown[],
  name = "导出数据",
  progressCallBack: (progress: number) => void
) => {
  const currDateTime = dayjs().format("YYYY年MM月DD日HH点mm分ss秒");
  const instance = new ElMapExportTable(
    {
      column,
      data,
    },
    {
      progress: progressCallBack, // 进度条回调
    }
  );
  instance.download(name + "-导出时间-" + currDateTime);
};

export default exportTale;
