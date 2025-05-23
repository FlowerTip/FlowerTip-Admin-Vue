import { ConfigEnv, UserConfigExport, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import DefineOptions from "unplugin-vue-define-options/vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import path from "path";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// 引入svg
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 导入版本刷新插件
import versionPlugin from "./src/utils/refreshPlugin";
const timeVersion = new Date().getTime();

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  console.log(command);
  // 获取各种环境下对应的变量
  const env = loadEnv(mode, process.cwd());
  return {
    base: "./",
    plugins: [
      VueSetupExtend(),
      DefineOptions(),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        // localEnabled: command === "serve",
        // prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        // injectCode: `import { setupProdMockServer } from './mockProdServer'; setupProdMockServer();`,
        // supportTs: true, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
        localEnabled: false,
        // prodEnabled: false
      }),
      versionPlugin({
        version: timeVersion,
      }),
    ],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        // [env.VITE_APP_BASE_API]: {
        //   target: env.VITE_SERVE,
        //   // 需要代理跨域
        //   changeOrigin: true,
        //   rewrite: (path: string) => path.replace(/^\/api/, ""),
        // },
        [env.VITE_APP_BASE_API]: {
          target: "https://www.flowertip.site:9000/admin-api",
          // 需要代理跨域
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(timeVersion),
    },
  };
};
