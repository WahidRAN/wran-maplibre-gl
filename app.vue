<script setup lang="ts">
const mapInstance = ref();
const handleMapLoad = (map: maplibregl.Map) => {
	mapInstance.value = map;
};

const showDefaultMap = ref(true);
const showRasterMap = ref(false);
const toggleDefaultMap = () => {
	showDefaultMap.value = !showDefaultMap.value;
	showRasterMap.value = !showRasterMap.value;
};

const showLineLayer = ref(true);
const toggleLineLayer = () => {
	showLineLayer.value = !showLineLayer.value;
};

const showCircleLayer = ref(true);
const toggleCircleLayer = () => {
	showCircleLayer.value = !showCircleLayer.value;
};

const showPolygonLayer = ref(true);
const togglePolygonLayer = () => {
	showPolygonLayer.value = !showPolygonLayer.value;
};

const showCustomLayer = ref(true);
const toggleCustomLayer = () => {
	showCustomLayer.value = !showCustomLayer.value;
};

const showDefaultLayer = ref(true);
const toggleDefaultLayer = () => {
	showDefaultLayer.value = !showDefaultLayer.value;
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
		<ConfigPanel
			:line-layer-disabled="showRasterMap"
			:circle-layer-disabled="showRasterMap"
			:polygon-layer-disabled="showRasterMap"
			:custom-layer-disabled="showRasterMap"
			:default-layer-disabled="showRasterMap"
			@on-toggle-line-layer="toggleLineLayer"
			@on-toggle-circle-layer="toggleCircleLayer"
			@on-toggle-polygon-layer="togglePolygonLayer"
			@on-toggle-custom-layer="toggleCustomLayer"
			@on-toggle-default-layer="toggleDefaultLayer"
			@on-toggle-raster-map="toggleDefaultMap"
		/>
		<VectorLayer :show="showRasterMap" />
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
