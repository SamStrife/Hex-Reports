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
            class="my-sticky-dynamic"
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
                @click="
                  handleRowClick(
                    props.row['Unique ID'],
                    props.row['Vehicle Unique ID']
                  )
                "
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
                    color="green"
                    text-color="white"
                    label="Yes"
                    v-if="props.row['Live']"
                  />
                  <q-chip
                    color="red"
                    text-color="white"
                    label="No"
                    v-else
                  ></q-chip>
                </q-td>
                <q-td key="rentalAgreement" :props="props">
                  <q-chip
                    color="green"
                    text-color="white"
                    label="Yes"
                    v-if="props.row['RADocNumber']"
                  />
                </q-td>
                <q-td key="checkOut" :props="props">
                  <q-chip
                    color="green"
                    text-color="white"
                    label="Yes"
                    v-if="props.row['CheckOutDocNumber']"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="q-pa-md">
            <q-table
              class="my-sticky-dynamic"
              title="Rental Agreements For Hire"
              :rows="audits.rentalAgreements"
              :columns="documentColumns"
              :loading="audits.documentsLoading"
              row-key="index"
              virtual-scroll
              :virtual-scroll-item-size="48"
              :virtual-scroll-sticky-size-start="48"
              :rows-per-page-options="[0]"
              no-data-label="No matching documents found"
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="ID" :props="props">
                    {{ props.row["ID"] }}
                  </q-td>
                  <q-td key="description" :props="props">
                    {{ props.row["Description"] }}
                  </q-td>
                  <q-td key="uploadDate" :props="props">
                    {{
                      date.formatDate(props.row["DateUpdated"], "DD/MM/YYYY")
                    }}
                  </q-td>
                  <q-td key="select" :props="props">
                    <q-chip
                      clickable
                      color="green"
                      text-color="white"
                      @click="
                        handleDocumentSelection(
                          selectedRA,
                          props.row['ID'],
                          'RADocNumber'
                        )
                      "
                    >
                      This One!
                    </q-chip>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
        <div class="col-6">
          <div class="q-pa-md">
            <q-table
              class="my-sticky-dynamic"
              title="Check Outs For Hire"
              :rows="audits.checkOuts"
              :columns="documentColumns"
              :loading="audits.documentsLoading"
              row-key="index"
              virtual-scroll
              :virtual-scroll-item-size="48"
              :virtual-scroll-sticky-size-start="48"
              :rows-per-page-options="[0]"
              no-data-label="No matching documents found"
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="ID" :props="props">
                    {{ props.row["ID"] }}
                  </q-td>
                  <q-td key="description" :props="props">
                    {{ props.row["Description"] }}
                  </q-td>
                  <q-td key="uploadDate" :props="props">
                    {{
                      date.formatDate(props.row["DateUpdated"], "DD/MM/YYYY")
                    }}
                  </q-td>
                  <q-td key="select" :props="props">
                    <q-chip
                      clickable
                      color="green"
                      text-color="white"
                      @click="
                        handleDocumentSelection(
                          selectedRA,
                          props.row['ID'],
                          'CheckOutDocNumber'
                        )
                      "
                    >
                      This One!
                    </q-chip>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRentalAuditStore } from "src/stores/RentalAuditStore";
import { date } from "quasar";
import VueApexCharts from "vue3-apexcharts";

const audits = useRentalAuditStore();
const selectedRA = ref();

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

const documentColumns = [
  {
    name: "ID",
    label: "Document ID",
    align: "left",
  },
  {
    name: "description",
    label: "Description",
    align: "left",
  },
  {
    name: "uploadDate",
    label: "Document Upload Date",
    align: "left",
  },
  {
    name: "select",
    label: "Select Document",
    align: "left",
  },
];

async function handleRowClick(agreementNumber, vehicleID) {
  if (!audits.documentsLoading) {
    selectedRA.value = agreementNumber;
    await audits.getDocumentsForRental(vehicleID);
  }
}

async function handleDocumentSelection(
  rentalAgreementNumber,
  documentNumber,
  documentType
) {
  await audits.addDocument(rentalAgreementNumber, documentNumber, documentType);
}
</script>

<style scoped lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  height: 410px

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
