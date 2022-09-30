<template>
  <q-page>
    <div class="q-pa-lg flex column justify-around">
      <p class="justify-center">Select A Date</p>
      <q-input filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="q-pa-lg flex justify-around">
      <div>
        <h4>Authorisation Database Query</h4>
        <q-markup-table>
          <thead class="bg-primary text-white">
            <tr>
              <th colspan="2"></th>
              <th colspan="2">Contract Hire</th>
              <th colspan="2">Fleet Management</th>
              <th colspan="2">Rental</th>
              <th colspan="2">Total</th>
              <th colspan="2">Recharge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="bg-primary text-white" colspan="2">Income Stream</td>
              <td class="bg-primary text-white">Previous Day</td>
              <td class="bg-primary text-white">Month To Date</td>
              <td class="bg-primary text-white">Previous Day</td>
              <td class="bg-primary text-white">Month To Date</td>
              <td class="bg-primary text-white">Previous Day</td>
              <td class="bg-primary text-white">Month To Date</td>
              <td class="bg-primary text-white">Previous Day</td>
              <td class="bg-primary text-white">Month To Date</td>
              <td class="bg-primary text-white">Previous Day</td>
              <td class="bg-primary text-white">Month To Date</td>
            </tr>
            <tr>
              <td colspan="2">Routine</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">Tyres</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">MOT</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">Breakdowns</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">Other</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div>
        <h4>Job Item Database Query</h4>
        <q-markup-table>
          <thead>
            <tr>
              <th colspan="2"></th>
              <th colspan="2">Contract Hire</th>
              <th colspan="2">Fleet Management</th>
              <th colspan="2">Rental</th>
              <th colspan="2">Total</th>
              <th colspan="2">Recharge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">Income Stream</td>
              <td>Previous Day</td>
              <td>Month To Date</td>
              <td>Previous Day</td>
              <td>Month To Date</td>
              <td>Previous Day</td>
              <td>Month To Date</td>
              <td>Previous Day</td>
              <td>Month To Date</td>
              <td>Previous Day</td>
              <td>Month To Date</td>
            </tr>
            <tr>
              <td colspan="2">Routine</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">Tyres</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">MOT</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">Breakdowns</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">Other</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const date = ref("");
</script>
