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
      <p>{{ returnBreakdown }}</p>
      <br />
      <p>{{ apiReturn }}</p>
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
            <td>Amount</td>
            <td>Amount</td>
            <td>Amount</td>
            <td>Amount</td>
            <td>Amount</td>
          </tr>
        </tbody>
      </q-markup-table>
      <h6>Unallocated Jobs</h6>
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
      // debugger;
      console.log("selected file", file.value);
      //Upload to server
      formData.append("upload", file.value);
      axios
        .post("http://127.0.0.1:5000/CrouchGitiSplit", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          returnBreakdown.value = JSON.stringify(response);
        });
      formData = new FormData();
    };

    return {
      file,
      apiReturn,
      returnBreakdown,
      handleFileUpload,
    };
  },
};
</script>
