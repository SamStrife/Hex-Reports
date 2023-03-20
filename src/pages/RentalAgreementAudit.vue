<template>
  <q-page class="flex-center">
    <div class="column">
      <div class="section">
        <h1>{{ totalHires }}</h1>
      </div>
      <div class="section">
        <h1>Rental Table</h1>
      </div>
      <div class="row section">
        <div class="subsection"><h1>Agreements</h1></div>
        <div class="subsection"><h1>Check Sheets</h1></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, onUpdated } from "vue";
import { useRentalAuditStore } from "src/stores/RentalAuditStore";

const audits = useRentalAuditStore();

const totalHires = ref();

onBeforeMount(() => {
  audits.getData();
});

totalHires.value = audits.totalRentals;
</script>

<style>
.section {
  border: solid;
  border-color: black;
  width: 80vw;
  display: flex;
  justify-content: space-between;
}

.subsection {
  border: solid;
  border-color: black;
}
</style>
