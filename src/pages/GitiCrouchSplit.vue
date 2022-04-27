<template>
  <q-page>
    <div class="q-pa-md">
      <GitiCrouchUploader></GitiCrouchUploader>
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
import GitiCrouchUploader from "../components/GitiCrouchUploader.vue";

export default {
  components: {
    GitiCrouchUploader,
    GitiCrouchUploader,
  },
  setup() {
    return {};
  },
};
</script>
