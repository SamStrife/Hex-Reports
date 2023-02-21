<template>
  <q-page class="flex flex-center">
    <BulkMotCheckerCard></BulkMotCheckerCard>
  </q-page>
</template>

<script>
import BulkMotCheckerCard from "src/components/BulkMOTChecker/BulkMotCheckerCard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { BulkMotCheckerCard },
});
</script>
