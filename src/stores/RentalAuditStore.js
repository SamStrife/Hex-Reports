import { defineStore } from "pinia";
import axios from "axios";

export const useRentalAuditStore = defineStore("RentalAudit", {
  state: () => ({
    rentalData: [],
    documentData: [],
    documentsLoading: false,
    documentUploading: false,
    selectedRA: {
      AgreementNumber: null,
      RADocNumber: null,
      CheckOutDocNumber: null,
      VehicleID: null,
    },
    reportRanOnce: false,
  }),

  getters: {
    totalRentals() {
      return this.rentalData.length;
    },
    rentalAgreements() {
      return this.documentData.filter(
        (document) =>
          document["TypeID"] == 6 ||
          document["TypeID"] == 31 ||
          document["TypeID"] == 43 ||
          document["TypeID"] == 83 ||
          document["TypeID"] == 108
      );
    },
    checkOuts() {
      return this.documentData.filter(
        (document) => document["TypeID"] == 26 || document["TypeID"] == 103
      );
    },
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
    async getDocumentsForVehicle() {
      this.reportRanOnce = true;
      this.documentsLoading = true;
      this.documentData = [];
      await axios
        .get(
          `https://api.hexreports.com/rentalAudit/getDocumentData/${this.selectedRA.VehicleID}`
        )
        .then((response) => {
          for (let document of response.data.Documents) {
            this.documentData.push(document);
          }
        });
      this.documentsLoading = false;
    },
    async addDocument(rentalAgreementNumber, documentNumber, documentType) {
      this.documentUploading = true;

      const postData = new FormData();
      postData.append("rentalAgreementNumber", rentalAgreementNumber);
      postData.append("documentID", documentNumber);
      postData.append("documentColumn", documentType);

      await axios
        .post(`https://api.hexreports.com/rentalAudit/setDocument/`, postData)
        .then((response) => {
          if (response.status == 201) {
            const documentIndex = this.rentalData.findIndex(
              (document) => document["Unique ID"] == rentalAgreementNumber
            );
            this.rentalData[documentIndex][documentType] = documentNumber;

            if (documentType == "RADocNumber") {
              this.selectedRA.AgreementNumber == documentNumber;
            }
            if (documentType == "CheckOutDocNumber") {
              this.selectedRA.CheckOutDocNumber == documentNumber;
            }

            this.documentUploading = false;
          } else {
            alert("There was a problem processing this request");
            this.documentUploading = false;
          }
        });
    },
    setSelectedRA(row) {
      this.selectedRA.AgreementNumber = row["Unique ID"];
      this.selectedRA.RADocNumber = row["RADocNumber"];
      this.selectedRA.CheckOutDocNumber = row["CheckOutDocNumber"];
      this.selectedRA.VehicleID = row["Vehicle Unique ID"];
    },
  },
});
