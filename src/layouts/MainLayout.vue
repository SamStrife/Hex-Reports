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
        <LoginButton></LoginButton>
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
              v-if="userStore.loggedIn || !menuItem.requiresLogin"
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

<script setup>
import { ref } from "vue";
import { menuList } from "./menuList";
import LoginButton from "../components/LoginButton.vue";
import { storeUser } from "../stores/storeUser";

const userStore = storeUser();

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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
