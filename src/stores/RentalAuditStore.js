import { defineStore } from "pinia";
import axios from "axios";

export const useRentalAuditStore = defineStore("RentalAudit", {
  state: () => ({
    rentalData: [],
    documentData: [],
  }),

  getters: {
    totalRentals() {},
    totalRentalsChecked() {},
    totalDocumentsPresent(documentType) {},
  },

  actions: {
    getData() {},
    addDocument(rentalAgreementNumber, documentNumber, documentType) {},
  },
});
