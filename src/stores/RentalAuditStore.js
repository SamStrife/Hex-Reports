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
    rentalAgreements() {
      return this.documentData.filter(
        (document) => document["type"] == "rental"
      );
    },
    checkOuts() {},
    totalRentalsChecked() {},
    totalDocumentsPresent(documentType) {},
  },

  actions: {
    async getData() {
      this.rentalData = [];
      await axios
        .get("https://api.hexreports.com/rentalAudit/getAuditData")
        .then((response) => {
          for (let agreement of response.data.RAAudit) {
            this.rentalData.push(agreement);
          }
        });
    },
    async getDocumentsForRental(vehicleID) {
      this.documentData = [];
      await axios
        .get(
          `https://api.hexreports.com/rentalAudit/getDocumentData/${vehicleID}`
        )
        .then((response) => {
          for (let document of response.data.Documents) {
            this.documentData.push(document);
          }
        });
    },
    addDocument(rentalAgreementNumber, documentNumber, documentType) {},
  },
});
