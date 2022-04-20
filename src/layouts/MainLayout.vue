<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-green-10 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link :to="'/'" @click="changeTitle('Hex Reports')">
            <q-avatar>
              <img src="../assets/hexLogo.svg" />
            </q-avatar>
          </router-link>
          {{ pageTitle }}
        </q-toolbar-title>
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
        <template v-for="(menuItem, index) in menuList" :key="index">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="menuItem.routerLink"
          >
            <q-item
              clickable
              :active="menuItem.label === 'Outbox'"
              @click="changeTitle(menuItem.title)"
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

const menuList = [
  {
    icon: "calculate",
    label: "Excess Mileage Calculator",
    routerLink: "/excesscalculator",
    title: "Excess Mileage Calculator",
  },
];

export default {
  setup() {
    const pageTitle = ref("Hex Reports");
    function changeTitle(title) {
      pageTitle.value = title;
    }

    const leftDrawerOpen = ref(true);

    return {
      pageTitle,
      changeTitle,
      menuList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
