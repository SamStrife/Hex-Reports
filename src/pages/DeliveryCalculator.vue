,
<template>
  <q-page>
    <div class="q-pa-md">
      <q-form class="q-gutter-md">
        <q-select
          outlined
          v-model="deliveryType"
          :options="[
            'Solo Vehicle Delivery',
            'Delivery of Solo Vehicle On Low Loader Trailer',
            'Delivery of Multiple Vehicles On Low Loader Trailer',
          ]"
          label="Delivery Type"
        />
        <q-input
          outlined
          v-model.number="deliveryMiles"
          label="Delivery Miles"
        />
        <q-input outlined v-model="rentalTerm" label="Rental Term (Months)" />
        <q-toggle v-model="outOfHoursFlag" color="green"
          >Out Of Hours?</q-toggle
        >
      </q-form>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Delivery Cost</div>
        </q-card-section>
        <q-separator />
        <q-card-section>£{{ deliveryCost }}</q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const deliveryMiles = ref(0);
    const rentalTerm = ref(0);
    const waitingTime = ref(0);
    const discountPercentage = ref(0.25);
    const deliveryType = ref("");
    const outOfHoursFlag = ref(false);

    const deliveryCost = computed(() => {
      if (deliveryType.value == "Solo Vehicle Delivery") {
        return 100;
      } else if (
        deliveryType.value == "Delivery of Solo Vehicle On Low Loader Trailer"
      ) {
        return 200;
      } else if (
        deliveryType.value ==
        "Delivery of Multiple Vehicles On Low Loader Trailer"
      ) {
        return 300;
      } else {
        return 0;
      }
    });

    return {
      deliveryMiles,
      rentalTerm,
      waitingTime,
      discountPercentage,
      deliveryType,
      outOfHoursFlag,
      deliveryCost,
    };
  },
};
</script>
