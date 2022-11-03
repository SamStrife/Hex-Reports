<template>
  <q-page class="flex column">
    <div class="q-pa-sm">
      <q-btn-dropdown class="q-pa-sm" color="primary" :label="selectedGroup">
        <q-list
          v-for="(item, index) in supplierOrganisations"
          :key="index"
          @click="selectSupplierGroup(item)"
          >{{ item }}</q-list
        >
      </q-btn-dropdown>
      <q-btn-dropdown class="q-pa-sm" color="primary" :label="selectedDepot">
        <q-list
          v-for="(item, index) in supplierDepots"
          :key="index"
          @click="selectSupplierDepot(item)"
          >{{ item }}</q-list
        >
      </q-btn-dropdown>
      <q-btn @click="get_supplier_jobs()">Go</q-btn>
      <q-btn @click="clearFilters()">Clear</q-btn>
      <q-btn @click="calculateMonthCost">Reduce</q-btn>
    </div>
    <div class="flex q-pa-sm">
      <q-table
        class="job-table"
        title="Jobs By Depot"
        dense
        :rows="depotJobsRows"
        :columns="depotJobsColumns"
        row-key="jobNumber"
        :loading="loading"
        :no-data-label="tableNoData.message"
      />
      <h1>{{ test }}</h1>
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
import { DateTime } from "luxon";
import { ref } from "vue";
import axios from "axios";
import { jobTableColumns } from "../components/SupplierReport/jobTableColumns";
import { depotJobsColumns } from "../components/SupplierReport/depotJobsColumns.js";

const loading = ref(false);

const test = ref(Math.round(0 * 100) / 100);
const testTable = ref([]);

function calculateMonthCost() {
  test.value = jobTableRows.value.reduce((accumulator, currentValue) => {
    testTable.value.push([currentValue["cost"], typeof currentValue["cost"]]);
    return accumulator + currentValue["cost"];
  });
  console.table(testTable.value);
}
const supplierOrganisations = ref(new Set());
const supplierDepots = ref(new Set());
const selectedGroup = ref("Select A Supplier Group");
const selectedDepot = ref("Select A Supplier Depot");

const depotJobsRows = ref([]);

const jobTableRows = ref([]);
const tableNoData = ref({ message: "No data, boss." });

function selectSupplierGroup(group) {
  selectedGroup.value = group;
}

function selectSupplierDepot(depot) {
  selectedDepot.value = depot;
}

function clearFilters() {
  selectedGroup.value = "Select A Supplier Group";
  selectedDepot.value = "Select A Supplier Depot";
}

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

function get_supplier_jobs() {
  loading.value = true;
  const formData = new FormData();
  formData.append("Group Name", selectedGroup.value);
  formData.append("Supplier Name", selectedDepot.value);

  return axios({
    method: "post",
    url: `https://api.hexreports.com/suppliers/getsupplierjobs`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then(function (response) {
    response.data.forEach((job) =>
      jobTableRows.value.push({
        jobNumber: job["Number"],
        required: DateTime.fromMillis(job["Required"]).toLocaleString(
          DateTime.DATE_SHORT
        ),
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
        cost: Math.round(job["Cost"] * 100) / 100,
        recharge: job["Recharge"],
        daysVOR: job["Days Vehicle Off Road"],
      })
    );
    loading.value = false;
  });
}

activeSupplierFetcher();
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
