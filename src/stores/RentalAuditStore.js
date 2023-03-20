import { defineStore } from "pinia";
import axios from "axios";

export const useRentalAuditStore = defineStore("RentalAudit", {
  state: () => ({
    rentalData: [],
    documentData: [],
  }),

  getters: {
    totalRentals() {
      return this.rentalData.length;
    },
    totalRentalsChecked() {},
    totalDocumentsPresent(documentType) {},
  },

  actions: {
    async getData() {
      await axios
        .get("https://api.hexreports.com/rentalAudit/getAuditData")
        .then((response) => {
          for (let agreement of response.data.RAAudit) {
            this.rentalData.push(agreement);
          }
        });
    },
    addDocument(rentalAgreementNumber, documentNumber, documentType) {},
  },
});
