<template>
  <q-card :class="cardColour">
    <q-card-section>
      <div class="flex justify-between">
        <div>
          <div class="text-h6">{{ props.registration }}</div>
          <div class="text-subtitle2">
            {{ props.type }} - {{ props.make }} {{ props.model }}
          </div>
          <div class="text-subtitle2">
            Status: {{ props.status }} - Sub Status: {{ props.subStatus }}
          </div>
          <div class="text-subtitle2">
            <q-badge :color="motColour" text-color="black" label="M" />
            <q-badge :color="inspectionColour" text-color="black" label="I" />
            <q-badge :color="tachoColour" text-color="black" label="T" />
            On Hire to: {{ props.customer }}
          </div>
        </div>
        <q-card-actions
          class="flex column"
          v-if="props.daysBetweenTodayAndSelected == 0"
        >
          <div
            class="flex q-py-xs"
            v-if="!props.confirmedDate"
            @click="confirmVehicle(props.ID)"
          >
            <q-btn icon="check" color="green"></q-btn>
          </div>
          <div
            class="flex q-py-xs"
            v-if="props.confirmedDate"
            @click="unconfirmVehicle(props.ID)"
          >
            <q-btn icon="close" color="red"></q-btn>
          </div>
          <div class="flex q-pa-xs">
            <q-btn
              icon="contact_support"
              text-color="black"
              color="amber"
            ></q-btn>
          </div>
        </q-card-actions>
      </div>
    </q-card-section>
  </q-card>
  <br />
</template>

<script setup>
import { defineProps, computed, defineEmits } from "vue";
import { date } from "quasar";
import axios from "axios";

const props = defineProps({
  ID: String,
  registration: String,
  type: String,
  make: String,
  model: String,
  status: String,
  subStatus: String,
  customer: String,
  daysBetweenTodayAndSelected: Number,
  motDue: Number,
  inspectionDue: Number,
  tachoDue: Number,
  confirmedDate: Number,
});

const emit = defineEmits(["confirmVehicle", "unconfirmVehcile"]);

const motColour = computed(() => {
  let monthsUntil = date.getDateDiff(props.motDue, Date.now(), "months");
  if ((monthsUntil < 2) & (monthsUntil > 0)) {
    return "amber";
  } else if (monthsUntil <= 0) {
    return "red";
  } else {
    return "green";
  }
});

const inspectionColour = computed(() => {
  let daysUntil = date.getDateDiff(props.inspectionDue, Date.now(), "days");
  if ((daysUntil < 14) & (daysUntil > 0)) {
    return "amber";
  } else if (daysUntil <= 0) {
    return "red";
  } else {
    return "green";
  }
});

const tachoColour = computed(() => {
  let monthsUntil = date.getDateDiff(props.tachoDue, Date.now(), "months");
  if ((monthsUntil < 2) & (monthsUntil > 0)) {
    return "amber";
  } else if (monthsUntil <= 0) {
    return "red";
  } else {
    return "green";
  }
});

const cardColour = computed(() =>
  props.confirmedDate ? "bg-green-2" : "bg-white"
);

function confirmVehicle(vehicleId) {
  axios.post(`http://127.0.0.1:5000/DerbyYardSheet/confirm/${vehicleId}`);
}

function unconfirmVehicle(vehicleId) {
  axios.post(`http://127.0.0.1:5000/DerbyYardSheet/unconfirm/${vehicleId}`);
}
</script>
