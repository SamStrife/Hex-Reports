<template>
  <div class="qm-t-md flex column items-center">
    <div class="q-pt-md">
      <q-btn
        color="primary"
        text-color="white"
        label="Download My Asset File"
        :disable="queryRunning"
        @click="runQuery(userStore.userName)"
      />
    </div>
    <div
      class="q-pa-md"
      v-show="
        userStore.userName == 'Sam Fletcher' ||
        userStore.userName == 'Mark Fletcher' ||
        userStore.userName == 'David Hodgkinson' ||
        userStore.userName == 'Michael Webb'
      "
    >
      <q-btn-dropdown
        color="primary"
        :label="selectedSalesPerson"
        :disable="queryRunning"
      >
        <div v-if="salesPeopleLoading">
          <q-list>
            <q-skeleton type="text" width="100%" />
            <q-skeleton type="text" width="100%" />
            <q-skeleton type="text" width="100%" />
            <q-skeleton type="text" width="100%" />
            <q-skeleton type="text" width="100%" />
          </q-list>
        </div>
        <div v-else>
          <q-list v-for="(person, index) in salesPeople" :key="index">
            <q-item
              :disable="queryRunning"
              clickable
              v-close-popup
              @click="selectSalesPerson(person)"
            >
              <q-item-section>
                <q-item-label>{{ person }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-btn-dropdown>
      <q-btn :disable="queryRunning" @click="runQuery(selectedSalesPerson)"
        >Go</q-btn
      >
      <q-btn :disable="queryRunning" @click="runQuery('all')"
        >Download For All</q-btn
      >
    </div>
    <q-spinner
      v-if="queryRunning"
      class="q-mt-md"
      color="primary"
      size="3em"
      :thickness="10"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { storeUser } from "src/stores/storeUser.js";
import { saveAs } from "file-saver";

const userStore = storeUser();
const currentUser = ref(userStore.userName);

const salesPeople = ref([]);
const salesPeopleLoading = ref(true);
const selectedSalesPerson = ref("Select A Sales Person");

const queryRunning = ref(false);

async function getSalesPeople() {
  return await axios
    .get("https://api.hexreports.com/getassetfile/salespeople")
    .then((response) => {
      response.data.forEach((person) => {
        salesPeople.value.push(person);
        salesPeopleLoading.value = false;
      });
    });
}

function selectSalesPerson(salesperson) {
  selectedSalesPerson.value = salesperson;
}

async function runQuery(salesperson) {
  if (salesperson == "Select A Sales Person")
    return alert("Please select a Sales Person.");
  queryRunning.value = true;
  console.log(`Running for ${salesperson}`);
  await axios({
    url: `https://api.hexreports.com/getassetfile/${salesperson}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    console.log(response);
    const file = new File([response.data], `af - ${salesperson}.xlsx`, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file);
    queryRunning.value = false;
  });
}

getSalesPeople();
</script>
