<template>
  <div class="qm-t-md flex column items-center">
    <div class="q-pt-md">
      <q-btn
        color="primary"
        text-color="white"
        label="Download My Asset File"
        @click="go(userStore.userName)"
      />
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" :label="selectedSalesPerson">
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
            <q-item clickable v-close-popup @click="selectSalesPerson(person)">
              <q-item-section>
                <q-item-label>{{ person }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-btn-dropdown>
      <q-btn @click="go(selectedSalesPerson)">Go</q-btn>
    </div>
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

async function go(salesperson) {
  console.log(`Running for ${salesperson}`);
  await axios({
    url: `https://api.hexreports.com/getassetfile/${salesperson}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const file = new File([response.data], `af - ${salesperson}.xlsx`, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file);
  });
}

getSalesPeople();
</script>
