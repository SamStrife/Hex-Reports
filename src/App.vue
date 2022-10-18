<template>
  <router-view />
</template>

<script setup>
import { useQueryProvider } from "vue-query";

useQueryProvider();
</script>
