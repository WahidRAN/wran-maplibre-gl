<script setup lang="ts">
import maplibregl from "maplibre-gl";

const props = defineProps({
	map: {
		type: Object,
	},
	show: {
		type: Boolean,
		required: true,
	},
});

const addCustomLayer = async () => {
	if (props.map) {
		const image = await props.map.loadImage("/logo-circlegeo.png");
		props.map.addImage("circlegeo-logo", image.data);
		props.map.addLayer({
			id: "custom-image-layer",
			type: "symbol",
			source: "test-data",
			layout: {
				"icon-image": "circlegeo-logo",
				"icon-size": 0.1,
				"icon-overlap": "always",
			},
			filter: ["==", ["get", "name"], "Custom Image Marker"],
		});

		props.map?.on("click", "custom-image-layer", (e) => {
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
		
		props.map.on("mouseenter", "custom-image-layer", () => {
			console.log("here");
			if (props.map) {
				props.map.getCanvas().style.cursor = "pointer";
			}
		});

		props.map.on("mouseleave", "custom-image-layer", () => {
			if (props.map) {
				props.map.getCanvas().style.cursor = "";
			}
		});
	}
};
const addCustomLayerOnLoad = () => {
	props.map?.on("load", () => {
		addCustomLayer();
	});
};

watch(
	() => props.map,
	(newVal) => {
		if (newVal && !newVal.getLayer("custom-image-layer")) {
			addCustomLayerOnLoad();
		}
	}
);

watch(
	() => props.show,
	(newVal) => {
		if (newVal && props.map && !props.map?.getLayer("custom-image-layer")) {
			addCustomLayer();
		} else {
			props.map?.removeLayer("custom-image-layer");
			props.map?.removeImage("circlegeo-logo");
		}
	}
);
</script>

<template>
	<div></div>
</template>
