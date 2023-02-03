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
    <div class="q-pa-md" v-if="loading">
      <q-skeleton height="500px" square />
    </div>
    <div class="q-pa-md" v-if="loaded">
      <VueApexCharts
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

import GenericButton from "src/components/GenericButton.vue";

import VueApexCharts from "vue3-apexcharts";

const reportStartDate = ref();
const reportEndDate = ref();
const loading = ref(false);
const loaded = ref(false);

const apexSeries = reactive([
  {
    name: "Open Jobs",
    type: "line",
    data: [],
  },
  {
    name: "Complete Jobs",
    type: "column",
    data: [],
  },
  {
    name: "Average Open Job Days",
    type: "column",
    data: [],
  },
  {
    name: "Target Open Jobs",
    type: "line",
    data: [],
  },
  {
    name: "Max Open Jobs",
    type: "line",
    data: [],
  },
  {
    name: "Min Open Jobs",
    type: "line",
    data: [],
  },
]);

const apexChartOptions = reactive({
  chart: {
    id: "Open-Jobs",
  },
  animations: {
    enabled: true,
    easing: "easeinout",
    speed: 800,
    animateGradually: {
      enabled: true,
      delay: 150,
    },
    dynamicAnimation: {
      enabled: true,
      speed: 350,
    },
  },
  colors: ["#286e0a", "#b981eb", "#81e4eb", "#86898a", "#f07d7d", "#68f059"],
  stroke: {
    width: [5, 1, 1, 5, 2, 2],
    curve: "straight",
    dashArray: [0, 0, 0, 5, 5, 5],
  },
  xaxis: {
    type: "datetime",
    categories: [],
  },
});

async function getJobChurn() {
  loading.value = true;
  loaded.value = false;

  apexSeries.value = [];
  apexChartOptions.xaxis.categories = [];

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
      const date = Date.parse(Object.keys(e)[0]);
      const openJobs = Object.values(e)[0]["Open Jobs"];
      const completedJobs = Object.values(e)[0]["Complete Jobs"];
      const averageDaysOpen = Math.round(
        Object.values(e)[0]["Average Days Open"]
      );

      apexChartOptions.xaxis.categories.push(date);
      apexSeries[0].data.push(openJobs);
      apexSeries[1].data.push(completedJobs);
      apexSeries[2].data.push(averageDaysOpen);
      apexSeries[3].data.push(600);
    });

    apexSeries[4].data = new Array(apexSeries[0].data.length).fill(
      Math.max.apply(null, apexSeries[0].data)
    );
    apexSeries[5].data = new Array(apexSeries[0].data.length).fill(
      Math.min.apply(null, apexSeries[0].data)
    );
  });
  loading.value = false;
  loaded.value = true;
}

function endDateOptions(caldate) {
  return caldate >= reportStartDate.value;
}
</script>
