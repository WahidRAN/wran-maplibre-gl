<script setup lang="ts">
import maplibregl, { Map } from "maplibre-gl";

const props = defineProps({
	map: {
		type: Map,
	},
	show: {
		type: Boolean,
		required: true,
	},
});

const addCircleLayer = () => {
	props.map?.addLayer({
		id: "circle-layer",
		type: "circle",
		source: "test-data",
		paint: {
			"circle-radius": 20,
			"circle-opacity": 0.6,
			"circle-color": "red",
		},
		filter: ["==", ["get", "name"], "Circle Marker"],
	});

	props.map?.on("click", "circle-layer", (e) => {
		if (props.map && e.features) {
			const coordinates = e.features[0].geometry.coordinates.slice();
			const description = e.features[0].properties.name;
			
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}
			new maplibregl.Popup()
				.setLngLat(coordinates)
				.setHTML(description)
				.addTo(props.map);
		}
	});

	props.map?.on("mouseenter", "circle-layer", () => {
		console.log("here");
		if (props.map) {
			props.map.getCanvas().style.cursor = "pointer";
		}
	});

	props.map?.on("mouseleave", "circle-layer", () => {
		if (props.map) {
			props.map.getCanvas().style.cursor = "";
		}
	});
};
const addCircleLayerOnLoad = () => {
	props.map?.on("load", () => {
		addCircleLayer();
	});
};

watch(
	() => props.map,
	(newVal) => {
		if (newVal && !newVal.getLayer("circle-layer")) {
			addCircleLayerOnLoad();
		}
	}
);

watch(
	() => props.show,
	(newVal) => {
		if (newVal && props.map && !props.map.getLayer("circle-layer")) {
			addCircleLayer();
		} else {
			props.map?.removeLayer("circle-layer");
		}
	}
);
</script>

<template>
	<div></div>
</template>
