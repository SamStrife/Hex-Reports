<template>
  <div class="flex">
    <div class="q-pa-md" style="max-width: 300px">
      <q-input v-model="registrations" filled type="textarea" />
    </div>
    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Registration</th>
            <th class="text-right">MOT Expiry</th>
          </tr>
        </thead>
        <tbody v-for="(registration, index) in registrationArray" :key="index">
          <tr>
            <td class="text-left">{{ registration.toUpperCase() }}</td>
            <td class="text-right"></td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const registrations = ref("");

const registrationArray = computed(() => {
  const array = registrations.value.split(/\r?\n/);
  return new Set(array);
});
</script>
