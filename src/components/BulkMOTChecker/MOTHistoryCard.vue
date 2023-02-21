<template>
  <div>
    <q-card class="mot-card" bordered>
      <q-card-section>
        <div>
          <div class="row justify-between">
            <div class="column">
              <div class="text-overline text-black q-px-sm">MOT Date</div>
              <div class="text q-px-sm">
                {{ date.formatDate(mot.testDate, "DD/MM/YYYY") }}
              </div>
            </div>
            <div class="column">
              <div class="text-overline text-black q-px-sm">
                MOT Expiry Date
              </div>
              <div class="text q-px-sm">
                {{ date.formatDate(mot.expiryDate, "DD/MM/YYYY") }}
              </div>
            </div>
            <div class="column">
              <div class="text-overline text-black q-px-sm">Test Type</div>
              <div class="text q-px-sm">{{ mot.testType }}</div>
            </div>
            <div class="column">
              <div class="text-overline text-black q-px-sm">
                Certificate Number
              </div>
              <div class="text q-px-sm">{{ mot.testCertificateNumber }}</div>
            </div>
          </div>
          <div class="column">
            <div class="text-overline text-black q-px-sm">Location</div>
            <div class="text q-px-sm">{{ mot.location }}</div>
          </div>
          <div class="row">
            <div class="column">
              <div class="text-overline text-black q-px-sm">
                Number Of Advisories
              </div>
              <div class="text q-px-sm">
                <q-chip clickable @click="showDefects('advisories')">
                  {{ mot.numberOfAdvisoryDefectsAtTest }}</q-chip
                >
              </div>
            </div>
            <div class="column">
              <div class="text-overline text-black q-px-sm">
                Number Of Defects
              </div>
              <div class="text q-px-sm">
                <q-chip clickable @click="showDefects('defects')">
                  {{ mot.numberOfDefectsAtTest }}</q-chip
                >
              </div>
            </div>
          </div>
          <div class="pass-chip">
            <MOTPassChip :mot="mot.testResult"></MOTPassChip>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="defectsDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ defectsDialogTitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">{{ motDefects }} </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { date } from "quasar";
import MOTPassChip from "./MOTPassChip.vue";

const props = defineProps(["mot"]);

const defectsDialogOpen = ref(false);
const defectsDialogTitle = ref("");

const motDefects = computed(() => props?.mot?.defects);
console.log(motDefects);

function showDefects(type) {
  if (!motDefects.value) return;

  if (type == "advisories") {
    defectsDialogTitle.value = "Advisories";
  }
  if (type == "defects") {
    defectsDialogTitle.value = "Defects";
  }

  defectsDialogOpen.value = true;
}
</script>

<style>
.pass-chip {
  z-index: 100;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
