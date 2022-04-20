<template>
  <q-page>
    <div class="q-pa-md">
      <q-form class="q-gutter-md" greedy @submit.prevent="addVehicleToArray">
        <div class="row q-gutter-md">
          <div class="col">
            <q-input
              v-model="customer"
              dense
              outlined
              label="Customer"
              hint="Customer Name"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
          <div class="col">
            <q-input
              v-model="registration"
              outlined
              dense
              label="Registration"
              hint="Vehicle Registration"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
          <div class="col">
            <q-input
              v-model="vehicleType"
              outlined
              dense
              label="Vehicle Type"
              hint="Vehicle Type"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col">
            <q-input
              v-model="hireStart"
              label="Hire Start Date"
              hint="Hire Start Date"
              outlined
              dense
              outline
              stack-label
              reactive-rules
              type="date"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="hireEnd"
              label="Hire End Date"
              hint="Hire End Date"
              outlined
              dense
              outline
              stack-label
              reactive-rules
              type="date"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
                () =>
                  endDateGreaterThanStartCheck == false ||
                  'End date must be after the start date',
              ]"
            >
            </q-input>
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col">
            <q-input
              id="startMileageInput"
              v-model.number="startMileage"
              type="number"
              outlined
              dense
              label="Start Mileage"
              hint="Start Mileage"
              lazy-rules
              :rules="[
                (val) => Number.isInteger(val) || 'Please enter a whole number',
              ]"
            />
          </div>
          <div class="col">
            <q-input
              v-model.number="endMileage"
              type="number"
              outlined
              dense
              lazy-rules
              label="End Mileage"
              hint="End Mileage"
              :rules="[
                (val) => Number.isInteger(val) || 'Please enter a whole number',
                () =>
                  endMileageGreaterThanStartCheck ||
                  'End mileage has to be greater than start mileage',
              ]"
            />
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col">
            <q-input
              v-model.number="yearlyAllowance"
              type="number"
              outlined
              dense
              label="Yearly Allowance"
              hint="Yearly Allowance"
              :rules="[
                (val) => Number.isInteger(val) || 'Please enter a whole number',
              ]"
            />
          </div>
          <div class="col">
            <q-input
              v-model.number="pricePerExcess"
              type="number"
              outlined
              dense
              label="Pence Per Excess Mile/KM"
              hint="Pence Per Excess Mile/KM"
              lazy-rules
              :rules="[
                (val) => Number.isInteger(val) || 'Please enter a whole number',
              ]"
            />
          </div>
        </div>
        <div class="row justify-start">
          <div class="col-1 col-md-1">
            <q-btn type="submit" label="Add" color="green-10" />
          </div>
          <div class="col">
            <q-btn
              label="Clear"
              type="reset"
              color="green-10"
              flat
              class="q-ml-sm"
              @click="clearInput"
            />
          </div>
          <div class="col">
            <q-toggle
              v-model="preventNegative"
              color="green"
              label="Prevent Negative Results"
            />
          </div>
        </div>
      </q-form>
    </div>
    <div class="q-pa-md">
      <q-markup-table id="mileageTable">
        <thead>
          <tr>
            <th class="text-left">Customer</th>
            <th class="text-left">Vehicle Registration</th>
            <th class="text-left">Vehicle Type</th>
            <th class="text-left">Hire Start Date</th>
            <th class="text-left">Hire End Date</th>
            <th class="text-left">Start Mileage</th>
            <th class="text-left">End Mileage</th>
            <th class="text-left">Yearly Allowance</th>
            <th class="text-left">Over</th>
            <th class="text-left">Pence per KM</th>
            <th class="text-left">Excess Mileage Charge</th>
          </tr>
        </thead>
        <tbody v-for="(vehicle, index) in vehicleArray" :key="index">
          <tr>
            <td>
              {{ vehicle.customer }}
            </td>
            <td>
              {{ vehicle.reg }}
            </td>
            <td>
              {{ vehicle.type }}
            </td>
            <td>
              {{ vehicle.startDate }}
            </td>
            <td>
              {{ vehicle.endDate }}
            </td>
            <td>
              {{ vehicle.startMileage }}
            </td>
            <td>
              {{ vehicle.endMileage }}
            </td>
            <td>
              {{ vehicle.allowance }}
            </td>
            <td>
              {{ vehicle.over }}
            </td>
            <td>
              {{ vehicle.ppm }}
            </td>
            <td>{{ vehicle.excessCharge }}</td>
            <td>
              <q-icon
                class="text-red cursor-pointer"
                name="clear"
                @click="vehicleArray.splice(index, 1)"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="q-pa-md q-gutter-md">
        <div>
          <q-chip
            clickable
            @click="downloadTable"
            icon="file_download"
            color="green-10"
            text-color="white"
            >Download</q-chip
          >
          <q-chip
            clickable
            @click="clearTable"
            icon="delete_forever"
            color="green-10"
            text-color="white"
            >Clear Table</q-chip
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { date } from "quasar";
import * as XLSX from "xlsx";

