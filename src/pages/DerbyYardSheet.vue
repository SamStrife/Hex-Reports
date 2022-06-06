<template>
  <q-page class="flex column q-pa-xl">
    <div v-for="i in 10" :key="i">
      <yard-sheet-card></yard-sheet-card>
      <br />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import YardSheetCard from "src/components/YardSheetCard.vue";

export default defineComponent({
  name: "DerbyYardSheet",
  components: { YardSheetCard },
});
</script>
