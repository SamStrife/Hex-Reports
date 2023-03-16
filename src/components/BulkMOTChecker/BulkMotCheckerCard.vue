<template>
  <div>
    <q-card class="mot-card" bordered :style="cardBackGroundColour">
      <q-card-section>
        <div class="row justify-between">
          <div class="column">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ registration }}</div>
            <q-skeleton v-if="loading" type="text"></q-skeleton>
            <div v-else class="column">
              <div class="text-caption text-grey">
                {{ data.manufacturerName }}
              </div>
              <div class="text-caption text-grey">
                {{ data.modelName }}
              </div>
            </div>
          </div>
          <div v-if="isError">
            Sorry, there was an error processing this request
          </div>
          <div v-if="!isError" class="column">
            <div class="text-overline text-grey-9">System MOT Date</div>
            <MOTDateChip
              :date="data.systemMotDate"
              :loading="loading"
            ></MOTDateChip>
          </div>
          <div v-if="!isError" class="column">
            <div class="text-overline text-grey-9">Government MOT Date</div>
            <MOTDateChip
              :date="data.govMotDueDate"
              :loading="loading"
            ></MOTDateChip>
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
            <div v-if="isError">{{ errorMessage }}</div>
            <div v-if="!isError && !data.motHistory" class="row justify-center">
              <p>Sorry, there is not MOT history available for this vehicle</p>
            </div>
            <div v-if="!isError && data.motHistory">
              <MOTHistoryCard
                class="q-py-sm"
                v-for="(mot, index) in data.motHistory"
                :key="index"
                :mot="mot"
              ></MOTHistoryCard>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import MOTDateChip from "./MOTDateChip.vue";
import MOTHistoryCard from "./MOTHistoryCard.vue";
import axios from "axios";
import { date } from "quasar";

const expanded = ref(false);
const loading = ref(false);

const props = defineProps(["registration"]);
const registration = computed(() => props.registration);

const isError = ref(false);
const errorMessage = ref();

const cardBackGroundColour = computed(() => {
  if (date.getDateDiff(data.govMotDueDate, data.systemMotDate, "days") != 0) {
    return "background: linear-gradient(90deg, #f7bdbd, #ff4848)";
  }
  return null;
});

const data = reactive({
  govMotDueDate: null,
  systemMotDate: null,
  manufacturerName: null,
  modelName: null,
  motHistory: null,
});

async function getData() {
  loading.value = true;
  let responseData = null;
  try {
    await axios
      .get(`https://api.hexreports.com/bulkMOTCheck/${registration.value}`)
      .then((response) => {
        responseData = response;
      });
    data.systemMotDate = responseData.data["systemMOTDate"];
    data.govMotDueDate = responseData.data["govMotDueDate"];
    data.manufacturerName = responseData.data["manufacturerName"];
    data.modelName = responseData.data["modelName"];
    data.motHistory = responseData.data["motHistory"];
    loading.value = false;
  } catch (error) {
    isError.value = true;
    errorMessage.value = error.message;
    loading.value = false;
  }
}

getData();
</script>

<style scoped></style>
