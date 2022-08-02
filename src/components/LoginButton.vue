<template>
  <q-avatar
    class="userAvatar"
    v-if="userStore.loggedIn"
    @click="userStore.logout"
    color="green-8"
    text-color="white"
    >{{ userStore.userInitials }}</q-avatar
  >
  <q-btn
    v-else
    @click="userStore.login"
    color="green-8"
    icon-right="login"
    label="Log In"
  />
</template>

<script setup>
import { storeUser } from "../stores/storeUser";

const userStore = storeUser();
</script>

<style scoped>
.userAvatar {
  cursor: pointer;
}
</style>
