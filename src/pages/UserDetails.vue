<template>
  <p>{{ user }}</p>
</template>

<script setup>
import { ref } from "vue";
import { storeUser } from "../stores/storeUser";

const userStore = storeUser();

const user = ref(userStore.account);
</script>
