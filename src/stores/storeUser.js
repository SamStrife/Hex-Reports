import { defineStore } from "pinia";
import * as msal from "@azure/msal-browser";
import axios from "axios";

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
    favourites: [],
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
        await connectToUserDB(this.account[0]["localAccountId"]);
        this.setUserFavourites();
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
    async setUserFavourites() {
      this.favourites = [];
      this.favourites = await getUserFavourites(
        this.account[0]["localAccountId"]
      );
    },
  },
});

async function connectToUserDB(ms_user_id) {
  return axios.get(`https://api.hexreports.com/hexreports/login/${ms_user_id}`);
}

async function getUserFavourites(ms_user_id) {
  return axios
    .get(
      `https://api.hexreports.com/hexreports/user/${ms_user_id}/get_favourites`
    )
    .then(function (response) {
      return response.data;
    });
}
