<script setup lang="ts">
import maplibregl, { Map, Marker } from "maplibre-gl";

const props = defineProps({
	map: {
		type: Map,
	},
	show: {
		type: Boolean,
		required: true,
	},
});

let marker: Marker;

const generateDefaultMarker = () => {
	if (props.map) {
		const popup = new maplibregl.Popup().setText(
			"Construction on the Washington Monument began in 1848."
		);

		marker = new maplibregl.Marker()
			.setLngLat([107.39480047837077, -6.442801051024858])
			.setPopup(popup)
			.addTo(props.map);
	}
};

watch(
	() => props.map,
	(newVal) => {
		if (newVal) {
			generateDefaultMarker();
		}
	}
);

watch(
	() => props.show,
	(newVal) => {
		if (newVal) {
			generateDefaultMarker();
		} else {
			marker.remove();
		}
	}
);
</script>

<template>
	<div></div>
</template>

<style>
.maplibregl-marker {
	cursor: pointer;
}
</style>
