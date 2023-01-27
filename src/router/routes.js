import { menuList } from "src/layouts/menuList";

const routes = [];

routes.push({
  path: "/",
  component: () => import("layouts/MainLayout.vue"),
  children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
});

menuList.forEach((item) =>
  routes.push({
    path: item.routerLink,
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import(`pages/${item.vueFile}`),
      },
    ],
  })
);

routes.push({
  path: "/:catchAll(.*)*",
  component: () => import("pages/ErrorNotFound.vue"),
});

export default routes;
