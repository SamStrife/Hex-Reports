<template>
  <div>
    <q-card class="my-card bg-white">
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
              <q-badge color="green" text-color="black" label="M" />
              <q-badge color="amber" text-color="black" label="I" />
              <q-badge color="red" text-color="black" label="T" />
              On Hire to: {{ props.customer }}
            </div>
          </div>
          <q-card-actions class="flex column">
            <div class="flex q-pa-xs">
              <q-btn icon="check" color="green"></q-btn>
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
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  registration: String,
  type: String,
  make: String,
  model: String,
  status: String,
  subStatus: String,
  customer: String,
});
</script>
