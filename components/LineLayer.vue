<script setup lang="ts">
import { Map } from "maplibre-gl";

const props = defineProps({
	map: {
		type: Map,
	},
	show: {
		type: Boolean,
		required: true,
	},
});

const addLineLayer = () => {
	props.map?.addLayer({
		id: "line-layer",
		type: "line",
		source: "test-data",
		layout: {},
		paint: {
			"line-color": "yellow",
			"line-width": 2,
		},
		filter: ["==", "$type", "LineString"],
	});
};
const addLineLayerOnLoad = () => {
	props.map?.on("load", () => {
		addLineLayer();
	});
};

watch(
	() => props.map,
	(newVal) => {
		if (newVal && !newVal.getLayer("line-layer")) {
			addLineLayerOnLoad();
		}
	}
);

watch(
	() => props.show,
	(newVal) => {
		if (newVal && props.map && !props.map?.getLayer("line-player")) {
			addLineLayer();
		} else {
			props.map?.removeLayer("line-layer");
		}
	}
);
</script>

<template>
	<div></div>
</template>
