<template>
  <q-page>
    <q-banner class="bg-primary text-white">
      <div class="flex justify-around">
        <q-btn
          round
          color="green"
          icon="arrow_back"
          @click="changeDate('backward')"
        />
        <h5>
          {{ date.formatDate(selectedDate, "dddd: DD/MM/YYYY") }}
        </h5>
        <q-btn
          round
          color="green"
          icon="arrow_forwards"
          @click="changeDate('forward')"
        />
      </div>
    </q-banner>
    <div class="flex column q-pa-md">
      <yard-sheet-card
        v-for="vehicle in yardSheet"
        :key="vehicle.ID"
        :ID="vehicle.ID"
        :registration="vehicle.Registration"
        :type="vehicle.Vehicle_Type"
        :make="vehicle.Vehicle_Make"
        :model="vehicle.Vehicle_Model"
        :status="vehicle.Vehicle_Status"
        :subStatus="vehicle.Vehicle_Sub_Status"
        :customer="vehicle.Customer"
        :daysBetweenTodayAndSelected="daysBetweenTodayAndSelected"
        :motDue="vehicle.Vehicle_MOT_Due"
        :inspectionDue="vehicle.Vehicle_Inspection_Due"
        :tachoDue="vehicle.Vehicle_Tacho_Due"
        :confirmedDate="vehicle.Confirmed_Date_Time"
      ></yard-sheet-card>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, computed } from "vue";
import YardSheetCard from "src/components/YardSheetCard.vue";
import axios from "axios";
import { useQuasar, date, Dialog } from "quasar";

defineComponent({
  name: "DerbyYardSheet",
  components: { YardSheetCard },
});

const $q = useQuasar();

const yardSheet = ref();

const today = new Date();
const selectedDate = ref(new Date());
const daysBetweenTodayAndSelected = computed(() => {
  return date.getDateDiff(selectedDate.value, today, "days");
});

function changeDate(direction) {
  yardSheet.value = null;
  if (direction === "forward") {
    selectedDate.value = date.addToDate(selectedDate.value, { days: 1 });
  } else if (direction === "backward") {
    selectedDate.value = date.subtractFromDate(selectedDate.value, {
      days: 1,
    });
  } else if (direction === "today") {
    selectedDate.value = today;
  }
  getdata(selectedDate.value);
}

function getdata(passedDate) {
  $q.loading.show({
    delay: 50,
    message: "Fetching Yard Sheet Data",
    boxClass: "bg-grey-2 text-grey-9",
    spinnerColor: "primary",
  });
  let formattedDate = date.formatDate(passedDate, "YYYY-MM-DD");
  try {
    axios
      .get(`http://127.0.0.1:5000/GetDerbyYardSheet/${formattedDate}`)
      .then((response) => {
        if (response.statusText !== "OK") {
          $q.dialog({ title: "Error" });
        } else {
          yardSheet.value = response.data;
          $q.loading.hide();
        }
      });
  } catch (err) {
    console.log(`error: ${err}`);
  }
}

getdata(today);
</script>
