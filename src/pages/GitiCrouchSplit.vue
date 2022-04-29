<template>
  <q-page>
    <div class="q-pa-md">
      <q-file
        v-model="file"
        @update:model-value="handleFileUpload()"
        outlined
        label="Upload Supplier Spreadsheet"
        accept=".xlsx"
      />
      <br />
    </div>

    <div class="q-pa-md">
      <h6>Revenue Split</h6>
      <q-markup-table id="revenueSplit">
        <thead>
          <tr>
            <th class="text-left">Contract Sales</th>
            <th class="text-left">Rental Sales</th>
            <th class="text-left">Fleet Management</th>
            <th class="text-left">Not On Hire</th>
            <th class="text-left">Unassigned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="returnBreakdown?.contractSales">
              £{{ numberWithCommas(returnBreakdown.contractSales, true) }}
            </td>
            <td v-else>£0</td>
            <td v-if="returnBreakdown?.rentalSales">
              £{{ numberWithCommas(returnBreakdown.rentalSales, true) }}
            </td>
            <td v-else>£0</td>
            <td v-if="returnBreakdown?.fleetManagement">
              £{{ numberWithCommas(returnBreakdown.fleetManagement, true) }}
            </td>
            <td v-else>£0</td>
            <td v-if="returnBreakdown?.notOnHire">
              £{{ numberWithCommas(returnBreakdown.notOnHire, true) }}
            </td>
            <td v-else>£0</td>
            <td v-if="returnBreakdown?.unallocated">
              £{{ numberWithCommas(returnBreakdown.unallocated, true) }}
            </td>
            <td v-else>£0</td>
          </tr>
        </tbody>
      </q-markup-table>
      <h6>Unassigned Jobs</h6>
      <q-markup-table id="unallocatedJobs">
        <thead>
          <tr>
            <th class="text-left">Job Number</th>
            <th class="text-left">Job Detail 1</th>
            <th class="text-left">Job Detail 2</th>
            <th class="text-left">Job Detail 3</th>
            <th class="text-left">Job Detail 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Detail</td>
            <td>Detail</td>
            <td>Detail</td>
            <td>Detail</td>
            <td>Detail</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const file = ref(null);
    const apiReturn = ref("");
    let formData = new FormData();
    const returnBreakdown = ref("");

    const handleFileUpload = async () => {
      formData.append("upload", file.value);
      axios
        .post("http://127.0.0.1:5000/CrouchGitiSplit", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => (returnBreakdown.value = response.data));
      formData = new FormData();
    };

    function numberWithCommas(number, currencyMode = false) {
      let rounded = currencyMode
        ? number.toFixed(2)
        : Math.round(parseInt(number));
      return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return {
      file,
      apiReturn,
      handleFileUpload,
      returnBreakdown,
      numberWithCommas,
    };
  },
};
</script>
