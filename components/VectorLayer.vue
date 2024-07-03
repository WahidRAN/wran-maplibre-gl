<script setup lang="ts">
import { ref, onMounted } from "vue";
import maplibregl from "maplibre-gl";

const mapContainer = ref();
const mapInstance = ref();

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
});

const addRasterTiles = () => {
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
					tileSize: 256,
				},
			},
			layers: [
				{
					id: "wind-temp",
					type: "raster",
					source: "wind-temps-tiles",
					minzoom: 0,
					maxzoom: 22,
				},
			],
		},
		center: [106.827153, -6.17511], // Koordinat Jakarta
		zoom: 2,
	});

	mapInstance.value.on("load", () => {
		mapInstance.value.resize()
	})
};

const mapVisibility = "hide";
const classArray = ref(["map-raster-container", mapVisibility]);

watch(
	() => props.show,
	(newVal) => {
		if (newVal) {
			classArray.value = classArray.value.filter(
				(classItem) => classItem !== "hide"
			);
			addRasterTiles();
		} else {
			mapInstance.value.remove();
			classArray.value.push(mapVisibility)
		}
	}
);
</script>

<template>
	<div ref="mapContainer" :class="classArray"></div>
</template>

<style>
body {
	background-color: lightblue;
}
.map-raster-container {
	width: 100%;
	height: 100vh;
}

.hide {
	display: none;
}
</style>
