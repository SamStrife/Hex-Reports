import { DateTime } from "luxon";

export const depotJobsColumns = [];

for (let i = 0; i < 13; i++) {
  depotJobsColumns.unshift({
    name: `month${i}`,
    label: DateTime.now().minus({ months: i }).toLocal().toFormat("LLLL yy"),
    field: "jobNumber",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  });
}
