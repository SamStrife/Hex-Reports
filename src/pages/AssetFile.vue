<template>
  <q-btn
    v-if="canViewMasterSheet"
    color="primary"
    text-color="white"
    label="Download Master"
  />
  <!-- <q-btn
    v-if="determineButtonToShow(salesPersonViewers)"
    color="primary"
    text-color="white"
    label="Download Master"
  />
  <q-btn
    v-if="determineButtonToShow(allSheetViewers)"
    color="primary"
    text-color="white"
    label="Download Master"
  /> -->
</template>

<script setup>
import { computed } from "vue";
import { storeUser } from "src/stores/storeUser.js";

const userStore = storeUser();

const masterSheetViewers = ["Sam Fletcher"];
const salesPersonViewers = ["Jo Litherland"];
const allSheetViewers = [""];

const canViewMasterSheet = computed(() => {
  return masterSheetViewers.some((element) => element == userStore.userName);
});
</script>
