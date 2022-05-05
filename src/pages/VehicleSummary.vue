,
<template>
  <q-page>
    <div class="q-pa-md">
      <q-form class="q-gutter-md" @submit.prevent="requestData">
        <q-input
          outlined
          type="text"
          v-model="vehicleRegistration"
          label="Vehicle Registration"
        />
        <q-btn type="submit" label="Get Details" color="green-10" />
      </q-form>
      <div class="q-pa-md">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Manufacturer</div>
          </q-card-section>
          <q-separator />
          <div class="text-h6" v-if="requestReturn?.data?.manufacturer">
            {{ requestReturn.data.manufacturer[0] }}
          </div>
          <div class="text-h6" v-else><br /></div>
        </q-card>
        <br />
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Model</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.model">
            {{ requestReturn.data.model[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Vehicle Type</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.vehicleType">
            {{ requestReturn.data.vehicleType[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Vehicle Status</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.status">
            {{ requestReturn.data.status[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Vehicle Sub Status</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.subStatus">
            {{ requestReturn.data.subStatus[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Customer</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.customer">
            {{ requestReturn.data.customer[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Mileage</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.mileage">
            {{ requestReturn.data.mileage[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Inspection Due</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.inspectionDue">
            {{ requestReturn.data.inspectionDue[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">MOT Due</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.motDue">
            {{ requestReturn.data.motDue[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Tacho Due</div>
          </q-card-section>
          <q-separator />
          <h6 v-if="requestReturn?.data?.tachoDue">
            {{ requestReturn.data.tachoDue[0] }}
          </h6>
          <h6 v-else><br /></h6>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const vehicleRegistration = ref("");
    const requestReturn = ref("");

    async function requestData() {
      axios
        .get(
          `http://127.0.0.1:5000/VehicleSummary/${vehicleRegistration.value}`
        )
        .then((response) => (requestReturn.value = response));
    }

    return {
      vehicleRegistration,
      requestData,
      requestReturn,
    };
  },
};
</script>
