import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录模块
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  // 404页面
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  // 主页
  {
    path: "/",
    component: Layout,
    meta: { title: "系统主页", icon: "dashboard" },
    redirect: "/home",
    // alwaysShow: true,
    hidden: true,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        // meta: { title: "用户主页", icon: "example" },
        hidden: true
      }
    ]
  },

  // 用户管理
  {
    path: "/user",
    component: Layout,
    name: "User",
    meta: { title: "用户管理", icon: "user" },
    alwaysShow: true,
    children: [
      {
        path: "userinfo",
        name: "Userinfo",
        component: () => import("@/views/userinfo/index"),
        meta: { title: "用户列表", icon: "example" }
      }
    ]
  },

  // 权限管理
  {
    path: "/rights",
    component: Layout,
    name: "Rights",
    meta: { title: "权限管理", icon: "nested" },
    children: [
      {
        path: "roleList",
        name: "RoleList",
        component: () => import("@/views/rights/roleList"),
        meta: { title: "角色列表", icon: "example" }
      },
      {
        path: "rightsList",
        name: "RightsList",
        component: () => import("@/views/rights/rightsList"),
        meta: { title: "权限列表", icon: "example" }
      }
    ]
  },

  // 商品管理
  {
    path: "/goods",
    component: Layout,
    name: "Goods",
    meta: { title: "商品管理", icon: "tree" },
    children: [
      {
        path: "goodsList",
        name: "GoodsList",
        component: () => import("@/views/goods/goodsList"),
        meta: { title: "商品列表", icon: "example" }
      },
      {
        path: "components/itemAdd",
        name: "itemAdd",
        component: () => import("@/views/goods/components/itemAdd"),
        // meta: { title: "添加商品", icon: "example" }
        hidden: true
      },
      {
        path: "sortParams",
        name: "SortParams",
        component: () => import("@/views/goods/sortParams"),
        meta: { title: "分类参数", icon: "example" }
      },
      {
        path: "goodsSort",
        name: "GoodsSort",
        component: () => import("@/views/goods/goodsSort"),
        meta: { title: "商品分类", icon: "example" }
      }
    ]
  },

  // 订单管理
  {
    path: "/orders",
    component: Layout,
    name: "Orders",
    meta: { title: "订单管理", icon: "form" },
    alwaysShow: true,
    children: [
      {
        path: "ordersList",
        name: "OrdersList",
        component: () => import("@/views/orders/ordersList"),
        meta: { title: "订单列表", icon: "example" }
      }
    ]
  },

  // 数据报表
  {
    path: "/analysis",
    component: Layout,
    name: "Analysis",
    meta: { title: "数据统计", icon: "table" },
    alwaysShow: true,
    children: [
      {
        path: "dataAnalysis",
        name: "DataAnalysis",
        component: () => import("@/views/analysis/dataAnalysis"),
        meta: { title: "数据报表", icon: "example" }
      }
    ]
  },

  // 组织架构
  {
    path: "/organize",
    component: Layout,
    name: "Organize",
    meta: { title: "组织架构", icon: "tree" },
    alwaysShow: true,
    children: [
      {
        path: "organization",
        name: "Organization",
        component: () => import("@/views/organization/index"),
        meta: { title: "结构分析", icon: "example" }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
