<script setup lang="ts">
import { ref, onMounted } from "vue";
import maplibregl from "maplibre-gl";

const mapContainer = ref();
const mapInstance = ref();
const mapData = ref();

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
});
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

const addDefaultMap = () => {
	mapInstance.value = new maplibregl.Map({
		container: mapContainer.value,
		style:
			"https://api.maptiler.com/maps/streets-v2/style.json?key=Y2ulfx5mJnVYzPYtrCZm",
		center: [106.827153, -6.17511], // Koordinat Jakarta
		pitch: 40,
		zoom: 4,
	});

	mapInstance.value.on("load", () => {
		mapInstance.value.addSource("test-data", {
			type: "geojson",
			data: mapData.value,
		});
		mapInstance.value.resize();
	});
};

onMounted(async () => {
	await fetchGeodata();
	addDefaultMap();
	emit("onMapInstanceLoad", mapInstance.value);
});

const mapVisibility = "hide";
const classArray = ref(["map-container"]);

watch(
	() => props.show,
	(newVal) => {
		if (newVal) {
			classArray.value = classArray.value.filter(
				(classItem) => classItem !== "hide"
			);
			addDefaultMap();
			emit("onMapInstanceLoad", mapInstance.value);
		} else {
			mapInstance.value.remove();
			classArray.value.push(mapVisibility);
		}
	}
);

onUnmounted(() => {
	mapInstance.value.remove();
});
</script>

<template>
	<div ref="mapContainer" :class="classArray"></div>
</template>

<style scoped>
.map-container {
	display: block;
	width: 100%;
	height: 100vh;
}

.hide {
	display: none;
}
</style>
