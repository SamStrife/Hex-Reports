<template>
  <div class="row q-pa-md justify-around">
    <div class="q-pa-md">
      <q-input
        class="q-pa-md"
        v-model="vehicleInput"
        filled
        autogrow
        type="textarea"
      />
      <GenericButton @click="clicked" label="Check taxes" />
    </div>
    <div class="q-pa-md">{{ vehicleInputArray }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GenericButton from "src/components/GenericButton.vue";

const vehicleInput = ref("");
const vehicleInputArray = vehicleInput.value.split(/\r?\n/);

function clicked() {
  console.log("Clicked");
}
</script>
