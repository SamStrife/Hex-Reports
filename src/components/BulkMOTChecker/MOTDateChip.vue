<template>
  <div>
    <q-skeleton v-if="loading" type="QChip"></q-skeleton>
    <q-chip v-else :color="chipColour" class="">{{ chipDisplayDate }}</q-chip>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { date } from "quasar";

const props = defineProps(["date", "loading"]);
const chipDate = computed(() => props.date);
const loading = computed(() => props.loading);

const chipColour = computed(() => {
  if (date.getDateDiff(chipDate.value, new Date(), "days") < 0) return "red";
  return "green";
});

const chipDisplayDate = computed(() =>
  date.formatDate(chipDate.value, "DD/MM/YYYY")
);
</script>
