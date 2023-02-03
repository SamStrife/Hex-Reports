<template>
  <router-view />
</template>

<script setup>
import { useQueryProvider } from "vue-query";

import { storeUser } from "./stores/storeUser";
import { useRouter } from "vue-router";

const userStore = storeUser();
const router = useRouter();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (userStore.loggedIn) return next();
    if (!userStore.loggedIn) return next("/");
  } else {
    return next();
  }
});

useQueryProvider();
</script>
