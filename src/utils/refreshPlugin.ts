import fs from "fs";
import path from "path";
type Version = {
  version: number | string;
};
interface Config {
  publicDir: string;
}

export default ({ version }: Version) => {
  let config: Config = { publicDir: "" };

  return {
    name: "version-plugin", // 必须的，将会在 warning 和 error 中显示
    configResolved(resolvedConfig: Config) {
      // 存储最终解析的配置
      config = resolvedConfig;
    },

    buildStart() {
      // 生成版本信息文件路径
      const file = config.publicDir + path.sep + "version.json";

      // 编译时间作为版本信息
      const content = JSON.stringify({ version });
      writeVersion(file, content);
    },
  };
};

/**
 * 写入文件
 * @param fileName
 * @param version
 */
function writeVersion(
  fileName: string,
  version: string | NodeJS.ArrayBufferView
) {
  fs.writeFile(fileName, version, (err) => {
    if (err) throw err;
  });
}
