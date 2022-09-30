<template>
  <q-page class="flex flex-center column">
    <h1>{{ message }}</h1>
    <h1>{{ count }}</h1>
    <h1>{{ doubleCount }}</h1>
    <button @click="counterIncrease">Count</button>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const message = "Hello World";
const count = ref(0);
const doubleCount = computed(() => count.value * 2);

function counterIncrease() {
  count.value += 1;
  console.log("Clicked");
}

const queryResult = axios.get("");
</script>
