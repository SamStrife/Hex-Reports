const menuList = [
  {
    label: "Excess Mileage Calculator",
    icon: "speed",
    routerLink: "/excesscalculator",
    title: "Excess Mileage Calculator",
    requiresLogin: false,
  },
  {
    label: "Delivery Cost Calculator",
    icon: "local_shipping",
    routerLink: "/deliverycalculator",
    title: "Delivery Cost Calculator",
    requiresLogin: false,
  },
  {
    label: "Vehicle Summary",
    icon: "no_crash",
    routerLink: "/vehiclesummary",
    title: "Vehicle Summary Report",
    requiresLogin: true,
  },
  {
    label: "Tax Checker",
    icon: "workspace_premium",
    routerLink: "/taxchecker",
    title: "Vehicle Tax Checker",
    requiresLogin: false,
  },
  // {
  //   label: "Derby Yard Sheet",
  //   icon: "fact_check",
  //   routerLink: "/derbyyardsheet",
  //   title: "Derby Yard Sheet",
  //   requiresLogin: true,
  // },
  // {
  //   label: "Asset File",
  //   icon: "list",
  //   routerLink: "/assetfile",
  //   title: "Asset File",
  //   requiresLogin: true,
  // },
];

export { menuList };
