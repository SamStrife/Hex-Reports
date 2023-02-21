<template>
  <div>
    <q-chip :color="chipColour" class="">{{ motStatus }}</q-chip>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { date } from "quasar";

const props = defineProps(["mot"]);
const motStatus = computed(() => props.mot);

const chipColour = computed(() => {
  if (props.mot == "Fail") return "red";
  if (props.mot == "Pass after rectification") return "yellow";
  if (props.mot == "Pass") return "green";
  return "grey";
});
</script>
