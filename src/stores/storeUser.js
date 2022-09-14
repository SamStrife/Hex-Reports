import { defineStore } from "pinia";
import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: process.env.AZURE_AUTHORITY,
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
          redirectUri: process.env.LOG_IN_REDIRECT_URI,
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
          postLogoutRedirectUri: process.env.LOG_IN_REDIRECT_URI,
        });
        this.account = null;
      } catch (err) {
        console.warn(err);
      }
    },
  },
});
