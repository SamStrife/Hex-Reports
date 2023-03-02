<template>
  <q-page class="flex flex-center">
    <template>
      <div id="container">
        <div id="map" ref="map"></div>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import L from "leaflet";
import { ref, onMounted } from "vue";

const mapContainer = ref(null);
const map = L.map(mapContainer.value.focus()).setView([51.505, -0.09], 13);

onMounted(() => {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
});
</script>

<style src="leaflet/dist/leaflet.css"></style>
