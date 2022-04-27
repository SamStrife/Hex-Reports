<template>
  <div class="q-pa-md">
    <q-file
      v-model="file"
      label="Upload File"
      outlined
      use-chips
      accept=".xlsx"
    />
    <br />
    <q-btn color="primary" label="Process" />
    <br />
    <p>{{ apiReturn }}</p>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const file = ref("");
    const apiReturn = ref("");

    axios.get("http://127.0.0.1:5000/").then((response) => {
      console.log(response);
      apiReturn.value = response.data;
    });

    return {
      file,
      apiReturn,
    };
  },
};
</script>
