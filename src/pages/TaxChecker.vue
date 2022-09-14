<template>
  <div class="row q-pa-md justify-around">
    <div class="q-pa-md">
      <q-input
        class="q-pa-md"
        v-model="vehicleInput"
        autogrow
        outlined
        hide-bottom-space
        :input-style="{ 'font-size': '18px' }"
        type="textarea"
      />
      <GenericButton @click="clicked" label="Check taxes" />
    </div>
    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <tr>
            <th>Registration</th>
            <th>Tax Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reg, index) in vehicleInputArray" :key="index">
            <td>{{ reg }}</td>
            <td>Tax Expiry</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import GenericButton from "src/components/GenericButton.vue";

const vehicleInput = ref("");
const vehiclesToCheck = ref({});
const vehicleInputArray = computed(() => {
  return vehicleInput.value.split(/\r?\n|\r|\n/g);
});

function clicked() {
  console.log(vehicleInputArray.value);
}
</script>
