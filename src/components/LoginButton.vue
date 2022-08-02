<template>
  <q-avatar color="green-8" text-color="white" v-if="myAccounts">{{
    myAccounts[0].name[0]
  }}</q-avatar>
  <q-btn
    v-else
    @click="openAuthPopup"
    color="green-8"
    icon-right="login"
    label="Log In"
  />
</template>

<script setup>
import { ref } from "vue";
import * as msal from "@azure/msal-browser";

const myAccounts = ref("");

const msalConfig = {
  auth: {
    clientId: "d3ecdd5a-cd64-4532-9b5f-71e00007efa8",
    authority:
      "https://login.microsoftonline.com/9ec541fd-d4e0-4871-bca6-3b6b57af5c9c",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

async function openAuthPopup() {
  try {
    await msalInstance
      .loginPopup({
        redirectUri: "http://localhost:8080/",
      })
      .then((myAccounts.value = msalInstance.getAllAccounts()));
  } catch (err) {
    alert(err);
  }
}
</script>
