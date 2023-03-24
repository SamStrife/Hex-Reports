<template>
  <router-view />
</template>

<script setup>
import { useRentalAuditStore } from "./stores/RentalAuditStore";

const rentalAuditStore = useRentalAuditStore();

function getRentalAuditData() {
  console.log("Getting Rental Audit Data From App Layer");
  rentalAuditStore.getData();
}

getRentalAuditData();
</script>
