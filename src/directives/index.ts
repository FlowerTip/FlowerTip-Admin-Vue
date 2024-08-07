import { App, Directive } from "vue";
import permission from "./modules/permission.ts";

type DirectiveConfig = {
  [key: string]: Directive;
};

const directivesList: DirectiveConfig = {
  permission,
};
const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  },
};

export default directives;
