<template>
  <q-btn
    v-if="masterSheetViewers.includes(userStore.userName)"
    color="primary"
    text-color="white"
    label="Download Master File"
  />
  <q-btn
    v-if="salesPersonViewers.includes(userStore.userName)"
    color="primary"
    text-color="white"
    label="Download My Asset File"
  />
  <q-btn
    v-if="allSheetViewers.includes(userStore.userName)"
    color="primary"
    text-color="white"
    label="Download Asset File (All Salespeople)"
  />
</template>

<script setup>
import { storeUser } from "src/stores/storeUser.js";
const userStore = storeUser();

const masterSheetViewers = ["Sam Fletcher"];
const salesPersonViewers = ["Jo Litherland", "Sam Fletcher"];
const allSheetViewers = ["Sam Fletcher"];
</script>
