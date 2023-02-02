<template>
  <div class="q-pa-md flex column">
    <div>
      <q-form @submit.prevent="getJobChurn">
        <div class="row flex justify-evenly">
          <div class="q-pa-md flex">
            <q-date subtitle="Start Date" v-model="reportStartDate" />
          </div>
          <div class="q-pa-md flex">
            <q-date
              subtitle="End Date"
              v-model="reportEndDate"
              :options="endDateOptions"
            />
          </div>
        </div>
        <div class="q-pa-xs flex justify-center">
          <GenericButton label="Go" type="submit"></GenericButton>
        </div>
      </q-form>
    </div>
    <div class="q-pa-md">
      <q-table
        :columns="jobChurnTableColumns"
        :no-data-label="'Please run the report...'"
        :rows="tableRows"
        :loading="loading"
      >
      </q-table>
      <q-chip
        v-if="loaded"
        clickable
        @click="downloadTable"
        icon="file_download"
        color="green-10"
        text-color="white"
        >Download</q-chip
      >
    </div>
    <div class="q-pa-md">
      <q-skeleton height="400px" square v-if="loading" />
      <Line
        id="jobs-graph"
        :options="chartOptions"
        :data="chartData"
        v-if="loaded"
      />
      <VueApexCharts
        v-if="loaded"
        width="500"
        type="line"
        :series="apexSeries"
        :options="apexChartOptions"
      ></VueApexCharts>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

import axios from "axios";
import { date } from "quasar";

import { jobChurnTableColumns } from "../components/JobChurnReport/jobChurnTableColumns.js";
import GenericButton from "src/components/GenericButton.vue";

import VueApexCharts from "vue3-apexcharts";

import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

import * as XLSX from "xlsx";

const reportStartDate = ref();
const reportEndDate = ref();

function endDateOptions(caldate) {
  return caldate >= reportStartDate.value;
}

const tableRows = ref([]);
const graphLabels = ref([]);
const openJobGraphData = ref([]);
const compelteJobGraphData = ref([]);
const averageOpenDaysGraphData = ref([]);
const targetOpenJobsGraphData = ref([]);

const loading = ref(false);
const loaded = ref(false);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const openjobs2 = computed(() => {
  return [...openJobGraphData.value];
});
const completeJobs2 = computed(() => {
  return [...compelteJobGraphData.value];
});
const averageDaysOpen2 = computed(() => {
  return [...averageOpenDaysGraphData.value];
});
const target2 = computed(() => {
  return [...targetOpenJobsGraphData.value];
});

const chartData = {
  labels: graphLabels.value,
  datasets: [
    {
      type: "line",
      label: "Open Jobs",
      data: openjobs2,
      borderColor: "rgba(10,134,88,0.5)",
      backgroundColor: "rgba(10,134,88,0.5)",
    },
    {
      type: "bar",
      label: "Compelted Jobs",
      data: compelteJobGraphData.value,
      borderColor: "rgba(144,44,158,0.5)",
      backgroundColor: "rgba(144,44,158,0.5)",
    },
    {
      type: "bar",
      label: "Average Days Open",
      data: averageOpenDaysGraphData.value,
      borderColor: "rgba(12,44,101,0.5)",
      backgroundColor: "rgba(12,44,101,0.5)",
    },
    {
      type: "line",
      label: "Target",
      data: targetOpenJobsGraphData.value,
      borderColor: "rgba(0,0,0,0.5)",
      backgroundColor: "rgba(0,0,0,0.5)",
      pointStyle: false,
      borderDash: [10, 10],
    },
  ],
};

const apexSeries = [
  {
    name: "Open Jobs",
    data: openjobs2,
  },
  {
    name: "Complete Jobs",
    data: completeJobs2,
  },
  {
    name: "Average Days Open",
    data: averageDaysOpen2,
  },
  {
    name: "Target",
    data: target2,
  },
];

const apexChartOptions = {
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: graphLabels.value,
  },
};

const chartOptions = {
  responsive: true,
};

async function getJobChurn() {
  loading.value = true;
  loaded.value = false;
  openJobGraphData.value = [];
  await axios({
    method: "post",
    url: `https://api.hexreports.com/jobchurn/`,
    data: {
      "Start Date": date.formatDate(reportStartDate.value, "D-M-YYYY"),
      "End Date": date.formatDate(reportEndDate.value, "D-M-YYYY"),
    },
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    response.data.JobChurn.forEach((e) => {
      const initialDate = new Date(Object.keys(e)[0]);
      const formattedDate = date.formatDate(initialDate, "DD/MM/YYYY");
      const openJobs = Object.values(e)[0]["Open Jobs"];
      const completedJobs = Object.values(e)[0]["Complete Jobs"];
      const averageDaysOpen = Math.round(
        Object.values(e)[0]["Average Days Open"]
      );

      tableRows.value.push({
        Date: formattedDate,
        "Open Jobs": openJobs,
        "Compelted Jobs": completedJobs,
        "Avereage Days - Open Jobs": averageDaysOpen,
      });

      graphLabels.value.push(formattedDate);
      openJobGraphData.value.push(openJobs);
      compelteJobGraphData.value.push(completedJobs);
      averageOpenDaysGraphData.value.push(averageDaysOpen);
      targetOpenJobsGraphData.value.push(600);
    });
  });
  loading.value = false;
  loaded.value = true;
}

function downloadTable() {
  const workbook = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(tableRows.value);
  XLSX.utils.book_append_sheet(workbook, ws, "Sheet 1");
  XLSX.writeFileXLSX(workbook, "JobChurn.xlsx");
}
</script>
