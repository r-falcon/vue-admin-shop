import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

// 将request注册到全局
import request from "@/utils/request";
Vue.prototype.$request = request;
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);

// 导入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
// 导入富文本编辑器对应的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 将富文本编辑器注册到全局
Vue.use(VueQuillEditor);

// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 引入树形控件
import TreeTable from "vue-table-with-tree-grid";
// 注册为全局组件
Vue.component("tree-table", TreeTable);

Vue.config.productionTip = false;

// 格式化事件日期
Vue.filter("dataFormat", function(originVal) {
  const dt = new Date(originVal);

  const y = dt.getFullYear();
  // 字符串补全功能。 padStart用于头部补全；padEnd用于尾部补全
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

// 编辑数据指定项
Vue.prototype.target = function(obj, x) {
  var i = 0;
  for (var key in obj) {
    if (i == x) {
      return obj[key];
    }
    ++i;
  }
};

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
