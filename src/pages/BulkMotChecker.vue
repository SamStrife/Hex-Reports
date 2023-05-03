<template>
  <div>
    <q-tabs v-model="tab" class="text-primary" align="justify">
      <q-tab name="By Registrations" label="By Registrations" />
      <q-tab name="By Month" label="By Month" />
    </q-tabs>
  </div>
  <q-tab-panels v-model="tab" class="row">
    <q-tab-panel name="By Registrations" v-if="tab == 'By Registrations'">
      <div class="column basis-1/4">
        <div class="q-pa-md" style="max-width: 300px">
          <div>
            <q-input v-model="registrations" filled type="textarea" autogrow />
          </div>
          <div class="q-py-sm">
            <q-btn @click="addToMOTArray">Check</q-btn>
            <q-btn @click="clearMOTArray">Clear</q-btn>
          </div>
        </div>
      </div>
      <div class="column">
        <div
          v-for="(registration, index) in lookupArray"
          :key="index"
          class="q-pa-xs motCard"
        >
          <BulkMotCheckerCard :registration="registration"></BulkMotCheckerCard>
        </div>
      </div>
    </q-tab-panel>
    <q-tab-panel name="By Month" class="q-pa-md" v-else>
      <div>
        <p>
          Select your month and year with the options below and use the "Go"
          button to run the report. Due to limitations of the Goverment API,
          reports can take a couple of minutes to run so please be patient.
        </p>
      </div>
      <div class="q-pa-md column">
        <q-form class="row justify-start" @submit.prevent="getData">
          <div class="q-pa-md monthSelector">
            <q-select
              v-model="monthSelectionModel"
              :options="monthSelctionOptions"
              hint="Month"
              :rules="[(val) => !!val || 'Field is required']"
              lazy-rules
            />
          </div>
          <div class="q-pa-md">
            <q-input
              v-model="yearSelection"
              hint="Year"
              type="num"
              :rules="[
                (val) => !!val || 'Field is required',
                (val) => yearRegex.test(val) || 'Year format is incorrect',
              ]"
              lazy-rules
            />
          </div>
          <div class="self-center">
            <q-btn class="bg-primary text-white" type="submit">Go!</q-btn>
          </div>
        </q-form>
        <div class="q-pa-md" v-if="monthlyMOTLoading">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left" style="width: 150px">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 5" :key="n">
                <td class="text-left">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="50px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="35px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="65px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="25px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <div class="q-pa-md" v-if="monthlyReportRanOnce && !monthlyMOTLoading">
          <q-chip
            clickable
            @click="downloadTable"
            icon="file_download"
            color="green-10"
            text-color="white"
            >Download</q-chip
          >
          <q-markup-table id="motTable">
            <thead>
              <tr>
                <th class="text-left">Job Number</th>
                <th class="text-left">Registration</th>
                <th class="text-left">Required</th>
                <th class="text-left">Status</th>
                <th class="text-left">Customer</th>
                <th class="text-left">Supplier</th>
                <th class="text-left">Vehicle Type</th>
                <th class="text-left">All Job Types</th>
                <th class="text-left">Number Of MOTS</th>
                <th class="text-left">Number Of PRS</th>
                <th class="text-left">Number Of Fails</th>
                <th class="text-left">First Time Pass</th>
                <th class="text-left">Reason For PRS</th>
                <th class="text-left">Reason For Fail</th>
              </tr>
            </thead>
            <tbody v-for="(mot, index) in motArray" :key="index">
              <tr>
                <td>{{ mot.Number }}</td>
                <td>{{ mot.Registration }}</td>
                <td>{{ mot.Required }}</td>
                <td>
                  {{ mot.Status }}
                </td>
                <td>
                  {{ mot.Customer }}
                </td>
                <td>
                  {{ mot.Supplier }}
                </td>
                <td>
                  {{ mot["Vehicle Type"] }}
                </td>
                <td>
                  {{ mot["All Job Types"] }}
                </td>
                <td>
                  {{ mot["Number Of MOTS"] }}
                </td>
                <td>
                  {{ mot["Number Of PRS"] }}
                </td>
                <td>
                  {{ mot["Number Of Fails"] }}
                </td>
                <td>
                  <p v-if="mot['Number Of MOTS'] == 0"></p>
                  <q-chip
                    color="green"
                    text-color="white"
                    v-else-if="mot['First Time Pass'] == true"
                    >Yes</q-chip
                  >
                  <q-chip color="red" text-color="white" v-else>No</q-chip>
                </td>
                <td>{{ mot["Reason For PRS"] }}</td>
                <td>{{ mot["Reason For Fail"] }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import BulkMotCheckerCard from "../components/BulkMOTChecker/BulkMotCheckerCard.vue";
import * as XLSX from "xlsx";

const tab = ref("By Month");

const monthSelectionModel = ref("");
const yearSelection = ref();

const dateForApi = computed(() => {
  const day = 1;
  const month = monthSelctionOptions.indexOf(monthSelectionModel.value) + 1;
  const year = yearSelection.value;

  return `${day}-${month}-${year}`;
});

const monthSelctionOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const motArray = ref([]);

const registrations = ref("");
const registrationArray = ref([]);
const lookupArray = computed(() => new Set(registrationArray?.value));
const yearRegex = new RegExp("^\\d{4}$");

function addToMOTArray() {
  const array = registrations.value.split(/\r?\n/);

  for (const registration of array) {
    registrationArray.value.push(registration.toUpperCase());
  }
}

function clearMOTArray() {
  registrationArray.value = [];
}

function clearMonthData() {
  motArray.value = [];
}

const monthlyMOTLoading = ref(false);
const monthlyReportRanOnce = ref(false);

async function getData() {
  clearMonthData();
  monthlyMOTLoading.value = true;
  monthlyReportRanOnce.value = true;

  const postData = new FormData();
  postData.append("Date", dateForApi.value);

  await axios
    .post(`https://api.hexreports.com/bulkMOTCheck/byMonth`, postData)
    .then((response) => {
      if (response.status == 200) {
        for (const mot of response.data["MOTs"]) {
          motArray.value.push(mot);
        }
        monthlyMOTLoading.value = false;
      } else {
        alert("There was a problem processing this request");
        monthlyMOTLoading.value = false;
      }
    });
}
function downloadTable() {
  const workbook = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(motArray.value, {
    header: [
      "Number",
      "Registration",
      "Required",
      "Status",
      "Customer",
      "Supplier",
      "Vehicle Type",
      "All Job Types",
      "Number Of MOTS",
      "Number Of PRS",
      "Number Of Fails",
      "First Time Pass",
      "Reason For PRS",
      "Reason For Fail",
    ],
  });
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      [
        "Number",
        "Registration",
        "Required",
        "Status",
        "Customer",
        "Supplier",
        "Vehicle Type",
        "All Job Types",
        "Number Of MOTS",
        "Number Of PRS",
        "Number Of Fails",
        "First Time Pass",
        "Reason For PRS",
        "Reason For Fail",
      ],
    ],
    { origin: "A1" }
  );
  XLSX.utils.book_append_sheet(workbook, ws, "Sheet 1");
  XLSX.writeFileXLSX(workbook, "Report.xlsx");
}
</script>

<style scoped>
.motCard {
  width: 90vw;
}

.monthSelector {
  width: 350px;
}
</style>
