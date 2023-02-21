<template>
  <div>
    <q-card class="mot-card" bordered>
      <q-card-section>
        <div class="row justify-between">
          <div class="column">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ registration }}</div>
            <q-skeleton
              v-if="vehicleDescriptionLoading"
              type="text"
            ></q-skeleton>
            <div v-else class="column">
              <div class="text-caption text-grey">
                {{ vehicleDescriptionMake }}
              </div>
              <div class="text-caption text-grey">
                {{ vehicleDescriptionModel }}
              </div>
              <div class="text-caption text-grey">
                {{ vehicleDescriptionType }}
              </div>
            </div>
          </div>
          <div class="column">
            <div class="text-overline text-grey-9">System MOT Date</div>
            <MOTDateChip
              :date="systemMOTDate"
              :loading="systemMOTChipLoading"
            ></MOTDateChip>
          </div>
          <div class="column">
            <div class="text-overline text-grey-9">Government MOT Date</div>
            <MOTDateChip dateType="government"></MOTDateChip>
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            <div>
              <MOTHistoryCard></MOTHistoryCard>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MOTDateChip from "./MOTDateChip.vue";
import MOTHistoryCard from "./MOTHistoryCard.vue";
import axios from "axios";

const expanded = ref(false);

const registration = ref("YL68ADO");

const vehicleDescriptionMake = ref("");
const vehicleDescriptionModel = ref("");
const vehicleDescriptionType = ref("");
const vehicleDescriptionLoading = ref(false);

const systemMOTDate = ref();
const systemMOTChipLoading = ref(false);

const governmentMOTDataLoading = ref(false);
const governmentResponseData = ref();

async function getVehicleDescription() {
  vehicleDescriptionLoading.value = true;
  await axios
    .get(`https://api.hexreports.com/VehicleSummary/${registration.value}`)
    .then((response) => {
      vehicleDescriptionMake.value = response.data["manufacturer"][0];
      vehicleDescriptionModel.value = response.data["model"][0];
      vehicleDescriptionType.value = response.data["vehicleType"][0];
    });
  vehicleDescriptionLoading.value = false;
}

async function getSystemMOTDate() {
  systemMOTChipLoading.value = true;
  let responseDate = null;
  await axios
    .get(`https://api.hexreports.com/VehicleSummary/${registration.value}`)
    .then((response) => {
      responseDate = response.data["motDue"][0];
    });
  systemMOTChipLoading.value = false;
  systemMOTDate.value = responseDate;
}

async function getGovernmentMOTData() {
  governmentMOTDataLoading.value = true;
  let responseData = null;
  await axios({
    url: `https://beta.check-mot.service.gov.uk/trade/vehicles/annual-tests?registrationsOrVins=${registration.value}`,
    method: "GET",
    headers: {
      "x-api-key": "U6662lcQWt9m6Wn3DDHIq2bKEBDW5DQ6TYzYS2y1",
      Accept: "application/json+v7",
    },
  }).then((response) => {
    console.log(response);
  });
  governmentMOTDataLoading.value = false;
  governmentResponseData.value = responseData;
}

getVehicleDescription();
getSystemMOTDate();
getGovernmentMOTData();
</script>

<style lang="sass" scoped>
.mot-card
  min-width: 650px
  max-width: 650px
</style>
