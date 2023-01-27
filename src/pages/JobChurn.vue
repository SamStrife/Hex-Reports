<template>
  <div class="q-pa-md">
    <div>
      <p>
        This is the job churn report. More description will be added here when I
        can be bothered.
      </p>
    </div>
    <div class="q-pa-md">
      <q-form>
        <h6>Start Date</h6>
        <q-date v-model="selectedStartDate" />
        <h6>End Date</h6>
        <q-date v-model="selectedEndDate" />
      </q-form>
    </div>
    <div class="q-pa-md">
      <q-table></q-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedStartDate = ref(new Date());
const selectedEndDate = ref();
</script>
