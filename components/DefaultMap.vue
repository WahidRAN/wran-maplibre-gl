<script setup lang="ts">
import { ref, onMounted } from "vue";
import maplibregl from "maplibre-gl";

const mapContainer = ref();
const mapInstance = ref();
const mapData = ref();

const emit = defineEmits(["onMapInstanceLoad"]);

const fetchGeodata = async () => {
	await fetch("/test.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			mapData.value = data;
		});
};

onMounted(async () => {
	await fetchGeodata();
	mapInstance.value = new maplibregl.Map({
		container: mapContainer.value,
		style: "https://api.maptiler.com/maps/streets-v2/style.json?key=Y2ulfx5mJnVYzPYtrCZm",
		center: [106.827153, -6.17511], // Koordinat Jakarta
		pitch: 40,
		zoom: 4,
	});

	mapInstance.value.on("load", () => {
		mapInstance.value.addSource("test-data", {
			type: "geojson",
			data: mapData.value,
		});
	});

	emit("onMapInstanceLoad", mapInstance.value);
});
</script>

<template>
	<div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
	width: 100%;
	height: 100vh;
}
</style>
