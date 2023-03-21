<template>
  <q-page class="flex-center">
    <div class="column">
      <div class="section">
        <h1>{{ audits.totalRentals }}</h1>
      </div>
      <div>
        <div class="q-pa-md">
          <q-table
            class="my-sticky-dynamic"
            title="Rentals"
            :rows="audits.rentalData"
            :columns="rentalColumns"
            :loading="loading"
            row-key="index"
            virtual-scroll
            :virtual-scroll-item-size="48"
            :virtual-scroll-sticky-size-start="48"
            :pagination="pagination"
            :rows-per-page-options="[0]"
            @virtual-scroll="onScroll"
          />
        </div>
      </div>
      <div class="row">
        <div>
          <div class="q-pa-md">
            <q-table
              class="my-sticky-dynamic"
              title="Rental Agreements For Hire"
              :rows="audits.rentalData"
              :columns="rentalColumns"
              :loading="loading"
              row-key="index"
              virtual-scroll
              :virtual-scroll-item-size="48"
              :virtual-scroll-sticky-size-start="48"
              :pagination="pagination"
              :rows-per-page-options="[0]"
              @virtual-scroll="onScroll"
            />
          </div>
        </div>
        <div>
          <div class="q-pa-md">
            <q-table
              class="my-sticky-dynamic"
              title="Check Outs For Hire"
              :rows="audits.rentalData"
              :columns="rentalColumns"
              :loading="loading"
              row-key="Unique ID"
              virtual-scroll
              :virtual-scroll-item-size="48"
              :virtual-scroll-sticky-size-start="48"
              :pagination="pagination"
              :rows-per-page-options="[0]"
              @virtual-scroll="onScroll"
            >
              <template v-slot:body="row">
                <q-tr :props="row" @click="onRowClick(rowClicked())">
                  <q-td key="agreementNumber">
                    <p>{{ row["Unique ID"] }}</p>
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

const audits = useRentalAuditStore();
const loading = ref(false);

onBeforeMount(() => {
  audits.getData();
});

const rentalColumns = [
  {
    name: "agreementNumber",
    label: "Agrrement Number",
    align: "left",
    field: (row) => row["Unique ID"],
  },
  {
    name: "registration",
    required: true,
    label: "Registration",
    align: "left",
    field: (row) => row["Registration"],
    sortable: true,
  },
  {
    name: "customer",
    label: "Customer",
    align: "left",
    field: (row) => row["Customer Name"],
    sortable: true,
  },
  {
    name: "hireStart",
    label: "Hire Start Date",
    align: "left",
    field: (row) => row["Hire Start Date"],
  },
  {
    name: "hireType",
    label: "Hire Type",
    align: "left",
    field: (row) => row["Hire Type Name"],
  },
  {
    name: "live",
    label: "Live Hire",
    align: "left",
    field: (row) => (row["Live"] ? "Yes" : null),
  },
  {
    name: "rentalAgreement",
    label: "Rental Agreement ?",
    align: "left",
    field: (row) => (row["RADocNumber"] ? "Yes" : null),
  },
  {
    name: "checkOut",
    label: "Check Out ?",
    align: "left",
    field: (row) => (row["CheckOutDocNumber"] ? "Yes" : null),
  },
];

function rowClicked() {
  console.log("Clicked");
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
