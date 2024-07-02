<script setup lang="ts">
import maplibregl from "maplibre-gl";

const props = defineProps({
	map: {
		type: maplibregl.Map,
		required: true,
	},
});

new maplibregl.Marker()
	.setLngLat([107.39480047837077, -6.442801051024858])
	.addTo(props.map);
</script>

<template>
	<div></div>
</template>
