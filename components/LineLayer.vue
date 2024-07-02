<script setup lang="ts">
import { watch, onMounted } from "vue";

const props = defineProps({
	map: {
		type: Object,
		required: true,
	},
});

console.log(props.map);

const addLineLayer = () => {
	if (!props.map.getLayer("line-layer")) {
		return;
	}
};

props.map.on("load", () => {
	props.map.addLayer({
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
});
</script>

<template>
	<div></div>
</template>
