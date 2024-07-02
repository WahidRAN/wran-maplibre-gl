<script setup lang="ts">
const props = defineProps({
	map: {
		type: Object,
		required: true,
	},
});

props.map.on("load", () => {
	props.map.addLayer({
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
});
</script>

<template>
	<div></div>
</template>
