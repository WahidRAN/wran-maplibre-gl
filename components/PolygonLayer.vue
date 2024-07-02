<script setup lang="ts">
const props = defineProps({
	map: {
		type: Object,
		required: true,
	},
});

props.map.on("load", () => {
	props.map.addLayer({
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

	props.map.addLayer({
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
});
</script>

<template>
	<div></div>
</template>
