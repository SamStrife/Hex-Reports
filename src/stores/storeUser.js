import { defineStore } from "pinia";
import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "d3ecdd5a-cd64-4532-9b5f-71e00007efa8",
    authority:
      "https://login.microsoftonline.com/9ec541fd-d4e0-4871-bca6-3b6b57af5c9c",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export const storeUser = defineStore("user", {
  state: () => ({
    account: [],
  }),

  getters: {
    loggedIn: (state) => state?.account?.length > 0,

    userName: (state) => state?.account[0]?.name,

    userInitials(state) {
      let initials = "";
      state?.account[0]?.name.split(" ").forEach((element) => {
        initials += element[0];
      });
      return initials;
    },
  },

  actions: {
    async login() {
      try {
        await msalInstance.loginPopup({
          redirectUri: "http://localhost:8080/",
        });
        let token = msalInstance.getAllAccounts();
        this.account = token;
      } catch (err) {
        console.warn(err);
      }
    },
    async logout() {
      try {
        await msalInstance.logoutPopup({
          postLogoutRedirectUri: "http://localhost:8080/",
        });
        this.account = null;
      } catch (err) {
        console.warn(err);
      }
    },
  },
});
