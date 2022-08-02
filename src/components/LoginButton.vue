<template>
  <q-btn
    v-if="userStore.loggedIn"
    @click="userStore.logout"
    round
    color="green-8"
    :label="userStore.userInitials"
  >
    <q-tooltip class="bg-accent">Click to log out</q-tooltip>
  </q-btn>

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
