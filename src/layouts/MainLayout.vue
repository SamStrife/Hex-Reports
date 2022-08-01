<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-green-10 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link :to="'/'" @click="changePage('Hex Reports', '')">
            <q-avatar>
              <img src="../assets/hexLogo.svg" />
            </q-avatar>
          </router-link>
          {{ pageTitle }}
        </q-toolbar-title>
        <q-btn
          @click="openAuthPopup"
          color="green-8"
          icon-right="login"
          label="Log In"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-grey-3"
    >
      <q-list>
        <template v-for="(menuItem, index) in sortedMenu" :key="index">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="menuItem.routerLink"
          >
            <q-item
              clickable
              :active="menuItem.label === activeMenuItem"
              @click="changePage(menuItem.title, menuItem.label)"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </router-link>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-green-10 text-white"> </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { menuList } from "./menuList";

export default {
  setup() {
    const sortedMenu = menuList.sort(function (a, b) {
      let textA = a.label.toUpperCase();
      let textB = b.label.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    const activeMenuItem = ref("");

    const pageTitle = ref("Hex Reports");
    function changePage(title, activeIcon) {
      pageTitle.value = title;
      activeMenuItem.value = activeIcon;
    }

    const leftDrawerOpen = ref(true);

    function openAuthPopup() {
      window.open(
        "https://login.microsoftonline.com/9ec541fd-d4e0-4871-bca6-3b6b57af5c9c/oauth2/v2.0/authorize?client_id=c7f3f16b-f553-4720-a3e9-28f2c92afbbb&scope=User.ReadBasic.All"
      );
    }

    return {
      pageTitle,
      changePage,
      sortedMenu,
      activeMenuItem,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      openAuthPopup,
    };
  },
};
</script>
