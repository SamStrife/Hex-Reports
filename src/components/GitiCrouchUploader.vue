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
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const file = ref("");

    return {
      file,
    };
  },
};
</script>
