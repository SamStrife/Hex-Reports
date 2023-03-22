<template>
  <div class="q-pa-md">
    <q-table
      class="documentTable"
      :title="tableTitle"
      :rows="tableData"
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
            {{ date.formatDate(props.row["DateUpdated"], "DD/MM/YYYY") }}
          </q-td>
          <q-td key="select" :props="props">
            <q-chip
              v-if="props.row['ID'] != audits.selectedRA.RADocNumber"
              clickable
              color="green"
              text-color="white"
              @click="
                handleDocumentSelection(
                  audits.selectedRA.AgreementNumber,
                  props.row['ID'],
                  documentColumn
                )
              "
            >
              This One!
            </q-chip>
            <q-chip
              v-if="props.row['ID'] == audits.selectedRA.RADocNumber"
              clickable
              color="red"
              text-color="white"
              @click="
                handleDocumentSelection(
                  audits.selectedRA.AgreementNumber,
                  -1,
                  documentColumn
                )
              "
            >
              Not This One!
            </q-chip>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:pagination>
        <q-chip
          clickable
          @click="
            handleDocumentSelection(
              audits.selectedRA.AgreementNumber,
              -1,
              documentColumn
            )
          "
          >No Applicable Document</q-chip
        >
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          <span> {{ message }} </span>
          <q-chip
            color="red"
            text-color="white"
            clickable
            @click="
              handleDocumentSelection(
                audits.selectedRA.AgreementNumber,
                -1,
                documentColumn
              )
            "
          >
            Set No Document
          </q-chip>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { date } from "quasar";
import { useRentalAuditStore } from "src/stores/RentalAuditStore";

const props = defineProps(["dataType"]);

const tableTitle = computed(() => {
  if (props.dataType == "rentalAgreements") {
    return "Rental Agreements For Vehicle";
  } else if (props.dataType == "checkOuts") {
    return "Check Outs For Vehicle";
  } else {
    return null;
  }
});

const tableData = computed(() => {
  if (props.dataType == "rentalAgreements") {
    return audits.rentalAgreements;
  } else if (props.dataType == "checkOuts") {
    return audits.checkOuts;
  } else {
    return null;
  }
});

const documentColumn = computed(() => {
  if (props.dataType == "rentalAgreements") {
    return "RADocNumber";
  } else if (props.dataType == "checkOuts") {
    return "CheckOutDocNumber";
  } else {
    return null;
  }
});

const audits = useRentalAuditStore();

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

async function handleDocumentSelection(
  rentalAgreementNumber,
  documentNumber,
  documentType
) {
  await audits.addDocument(rentalAgreementNumber, documentNumber, documentType);
}
</script>

<style scoped lang="sass">
.documentTable
  /* height or max-height is important */
  height: 400px

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
