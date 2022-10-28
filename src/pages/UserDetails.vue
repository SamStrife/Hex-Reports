<template>
  <p>{{ user }}</p>
  <p>{{ favourites }}</p>
</template>

<script setup>
import { ref } from "vue";
import { storeUser } from "../stores/storeUser";

const userStore = storeUser();

const user = ref(userStore.account);
const favourites = ref(userStore.favourites);
</script>
