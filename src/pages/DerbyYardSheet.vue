<template>
  <q-page class="flex column q-pa-xl">
    <div>
      <yard-sheet-card
        v-for="vehicle in raw"
        :key="vehicle.ID"
        :registration="vehicle.Registration"
        :type="vehicle.Vehicle_Type"
        :make="vehicle.Vehicle_Make"
        :model="vehicle.Vehicle_Model"
        :status="vehicle.Vehicle_Status"
        :subStatus="vehicle.Vehicle_Sub_Status"
        :customer="vehicle.Customer"
      ></yard-sheet-card>
      <br />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import YardSheetCard from "src/components/YardSheetCard.vue";
import axios from "axios";

defineComponent({
  name: "DerbyYardSheet",
  components: { YardSheetCard },
});

const raw = ref("");

axios
  .get("http://127.0.0.1:5000/GetDerbyYardSheet")
  .then((response) => (raw.value = response.data));
</script>
