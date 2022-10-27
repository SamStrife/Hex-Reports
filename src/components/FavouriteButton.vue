<template>
  <q-btn
    v-if="userStore.loggedIn"
    @click="toggleFavourite"
    :outline="isFavourite"
    round
    color="green-8"
    icon="star"
  >
  </q-btn>
</template>

<script setup>
import { ref } from "vue";
import { storeUser } from "../stores/storeUser";

const userStore = storeUser();

const isFavourite = ref(false);

function toggleFavourite() {
  isFavourite.value = !isFavourite.value;
}
</script>
