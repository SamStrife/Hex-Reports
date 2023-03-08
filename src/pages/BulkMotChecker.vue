<template>
  <div class="row">
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
        class="q-pa-xs"
      >
        <BulkMotCheckerCard :registration="registration"></BulkMotCheckerCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BulkMotCheckerCard from "../components/BulkMOTChecker/BulkMotCheckerCard.vue";

const registrations = ref("");
const registrationArray = ref([]);
const lookupArray = computed(() => new Set(registrationArray?.value));

function addToMOTArray() {
  const array = registrations.value.split(/\r?\n/);

  for (const registration of array) {
    registrationArray.value.push(registration.toUpperCase());
  }
}

function clearMOTArray() {
  registrationArray.value = [];
}
</script>

<style scoped></style>
