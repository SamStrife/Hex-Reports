<template>
  <div class="q-pa-md flex column">
    <div>
      <q-form @submit.prevent="getJobChurn">
        <div>
          <div class="row flex justify-evenly">
            <div class="q-pa-md">
              <q-date subtitle="Start Date" v-model="reportStartDate" />
            </div>
            <div class="q-pa-md">
              <q-date subtitle="End Date" v-model="reportEndDate" />
            </div>
          </div>
          <div class="q-pa-sm">
            <GenericButton label="Go" type="submit"></GenericButton>
          </div>
        </div>
      </q-form>
    </div>
    <div class="q-pa-md">
      <q-table
        :columns="jobChurnTableColumns"
        :no-data-label="'Please run the report...'"
        :rows="tableRows"
      ></q-table>
    </div>
    <div class="q-pa-md" v-if="loaded">
      <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { date } from "quasar";
import { jobChurnTableColumns } from "../components/JobChurnReport/jobChurnTableColumns.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import GenericButton from "src/components/GenericButton.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const reportStartDate = ref();
const reportEndDate = ref();

const tableRows = ref([]);

const loaded = ref(false);

async function getJobChurn() {
  await axios({
    method: "post",
    url: `https://api.hexreports.com/jobchurn/`,
    data: {
      "Start Date": date.formatDate(reportStartDate.value, "D-M-YYYY"),
      "End Date": date.formatDate(reportEndDate.value, "D-M-YYYY"),
    },
    headers: { "Content-Type": "multipart/form-data" },
  }).then(function (response) {
    response.data.JobChurn.forEach((e) => {
      tableRows.value.push({
        date: Object.keys(e)[0],
        openJobs: Object.values(e)[0]["Open Jobs"],
        completedJobs: Object.values(e)[0]["Complete Jobs"],
        averageDaysOpen: Object.values(e)[0]["Average Days Open"],
      });
      graphLabels.value.push(Object.keys(e)[0]);
      openJobGraphData.value.push(Object.values(e)[0]["Open Jobs"]);
      compelteJobGraphData.value.push(Object.values(e)[0]["Complete Jobs"]);
      averageOpenDaysGraphData.value.push(
        Object.values(e)[0]["Average Days Open"]
      );
      targetOpenJobsGraphData.value.push(600);
    });
    loaded.value = true;
  });
}

const graphLabels = ref([]);
const openJobGraphData = ref([]);
const compelteJobGraphData = ref([]);
const averageOpenDaysGraphData = ref([]);
const targetOpenJobsGraphData = ref([]);

const chartData = {
  labels: graphLabels.value,
  datasets: [
    {
      label: "Open Jobs",
      data: openJobGraphData.value,
      borderColor: "rgba(10,134,88,0.5)",
      backgroundColor: "rgba(10,134,88,0.5)",
    },
    {
      label: "Compelted Jobs",
      data: compelteJobGraphData.value,
      borderColor: "rgba(144,44,158,0.5)",
      backgroundColor: "rgba(144,44,158,0.5)",
    },
    {
      label: "Average Days Open",
      data: averageOpenDaysGraphData.value,
      borderColor: "rgba(12,44,101,0.5)",
      backgroundColor: "rgba(12,44,101,0.5)",
    },
    {
      label: "Target",
      data: targetOpenJobsGraphData.value,
      borderColor: "rgba(0,0,0,0.5)",
      backgroundColor: "rgba(0,0,0,0.5)",
      pointStyle: false,
      borderDash: [10, 10],
    },
  ],
};

const chartOptions = {
  responsive: true,
};
</script>
