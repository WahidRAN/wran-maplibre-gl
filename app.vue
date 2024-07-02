<script setup lang="ts">
const mapInstance = ref();
const handleMapLoad = (map: maplibregl.Map) => {
	mapInstance.value = map;
};

const showLineLayer = ref(true);
const toggleLineLayer = () => {
	showLineLayer.value = !showLineLayer.value;
	if (!showLineLayer.value) {
		mapInstance.value.removeLayer("line-layer");
	}
};
</script>

<template>
	<div class="app-container">
		<DefaultMap @on-map-instance-load="handleMapLoad" />
		<LineLayer v-if="mapInstance" :map="mapInstance" />
		<PolygonLayer v-if="mapInstance" :map="mapInstance" />
		<CircleLayer v-if="mapInstance" :map="mapInstance" />
		<CustomMarkerLayer v-if="mapInstance" :map="mapInstance" />
		<DefaultMarkerLayer v-if="mapInstance" :map="mapInstance" />
		<ConfigPanel @onToggleLineLayer="toggleLineLayer" />
		<!-- <VectorLayer /> -->
	</div>
</template>

<style>
* {
	box-sizing: border-box;
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