export default {
  setup() {
    const customer = ref("");
    const registration = ref("");
    const vehicleType = ref("");
    const hireStart = ref("");
    const hireEnd = ref("");
    const startMileage = ref("");
    const endMileage = ref("");
    const yearlyAllowance = ref("");
    const excessMileage = ref("");
    const pricePerExcess = ref(8);
    const vehicleArray = ref([]);
    const preventNegative = ref(false);

    function numberWithCommas(number, currencyMode = false) {
      let rounded = currencyMode
        ? number.toFixed(2)
        : Math.round(parseInt(number));
      return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const endMileageGreaterThanStartCheck = computed(() => {
      return endMileage.value > startMileage.value;
    });

    const endDateGreaterThanStartCheck = computed(() => {
      if (hireStart.value && hireEnd.value)
        return date.getDateDiff(hireEnd.value, hireStart.value, "days") <= 0;
      return false;
    });

    function calculateExcessPenalty() {
      const dailyAllowance = yearlyAllowance.value / 365;
      const daysOnRent = date.getDateDiff(
        hireEnd.value,
        hireStart.value,
        "days"
      );
      const milesDone = endMileage.value - startMileage.value;
      const hireAllowance = dailyAllowance * daysOnRent;
      let mileageDifference = milesDone - hireAllowance;

      preventNegative.value && mileageDifference < 0
        ? (mileageDifference = 0)
        : mileageDifference;

      return {
        difference: mileageDifference,
        cost: (mileageDifference * pricePerExcess.value) / 100,
      };
    }

    function addVehicleToArray() {
      let calculation = calculateExcessPenalty(preventNegative.value);

      vehicleArray.value.push({
        customer: customer.value,
        reg: registration.value,
        type: vehicleType.value,
        startDate: new Date(hireStart.value).toLocaleDateString(),
        endDate: new Date(hireEnd.value).toLocaleDateString(),
        startMileage: numberWithCommas(startMileage.value),
        endMileage: numberWithCommas(endMileage.value),
        allowance: numberWithCommas(yearlyAllowance.value),
        over: numberWithCommas(calculation.difference),
        ppm: pricePerExcess.value,
        excessCharge: "£" + numberWithCommas(calculation.cost, true),
      });
    }

    function downloadTable() {
      const workbook = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(vehicleArray.value, {
        header: [
          "customer",
          "reg",
          "type",
          "startDate",
          "endDate",
          "startMileage",
          "endMileage",
          "allowance",
          "over",
          "ppm",
          "excessCharge",
        ],
      });
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            "Customer",
            "Registration",
            "Vehicle Type",
            "Hire Start Date",
            "Hire End Date",
            "Starting Mileage",
            "End Mileage",
            "Yearly Allowance",
            "Over",
            "Pence Per KM",
            "Excess Mileage Charge",
          ],
        ],
        { origin: "A1" }
      );
      XLSX.utils.book_append_sheet(workbook, ws, "Sheet 1");
      XLSX.writeFileXLSX(workbook, "Report.xlsx");
    }

    function clearInput() {
      customer.value = "";
      registration.value = "";
      vehicleType.value = "";
      hireStart.value = "";
      hireEnd.value = "";
      startMileage.value = "";
      endMileage.value = "";
      yearlyAllowance.value = "";
      excessMileage.value = "";
      pricePerExcess.value = "7";
    }

    function clearTable() {
      vehicleArray.value = [];
    }

    return {
      vehicleArray,
      addVehicleToArray,
      clearInput,
      clearTable,
      downloadTable,
      numberWithCommas,
      endMileageGreaterThanStartCheck,
      endDateGreaterThanStartCheck,
      customer,
      registration,
      vehicleType,
      hireStart,
      hireEnd,
      startMileage,
      endMileage,
      yearlyAllowance,
      excessMileage,
      pricePerExcess,
      preventNegative,
    };
  },
};
</script>
