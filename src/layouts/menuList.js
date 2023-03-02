const menuList = [
  {
    label: "Excess Mileage Calculator",
    icon: "speed",
    routerLink: "/excesscalculator",
    title: "Excess Mileage Calculator",
    requiresLogin: false,
    vueFile: "ExcessMileageCalculator.vue",
  },
  {
    label: "Delivery Cost Calculator",
    icon: "local_shipping",
    routerLink: "/deliverycalculator",
    title: "Delivery Cost Calculator",
    requiresLogin: false,
    vueFile: "DeliveryCalculator.vue",
  },
  {
    label: "Vehicle Summary",
    icon: "no_crash",
    routerLink: "/vehiclesummary",
    title: "Vehicle Summary Report",
    requiresLogin: true,
    vueFile: "VehicleSummary.vue",
  },
  {
    label: "Open Job Report",
    icon: "fact_check",
    routerLink: "/openjobs",
    title: "Open Job Report",
    requiresLogin: true,
    vueFile: "OpenJobReport.vue",
  },
  {
    label: "Bulk MOT Checker",
    icon: "checklist",
    routerLink: "/bulkmots",
    title: "Bulk MOT Checker",
    requiresLogin: true,
    vueFile: "BulkMotChecker.vue",
  },
  {
    label: "Event List Report",
    icon: "table_chart",
    routerLink: "/eventlist",
    title: "Event List Report",
    requiresLogin: true,
    vueFile: "EventListReport.vue",
  },
  {
    label: "Heat Map",
    icon: "pin_drop",
    routerLink: "/heatmap",
    title: "Heat Map",
    requiresLogin: false,
    vueFile: "HeatMap.vue",
  },
  // {
  //   label: "Tax Checker",
  //   icon: "workspace_premium",
  //   routerLink: "/taxchecker",
  //   title: "Vehicle Tax Checker",
  //   requiresLogin: false,
  //   vueFile: "TaxChecker.vue",
  // },
  // {
  //   label: "Daily Spend KPI Demo",
  //   icon: "payments",
  //   routerLink: "/DailySpendKPIDemo",
  //   title: "Daily Spend KPI Demo",
  //   requiresLogin: true,
  //   vueFile: "DailySpendKPIDemo.vue",
  // },
  // {
  //   label: "Supplier Report",
  //   icon: "quiz",
  //   routerLink: "/supplierreport",
  //   title: "Supplier Report",
  //   requiresLogin: false,
  //   vueFile: "SupplierReport.vue",
  // },
  // {
  //   label: "Derby Yard Sheet",
  //   icon: "fact_check",
  //   routerLink: "/derbyyardsheet",
  //   title: "Derby Yard Sheet",
  //   requiresLogin: true,
  // },
  {
    label: "Asset File",
    icon: "list",
    routerLink: "/assetfile",
    title: "Asset File",
    requiresLogin: true,
    vueFile: "AssetFile.vue",
  },
];

export { menuList };
