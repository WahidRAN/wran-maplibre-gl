<script setup lang="ts">
import { ref, onMounted } from "vue";
import maplibregl from "maplibre-gl";

const mapContainer = ref();
const mapInstance = ref();

onMounted(() => {
	mapInstance.value = new maplibregl.Map({
		container: mapContainer.value,
		style: {
			version: 8,
			sources: {
				"wind-temps-tiles": {
					type: "raster",
					tiles: [
						"https://rami.bmkg.go.id/api/windtemp_get/wafc/WT/snow/850/202405121800/202405131200/{z}/{x}/{y}.png",
					],
          tileSize: 256
				},
			},
      layers: [
        {
          id: 'wind-temp',
          type: "raster",
          source: 'wind-temps-tiles',
          minzoom: 0,
          maxzoom: 22
        }
      ]
		},
		center: [106.827153, -6.17511], // Koordinat Jakarta
		zoom: 2,
	});
});
</script>

<template>
	<div ref="mapContainer" class="map-container"></div>
</template>

<style>
body {
  background-color: lightblue;
}
.map-container {
	width: 100%;
	height: 100vh;
}
</style>
