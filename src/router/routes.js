const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/excesscalculator",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ExcessMileageCalculator.vue"),
      },
    ],
  },
  {
    path: "/thenextthing",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ComingSoon.vue"),
      },
    ],
  },
  {
    path: "/deliverycalculator",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/DeliveryCalculator.vue"),
      },
    ],
  },
  {
    path: "/vehiclesummary",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/VehicleSummary.vue"),
      },
    ],
  },
  {
    path: "/derbyyardsheet",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/DerbyYardSheet.vue"),
      },
    ],
  },
  {
    path: "/assetfile",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/AssetFile.vue"),
      },
    ],
  },
  {
    path: "/taxchecker",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/TaxChecker.vue"),
      },
    ],
  },
  {
    path: "/DailySpendKPIDemo",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/DailySpendKPIDemo.vue"),
      },
    ],
  },
  {
    path: "/showingstuff",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ShowingStuff.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
