<script setup lang="ts">
const props = defineProps({
	map: {
		type: Object,
		required: true,
	},
});

props.map.on("load", async () => {
	const image = await props.map.loadImage(
		"/logo-circlegeo.png"
	);
	props.map.addImage('circlegeo-logo', image.data)
	props.map.addLayer({
		id: "custom-image-layer",
		type: "symbol",
		source: "test-data",
		layout: {
      'icon-image': 'circlegeo-logo',
      'icon-size': 0.1
    },
		filter: ["==", ["get", "name"], "Custom Image Marker"],
	});
});
</script>

<template>
	<div></div>
</template>
