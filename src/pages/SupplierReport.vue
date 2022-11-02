<template>
  <q-page class="flex column">
    <div class="q-pa-sm">
      <q-btn-dropdown class="q-pa-sm" color="primary" :label="selectedGroup">
        <q-list
          v-model="selectedGroup"
          v-for="(item, index) in supplierOrganisations"
          :key="index"
          >{{ item }}</q-list
        >
      </q-btn-dropdown>
      <q-btn-dropdown class="q-pa-sm" color="primary" :label="selectedDepot">
        <q-list
          v-model="selectedDepot"
          v-for="(item, index) in supplierDepots"
          :key="index"
          >{{ item }}</q-list
        >
      </q-btn-dropdown>
      <q-btn @click="get_supplier_jobs('Midlands Truck & Van, Coventry')"
        >Go</q-btn
      >
    </div>
    <div class="flex q-pa-sm">
      <div class="flex q-pa-sm">
        <q-table
          class="job-table"
          title="All Jobs"
          dense
          :rows="jobTableRows"
          :columns="jobTableColumns"
          row-key="jobNumber"
          :loading="loading"
          :no-data-label="tableNoData.message"
        />
      </div>
      <div class="flex column">
        <q-card class="q-pa-sm">
          <q-card-section> Open Jobs </q-card-section>
        </q-card>
        <q-card class="q-pa-sm">
          <q-card-section> Awaiting Paperwork </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

function activeSupplierFetcher() {
  return axios
    .get("https://api.hexreports.com/suppliers/getsuppliers")
    .then(function (response) {
      response.data.forEach((supplier) => {
        supplierOrganisations.value.add(supplier["Organisation Group Name"]);
        supplierDepots.value.add(supplier["Trading Name"]);
      });
    });
}

function get_supplier_jobs(supplier) {
  loading.value = true;
  const formData = new FormData();
  formData.append("Group Name", "Midlands Truck & Van");
  formData.append("Supplier Name", "");

  return axios({
    method: "post",
    url: `https://api.hexreports.com/suppliers/getsupplierjobs`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then(function (response) {
    jobTableRows.value = [];
    response.data.forEach((job) =>
      jobTableRows.value.push({
        jobNumber: job["Number"],
        required: new Date(job["Required"]),
        registration: job["Registration"],
        vehicleType: job["Vehicle Type"],
        status: job["Status"],
        jobType: job["Job Type"],
        distance: job["Distance"],
        supplier: job["Supplier"],
        customer: job["Customer"],
        itemDescription: job["Item Description"],
        labour: job["Labour"],
        parts: job["Parts"],
        cost: job["Cost"],
        recharge: job["Recharge"],
        daysVOR: job["Days Vehicle Off Road"],
      })
    );
    loading.value = false;
  });
}

activeSupplierFetcher();
const supplierOrganisations = ref(new Set());
const supplierDepots = ref(new Set());

const selectedGroup = ref("Select A Supplier Group");
const selectedDepot = ref("Select A Supplier Depot");

const jobTableColumns = [
  {
    name: "jobNumber",
    label: "Job #",
    field: "jobNumber",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "required",
    label: "Job Date",
    field: "required",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "registration",
    label: "Registration",
    field: "registration",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "vehicleType",
    label: "Vehicle Type",
    field: "vehicleType",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "status",
    label: "Job Status",
    field: "status",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "jobType",
    label: "Job Type",
    field: "jobType",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "distance",
    label: "Mileage",
    field: "distance",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "supplier",
    label: "Supplier",
    field: "supplier",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "customer",
    label: "Customer",
    field: "customer",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "itemDescription",
    label: "Work Description",
    field: "itemDescription",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "labour",
    label: "Labour Cost",
    field: "labour",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "parts",
    label: "Parts Cost",
    field: "parts",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "cost",
    label: "Total Cost",
    field: "cost",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "recharge",
    label: "Recharge Amount",
    field: "recharge",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
  {
    name: "daysVOR",
    label: "Days VOR",
    field: "daysVOR",
    required: true,
    align: "left",
    sortable: true,
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    sortOrder: "ad",
    headerStyle: "width: 50px",
    headerClasses: "table-header",
  },
];

const loading = ref(false);

const jobTableRows = ref([]);
const tableNoData = ref({ message: "No data, boss." });
</script>

<style>
.table-header {
  background-color: green;
  color: green;
  position: sticky;
  z-index: 1;
}

.job-table {
  max-width: 80vw;
}
</style>
