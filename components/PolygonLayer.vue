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

const addPolygonLayer = () => {
	props.map?.addLayer({
		id: "polygon",
		type: "fill",
		source: "test-data",
		layout: {},
		paint: {
			"fill-color": "purple",
			"fill-opacity": 0.6,
		},
		filter: ["==", "$type", "Polygon"],
	});

	props.map?.addLayer({
		id: "polygon-line",
		type: "line",
		source: "test-data",
		layout: {},
		paint: {
			"line-color": "red",
			"line-width": 2,
		},
		filter: ["==", "$type", "Polygon"],
	});
};

const addPolygonLayerOnLoad = () => {
	props.map?.on("load", () => {
		addPolygonLayer();
	});
};

watch(
	() => props.map,
	(newVal) => {
		if (
			newVal &&
			!newVal.getLayer("polygon") &&
			!newVal.getLayer("polygon-line")
		) {
			addPolygonLayerOnLoad();
		}
	}
);

watch(
	() => props.show,
	(newVal) => {
		if (
			newVal &&
			props.map &&
			!props.map?.getLayer("polygon") &&
			!props.map?.getLayer("polygon-line")
		) {
			addPolygonLayer();
		} else {
			props.map?.removeLayer("polygon");
			props.map?.removeLayer("polygon-line");
		}
	}
);
</script>

<template>
	<div></div>
</template>
