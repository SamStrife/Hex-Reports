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
          type="number"
          v-model.number="deliveryMiles"
          label="Delivery Miles"
          :rules="[(val) => val > -1 || 'Please enter a positive number']"
        />
        <q-input
          outlined
          type="number"
          v-model="rentalTerm"
          label="Rental Term (Months)"
          :rules="[(val) => val > -1 || 'Please enter a positive number']"
        />
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
        <q-card-section
          class="text-h5"
          v-if="
            deliveryType ==
            'Delivery of Multiple Vehicles On Low Loader Trailer'
          "
        >
          £{{ deliveryCost }} per vehicle
        </q-card-section>
        <q-card-section class="text-h5" v-else
          >£{{ deliveryCost }}</q-card-section
        >
      </q-card>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <h6>Cost Breakdown</h6>
      <q-markup-table id="mileageTable">
        <thead>
          <tr>
            <th class="text-left">Base Price Per Mile</th>
            <th class="text-left">Delivery Miles</th>
            <th class="text-left">Cost Before Discount</th>
            <th class="text-left">Discount %</th>
            <th class="text-left">Discount Amount</th>
            <th class="text-left">Out Of Hours Charge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>£{{ basePricePerMile }}</td>
            <td>
              {{ deliveryMiles }}
            </td>
            <td>£{{ deliveryMiles * basePricePerMile }}</td>
            <td>{{ (discountPercentage * 100).toFixed(0) }}%</td>
            <td>
              £{{ deliveryMiles * basePricePerMile * discountPercentage }}
            </td>
            <td>£{{ outOfHoursCharge }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const deliveryMiles = ref("");
    const rentalTerm = ref("");
    const deliveryType = ref("");
    const outOfHoursFlag = ref(false);
    const outOfHoursCharge = computed(() => (outOfHoursFlag.value ? 100 : 0));
    const basePricePerMile = computed(() => {
      if (deliveryType.value == "Solo Vehicle Delivery") return 2;
      if (
        deliveryType.value == "Delivery of Solo Vehicle On Low Loader Trailer"
      )
        return 1.75;
      if (
        deliveryType.value ==
        "Delivery of Multiple Vehicles On Low Loader Trailer"
      )
        return 1;
      else {
        return 0;
      }
    });

    const discountPercentage = computed(() => {
      let percentage = ((100 / 12) * rentalTerm.value) / 100;
      return percentage > 1 ? 1 : percentage;
    });

    const deliveryCost = computed(() => {
      let baseDeliveryCost = basePricePerMile.value * deliveryMiles.value;
      return (
        baseDeliveryCost -
        baseDeliveryCost * discountPercentage.value +
        outOfHoursCharge.value
      ).toFixed(2);
    });

    return {
      basePricePerMile,
      deliveryMiles,
      rentalTerm,
      discountPercentage,
      deliveryType,
      outOfHoursFlag,
      deliveryCost,
      outOfHoursCharge,
    };
  },
};
</script>
