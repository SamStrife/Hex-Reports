<template>
  <div class="qm-t-md flex column items-center">
    <div class="q-pt-md">
      <q-btn
        color="primary"
        text-color="white"
        label="Download My Asset File"
        @click="requestAssetFile(requester)"
      />
    </div>
    <div class="q-pa-md" v-if="accessLevel == 'su'">
      <q-btn-dropdown color="primary" :label="selectedSalesPerson">
        <q-list v-for="(person, index) in salesPeople" :key="index">
          <q-item
            v-if="person.visability != 'hidden'"
            clickable
            v-close-popup
            @click="selectSalesPerson(person.name)"
          >
            <q-item-section>
              <q-item-label>{{ person.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn @click="go">Go</q-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeUser } from "src/stores/storeUser.js";

const userStore = storeUser();

const selectedSalesPerson = ref("Select A Sales Person");

const requester = ref(userStore.userName);

function requestAssetFile(username) {
  console.log(`Requested by ${username}`);
}

function selectSalesPerson(salesperson) {
  selectedSalesPerson.value = salesperson;
}

const accessLevel = computed(() => {
  const sp = salesPeople.filter(
    (salesperson) => salesperson["name"] == requester.value
  );
  return sp[0]["role"];
});

function go() {
  console.log(`role: ${accessLevel.value}`);
}

const salesPeople = [
  { name: "Sam Armstrong", role: "sp", visability: "visable" },
  { name: "Sam Fletcher", role: "su", visability: "hidden" },
  { name: "David Hodgkinson", role: "su", visability: "hidden" },
  { name: "Steve Johnson", role: "sp", visability: "visable" },
  { name: "Mark King", role: "sp", visability: "visable" },
  { name: "Nick Parker", role: "sp", visability: "visable" },
  { name: "Andrew Potter", role: "sp", visability: "visable" },
  { name: "Martyn Sheridan", role: "sp", visability: "visable" },
  { name: "Michael Webb", role: "su", visability: "visable" },
  { name: "Lesley Williams", role: "sp", visability: "visable" },
];
</script>
