<template>
  <q-page>
    <div class="column">
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
            :filter="filter"
            :filter-method="rentalFilter"
          >
            <template v-slot:top>
              <div style="width: 100%" class="row">
                <div class="col-9">
                  <q-toggle
                    v-model="rentalFilters.liveHireFilter"
                    val="liveHires"
                    label="Live hires"
                  />
                  <q-toggle
                    v-model="rentalFilters.missingRAFilter"
                    val="rentalAgreements"
                    label="Missing Rental Agreements?"
                  />
                  <q-toggle
                    v-model="rentalFilters.missingCheckOutFilter"
                    val="checkOuts"
                    label="Missing Check Out Sheets"
                  />
                  <q-toggle v-model="showAll" val="showAll" label="Show All" />
                </div>
                <div class="col-3">
                  <q-input
                    dense
                    debounce="400"
                    color="primary"
                    v-model="rentalFilters.search"
                    input-class="text-right"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </div>
            </template>
            <template v-slot:body="props">
              <q-tr
                :props="props"
                @click="handleRowClick(props.row)"
                class="rentalRow"
                :class="{
                  selectedRow:
                    props.row['Unique ID'] == audits.selectedRA.AgreementNumber,
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
                <q-td key="live" :props="props" category="liveHire">
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
          <div>{{ filter }}</div>
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
import { ref, reactive, computed, onBeforeMount } from "vue";
import { useRentalAuditStore } from "src/stores/RentalAuditStore";
import { date } from "quasar";
import VueApexCharts from "vue3-apexcharts";
import DocumentTable from "src/components/RentalAudit/DocumentTable.vue";

const audits = useRentalAuditStore();

onBeforeMount(() => {
  audits.getData();
});

const rentalFilters = reactive({
  search: "",
  liveHireFilter: true,
  missingRAFilter: true,
  missingCheckOutFilter: true,
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
    sortable: true,
  },
  {
    name: "registration",
    required: true,
    label: "Registration",
    align: "left",
    sortable: true,
  },
  {
    name: "customer",
    label: "Customer",
    align: "left",
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: "hireStart",
    label: "Hire Start Date",
    align: "left",
    sortable: true,
    sort: (a, b) => a - b,
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

const getUniqueCustomers = computed(() => {
  const uniqueCustomers = new Set();
  if (audits.rentalData.length > 0) {
    for (const rental of audits.rentalData) {
      uniqueCustomers.add(rental["Customer Name"]);
    }
  }

  return Array.from(uniqueCustomers).sort();
});

function rentalFilter(rows, terms) {
  // rows contain the entire data
  // terms contains whatever you have as filter

  const lowerSearch = terms.search ? terms.search.toLowerCase() : "";

  const filteredRows = rows.filter((row, i) => {
    let ans = false;

    //Gather toggle conditions
    let c1 = rentalFilters.liveHireFilter && row["Live"];
    // let c2 =
    //   (rentalFilters.missingRAFilter && row["RADocNumber"] < 0) ||
    //   row["RADocNumber"] == null;
    // let c3 =
    //   rentalFilters.missingCheckOutFilter &&
    //   (row["CheckOutDocNumber"] < 0 || row["CheckOutDocNumber"] == null);

    // let c1 = rentalFilters.liveHireFilter;
    // let c2 = rentalFilters.missingRAFilter;
    // let c3 = rentalFilters.missingCheckOutFilter;

    //Gather search condition

    //Assume true in case there is no search
    let s1 = true;

    //If search term exists, convert to lower case and see which rows contain it
    if (lowerSearch != "") {
      s1 = false;
      //Get the values
      let s1_values = Object.values(row);
      //Convert to lowercase
      let s1_lower = s1_values.map((x) => x?.toString()?.toLowerCase());

      for (let val = 0; val < s1_lower.length; val++) {
        if (s1_lower[val]?.includes(lowerSearch)) {
          s1 = true;
          break;
        }
      }
    }

    //assume row doesn't match
    ans = false;

    //check if any of the conditions match
    // if ((c1 && s1) || (c2 && s1) || (c3 && s1)) {
    //   ans = true;
    // }

    if (c1 && s1) {
      ans = true;
    }

    return ans;
  });

  return filteredRows;
}

const filter = computed(() => {
  return {
    search: rentalFilters.search,
    liveHires: rentalFilters.liveHireFilter,
    rentalAgreements: rentalFilters.missingRAFilter,
    checkOuts: rentalFilters.missingCheckOutFilter,
  };
});

const showAll = computed({
  get: function () {
    console.log(this.filterToggle);
    return (
      rentalFilters.liveHireFilter &&
      rentalFilters.missingRAFilter &&
      rentalFilters.missingCheckOutFilter
    );
  },
  set: function (newValue) {
    rentalFilters.liveHireFilter = newValue;
    rentalFilters.missingRAFilter = newValue;
    rentalFilters.missingCheckOutFilter = newValue;
  },
});
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
