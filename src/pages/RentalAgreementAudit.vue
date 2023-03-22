<template>
  <q-page>
    <div class="column">
      <div>
        <h1>Table Fitlers</h1>
      </div>
      <section class="row q-pa-md justify-evenly">
        <div id="chart">
          <vue-apex-charts
            type="radialBar"
            :options="chartOptions"
            :series="series"
          ></vue-apex-charts>
        </div>
        <div id="chart">
          <vue-apex-charts
            type="radialBar"
            :options="chartOptions"
            :series="series"
          ></vue-apex-charts>
        </div>
        <div id="chart">
          <vue-apex-charts
            type="radialBar"
            :options="chartOptions"
            :series="series"
          ></vue-apex-charts>
        </div>
      </section>
      <div>
        <div class="q-pa-md">
          <q-table
            class="rentalTable"
            title="Rentals"
            :rows="audits.rentalData"
            :columns="rentalColumns"
            row-key="Unique ID"
            virtual-scroll
            :virtual-scroll-item-size="48"
            :virtual-scroll-sticky-size-start="48"
            :rows-per-page-options="[0]"
          >
            <template v-slot:body="props">
              <q-tr
                :props="props"
                @click="handleRowClick(props.row)"
                class="rentalRow"
                :class="{
                  selectedRow:
                    props.row['Unique ID'] == selectedRA.AgreementNumber,
                  bothPresent:
                    props.row['RADocNumber'] > 0 &&
                    props.row['CheckOutDocNumber'] > 0,
                  onePresent:
                    (props.row['RADocNumber'] > 0 &&
                      (props.row['CheckOutDocNumber'] < 0 ||
                        !props.row['CheckOutDocNumber'])) ||
                    (props.row['CheckOutDocNumber'] > 0 &&
                      (props.row['RADocNumber'] < 0 ||
                        !props.row['RADocNumber'])),
                  nonePresent:
                    props.row['RADocNumber'] < 0 &&
                    props.row['CheckOutDocNumber'] < 0,
                }"
              >
                <q-td key="agreementNumber" :props="props">
                  {{ props.row["Unique ID"] }}
                </q-td>
                <q-td key="registration" :props="props">
                  {{ props.row["Registration"] }}
                </q-td>
                <q-td key="customer" :props="props">
                  {{ props.row["Customer Name"] }}
                </q-td>
                <q-td key="hireStart" :props="props">
                  {{
                    date.formatDate(props.row["Hire Start Date"], "DD/MM/YYYY")
                  }}
                </q-td>
                <q-td key="hireType" :props="props">
                  {{ props.row["Hire Type Name"] }}
                </q-td>
                <q-td key="live" :props="props">
                  <q-chip
                    v-if="props.row['Live']"
                    color="green"
                    text-color="white"
                    label="Yes"
                  />
                  <q-chip
                    v-else
                    color="red"
                    text-color="white"
                    label="No"
                  ></q-chip>
                </q-td>
                <q-td key="rentalAgreement" :props="props">
                  <q-chip
                    v-if="props.row['RADocNumber'] > 0"
                    color="green"
                    text-color="white"
                    label="Yes"
                  />
                  <q-chip
                    v-if="props.row['RADocNumber'] < 0"
                    color="red"
                    text-color="white"
                    label="No"
                  />
                </q-td>
                <q-td key="checkOut" :props="props">
                  <q-chip
                    v-if="props.row['CheckOutDocNumber'] > 0"
                    color="green"
                    text-color="white"
                    label="Yes"
                  />
                  <q-chip
                    v-if="props.row['CheckOutDocNumber'] < 0"
                    color="red"
                    text-color="white"
                    label="No"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <DocumentTable dataType="rentalAgreements"></DocumentTable>
        </div>
        <div class="col-6">
          <DocumentTable dataType="checkOuts"></DocumentTable>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useRentalAuditStore } from "src/stores/RentalAuditStore";
import { date } from "quasar";
import VueApexCharts from "vue3-apexcharts";
import DocumentTable from "src/components/RentalAudit/DocumentTable.vue";

const audits = useRentalAuditStore();
const selectedRA = audits.selectedRA;

onBeforeMount(() => {
  audits.getData();
});

const series = [76];
const chartOptions = {
  chart: {
    type: "radialBar",
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: "#999",
          opacity: 1,
          blur: 2,
        },
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          offsetY: -35,
          fontSize: "18px",
        },
      },
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  fill: {
    type: "solid",
  },
  labels: ["Average Results"],
};

const rentalColumns = [
  {
    name: "agreementNumber",
    label: "Agrrement Number",
    align: "left",
  },
  {
    name: "registration",
    required: true,
    label: "Registration",
    align: "left",
  },
  {
    name: "customer",
    label: "Customer",
    align: "left",
  },
  {
    name: "hireStart",
    label: "Hire Start Date",
    align: "left",
  },
  {
    name: "hireType",
    label: "Hire Type",
    align: "left",
  },
  {
    name: "live",
    label: "Live Hire",
    align: "center",
  },
  {
    name: "rentalAgreement",
    label: "Rental Agreement ?",
    align: "center",
  },
  {
    name: "checkOut",
    label: "Check Out ?",
    align: "center",
  },
];

async function handleRowClick(row) {
  if (!audits.documentsLoading) {
    audits.setSelectedRA(row);
    await audits.getDocumentsForVehicle();
  }
}
</script>

<style scoped lang="sass">
.bothPresent
  background: #a2e8b5
.onePresent
  background: #f5af53
.nonePresent
  background: #f58787
.selectedRow
  background: #098512
  color: #fff

.rentalRow
  cursor: pointer

.rentalTable
  /* height or max-height is important */
  height: 550px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
