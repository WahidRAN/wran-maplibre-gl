<script setup lang="ts">
const mapInstance = ref();
const handleMapLoad = (map: maplibregl.Map) => {
	mapInstance.value = map;
};

const showDefaultMap = ref(true);
const showRasterMap = ref(false);
const showLineLayer = ref(true);
const showCircleLayer = ref(true);
const showPolygonLayer = ref(true);
const showCustomLayer = ref(true);
const showDefaultLayer = ref(true);

const toggleLayer = (layer: string) => {
	switch (layer) {
		case "line":
			showLineLayer.value = !showLineLayer.value;
			break;

		case "polygon":
			showPolygonLayer.value = !showPolygonLayer.value;
			break;

		case "circle":
			showCircleLayer.value = !showCircleLayer.value;
			break;

		case "custom-marker":
			showCustomLayer.value = !showCustomLayer.value;
			break;

		case "default-marker":
			showDefaultLayer.value = !showDefaultLayer.value;
			break;

		case "map":
			showDefaultMap.value = !showDefaultMap.value;
			showRasterMap.value = !showRasterMap.value;
			break;
	}
};
</script>

<template>
	<div class="app-container">
		<DefaultMap :show="showDefaultMap" @on-map-instance-load="handleMapLoad" />
		<LineLayer :map="mapInstance" :show="showLineLayer" />
		<PolygonLayer :map="mapInstance" :show="showPolygonLayer" />
		<CircleLayer :map="mapInstance" :show="showCircleLayer" />
		<CustomMarkerLayer :map="mapInstance" :show="showCustomLayer" />
		<DefaultMarkerLayer :map="mapInstance" :show="showDefaultLayer" />
		<VectorLayer :show="showRasterMap" />

		<ConfigPanel :disable-layer="showRasterMap" @on-toggle="toggleLayer" />
	</div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap");

* {
	box-sizing: border-box;
	font-family: "Jura", sans-serif;
}

body,
h1,
p {
	margin: 0;
}

.app-container {
	position: relative;
	height: 100vh;
}
</style>
